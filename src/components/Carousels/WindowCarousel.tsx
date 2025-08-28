"use client";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";

const WindowCarousel = () => {
    const imgs = [
    "/images/bg1.png",
    "/images/bg2.png",
    "/images/bg3.png",
    "/images/bg1.png",
    "/images/bg2.png",
    "/images/bg3.png",
  ];

  return (
    <div className="w-full">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
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
        className="w-full border-2 border-green-500"
      >
        {imgs.map(() => (
          <SwiperSlide
            className="!flex !w-xl mb-16"
            key={Math.random()}
          >
            <Image
              className="!object-cover"
              alt="achievements"
              src="/faculty/achievements/1.png"
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
