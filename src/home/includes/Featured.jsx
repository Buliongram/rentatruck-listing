import React from "react";
import { banner, banner1 } from "../../assets/images/images";
import { GoArrowDownRight, GoLocation } from "react-icons/go";
import { FaPlay } from "react-icons/fa6";
import {
  AiOutlineHeart,
  AiOutlinePlayCircle,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { LuBed, LuSquareM } from "react-icons/lu";
import { GiBathtub } from "react-icons/gi";

export default function Featured() {
  return (
    <article className="flex flex-col gap-5 p-10">
      <h3 className="text-3xl lg:text-5xl font-normal" data-aos="fade-left">
        Featured Property
      </h3>
      <section className="h-[450px] rounded-2xl overflow-hidden flex-col-reverse lg:flex-row flex items-end justify-between p-4 lg:p-6 relative bg-gradient-to-t from-40% from-black">
        <img
          src={banner}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
          alt="banner"
        />
        <h3
          className="lg:hidden mt-4 text-2xl lg:text-4xl font-normal text-white max-w-[350px] ml-auto"
          data-aos="fade-left"
        >
          Flash Sale 25% Off Today's Top Pick
        </h3>
        <section className="w-full relative h-full flex flex-col items-start justify-end">
          <main className="bg-white p-4 rounded-xl lg:max-w-[300px] w-full flex flex-col gap-2">
            <main className="w-full flex items-center justify-between">
              <span className="h-5 w-5 rounded-full">
                <img
                  src={banner}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
              <h4 className="text-lg mt-1 font-primary">Heritage Building</h4>
            </main>

            <main className="flex items-center gap-5 text-[10px] text-zinc-500">
              <div className="flex items-center gap-1">
                <LuBed />
                <span className=""> 4 Beds</span>
              </div>
              <div className="flex items-center gap-1">
                <GiBathtub />
                <span className="">3 Bathrooms</span>
              </div>
              <div className="flex items-center gap-1">
                <LuSquareM />
                <span className="">8 x 10m(S)</span>
              </div>
            </main>

            <main className="text-[11px] text-zinc-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
              cupiditate.
            </main>

            <main className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full border border-zinc-300 flex items-center justify-center">
                  <AiOutlineHeart />
                </span>
                <span className="h-7 w-7 rounded-full border border-zinc-300 flex items-center justify-center">
                  <AiOutlineShareAlt />
                </span>
              </div>

              <h4 className="text-[16px] lg:text-lg  font-primary">$40,000</h4>
            </main>
          </main>
        </section>
        <section className="w-full h-full flex flex-col justify-between relative">
          <main className="flex items-center lg:gap-6 p-1 lg:p-2 rounded-lg bg-white/70 backdrop-blur-lg max-w-[400px] w-max ml-auto">
            <section className="hidden lg:flex flex-col justify-between h-full">
              <div className="flex items-center text-[10px] lg:text-xs">
                <span className="rounded-full bg-black text-white py-1.5 px-5">
                  <p className="">Exclusive</p>
                </span>
                <span
                  className="rounded-full bg-black text-white h-7 w-7 flex items-center justify-center text-sm lg:text-lg "
                  data-aos="fade-left"
                >
                  <GoArrowDownRight />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium">
                  Tranquils waters swimming pool
                </span>
                <p className="text-xs text-zinc-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus, sint? Ipsa quas reiciendis aliquam nostrum.
                </p>
              </div>
            </section>
            <section className="h-20 lg:h-32 w-20 lg:w-32 rounded-lg overflow-hidden shrink-0 relative flex items-center justify-center">
              <img
                src={banner1}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                alt="banner"
              />{" "}
              <span className="h-7 lg:h-10 w-7 lg:w-10 rounded-full bg-white/50 backdrop-blur-lg flex items-center justify-center text-white relative">
                <AiOutlinePlayCircle className="text-lg" />
              </span>
            </section>
          </main>
          <h3
            className="hidden lg:block text-2xl lg:text-4xl font-normal text-white max-w-[350px] ml-auto"
            data-aos="fade-left"
          >
            Flash Sale 25% Off Today's Top Pick
          </h3>
        </section>
      </section>
    </article>
  );
}
