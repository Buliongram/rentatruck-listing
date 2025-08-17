import React from "react";
import { blogs } from "../../data/BlogData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import BlogCard from "../../components/BlogCard";
export default function BlogSlide() {
  return (
    <Swiper
      slidesPerView={3}
      modules={[Autoplay]}
      breakpoints={{
        320: { slidesPerView: 2, spaceBetween: 15 },
        650: { slidesPerView: 2, spaceBetween: 30 },
        960: { slidesPerView: 3, spaceBetween: 30 },
        1200: { slidesPerView: 3, spaceBetween: 30 },
      }}
      autoplay={{ delay: 4000 }}
      fadeEffect={{ crossFade: true }}
      loop={true}
      direction="horizontal"
      className="overflow-x-hidden w-full py-5"
    >
      {blogs.map((blog) => (
        <SwiperSlide
          key={blog.id}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full"
        >
          <BlogCard key={blog.id} {...blog} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
