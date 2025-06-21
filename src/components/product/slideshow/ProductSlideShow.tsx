'use client';

import { useState } from 'react';

import { Swiper as SwiperObject } from 'swiper';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { ProductImage } from '../productImage/ProductImage';
import './slideshow.css';

interface Props {
    images: string[];
    title: string;
    className?: string;
};

export const ProductSlideShow = ({ title, className, images }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>
            <Swiper
                style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000', } as React.CSSProperties}
                spaceBetween={10}
                navigation={true}
                autoplay={{ delay: 2500 }}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            >
                {images.map(img => (
                    <SwiperSlide key={img}>
                        <ProductImage
                            src={img}
                            width={600}
                            height={500}
                            alt={title}
                            className="rounded-xl object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-2"
            >
                {images.map(img => (
                    <SwiperSlide key={img}>
                        <ProductImage
                            src={img}
                            width={250}
                            height={250}
                            alt={title}
                            className="rounded-xl object-cover cursor-pointer"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
