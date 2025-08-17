import React, { useState } from "react";
import Newsletter from "../includes/Newsletter";
import { banner } from "../../assets/images/images";
import {
  listing1,
  listing10,
  listing3,
  listing5,
} from "../../assets/images/listing/listingImages";
import { MdOutlineLocationCity } from "react-icons/md";
import { neighborhoodFaqs } from "../../data/faq";
import { BiChevronRight } from "react-icons/bi";

export default function Neighborhood() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
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
            Explore Listings by Neighborhood
          </h1>
          <p className="text-sm font-normal text-center text-zinc-500 max-w-[700px]">
            Discover homes and properties tailored to your lifestyle, right in
            the heart of your preferred neighborhood. Whether you’re looking for
            a vibrant community, peaceful surroundings, or easy access to city
            conveniences, our neighborhood-based listings make it easier to find
            the perfect match.
          </p>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="sm:col-span-2 sm:row-span-2">
            <img
              src={banner}
              alt="Big City"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div>
            <img
              src={listing1}
              alt="Small 1"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <img
              src={listing3}
              alt="Small 2"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <img
              src={listing5}
              alt="Small 3"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <img
              src={listing10}
              alt="Small 4"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </section>
        <section className="flex flex-col gap-3">
          {neighborhoodFaqs.map((faq, index) => (
            <main
              key={index}
              className="flex flex-col border border-zinc-300 rounded-2xl overflow-hidden p-3 md:p-4"
            >
              <div
                onClick={() => toggleFaq(index)}
                className="flex items-center justify-between text-sm  lg:text-lg font-medium cursor-pointer"
              >
                <span>{faq.question}</span>
                <BiChevronRight
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </div>
              <p
                className={`overflow-hidden transition-all text-sm text-zinc-500 duration-300 font-normal ${
                  openIndex === index ? "max-h-40 mt-4" : "max-h-0 p-0"
                }`}
              >
                {faq.answer}
              </p>
            </main>
          ))}
        </section>
      </section>

      <Newsletter />
    </>
  );
}
