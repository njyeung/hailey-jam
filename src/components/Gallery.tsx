import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ImageModal from './ImageModal';

const CDN_BASE = 'https://cdn.haileyjam.nickjyeung.dev';

interface ManifestEntry {
  id: string;
  filename: string;
  uploadedAt: string;
}

interface GalleryProps {
  onBack: () => void;
}


export default function Gallery({ onBack }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${CDN_BASE}/manifest.json?t=${Date.now()}`);
        if (!res.ok) throw new Error(`failed to load gallery (${res.status})`);
        const entries: ManifestEntry[] = await res.json();
        setImages(
          entries.map((entry) => ({
            src: `${CDN_BASE}/${entry.filename}`,
            alt: 'Hailey gallery',
          })),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 overflow-y-auto bg-purple-400 dark:bg-zinc-800 relative">
      {/* Heart SVG Pattern Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-8">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hearts" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Main heart - pink-400 */}
              <path d="M50 75c-15-15-25-25-25-35 0-8 6-14 14-14 4 0 8 2 11 5 3-3 7-5 11-5 8 0 14 6 14 14 0 10-10 20-25 35z" fill="#f9a8d4" opacity="0.6"/>

              {/* Small hearts */}
              <path d="M20 25c-6-6-10-10-10-14 0-3 2-6 6-6 2 0 3 1 4 2 1-1 2-2 4-2 4 0 6 3 6 6 0 4-4 8-10 14z" fill="#f9a8d4" opacity="0.5"/>
              <path d="M80 80c-6-6-10-10-10-14 0-3 2-6 6-6 2 0 3 1 4 2 1-1 2-2 4-2 4 0 6 3 6 6 0 4-4 8-10 14z" fill="#f9a8d4" opacity="0.4"/>
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#hearts)"/>
        </svg>
      </div>

      {/* Fixed circular back button */}
      <motion.button
        initial={{ x: -120 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, duration: 0.3, ease: "circOut" }}
        onClick={onBack}
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full text-white transition-all
        bg-zinc-800 hover:bg-zinc-900
        dark:bg-pink-400 dark:hover:bg-pink-500 z-50 flex items-center justify-center shadow-lg"
      >
        <ArrowLeft size={24} />
      </motion.button>

      <h1 className="mt-32 mb-20 text-7xl md:text-8xl text-white font-chewy text-center relative z-20">
        My Gallery
      </h1>

      <div className="flex-1 max-w-md sm:max-w-xl md:max-w-3xl xl:max-w-5xl mx-auto w-full relative z-10">
        {loading ? (
          <div className="flex justify-center py-20 text-white/80">
            <Loader2 className="animate-spin" size={40} />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-white/90 font-chewy text-xl">
            Couldn't load the gallery — {error}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className="relative aspect-square overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-700 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageModal
        images={images.map(img => img.src)}
        selectedIndex={selectedImageIndex}
        onClose={handleCloseModal}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        showNavigation={true}
      />
    </div>
  );
}
