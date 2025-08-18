import React, { useState } from "react";
import { faqs } from "../../data/faq";
import { BiChevronRight } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import Newsletter from "../includes/Newsletter";
import Agents1 from "../includes/Agents1";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <section className=" p-8 pt-28 lg:px-28 pb-0 flex flex-col items-center gap-10">
        <section className="flex flex-col items-center gap-2 w-full">
          <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
            <BsQuestionCircle />
            <p className="uppercase" data-aos="flip-up">
              faq
            </p>
          </span>
          <h1
            className="text-3xl lg:text-5xl font-normal text-center max-w-[800px] w-full mx-auto"
            data-aos="fade-left"
          >
            Frequently asked questions
          </h1>
          <p className="text-sm font-normal text-center text-zinc-500 max-w-[700px]">
            More than just walls and rooftops, our gallery showcases lifestyles,
            communities, and opportunities. Browse through interiors, exteriors,
            and neighborhoods that define elegance and convenience—crafted to
            give you a true sense of what it feels like to call these places
            home.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
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
      <Agents1 />
      <Newsletter />
    </>
  );
}
