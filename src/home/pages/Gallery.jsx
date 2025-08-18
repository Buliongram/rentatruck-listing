import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircleSharp, IoImage } from "react-icons/io5";
import { listings } from "../../data/listingData";
import Reviews from "../includes/Reviews";
import Newsletter from "../includes/Newsletter";
import Slider from "react-slick";

export default function Gallery() {
  const [visible, setVisible] = useState(6);
  const itemsPerPage = 6;
  const loaderRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeListing, setActiveListing] = useState(null);

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

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="p-8 py-28 lg:p-28 pb-0 lg:pb-0 flex flex-col items-center gap-10">
        <section className="flex flex-col items-center gap-2 w-full">
          <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
            <IoImage />
            <p className="uppercase" data-aos="flip-up">
              Gallery
            </p>
          </span>
          <h1
            className="text-3xl lg:text-5xl font-normal text-center max-w-[800px] w-full mx-auto"
            data-aos="fade-left"
          >
            Explore Stunning Spaces We Represent
          </h1>
          <p className="text-sm font-normal text-center text-zinc-500 max-w-[700px]">
            More than just walls and rooftops, our gallery showcases lifestyles,
            communities, and opportunities. Browse through interiors, exteriors,
            and neighborhoods that define elegance and convenience—crafted to
            give you a true sense of what it feels like to call these places
            home.
          </p>
        </section>

        {/* Gallery Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {listings.slice(0, visible).map((listing, index) => (
            <div
              key={listing.id}
              onClick={() => {
                setActiveListing(listing);
                setIsOpen(true);
              }}
              className={`${
                index == 0 || index == 6
                  ? "sm:col-span-2 sm:row-span-2 max-[640px]:h-[300px]"
                  : "max-[640px]:h-[300px] h-[200px]"
              } group   cursor-pointer group relative overflow-hidden rounded-2xl`}
            >
              <img
                src={listing.image[0]}
                alt={listing.title}
                className="h-full w-full object-cover rounded-2xl group-hover:scale-[1.2] transition-transform duration-500"
                loading="lazy"
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

      {/* Modal Lightbox with Slider */}
      {isOpen && activeListing && (
        <section className="fixed inset-0 bg-black/80  w-full flex items-center justify-center z-50">
          <main className="relative w-[90%] lg:w-full lg:max-w-4xl mx-auto p-4">
            <IoCloseCircleSharp
              className="absolute top-2 right-2 text-white text-4xl z-50 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            <Slider {...sliderSettings}>
              {activeListing.image.map((img, idx) => (
                <div
                  key={idx}
                  className="flex justify-center lg:h-[400px] rounded-2xl overflow-hidden h-[400px]"
                >
                  <img
                    src={img}
                    alt={`${activeListing.title}-${idx}`}
                    className="h-[400px] lg:h-full object-cover mx-auto w-full lg:max-w-[600px] rounded-2xl"
                  />
                </div>
              ))}
            </Slider>
          </main>
        </section>
      )}

      <Reviews />
      <Newsletter />
    </>
  );
}
