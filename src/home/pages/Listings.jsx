import React, { useEffect, useRef, useState } from "react";
import { CiShop } from "react-icons/ci";
import { listings } from "../../data/listingData";
import ListingCard from "../components/ListingCard";

export default function Listings() {
  const [visible, setVisible] = useState(6);
  const itemsPerPage = 6;
  const loaderRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [toggleProjects, setToggleProjects] = useState("Buy");
  const categories = [
    { name: "Buy", filter: "Buy" },
    { name: "Sell", filter: "Sell" },
    { name: "Rent", filter: "Rent" },
  ];

  const filteredProjects =
    toggleProjects === "Buy"
      ? projects
      : projects.filter((p) => p.type === toggleProjects);
  useEffect(() => {
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
  }, []);
  return (
    <>
      {" "}
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
        

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {listings.slice(0, visible).map((product, index) => (
            <ListingCard key={product.id} {...product} />
          ))}
        </section>

        {visible < listings.length && (
          <div ref={loaderRef} className="text-center py-4 text-gray-500">
            Loading more...
          </div>
        )}
      </section>
    </>
  );
}
