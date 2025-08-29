import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Users, Palette, Wrench, Zap, HandHeart, Award, Camera } from 'lucide-react';
import ImageModal from './ImageModal';

interface AboutMeCnProps {
  onBack: () => void;
  onToggleLanguage: () => void;
  onNavigateToAwards?: () => void;
}

export default function AboutMeCn({ onBack, onToggleLanguage, onNavigateToAwards }: AboutMeCnProps) {
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
          <span className='text-lg'>EN</span>
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
          個人資料表
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
              <img src="/pfp.jpg" alt="學生照片" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-chewy text-zinc-800 dark:text-white mb-2">詹希璇</h2>
              <div className="text-lg text-zinc-600 dark:text-zinc-300 space-y-1">
                <p><strong>出生日期: 2019年3月15日</strong></p>
                <p><strong>年齡: 5歲</strong></p>
                <p><strong>居住地區: 元朗豐祥路88號Residence 88第二座18樓G室</strong></p>
              </div>
              <p className="mt-3 text-zinc-700 dark:text-zinc-200 text-base leading-relaxed">
                我是一個充滿好奇心和創意的小女孩，喜歡畫畫、做手工，也愛和小動物玩耍。我希望在新學校裡交到更多朋友，學到更多新知識！
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
          <h2 className="text-4xl font-chewy text-white text-center mb-6">成長特質展示</h2>
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
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">與小動物相處</h3>
                  <p className="text-pink-500 text-xs font-medium">有愛心</p>
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
              <p className="text-xs text-zinc-600 dark:text-zinc-300">在農場餵兔子—溫柔耐心</p>
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
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">與朋友玩樂</h3>
                  <p className="text-pink-500 text-xs font-medium">溝通能力</p>
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
              <p className="text-xs text-zinc-600 dark:text-zinc-300">在遊樂場和朋友一起玩—友善合作</p>
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
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">畫畫中</h3>
                  <p className="text-pink-500 text-xs font-medium">藝術天分</p>
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
              <p className="text-xs text-zinc-600 dark:text-zinc-300">專注創作水彩畫—充滿創意</p>
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
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">砌模型製作</h3>
                  <p className="text-pink-500 text-xs font-medium">手眼協調</p>
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
              <p className="text-xs text-zinc-600 dark:text-zinc-300">製作紙黏土作品—細心專注</p>
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
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">運動活動</h3>
                  <p className="text-pink-500 text-xs font-medium">運動型</p>
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
              <p className="text-xs text-zinc-600 dark:text-zinc-300">與爸媽行山踢波—活力充沛</p>
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
                  <h3 className="font-bold text-zinc-800 dark:text-white text-sm">做善事</h3>
                  <p className="text-pink-500 text-xs font-medium">貢獻社會</p>
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
              <p className="text-xs text-zinc-600 dark:text-zinc-300">參與義工服務—樂於助人</p>
            </motion.div>

          </div>
        </motion.div>

        {/* Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-chewy text-white text-center mb-6">活動專長</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-pink-300 dark:bg-zinc-700 rounded-xl p-5 shadow-lg border-2 border-zinc-800 dark:border-pink-200">
              <h3 className="text-xl font-chewy text-zinc-800 dark:text-white mb-3 text-center">
                藝術創作 Art
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  水彩畫作品在幼兒園展出
                </li>
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  喜歡用不同顏料創作抽象畫
                </li>
              </ul>
            </div>

            <div className="bg-pink-300 dark:bg-zinc-700 rounded-xl p-5 shadow-lg border-2 border-zinc-800 dark:border-pink-200">
              <h3 className="text-xl font-chewy text-zinc-800 dark:text-white mb-3 text-center">
                手工製作 Making
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  擅長紙黏土雕塑小動物
                </li>
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  能獨立完成複雜的拼圖模型
                </li>
              </ul>
            </div>

            <div className="bg-pink-300 dark:bg-zinc-700 rounded-xl p-5 shadow-lg border-2 border-zinc-800 dark:border-pink-200">
              <h3 className="text-xl font-chewy text-zinc-800 dark:text-white mb-3 text-center">
                體育運動 Sports
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  參加幼兒園羽毛球興趣班
                </li>
                <li className="text-sm text-zinc-700 dark:text-zinc-200 flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  週末與家人行山是最愛活動
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
            <h2 className="text-2xl font-chewy text-zinc-800 dark:text-white">家庭與成長</h2>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {familyImages.map((img, index) => (
              <div key={index} className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-200 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleFamilyImageClick(index)}>
                <img src={img} alt="家庭照片" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            我們是一個溫暖的四口之家，爸爸媽媽很支持我的學習和興趣發展。我們經常一起去旅行、行山，體驗不同的生活。
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
            <h2 className="text-2xl font-chewy text-zinc-800 dark:text-white">其他補充材料</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            <div className="bg-white dark:bg-zinc-600 rounded-lg p-3">
              <div className="w-12 h-12 mx-auto mb-2 bg-pink-400 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">英語識字比賽</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">冠軍</p>
            </div>

            <div className="bg-white dark:bg-zinc-600 rounded-lg p-3">
              <div className="w-12 h-12 mx-auto mb-2 bg-purple-400 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">端午節填色比賽</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">冠軍</p>
            </div>

            <div className="bg-white dark:bg-zinc-600 rounded-lg p-3">
              <div className="w-12 h-12 mx-auto mb-2 bg-pink-400 rounded-lg flex items-center justify-center">
                <HandHeart className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">賣旗嘉許</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">證書</p>
            </div>

            <div className="bg-white dark:bg-zinc-600 rounded-lg p-3">
              <div className="w-12 h-12 mx-auto mb-2 bg-purple-400 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">迪士尼10K</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">完成證書</p>
            </div>

          </div>
          
          {/* View All Awards Button */}
          {onNavigateToAwards && (
            <div className="mt-6 text-center">
              <button
                onClick={onNavigateToAwards}
                className="bg-zinc-800 hover:bg-zinc-900 dark:bg-pink-400 dark:hover:bg-pink-500 text-white px-6 py-3 rounded-lg font-chewy text-lg transition-all hover:scale-105 shadow-lg"
              >
                查看所有獎項證書
              </button>
            </div>
          )}
          
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-300 mt-4">
            13份詳細證書和獎項可供查看
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