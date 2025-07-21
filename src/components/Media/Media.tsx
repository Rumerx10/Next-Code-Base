"use client";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { useState, useEffect } from "react";

const mediaItems = [
  {
    id: 1,
    src: "/placeholder.svg",
    width: "w-4/12",
    position: "bottom-0 left-0",
    alt: "Event presentation",
  },
  {
    id: 2,
    src: "/placeholder.svg",
    width: "w-3/12",
    position: "bottom-36",
    alt: "Students playing sports",
  },
  {
    id: 3,
    src: "/placeholder.svg",
    width: "w-2/12",
    position: "bottom-26",
    alt: "Students in a library",
  },
  {
    id: 4,
    src: "/placeholder.svg",
    width: "w-3/12",
    position: "top-16",
    alt: "Campus building",
  },
  {
    id: 5,
    src: "/placeholder.svg",
    width: "w-2/12",
    position: "top-0",
    alt: "Student giving a presentation",
  },
  {
    id: 6,
    src: "/placeholder.svg",
    width: "w-3/12",
    position: "top-16",
    alt: "Students enjoying an event",
  },
  {
    id: 7,
    src: "/placeholder.svg",
    width: "w-2/12",
    position: "bottom-26",
    alt: "Student in a lab",
  },
  {
    id: 8,
    src: "/placeholder.svg",
    width: "w-3/12",
    position: "bottom-36",
    alt: "Student in a lab",
  },
  {
    id: 9,
    src: "/placeholder.svg",
    width: "w-4/12",
    position: "bottom-0 right-0",
    alt: "Students celebrating",
  },
];

const Media = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative my-40 flex items-center justify-center min-h-[500px]">
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
        <div className="relative h-full w-full flex gap-8 justify-between">
          {mediaItems.map((item) => (
            <div className={`${item.width} relative`} key={item.id}>
              <div
                className={`absolute ${item.position} rounded-xl overflow-hidden shadow-xl transform transition-transform duration-700 ease-in-out ${
                  item.id % 2 === 0
                    ? animate
                      ? "translate-y-4"
                      : "translate-y-0"
                    : animate
                    ? "-translate-y-4"
                    : "translate-y-0"
                }`}
              >
                <Image
                  src="/placeholder.svg"
                  alt="img"
                  width={220}
                  height={220}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Media;
