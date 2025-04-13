"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ExcludeSvg from "@/components/Icons/ExcludeSvg";


const SlideLeft = () => {
  const images = ["/images/bg1.png", "/images/bg2.png", "/images/bg3.png"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

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
    <div className="flex h-screen">
      {/* Left Content */}
      <div className="flex-1 flex justify-center items-center bg-white relative">
        <div className="absolute left-0 bottom-0 z-0">
          {/* <ExcludeSvg /> */}
        </div>
        <div className="z-10 px-2 md:px-0 w-full max-w-96">
          {/* <LoginForm /> */}
        </div>
      </div>

      {/* Right Content */}
      <div className="hidden relative lg:flex flex-1 overflow-hidden justify-center items-center bg-amber-300">
        <div className="relative overflow-hidden w-full h-full">
          <div
            className={`flex transition-transform ease-in-out ${
              isResetting ? "duration-1000" : "duration-700"
            }`}
            style={{
              transform: `translateX(-${
                isResetting ? 0 : currentIndex * 100
              }%)`,
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
          <div className="absolute flex flex-col items-center justify-center gap-10 italic inset-0 bg-gray-950/30">
            <h1 className="text-whtie text-5xl text-white font-bold italic">
              TITLE OF THE CAROUSEL
            </h1>
            <p className="text-whtie text-xl text-white font-semibold italic">
              Description of the caroulse...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideLeft;
