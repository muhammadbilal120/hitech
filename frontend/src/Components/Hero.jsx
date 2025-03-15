import { useState, useEffect } from "react";
import { assets } from "../assets/assets";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    // assets.banner1,
    assets.banner2,  
    assets.banner3,  
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-56 mt-10 md:h-[80vh] lg:h-[100vh]"> {/* Adjust height on mobile */}
      <div className="relative w-full h-full">
        <img
          src={banners[currentIndex]}
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{borderRadius:"10px"}}
        />
      </div>

      {/* Optional: Carousel indicators (dots) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 
                        ${currentIndex === index ? "bg-gray-700" : "bg-gray-300"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
