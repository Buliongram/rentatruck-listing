import React from "react";
import { banner } from "../../assets/images/images";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { agentsData } from "../../data/agentData";
export default function OurAgents() {
  return (
    <section className="flex flex-col gap-5 p-8 py-12">
      {/* <h3 className="text-3xl lg:text-5xl font-normal" data-aos="fade-left">
        Real Estate Agents
      </h3> */}
      <article className="flex flex-col lg:flex-row h-max gap-5">
        <section className="w-full lg:max-w-[350px] relative flex flex-col items-center justify-end max-[640px]:h-[450px] p-10 rounded-3xl">
          {agentsData.slice(3, 4).map((agent) => (
            <img
              src={agent.image}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
              alt={agent.name}
            />
          ))}

          {/* <Link
            className="flex items-center text-[10px] lg:text-xs relative"
            data-aos="fade-left"
          >
            <span className="rounded-full border border-white bg-white/30 backdrop-blur-md text-white py-1.5 px-5">
              <p className="">View More</p>
            </span>
            <span className="rounded-full border border-white bg-white/30 backdrop-blur-md text-white h-7 w-7 flex items-center justify-center text-sm lg:text-lg ">
              <GoArrowUpRight />
            </span>
          </Link> */}
        </section>

        <section className="h-full flex flex-col lg:p-5 py-5 rounded-3xl justify-between lg:bg-zinc-100/70 w-full">
          <div className="flex flex-col gap-6 lg:gap-2 lg:max-w-[70%] w-full">
            <h3
              className="text-xl lg:text-3xl font-normal text-primary"
              data-aos="fade-left"
            >
              We're here to help{" "}
              <span className="text-gray-500">
                with any questions or concerns you have about{" "}
              </span>
              buying, selling, or investing in property
            </h3>
            <p className="text-zinc-500 text-xs">
              Looking for your dream home or a property investment opportunity?
              Our expert real eststae agents are here to guide you every step of
              the way!
            </p>
          </div>
          <span className=" text-sm bg-sky-700/5 backdrop-blur-lg px-5 py-1.5 rounded-full border-[1.5px] border-primary text-primary w-max lg:ml-auto my-10 lg:my-0">
            Join Now
          </span>

          <section className="flex flex-col lg:flex-row gap-1 w-full lg:mt-5 bg-zinc-100/70 p-2 rounded-3xl lg:bg-transparent lg:rounded-none lg:p-0">
            <main
              className="p-4 rounded-2xl flex flex-col gap-10
             lg:justify-between bg-white w-full"
            >
              <div className="flex flex-col gap-4 lg:gap-2">
                <span className=" text-xs px-5 py-1 rounded-full border border-primary text-primary w-max">
                  Our Agents
                </span>
                <h3 className="text-sm lg:text-[16px] text-zinc-500">
                  <span className="font-semibold text-primary">Our agents</span>{" "}
                  provide up-to-date insights on market trends and pricing
                </h3>
              </div>

              <div className="flex items-center gap-1">
                {agentsData.slice(0, 6).map((agent, index) => (
                  <span
                    key={agent.id}
                    className={`h-14 w-14 lg:h-20 lg:w-20 rounded-full border-[3px] border-white ${
                      index !== 0 ? "-ml-5" : ""
                    }`}
                  >
                    <img
                      src={agent.image}
                      alt="agent1"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                ))}
              </div>
            </main>
            <main className="p-4 rounded-2xl flex flex-col justify-between bg-white w-full lg:max-w-[300px] gap-4">
              <span className=" text-xs px-5 py-1 rounded-full border border-primary text-primary w-max">
                Contact info
              </span>
              <div className="flex flex-col gap-1 text-xs">
                <span className="font-medium text-primary text-[13px]">
                  Chat to Support
                </span>
                <p>We're here to help</p>
              </div>
              <span className="font-medium text-primary text-[13px] underline">
                support@listingproject.com
              </span>
              <div className="flex flex-col gap-1 text-xs">
                <span className="font-medium text-primary text-[13px]">
                  Follow Us
                </span>
                <p>Follow us on Social Media</p>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <span className="h-6 w-6 rounded-full flex items-center justify-center bg-zinc-100">
                    <FaInstagram />
                  </span>

                  <span className="h-6 w-6 rounded-full flex items-center justify-center bg-zinc-100">
                    <FaXTwitter />
                  </span>

                  <span className="h-6 w-6 rounded-full flex items-center justify-center bg-zinc-100">
                    <FaLinkedinIn />
                  </span>
                </div>
              </div>
            </main>
          </section>
        </section>
      </article>
    </section>
  );
}
