import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import logo from "../imgs/aniDub_logo.png";
import home from "../imgs/home.png";
import settings from "../imgs/set.png";
import shop from "../imgs/shop.png";
import messag from "../imgs/mes.png";
import user from "../imgs/user.png";
import qon from "../imgs/qon.png";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import { Drawer, Input, Button, Carousel, Space, Table, message } from "antd";
import "../openDashboard/opendashboar.css";

const { Column } = Table;

interface DataType {
  key: React.Key;
  id: number;
  data: number;
  name: string;
  desc: string;
  img: string;
  tags: string[];
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios
      .get<DataType[]>("https://6d548820c3f18dbd.mokky.dev/Cards")
      .then((res) => {
        setData(res.data);
      })
      .catch((error: Error) => {
        showError(" Tizimda nosozlik bor");
      });
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const showDrawer = () => setDrawerOpen(true);
  const onClose = () => setDrawerOpen(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Muvaffaqqiyatli o'chirildi",
      style: {
        marginTop: "10px", // Xabar yuqoriga chiqishi uchun
        marginRight: "10px", // Ekran o'ng tomonida bo'lishi uchun
        textAlign: "right", // Matnni o'ngga qaratish
      },
    });
  };

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

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
      style: {
        marginTop: "10px",
        marginRight: "10px",
        textAlign: "right",
      },
    });
  };

  const Delet = (id: number) => {
    axios
      .delete(`https://6d548820c3f18dbd.mokky.dev/Cards/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
        success();
      })
      .catch(() => {
        showError(" Animeni oʻchirishda xatolik yuz berdi");
      });
  };

  return (
    <div className="flex justify-center w-100">
      <div className="container">
        {contextHolder}
        {/* Xabarlarni ko'rsatish uchun bu yerda render qilinishi kerak */}
        <nav className="text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 mr-4" />
          </div>

          <div className="relative">
            <Input
              className="shadow-md"
              style={{
                borderRadius: "20px",
                padding: "7px",
                maxWidth: "600px",
                width: "500px",
                paddingLeft: "15px",
              }}
              placeholder="aniDub"
            />
            <CiSearch
              style={{
                position: "absolute",
                top: "18px",
                right: "0",
                transform: "translate(-50%, -50%)",
                fontSize: "24px",
                color: "grey",
                cursor: "pointer",
              }}
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {[home, settings, shop, messag, user, qon].map((src, index) => (
              <img
                key={index}
                src={src}
                alt=""
                className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                style={{
                  width: `${
                    index === 0
                      ? "30px"
                      : index === 1
                      ? "40px"
                      : index === 2
                      ? "35px"
                      : index === 3
                      ? "40px"
                      : index === 4
                      ? "25px"
                      : "50px"
                  }`,
                  height: `${
                    index === 0
                      ? "45px"
                      : index === 1
                      ? "40px"
                      : index === 2
                      ? "30px"
                      : index === 3
                      ? "30px"
                      : index === 4
                      ? "25px"
                      : "35px"
                  }`,
                }}
              />
            ))}
            <div className="flex justify-center items-center cursor-pointer border border-blue-500 rounded-full w-12 h-12 p-1">
              <img
                onClick={showDrawer}
                src="https://i.pinimg.com/736x/5d/b2/cd/5db2cdd843a4c226e8c62363682b82f4.jpg"
                alt=""
                className="rounded-full"
              />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white text-xl">
              <HiOutlineBars3BottomRight />
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg w-48">
              <div className="flex flex-col space-y-4">
                {[home, settings, shop, messag, user, qon].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt=""
                    className="w-8 h-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                ))}
                <div className="flex justify-center items-center cursor-pointer border border-blue-500 rounded-full w-12 h-12 p-1">
                  <img
                    onClick={showDrawer}
                    src="https://i.pinimg.com/736x/5d/b2/cd/5db2cdd843a4c226e8c62363682b82f4.jpg"
                    alt=""
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          )}

          <Drawer
            title="Drawer"
            placement="right"
            onClose={onClose}
            open={drawerOpen}
            width={300}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" onClick={onClose}>
                  OK
                </Button>
              </Space>
            }
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </nav>

        {/* Dashboard section carousel */}
        <Carousel
          style={{
            maxWidth: "100%",
            height: "300px",
            margin: "0 auto",
            overflow: "hidden",
          }}
          autoplay
        >
          <div className="bg_img"></div>
          <div className="bg_img2"></div>
          <div className="bg_img3"></div>
          <div className="bg_img4"></div>
        </Carousel>

        {/* Dashboard panel */}

        {/* Animilar */}
        <section>
          <h2
            style={{
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            <span
              style={{
                color: "#3498db",
              }}
            >
              An
            </span>
            emilar
          </h2>

          {/* Table */}
          <div className="tableContainer shadow-lg">
            <Table
              dataSource={data} // tabelga datani ulash
              pagination={{ pageSize: 5 }} // pageda nechta qator bo'lishi
              rowClassName="table_row" // tabel itemiga class berish
            >
              <Column
                title="Image"
                dataIndex="img"
                key="img"
                render={(img: string) => (
                  <img
                    src={img}
                    alt="img"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                )}
              />

              <Column title="name" dataIndex="name" key="name" />
              <Column title="data" dataIndex="data" key="data" />
              <Column title="desc" dataIndex="desc" key="desc" />
              <Column
                title="Action"
                key="action"
                render={(item: DataType) => (
                  <Space size="middle">
                    <a>
                      <CiEdit />
                    </a>
                    <Button
                      icon={<MdDelete />}
                      onClick={() => Delet(item.id)}
                      danger
                    />
                  </Space>
                )}
              />
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
