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
    <div className="relative overflow-hidden w-[600px] h-[700px]">
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
            className="w-auto h-auto"
          />
        ))}
      </div>
      <div className='absolute flex flex-col items-center justify-center gap-10 italic inset-0 bg-gray-950/30'>
        <h1 className='text-whtie text-5xl text-white font-bold italic'>TITLE OF THE CAROUSEL</h1>
        <p className='text-whtie text-xl text-white font-semibold italic'>Description of the caroulse...</p>
      </div>
    </div>
  );
};

export default Carousel;
