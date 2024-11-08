import React, { useState, useEffect } from 'react';
import { Star, Rocket } from 'lucide-react';

const BackgroundSpace = () => {
  const [scrollY, setScrollY] = useState(0);

  // Scroll-Event-Handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-black to-gray-900 -z-10 opaciy-96">
      {/* Parallax Elemente */}
      <Rocket 
        className="absolute text-primary opacity-20 w-40 h-40 left-10 top-20 animate-slow-pulse" 
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <Star 
        className="absolute text-primary opacity-20 w-32 h-32 left-1/3 bottom-20 animate-slow-pulse"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      
      {/* Zusätzliche animierte Sterne */}
      <div className="absolute w-2 h-2 bg-primary rounded-full animate-twinkle"
        style={{
          left: '60%',
          top: '30%',
          animationDelay: '0.5s'
        }}
      />
      <div className="absolute w-1 h-1 bg-primary rounded-full animate-twinkle"
        style={{
          left: '80%',
          top: '50%',
          animationDelay: '1.5s'
        }}
      />
    </div>
  );
};

export default BackgroundSpace;