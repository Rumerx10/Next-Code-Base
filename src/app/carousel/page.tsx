
import AutoSlider from '@/components/Carousels/AutoSlider';
import SlideLeft from '@/components/Carousels/SlideLeft';
import SwiperCarousel from '@/components/Carousels/SwiperCarousel';
import React from 'react';

const page = () => {
  return (
    <div className='flex flex-col p-10 bg-amber-400 gap-10'>
      <SlideLeft />
      <SwiperCarousel />
      <AutoSlider />
    </div>
  );
}

export default page;
