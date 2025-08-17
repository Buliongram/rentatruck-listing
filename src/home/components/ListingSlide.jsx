import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { listings } from "../../data/listingData";
import ListingCard from "./ListingCard";

export default function ListingSlide() {
  return (
    <Swiper
      slidesPerView={3}
      modules={[Autoplay]}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween:30},
        650: { slidesPerView: 2, spaceBetween:30},
        960: { slidesPerView: 3, spaceBetween:30},
        1200: { slidesPerView: 3, spaceBetween:30},
      }}
      autoplay={{ delay: 4000 }}
      fadeEffect={{ crossFade: true }}
      loop={true}
      direction="horizontal"
      className="overflow-x-hidden w-full py-5"
    >
      {listings
        .filter((listing) => listing.featured === true)
        .map((listing) => (
          <SwiperSlide
            key={listing.id}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <ListingCard key={listing.id} {...listing} full={false} />

          </SwiperSlide>
        ))}
    </Swiper>
  );
}
