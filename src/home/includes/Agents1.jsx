import React from "react";
import { GoArrowDownRight, GoArrowUpRight, GoLocation } from "react-icons/go";
import { banner } from "../../assets/images/images";
import { Link } from "react-router-dom";
import AgentSlide from "../components/AgentSlide";
export default function Agents1() {
  return (
    <section className="flex flex-col gap-10 p-8 py-12 lg:p-28 lg:py-14">
      <h3
        className="text-3xl lg:text-5xl font-normal text-center max-w-[700px] w-full mx-auto"
        data-aos="fade-left"
      >
        Start Your Journey With Our Amazing Agents
      </h3>
      <AgentSlide />
    </section>
  );
}
