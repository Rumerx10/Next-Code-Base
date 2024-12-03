import Carousel from "./(components)/Carousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="bg-gray-200 flex items-center justify-center">
        <Carousel />
      </div>
      <div className="w-56 overflow-hidden">
       
      </div>
    </div>
  );
}
