import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Menyu sahifasiga o'tish uchun kerak
import videoGif from '../imgs/vedio.gif';
import Navbar from "../Menu/Layout";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState(''); // Telefon raqami uchun holat
  const navigate = useNavigate(); // Menyu sahifasiga o'tish uchun hook

  const handleSignUp = () => {
    // Tekshirish
    if (!name) {
      toast.error("Iltimos maydonni to'ldring");
      return;
    }
    if (password !== repeatPassword) { 
      toast.error('Parollar mos kelmaydi');
      return;
    }

    // Mahalliy saqlashga saqlash
    localStorage.setItem('name', name);
    localStorage.setItem('password', password);
    localStorage.setItem('phone', phone);

    // Menyu sahifasiga o'tish
    navigate('/menu'); // Zarur bo'lsa, '/menu' manzilini to'g'rilang
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      <div 
      style={{
        height: '100vh',
      }}
      className="flex w-full">
        <div
          style={{
            width: "80%",
            height:"100vh",
            backgroundImage: `url(${videoGif})`,
            backgroundPosition: "center",
            backgroundSize: "120% 99%",
            backgroundRepeat: "no-repeat",
            imageRendering: "auto",
          }}
          className="flex items-center justify-center bg-black"
        >
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-900" style={{ flexBasis: '36%' }}>
          <div style={{ width: "400px" }} className=" rounded-lg  w-full ">
            <h2 className="text-white text-2xl font-bold mb-4">aniDub-ga kirish</h2>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Foydalanuvchi nomi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Telefon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Parol"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Parolni takrorlang"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
             
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
              >
                Ro'yxatdan o'tish
              </button>
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-500 hover:underline">
                Hisob yaratish
              </a>
              <span className="text-gray-400 mx-2">|</span>
              <a href="#" className="text-blue-500 hover:underline">
                Parolni unutdingizmi?
              </a>
            </div>
            <div className="my-4 text-gray-400 text-center">yoki kirish</div>
            <div className="flex justify-center space-x-4">
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">
                VK
              </button>
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">
                G
              </button>
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">
                @
              </button>
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">
                Ya
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">
              Kirish orqali siz Foydalanuvchi shartlari va Maxfiylik siyosati bilan rozi bo'lasiz
            </p>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Toastify xabarlarini ko'rsatish uchun */}
    </div>
  );
};

export default Login;
