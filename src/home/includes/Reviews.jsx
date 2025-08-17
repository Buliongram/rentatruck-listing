import React from "react";
import {
  FaArrowRight,
  FaArrowUpRightDots,
  FaRegStar,
  FaStar,
} from "react-icons/fa6";
import { reviews } from "../../data/reviews";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { listing10 } from "../../assets/images/listing/listingImages";
import { banner, banner1 } from "../../assets/images/images";
import { Link } from "react-router-dom";

export default function Reviews() {
  return (
    <section className=" p-8 py-12 lg:p-28 lg:py-14 flex flex-col items-center gap-10">
      <section className="flex flex-col lg:flex-row justify-between w-full items-center gap-6">
        <section className="flex flex-col items-center lg:items-start gap-2 max-w-[600px]">
          <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
            <FaStar />
            <p className=" uppercase" data-aos="flip-up">
              Review
            </p>
          </span>
          <h2 className="font-normal text-3xl lg:text-5xl text-center lg:text-start" data-aos="flip-left">
            What our clients say about us
          </h2>
        </section>
        <section className="flex items-center gap-2">
          <Link className="flex items-center">
            {reviews.slice(0, 5).map((review, index) => (
              <span
                key={review.id}
                className={`h-10 w-10 rounded-full overflow-hidden border-2 border-white ${
                  index !== 0 ? "-ml-3" : ""
                }`}
              >
                <img
                  src={banner1}
                  alt="banner"
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
            ))}
            <span className="h-10 w-10 rounded-full overflow-hidden bg-primary text-white flex items-center justify-center -ml-3 border-2 border-white">
              <FaArrowUpRightDots />
            </span>
          </Link>

          <span className="font-medium text-sm lg:text-[16px] leading-tight">
            More than <span className="text-primary font-medium">500+</span>
            <br />
            Client Reviews
          </span>
        </section>
      </section>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {reviews.slice(0, 6).map((review, index) => (
          <div
            key={index}
            className="break-inside-avoid rounded-4xl border border-zinc-200/70 p-6 flex flex-col gap-4 bg-white"
          >
            <div className="flex items-center gap-2">
              <span className="h-12 w-12  shrink-0 rounded-full bg-zinc-100 relative">
                <RiPoliceBadgeFill className="text-zinc-950 absolute text-sm bottom-0 right-0" />
                <img
                  src={listing10}
                  alt={review.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
              <section className="flex w-full justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold capitalize">
                    {review.name}
                  </span>
                  <p className="text-xs text-primary font-medium">
                    {review.title}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < review.rating ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
              </section>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 font-normal">
              {review.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
