import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../module.css/Swiper.css'

import { Pagination, Navigation } from 'swiper/modules';

export default function App({ docs }) {
  return (
    <Swiper
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
              style={{ objectFit: 'cover' }}
              className="media"
            >
              <source src={doc.url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={doc.url}
              alt={doc.title}
              style={{ objectFit: 'cover' }}
              className="media"
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}