import React, { useEffect, useRef, useState } from "react";
import NoRecord from "../../components/NoRecord";
import { noresult } from "../../assets/images/images";
import { listings } from "../../data/listingData";
import ListingCard from "../../home/components/ListingCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(true);
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
      {wishlist ? (
        <>
          <section className="flex flex-col gap-5 w-full lg:p-14 p-4">
            <span className="text-2xl font-semibold">All Saved Listings</span>
          </section>
          {/* <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:p-14 p-4">
            {listings.slice(0, visible).map((product, index) => (
              <ListingCard key={product.id} {...product} />
            ))}
          </section> */}
        </>
      ) : (
        <section className="flex flex-col items-center justify-center mx-auto gap-2">
          <img
            src={noresult}
            alt="no records found"
            className="w-[150px]"
            loading="lazy"
          />
          <p className="font-medium">You currently have no saved items</p>
        </section>
      )}
    </>
  );
}
