"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const CarouselCode = () => {
  const [copied, setCopied] = useState(false);

  const codeString = `"use client";
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

export default SwiperCarousel;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-3">
        <h3 className="font-semibold text-sm">Swiper Carousel Component Code</h3>
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
