"use client";
import React, { useEffect, useState } from "react";
import { IoArrowUpCircleOutline } from "react-icons/io5";

const ScrollToTop = () => {
  const [scrollToTop, setScrollToTop] = useState(false);

  const handleScrollToTopButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollToTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative flex flex-col">
      <div className="h-[60vh] bg-pink-700">1</div>
      <div className="h-[60vh] bg-gray-700">2</div>
      <div className="h-[60vh] bg-green-500">3</div>
      <div className="h-[60vh] bg-red-700">4</div>

      {scrollToTop && (
        <button
          type="button"
          className="fixed right-20 bottom-20"
          onClick={handleScrollToTopButton}
        >
          <IoArrowUpCircleOutline color="white" size={50} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
