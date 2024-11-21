"use client"

import { useState, useEffect } from "react";

const DotCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zIndex, setZIndex] = useState([1, 0, 0]); // Z-index management

  const updateCarousel = () => {
    // Update the positions and z-index
    setZIndex((prev) => {
      const newZIndex = [...prev];
      const first = newZIndex.shift();
      newZIndex.push(first);
      return newZIndex;
    });

    setCurrentIndex((prev) => (prev + 1) % 3); // Cycle through 0, 1, 2
  };

  useEffect(() => {
    const interval = setInterval(updateCarousel, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center items-center h-16">
      <div
        className={`absolute w-4 h-4 rounded-full bg-gray-400 transition-all duration-700`}
        style={{
          transform: `translateX(${currentIndex === 0 ? 0 : currentIndex === 1 ? "50px" : "100px"})`,
          zIndex: zIndex[0],
        }}
      ></div>
      <div
        className={`absolute w-4 h-4 rounded-full bg-gray-400 transition-all duration-700`}
        style={{
          transform: `translateX(${currentIndex === 1 ? 0 : currentIndex === 2 ? "50px" : "100px"})`,
          zIndex: zIndex[1],
        }}
      ></div>
      <div
        className={`absolute w-12 h-4 rounded-full bg-violet-500 transition-all duration-700`}
        style={{
          transform: `translateX(${currentIndex === 2 ? 0 : currentIndex === 0 ? "50px" : "100px"})`,
          zIndex: zIndex[2],
        }}
      ></div>
    </div>
  );
};

export default DotCarousel;
