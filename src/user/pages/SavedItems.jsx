import React, { useEffect, useState } from "react";
import {
  listingCategories,
  nigerianLocations,
} from "../../data/createListingData";
import {
  FaCamera,
  FaCircleExclamation,
  FaEye,
  FaLocationDot,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";

import axios from "axios";
import { LuBadgeCheck } from "react-icons/lu";
import { useSelector } from "react-redux";

import {
  FaArchive,
  FaEllipsisV,
  FaRegFileArchive,
  FaShareAlt,
} from "react-icons/fa";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NoRecord from "../../components/NoRecord";
import Loader from "../../components/Loader";
import GreenSpinner from "../../admin/components/GreenSpinner";
import ShareButton from "../../admin/components/ShareButton";
import { BiTrash } from "react-icons/bi";

export default function SavedItems() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState({ type: "", status: false });
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleConfirmation, setToggleConfirmation] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    const fetchAllListings = async () => {
      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api`
          : `https://rentahome-server.onrender.com/api`;

      setLoading(true);
      const cacheKey = `househunter-listing-cache-admin-dashboard-${user._id}`;

      const cached = JSON.parse(localStorage.getItem(cacheKey));
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${url}/timestamp/listing/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setAllListings(cached.data);
          return;
        }
        const { data } = await axios.get(`${url}/listing/fetch/dashboard`, {
          withCredentials: true,
        });
        setAllListings(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllListings();
  }, []);

  const handleDeleteListing = async () => {
    if (!listingToDelete) return;

    const url =
      window.location.hostname === "localhost"
        ? `http://localhost:5000/api/listing/delete`
        : `https://rentahome-server.onrender.com/api/listing/delete`;

    try {
      toast.loading("Deleting listing... Please wait.", { id: "123" });
      setSpinning({ type: "delete", status: true });
      const res = await axios.post(
        url,
        { listingId: listingToDelete },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "123" });
      } else {
        setAllListings((prevListings) =>
          prevListings.filter((listing) => listing._id !== listingToDelete)
        );
        toast.success("Listing deleted successfully", { id: "123" });
        setToggleDelete(false);
        setListingToDelete(null);
        const fetchdListings = data.listings;
        const lastUpdated = data.lastUpdated;
        setAllListings(fetchdListings);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ fetchdListings, lastUpdated })
        );
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Unable to delete listing. Please try again",
          {
            id: "123",
          }
        );
      } else {
        toast.error("An unknown error occured. Please try again.", {
          id: "123",
        });
        console.log(error);
      }
    } finally {
      setSpinning({ type: "delete", status: false });
      setToggleDelete(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (!allListings || allListings.length < 1) {
    return <NoRecord />;
  }
  return (
    <>
      <section className="flex flex-col gap-5 w-full  p-6 bg-white rounded-3xl">
        <span className="text-2xl font-semibold">Saved Items</span>

        <>
          <article
            className={`grid grid-cols-1 lg:grid-cols-${
              user.role === "User" ? 3 : 4
            } gap-4`}
          >
            {allListings.map((house) => (
              <main key={house._id} className="h-[250px] rounded-3xl relative">
                {house.images?.length ? (
                  <Link
                    to={`/listing/${house._id}`}
                    className=" h-full w-full absolute "
                  >
                    <img
                      src={house?.images[0].url}
                      loading="lazy"
                      className="h-full w-full rounded-2xl object-cover"
                      alt={house?.title}
                    />
                  </Link>
                ) : (
                  ""
                )}

                <div className="absolute top-4 left-4 text-white rounded-lg text-[10px] bg-orange-500  font-semibold px-3 py-1">
                  {house?.category || "House"}
                </div>
                <span
                  onClick={() => {
                    setToggleConfirmation(true);
                    setSelectedListing({
                      id: house._id,
                    });
                  }}
                  className="p-2 text-white bg-zinc-950 rounded-lg cursor-pointer absolute top-4 right-4"
                >
                  <BiTrash className="text-xs" />
                </span>

                <main className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[90%] p-3 bg-white rounded-2xl flex flex-col divide-y divide-zinc-300">
                  <article className="flex flex-col pb-2 w-full">
                    <section className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold font-primary">
                        {house?.title}
                      </h3>
                      <ShareButton
                        color={"zinc-950"}
                        listingTitle={house?.title}
                        listingUrl={`https://your-domain.com/listing/single/${house?._id}`}
                      />
                    </section>
                    <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                      <FaLocationDot className="text-zinc-950" />
                      {house?.location.area + ", " + house?.location.state}
                    </p>
                  </article>
                  <article className="flex items-center justify-between pt-2">
                    <h3 className="text-xs font-semibold font-primary">
                      &#8358;{house?.price.toLocaleString()}
                    </h3>
                    {user.role === "User" ? (
                      ""
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-lg capitalize text-[11px] text-white ${
                          {
                            active: "bg-green-500",
                            archived: "bg-gray-500",
                            sold: "bg-red-500",
                            rented: "bg-blue-500",
                            pending: "bg-amber-400",
                          }[house.status] || "bg-gray-300"
                        }`}
                      >
                        {house.status}
                      </span>
                    )}
                  </article>
                </main>
              </main>
            ))}
          </article>

          {toggleConfirmation && (
            <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50">
              <section
                className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[450px] w-full fixed md:relative bottom-0 `}
              >
                <FaCircleExclamation className="text-[#fe0000] text-7xl" />

                <div className="flex flex-col gap-1 items-center">
                  <h2 className="font-semibold text-xl">Are you sure?</h2>

                  <p className="text-sm font-medium text-center">
                    This listing will be removed from your saved items. Do you
                    want to proceed?
                  </p>
                </div>

                <div className="flex items-center w-full gap-4">
                  <span
                    onClick={() => setToggleConfirmation(false)}
                    className="flex text-xs items-center justify-center gap-2 border border-zinc-300 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
                  >
                    Cancel
                  </span>
                  <button
                    onClick={() =>
                      handleStatusChange(
                        selectedListing.id,
                        selectedListing.status
                      )
                    }
                    className="flex text-xs items-center justify-center shrink gap-2 text-white bg-zinc-950 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
                  >
                    {spinning.type === selectedListing.status &&
                    spinning.status ? (
                      <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block"></span>
                    ) : (
                      "Yes, I understand"
                    )}
                  </button>
                </div>
              </section>
            </section>
          )}
        </>
      </section>
    </>
  );
}
