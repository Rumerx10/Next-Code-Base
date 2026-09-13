import AchievementsCarousel from "@/components/Carousels/AchievementsCarousel";
import AutoSlider from "@/components/Carousels/AutoSlider";
import CarouselCode from "@/components/Carousels/CarouselCode";
import SlideLeft from "@/components/Carousels/SlideLeft";
import SwiperCarousel from "@/components/Carousels/SwiperCarousel";
import ThumbnailCarousel from "@/components/Carousels/ThumbnailCarousel";
import WindowCarousel from "@/components/Carousels/WindowCarousel";



const page = () => {
  return (
    <div className="flex flex-col p-10 bg-gray-100 gap-10">
      <SlideLeft />
      <ThumbnailCarousel />
      <SwiperCarousel />
      <AutoSlider />
      <WindowCarousel />
      <AchievementsCarousel />
      <div>
        <CarouselCode />
      </div>
    </div>
  );
};

export default page;
