import React, { useEffect, useState } from "react";
import {
  listingCategories,
  nigerianLocations,
} from "../../data/createListingData";
import { FaCamera, FaEye, FaLocationDot, FaXmark } from "react-icons/fa6";
import { banner, noresult } from "../../assets/images/images";
import axios from "axios";
import { useSelector } from "react-redux";
import GreenSpinner from "../components/GreenSpinner";
import { FaEllipsisV, FaShareAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ShareButton from "../components/ShareButton";
import toast from "react-hot-toast";
import NoRecord from "../../components/NoRecord";
import Loader from "../../components/Loader";

export default function AdminListings() {
  const user = useSelector((state) => state.user);
  const cacheKey = `RentaHome-listing-cache-${user._id}`;
  const [loading, setLoading] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [listingType, setListingType] = useState("all");
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    titleOrId: "",
    purpose: "",
    category: "",
    priceMin: "",
    priceMax: "",
    state: "",
  });
  const [showActions, setShowActions] = useState(null);

  useEffect(() => {
    const fetchAllListings = async () => {
      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api/listing`
          : `https://rentahome-server.onrender.com/api/listing`;

      setLoading(true);

      const cached = JSON.parse(localStorage.getItem(cacheKey));
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${url}/last-updated`);

        if (cached && cached.lastUpdated === lastUpdated) {
          setAllListings(cached.data);
          setFilteredListings(cached.data);
          return;
        }
        const { data } = await axios.get(`${url}/fetch`, {
          withCredentials: true,
        });
        setAllListings(data);
        setFilteredListings(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllListings();
  }, []);

  useEffect(() => {
    let tempListings = [...allListings];

    if (listingType !== "all") {
      tempListings = tempListings.filter(
        (listing) => listing.status.toLowerCase() === listingType
      );
    }

    const { titleOrId, purpose, category, priceMin, priceMax, state } = filters;

    if (titleOrId) {
      tempListings = tempListings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(titleOrId.toLowerCase()) ||
          listing._id.includes(titleOrId)
      );
    }

    if (purpose) {
      tempListings = tempListings.filter(
        (listing) => listing.purpose === purpose
      );
    }

    if (category) {
      tempListings = tempListings.filter(
        (listing) => listing.category === category
      );
    }

    if (priceMin || priceMax) {
      tempListings = tempListings.filter((listing) => {
        const min = parseInt(priceMin) || 0;
        const max = parseInt(priceMax) || Infinity;
        return listing.price >= min && listing.price <= max;
      });
    }

    if (state) {
      // Corrected logic to match full capitalized state names
      tempListings = tempListings.filter(
        (listing) =>
          listing.location.state &&
          listing.location.state.toLowerCase() === state.toLowerCase()
      );
    }

    setFilteredListings(tempListings);
  }, [listingType, filters, allListings]);

  const categories = [
    { name: "All" },
    { name: "Pending" },
    { name: "Archived" },
    { name: "Active" },
    { name: "Rented" },
    { name: "Sold" },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleStatusChange = async (listingId, newStatus) => {
    const url =
      window.location.hostname === "localhost"
        ? `http://localhost:5000/api/listing/${listingId}/status`
        : `https://rentahome-server.onrender.com/api/listing/${listingId}/status`;

    try {
      setLoading(true);
      await axios.put(url, { status: newStatus }, { withCredentials: true });

      setAllListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === listingId
            ? { ...listing, status: newStatus }
            : listing
        )
      );
      setShowActions(null); // Close actions menu
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (listingId) => {
    setListingToDelete(listingId);
    setToggleDelete(true);
    setShowActions(null);
  };

  const handleDeleteListing = async () => {
    if (!listingToDelete) return;

    const url =
      window.location.hostname === "localhost"
        ? `http://localhost:5000/api/listing/delete`
        : `https://rentahome-server.onrender.com/api/listing/delete`;

    try {
      toast.loading("Processing your request. Please wait", { id: "123" });
      setLoading(true);
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
        setFilteredListings(fetchdListings);
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
      setLoading(false);
      setToggleDelete(false);
    }
  };

  const handleEditListing = (listingId) => {
    console.log(`Navigating to edit page for listing ID: ${listingId}`);
    // Use React Router to navigate: `Maps(`/admin/edit/${listingId}`);`
    setShowActions(null); // Close actions menu
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const stateNames = Object.keys(nigerianLocations);
  if (loading) {
    return <Loader />;
  }
  if (!allListings || allListings.length < 1) {
    return <NoRecord />;
  }
  return (
    <>
      <section className="flex flex-col gap-5 w-full  p-6 bg-white rounded-3xl">
        <span className="text-2xl font-semibold">All Listings</span>
        <article className="flex flex-col gap-3 w-full">
          {user.role !== "Admin" ? (
            ""
          ) : (
            <section className="flex items-center justify-between">
              <main className="flex items-center p-1 rounded-2xl w-max text-xs border-[1.5px] border-zinc-950">
                {categories.map((item) => (
                  <span
                    key={item.name}
                    onClick={() => setListingType(item.name.toLowerCase())}
                    className={`rounded-xl px-6 py-1.5 cursor-pointer transition duration-200 ${
                      listingType === item.name.toLowerCase()
                        ? "bg-emerald-950 text-white"
                        : "hover:bg-white"
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </main>
              <span className="bg-emerald-950 text-white px-7 text-xs font-medium py-2 rounded-xl">
                {loading ? (
                  <GreenSpinner />
                ) : (
                  <>{filteredListings.length} Items found</>
                )}
              </span>
            </section>
          )}
          <main className="flex items-center justify-between gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
            <div className="flex flex-col w-full gap-1">
              <span className="text-xs font-semibold">Title</span>
              <input
                type="text"
                name="titleOrId"
                className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                placeholder="Search by title or listing ID"
                onChange={handleFilterChange}
                value={filters.titleOrId}
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <span className="text-xs font-semibold">Purpose</span>
              <select
                className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="purpose"
                onChange={handleFilterChange}
                value={filters.purpose}
              >
                <option value="">Select a purpose</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Short Let">Short Let</option>
              </select>
            </div>
            <div className="flex flex-col w-full gap-1">
              <span className="text-xs font-semibold">Category</span>
              <select
                className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="category"
                onChange={handleFilterChange}
                value={filters.category}
              >
                <option value="">Select a category</option>
                {Object.keys(listingCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Price Range Slider */}
            <div className="flex flex-col w-full gap-1">
              <span className="text-xs font-semibold">Price Range</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="priceMin"
                  className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 outline-zinc-200"
                  placeholder="Min"
                  onChange={handlePriceChange}
                  value={filters.priceMin}
                />
                <span className="text-xs text-zinc-500">-</span>
                <input
                  type="number"
                  name="priceMax"
                  className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 outline-zinc-200"
                  placeholder="Max"
                  onChange={handlePriceChange}
                  value={filters.priceMax}
                />
              </div>
            </div>
            {/* State Filter */}
            <div className="flex flex-col w-full gap-1">
              <span className="text-xs font-semibold">State</span>
              <select
                className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="state"
                onChange={handleFilterChange}
                value={filters.state}
              >
                <option value="">Select a state</option>
                {stateNames.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </main>
        </article>
        <>
          <article className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {filteredListings.map((house) => (
              <main key={house._id}>
                <main className="h-[250px] rounded-3xl relative">
                  {house.images?.length ? (
                    <img
                      src={house?.images[0].url}
                      loading="lazy"
                      className="h-full w-full rounded-2xl object-cover"
                      alt={house?.title}
                    />
                  ) : (
                    ""
                  )}

                  {/* Actions Dropdown */}
                  {showActions === house._id && (
                    <div className="top-4 absolute z-[2] left-4 p-3 w-max rounded-3xl shadow-lg bg-white flex flex-col gap-1">
                      <span
                        onClick={() => handleEditListing(house._id)}
                        className="bg-emerald-950 text-[11px] flex items-center justify-center gap-1 text-white rounded-xl px-6 py-2 cursor-pointer"
                      >
                        Edit
                      </span>
                      <span
                        className="bg-emerald-950 text-[11px] flex items-center justify-center gap-1 text-white rounded-xl px-6 py-2 cursor-pointer"
                        onClick={() =>
                          handleStatusChange(house._id, "archived")
                        }
                      >
                        Archive
                      </span>
                      <a
                        className="bg-emerald-950 text-[11px] flex items-center justify-center gap-1 text-white rounded-xl px-6 py-2 cursor-pointer"
                        onClick={() => handleStatusChange(house._id, "active")}
                      >
                        Make Active
                      </a>
                      {house.purpose === "For Sale" && (
                        <a
                          className="bg-emerald-950 text-[11px] flex items-center justify-center gap-1 text-white rounded-xl px-6 py-2 cursor-pointer"
                          onClick={() => handleStatusChange(house._id, "sold")}
                        >
                          Mark as Sold
                        </a>
                      )}
                      {(house.purpose === "For Rent" ||
                        house.purpose === "Short Let") && (
                        <a
                          className="bg-emerald-950 text-[11px] flex items-center justify-center gap-1 text-white rounded-xl px-6 py-2 cursor-pointer"
                          onClick={() =>
                            handleStatusChange(house._id, "rented")
                          }
                        >
                          Mark as Rented
                        </a>
                      )}
                      <span
                        className="bg-emerald-950 text-[11px] flex items-center justify-center gap-1 text-white rounded-xl px-6 py-2 cursor-pointer"
                        onClick={() => confirmDelete(house._id)}
                      >
                        Delete
                      </span>
                    </div>
                  )}

                  <div className="absolute top-4 left-4 bg-white rounded-lg text-xs font-medium px-3 py-1">
                    {house?.category || "House"}
                  </div>
                  {user.role !== "Admin" ? (
                    ""
                  ) : (
                    <span
                      onClick={() =>
                        setShowActions(
                          showActions === house._id ? null : house._id
                        )
                      }
                      className="p-2 bg-white rounded-lg cursor-pointer absolute top-4 right-4"
                    >
                      <FaEllipsisV className="text-[10px]" />
                    </span>
                  )}

                  <main className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[90%] p-3 bg-white rounded-2xl flex flex-col divide-y divide-zinc-300">
                    <article className="flex flex-col pb-2 w-full">
                      <section className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold font-primary">
                          {house?.title}
                        </h3>
                        <ShareButton
                          listingTitle={house?.title}
                          listingUrl={`https://your-domain.com/listing/single/${house?._id}`}
                        />
                      </section>
                      <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <FaLocationDot className="text-emerald-950" />
                        {house?.location.area + ", " + house?.location.state}
                      </p>
                    </article>
                    <article className="flex items-center justify-between pt-2">
                      <h3 className="text-xs font-semibold font-primary">
                        &#8358;{house?.price.toLocaleString()}
                      </h3>
                      <Link
                        to={`/listing/${house?._id}`}
                        className="p-2 bg-emerald-950 text-white rounded-lg cursor-pointer"
                      >
                        <FaEye className="text-[10px]" />
                      </Link>
                    </article>
                  </main>
                </main>
              </main>
            ))}
          </article>
          {/* Delete Confirmation Modal */}
          {toggleDelete && (
            <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50">
              <section
                className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[450px] w-full fixed md:relative bottom-0 `}
              >
                <h2 className="font-medium text-[16px]">Are you sure?</h2>
                <p className="text-[13px] text-zinc-600 font-normal text-center">
                  Deleting this listing is permanent and irreversible. You will
                  lose all your records.
                </p>

                <div className="flex items-center w-full gap-4">
                  <span
                    onClick={() => setToggleDelete(false)}
                    className="flex text-xs items-center justify-center gap-2 border border-zinc-300 text-zinc-950 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
                  >
                    Cancel
                  </span>
                  <button
                    onClick={handleDeleteListing}
                    className="flex text-xs items-center justify-center shrink gap-2 text-white bg-[#f30000] font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
                  >
                    Yes, delete this listing
                  </button>
                </div>

                <div
                  onClick={() => setToggleDelete(false)}
                  className="h-7 w-7 flex items-center justify-center text-sm bg-[#f2f2f2] absolute top-4 right-4 rounded-full cursor-pointer"
                >
                  <FaXmark />
                </div>
              </section>
            </section>
          )}
        </>
      </section>
    </>
  );
}
