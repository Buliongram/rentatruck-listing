import React, { useState } from "react";
import {
  BiChevronRight,
  BiMinusCircle,
  BiPlusCircle,
  BiRocket,
} from "react-icons/bi";
import { BsRocket } from "react-icons/bs";
import { FaPlus, FaPlusCircle, FaSearch } from "react-icons/fa";
import { neighborhoodFaqs } from "../../data/faq";

export default function Support() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <section className="flex flex-col items-center gap-8 lg:p-14 p-4">
        <article className="flex flex-col items-center gap-2">
          <h2 className="text-xl lg:text-3xl font-semibold text-blue-600">
            Need Assistance?
          </h2>
          <p className="text-zinc-500 text-sm text-center">
            If you're feeling overwhelmed, remember that you don't have to face
            it all alone. <br /> Reach out and get the help you need
          </p>
          <form action="" className="flex items-center gap-2 w-full">
            <input
              type="text"
              required
              name="firstname"
              className="bg-white border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-600 placeholder outline-zinc-200 "
              placeholder="Ask a question"
            />
            <button
              type="submit"
              className="flex text-xs font-medium items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl outline-none cursor-pointer w-max"
            >
              <FaSearch /> Search
              {/* {!false ? (
                <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block"></span>
              ) : (
                "Save Record"
              )} */}
            </button>
          </form>
        </article>
        <article className="flex w-full gap-4">
          <section className="flex flex-col gap-1 border border-zinc-300 bg-white  rounded-3xl p-6 w-full">
            <span className="h-10 w-10 rounded-lg bg-blue-600/5 border border-zinc-300 flex items-center justify-center text-blue-600 text-lg">
              <BsRocket className="rotate-45" />
            </span>
            <h3 className="text-sm font-semibold">Getting Started</h3>
            <p className="text-[11px] text-zinc-500">
              Learn how to set up your account,explore key features, and get the
              most
            </p>
            <h3 className="text-[11px] font-semibold underline mt-3">
              Learn More
            </h3>
          </section>

          <section className="flex flex-col gap-1 border border-zinc-300 bg-white  rounded-3xl p-6 w-full">
            <span className="h-10 w-10 rounded-lg bg-blue-600/5 border border-zinc-300 flex items-center justify-center text-blue-600 text-lg">
              <BsRocket className="rotate-45" />
            </span>
            <h3 className="text-sm font-semibold">Getting Started</h3>
            <p className="text-[11px] text-zinc-500">
              Learn how to set up your account,explore key features, and get the
              most
            </p>
            <h3 className="text-[11px] font-semibold underline mt-3">
              Learn More
            </h3>
          </section>

          <section className="flex flex-col gap-1 border border-zinc-300 bg-white  rounded-3xl p-6 w-full">
            <span className="h-10 w-10 rounded-lg bg-blue-600/5 border border-zinc-300 flex items-center justify-center text-blue-600 text-lg">
              <BsRocket className="rotate-45" />
            </span>
            <h3 className="text-sm font-semibold">Getting Started</h3>
            <p className="text-[11px] text-zinc-500">
              Learn how to set up your account,explore key features, and get the
              most
            </p>
            <h3 className="text-[11px] font-semibold underline mt-3">
              Learn More
            </h3>
          </section>
        </article>
        <article className="flex gap-4 p-6 border border-zinc-300 bg-white  rounded-3xl w-full">
          <section className="w-full max-w-[300px] flex flex-col gap-2">
            <h3 className="text-[16px] font-semibold">FAQs</h3>
            <p className="text-[11px] text-zinc-500">
              Eeverything you need to know about the pproduct and other
              information. Can't find the answer you're looking for?
            </p>
            <h3 className="text-[11px] ">
              Reach us at{" "}
              <a
                href="mailto:info@rentahome.com"
                className="font-semibold underline text-blue-600"
              >
                info@rentahome.com
              </a>
            </h3>
          </section>
          <section className="flex flex-col gap-3 w-full divide-y divide-zinc-300">
            {neighborhoodFaqs.map((faq, index) => (
              <main key={index} className="py-2">
                <div
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between text-xs font-semibold cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`transition-transform duration-300 text-blue-600`}
                  />
                  {openIndex === index ? <BiMinusCircle /> : <BiPlusCircle />}
                </div>
                <p
                  className={`overflow-hidden transition-all text-xs text-zinc-500 duration-300 ${
                    openIndex === index ? "max-h-40 py-3" : "max-h-0 p-0"
                  }`}
                >
                  {faq.answer}
                </p>
              </main>
            ))}
          </section>
        </article>
      </section>
    </>
  );
}
