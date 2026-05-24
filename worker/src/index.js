// Cloudflare Worker for managing the gallery R2 bucket.
//
// Public image reads go directly to the bucket's custom domain
// (cdn.haileyjam.com). This worker only handles mutations
// and is intended to sit behind Cloudflare Access.

const MANIFEST_KEY = "manifest.json";
const MAX_RETRIES = 3;

const EXT_FOR_MIME = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") ?? "";
    const allowed = (env.ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim());
    const cors = allowed.includes(origin) ? corsHeaders(origin) : {};

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // Defense in depth: Cloudflare Access should be gating this hostname.
    // If the Access headers are missing, reject — never trust unauthenticated
    // requests even if Access is somehow bypassed or misconfigured.
    const email = request.headers.get("Cf-Access-Authenticated-User-Email");
    if (!email) {
      return json({ error: "unauthorized" }, 401, cors);
    }

    let response;
    try {
      response = await route(request, url, env);
    } catch (err) {
      response = json({ error: err.message ?? "internal error" }, 500);
    }
    for (const [k, v] of Object.entries(cors)) response.headers.set(k, v);
    return response;
  },
};

async function route(request, url, env) {
  const { pathname } = url;

  if (pathname === "/whoami" && request.method === "GET") {
    return json({
      email: request.headers.get("Cf-Access-Authenticated-User-Email"),
    });
  }

  if (pathname === "/signed-in" && request.method === "GET") {
    const returnTo = url.searchParams.get("return");
    if (returnTo && isAllowedReturnUrl(returnTo, env)) {
      return Response.redirect(returnTo, 302);
    }
    return signedInPage(
      request.headers.get("Cf-Access-Authenticated-User-Email"),
    );
  }

  if (pathname === "/images" && request.method === "POST") {
    return uploadImage(request, env);
  }

  const idMatch = pathname.match(/^\/images\/([a-f0-9-]{36})$/);
  if (idMatch && request.method === "DELETE") {
    return deleteImage(idMatch[1], env);
  }

  if (pathname === "/manifest" && request.method === "PUT") {
    return reorderManifest(request, env);
  }

  return json({ error: "not found" }, 404);
}

async function reorderManifest(request, env) {
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.order)) {
    return json({ error: "expected { order: [id, ...] }" }, 400);
  }
  const orderIds = body.order;

  try {
    await mutateManifest(env, (entries) => {
      if (orderIds.length !== entries.length) {
        throw new Error(
          `order length ${orderIds.length} does not match manifest length ${entries.length}`,
        );
      }
      const byId = new Map(entries.map((e) => [e.id, e]));
      const next = [];
      for (const id of orderIds) {
        const entry = byId.get(id);
        if (!entry) throw new Error(`unknown id: ${id}`);
        next.push(entry);
      }
      return next;
    });
  } catch (err) {
    return json({ error: err.message }, 400);
  }

  return json({ reordered: true });
}

async function uploadImage(request, env) {
  const contentType = (request.headers.get("Content-Type") ?? "").toLowerCase();
  const ext = EXT_FOR_MIME[contentType];
  if (!ext) {
    return json({ error: `unsupported content-type: ${contentType}` }, 415);
  }

  const id = crypto.randomUUID();
  const filename = `${id}${ext}`;
  const body = await request.arrayBuffer();

  await env.GALLERY.put(filename, body, {
    httpMetadata: { contentType },
  });

  const entry = {
    id,
    filename,
    uploadedAt: new Date().toISOString(),
  };

  try {
    await mutateManifest(env, (entries) => [entry, ...entries]);
  } catch (err) {
    // Manifest update failed — roll back the uploaded object so the bucket
    // doesn't accumulate orphans.
    await env.GALLERY.delete(filename).catch(() => {});
    throw err;
  }

  return json(entry, 201);
}

async function deleteImage(id, env) {
  let removed = null;
  await mutateManifest(env, (entries) => {
    const next = entries.filter((e) => {
      if (e.id === id) {
        removed = e;
        return false;
      }
      return true;
    });
    return next;
  });

  if (!removed) return json({ error: "image not found" }, 404);

  await env.GALLERY.delete(removed.filename);
  return json({ deleted: id });
}

// Read-modify-write the manifest with optimistic concurrency.
// R2's onlyIf.etagMatches makes the put a no-op (returns null) if the
// object changed since we read it; we re-read and retry.
async function mutateManifest(env, updateFn) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const current = await env.GALLERY.get(MANIFEST_KEY);
    const entries = current ? await current.json() : [];
    const etag = current?.etag;

    const next = updateFn(entries);
    const body = JSON.stringify(next, null, 2) + "\n";

    const putOptions = {
      httpMetadata: {
        contentType: "application/json",
        cacheControl: "no-cache",
      },
    };
    if (etag) putOptions.onlyIf = { etagMatches: etag };

    const result = await env.GALLERY.put(MANIFEST_KEY, body, putOptions);
    if (result) return next;
  }
  throw new Error("manifest update failed after retries");
}

function isAllowedReturnUrl(returnTo, env) {
  let parsed;
  try {
    parsed = new URL(returnTo);
  } catch {
    return false;
  }
  const allowed = (env.ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim());
  return allowed.includes(parsed.origin);
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });
}

function signedInPage(email) {
  const safeEmail = (email ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Signed in</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { height: 100%; margin: 0; }
  body {
    display: flex; align-items: center; justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #c084fc; color: #27272a;
  }
  .card {
    background: #fff; border-radius: 1rem; padding: 2.5rem 3rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15); text-align: center; max-width: 28rem;
  }
  h1 { margin: 0 0 0.75rem; font-size: 1.75rem; }
  p { margin: 0.5rem 0; color: #52525b; line-height: 1.5; }
  .email { font-family: monospace; color: #18181b; }
  button {
    margin-top: 1.5rem; padding: 0.75rem 1.5rem; border: none;
    border-radius: 9999px; background: #ec4899; color: #fff;
    font-weight: 600; font-size: 1rem; cursor: pointer;
  }
  button:hover { background: #db2777; }
  .check {
    width: 3rem; height: 3rem; margin: 0 auto 1rem;
    border-radius: 9999px; background: #d1fae5; color: #059669;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.75rem;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="check">&#10003;</div>
    <h1>You're signed in!</h1>
    <p>Signed in as <span class="email">${safeEmail}</span></p>
    <p>You can close this tab and head back to the admin page.</p>
    <button onclick="window.close()">Close tab</button>
  </div>
</body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
