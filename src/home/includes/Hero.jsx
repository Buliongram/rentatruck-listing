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
    <section className="lg:h-[130dvh] relative flex items-center flex-col lg:flex-row justify-center lg:p-20 gap-16 lg:gap-28 p-8 py-28">
      <img
        src={banner}
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="banner"
      />
      <main className="flex flex-col gap-6 w-full relative text-white">
        <div className="flex items-center text-[10px] lg:text-xs">
          <span
            className="border rounded-full border-white p-2 px-5"
            data-aos="fade-right"
          >
            <p className=""> Tales From The Real Estate Frontier</p>
          </span>
          <span
            className="border rounded-full border-white h-9 w-9 flex items-center justify-center text-sm lg:text-xl "
            data-aos="fade-left"
          >
            <GoArrowDownRight />
          </span>
        </div>

        <h1
          className=" text-4xl lg:text-7xl font-black leading-[1] font-primary"
          data-aos="fade-down"
        >
          Exploring Unique Homes In Market
        </h1>
        <p
          className="text-sm font-normal lg:text-[16px] max-w-[450px]"
          data-aos="fade-up"
        >
          A great platform to buy, sell, or even rent your properties without
          any commissions
        </p>
        <a
          href=""
          className="rounded-full p-1 flex items-center gap-2 text-sm bg-black w-max pr-6"
          data-aos="fade-left"
        >
          <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-black">
            <FiPhoneCall className="mt-0.5" />
          </span>
          <p className="">Contact us now</p>
        </a>
      </main>
      <main className="w-full lg:max-w-[400px]"></main>
      {/* <main
        className="flex flex-col gap-6 w-full relative bg-white rounded-4xl h-full p-10 lg:max-w-[400px] max-h-[450px] items-center text-center justify-between"
        data-aos="flip-right"
      >
        <h2 className="text-3xl font-black leading-[1] text-primary font-primary ">
          Find the best property
        </h2>
        <form action="" className="flex flex-col gap-4 w-full">
          <main className="flex flex-col items-start w-full">
            <label htmlFor="" className="text-sm font-semibold">
              Looking for
            </label>
            <div className="flex items-center p-3 border border-zinc-300 rounded-xl w-full">
              <LuHouse />

              <input
                type="text"
                className="px-4 placeholder: placeholder:text-xs placeholder:text-zinc-500 w-full outline-none text-sm"
                placeholder="Property Type"
              />
            </div>
          </main>

          <main className="flex flex-col items-start w-full">
            <label htmlFor="" className="text-sm font-semibold">
              Location
            </label>
            <div className="flex items-center p-3 border border-zinc-300 rounded-xl w-full">
              <GrMapLocation />
              <select
                name=""
                id=""
                className="px-4 placeholder: placeholder:text-xs placeholder:text-zinc-500 w-full outline-none text-sm"
              >
                <option value="">United States</option>
                <option value="">United Kingdom</option>
              </select>
            </div>
          </main>

          <main className="flex flex-col items-start w-full">
            <label htmlFor="" className="text-sm font-semibold">
              Your Price
            </label>
            <div className="flex items-center p-3 border border-zinc-300 rounded-xl w-full">
              <GiMoneyStack />

              <input
                type="number"
                className="px-4 placeholder: placeholder:text-xs placeholder:text-zinc-500 w-full outline-none text-sm"
                placeholder="Max Price"
              />
            </div>
          </main>

          <button className="button-primary">
            Search Property <AiOutlineSearch className="text-lg" />
          </button>
        </form>
      </main> */}
    </section>
  );
}
