import React from "react";
import { FaTelegram, FaYoutube } from "react-icons/fa";
import { FaPhoneFlip, FaSquareInstagram } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";

const App04: React.FC = () => {
  return (
    <div className="container flex justify-center">
      <footer className="bg-transparent text-white p-8 mt-10">
        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Bizni kuzatib boring */}
          <div className="flex flex-col items-center space-y-2 text-sm">
            <h2 className="text-lg font-semibold text-start">
              Bizni kuzatib boring
            </h2>
            <div className="flex items-center gap-4 justify-center">
              <FaTelegram className="text-blue-500 text-2xl" />
              <FaSquareInstagram className="text-blue-500 text-2xl" />
              <FaYoutube className="text-blue-500 text-2xl" />
            </div>
            <img
              style={{ borderRadius: "7px" }}
              src="https://img.telemetr.io/c/2gsixE/5319082134855604076?ty=l"
              alt="Anime"
              className="w-36 h-48"
            />
          </div>

          {/* Toshkent va foydali havolalar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <IoLocation className="text-xl text-blue-500" />
              <p className="text-lg">Toshkent</p>
            </div>
            <div className="text-start">
              <h3 className="font-semibold mb-2">Foydali havolalar</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Kategoriyalar
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Ongoing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Fantastika
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Jangari
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Kontaktlar */}
          <div className="flex flex-col items-center space-y-2 text-start text-sm">
            <h3 className="font-semibold">Kontaklar</h3>
            <p className="font-semibold">+93 311 50 47</p>
            <p className="font-semibold">+77 206 50 47</p>
            <p className="font-semibold">+33 033 50 58</p>
          </div>

          {/* Obuna bo'ling */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <FaPhoneFlip className="text-blue-500 text-xl" />
              <p className="text-lg">+93 311 50 47</p>
            </div>
            <div className="text-start">
              <h3 className="font-semibold mb-2">Obuna bo'ling</h3>
              <p className="text-sm leading-relaxed">
                Saytda chop etilgan har qanday materiallarga bo'lgan barcha
                huquqlar O'zbekiston va xalqaro mualliflik huquqi va turtosh
                huquqlar to'g'risidagi qonun hujjatlariga muvofiq himoyalangan.
                Matn, fotosurat, audio va video materiallardan har qanday
                foydalanish faqat mualliflik huquqi egasining roziligi bilan
                mumkin.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden grid grid-cols-2 gap-8 mt-8">
          {/* Toshkent va Bizni kuzatib boring */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <IoLocation className="text-xl text-blue-500" />
              <p className="text-lg">Toshkent</p>
            </div>
            <div className="text-start">
              <h3 className="font-semibold mb-2">Foydali havolalar</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Kategoriyalar
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Ongoing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Fantastika
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Jangari
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 text-sm">
            <h2 className="text-lg font-semibold text-start">
              Bizni kuzatib boring
            </h2>
            <div className="flex items-center gap-4 justify-center">
              <FaTelegram className="text-blue-500 text-2xl" />
              <FaSquareInstagram className="text-blue-500 text-2xl" />
              <FaYoutube className="text-blue-500 text-2xl" />
            </div>
            <img
              style={{ borderRadius: "7px" }}
              src="https://img.telemetr.io/c/2gsixE/5319082134855604076?ty=l"
              alt="Anime"
              className="w-36 h-48"
            />
          </div>

          {/* Obuna bo'ling va Kontaktlar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <FaPhoneFlip className="text-blue-500 text-xl" />
              <p className="text-lg">+93 311 50 47</p>
            </div>
            <div
              className="text-start max-h-32 overflow-y-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              <h3 className="font-semibold mb-2">Obuna bo'ling</h3>
              <p className="text-sm leading-relaxed">
                Saytda chop etilgan har qanday materiallarga bo'lgan barcha
                huquqlar O'zbekiston va xalqaro mualliflik huquqi va turtosh
                huquqlar to'g'risidagi qonun hujjatlariga muvofiq himoyalangan.
                Matn, fotosurat, audio va video materiallardan har qanday
                foydalanish faqat mualliflik huquqi egasining roziligi bilan
                mumkin.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 text-start text-sm">
            <h3 className="font-semibold">Kontaklar</h3>
            <p className="font-semibold">+93 311 50 47</p>
            <p className="font-semibold">+77 206 50 47</p>
            <p className="font-semibold">+33 033 50 58</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App04;
