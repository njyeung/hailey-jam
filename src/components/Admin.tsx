import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Plus, LogIn, Loader2, RefreshCw } from 'lucide-react';

const API_BASE = 'https://api.haileyjam.com';
const CDN_BASE = 'https://cdn.haileyjam.nickjyeung.dev';

interface ManifestEntry {
  id: string;
  filename: string;
  uploadedAt: string;
}

export default function Admin() {
  const [entries, setEntries] = useState<ManifestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadManifest = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${CDN_BASE}/manifest.json?t=${Date.now()}`);
      if (!res.ok) throw new Error(`manifest fetch failed: ${res.status}`);
      const data: ManifestEntry[] = await res.json();
      setEntries(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // When not logged in, Access returns a 302 to its login page (different
  // origin), which would normally surface as a CORS error. Setting
  // redirect: 'manual' makes that show up as an opaqueredirect (status 0)
  // so we can detect "not authed" cleanly.
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/whoami`, {
        credentials: 'include',
        redirect: 'manual',
      });
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (await checkAuth()) {
        loadManifest();
      } else {
        setNeedsAuth(true);
        setLoading(false);
      }
    })();
  }, [checkAuth, loadManifest]);

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const res = await fetch(`${API_BASE}/images`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': file.type },
          body: file,
        });
        if (res.status === 401 || res.status === 403) {
          setNeedsAuth(true);
          return;
        }
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`upload failed (${res.status}): ${text}`);
        }
      }
      await loadManifest();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this image? This cannot be undone.')) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/images/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.status === 401 || res.status === 403) {
        setNeedsAuth(true);
        return;
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`delete failed (${res.status}): ${text}`);
      }
      await loadManifest();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setDeletingId(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Required for Firefox to initiate drag
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const fromIndex = draggedIndex;
    setDraggedIndex(null);
    setDragOverIndex(null);

    if (fromIndex === null || fromIndex === dropIndex) return;

    const prevEntries = entries;
    const newEntries = [...entries];
    const [moved] = newEntries.splice(fromIndex, 1);
    newEntries.splice(dropIndex, 0, moved);
    setEntries(newEntries);

    try {
      const res = await fetch(`${API_BASE}/manifest`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newEntries.map((entry) => entry.id) }),
      });
      if (res.status === 401 || res.status === 403) {
        setEntries(prevEntries);
        setNeedsAuth(true);
        return;
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`reorder failed (${res.status}): ${text}`);
      }
    } catch (err) {
      setEntries(prevEntries);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  if (needsAuth) {
    return (
      <div className="min-h-screen bg-purple-400 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <LogIn className="mx-auto mb-4 text-pink-500" size={48} />
          <h1 className="font-chewy text-3xl text-zinc-800 mb-3">Sign in required</h1>
          <p className="text-zinc-600 mb-6">
            Open the sign-in page, enter your email and authorize with the code that is sent to you.
          </p>
          <a
            href={`${API_BASE}/signed-in?return=${encodeURIComponent(window.location.href)}`}
            className="inline-block px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors"
          >
            Sign in →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-400 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-chewy text-5xl sm:text-6xl text-white">
            Admin
          </h1>
          <div className="flex items-center gap-3 text-sm text-white/80">
            <button
              onClick={loadManifest}
              disabled={loading}
              className="flex items-center gap-1.5 hover:text-white disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => {
                window.open(`${API_BASE}/cdn-cgi/access/logout`, '_blank');
                // Give Access a moment to clear the cookie before we flip
                // back to the sign-in screen so the poller doesn't see a
                // stale authenticated session.
                setTimeout(() => setNeedsAuth(true), 1500);
              }}
              className="hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 rounded-lg p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleUpload(e.target.files);
              e.target.value = '';
            }
          }}
        />

        {loading ? (
          <div className="text-center py-20 text-white/80">
            <Loader2 className="mx-auto animate-spin" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {entries.map((entry, index) => {
              const isDragged = draggedIndex === index;
              const isDragOver = dragOverIndex === index && draggedIndex !== index;
              return (
                <div
                  key={entry.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`relative rounded-lg overflow-hidden bg-zinc-100 aspect-square shadow-md cursor-grab active:cursor-grabbing transition-all ${
                    isDragged ? 'opacity-40 scale-95' : ''
                  } ${isDragOver ? 'ring-4 ring-pink-300 scale-105' : ''}`}
                >
                  <img
                    src={`${CDN_BASE}/${entry.filename}`}
                    alt={entry.id}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    loading="lazy"
                    draggable={false}
                  />
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={deletingId === entry.id}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg disabled:opacity-60 transition-colors"
                    title="Delete"
                    aria-label="Delete image"
                  >
                    {deletingId === entry.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <X size={18} strokeWidth={3} />
                    )}
                  </button>
                </div>
              );
            })}

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="aspect-square rounded-lg bg-green-400 hover:bg-green-500 disabled:bg-green-400 disabled:cursor-wait text-white flex items-center justify-center shadow-md transition-colors"
              title="Upload new images"
              aria-label="Upload new images"
            >
              {uploading ? (
                <Loader2 size={48} className="animate-spin" />
              ) : (
                <Plus className='text-green-800' size={64} strokeWidth={2.5} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
