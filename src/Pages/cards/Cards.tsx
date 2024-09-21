import React, { useEffect, useState } from "react";
import { TbEye } from "react-icons/tb";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../cards/css.css";
import { Pagination } from 'antd';

interface CardData {
  id: number;
  name: string;
  desc: string;
  img: string;
  data: string;
  views: string;
  isPaid: boolean;
  eye: number;
}

const Cards: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [balans, setBalans] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://6d548820c3f18dbd.mokky.dev/Cards"
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchData();

    const savedLikes = localStorage.getItem("liked");
    if (savedLikes) {
      setLiked(JSON.parse(savedLikes));
    }
  }, []);

  const paid = (id: number) => {
    if (balans <= 0) {
      toast.error("Iltimos, balansingizni to'ldiring!");
    }
  };

  const eyeCount = async (id: number) => {
    try {
      const card = cards.find((card) => card.id === id);
      if (card) {
        const updatedEyeCount = card.eye + 1;

        const updatedCards = cards.map((c) =>
          c.id === id ? { ...c, eye: updatedEyeCount } : c
        );
        setCards(updatedCards);

        await axios.patch(`https://6d548820c3f18dbd.mokky.dev/Cards/${id}`, {
          eye: updatedEyeCount,
        });
      }
    } catch (error) {
      console.error("Error updating eye count:", error);
    }
  };

  const name = localStorage.getItem("name");

  const handleHeartClick = (id: number) => {
    if (name) {
      const newLikedState = {
        ...liked,
        [id]: !liked[id],
      };
      setLiked(newLikedState);
      localStorage.setItem("liked", JSON.stringify(newLikedState));
    } else {
      toast.error("Iltimos, ro'yxatdan o'ting!");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentCards = cards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mx-auto mt-4">
       <div className=" ms-2">
          <h1 className="borderTitle">Top-100</h1>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
     
        {currentCards.map((item) => (
          <div onClick={() => eyeCount(item.id)} key={item.id} className="card relative">
            <div
              className="absolute top-0 left-0 right-0 flex justify-between p-2"
              style={{ zIndex: 10 }}
            >
              <button className="card_data">{item.data}</button>
              <FaHeart
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeartClick(item.id);
                }}
                className={`icon ${
                  liked[item.id] && name ? "text-red-500" : "text-white"
                } cursor-pointer`}
              />
            </div>
            <img
              src={item.img}
              alt={item.name}
              onError={(e) =>
                (e.currentTarget.src = "/path/to/fallback-image.jpg")
              }
            />
            <div className="card-content">
              <div>
                <h2 className="title">
                  {item.name}
                </h2>
                <div className="flex justify-between margin">
                  <div className="flex items-center gap-2">
                    <TbEye className="text-blue-500 text-lg" />
                    <span className="text-white text-sm">{item.eye}</span>
                  </div>
                  {item.isPaid ? (
                    <button onClick={() => paid(item.id)} className="money">
                      <p>Pullik</p>
                    </button>
                  ) : (
                    <p className="card_subttile">{item.desc}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={cards.length}
          onChange={handlePageChange}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cards;
