import React from "react";
import Hero from "../includes/Hero";
import WhyChoose from "../includes/WhyChoose";
import Explore from "../includes/Explore";
import Featured from "../includes/Featured";
import Agents from "../includes/Agents";
import Blog from "../includes/Blog";
import Newsletter from "../includes/Newsletter";
import Testimonials from "../includes/Testimonials";
import Stats from "../includes/Stats";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Explore />
      <WhyChoose />
      <Featured />
      <Stats />
      <Agents />
      <Testimonials />
      <Blog />
      <Newsletter />
    </>
  );
}
