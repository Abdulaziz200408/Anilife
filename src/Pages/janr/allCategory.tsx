import React, { useEffect, useState } from "react";
import Navbar from "../Menu/Layout";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  img: string;
}

interface Card {
  id: number;
  data: string;
  name: string;
  desc: string;
  img: string;
  eye: number;
  isPaid?: boolean;
}

function AllCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kategoriyalarni olish
        const categoryResponse = await axios.get(
          "https://6d548820c3f18dbd.mokky.dev/janr"
        );
        setCategories(categoryResponse.data);

        // Kartochkalarni olish
        const cardsResponse = await axios.get(
          "https://6d548820c3f18dbd.mokky.dev/Cards"
        );
        setCards(cardsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Ma'lumotlarni olishda xato:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Tanlangan kategoriya bo'yicha kartochkalarni filtrlash
  const filteredCards = selectedCategoryId
    ? cards.filter((card) =>
        card.desc
          .split(",")
          .some(
            (desc) =>
              desc.trim() ===
              categories.find((cat) => cat.id === selectedCategoryId)?.name
          )
      )
    : cards;

  return (
    <div>
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      {/* Asosiy kontent */}
      <div className="pt-24 px-4">
        {/* Kategoriyalarni ko'rsatish */}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Kategoriyalar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => setSelectedCategoryId(category.id)} // Tanlangan kategoriya ID sini saqlash
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-start">
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filtrlashdan o'tgan kartochkalarni ko'rsatish */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedCategoryId
              ? `Tanlangan Kategoriya: ${
                  categories.find((cat) => cat.id === selectedCategoryId)?.name
                }`
              : "Barcha Kartochkalar"}
          </h2>
          {loading ? (
            <p className="text-center">Yuklanmoqda...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <img
                      src={card.img}
                      alt={card.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 text-start">
                      <h2 className="text-lg font-semibold">{card.name}</h2>
                      <p className="text-sm">{card.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">
                  Tanlangan kategoriya uchun kartochkalar topilmadi.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCategory;
