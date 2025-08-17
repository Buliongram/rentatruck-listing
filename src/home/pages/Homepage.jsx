import React from "react";
import Hero from "../includes/Hero";
import WhyChoose from "../includes/WhyChoose";
import Explore from "../includes/Explore";
import Featured from "../includes/Featured";
import Agents from "../includes/Agents";
import Blog from "../includes/Blog";
import Newsletter from "../includes/Newsletter";
import Stats from "../includes/Stats";
import Agents1 from "../includes/Agents1";
import Reviews from "../includes/Reviews";
import Faq from "../includes/Faq";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Explore />
      <WhyChoose />
      <Featured />
      <Stats />
      {/* <Agents /> */}
      <Agents1 />
      <Reviews />
      <Blog />
      <Faq />
      <Newsletter />
    </>
  );
}
