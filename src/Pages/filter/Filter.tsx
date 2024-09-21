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

const Filter: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [datamessage, setdatamessage] = useState<Message[]>([]);
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

  // Har 2 soniyada yangilab turish
  // useEffect(() => {
  //   const fetchMessages = () => {
  //     axios
  //       .get("https://c0adcbfd27d5ecc2.mokky.dev/ews")
  //       .then((response) => {
  //         setdatamessage(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching messages:", error);
  //       });
  //   };

  //   fetchMessages();
  //   const interval = setInterval(fetchMessages, 2000); // Poll every 2 seconds

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [datamessage]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMessage(e.target.value);
  // };

  // const handleSendMessage = () => {
  //   if (message.trim() && loggedInUser) {
  //     const newMessage: Omit<Message, "id"> = {
  //       text: message,
  //       sender: loggedInUser,
  //       timestamp: new Date().toLocaleTimeString(),
  //       profileImg: profilImg,
  //     };

  //     axios
  //       .post("https://c0adcbfd27d5ecc2.mokky.dev/ews", newMessage)
  //       .then((response) => {
  //         setdatamessage([
  //           ...datamessage,
  //           { ...newMessage, id: response.data.id },
  //         ]);
  //         setMessage("");
  //       })
  //       .catch((error) => {
  //         console.error("Xabar yuborishda xatolik:", error);
  //       });
  //   }
  // };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleSendMessage();
  //   }
  // };

  return (
    <div className="container mx-auto mt-10 p-0">
      <div className=" flex  justify-between flex-wrap gap-2">
        <div className=" flex flex-wrap gap-2">
          <button className="premium-glossy-button">Barcha anemelar</button>
          <button className="premium-glossy-button">Anime Edit</button>
        </div>
        <div className="button-group">
          <div>
            <button
              onClick={() => setOpen(true)}
              className="premium-glossy-button"
            >
              Chat
            </button>
          </div>
        </div>
      </div>
      <Drawer
        placement="left"
        width={950}
        open={open}
        onClose={() => setOpen(false)}
        className="responsive-drawer"
      >
        {isRegistered ? (
          <div className="modalHeader flex gap-5">
            <div className="modal_leftHeader  hidden sm:block">
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
    </div>
  );
};

export default Filter;
