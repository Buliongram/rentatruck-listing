import React from "react";
import { MdOutlineLocationCity } from "react-icons/md";
import { Link } from "react-router-dom";
import { categories } from "../../data/listingData";
import Newsletter from "../includes/Newsletter";

export default function Categories() {
  return (
    <>
      <section className=" p-8 py-28 lg:p-28 flex flex-col items-center gap-10">
        <section className="flex flex-col items-center gap-2 w-full">
          <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
            <MdOutlineLocationCity />
            <p className=" uppercase" data-aos="flip-up">
              Neighborhood
            </p>
          </span>
          <h1
            className="text-3xl lg:text-5xl font-normal text-center max-w-[800px] w-full mx-auto"
            data-aos="fade-left"
          >
            Property Categories
          </h1>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {categories.map((category, index) => (
            <Link
              to={`/listing/category/${category.name
                .toLowerCase()
                .replace(" ", "")
                .replace("& ", "&")
                .replace("-", "")}`}
              className="flex flex-col gap-3 p-6 rounded-2xl bg-zinc-100/70"
            >
              <span className="h-14 w-14 lg:h-20 lg:w-20 rounded-full bg-white flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-[30px] lg:w-[50px]"
                />
              </span>
              <h3 className="text-lg font-medium">{category.name}</h3>
              <p className="text-xs text-zinc-500">(1 Property)</p>
            </Link>
          ))}
        </section>
      </section>
      <Newsletter />
    </>
  );
}
