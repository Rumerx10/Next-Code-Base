"use client";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { useState, useEffect } from "react";

const mediaItems = [
  {
    id: 1,
    src: "/placeholder.svg",
    position: "left-0 bottom-0 w-[100px] h-[100px]",
    alt: "Event presentation",
  },
  {
    id: 2,
    src: "/placeholder.svg",
    position: "left-[10%] bottom-[25%] w-[120px] h-[120px]",
    alt: "Students playing sports",
  },
  {
    id: 3,
    src: "/placeholder.svg",
    position: "left-[25%] bottom-[10%] w-[100px] h-[100px]",
    alt: "Students in a library",
  },
  {
    id: 4,
    src: "/placeholder.svg",
    position: "left-[15%] top-[15%] w-[100px] h-[100px]",
    alt: "Campus building",
  },
  {
    id: 5,
    src: "/placeholder.svg",
    position: "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] z-10",
    alt: "Student giving a presentation",
  },
  {
    id: 6,
    src: "/placeholder.svg",
    position: "right-[15%] top-[15%] w-[100px] h-[100px]",
    alt: "Students enjoying an event",
  },
  {
    id: 7,
    src: "/placeholder.svg",
    position: "right-[25%] bottom-[10%] w-[100px] h-[100px]",
    alt: "Student in a lab",
  },
  {
    id: 8,
    src: "/placeholder.svg",
    position: "right-[10%] bottom-[25%] w-[120px] h-[120px]",
    alt: "Student in a lab",
  },
  {
    id: 9,
    src: "/placeholder.svg",
    position: "right-0 bottom-0 w-[100px] h-[100px]",
    alt: "Students celebrating",
  },
];

const Media3 = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative my-40 flex items-center justify-center min-h-[600px]">
      <div className="mt-20 flex flex-col items-center z-20">
        <h1 className="font-semibold text-3xl leading-14 text-textBlack">
          Media
        </h1>
        <p className="mt-4 font-light text-textGray text-center">
          Here you can review some statistics about our <br /> University
        </p>
        <Link
          href=""
          className="border py-4 px-10 rounded-lg flex items-center gap-3 mt-16 text-deepBlue font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          View All
          <span>
            <FaArrowRightLong />
          </span>
        </Link>
      </div>
      
      <div className="absolute inset-0 w-full h-full">
        <div className="relative h-full w-full">
          {mediaItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                absolute ${item.position} rounded-xl overflow-hidden shadow-xl
                transform transition-transform duration-700 ease-in-out
                ${
                  index % 2 === 0
                    ? animate
                      ? "translate-y-4"
                      : "translate-y-0"
                    : animate
                    ? "-translate-y-4"
                    : "translate-y-0"
                }
              `}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={200}
                height={200}
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media3;