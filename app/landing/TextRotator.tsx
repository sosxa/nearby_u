'use client';

import { useState, useEffect } from 'react';

export const TextRotator = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span className="relative inline-block min-h-[1em]">
      <span
        key={currentTextIndex}
        className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 
                  opacity-0 animate-fadeIn"
      >
        {texts[currentTextIndex]}
      </span>
      <span className="invisible">{texts[0]}</span>
    </span>
  );
};