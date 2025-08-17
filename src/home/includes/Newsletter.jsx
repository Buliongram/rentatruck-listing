import React from "react";
import { listing6 } from "../../assets/images/listing/listingImages";
import { banner } from "../../assets/images/images";

export default function Newsletter() {
  return (
    <section className="h-[300px] lg:h-[350px] flex flex-col items-center justify-evenly p-5 lg:p-10 relative bg-black">
      <img
        src={banner}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        alt="banner"
      />

      <h2
        className="font-medium text-2xl lg:text-5xl lg:max-w-[70%] text-center text-white"
        data-aos="flip-left"
      >
        Subscribe To Our Real Estate Newsletter
      </h2>

      <form
        action=""
        className="flex items-center bg-white relative lg:max-w-[50%] w-full rounded-lg"
      >
        <input
          type="text"
          className="bg-transparent p-3.5 placeholder:font-normal rounded-s-lg placeholder:text-zinc-500 placeholder:text-xs text-sm px-6 outline-none w-full"
          placeholder="Email address"
        />
        <button className="rounded-none h-max bg-primary text-white text-sm font-normal p-3.5 px-4 lg:px-8 cursor-pointer rounded-e-lg">
          Subscribe
        </button>
      </form>
    </section>
  );
}
