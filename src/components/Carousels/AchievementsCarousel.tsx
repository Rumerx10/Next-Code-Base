"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const items = [
  {
    image: "/images/bg1.png",
    title: "July Mass Uprising Day, 2025",
    description:
      "July Mass Uprising Day, 2025\" Observed at Bangladesh Maritime University The country's specialized public university Bangladesh...",
  },
  {
    image: "/images/bg2.png",
    title: "Another Event Title",
    description:
      "This is a description for another event. It provides some details about what happened and who was involved...",
  },
  {
    image: "/images/bg3.png",
    title: "Third Event Here",
    description:
      "A brief overview of the third event, highlighting its importance and key takeaways for the audience...",
  },
];

type Dir = "next" | "prev";
type Phase = "idle" | "pre" | "anim";

const SLIDE_MS = 500;

const AchievementsCarousel = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<Dir>("next");
  const [phase, setPhase] = useState<Phase>("idle");
  const [incoming, setIncoming] = useState<number | null>(null);

  const prevIndex = (active - 1 + items.length) % items.length;
  const nextIndex = (active + 1) % items.length;

  const handleNext = useCallback(() => {
    startSlide("next", nextIndex);
  }, [nextIndex, phase]);

  // Auto-advance every 5s (only when not animating)
  useEffect(() => {
    if (phase !== "idle") return;
    const id = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(id);
  }, [active, phase, handleNext]);

  // 2-phase animation: pre -> anim -> commit
  useEffect(() => {
    if (phase === "pre") {
      const id = requestAnimationFrame(() => setPhase("anim"));
      return () => cancelAnimationFrame(id);
    }
    if (phase === "anim") {
      const t = setTimeout(() => {
        if (incoming !== null) setActive(incoming);
        setIncoming(null);
        setPhase("idle");
      }, SLIDE_MS);
      return () => clearTimeout(t);
    }
  }, [phase, incoming]);

  const startSlide = (dir: Dir, targetIndex: number) => {
    if (phase !== "idle") return;
    setDirection(dir);
    setIncoming(targetIndex);
    setPhase("pre");
  };

  const handlePrev = () => {
    startSlide("prev", prevIndex);
  };

  const goToSlide = (index: number) => {
    if (index === active) return;
    const dir: Dir =
      (index - active + items.length) % items.length > 0 ? "next" : "prev";
    startSlide(dir, index);
  };

  // Classes for central images (current + incoming)
  const currentBase = "absolute inset-0 h-full w-full";
  const incomingBase = "absolute inset-0 h-full w-full";

  const isPre = phase === "pre";
  const isAnim = phase === "anim";

  const currentClass =
    currentBase +
    " " +
    (isPre
      ? "translate-x-0 transition-none"
      : isAnim
      ? direction === "next"
        ? "-translate-x-full transition-transform duration-500 ease-in-out"
        : "translate-x-full transition-transform duration-500 ease-in-out"
      : "translate-x-0 transition-none");

  const incomingClass =
    incomingBase +
    " " +
    (isPre
      ? direction === "next"
        ? "translate-x-full transition-none"
        : "-translate-x-full transition-none"
      : isAnim
      ? "translate-x-0 transition-transform duration-500 ease-in-out"
      : "hidden");

  return (
    <div className="bg-liteBlue py-10">
      <h2 className="text-center text-3xl lg:text-[40px] text-dpViolet">Achievements Carousel</h2>

      <div className="py-10 flex justify-center items-center">
        <div className="relative h-[400px] flex items-center w-full max-w-6xl mx-auto">
          {/* Previous Item (unchanged) */}
          <div className="absolute left-0 z-10 w-[230px] h-[265px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 h-full w-full bg-white/80 z-10" />
            <Image
              src={items[prevIndex].image}
              alt={items[prevIndex].title}
              height={265}
              width={245}
              className="object-cover h-full w-full"
              priority
            />
          </div>

          {/* Active Item - now slides */}
          <div className="relative mx-auto w-[630px] h-full rounded-lg overflow-hidden">
            {/* Gradient + text (stays on top, updates after slide commit) */}
            <div className="absolute inset-0 achievementsCarouselGradient z-20 pointer-events-none">
              <div className="flex flex-col px-6 pb-10 w-full h-full justify-end text-white">
                <h3 className="text-2xl font-bold">{items[active].title}</h3>
                <p className="mt-3 font-medium">{items[active].description}</p>
              </div>
            </div>

            {/* Images layer (z-10): current + incoming for slide */}
            <div className="absolute inset-0 z-10 overflow-hidden">
              {/* current */}
              <div className={currentClass}>
                <Image
                  src={items[active].image}
                  alt={items[active].title}
                  height={400}
                  width={630}
                  className="object-cover h-full w-full"
                />
              </div>
              {/* incoming */}
              {incoming !== null && (
                <div className={incomingClass}>
                  <Image
                    src={items[incoming].image}
                    alt={items[incoming].title}
                    height={400}
                    width={630}
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Next Item (unchanged) */}
          <div className="absolute right-0 z-10 w-[230px] h-[265px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 h-full w-full bg-white/80 z-10" />
            <Image
              src={items[nextIndex].image}
              alt={items[nextIndex].title}
              height={265}
              width={245}
              className="object-cover h-full w-full"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={phase !== "idle"}
            className="absolute -translate-y-1/2 top-1/2 left-20 w-10 h-10 text-white bg-dpViolet cursor-pointer rounded-full flex items-center justify-center z-30 hover:bg-dpViolet/90 disabled:opacity-50 transition-all"
            aria-label="Previous achievement"
          >
            <IoIosArrowBack />
          </button>

          <button
            onClick={handleNext}
            disabled={phase !== "idle"}
            className="absolute -translate-y-1/2 top-1/2 right-20 w-10 h-10 text-white bg-dpViolet cursor-pointer rounded-full flex items-center justify-center z-30 hover:bg-dpViolet/90 disabled:opacity-50 transition-all"
            aria-label="Next achievement"
          >
            <IoIosArrowForward />
          </button>

          {/* Indicators (bullets) – unchanged */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 z-30">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={phase !== "idle"}
                className={`h-4 rounded-full transition-all duration-300 ${
                  active === index
                    ? "w-14 bg-dpViolet"
                    : "w-4 bg-liteViolet hover:bg-dpViolet/70"
                } disabled:opacity-50`}
                aria-label={`Go to achievement ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsCarousel;
