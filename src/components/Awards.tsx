import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PDFViewer from './PDFViewer';

interface AwardsProps {
  onBack: () => void;
  darkmode: boolean;
}

export default function Awards({ onBack, darkmode }: AwardsProps) {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    console.log('Container ref:', container);
    if (!container) return;
    
    const handleScroll = () => {
      console.log('Scroll detected! scrollTop:', container.scrollTop);
      setScrollY(container.scrollTop);
    };
    
    container.addEventListener('scroll', handleScroll);
    console.log('Scroll listener added to container');
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log('Current scrollY state:', scrollY);

  // Opacity values based on dark mode
  const opacityRange = darkmode ? [0.2, 0.4, 0.2] : [0.7, 0.9, 0.7];

  const awards = [
    {
      filePath: '/awards/2025 K-POP.pdf',
      title: '2025 K-POP'
    },
    {
      filePath: '/awards/2025 Kindergarten English Literacy Competition - CHAMPION.pdf',
      title: '2025 Kindergarten English Literacy Competition - CHAMPION'
    },
    {
      filePath: '/awards/Buddhist Wing Yan School - Certification of Attendance.pdf',
      title: 'Buddhist Wing Yan School - Certification of Attendance'
    },
    {
      filePath: '/awards/Certificate of Completed THE HONG KONG DISNEYLAND 10K WEEKEND 2024.pdf',
      title: 'Certificate of Completed THE HONG KONG DISNEYLAND 10K WEEKEND 2024'
    },
    {
      filePath: '/awards/Certificate of Completed World Vision GLOBAL 6K For WATER.pdf',
      title: 'Certificate of Completed World Vision GLOBAL 6K For WATER'
    },
    {
      filePath: '/awards/HKCYAA - 全港幼兒線上認字比賽 - 銅獎.pdf',
      title: 'HKCYAA - 全港幼兒線上認字比賽 - 銅獎'
    },
    {
      filePath: '/awards/IN STEP - SUMMER MV DANCE COURSE 2024.pdf',
      title: 'IN STEP - SUMMER MV DANCE COURSE 2024'
    },
    {
      filePath: '/awards/Junior Air Cadet Certificate.pdf',
      title: 'Junior Air Cadet Certificate'
    },
    {
      filePath: '/awards/友邦嘉年華 2025 K-POP 無蹈表演.pdf',
      title: '友邦嘉年華 2025 K-POP 舞蹈表演'
    },
    {
      filePath: '/awards/端午節填色比賽 - 冠軍.pdf',
      title: '端午節填色比賽 - 冠軍'
    },
    {
      filePath: '/awards/鄰舍輔導會 - 完成 N1 課程證書.pdf',
      title: '鄰舍輔導會 - 完成 N1 課程證書'
    },
    {
      filePath: '/awards/鄰舍輔導會 - 故事創作比賽 - 創意故事大獎.pdf',
      title: '鄰舍輔導會 - 故事創作比賽 - 創意故事大獎'
    },
    {
      filePath: '/awards/鄰舍輔導會 - 賣旗嘉許證書.pdf',
      title: '鄰舍輔導會 - 賣旗嘉許證書'
    }
  ];

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col p-4 overflow-y-auto relative">
      {/* Floating decorative elements */}
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '10%',
          top: '20%',
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      >
        <motion.span 
          className="text-6xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 25, -20, 0],
            y: [0, -30, 15, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >★</motion.span>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '15%',
          top: '30%',
          transform: `translateY(${scrollY * -0.2}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -25, 30, 0],
            y: [0, 20, -25, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        > ☆</motion.span>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '5%',
          top: '60%',
          transform: `translateY(${scrollY * -0.4}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 20, -25, 0],
            y: [0, -35, 12, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >⟡</motion.span>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '8%',
          top: '70%',
          transform: `translateY(${scrollY * -0.15}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -25, 30, 0],
            y: [0, 20, -25, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        > ☆</motion.span>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '18%',
          top: '80%',
          transform: `translateY(${scrollY * -0.26}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -20, 28, 0],
            y: [0, 25, -18, 0]
          }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        >★</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '20%',
          top: '90%',
          transform: `translateY(${scrollY * -0.25}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 30, -15, 0],
            y: [0, -18, 35, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '10%',
          top: '120%',
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -25, 30, 0],
            y: [0, 20, -25, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        > ☆</motion.span>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '4%',
          top: '120%',
          transform: `translateY(${scrollY * -0.18}px)`,
        }}
      >
        <motion.span 
          className="text-6xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -35, 22, 0],
            y: [0, 28, -20, 0]
          }}
          transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.span>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '14%',
          top: '130%',
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 20, -25, 0],
            y: [0, -35, 12, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >⟡</motion.span>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '4%',
          top: '80%',
          transform: `translateY(${scrollY * -0.32}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 18, -32, 0],
            y: [0, -25, 20, 0]
          }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >★</motion.span>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '14%',
          top: '130%',
          transform: `translateY(${scrollY * -0.25}px)`,
        }}
      >
        <motion.span 
          className="text-6xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 40, -22, 0],
            y: [0, -30, 25, 0]
          }}
          transition={{ duration: 7.6, repeat: Infinity, ease: "easeInOut" }}
        >☆</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '12%',
          top: '150%',
          transform: `translateY(${scrollY * -0.28}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -30, 20, 0],
            y: [0, 15, -28, 0]
          }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        >★</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '8%',
          top: '160%',
          transform: `translateY(${scrollY * -0.35}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 25, -18, 0],
            y: [0, -20, 30, 0]
          }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        >⟡</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '6%',
          top: '170%',
          transform: `translateY(${scrollY * -0.22}px)`,
        }}
      >
        <motion.span 
          className="text-6xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -28, 35, 0],
            y: [0, 22, -15, 0]
          }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        >☆</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '16%',
          top: '180%',
          transform: `translateY(${scrollY * -0.33}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 32, -24, 0],
            y: [0, -25, 18, 0]
          }}
          transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '16%',
          top: '190%',
          transform: `translateY(${scrollY * -0.27}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -22, 28, 0],
            y: [0, 30, -20, 0]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >★</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '6%',
          top: '200%',
          transform: `translateY(${scrollY * -0.31}px)`,
        }}
      >
        <motion.span 
          className="text-6xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 38, -26, 0],
            y: [0, -32, 20, 0]
          }}
          transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
        >☆</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '10%',
          top: '210%',
          transform: `translateY(${scrollY * -0.24}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -26, 32, 0],
            y: [0, 18, -25, 0]
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >⟡</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '12%',
          top: '220%',
          transform: `translateY(${scrollY * -0.29}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 24, -30, 0],
            y: [0, -28, 22, 0]
          }}
          transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '8%',
          top: '230%',
          transform: `translateY(${scrollY * -0.34}px)`,
        }}
      >
        <motion.span 
          className="text-6xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -34, 28, 0],
            y: [0, 26, -18, 0]
          }}
          transition={{ duration: 5.9, repeat: Infinity, ease: "easeInOut" }}
        >★</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '18%',
          top: '240%',
          transform: `translateY(${scrollY * -0.26}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 28, -22, 0],
            y: [0, -24, 30, 0]
          }}
          transition={{ duration: 6.1, repeat: Infinity, ease: "easeInOut" }}
        >☆</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '14%',
          top: '250%',
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -26, 32, 0],
            y: [0, 20, -28, 0]
          }}
          transition={{ duration: 7.1, repeat: Infinity, ease: "easeInOut" }}
        >⟡</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '10%',
          top: '260%',
          transform: `translateY(${scrollY * -0.32}px)`,
        }}
      >
        <motion.span 
          className="text-6xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 36, -28, 0],
            y: [0, -30, 22, 0]
          }}
          transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '12%',
          top: '270%',
          transform: `translateY(${scrollY * -0.25}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -30, 24, 0],
            y: [0, 25, -20, 0]
          }}
          transition={{ duration: 6.3, repeat: Infinity, ease: "easeInOut" }}
        >★</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '8%',
          top: '280%',
          transform: `translateY(${scrollY * -0.28}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 22, -34, 0],
            y: [0, -26, 18, 0]
          }}
          transition={{ duration: 5.7, repeat: Infinity, ease: "easeInOut" }}
        >☆</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '6%',
          top: '290%',
          transform: `translateY(${scrollY * -0.33}px)`,
        }}
      >
        <motion.span 
          className="text-6xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -32, 26, 0],
            y: [0, 28, -22, 0]
          }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        >⟡</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '16%',
          top: '300%',
          transform: `translateY(${scrollY * -0.27}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 34, -20, 0],
            y: [0, -22, 28, 0]
          }}
          transition={{ duration: 6.7, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '18%',
          top: '310%',
          transform: `translateY(${scrollY * -0.29}px)`,
        }}
      >
        <motion.span 
          className="text-4xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -24, 30, 0],
            y: [0, 24, -18, 0]
          }}
          transition={{ duration: 8.1, repeat: Infinity, ease: "easeInOut" }}
        >★</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: '6%',
          top: '320%',
          transform: `translateY(${scrollY * -0.31}px)`,
        }}
      >
        <motion.span 
          className="text-6xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, 30, -26, 0],
            y: [0, -28, 24, 0]
          }}
          transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
        >☆</motion.span>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          right: '10%',
          top: '330%',
          transform: `translateY(${scrollY * -0.26}px)`,
        }}
      >
        <motion.span 
          className="text-5xl dark:text-pink-300 text-purple-800"
          animate={{ 
            opacity: opacityRange,
            x: [0, -28, 32, 0],
            y: [0, 26, -20, 0]
          }}
          transition={{ duration: 6.9, repeat: Infinity, ease: "easeInOut" }}
        >⟡</motion.span>
      </motion.div>

      {/* Fixed circular back button */}
      <motion.button
        initial={{ x:-120 }}
        animate={{ x:0 }}
        transition={{ delay: 1, duration: 0.3, ease: "circOut" }}
        onClick={onBack}
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full text-white transition-all
        bg-zinc-800 hover:bg-zinc-900
        dark:bg-pink-400  dark:hover:bg-pink-500 z-50 flex items-center justify-center shadow-lg"
      >
        <ArrowLeft size={24} />
      </motion.button>
      
      <h1 className="mt-32 mb-20 text-7xl md:text-8xl text-white font-chewy text-center relative z-20">My Awards</h1>
      
      <div className="flex-1 relative z-20">
        <div className="max-w-4xl mx-auto">
          {awards.map((award, index) => (
            <motion.div 
              key={index}
              className='my-12'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <PDFViewer
                filePath={award.filePath}
                title={award.title}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}