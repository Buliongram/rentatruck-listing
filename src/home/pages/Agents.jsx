import AgentCard from "../../components/AgentCard";
import { agentsData } from "../../data/agentData";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { agentsFaq } from "../../data/faq";
import { BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import OurAgents from "../includes/OurAgents";

export default function Agents() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      {" "}
      <section className="flex flex-col gap-10 p-8  py-28 lg:p-28 lg:pb-0">
        <section className="flex flex-col items-center gap-2 w-full">
          <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
            <MdOutlineRealEstateAgent />
            <p className=" uppercase" data-aos="flip-up">
              Our Agents
            </p>
          </span>
          <h1
            className="text-3xl lg:text-5xl font-normal text-center max-w-[700px] w-full mx-auto"
            data-aos="fade-left"
          >
            Start Your Journey With Our Amazing Agents
          </h1>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {agentsData.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </section>

        <section className="flex flex-col gap-3">
          {agentsFaq.map((faq, index) => (
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
      <OurAgents />
    </>
  );
}
