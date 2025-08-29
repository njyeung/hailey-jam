import { useState, useEffect } from 'react';
import AboutMeEn from './AboutMeEn';
import AboutMeCn from './AboutMeCn';

interface AboutMeProps {
  onBack: () => void;
  onNavigateToAwards?: () => void;
}

export default function AboutMe({ onBack, onNavigateToAwards }: AboutMeProps) {
  const [isEnglish, setIsEnglish] = useState(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('aboutMeLanguage');
    if (savedLanguage === 'english') {
      setIsEnglish(true);
    }
  }, []);

  const toggleLanguage = () => {
    const newIsEnglish = !isEnglish;
    setIsEnglish(newIsEnglish);
    // Save language preference to localStorage
    localStorage.setItem('aboutMeLanguage', newIsEnglish ? 'english' : 'chinese');
  };

  if (isEnglish) {
    return <AboutMeEn onBack={onBack} onToggleLanguage={toggleLanguage} onNavigateToAwards={onNavigateToAwards} />;
  }

  return <AboutMeCn onBack={onBack} onToggleLanguage={toggleLanguage} onNavigateToAwards={onNavigateToAwards} />;
}