import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../module.css/Swiper.css';

import { Pagination, Navigation } from 'swiper/modules';

export default function SwiperCarousal({ docs }) {
  const swiperRef = useRef(null);

  const handleSlideChange = () => {
    const videos = document.querySelectorAll('.swiper-slide video');

    videos.forEach((video) => {
      video.pause(); 
    });
  };

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={handleSlideChange}
      pagination={{ type: 'fraction' }}
      navigation
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {docs.map((doc, index) => (
        <SwiperSlide key={index} className="slide-center">
          {doc.type === 'video' ? (
            <video
              controls
              preload="metadata"
              className="media"
              style={{ objectFit: 'cover' }}
            >
              <source src={doc.url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={doc.url}
              alt={doc.title}
              className="media"
              style={{ objectFit: 'cover' }}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}