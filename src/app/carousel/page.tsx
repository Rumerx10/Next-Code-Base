import AutoSlider from "@/components/Carousels/AutoSlider";
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
    </div>
  );
};

export default page;
