import React, { useState } from "react";
import { faqs } from "../../data/faq";
import { BiChevronRight } from "react-icons/bi";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <section className=" p-8 py-12 lg:p-28 lg:py-14 flex flex-col items-center gap-10">
        <section className="flex flex-col lg:flex-row gap-5 items-center lg:items-start justify-between w-full">
          <h2 className="font-normal text-3xl lg:text-5xl" data-aos="flip-left">
            Frequently asked questions
          </h2>
          <p
            className="text-zinc-500 text-sm font-normal text-center lg:text-end max-w-[400px]"
            data-aos="flip-right"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A
            voluptates atque inventore dolorum magni obcaecati, tenetur quidem
            error ipsa quasi.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          {faqs.slice(0, 5).map((faq, index) => (
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
    </>
  );
}
