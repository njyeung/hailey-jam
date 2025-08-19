import React from 'react';
import { motion } from 'framer-motion';

interface WaveTransitionProps {
  isVisible: boolean;
  onComplete?: () => void;
  darkMode?: boolean;
}

export default function WaveTransition({ isVisible, onComplete, darkMode = false }: WaveTransitionProps) {
  const backgroundClass = darkMode 
    ? "bg-zinc-800"
    : "bg-purple-400";

  return (
    <motion.div
      className={`fixed inset-0 z-50 pointer-events-none ${backgroundClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (isVisible && onComplete) {
          setTimeout(onComplete, 200);
        }
      }}
    />
  );
}