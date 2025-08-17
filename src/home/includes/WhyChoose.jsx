import React from "react";
import { whychoose1, whychoose2, whychoose3 } from "../../assets/images/images";

export default function WhyChoose() {
  return (
    <>
      <section className=" p-8 py-12 lg:p-28 lg:py-14 flex flex-col items-center gap-10">
        <section className="flex flex-col gap-2 items-center">
          <span className="border rounded-full border-zinc-300 p-1 lg:py-2 px-5 text-[10px] lg:text-xs text-primary">
            <p className=" uppercase" data-aos="flip-up">
              {" "}
              Bricks And Clicks
            </p>
          </span>
          <h2
            className="font-normal text-3xl lg:text-5xl"
            data-aos="flip-left"
          >
            Why Choose Endora?
          </h2>
          <p
            className="text-zinc-500 text-sm text-center"
            data-aos="flip-right"
          >
            Fusce aliquet quam eget neque ultrices elementum felis id arcu
            blandit sagittis.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <main
            className="bg-zinc-100/70 rounded-3xl p-8 flex flex-col gap-3"
            data-aos="fade-left"
          >
            <img
              src={whychoose1}
              alt="whychoose1"
              className="w-[60px] lg:w-[80px]"
            />
            <h3 className=" text-lg lg:text-xl font-normal">
              Historic Properties
            </h3>
            <p className="text-sm text-zinc-500 font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ullam rerum, at pariatur ad officia laborum earum illum quo
              incidunt.
            </p>
          </main>
          <main
            className="bg-zinc-100/70 rounded-3xl p-8 flex flex-col gap-3"
            data-aos="flip-up"
          >
            <img
              src={whychoose2}
              alt="whychoose2"
              className="w-[60px] lg:w-[80px]"
            />
            <h3 className=" text-lg lg:text-xl font-normal">
              Furniture Includes
            </h3>
            <p className="text-sm text-zinc-500 font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ullam rerum, at pariatur ad officia laborum earum illum quo
              incidunt.
            </p>
          </main>
          <main
            className="bg-zinc-100/70 rounded-3xl p-8 flex flex-col gap-3"
            data-aos="flip-right"
          >
            <img
              src={whychoose3}
              alt="whychoose3"
              className="w-[60px] lg:w-[80px]"
            />
            <h3 className=" text-lg lg:text-xl font-normal">
              Architecture Design
            </h3>
            <p className="text-sm text-zinc-500 font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ullam rerum, at pariatur ad officia laborum earum illum quo
              incidunt.
            </p>
          </main>
        </section>
      </section>
    </>
  );
}
