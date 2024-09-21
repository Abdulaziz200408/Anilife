import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserSlash } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
import logo from "../imgs/aniDub_logo.png"; // Import local logo image
import bars from "../imgs/bars.png";
import user from "../imgs/user.png";
import { toast, ToastContainer } from "react-toastify";
import "./menu.css";
import { RiSearchLine } from "react-icons/ri";
import { Modal, Button } from "antd";
import { IoClose } from "react-icons/io5";

interface SearchResult {
  id: number;
  name: string;
  img: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSignModal, setOpenSignModal] = useState(false);
  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("phone");
    localStorage.removeItem("password");
    localStorage.removeItem("profileImg"); // Remove profileImg as well
    setIsLoggedIn(false);
    setOpenProfileModal(false);
    window.location.reload();
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedPhone = localStorage.getItem("phone");
    const storedPassword = localStorage.getItem("password");

    if (storedName && storedPassword) {
      setName(storedName);
      setPhone(storedPhone || "+998"); // Default value if phone is not present
      setPassword(storedPassword);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSignUp = () => {
    if (name.length > 4 && phone.trim() !== "" && password.trim() !== "") {
      localStorage.setItem("name", name);
      localStorage.setItem("phone", phone);
      localStorage.setItem("password", password);

      setIsLoggedIn(true);
      setOpenSignModal(false);
    } else {
      toast.error(
        "Iltimos, barcha maydonlarni to'ldiring va ismingizni 4 harfdan ko'proq kiriting."
      );
    }
    setName("");
    setPhone("");
    setPassword("");
    setRepeatPassword("");
  };

  const openSignUpModal = () => {
    navigate("/Login");
  };

  const closeSignUpModal = () => setOpenSignModal(false);

  const openProfile = () => {
    setOpenProfileModal(true);
  };

  const closeProfile = () => setOpenProfileModal(false);

  const goToProfile = () => {
    closeProfile();
    navigate("/profil");
  };

  // Get profile image from localStorage or fallback to default logo
  const profilImg = localStorage.getItem("profileImg") || user;

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      try {
        const response = await fetch(
          `https://6d548820c3f18dbd.mokky.dev/Cards?name=*${e.target.value}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data: SearchResult[] = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // Clear results on error
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
      }}
      className="naveh"
    >
      <div className="px-4">
        <div className="respons flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <img
              onClick={() => navigate("/Menu")}
              className="w-32 cursor-pointer logo"
              src={logo}
              alt="Logo"
            />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div
              className=" flex items-center gap-10 best"
              style={{
                position: "absolute",
                top: "22px",
                left: "160px",
              }}
            >
              <h3>Anime</h3>
              <h3>Film</h3>
              <h3>Drama</h3>
              <h3>Komediya</h3>
              <h3>Maktab</h3>
            </div>
            <div className=" hrefTitle flex items-center gap-10 font-medium "></div>
            <div className="relative flex gap-10 items-center">
              <RiSearchLine
                className="text-teal-500 text-2xl cursor-pointer transition-transform hover:scale-105"
                onClick={handleSearchClick}
              />
              {showSearch && (
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="search-input"
                />
              )}
            </div>
            {searchTerm && searchResults.length > 0 && (
              <div
                className="seachContainer overflow-y-auto"
                style={{
                  width: "200px",
                  height: "300px",
                  backgroundColor: "#1e1e1e",
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#00F0FF #1e1e1e",
                }}
              >
                {searchResults.map((result) => (
                  <div key={result.id} className="flex items-center p-2 gap-2">
                    <div
                      style={{
                        width: "60px", // Set a fixed width
                        height: "60px", // Set a fixed height
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{
                          width: "100%", // Ensure the image scales to the container width
                          height: "100%", // Ensure the image scales to the container height
                          overflow: "hidden",
                          borderRadius: "10px",
                        }}
                        src={result.img}
                        alt={result.name}
                      />
                    </div>
                    <span className="text-white">{result.name}</span>
                  </div>
                ))}
              </div>
            )}
            {!isLoggedIn ? (
              <button
                style={{
                  backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                  width: "140px",
                }}
                onClick={openSignUpModal}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
              >
                Kirish
                <TbLogin2 className="text-xl" />
              </button>
            ) : (
              <button onClick={openProfile} className="flex profilButton">
                <img
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  src={profilImg}
                  alt="Profile"
                />
              </button>
            )}
          </div>
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img className="w-10 h-10" src={bars} alt="Menu" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg_fg_flter z-30 w-64 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transition: "transform 0.3s ease-out" }}
      >
        <div className="p-4 greysil">
          <div className="greysil-content">
            <div className="relative flex gap-10 items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="search-input"
                style={{
                  marginBottom: "20px",
                }}
              />
            </div>
            {searchTerm && searchResults.length > 0 && (
              <div
                className="seachContainer overflow-y-auto"
                style={{
                  width: "200px",
                  height: "300px",
                  backgroundColor: "#1e1e1e",
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#00F0FF #1e1e1e",
                }}
              >
                {searchResults.map((result) => (
                  <div key={result.id} className="flex items-center p-2 gap-2">
                    <div
                      style={{
                        width: "60px", // Set a fixed width
                        height: "60px", // Set a fixed height
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{
                          width: "100%", // Ensure the image scales to the container width
                          height: "100%", // Ensure the image scales to the container height
                          overflow: "hidden",
                          borderRadius: "10px",
                        }}
                        src={result.img}
                        alt={result.name}
                      />
                    </div>
                    <span className="text-white">{result.name}</span>
                  </div>
                ))}
              </div>
            )}
            {!isLoggedIn ? (
              <button
                style={{
                  backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                  width: "140px",
                }}
                onClick={openSignUpModal}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
              >
                Kirish
                <TbLogin2 className="text-xl" />
              </button>
            ) : (
              <button onClick={openProfile} className="flex profilButton">
                <img
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  src={profilImg}
                  alt="Profile"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <Modal
        className="custom-modal"
        open={openProfileModal}
        onCancel={closeProfile}
        footer={null}
        closeIcon={<IoClose style={{ color: "#00F0FF" }} />}
      >
        <div className="relative w-full h-full flex flex-col items-center p-6 bg-gray-900 rounded-lg overflow-hidden">
          {/* Profile Background Image */}
          <img
            src={profilImg}
            alt="Profile"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold text-white mb-2">{name}</h1>
            <p className="text-gray-300 mb-4">{phone}</p>
            <div className="flex flex-col items-center space-y-2">
              <Button
                type="primary"
                onClick={handleLogout}
                style={{
                  backgroundColor: "#00F0FF",
                  border: "none",
                  width: "100%",
                }}
              >
                Chiqish
              </Button>
              <Button
                type="primary"
                onClick={goToProfile}
                style={{
                  backgroundColor: "#00F0FF",
                  border: "none",
                  width: "100%",
                }}
              >
                Profilni o'zgartirish
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
