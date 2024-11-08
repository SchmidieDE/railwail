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
   <></>
  );
};

export default BackgroundSpace;