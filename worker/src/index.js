// Cloudflare Worker for managing the gallery R2 bucket.
//
// Public image reads go directly to the bucket's custom domain
// (cdn.haileyjam.nickjyeung.dev). This worker only handles mutations
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

  if (pathname === "/images" && request.method === "POST") {
    return uploadImage(request, env);
  }

  const idMatch = pathname.match(/^\/images\/([a-f0-9-]{36})$/);
  if (idMatch && request.method === "DELETE") {
    return deleteImage(idMatch[1], env);
  }

  return json({ error: "not found" }, 404);
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

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, DELETE, OPTIONS",
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
