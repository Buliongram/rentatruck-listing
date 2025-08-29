import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingCard from "../../home/components/ListingCard";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import { listing10 } from "../../assets/images/listing/listingImages";
import { FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { MdPhone } from "react-icons/md";
import { GiBlockHouse } from "react-icons/gi";
import axios from "axios";

export default function UserDashboard() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;

  const user = useSelector((state) => state.user);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [wishlist, setWishlist] = useState([{}, {}]);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    if (!user?._id) return;

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
    const fetchReviews = async () => {
      setLoading(true);
      const cacheKey = `RentaHome-reviews-cache-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/review/updateAt`);

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

        if (!data.error) {
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
    const fetchWishlist = async () => {
      setLoading(true);
      const cacheKey = `RentaHome-wishlist-cache-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/favourite/updateAt`);

        if (cached && cached.lastUpdated === lastUpdated) {
          setReviews(cached.fetchedReviews);
          setLoading(false);
          return;
        }

        const { data } = await axios.post(
          `${API_URL}/wishlist/fetch`,
          { userId: user._id },
          { withCredentials: true }
        );

        if (!data.error) {
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
    const fetchListings = async () => {
      setLoading(true);
      const cacheKey = `RentaHome-reviews-cache-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/lising/updateAt`);

        if (cached && cached.lastUpdated === lastUpdated) {
          setReviews(cached.fetchedReviews);
          setLoading(false);
          return;
        }

        const { data } = await axios.post(
          `${API_URL}/listing/fetch`,
          { userId: user._id },
          { withCredentials: true }
        );

        if (!data.error) {
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
      <article className="lg:px-14 p-4 flex flex-col gap-3">
        <div className="text-2xl font-semibold capitalize">
          {greeting}, {user.firstname}!
        </div>

        <main className="flex flex-col gap-2 w-full">
          <span className="text-lg font-medium">Quick Statistics</span>
          <section className="w-full flex justify-between gap-5">
            <main className="flex justify-between p-4 rounded-2xl bg-white w-full">
              <section className="flex items-center gap-1">
                <div className="h-14 w-14 border rounded-full p-1 flex items-center justify-center border-zinc-300">
                  <span className="h-full w-full rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl">
                    <MdPhone />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium font-primary -mb-2">
                    {reviews?.length}
                  </span>
                  <p className="text-[11px] text-zinc-500">Total Reviews</p>
                </div>
              </section>
              <section className="flex flex-col justify-between">
                <span className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-500">
                  ?
                </span>
                <p className="text-xs text-orange-500">25%</p>
              </section>
            </main>

            <main className="flex justify-between p-4 rounded-2xl bg-white w-full">
              <section className="flex items-center gap-1">
                <div className="h-14 w-14 border rounded-full p-1 flex items-center justify-center border-zinc-300">
                  <span className="h-full w-full rounded-full bg-green-100 flex items-center justify-center text-green-500 text-xl">
                    <FaRegHeart />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium font-primary -mb-2">
                    {wishlist.length}
                  </span>
                  <p className="text-[11px] text-zinc-500">Total Saved Items</p>
                </div>
              </section>
              <section className="flex flex-col justify-between">
                <span className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-500">
                  ?
                </span>
                <p className="text-xs text-green-500">25%</p>
              </section>
            </main>

            <main className="flex justify-between p-4 rounded-2xl bg-white w-full">
              <section className="flex items-center gap-1">
                <div className="h-14 w-14 border rounded-full p-1 flex items-center justify-center border-zinc-300">
                  <span className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xl">
                    <GiBlockHouse />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium font-primary -mb-2">
                    {listings?.length}
                  </span>
                  <p className="text-[11px] text-zinc-500">Total Listings</p>
                </div>
              </section>
              <section className="flex flex-col justify-between">
                <span className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-500">
                  ?
                </span>
                <p className="text-xs text-blue-500">25%</p>
              </section>
            </main>
          </section>
        </main>

        <main className="flex flex-col gap-2 w-full">
          <section className="flex items-center justify-between w-full">
            <span className="text-lg font-medium">Security Tips</span>
            <Link
              to={"/dashboard/security"}
              className="text-xs font-medium cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 px-3 text-primary"
            >
              Go to settings
            </Link>
          </section>

          <Link
            to={"/dashboard/security"}
            className="flex justify-between w-full bg-white p-4 rounded-2xl"
          >
            <main className="flex items-center gap-4">
              <div className="h-14 w-14 border rounded-full p-1 flex items-center justify-center border-zinc-300">
                <span className="h-full w-full rounded-full bg-violet-100 flex items-center justify-center text-primary text-xl">
                  <BiSolidShieldAlt2 />
                </span>
              </div>

              <div className="flex flex-col gap-1 text-xs font-medium">
                <span className="text-lg font-medium font-primary -mb-2">
                  2-Step Authentication
                </span>
                <span className="text-[11px] text-zinc-500">
                  2FA boosts security, adding an extra layer to prevent
                  unauthorized access
                </span>
              </div>
            </main>
            <span className="h-6 w-6 flex items-center justify-center cursor-pointer">
              <i className="fa-regular fa-xmark"></i>
            </span>
          </Link>
        </main>

        <main className="flex flex-col gap-2 w-full">
          <section className="flex items-center justify-between w-full">
            <span className="text-lg font-medium">Saved Listings</span>
            <Link
              to={"/dashboard/saved-items"}
              className="text-xs font-medium cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 px-3 text-primary"
            >
              View all
            </Link>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {listings.slice(0, 3).map((product, index) => (
              <ListingCard key={product.id} {...product} />
            ))}
          </section>
        </main>

        <main className="flex flex-col gap-2 w-full">
          <section className="flex items-center justify-between w-full">
            <span className="text-lg font-medium">Your reviews</span>
            <Link
              to={"/dashboard/reviews"}
              className="text-xs font-medium cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 px-3 text-primary"
            >
              See all reviews
            </Link>
          </section>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-6">
            {reviews.slice(0, 3).map((review, index) => (
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
          </div>
        </main>
      </article>
    </>
  );
}
