import React, { useState, useEffect, useRef } from "react";
import { Drawer, Input } from "antd";
import { IoHome, IoSendSharp } from "react-icons/io5";
import { FaPaperclip, FaSmile, FaCamera } from "react-icons/fa";
import axios from "axios";
import "../filter/section_filter.css";
import kirish from "../imgs/kiirsh.png";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  profileImg?: string;
}

interface AnimeData {
  id: number;
  iframe: string;
}

const Filter: React.FC = () => {
  const [openChatDrawer, setOpenChatDrawer] = useState(false); // State for the Chat drawer
  const [openSignModal, setOpenSignModal] = useState(false); // State for the Anime Edit modal
  const [message, setMessage] = useState<string>("");
  const [datamessage, setdatamessage] = useState<Message[]>([]);
  const [animeData, setAnimeData] = useState<AnimeData[]>([]); // State for Anime data
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loggedInUser = localStorage.getItem("name");
  const profilImg =
    localStorage.getItem("profileImg") ||
    "https://fdlc.org/wp-content/uploads/2021/01/157-1578186_user-profile-default-image-png-clipart.png.jpeg";

  useEffect(() => {
    const email = localStorage.getItem("name");
    const password = localStorage.getItem("password");

    if (email && password) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [datamessage]);

  const openAnimeEditModal = () => {
    setOpenSignModal(true);
    fetchAnimeData(); // Fetch anime data when the modal opens
  };

  const closeAnimeEditModal = () => {
    setOpenSignModal(false);
  };

  // Fetch anime data from the API
  const fetchAnimeData = async () => {
    try {
      const response = await axios.get(
        "https://6d548820c3f18dbd.mokky.dev/Shorts"
      );
      setAnimeData(response.data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-0">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          <button className="premium-glossy-button">Barcha anemelar</button>
          <button
            className="premium-glossy-button"
            onClick={openAnimeEditModal}
          >
            Anime Edit
          </button>
        </div>
        <div className="button-group">
          <div>
            <button
              onClick={() => setOpenChatDrawer(true)}
              className="premium-glossy-button"
            >
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chat Drawer */}
      <Drawer
        placement="left"
        width={950}
        open={openChatDrawer}
        onClose={() => setOpenChatDrawer(false)}
        className="responsive-drawer"
      >
        {isRegistered ? (
          <div className="modalHeader flex gap-5">
            <div className="modal_leftHeader hidden sm:block">
              <button className="mt-4">
                <img
                  className="rounded-full"
                  src={profilImg}
                  alt="Profile"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </button>
              <div className="icon_hover bg-red-500 flex justify-between items-center p-2 text-white mt-12">
                <IoHome className="ml-5 text-xl" />
              </div>
            </div>
            <div className="modalBody w-full mb-2">
              <div
                className="content bg-gray-200 rounded-lg relative overflow-hidden"
                style={{ height: "660px", padding: "10px" }}
              >
                <div
                  className="scrollbar-hide overflow-y-auto pr-2 pb-10"
                  style={{ height: "90%" }}
                >
                  {datamessage.map((item) => (
                    <div
                      key={item.id}
                      className={`message flex flex-col ${
                        item.sender === loggedInUser
                          ? "items-end"
                          : "items-start"
                      } mt-2`}
                    >
                      {item.sender !== loggedInUser && (
                        <div className="flex items-center gap-2">
                          <img
                            src={item.profileImg || profilImg}
                            alt="User"
                            className="rounded-full"
                            style={{
                              width: "40px",
                              height: "40px",
                            }}
                          />
                          <p>{item.sender}</p>
                        </div>
                      )}
                      <div
                        className={`message-text rounded-lg p-3 ${
                          item.sender === loggedInUser
                            ? "bg-purple-400 text-white"
                            : "bg-gray-300 text-black"
                        } max-w-xs`}
                      >
                        {item.text}
                      </div>
                      <span
                        className={`text-xs mt-1 ${
                          item.sender === loggedInUser
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        {item.timestamp}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="bg-gray-700 absolute bottom-5 left-4 right-4 p-2 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3 w-full">
                    <FaPaperclip className="text-xl text-black cursor-pointer" />
                    <Input
                      value={message}
                      placeholder="Type your message here..."
                      className="rounded-full p-3 w-full border-none shadow-sm text-black"
                    />
                    <FaSmile className="text-xl text-black cursor-pointer absolute right-20" />
                    <FaCamera className="text-xl text-black cursor-pointer absolute right-12" />
                  </div>
                  <button>
                    <IoSendSharp className="text-3xl text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <img src={kirish} alt="Registration" />
          </div>
        )}
      </Drawer>

      {/* Anime Edit Modal */}
      <Drawer
        closable
        destroyOnClose
        title={<p>Anime Edit Modal</p>}
        placement="left"
        open={openSignModal}
        onClose={closeAnimeEditModal}
        width={500}
      >
        <div>
          {animeData.map((anime) => (
            <div key={anime.id} className="mb-4">
              {anime.iframe && (
                <iframe
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    overflow: "hidden",
                    objectFit: "contain",
                    marginBottom: "10px",
                    marginLeft: "10px",
                    marginTop: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  }}
                  width="360px"
                  height="550px"
                  src={anime.iframe}
                  title={`Anime ${anime.id}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Filter;
