import React, { useEffect, useState } from 'react';
import '../profil/profil.css';
import user from '../imgs/user.png';
import { Modal } from 'antd';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import Profilpage from './profilpage';
import Tariflar from './tariflar';
import Sevimlilar from './Sevimlilar';
import Galeriya from './Galeriya';

interface Profildata {
    id: number;
    img: string;
}

function Profil() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<Profildata[]>([]);
    const [profileImg, setProfileImg] = useState<string>(localStorage.getItem("profileImg") || user);
    const [activeButton, setActiveButton] = useState<string>('Profil');
    const [bacgroundImg, setBacgroundImg] = useState<string | null>(localStorage.getItem("bacgroundImg"));

    // Handler to toggle the active button class
    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName); // Set the clicked button as active
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleImageClick = (imgSrc: string) => {
        setProfileImg(imgSrc);
        localStorage.setItem("profileImg", imgSrc);
        setOpen(false);
        window.location.reload();
    };

    const updateBackgroundImage = (imgSrc: string) => {
        setBacgroundImg(imgSrc);
        localStorage.setItem("bacgroundImg", imgSrc);
    };

    useEffect(() => {
        axios.get("https://6d548820c3f18dbd.mokky.dev/profilImg")
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <div className='bg-white w-full profilContainer'>
            <div style={{
                backgroundImage: bacgroundImg ? `url(${bacgroundImg})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                padding: '20px',
                position:"relative",
                minHeight: '44vh',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
            }} className='bg_img_profil'>
                <div style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                    marginLeft: "40px"
                }}>
                    <img
                        style={{
                            width: '66px',
                            height: '66px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            cursor: "pointer"
                        }}
                        src={profileImg}
                        alt="Profile"
                        onClick={showDrawer}
                    />
                    <h2 className="text-2xl font-bold">{localStorage.getItem("name")}</h2>
                </div>
            </div>
            <div className='profilFilter'>
                <div className='ICHKIdiv'>
                    <button
                        className={`button ${activeButton === 'Profil' ? 'activbutton' : ''}`}
                        onClick={() => handleButtonClick('Profil')}
                    >
                        Profil
                    </button>
                    <button
                        className={`button ${activeButton === 'Chat' ? 'activbutton' : ''}`}
                        onClick={() => handleButtonClick('Chat')}
                    >
                        Chat
                    </button>
                    <button
                        className={`button ${activeButton === 'Tariflar' ? 'activbutton' : ''}`}
                        onClick={() => handleButtonClick('Tariflar')}
                    >
                        Tariflar
                    </button>
                    <button
                        className={`button ${activeButton === 'Sevimlilar' ? 'activbutton' : ''}`}
                        onClick={() => handleButtonClick('Sevimlilar')}
                    >
                        Sevimlilar
                    </button>
                    <button
                        className={`button ${activeButton === 'Galeriya' ? 'activbutton' : ''}`}
                        onClick={() => handleButtonClick('Galeriya')}
                    >
                        Galeriya
                    </button>
                </div>
            </div>
            <div className="profilBody w-full">
                {/* Render content based on the active button */}
                {activeButton === 'Profil' && <Profilpage />}
                {activeButton === 'Tariflar' && <Tariflar />}
                {activeButton === 'Sevimlilar' && <Sevimlilar />}
                {activeButton === 'Galeriya' && <Galeriya onSelectImage={updateBackgroundImage} />}
            </div>

            {/* User set image modal */}
            <Modal
                open={open}
                onCancel={onClose}
                footer={null}
                closeIcon={
                    <IoClose
                        style={{
                            color: "#00F0FF",
                        }}
                    />
                }
            >
                <div style={{
                    display: "flex", gap: "10px"
                }} className="p-4">
                    {data.map((item) => (
                        <img
                            key={item.id}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: "50%",
                                cursor: "pointer"
                            }}
                            src={item.img}
                            alt="Profile Thumbnail"
                            onClick={() => handleImageClick(item.img)}
                        />
                    ))}
                </div>
            </Modal>
        </div>
    );
}

export default Profil;
