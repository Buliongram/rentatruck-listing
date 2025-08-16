import React from "react";
import { banner, banner1 } from "../../assets/images/images";
import { GoArrowDownRight } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { LuHouse } from "react-icons/lu";
import { GiMoneyStack } from "react-icons/gi";
import { GrMapLocation } from "react-icons/gr";

export default function Hero() {
  return (
    <section className="lg:h-[130dvh] relative bg-gradient-to-b from-[#01495c] to-[#02637e] flex items-center flex-col lg:flex-row justify-center lg:p-20 gap-16 lg:gap-28 p-8 py-28">
      <img src={banner1} className="absolute top-0 left-0 w-full h-full object-cover opacity-60" alt="banner" />
      <main className="flex flex-col gap-6 w-full relative  text-white">
        <div className="flex items-center text-[10px] lg:text-xs">
          <span className="border rounded-full border-white p-2 px-5">
            <p className="mt-1"> Tales From The Real Estate Frontier</p>
          </span>
          <span className="border rounded-full border-white h-9 w-9 flex items-center justify-center text-sm lg:text-xl ">
            <GoArrowDownRight />
          </span>
        </div>

        <h1 className=" text-4xl lg:text-7xl font-black leading-[1]">
          Exploring Unique Homes In Market
        </h1>
        <p className="text-sm font-normal lg:text-[16px] max-w-[450px]">
          A great platform to buy, sell, or even rent your properties without
          any commissions
        </p>
        <a
          href=""
          className="rounded-full p-1 flex items-center gap-2 text-sm bg-black w-max pr-6"
        >
          <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-black">
            <FiPhoneCall className="mt-0.5" />
          </span>
          <p className="mt-1">Contact us now</p>
        </a>
      </main>
      <main className="flex flex-col gap-6 w-full relative bg-white rounded-4xl h-full p-10 lg:max-w-[400px] max-h-[450px] items-center text-center justify-between">
        <h2 className="text-3xl font-black leading-[1] text-[#01495c] ">
          Find the best property
        </h2>
        <form action="" className="flex flex-col gap-4 w-full">
          <main className="flex flex-col items-start w-full">
            <label htmlFor="" className="text-sm font-black">
              Looking for
            </label>
            <div className="flex items-center p-3 border border-zinc-300 rounded-xl w-full">
              <LuHouse />

              <input
                type="text"
                className="px-4 placeholder:mt-1 placeholder:text-xs placeholder:text-zinc-500 w-full outline-none text-sm"
                placeholder="Property Type"
              />
            </div>
          </main>

          <main className="flex flex-col items-start w-full">
            <label htmlFor="" className="text-sm font-black">
              Location
            </label>
            <div className="flex items-center p-3 border border-zinc-300 rounded-xl w-full">
              <GrMapLocation />
              <select
                name=""
                id=""
                className="px-4 placeholder:mt-1 placeholder:text-xs placeholder:text-zinc-500 w-full outline-none text-sm"
              >
                <option value="">United States</option>
                <option value="">United Kingdom</option>
              </select>
            </div>
          </main>

          <main className="flex flex-col items-start w-full">
            <label htmlFor="" className="text-sm font-black">
              Your Price
            </label>
            <div className="flex items-center p-3 border border-zinc-300 rounded-xl w-full">
              <GiMoneyStack />

              <input
                type="number"
                className="px-4 placeholder:mt-1 placeholder:text-xs placeholder:text-zinc-500 w-full outline-none text-sm"
                placeholder="Max Price"
              />
            </div>
          </main>

          <button className="text-center flex items-center cursor-pointer justify-center gap-2 bg-[#01495c] text-white px-6 py-3.5 rounded-2xl text-sm">
            Search Property <AiOutlineSearch className="text-lg" />
          </button>
        </form>
      </main>
    </section>
  );
}
