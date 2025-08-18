import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Cloud from './components/Cloud';
import Moon from './components/Moon';
import AboutMe from './components/AboutMe';
import Activities from './components/Activities';
import Awards from './components/Awards';
import Gallery from './components/Gallery';


export default function App() {
  const buttonData = [
    { image: '/kuromi_blush.png', label: 'About me' },
    { image: '/kuromi_heart_eyes.png', label: 'Activities' },
    { image: '/kuromi_stunned.png', label: 'Awards' },
    { image: '/kuromi_smirk.png', label: 'Gallery' }
  ];

  const [darkmode, setDarkmode] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'activities' | 'awards' | 'gallery'>('home');

  const handlePageNavigation = (page: 'about' | 'activities' | 'awards' | 'gallery') => {
    setCurrentPage(page);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutMe onBack={handleBackToHome} />;
      case 'activities':
        return <Activities onBack={handleBackToHome} />;
      case 'awards':
        return <Awards onBack={handleBackToHome} darkmode={darkmode} />;
      case 'gallery':
        return <Gallery onBack={handleBackToHome} />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <>
      {/* bg moon n shit */}
      <div className='absolute w-full h-full flex justify-center items-center px-10 py-10 z-20 pointer-events-none'>
        <div className='w-full h-full relative
        max-w-full
        md:max-w-[800px]
        lg:max-w-[1200px]
        xl:max-w-[1400px]
        '>
          <motion.div
            animate={{ rotate: [0, 2, -3, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 8, 
              ease: "easeInOut" 
            }}
            className='hover:cursor-pointer pointer-events-auto'
            onClick={()=>{setDarkmode((prev)=>!prev)}}
          >
            <Moon className='text-purple-800 dark:text-purple-400 w-14 h-14 sm:w-24 sm:h-24' size={100} />
          </motion.div>
        
          <div className='select-none absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-zinc-700 dark:text-zinc-600 text-xl md:text-3xl font-sans'> ✩ ₊ ˚ . ⋆ ☾ ⋆ ⁺ ₊ ✧</div>
        </div>
      </div>
      
      
      <div className='w-full h-full flex justify-center items-center px-3 py-6 relative'>
          <div className='p-3 max-w-full max-h-full rounded-xl bg-pink-400 border-[8px] border-zinc-800 dark:border-pink-200 relative
          w-[300px] h-[600px]
          sm:w-[500px] sm:h-[375px]
          md:w-[600px] md:h-[450px]
          lg:w-[700px] lg:h-[525px]
          xl:w-[800px] xl:h-[600px]
          '>
            
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ 
                x: [0, -4, 0], 
                y: [0, -6, 0],
                opacity: [1, 0.8, 1] 
              }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2, 
                ease: "easeOut",
                x: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.2 },
                y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.2 },
                opacity: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.2 }
              }}
              className='absolute text-white
              -top-44 -right-20
              md:-top-48 md:right-0'
            >
              <Cloud size={200} />
            </motion.div>
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ 
                x: [0, 4, 0], 
                y: [0, 3, 0],
                opacity: [1, 0.8, 1] 
              }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5, 
                ease: "easeOut",
                x: { repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1.7 },
                y: { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.7 },
                opacity: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.7 }
              }}
              className='absolute text-white
              -top-3 -right-28
              md:-top-28 md:-right-48'
            >
              <Cloud size={130} />
            </motion.div>
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ 
                x: [0, -3, 0], 
                y: [0, 6, 0],
                opacity: [1, 0.8, 1] 
              }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8, 
                ease: "easeOut",
                x: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2.0 },
                y: { repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 2.0 },
                opacity: { repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 2.0 }
              }}
              className='absolute text-white
              top-24 -right-16 
              md:-top-44 md:-right-20'
            >
              <Cloud size={110} />
            </motion.div>

            <div className='font-chewy w-full h-full flex flex-col select-none'>
              <div className='mt-12 mb-12 sm:mt-5 sm:mb-5 md:mt-16 '>
                <span className='flex flex-row items-baseline gap-3 w-full justify-center'>
                  <img className='w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full translate-y-3' src="/pfp.jpg" alt="Hailey" />
                  <h1 className='text-center text-4xl sm:text-7xl md:text-8xl text-white'>Hailey Jam </h1>
                </span>
                <p className='text-center mt-4 sm:mt-6 text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl'>something • something • something</p>
              </div>
              
              
              <div className='md:px-12 px-3 w-full h-full transition-all
              grid grid-cols-2 place-items-center aspect-square
              sm:flex sm:flex-row sm:justify-between sm:items-center sm:aspect-auto text-xl sm:text-base md:text-lg lg:text-2xl xl:text-3xl text-white'>
                {buttonData.map((button, index) => {
                  const pageMap = ['about', 'activities', 'awards', 'gallery'] as const;
                  return (
                    <button
                      key={index}
                      onClick={() => handlePageNavigation(pageMap[index])} 
                      className='hover:cursor-pointer hover:scale-105 group border-zinc-700 hover:border-pink-300 transition-all
                      w-28 h-28 sm:w-24 sm:h-24 md:h-28 md:w-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 border-[4px] p-2 bg-zinc-600 rounded-lg flex justify-center items-center flex-col gap-2'
                    >
                      <img className='w-14 sm:w-12 lg:w-16 group-hover:rotate-12 group-hover:scale-105hover:cursor-pointer group-hover:scale-110' src={button.image} alt="kuromi" />
                      <span>{button.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
      </div>
    </>
  );

  return (
    <div className={`${darkmode ? 'dark' : ''}`}>
      <div className="w-screen h-screen bg-purple-400 dark:bg-zinc-800 overflow-hidden relative">
        {renderPage()}
      </div>
    </div>
  );
}

// bg-white
// bg-pink-300
// bg-pink-400
// bg-purple-400
// bg-purple-800
// bg-zinc-600
// bg-zinc-700
// bg-zinc-800

// About me
// activities
// awards
// gallery
