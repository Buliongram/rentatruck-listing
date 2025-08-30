import React, { useEffect, useRef, useState } from "react";
import { CiShop } from "react-icons/ci";
import PropertyCard from "../components/PropertyCard";
import { useSelector } from "react-redux";
import axios from "axios";
import GreenSpinner from "../../admin/components/GreenSpinner";
import { noresult } from "../../assets/images/images";
import {
  listingCategories,
  nigerianLocations,
} from "../../data/createListingData";
import NoRecord from "../../components/NoRecord";
import Loader from "../../components/Loader";

export default function Listings() {
  const user = useSelector((state) => state.user);
  const cacheKey = `househunter-listing-cache`;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(6);
  const itemsPerPage = 6;
  const loaderRef = useRef(null);
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [listingType, setListingType] = useState("all");
  const [filters, setFilters] = useState({
    titleOrId: "",
    purpose: "",
    category: "",
    priceMin: "",
    priceMax: "",
    state: "",
  });

  const categories = [
    { name: "All" },
    { name: "For Sale" },
    { name: "For Rent" },
    { name: "Shortlet" },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const stateNames = Object.keys(nigerianLocations);

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
      tempListings = tempListings.filter(
        (listing) =>
          listing.location.state &&
          listing.location.state.toLowerCase() === state.toLowerCase()
      );
    }

    setFilteredListings(tempListings);
    setVisible(itemsPerPage);
  }, [listingType, filters, allListings]);

  useEffect(() => {
    const fetchAllListings = async () => {
      const API_URL =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api`
          : `https://rentahome-server.onrender.com/api`;

      setLoading(true);

      const cached = JSON.parse(localStorage.getItem(cacheKey));
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/listing/updatedAt`);

        if (cached && cached.lastUpdated === lastUpdated) {
          setAllListings(cached.data);
          setFilteredListings(cached.data);
          return;
        }
        const { data } = await axios.get(`${API_URL}/listing/fetch`, {
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

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setVisible((prev) => prev + itemsPerPage);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [cacheKey]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="p-8 py-28 lg:p-28 flex flex-col items-center gap-10">
        <section className="flex flex-col items-center gap-2 w-full">
          <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
            <CiShop />
            <p className="uppercase" data-aos="flip-up">
              Listings
            </p>
          </span>
          <h1
            className="text-3xl lg:text-5xl font-normal text-center max-w-[800px] w-full mx-auto"
            data-aos="fade-left"
          >
            Find Your Perfect Home
          </h1>
          <p className="text-sm font-normal text-center text-zinc-500 max-w-[700px]">
            Browse through our curated listings of homes, apartments, and
            commercial properties. Whether you’re looking to buy, rent, or
            invest, discover detailed property information, stunning photos, and
            the latest market updates—all in one place.
          </p>
        </section>

        {!allListings || allListings.length < 1 ? (
          <NoRecord margin={10} text={"No property currently listed"} />
        ) : (
          <>
            <section className="flex flex-col items-center justify-between w-full lg:flex-row gap-4 lg:gap-0">
              <main className="flex items-center gap-2 flex-wrap justify-center">
                <div className="flex items-center p-1 rounded-2xl w-max text-xs border-[1.5px] border-zinc-950">
                  <span
                    onClick={() => setFilters({ ...filters, purpose: "" })}
                    className={`rounded-xl px-6 py-1.5 cursor-pointer transition duration-200 ${
                      !filters.purpose
                        ? "bg-primary text-white"
                        : "hover:bg-white"
                    }`}
                  >
                    All
                  </span>
                  <span
                    onClick={() =>
                      setFilters({ ...filters, purpose: "For Sale" })
                    }
                    className={`rounded-xl px-6 py-1.5 cursor-pointer transition duration-200 ${
                      filters.purpose === "For Sale"
                        ? "bg-primary text-white"
                        : "hover:bg-white"
                    }`}
                  >
                    For Sale
                  </span>
                  <span
                    onClick={() =>
                      setFilters({ ...filters, purpose: "For Rent" })
                    }
                    className={`rounded-xl px-6 py-1.5 cursor-pointer transition duration-200 ${
                      filters.purpose === "For Rent"
                        ? "bg-primary text-white"
                        : "hover:bg-white"
                    }`}
                  >
                    For Rent
                  </span>
                  <span
                    onClick={() =>
                      setFilters({ ...filters, purpose: "Short Let" })
                    }
                    className={`rounded-xl px-6 py-1.5 cursor-pointer transition duration-200 ${
                      filters.purpose === "Short Let"
                        ? "bg-primary text-white"
                        : "hover:bg-white"
                    }`}
                  >
                    Short Let
                  </span>
                </div>
              </main>
              <span className="bg-primary text-white px-7 text-xs font-medium py-2 rounded-xl mt-4 lg:mt-0">
                {loading ? (
                  <GreenSpinner />
                ) : (
                  <>{filteredListings.length} Items found</>
                )}
              </span>
            </section>

            <main className="flex flex-col lg:flex-row items-center justify-between gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
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

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {filteredListings.slice(0, visible).map((product, index) => (
                <PropertyCard key={product.id} {...product} />
              ))}
            </section>

            {visible < filteredListings.length && (
              <div ref={loaderRef} className="text-center py-4 text-gray-500">
                Loading more...
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
