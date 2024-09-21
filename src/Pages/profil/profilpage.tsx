import React, { useState, useEffect } from 'react';
import { IoAddSharp } from 'react-icons/io5';
import '../profil/pageProfil.css'

function ProfilePage() {
    // State to store the profile image URL
    const [profileImg, setProfileImg] = useState<string | null>(null);
    const [balanc, setBalanc] = useState<string | null>("0 So'm");

    // Fetch the profile image from localStorage when the component mounts
    useEffect(() => {
        const storedImage = localStorage.getItem("profileImg");
        if (storedImage) {
            setProfileImg(storedImage);
        }
    }, []);

    // Handle file input change
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string | null;
                if (imageUrl) {
                    localStorage.setItem("profileImg", imageUrl);
                    setProfileImg(imageUrl);
                }
            };
            reader.readAsDataURL(file);
        }
        window.location.reload();
    };

    const name = localStorage.getItem('name');
    const tel = localStorage.getItem('phone');
    const balance = localStorage.getItem('balance');

    return (
        <div className='container mx-auto text-black mt-5 flex  gap-5'>
            <div className='profilePageContainer relative'>
                <div className="profileImg relative">
                    <img
                        className="shadow-sm"
                        style={{
                            width: "200px",
                            height: "280px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            position:"relative"
                        }}
                        src={profileImg || 'https://fdlc.org/wp-content/uploads/2021/01/157-1578186_user-profile-default-image-png-clipart.png.jpeg'}
                        alt="avatar"
                    />
                    <label htmlFor="upload" className="uploadLabel cursor-pointer absolute bottom-2 left-36 p-2 bg-white rounded-full shadow-2xl">
                        <IoAddSharp size={24} /> {/* Adjust icon size as needed */}
                    </label>
                    <input
                        type="file"
                        id="upload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                </div>
            </div>
            {/* user about */}
            <div className="userAbout">
                
               <button className='bg_about'>Ism :{name}</button>
               <br />
               <button  className='bg_about'>Tel :{tel}</button>
               <br />
               <button  className='bg_about'>Balance :{balanc}</button>
               <br />
               <button  className='bg_about'>Hisobni to'ldrish</button>
            </div>
        </div>
    );
}

export default ProfilePage;
