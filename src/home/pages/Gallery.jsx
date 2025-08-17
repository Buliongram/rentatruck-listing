import React, { useEffect, useRef, useState } from "react";
import { IoImage } from "react-icons/io5";
import { listings } from "../../data/listingData";
import Reviews from "../includes/Reviews";
import Newsletter from "../includes/Newsletter";

export default function Gallery() {
  const [visible, setVisible] = useState(6);
  const itemsPerPage = 6;
  const loaderRef = useRef(null);
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
      <section className=" p-8 py-28 lg:p-28 pb-0 lg:pb-0 flex flex-col items-center gap-10">
        <section className="flex flex-col items-center gap-2 w-full">
          <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
            <IoImage />
            <p className=" uppercase" data-aos="flip-up">
              Gallery
            </p>
          </span>
          <h1
            className="text-3xl lg:text-5xl font-normal text-center max-w-[800px] w-full mx-auto"
            data-aos="fade-left"
          >
            A Glance at Our Gallery
          </h1>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {listings.slice(0, visible).map((listing, index) => (
            <div
              key={listing.id}
              className="h-[400px] overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={listing.image[0]}
                alt={listing.title}
                className="h-full w-full object-cover group-hover:scale-[1.3]"
              />
            </div>
          ))}
        </section>

        {visible < listings.length && (
          <div ref={loaderRef} className="text-center py-4 text-gray-500">
            Loading more...
          </div>
        )}
      </section>
      <Reviews />
      <Newsletter />
    </>
  );
}
