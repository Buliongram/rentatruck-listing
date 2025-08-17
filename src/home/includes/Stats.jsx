import React from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import { LuCircleArrowOutUpLeft } from "react-icons/lu";

export default function Stats() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-evenly divide-y lg:divide-y-0 lg:divide-x divide-zinc-300 p-8 lg:px-28 lg:py-12">
      <main className="flex flex-col py-10 lg:py-0 px-0 lg:px-10">
        <div className="flex items-center gap-1">
          <span className="text-5xl font-semibold font-primary">9K+</span>
          <FiArrowUpCircle />
        </div>
        <p className="text-xs text-zinc-500 -mt-1">Happy Customers</p>
      </main>

      <main className="flex flex-col py-10 lg:py-0 px-0 lg:px-10">
        <div className="flex items-center gap-1">
          <span className="text-5xl font-semibold font-primary">98%</span>
          <FiArrowUpCircle />
        </div>
        <p className="text-xs text-zinc-500 -mt-1">Clients Satisfaction Rate</p>
      </main>

      <main className="flex flex-col py-10 lg:py-0 px-0 lg:px-10">
        <div className="flex items-center gap-1">
          <span className="text-5xl font-semibold font-primary">15K+</span>
          <FiArrowUpCircle />
        </div>
        <p className="text-xs text-zinc-500 -mt-1">Total Property sale</p>
      </main>

      <main className="flex flex-col py-10 lg:py-0 px-0 lg:px-10">
        <div className="flex items-center gap-1">
          <span className="text-5xl font-semibold font-primary">85+</span>
          <FiArrowUpCircle />
        </div>
        <p className="text-xs text-zinc-500 -mt-1">Agents</p>
      </main>
    </section>
  );
}
