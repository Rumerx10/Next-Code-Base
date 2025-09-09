"use client";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import { Images } from "@/lib/utils";

const WindowCarousel = () => {


  return (
    <div className="w-full">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-dpViolet !opacity-50 !h-3 !w-3",
          bulletActiveClass:
            "swiper-pagination-bullet-active !opacity-100 !w-12",
          renderBullet: (index, className) => {
            return `<span key=${index}  class="${className} !rounded-full !mx-1 !transition-all !duration-300"></span>`;
          },
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full border-2 border-white"
      >
        {Images.map((img,idx) => (
          <SwiperSlide
            className="!flex !w-xl mb-16"
            key={idx}
          >
            <Image
              className="object-cover w-full h-[380px]"
              alt="achievements"
              src={img}
              width={627}
              height={400}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WindowCarousel;
