'use client';


import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slideshow.css';

interface Props {
    images: string[];
    title: string;
    className?: string;
};

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {

    return (

        <div className={className}>
            <Swiper
                style={{ height: '500px' }}
                pagination={true}
                autoplay={{ delay: 2500 }}
                modules={[FreeMode, Navigation, Autoplay, Pagination]}
                className="w-screen"
            >
                {images.map(img => (
                    <SwiperSlide key={img}>
                        <Image src={`/products/${img}`} width={600} height={500} alt={title} className="object-fill" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
