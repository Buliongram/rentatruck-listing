import React, { useState } from "react";
import { banner, banner1 } from "../../assets/images/images";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { LuBed, LuSquareM } from "react-icons/lu";
import { GiBathtub } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";

export default function Explore() {
  const arrays = [1, 2, 3, 4, 5, 6];
  const [projects, setProjects] = useState([]);
  const [toggleProjects, setToggleProjects] = useState("Buy");
  const categories = [
    { name: "Buy", filter: "Buy" },
    { name: "Sell", filter: "Sell" },
    { name: "Rent", filter: "Rent" },
  ];

  const filteredProjects =
    toggleProjects === "Buy"
      ? projects
      : projects.filter((p) => p.type === toggleProjects);
  return (
    <article className="flex flex-col gap-5 p-8 py-12 lg:p-28 lg:py-20 lg:pb-12 bg-zinc-100/70">
      <section className="flex flex-col lg:flex-row items-center justify-between gap-5">
        <main className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-start">
          <h3 className="text-3xl lg:text-5xl font-normal" data-aos="fade-left">
            Explore our properties
          </h3>
          <p
            className="text-sm lg:text-[16px] text-zinc-500 font-normal"
            data-aos="flip-right"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
            cupiditate!
          </p>
        </main>

        <main className="flex items-center bg-white text-xs divide-x divide-zinc-300 rounded-t-xl overflow-hidden">
          {categories.map((item) => (
            <span
              key={item.filter}
              onClick={() => setToggleProjects(item.filter)}
              className={`px-12 py-4 cursor-pointer transition duration-200 ${
                toggleProjects === item.filter
                  ? "bg-primary text-white"
                  : "hover:bg-white"
              }`}
            >
              <p className="mt-0.5"> {item.name}</p>
            </span>
          ))}
        </main>
      </section>

      <article className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {arrays.map((item, index) => (
          <section
            className="flex flex-col rounded-2xl overflow-hidden bg-white group"
            data-aos={`flip-${index % 2 == 0 ? "right" : "left"}`}
          >
            <main className="h-[200px] rounded-t-2xl overflow-hidden cursor-pointer">
              <img
                src={banner1}
                alt=""
                className="h-full w-full rounded-t-2xl object-cover group-hover:scale-[1.5]"
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
                <h4 className="text-xl  font-primary">Heritage Building</h4>
              </main>

              <main className="flex items-center justify-between">
                <h4 className="text-[16px] lg:text-lg  font-primary">$40,000</h4>
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
                <p className="">Marseille, France</p>
              </main>
              <main className="w-full border-[0.1px] border-zinc-200"></main>
              <main className="flex items-center justify-between text-xs text-zinc-500">
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
            </section>
          </section>
        ))}
      </article>

      <button className="button-primary w-max mx-auto" data-aos="flip-left">
        <span className=""> See More Properties</span>
        <FaChevronRight className="text-xs" />
      </button>
    </article>
  );
}
