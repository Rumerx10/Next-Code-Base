"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const CarouselCode = () => {
  const [copied, setCopied] = useState(false);
  const codeString = `
  "use client";
import React from "react";
import {
  Autoplay,
  Keyboard,
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Images } from "@/lib/utils";


const SwiperCarousel = () => {

  return (
    <div className="relative px-0 lg:px-20 py-0 lg:py-10 flex flex-col gap-10 w-full h-[400px] bg-white overflow-visible border border-red-800">
      <Swiper
        modules={[Autoplay, Keyboard, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        keyboard={{ enabled: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          el: ".swiper-pagination",
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="relative w-full h-full px-20 overflow-visible"
      >
        {Images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              width={1280}
              height={760}
              src={img}
              alt="switzerland map"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons BOTH_SIDE_ALIGNMENT */}
      <div className="absolute hidden lg:block left-5 top-1/2 transform -translate-y-1/2">
        <div className="swiper-button-prev text-white">
          <IoIosArrowBack size={16} color="#1DBF73" />
        </div>
      </div>
      <div className="absolute hidden lg:block right-5 top-1/2 transform -translate-y-1/2">
        <div className="swiper-button-next text-white h-10 w-10 rounded-full bg-red-600">
          <IoIosArrowForward size={32} color="#1DBF73" />
        </div>
      </div>

      {/* Navigation Buttons BOTTOM_ALIGNMENT -------------------------------------------------*/}

      <div className="absolute hidden lg:block left-[47%] bottom-3.5 transform -translate-y-1/2">
        <div className="swiper-button-prev text-white">
          <IoIosArrowBack size={16} color="#1DBF73" />
        </div>
      </div>
      <div className="absolute hidden lg:block right-[47%] bottom-3.5 transform -translate-y-1/2">
        <div className="swiper-button-next text-white">
          <IoIosArrowForward size={32} color="#1DBF73" />
        </div>
      </div>



      {/* Pagination Bullets */}
      <div className="block lg:hidden absolute bottom-[-30px] left-1/2 transform -translate-x-1/2">
        <div className="swiper-pagination"></div>
      </div>

      {/* Inline CSS */}
      <style jsx>{\`
        // .swiper-wrapper {
        //   overflow: visible !important;
        // }

        .swiper-button-next,
        .swiper-button-prev {
          background-color: white !important;
          border-radius: 50%;
          width: 30px !important;
          height: 30px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
          top: 50%;
          z-index: 50;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          // font-size: 10px !important;
          content: "" !important;
        }

        // .swiper-button-next svg,
        // .swiper-button-prev svg {
        //   font-size: 30px !important;
        // }

        .swiper-pagination-bullet-active {
          background-color: red !important;
        }

        .swiper-pagination-bullet {
          background-color: #1dbf73 !important;
        }
      \`}</style>
    </div>
  );
};

export default SwiperCarousel;

-------------------------------using Ref-------------------------------------

"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface ImageItem {
  id?: number;
  img: string;
  title: string;
  desc: string;
}

interface ModalImageGalleryProps {
  images: ImageItem[] | { data: ImageItem[]; metadata?: any };
  setIsModalOpen: (value: boolean) => void;
  initialIndex: number;
}

const ModalImageGallery = ({
  images,
  setIsModalOpen,
  initialIndex,
}: ModalImageGalleryProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  // Extract array from images prop (handles both array and object with data property)
  const getImagesArray = (): ImageItem[] => {
    if (Array.isArray(images)) {
      return images;
    }
    if (images && typeof images === 'object' && 'data' in images && Array.isArray(images.data)) {
      return images.data;
    }
    return [];
  };

  const imagesArray = getImagesArray();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!imagesArray || imagesArray.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000
      overflow-hidden h-screen flex items-center justify-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="h-[90%] lg:h-[80%] relative container mx-auto px-4 
        flex items-center justify-center bg-black/50 lg:rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          initialSlide={initialIndex}
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            type: "fraction",
            clickable: true,
          }}
          className="w-full h-full"
        >
          {imagesArray.map((item: ImageItem, idx: number) => (
            <SwiperSlide
              key={item.id || idx}
              className="flex items-center justify-center"
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  height={900}
                  width={1920}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 duration-300 flex flex-col justify-end text-white pointer-events-none">
                  <div className="pointer-events-auto mx-3 mb-3 p-3 sm:mx-4 sm:mb-4 sm:p-4 lg:m-6 lg:p-5 w-auto sm:w-[85%] lg:w-1/2 backdrop-blur-lg bg-black/70 rounded-lg">
                    <h6 className="font-bold text-sm sm:text-base lg:text-lg line-clamp-2">
                      {item.title}
                    </h6>
                    <p className="text-xs sm:text-sm lg:text-base mt-1 line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
          className="absolute z-10 rounded-full scale-80 lg:scale-100 lg:rounded-sm h-11 w-11 -top-6 lg:-top-5 
          right-0 lg:-right-1.5 bg-white hover:bg-red-200 flex items-center justify-center
          duration-300"
          aria-label="Close modal"
        >
          <RxCross2 size={24} className="text-gray-800" />
        </button>

        {/* Navigation Buttons */}
        {imagesArray.length > 1 && (
          <>
            <button
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slidePrev();
                }
              }}
              className="absolute left-0 -ml-20 z-10 text-pGray h-11 w-11 bg-white items-center justify-center rounded-sm hover:bg-gray-100 transition-colors md:-ml-16 sm:-ml-12 hidden lg:flex"
              aria-label="Previous slide"
            >
              <RiArrowLeftSLine size={24} />
            </button>

            <button
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideNext();
                }
              }}
              className="absolute right-0 -mr-20 z-10 text-pGray h-11 w-11 bg-white items-center justify-center rounded-sm hover:bg-gray-100 transition-colors md:-mr-16 sm:-mr-12 hidden lg:flex"
              aria-label="Next slide"
            >
              <RiArrowRightSLine size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalImageGallery;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-3">
        <h3 className="font-semibold text-sm">
          Swiper Carousel Component Code
        </h3>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800 h-8 px-3"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="ml-2 text-xs">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>

      {/* Code Display */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language="typescript"
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "13px",
            lineHeight: "1.5",
            minHeight: "200px",
            backgroundColor: "#1a1a1a",
          }}
          showLineNumbers
          lineNumberStyle={{
            color: "#666",
            marginRight: "1rem",
            userSelect: "none",
          }}
          wrapLines
          lineProps={{ style: { whiteSpace: "pre-wrap" } }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CarouselCode;
