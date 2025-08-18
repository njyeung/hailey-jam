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
      
      <h1 className="mt-20 text-7xl text-white font-chewy text-center mb-8 relative z-20">My Awards</h1>
      
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