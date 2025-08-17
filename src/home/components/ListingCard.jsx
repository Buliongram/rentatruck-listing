import React from "react";
import { Link } from "react-router-dom";
import { banner } from "../../assets/images/images";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { LuBed, LuSquareM } from "react-icons/lu";
import { BiArea } from "react-icons/bi";

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
      className="flex flex-col rounded-2xl overflow-hidden bg-white group"
      data-aos={`flip-${Number(id) % 2 == 0 ? "right" : "left"}`}
    >
      <main className="h-[200px] rounded-t-2xl overflow-hidden cursor-pointer">
        <img
          src={image[0]}
          alt={title}
          className="h-full w-full rounded-t-2xl object-cover group-hover:scale-[1.5]"
        />
      </main>
      <section className="p-6 flex flex-col gap-2">
        <main className="w-full flex items-center justify-between">
          <span className="h-7 w-7 rounded-full">
            <img
              src={banner}
              alt="agent image"
              className="h-full w-full rounded-full object-cover"
            />
          </span>
          <h4 className="text-xl  font-primary">{title}</h4>
        </main>

        <main className="flex items-center justify-between">
          <h4 className="text-[16px] lg:text-lg  font-primary">
            &#8358; {price.toLocaleString()}
          </h4>
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
          <p>{address}</p>
        </main>
        <main className="w-full border-[0.1px] border-zinc-200"></main>
        <main className="flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <LuBed />
            <span>
              {" "}
              {bedroom} bedroom{bedroom > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <GiBathtub />
            <span>
              {bathroom} bathroom{bathroom > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <BiArea />
            <span>{squareMeters}</span>
          </div>
        </main>
      </section>
    </Link>
  );
}
