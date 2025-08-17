import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Agents } from "../../data/agentData";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
export default function AgentSlide({
  id,
  name,
  title,
  facebook,
  whatsapp,
  instagram,
  membership,
  phoneNumber,
  email,
  twitter,
  image,
}) {
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
      {Agents.map((agent) => (
        <SwiperSlide
          key={agent.id}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          <Link to={`/agents/${agent.id}`} className="flex flex-col gap-3">
            <div className="h-[280px] rounded-2xl overflow-hidden">
              <img
                src={agent.image}
                alt={agent.name}
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex flex-col">
                <h3 className="font-medium">{agent.name}</h3>
                <p className="text-zinc-500 font-normal text-xs">
                  {agent.title}
                </p>
              </span>
              <span className="flex items-center justify-center h-8 w-8 border border-zinc-400 rounded-full">
                <GoArrowUpRight />
              </span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
