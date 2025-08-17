import React from "react";
import { listing10 } from "../../assets/images/listing/listingImages";
import { agent1 } from "../../data/agentData";
import { Link } from "react-router-dom";
import BlogSlide from "../components/BlogSlide";
export default function Blog() {
  return (
    <>
      <section className=" p-8 lg:px-28 flex flex-col items-center gap-10">
        <h2
          className="font-normal text-3xl lg:text-5xl w-full text-left"
          data-aos="flip-left"
        >
          Blog
        </h2>
       
        <BlogSlide />
      </section>
    </>
  );
}
