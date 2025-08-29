import React, { useEffect, useRef, useState } from "react";
import { reviews } from "../../data/reviews";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { FaRegStar, FaStar } from "react-icons/fa";
import { listing10 } from "../../assets/images/listing/listingImages";
import {
  IoChevronDown,
  IoGridOutline,
  IoListOutline,
  IoMapOutline,
} from "react-icons/io5";
import { noresult } from "../../assets/images/images";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Reviews() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
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
  useEffect(() => {
    if (!user?._id) return;

    const fetchReviews = async () => {
      const API_URL =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api`
          : `https://rentahome-server.onrender.com/api`;

      setLoading(true);
      const cacheKey = `RentaHome-reviews-cache-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/review/updatedAt`);

        if (cached && cached.lastUpdated === lastUpdated) {
          setReviews(cached.fetchedReviews);
          setLoading(false);
          return;
        }

        const { data } = await axios.post(
          `${API_URL}/review/fetch`,
          { userId: user._id },
          { withCredentials: true }
        );

        if (data.error) {
          toast.error(data.message, { id: "123" });
        } else {
          toast.success(data.message, { id: "123" });
          const fetchedReviews = data.reviews;
          setReviews(fetchedReviews);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ fetchedReviews, lastUpdated })
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user?._id]);

  return (
    <>
      {reviews?.length ? (
        <article className="flex flex-col w-full gap-6 lg:p-14 p-4">
          <section className="flex w-full items-center justify-between">
            <main className="text-sm font-normal">
              {reviews?.length} review{reviews?.length === 1 ? "" : "s"} found
            </main>
            <main className="flex items-center gap-3 text-lg">
              <div className="h-10 w-10 rounded-lg bg-white text-primary flex items-center justify-center">
                <IoGridOutline />
              </div>

              <div className="h-10 w-10 rounded-lg bg-white text-primary flex items-center justify-center">
                <IoListOutline />
              </div>
              <div className="h-10 w-10 rounded-lg bg-white text-primary flex items-center justify-center">
                <IoMapOutline />
              </div>
              <div className=" rounded-lg bg-white text-primary flex items-center justify-center gap-2 text-xs px-6 py-3">
                Sort By <IoChevronDown />
              </div>
            </main>
          </section>

          <section className=" columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-6">
            {reviews.slice(0, visible).map((review, index) => (
              <div
                key={index}
                className="break-inside-avoid rounded-4xl border border-zinc-200/70 p-6 flex flex-col gap-4 bg-white"
              >
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8  shrink-0 rounded-full bg-zinc-100 relative">
                    <RiPoliceBadgeFill className="text-zinc-950 absolute text-sm bottom-0 right-0" />
                    <img
                      src={listing10}
                      alt={review.fullname}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                  <section className="flex w-full justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold capitalize">
                        {review.fullname}
                      </span>
                      <p className="text-xs text-primary font-medium">
                        {review.occupation}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < review.rating ? <FaStar /> : <FaRegStar />}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600 font-normal">
                  {review.message}
                </p>
              </div>
            ))}
          </section>
        </article>
      ) : (
        <>
          {loading ? (
            "Loading Reviews"
          ) : (
            <section className="flex flex-col items-center justify-center mx-auto gap-2 h-[400px]">
              <img
                src={noresult}
                alt="no records found"
                className="w-[150px]"
                loading="lazy"
              />
              <p className="font-medium">You currently have no reviews</p>
            </section>
          )}
        </>
      )}
    </>
  );
}
