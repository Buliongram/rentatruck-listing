import React from 'react'
import { whychoose1, whychoose2, whychoose3 } from '../../assets/images/images';

export default function WhyChoose() {
  return (
    <>
      <section className=" p-8 py-12 lg:p-20 flex flex-col items-center gap-10">
        <section className="flex flex-col gap-2 items-center">
          <span className="border rounded-full border-zinc-300 p-1 lg:p-2 px-5 text-[10px] lg:text-xs">
            <p className="mt-1 uppercase "> Bricks And Clicks</p>
          </span>
          <h2 className="font-black text-3xl lg:text-5xl">
            Why Choose Endora?
          </h2>
          <p className="text-zinc-500 text-sm text-center">
            Fusce aliquet quam eget neque ultrices elementum felis id arcu
            blandit sagittis.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <main className="bg-zinc-100 rounded-3xl p-8 flex flex-col gap-3">
            <img
              src={whychoose1}
              alt="whychoose1"
              className="w-[60px] lg:w-[80px]"
            />
            <h3 className=" text-xl lg:text-2xl font-black">
              Historic Properties
            </h3>
            <p className="text-sm text-zinc-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ullam rerum, at pariatur ad officia laborum earum illum quo
              incidunt.
            </p>
          </main>
          <main className="bg-zinc-100 rounded-3xl p-8 flex flex-col gap-3">
            <img
              src={whychoose2}
              alt="whychoose2"
              className="w-[60px] lg:w-[80px]"
            />
            <h3 className=" text-xl lg:text-2xl font-black">
              Furniture Includes
            </h3>
            <p className="text-sm text-zinc-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ullam rerum, at pariatur ad officia laborum earum illum quo
              incidunt.
            </p>
          </main>
          <main className="bg-zinc-100 rounded-3xl p-8 flex flex-col gap-3">
            <img
              src={whychoose3}
              alt="whychoose3"
              className="w-[60px] lg:w-[80px]"
            />
            <h3 className=" text-xl lg:text-2xl font-black">
              Architecture Design
            </h3>
            <p className="text-sm text-zinc-500">
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
