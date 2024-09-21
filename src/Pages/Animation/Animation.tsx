import { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Navbar from "../Menu/Layout";
import './animation.css';
import { Spin } from "antd";

interface Slide {
  bacgroundImg: string;
  name: string;
  desc: string;
  date: string;
}

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Animation: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    axios
      .get("https://6d548820c3f18dbd.mokky.dev/menuAnimation")
      .then((res) => {
        const menu = res.data;
        setSlides(menu || []);
      })
      .catch((error) => {
        console.error("Error fetching slides:", error);
      });
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 9000);

      return () => clearInterval(interval);
    }
  }, [slides]);

  if (slides.length === 0) {
    return <div className="text-center text-white">
      <Spin tip="Loading">{content}</Spin>
    </div>;
  }

  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[77vh] overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background image with additional darkness effect */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.bacgroundImg})`,
              zIndex: "-1",
            }}
          ></div>

          {/* Darkness overlay effect */}
          <div
            className="absolute inset-0 bg-black opacity-40"
            style={{ zIndex: "-1" }}
          ></div>

             {/* Box shadow at the bottom of the slide */}
             <div className="gradient-shadow"></div>

<div className=" media">
            <div className=" widdf">
          <div className=" flex gap-2">
          <button className="mt-4 title_button">
  Anime
</button>

<button className="mt-4 title_button1">
  {slide.date}
</button>
<button className="mt-4 title_button1">
  10-12
</button>
          </div>
              <h3 className="titfd">{slide.name}</h3>
              <hr />
              <p className="mt-2 subttile ">{slide.desc}</p>


            </div>

            
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === currentSlide
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Animation;
