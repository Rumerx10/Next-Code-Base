
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    image: "/placeholder.svg",
    text: (
      <div className="w-[554px] flex flex-col gap-7">
        <div className="text-white">
          <span className="heading5B">Indulge</span>{" "}
          <span className="heading5Light pl-4">in Stylish,</span>{" "}
          <p className="heading5B">
            <span className="heading5Light">Trendy</span> Living.
          </p>
        </div>
        <div className="text-lightGray text-xl leading-8">
          Living stylishly and embracing trendy lifestyles go beyond just
          fashion—it reflects in our homes.
        </div>
      </div>
    ),
  },
  {
    image: "/placeholder.svg",
    text: (
      <div className="w-[554px] flex flex-col gap-7">
        <div className="text-white">
          <span className="heading5B">Experience</span>{" "}
          <span className="heading5Light pl-4">the</span>{" "}
          <p className="heading5B">
            <span className="heading5Light">Top</span> Trends.
          </p>
        </div>
        <div className="text-lightGray text-xl leading-8">
          Modern stylish living embraces sustainability. Choosing eco-friendly
          fashion, ethical brands.
        </div>
      </div>
    ),
  },
  {
    image: "/placeholder.svg",
    text: (
      <div className="w-[554px] flex flex-col gap-7">
        <div className="text-white">
          <span className="heading5B">Live</span>{" "}
          <span className="heading5Light pl-4">the Trend,</span>{" "}
          <p className="heading5B">
            <span className="heading5Light">Embrace</span> Style.
          </p>
        </div>
        <div className="text-lightGray text-xl leading-8">
          Indulge in Stylish, Trendy Living is about more than appearances—it’s
          a mindset that combines.
        </div>
      </div>
    ),
  },
];

const variants = {
  enter: {
    x: "100%",
    opacity: 1,
    zIndex: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    zIndex: 0,
  },
  exit: {
    x: "-100%",
    opacity: 1,
    zIndex: 0,
  },
};

const AutoSlider = () => {
  const [[currentIndex, direction], setIndex] = useState([0, 1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(([prevIndex]) => [
        (prevIndex + 1) % slides.length,
        1, // direction right
      ]);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="">
      {/*========== for big screen ======== */}
      <div className="hidden lg:block relative w-full h-[920px] overflow-hidden">
        {/*======== Image Slides =========*/}
        <AnimatePresence custom={direction} initial={false}>
          <motion.img
            key={slides[currentIndex].image}
            src={slides[currentIndex].image}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Text */}
        <div className="absolute top-[524px] left-40 z-20 max-w-[90%] sm:max-w-[554px] ">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {slides[currentIndex].text}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ======= for small screen ========= */}
      <div className="lg:hidden h-[180px] sm:h-[400px] relative">
        <div className=" absolute inset-0 bg-black/40 z-10" />
        <Image
          alt="tilottoma Logo"
          src={"/images/landingPage/slider/sliderOne.jpg"}
          height={150}
          width={150}
          // unoptimized
          className="w-full h-full object-cover shrink-0 absolute inset-0 z-0"
        />
        {/* ========== texts ======== */}
        <div className="w-full flex justify-center items-center z-[1000] absolute top-[35%]">
          <div className="flex flex-col gap-1 w-[315px] sm:w-[60%] text-white">
            <div className="text-white text-center">
              <span className="font-bold text-[1rem] sm:text-[2.2rem]">
                Indulge
              </span>{" "}
              <span className="font-normal text-[1rem] sm:text-[2.2rem] pl-2">
                in Stylish,
              </span>{" "}
              <p className="font-bold text-[1rem] sm:text-[2.2rem]">
                <span className="font-normal text-[1rem] sm:text-[2.2rem]">
                  Trendy
                </span>{" "}
                Living.
              </p>
            </div>
            <div className="text-white text-center text-xs sm:text-[1.2rem]">
              Living stylishly and embracing trendy lifestyles go beyond just
              fashion—it reflects in our homes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoSlider;
