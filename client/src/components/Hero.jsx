import React from "react";
import Slider from "react-slick";
import img1 from "/src/assets/6a496d4c7a27f314.webp";
import img2 from "/src/assets/77dd9045daf65f13.webp";
import img3 from "/src/assets/c8a8aef634b0b2fe.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: false, // Hide next arrow
    prevArrow: false, // Hide previous arrow
  };
  return (
    <div className="space-y-3">
      <div className="slider-container ">
        <Slider {...settings}>
          <div className=" ">
            <img className="w-full min-h-[300px] md:h-fit" src={img1} alt="" />
          </div>
          <div className=" ">
            <img className="w-full min-h-[300px] md:h-fit" src={img2} alt="" />
          </div>
          <div className="  ">
            <img className="w-full min-h-[300px] md:h-fit" src={img3} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Hero;
