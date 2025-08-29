import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { listings } from "../../data/listingData";
import {
  MdOutlineLocationCity,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";

import {
  IoChevronDown,
  IoGridOutline,
  IoListOutline,
  IoMapOutline,
} from "react-icons/io5";
import ListingCard from "../components/ListingCard";
import Newsletter from "../includes/Newsletter";
import NoRecord from "../../components/NoRecord";
import { agentsData } from "../../data/agentData";
import {
  FaFacebook,
  FaInstagram,
  FaRegStar,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import OurAgents from "../includes/OurAgents";

export default function AgentDetails() {
  const params = useParams();
  const [agentDetails, setAgentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const agentDetail = agentsData.find((el) => el.id === params.id.toString());
    if (agentDetail) setAgentDetails((prev) => ({ ...agentDetail }));
    setLoading(false);
  }, [params.id]);

  return (
    <>
      <section className=" p-8 pt-28 lg:px-28 flex flex-col items-center gap-10">
        {agentDetails ? (
          <>
            <section className="flex flex-col items-center gap-2 w-full">
              <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
                <MdOutlineRealEstateAgent />
                <p className=" uppercase" data-aos="flip-up">
                  Single agent
                </p>
              </span>
              <h1
                className="text-3xl lg:text-5xl font-normal text-center max-w-[800px] w-full mx-auto capitalize"
                data-aos="fade-left"
              >
                {agentDetails?.name}
              </h1>
            </section>

            <section className="flex gap-6 flex-col lg:flex-row w-full">
              <main className=" rounded-2xl w-full h-[300px] lg:h-[400px] max-w-[400px] overflow-hidden">
                <img
                  src={agentDetails?.image}
                  className="h-full w-full object-cover object-center rounded-2xl"
                  loading="lazy"
                  alt={agentDetails?.name}
                />
              </main>
              <section className="border border-zinc-200 rounded-2xl w-full p-4 lg:p-6 flex flex-col gap-6">
                <main className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">
                    {agentDetails?.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < 4 ? <FaStar /> : <FaRegStar />}</span>
                    ))}
                  </div>
                </main>
                <main className="text-sm font-medium text-left text-primary max-w-[500px]">
                  {agentDetails?.membership}
                </main>

                <main className="text-sm font-normal text-zinc-500 max-w-[500px]">
                  {agentDetails?.description}
                </main>

                <main className="flex lg:items-center flex-col lg:flex-row gap-4 justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Email Address</span>
                    <p className="text-sm lg:text-[16px] font-medium text-zinc-500">
                      {agentDetails?.email}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Phone Number</span>
                    <p className="text-sm lg:text-[16px] font-medium text-zinc-500">
                      {agentDetails?.phoneNumber}
                    </p>
                  </div>
                </main>

                <main className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">Socials</span>
                  <div className="flex items-center gap-2 text-2xl">
                    <a
                      href={`${agentDetails?.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href={`${agentDetails?.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={`${agentDetails?.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href={`${agentDetails?.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaXTwitter />
                    </a>
                  </div>
                </main>
              </section>
            </section>
          </>
        ) : (
          <section className="px-4 py-5">
            <h3 className="text-slate-800 text-xl md:text-2xl text-center py-5">
              {loading ? "Fetching category listings..." : <NoRecord />}
            </h3>
          </section>
        )}
      </section>
      <OurAgents />
    </>
  );
}
