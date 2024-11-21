"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Carousel = () => {
  const images = [
    '/images/bg1.png', 
    '/images/bg2.png',
    '/images/bg3.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false); // For full reset animation

  useEffect(() => {
    const interval = setInterval(() => {
      if (isResetting) return; // Skip interval logic during reset

      if (currentIndex === images.length - 1) {
        // Pause for 300ms, then trigger full reset
        setTimeout(() => {
          setIsResetting(true);
          setCurrentIndex(0); // Reset to the first image
        }, 300); // Pause duration
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1); // Normal slide
      }
    }, 3000); // Normal interval for each slide

    return () => clearInterval(interval);
  }, [currentIndex, isResetting, images.length]);

  // Handle animation reset
  useEffect(() => {
    if (isResetting) {
      const resetTimer = setTimeout(() => {
        setIsResetting(false); // End reset state after transition completes
      }, 300); // Reset slide duration

      return () => clearTimeout(resetTimer);
    }
  }, [isResetting]);

  return (
    <div className="relative overflow-hidden w-60 h-64">
      <div
        className={`flex transition-transform ease-in-out ${
          isResetting ? 'duration-300' : 'duration-200'
        }`}
        style={{
          transform: `translateX(-${isResetting ? 0 : currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <Image
            height={920}
            width={947}
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-64 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
