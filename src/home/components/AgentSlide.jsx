
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {  agentsData } from "../../data/agentData";
import AgentCard from "../../components/AgentCard";
export default function AgentSlide() {
  return (
    <Swiper
      slidesPerView={3}
      modules={[Autoplay]}
      breakpoints={{
        320: { slidesPerView: 2, spaceBetween: 15 },
        650: { slidesPerView: 2, spaceBetween: 30 },
        960: { slidesPerView: 3, spaceBetween: 30 },
        1200: { slidesPerView: 4, spaceBetween: 30 },
      }}
      autoplay={{ delay: 4000 }}
      fadeEffect={{ crossFade: true }}
      loop={true}
      direction="horizontal"
      className="overflow-x-hidden w-full py-5"
    >
      {agentsData.map((agent) => (
        <SwiperSlide
          key={agent.id}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          <AgentCard key={agent.id} {...agent} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
