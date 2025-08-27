import React, { useEffect, useState } from "react";
import Listings from "../includes/Listings";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaMagento } from "react-icons/fa";
import { bluebg } from "../../assets/images/images";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaCrown, FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { LuBed, LuToilet } from "react-icons/lu";
import { BiArea, BiCopyright, BiShower } from "react-icons/bi";
import { TbMeterSquare } from "react-icons/tb";
import Charts from "../includes/Charts";
import Enquiries from "../includes/Enquiries";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  const user = useSelector((state) => state.user);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const cacheKey = `RentaHome-listing-cache-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/listing/last-updated`);

        if (cached && cached.lastUpdated === lastUpdated) {
          setListings(cached.data);
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`${API_URL}/listing/fetch`, {
          withCredentials: true,
        });
        setListings(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchAgents = async () => {
      const cached = JSON.parse(
        localStorage.getItem(`RentaHome-agent-cache-${user._id}`)
      );
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/agent/last-updated`, {
          withCredentials: true,
        });
        if (cached && cached.lastUpdated === lastUpdated) {
          setAgents(cached.data);
          return;
        }
        const { data } = await axios.get(`${API_URL}/agent/fetch/order`, {
          withCredentials: true,
        });
        setAgents(data);
        localStorage.setItem(
          `RentaHome-agent-cache-${user._id}`,
          JSON.stringify({ data, lastUpdated })
        );
      } catch (err) {
        toast.error("Failed to fetch agents.");
      }
    };
    fetchAgents();
    fetchListings();
    const hour = new Date().getHours();
    let greet = "";
    if (hour >= 0 && hour < 12) {
      greet = "Good morning";
    } else if (hour >= 12 && hour < 16) {
      greet = "Good afternoon";
    } else {
      greet = "Good evening";
    }
    setGreeting(greet);
  }, []);

  return (
    <>
      {" "}
      <article className="flex flex-col lg:flex-row items-start gap-3">
        <article className="flex flex-col gap-3 w-full">
          <Listings loading={loading} listings={listings} />
          <Charts agents={agents} />
          <Enquiries listings={listings} agents={agents} />
        </article>
        <section className="w-full max-w-[320px] shrink-0 flex flex-col gap-5 ">
          <div className="flex flex-col gap-5 rounded-3xl p-6 relative">
            <span className="h-9 w-9 rounded-xl text-[16px] bg-blue-600 text-white flex items-center justify-center relative z-10">
              <FaCrown />
            </span>
            <span className="text-sm font-semibold leading-tight text-white relative z-10">
              Subscribe to unlock more powerful and streamlined features
            </span>
            <span className="text-xs bg-blue-600 text-white px-6 rounded-full py-2 w-max relative z-10">
              Subscribe Now!
            </span>
            <img
              src={bluebg}
              className="h-full absolute top-0 left-0 w-full rounded-3xl object-cover opacity-90 z-0"
              alt="blue background"
            />
          </div>

          <article className="flex flex-col gap-1 divide-zinc-100 bg-white rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Latest Properties</span>
              <Link
                to={"/admin/listings"}
                className="text-xs bg-blue-600 text-white px-3 rounded-full py-1.5 w-max flex items-center gap-0.5"
              >
                <IoEyeOutline /> View all
              </Link>
            </div>

            <article className="flex flex-col divide-y divide-zinc-200">
              {listings?.slice(0, 3).map((listing, index) => (
                <Link
                  to={`/listing/${listing._id}`}
                  key={listing._id}
                  className="flex flex-col gap-3 py-5"
                >
                  <article className="h-[130px] rounded-2xl">
                    <img
                      src={listing.images[0].url}
                      className="h-full w-full rounded-2xl object-cover"
                      alt={listing.title}
                    />
                  </article>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600">
                      &#8358;{listing.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-medium bg-zinc-100 px-2 py-0.5 rounded-full">
                      <span className="h-1 w-1 rounded-full bg-blue-600"></span>
                      {listing.purpose}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[13px]">
                      {listing.title}
                    </span>
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <FaMapLocationDot />
                      {`${listing.location.area}, ${listing.location.state}`}
                    </p>
                  </div>
                  <article className="flex items-center gap-1 text-[11px] justify-between">
                    <span className="flex items-center gap-1">
                      <LuBed className="text-zinc-400" />
                      {listing.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <BiShower className="text-zinc-400" />
                      {listing.bathrooms} Bathrooms
                    </span>
                    <span className="flex items-center gap-1">
                      <LuToilet className="text-zinc-400" />
                      {listing.toilets} Toilets
                    </span>
                    <span className="flex items-center gap-1">
                      <BiArea className="text-zinc-400" />
                      {listing.areaSize}
                      <TbMeterSquare className="-ml-1" />
                    </span>
                  </article>
                </Link>
              ))}
            </article>
          </article>

          <div className="flex flex-col gap-5 rounded-3xl p-3 relative border items-center">
            <span className="h-14 w-14 rounded-2xl text-3xl bg-blue-600 text-white flex items-center justify-center relative z-10">
              <FaMagento />
            </span>
            <span className="text-xs font-medium leading-tight text-white relative z-10 flex items-center gap-1">
              <BiCopyright />
              {new Date().getFullYear()} Househunter. All rights reserved
            </span>

            <img
              src={bluebg}
              className="h-full absolute top-0 left-0 w-full rounded-3xl object-cover opacity-90 z-0"
              alt="blue background"
            />
          </div>
        </section>
      </article>
    </>
  );
}
