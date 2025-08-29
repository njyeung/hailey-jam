import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Users, Palette, Wrench, Zap, HandHeart, Award, Camera } from 'lucide-react';
import ImageModal from './ImageModal';

interface AboutMeEnProps {
  onBack: () => void;
  onToggleLanguage: () => void;
  onNavigateToAwards?: () => void;
}

export default function AboutMeEn({ onBack, onToggleLanguage, onNavigateToAwards }: AboutMeEnProps) {
  const [selectedTraitIndex, setSelectedTraitIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedFamilyIndex, setSelectedFamilyIndex] = useState<number | null>(null);

  const traitImages = [
    ["/gallery/image_01.jpg", "/gallery/image_02.jpg"],
    ["/gallery/image_04.jpg", "/gallery/image_05.jpg"],
    ["/gallery/image_06.jpg", "/gallery/image_07.jpg"],
    ["/gallery/image_08.jpg", "/gallery/image_09.jpg"],
    ["/gallery/image_10.jpg", "/gallery/image_11.jpg"],
    ["/gallery/image_12.jpg", "/gallery/image_13.jpg"]
  ];

  const familyImages = [
    "/gallery/image_10.jpg",
    "/gallery/image_29.jpg", 
    "/gallery/image_42.jpg",
    "/gallery/image_48.jpg",
    "/gallery/image_55.jpg"
  ];

  const handleImageClick = (traitIndex: number, imageIndex: number) => {
    setSelectedTraitIndex(traitIndex);
    setSelectedImageIndex(imageIndex);
  };

  const handleFamilyImageClick = (imageIndex: number) => {
    setSelectedFamilyIndex(imageIndex);
  };

  const handleCloseModal = () => {
    setSelectedTraitIndex(null);
    setSelectedImageIndex(null);
    setSelectedFamilyIndex(null);
  };

  const handlePrevImage = () => {
    if (selectedTraitIndex !== null && selectedImageIndex !== null) {
      const currentTraitImages = traitImages[selectedTraitIndex];
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : currentTraitImages.length - 1);
    } else if (selectedFamilyIndex !== null) {
      setSelectedFamilyIndex(selectedFamilyIndex > 0 ? selectedFamilyIndex - 1 : familyImages.length - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedTraitIndex !== null && selectedImageIndex !== null) {
      const currentTraitImages = traitImages[selectedTraitIndex];
      setSelectedImageIndex(selectedImageIndex < currentTraitImages.length - 1 ? selectedImageIndex + 1 : 0);
    } else if (selectedFamilyIndex !== null) {
      setSelectedFamilyIndex(selectedFamilyIndex < familyImages.length - 1 ? selectedFamilyIndex + 1 : 0);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 overflow-y-auto bg-purple-400 dark:bg-zinc-800 relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 dark:opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stars" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#f9a8d4" opacity="0.6"/>
              <circle cx="60" cy="40" r="1.5" fill="#f9a8d4" opacity="0.4"/>
              <circle cx="40" cy="60" r="1" fill="#f9a8d4" opacity="0.5"/>
              <path d="M30 30 L32 35 L37 35 L33 38 L35 43 L30 40 L25 43 L27 38 L23 35 L28 35 Z" fill="#f9a8d4" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars)"/>
        </svg>
      </div>

      {/* Fixed Back Button */}
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

      {/* Language Toggle Button */}
      <motion.button
        initial={{ x: 120 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, duration: 0.3, ease: "circOut" }}
        onClick={onToggleLanguage}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full text-white transition-all
        bg-zinc-800 hover:bg-zinc-900
        dark:bg-pink-400 dark:hover:bg-pink-500 z-50 flex items-center justify-center shadow-lg"
      >
        <div className="flex flex-col items-center text-xs font-bold">
          <span className='text-lg'>中</span>
        </div>
      </motion.button>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full relative z-10 space-y-8">
        
        {/* Header */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 mb-8 text-6xl md:text-7xl text-white font-chewy text-center"
        >
          Profile
        </motion.h1>

        {/* Personal Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-700 rounded-2xl p-6 shadow-lg border-4 border-zinc-800 dark:border-pink-200"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-pink-400">
              <img src="/pfp.jpg" alt="Student photo" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-chewy text-zinc-800 dark:text-white mb-2">Hailey Jam</h2>
              <div className="text-lg text-zinc-600 dark:text-zinc-300 space-y-1">
                <p><strong>Date of Birth: March 15, 2019</strong></p>
                <p><strong>Age: 5 years old</strong></p>
                <p><strong>Location: Central & Western District, Hong Kong Island</strong></p>
              </div>
              <p className="mt-3 text-zinc-700 dark:text-zinc-200 text-base leading-relaxed">
                I am a curious and creative little girl who loves drawing, crafting, and playing with small animals. I hope to make more friends and learn new knowledge at my new school!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Traits Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl font-chewy text-white text-center mb-6">Growth Traits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-zinc-700 rounded-xl p-4 shadow-lg border-2 border-pink-300 dark:border-pink-400"
            >
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-6 h-6 text-pink-500" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">With Small Animals</h3>
                  <p className="text-pink-500 text-xs font-medium">Kindness</p>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(0, 0)}>
                  <img src="/gallery/image_01.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(0, 1)}>
                  <img src="/gallery/image_02.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">Feeding rabbits at the farm—gentle and patient</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-zinc-700 rounded-xl p-4 shadow-lg border-2 border-pink-300 dark:border-pink-400"
            >
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-pink-500" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">Playing with Friends</h3>
                  <p className="text-pink-500 text-xs font-medium">Communication Skills</p>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(1, 0)}>
                  <img src="/gallery/image_04.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(1, 1)}>
                  <img src="/gallery/image_05.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">Playing together at playground—friendly and cooperative</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-zinc-700 rounded-xl p-4 shadow-lg border-2 border-pink-300 dark:border-pink-400"
            >
              <div className="flex items-center gap-3 mb-3">
                <Palette className="w-6 h-6 text-pink-500" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">Art in Action</h3>
                  <p className="text-pink-500 text-xs font-medium">Artistic Talent</p>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(2, 0)}>
                  <img src="/gallery/image_06.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(2, 1)}>
                  <img src="/gallery/image_07.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">Creating watercolor paintings—full of creativity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-zinc-700 rounded-xl p-4 shadow-lg border-2 border-pink-300 dark:border-pink-400"
            >
              <div className="flex items-center gap-3 mb-3">
                <Wrench className="w-6 h-6 text-pink-500" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">Building & Crafting</h3>
                  <p className="text-pink-500 text-xs font-medium">Hand-Eye Coordination</p>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(3, 0)}>
                  <img src="/gallery/image_08.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(3, 1)}>
                  <img src="/gallery/image_09.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">Making clay sculptures—careful and focused</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-zinc-700 rounded-xl p-4 shadow-lg border-2 border-pink-300 dark:border-pink-400"
            >
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-pink-500" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">Sports Activities</h3>
                  <p className="text-pink-500 text-xs font-medium">Athletic</p>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(4, 0)}>
                  <img src="/gallery/image_10.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(4, 1)}>
                  <img src="/gallery/image_11.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">Hiking and playing sports with parents—energetic</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-zinc-700 rounded-xl p-4 shadow-lg border-2 border-pink-300 dark:border-pink-400"
            >
              <div className="flex items-center gap-3 mb-3">
                <HandHeart className="w-6 h-6 text-pink-500" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">Volunteering</h3>
                  <p className="text-pink-500 text-xs font-medium">Community Contribution</p>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(5, 0)}>
                  <img src="/gallery/image_12.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleImageClick(5, 1)}>
                  <img src="/gallery/image_13.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">Participating in volunteer services—helpful</p>
            </motion.div>

          </div>
        </motion.div>

        {/* Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-chewy text-white text-center mb-6">Activity Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-pink-300 dark:bg-zinc-700 rounded-xl p-5 shadow-lg border-2 border-zinc-800 dark:border-pink-200">
              <h3 className="text-xl font-chewy text-zinc-800 dark:text-white mb-3 text-center">
                Art Creation
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  Watercolor paintings displayed in kindergarten
                </li>
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  Enjoys creating abstract art with different paints
                </li>
              </ul>
            </div>

            <div className="bg-pink-300 dark:bg-zinc-700 rounded-xl p-5 shadow-lg border-2 border-zinc-800 dark:border-pink-200">
              <h3 className="text-xl font-chewy text-zinc-800 dark:text-white mb-3 text-center">
                Hands-on Making
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  Skilled at sculpting small animals with clay
                </li>
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  Can independently complete complex puzzle models
                </li>
              </ul>
            </div>

            <div className="bg-pink-300 dark:bg-zinc-700 rounded-xl p-5 shadow-lg border-2 border-zinc-800 dark:border-pink-200">
              <h3 className="text-xl font-chewy text-zinc-800 dark:text-white mb-3 text-center">
                Sports & Recreation
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  Attends kindergarten badminton interest class
                </li>
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  Weekend hiking with family is favorite activity
                </li>
              </ul>
            </div>

          </div>
        </motion.div>

        {/* Family & Growth Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-zinc-700 rounded-2xl p-6 shadow-lg border-4 border-zinc-800 dark:border-pink-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-chewy text-zinc-800 dark:text-white">Family & Growth</h2>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {familyImages.map((img, index) => (
              <div key={index} className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleFamilyImageClick(index)}>
                <img src={img} alt="Family photo" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            We are a warm family of three. Mom and Dad are very supportive of my learning and interests. We often travel and hike together, experiencing different aspects of life.
          </p>
        </motion.div>

        {/* Documents Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-pink-300 dark:bg-zinc-700 rounded-xl p-5 shadow-lg border-2 border-zinc-800 dark:border-pink-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-chewy text-zinc-800 dark:text-white">Supporting Documents</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            <div className="bg-white dark:bg-zinc-600 rounded-lg p-3">
              <div className="w-12 h-12 mx-auto mb-2 bg-pink-400 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">English Literacy</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">CHAMPION</p>
            </div>

            <div className="bg-white dark:bg-zinc-600 rounded-lg p-3">
              <div className="w-12 h-12 mx-auto mb-2 bg-purple-400 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">Coloring Contest</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">Champion</p>
            </div>

            <div className="bg-white dark:bg-zinc-600 rounded-lg p-3">
              <div className="w-12 h-12 mx-auto mb-2 bg-pink-400 rounded-lg flex items-center justify-center">
                <HandHeart className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">Flag Sales</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">Appreciation</p>
            </div>

            <div className="bg-white dark:bg-zinc-600 rounded-lg p-3">
              <div className="w-12 h-12 mx-auto mb-2 bg-purple-400 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">Disney 10K</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">Completion</p>
            </div>

          </div>
          
          {/* View All Awards Button */}
          {onNavigateToAwards && (
            <div className="mt-6 text-center">
              <button
                onClick={onNavigateToAwards}
                className="bg-zinc-800 hover:bg-zinc-900 dark:bg-pink-400 dark:hover:bg-pink-500 text-white px-6 py-3 rounded-lg font-chewy text-lg transition-all hover:scale-105 shadow-lg"
              >
                View All Awards & Certificates
              </button>
            </div>
          )}
          
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-300 mt-4">
            13 detailed certificates and awards available to view
          </p>
        </motion.div>

        <div className="h-20"></div>
      </div>

      {/* Image Modal */}
      {selectedTraitIndex !== null && selectedImageIndex !== null && (
        <ImageModal
          images={traitImages[selectedTraitIndex]}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseModal}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          showNavigation={true}
        />
      )}

      {/* Family Image Modal */}
      {selectedFamilyIndex !== null && (
        <ImageModal
          images={familyImages}
          selectedIndex={selectedFamilyIndex}
          onClose={handleCloseModal}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          showNavigation={true}
        />
      )}
    </div>
  );
}