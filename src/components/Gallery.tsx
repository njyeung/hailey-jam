import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryProps {
  onBack: () => void;
}


export default function Gallery({ onBack }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Generate array of all images (excluding image_03.jpg)
  const images = Array.from({ length: 60 }, (_, i) => i + 1)
    .filter(num => num !== 3) // Skip image_03.jpg
    .map(num => ({
      src: `/gallery/image_${String(num).padStart(2, '0')}.jpg`,
      alt: `Gallery image ${num}`
    }));

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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className="relative aspect-square overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            {/* Close button - fixed to modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseModal();
              }}
              className="fixed top-8 right-8 md:top-10 md:right-10 z-10 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all"
            >
              <X size={20} />
            </button>

            {/* Previous button - fixed to modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="fixed left-4 md:left-16 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next button - fixed to modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="fixed right-4 md:right-16 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Main image */}
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}