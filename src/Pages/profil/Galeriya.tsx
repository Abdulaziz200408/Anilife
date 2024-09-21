import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Profildata {
    id: number;
    img: string;
}

interface GaleriyaProps {
    onSelectImage: (img: string) => void;
}

function Galeriya({ onSelectImage }: GaleriyaProps) {
    const [data, setData] = useState<Profildata[]>([]);

    useEffect(() => {
        axios.get("https://6d548820c3f18dbd.mokky.dev/bacgrundImg")
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const imgCilik = (img: string) => {
        onSelectImage(img);
    };

    return (
        <div className='container mx-auto mt-4'>
            <div className='flex flex-wrap gap-3'>
                {data.map((item) => (
                    <img
                        key={item.id}
                        onClick={() => imgCilik(item.img)}
                        className='w-36 h-36 cursor-pointer object-cover rounded-lg transition-transform duration-300 transform hover:scale-110'
                        src={item.img}
                        alt=""
                    />
                ))}
            </div>
        </div>
    );
}

export default Galeriya;
