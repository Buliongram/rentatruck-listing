import React from "react";
import { banner, banner1 } from "../../assets/images/images";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { LuBed, LuSquareM } from "react-icons/lu";
import { GiBathtub } from "react-icons/gi";
import { GoLocation } from "react-icons/go";

export default function Explore() {
  const arrays = [1, 2, 3, 4, 5, 6,];
  return (
    <article className="flex flex-col gap-5 p-8 py-12 lg:p-20 bg-zinc-100/70">
      <section className="flex items-center justify-between">
        <main className="flex flex-col gap-1">
          <h3 className="text-3xl lg:text-5xl font-black">
            Explore our properties
          </h3>
          <p className="text-sm lg:text-[16px] text-zinc-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
            cupiditate!
          </p>
        </main>
      </section>

      <article className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:p-10">
        {arrays.map((item, index) => (
          <section className="flex flex-col rounded-2xl overflow-hidden bg-white">
            <main className="h-[200px] rounded-t-2xl">
              <img
                src={banner1}
                alt=""
                className="h-full w-full rounded-t-2xl object-cover"
              />
            </main>
            <section className="p-6 flex flex-col gap-2">
              <main className="w-full flex items-center justify-between">
                <span className="h-7 w-7 rounded-full">
                  <img
                    src={banner}
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                </span>
                <h4 className="text-xl mt-1">Heritage Building</h4>
              </main>

              <main className="flex items-center justify-between">
                <h4 className="text-[16px] mt-1">$40,000</h4>
                <div className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded-full border border-zinc-300 flex items-center justify-center">
                    <AiOutlineHeart />
                  </span>
                  <span className="h-7 w-7 rounded-full border border-zinc-300 flex items-center justify-center">
                    <AiOutlineShareAlt />
                  </span>
                </div>
              </main>
              <main className="text-xs text-zinc-500 flex items-center gap-1">
                <GoLocation />
                <p className="mt-1">Marseille, France</p>
              </main>
              <main className="w-full border-[0.1px] border-zinc-200"></main>
              <main className="flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <LuBed />
                  <span className="mt-1"> 4 Beds</span>
                </div>
                <div className="flex items-center gap-1">
                  <GiBathtub />
                  <span className="mt-1">3 Bathrooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <LuSquareM />
                  <span className="mt-1">8 x 10m(S)</span>
                </div>
              </main>
            </section>
          </section>
        ))}
      </article>
    </article>
  );
}
