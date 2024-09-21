import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../janr/janr.css";
import { message } from "antd";
import "../../App.css";
import allCategory from "./allCategory";
import { useNavigate } from "react-router-dom";

interface SliderItem {
  id: number;
  img: string;
  eye: string;
  name: string;
  new: string;
  data: string;
}

const Janr = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderData, setSliderData] = useState<SliderItem[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://6d548820c3f18dbd.mokky.dev/janr")
      .then((res) => {
        setSliderData(res.data);
      })
      .catch(() => {
        showError("Slayder maʼlumotlarini olishda xatolik yuz berdi");
      });
  }, []);

  const showError = (errorMsg: string) => {
    messageApi.open({
      type: "error",
      content: errorMsg,
      style: {
        marginTop: "10px",
        marginRight: "10px",
        textAlign: "right",
      },
    });
  };

  const totalCards = sliderData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const container = sliderRef.current;
        const cardWidth = container.children[0].clientWidth; // Kartochkaning kengligi

        container.scrollBy({
          left: cardWidth, // Kartochkani to'liq ko'rsatish uchun
          behavior: "smooth",
        });

        // Indeksni yangilash
        setCurrentIndex((prevIndex) =>
          prevIndex === totalCards - 1 ? 0 : prevIndex + 1
        );
      }
    }, 10000); // 5 soniyada o'zgaradi

    return () => clearInterval(interval);
  }, [totalCards]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (sliderRef.current) {
      startX.current = e.touches[0].clientX;
      scrollLeft.current = sliderRef.current.scrollLeft;
      isDragging.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (sliderRef.current && isDragging.current) {
      const touchCurrentX = e.touches[0].clientX;
      const distance = touchCurrentX - startX.current;
      sliderRef.current.scrollLeft = scrollLeft.current - distance;
    }
  };

  const handleTouchEnd = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const cardWidth = container.children[0].clientWidth; // Kartochkaning kengligi
      const scrollPosition = container.scrollLeft;
      const index = Math.round(scrollPosition / cardWidth);

      // Indeksni yangilash
      setCurrentIndex(index >= totalCards ? totalCards - 1 : index);
      isDragging.current = false;
    }
  };

  const allCategor = () => {
    navigate("/allCategory");
  };

  return (
    <div className="news-card-container flex justify-center">
      <div className="container">
        {contextHolder}
        <div className="flex items-center justify-between">
          <div className="ms-2">
            <h1 className="borderTitle">Categoryalar</h1>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="slider-container flex py-4 mt-1 overflow-x-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className=" flex gap-2 items-center">
            <div
              onClick={allCategor}
              className="cardfg relative mx-2 transition-transform duration-500 hover:scale-105"
            >
              <div
                style={{
                  backgroundImage: `url("https://i.pinimg.com/736x/4b/b8/e9/4bb8e931640dcff50f8e670c86919e1b.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "270px",
                  borderRadius: "10px",
                }}
                className="imgh relative flex items-center justify-center"
              >
                <h2 className="nest text-center">Barcha categoryalar</h2>
                <div className="overlay absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent transition-opacity duration-500 hover:opacity-0"></div>
              </div>
            </div>
            {sliderData.map((item) => (
              <div
                key={item.id}
                className="cardfg relative mx-2 transition-transform duration-500 hover:scale-105"
              >
                <div
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "270px",
                    borderRadius: "10px",
                  }}
                  className="imgh relative flex items-center justify-center"
                >
                  <h2 className="nest text-center">{item.name}</h2>
                  <div className="overlay absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent transition-opacity duration-500 hover:opacity-0"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Janr;
