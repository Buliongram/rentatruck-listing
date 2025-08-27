import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArea, BiShower, BiSolidShieldAlt2 } from "react-icons/bi";
import {
  FaEye,
  FaHeart,
  FaLocationDot,
  FaMapLocationDot,
} from "react-icons/fa6";
import { IoEyeOutline, IoHeartOutline } from "react-icons/io5";
import { LuBed, LuToilet } from "react-icons/lu";
import { TbMeterSquare } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GreenSpinner from "../../admin/components/GreenSpinner";
import CircularProgress from "../../admin/components/CircularProgress";
import { MdMessage, MdReviews } from "react-icons/md";
import NoRecord from "../../components/NoRecord";
import { noresult } from "../../assets/images/images";
import ShareButton from "../../admin/components/ShareButton";
import { FaEllipsisV, FaRegStar, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Loader from "../../components/Loader";
export default function UserDasboard() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  const user = useSelector((state) => state.user);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState({ type: "", status: false });
  const [listings, setListings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchListings = async () => {
      setLoading({ type: "listing", status: true });
      const cached = JSON.parse(
        localStorage.getItem(`RentaHome-listing-cache-${user._id}`)
      );

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/listing/last-updated`);

        if (cached && cached.lastUpdated === lastUpdated) {
          setListings(cached.data);
          setLoading({ type: "listing", status: false });
          return;
        }

        const { data } = await axios.get(`${API_URL}/listing/fetch`, {
          withCredentials: true,
        });
        setListings(data);
        localStorage.setItem(
          `RentaHome-listing-cache-${user._id}`,
          JSON.stringify({ data, lastUpdated })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading({ type: "listing", status: false });
      }
    };

    const fetchWishlist = async () => {
      setLoading({ type: "wishlist", status: true });
      const cached = JSON.parse(
        localStorage.getItem(`RentaHome-wishlist-cache-${user._id}`)
      );
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/wishlist/last-updated/user`, {
          withCredentials: true,
        });
        if (cached && cached.lastUpdated === lastUpdated) {
          setWishlist(cached.data);
          setLoading({ type: "wishlist", status: false });
          return;
        }
        const { data } = await axios.get(`${API_URL}/wishlist/fetch/user`, {
          withCredentials: true,
        });
        setWishlist(data);
        localStorage.setItem(
          `RentaHome-wishlist-cache-${user._id}`,
          JSON.stringify({ data, lastUpdated })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading({ type: "wishlist", status: false });
      }
    };

    const fetchReviews = async () => {
      setLoading({ type: "reviews", status: true });
      const cached = JSON.parse(
        localStorage.getItem(`RentaHome-reviews-cache-${user._id}`)
      );
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/reviews/last-updated/user`, {
          withCredentials: true,
        });
        if (cached && cached.lastUpdated === lastUpdated) {
          setReviews(cached.data);
          setLoading({ type: "reviews", status: false });
          return;
        }
        const { data } = await axios.get(`${API_URL}/reviews/fetch/user`, {
          withCredentials: true,
        });
        setReviews(data);
        localStorage.setItem(
          `RentaHome-reviews-cache-${user._id}`,
          JSON.stringify({ data, lastUpdated })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading({ type: "reviews", status: false });
      }
    };

    const hour = new Date().getHours();
    let greet = "";
    if (hour >= 0 && hour < 12) {
      greet = "Good morning";
    } else if (hour >= 12 && hour < 16) {
      greet = "Good afternoon";
    } else {
      greet = "Good evening";
    }
    fetchListings();
    fetchReviews();
    fetchWishlist();
  }, []);
  return (
    <>
      <article className="flex flex-col lg:flex-row items-start gap-3">
        <section className="flex flex-col gap-3 w-full">
          <main className="w-full flex items-center gap-3">
            <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
              <main className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500">Total Reviews</p>
                <h3 className="font-bold text-2xl font-primary">
                  {loading.type === "reviews" && loading.status ? (
                    <GreenSpinner />
                  ) : (
                    reviews.length
                  )}
                </h3>
              </main>
              <CircularProgress
                percentage={
                  (Number(reviews.length) / Number(reviews.length)) * 100 || 0
                }
                color={"#155dfc"}
                icon={<MdReviews className="text-xl text-[#155dfc]" />}
              />
            </article>
            <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
              <main className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500">Saved Items</p>
                <h3 className="font-bold text-2xl font-primary">
                  {loading.type === "wishlist" && loading.status ? (
                    <GreenSpinner />
                  ) : (
                    wishlist.length
                  )}
                </h3>
              </main>
              <CircularProgress
                percentage={
                  (Number(wishlist.length) / Number(wishlist.length)) * 100 || 0
                }
                color={"#007a55"}
                icon={<FaHeart className="text-xl text-[#007a55]" />}
              />
            </article>
            <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
              <main className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500 ">Total Messages</p>
                <h3 className="font-bold text-2xl font-primary">
                  {loading.type === "messages" && loading.status ? (
                    <GreenSpinner />
                  ) : (
                    0
                  )}
                </h3>
              </main>
              <CircularProgress
                percentage={(Number(0) / Number(0)) * 100 || 0}
                color={"#ff6900 "}
                icon={<MdMessage className="text-xl text-[#ff6900]" />}
              />
            </article>
          </main>
          <Link
            to={"/dashboard/security"}
            className="flex justify-between w-full bg-white rounded-2xl p-4"
          >
            <main className="flex items-center gap-4">
              <div className="h-14 w-14 border rounded-full p-1 flex items-center justify-center border-[#f30000]">
                <span className="h-full w-full rounded-full bg-violet-100 flex items-center justify-center text-[#f30000] text-xl">
                  <BiSolidShieldAlt2 />
                </span>
              </div>

              <div className="flex flex-col gap-1 text-xs font-medium">
                <span className="text-lg font-medium font-primary text-[#f30000] -mb-2">
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

          <main className="flex flex-col w-full gap-5 bg-white rounded-3xl p-4 min-h-[300px]">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold">Saved Listings</span>
              <Link
                to={"/dashboard/saved-items"}
                className="text-xs bg-blue-600 text-white px-3 rounded-full py-1.5 w-max flex items-center gap-0.5"
              >
                <IoEyeOutline /> View all
              </Link>
            </div>

            {loading.type === "wishlist" && loading.status ? (
              <Loader padding={10} />
            ) : (
              <>
                {wishlist && wishlist.length ? (
                  <section className="w-full max-w-[660px] shrink-0 flex items-center justify-center">
                    <Swiper
                      slidesPerView={2}
                      spaceBetween={10}
                      modules={[Autoplay]}
                      autoplay={{ delay: 4000, disableOnInteraction: false }}
                      loop={true}
                      className="w-full"
                    >
                      {wishlist.slice(0, 5).map((house) => (
                        <SwiperSlide key={house._id}>
                          <Link to={`/listing/${house?._id}`}>
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

                              <div className="absolute top-4 left-4 bg-white rounded-lg text-xs font-medium px-3 py-1">
                                {house?.category || "House"}
                              </div>
                              {user.role !== "Admin" ? (
                                ""
                              ) : (
                                <span
                                  onClick={() =>
                                    setShowActions(
                                      showActions === house._id
                                        ? null
                                        : house._id
                                    )
                                  }
                                  className="p-2 bg-white rounded-lg cursor-pointer absolute top-4 right-4"
                                >
                                  <FaEllipsisV className="text-[10px]" />
                                </span>
                              )}

                              <main className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[90%] p-3 bg-white rounded-2xl flex flex-col divide-y divide-zinc-100">
                                <article className="flex flex-col pb-2 w-full">
                                  <section className="flex items-center justify-between">
                                    <h3 className="text-xs font-semibold font-primary">
                                      {house?.title}
                                    </h3>
                                    <ShareButton
                                      color={"blue-600"}
                                      listingTitle={house?.title}
                                      listingUrl={`https://your-domain.com/listing/single/${house?._id}`}
                                    />
                                  </section>
                                  <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                                    <FaLocationDot className="text-blue-600" />
                                    {house?.location.area +
                                      ", " +
                                      house?.location.state}
                                  </p>
                                </article>
                                <article className="flex items-center justify-between pt-2">
                                  <h3 className="text-xs font-semibold font-primary text-blue-600">
                                    &#8358;{house?.price.toLocaleString()}
                                  </h3>
                                </article>
                                <article className="flex items-center gap-1 text-[11px] justify-between pt-2">
                                  <span className="flex items-center gap-1">
                                    <LuBed className="text-zinc-400" />
                                    {house.bedrooms} Beds
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <BiShower className="text-zinc-400" />
                                    {house.bathrooms} Bathrooms
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <LuToilet className="text-zinc-400" />
                                    {house.toilets} Toilets
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <BiArea className="text-zinc-400" />
                                    {house.areaSize}
                                    <TbMeterSquare className="-ml-1" />
                                  </span>
                                </article>
                              </main>
                            </main>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </section>
                ) : (
                  <section className="flex flex-col items-center mx-auto gap-2 my-10">
                    <img
                      src={noresult}
                      alt="no records found"
                      className="w-[150px]"
                      loading="lazy"
                    />
                    <p className="text-sm font-medium font-primary">
                      You currently have no saved listings
                    </p>
                  </section>
                )}
              </>
            )}
          </main>

          <main className="flex flex-col w-full gap-5 bg-white rounded-3xl p-4 min-h-[300px]">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold">Your reviews</span>
              <Link
                to={"/dashboard/reviews"}
                className="text-xs bg-blue-600 text-white px-3 rounded-full py-1.5 w-max flex items-center gap-0.5"
              >
                <IoEyeOutline /> View all
              </Link>
            </div>
            {loading.type === "reviews" && loading.status ? (
              <Loader padding={10} />
            ) : (
              <>
                {reviews && reviews.length ? (
                  <section className="w-full max-w-[660px] shrink-0 flex items-center justify-center">
                    <Swiper
                      slidesPerView={2}
                      spaceBetween={10}
                      modules={[Autoplay]}
                      autoplay={{ delay: 4000, disableOnInteraction: false }}
                      loop={true}
                      className="w-full"
                    >
                      {reviews.slice(0, 5).map((review) => (
                        <SwiperSlide key={review._id}>
                          <Link
                            className="break-inside-avoid rounded-3xl border border-zinc-200/70 p-6 flex flex-col gap-3 bg-white"
                            to={`/listing/${review.property._id}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="h-12 w-12 shrink-0 rounded-full bg-zinc-100 relative">
                                <img
                                  src={review.property.images[0].url}
                                  alt={review.fullname}
                                  className="h-full w-full rounded-full object-cover"
                                />
                              </span>
                              <section className="flex w-full justify-between">
                                <div className="flex flex-col">
                                  <span className="text-xs font-semibold capitalize">
                                    {review.property.title}
                                  </span>
                                  <p className="text-xs text-primary font-medium">
                                    {review.reviewType}
                                  </p>
                                </div>
                              </section>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}>
                                  {i < review.rating ? (
                                    <FaStar />
                                  ) : (
                                    <FaRegStar />
                                  )}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm leading-tight font-medium">
                              {review.message}
                            </p>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </section>
                ) : (
                  <section className="flex flex-col items-center mx-auto gap-2 my-10">
                    <img
                      src={noresult}
                      alt="no records found"
                      className="w-[150px]"
                      loading="lazy"
                    />
                    <p className="text-sm font-medium font-primary">
                      You currently have no reviews
                    </p>
                  </section>
                )}{" "}
              </>
            )}
          </main>
        </section>
        <section className="w-full max-w-[320px] shrink-0 flex flex-col gap-5 ">
          <article className="flex flex-col gap-1 divide-zinc-100 bg-white rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Latest Properties</span>
              <Link
                to={"/dashboard/listings"}
                className="text-xs bg-blue-600 text-white px-3 rounded-full py-1.5 w-max flex items-center gap-0.5"
              >
                <IoEyeOutline /> View all
              </Link>
            </div>

            <article className="flex flex-col divide-y divide-zinc-200">
              {listings?.slice(0, 3).map((listing, index) => (
                <Link
                  to={`/listing/${listing._id}`}
                  key={listing._id}
                  className="flex flex-col gap-3 py-5"
                >
                  <article className="h-[130px] rounded-2xl">
                    <img
                      src={listing.images[0].url}
                      className="h-full w-full rounded-2xl object-cover"
                      alt={listing.title}
                    />
                  </article>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600">
                      &#8358;{listing.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-medium bg-zinc-100 px-2 py-0.5 rounded-full">
                      <span className="h-1 w-1 rounded-full bg-blue-600"></span>
                      {listing.purpose}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[13px]">
                      {listing.title}
                    </span>
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <FaMapLocationDot />
                      {`${listing.location.area}, ${listing.location.state}`}
                    </p>
                  </div>
                  <article className="flex items-center gap-1 text-[11px] justify-between">
                    <span className="flex items-center gap-1">
                      <LuBed className="text-zinc-400" />
                      {listing.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <BiShower className="text-zinc-400" />
                      {listing.bathrooms} Bathrooms
                    </span>
                    <span className="flex items-center gap-1">
                      <LuToilet className="text-zinc-400" />
                      {listing.toilets} Toilets
                    </span>
                    <span className="flex items-center gap-1">
                      <BiArea className="text-zinc-400" />
                      {listing.areaSize}
                      <TbMeterSquare className="-ml-1" />
                    </span>
                  </article>
                </Link>
              ))}
            </article>
          </article>
        </section>
      </article>
    </>
  );
}
