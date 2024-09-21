import { Input, message } from "antd";
import { useState } from "react";
import axios from "axios";
import "./dashboard.css";
import OpenDashboard from "../openDashboard/openDashboard";

const AnidubDashboard = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    if (name.length > 3 && /^[a-zA-Z ]+$/.test(name) && password === "1234") {
      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}:${String(
        currentTime.getMinutes()
      ).padStart(2, "0")}`;

      const capitalizedUsername = name.charAt(0).toUpperCase() + name.slice(1);

      setName("");
      setPassword("");
      setNextPage(true);
      localStorage.setItem(`✅${capitalizedUsername} Admen pagega kirdi`, "");

      try {
        await axios.post(
          `https://api.telegram.org/bot7404963914:AAEOCph3rzi-VwSKngEPzIlSl4t9AQYxa1c/sendMessage`,
          {
            chat_id: "-4211069015",
            text: `✅ ${capitalizedUsername} Admen pagega
${formattedTime} da kirdi`,
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Batafsil",
                    url:
                      "https://static6.depositphotos.com/1000422/567/i/450/depositphotos_5675738-stock-photo-emoticon.jpg",
                  },
                ],
              ],
            },
          }
        );
      } catch (error) {
        console.error("Xatolik:", error);
        messageApi.open({
          type: "error",
          content: "Xatolik yuz berdi. Iltimos qayta urinib ko'ring.",
        });
      }
    } else {
      warning();
    }
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Isminggiz yoki parol xato",
      style: {
        marginTop: "10px",
        marginRight: "10px",
        textAlign: "right",
      },
    });
  };

  return (
    <div
      className="background"
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Added gradient background
      }}
    >
      {contextHolder}
      {!nextPage ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              width: "700px",
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "space-around",
            }}
            className="flex items-center"
          >
            <div
              style={{
                width: "50%",
                height: "500px",
                padding: "20px",
              }}
            >
              <div className="mt-10">
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  className="text-center"
                >
                  <span
                    style={{
                      color: "#3498db",
                    }}
                  >
                    An
                  </span>
                  iDub
                </h1>

                <div className="mt-10">
                  <Input
                    placeholder="Ismingizni kiriting.."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    className="mt-3"
                    placeholder="Parolni kiriting.."
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex justify-center mt-5">
                    <button onClick={handleSubmit} className="btn_login">
                      Kirish
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg_img"
              style={{
                width: "50%",
                height: "500px",
              }}
            >
              <img
                src="https://i.pinimg.com/736x/bf/3d/d8/bf3dd80b99d825dd3e16c3533a49d4fd.jpg"
                alt="Background Image"
                className="inner_img"
              />
            </div>
          </div>
        </div>
      ) : (
        <OpenDashboard />
      )}
    </div>
  );
};

export default AnidubDashboard;
