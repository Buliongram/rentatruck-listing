import React from "react";
import { Link } from "react-router-dom";
import { banner } from "../../assets/images/images";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { LuBed, LuSquareM } from "react-icons/lu";
import { BiArea, BiBed } from "react-icons/bi";

import { GiBathtub } from "react-icons/gi";

export default function ListingCard({
  id,
  image,
  title,
  price,
  address,
  bathroom,
  bedroom,
  squareMeters,
  full,
}) {
  return (
    <Link
      to={`/listing/${id}`}
      className="flex flex-col gap-6 rounded-3xl overflow-hidden bg-white lg:border-[1.3px] border-zinc-200 group p-4"
      // data-aos={`flip-${Number(id) % 2 == 0 ? "right" : "left"}`}
    >
      <main className="h-[200px] rounded-3xl overflow-hidden cursor-pointer relative">
        <img
          src={image[0]}
          alt={title}
          className="h-full w-full rounded-3xl object-cover group-hover:scale-[1.5]"
        />
        <span className="absolute z-10 left-4 top-4 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-xl">
          For Sale
        </span>

        <AiOutlineHeart className="absolute top-4 right-4 z-10 text-white text-2xl" />
      </main>
      <section className="flex flex-col gap-4">
        <main className="flex flex-col">
          <h4 className="text-xl  font-primary">{title}</h4>
          <p className="text-sm font-light text-zinc-500 flex items-center gap-1">
            {address}
          </p>
        </main>
        <section className="flex flex-col gap-1 w-full  font-light text-sm">
          <main className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <BiBed />
              <span>
                {bedroom} bedroom{bedroom > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <GiBathtub />
              <span>
                {bathroom} bathroom{bathroom > 1 ? "s" : ""}
              </span>
            </div>
          </main>
          <main className="flex items-center gap-1">
            <BiArea />
            <span>{squareMeters}</span>
          </main>
        </section>
        <main className="w-full border border-dashed my-2 border-primary"></main>
        <main className="flex items-center justify-between">
          <h4 className="text-[16px] lg:text-lg  font-primary">
            <span>&#8358;</span> {price.toLocaleString()}
          </h4>
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full">
              <img
                src={banner}
                className="h-full w-full rounded-full object-cover"
                alt={title}
              />
            </span>
            <span className="h-6 w-6 rounded-full border border-zinc-300 flex items-center justify-center">
              <AiOutlineShareAlt />
            </span>
          </div>
        </main>
      </section>
    </Link>
  );
}
