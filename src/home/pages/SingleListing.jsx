import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  IoEyeOutline,
  IoHeart,
  IoLocationOutline,
  IoStarOutline,
} from "react-icons/io5";
import NoRecord from "../../components/NoRecord";
import { MdReviews } from "react-icons/md";
import { LuBed, LuChevronLeft, LuChevronRight, LuToilet } from "react-icons/lu";
import {
  BiArea,
  BiPhoneCall,
  BiShower,
  BiSolidBadgeCheck,
} from "react-icons/bi";
import {
  FaChevronLeft,
  FaChevronRight,
  FaComment,
  FaEllipsisH,
  FaFacebook,
  FaInstagram,
  FaRegStar,
  FaStar,
  FaWhatsapp,
  FaImage,
  FaVideo,
} from "react-icons/fa";
import { FaArrowLeftLong, FaLinkedinIn } from "react-icons/fa6";
import { TbMeterSquare } from "react-icons/tb";
import { useSelector } from "react-redux";
import { noresult, shield } from "../../assets/images/images";
import Loader from "../../components/Loader";

export default function SingleListing() {
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://rentahome-server.onrender.com/api";
  const user = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [agent, setAgent] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [isFavouriting, setIsFavouriting] = useState(false);
  const [isEnquiring, setIsEnquiring] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to control the view: true for images, false for video

  const [showImages, setShowImages] = useState(false);

  const [enquiryInput, setEnquiryInput] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
    medium: "message",
  });

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_URL}/listing/fetch/${params.id}`,
          {
            withCredentials: true,
          }
        );
        setListing(data.listing);
        setAgent(data.agent);
        setReviews(data.reviews);
        setReviewInput({
          ...reviewInput,
          property: data.listing._id,
          agent: data.agent._id,
        });
        setEnquiryInput((prev) => ({
          ...prev,
          message: `Hello ${data.agent.firstname} ${
            data.agent.lastname || ""
          }, I'd like to check the availability for ${data.listing.title}, ${
            data.listing.location.state
          }, ₦${data.listing.price.toLocaleString()}. Thank you!`,
        }));
      } catch (err) {
        console.error("Error fetching listing:", err);
        toast.error("An unknown error occurred", { id: "fetch_error" });
        setTimeout(() => navigate("/listings"), 1000);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id, navigate]);

  const [reviewInput, setReviewInput] = useState({
    fullname: "",
    email: "",
    message: "",
    reviewType: "listing",
    property: "",
    agent: "",
    rating: 0,
    user: user ? user._id : "",
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const handleReviewInputChange = (e) => {
    setReviewInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleRatingChange = (newRating) => {
    setReviewInput((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  }; // Function to toggle between images and video

  const toggleMediaView = () => {
    setShowImages((prev) => !prev);
  };

  const handleAddToFavourite = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to continue", { id: "auth_error" });
      return;
    }
    setIsFavouriting(true);
    const toastId = toast.loading("Adding listing to favourites...");

    try {
      const res = await axios.post(
        `${API_URL}/wishlist/favorites/add`,
        { listingId: listing._id },
        { withCredentials: true }
      );
      if (res.data.error) {
        toast.error(res.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Unable to add listing to favourites.";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsFavouriting(false);
    }
  };

  const handleChange = (e) => {
    setEnquiryInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEnquiries = async (e) => {
    e.preventDefault();
    setIsEnquiring(true);
    const toastId = toast.loading("Processing your request...");

    try {
      const res = await axios.post(
        `${API_URL}/enquiry/store`,
        { ...enquiryInput, listingId: listing?._id },
        {
          withCredentials: true,
        }
      );
      if (res.data.error) {
        toast.error(res.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        setEnquiryInput({
          name: "",
          email: "",
          number: "",
          message: "",
          medium: `Hello ${agent.firstname} ${
            agent.lastname || ""
          }, I'd like to check the availability for ${listing.title}, ${
            listing.location.state
          }, ₦${listing.price.toLocaleString()}. Thank you!`,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unknown error occurred. Please try again.";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsEnquiring(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (reviewInput.rating < 1) {
      toast.error("Please select a rating", { id: "123" });
      return;
    }
    setLoadingReviews(true);
    toast.loading("Submitting your reviews...", { id: "123" });
    try {
      const res = await axios.post(
        `${API_URL}/reviews/store`,
        { ...reviewInput, user: user ? user._id : "" },
        {
          withCredentials: true,
        }
      );
      if (res.data.error) {
        toast.error(res.data.message, { id: "123" });
      } else {
        toast.success(res.data.message, { id: "123" });
        setReviewInput({
          fullname: "",
          email: "",
          message: "",
          reviewType: "listing",
          property: "",
          agent: "",
          rating: 0,
          user: user ? user._id : "",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Unable to process your request. Please try again",
          {
            id: "123",
          }
        );
      } else {
        toast.error("An unknown error occured. Please try again.", {
          id: "123",
        });
      }
    } finally {
      setLoadingReviews(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!listing) {
    return <NoRecord />;
  }

  function YouTubeEmbed({ url }) {
    let videoId = "";

    if (url.includes("youtu.be")) {
      // Handle short links
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      // Handle normal links
      videoId = url.split("v=")[1].split("&")[0];
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={embedUrl}
          title="YouTube video player"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "80%",
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const mapPosition = [6.5244, 3.3792];

  return (
    <article className="flex flex-col gap-4 p-6 py-24 ">
      <section className="flex flex-col rounded-2xl border border-zinc-200 p-4">
        <main className="flex items-center gap-1 text-xs text-zinc-500 font-normal">
          <FaArrowLeftLong /> Back to property list
        </main>
        <h3 className="text-2xl font-semibold">Property Details</h3>{" "}
      </section>
      <section className="flex gap-4">
        <article className="w-full flex flex-col rounded-2xl overflow-hidden border border-zinc-200">
          <section className="h-[380px] rounded-t-2xl relative w-full">
            <div className="absolute z-[4] top-3 left-3 bg-orange-600 text-white rounded-lg text-[10px] font-semibold px-3 py-1">
              {listing.category || "House"}
            </div>
            <div className="absolute z-[4] top-3 right-3 bg-white rounded-lg text-xs font-semibold px-3 py-1">
              {listing.purpose || "For Sale"}
            </div>{" "}
            {/* Add the media switching icons here */}
            <div className="absolute z-[4] top-12 right-3 flex items-center gap-1 text-xs">
              <span
                onClick={() => setShowImages(true)}
                className={`h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-lg cursor-pointer ${
                  showImages ? "bg-white" : "bg-white/50"
                }`}
              >
                <FaImage />
              </span>
              <span
                onClick={() => setShowImages(false)}
                className={`h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-lg cursor-pointer ${
                  !showImages ? "bg-white" : "bg-white/50"
                }`}
              >
                <FaVideo />
              </span>
            </div>
            {showImages ? (
              // Show images with navigation controls
              <>
                <div className="absolute z-[4] bottom-4 right-3 flex items-center gap-1 text-xs">
                  <span
                    onClick={handlePrevImage}
                    className="h-8 w-8 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-lg cursor-pointer"
                  >
                    <FaChevronLeft />
                  </span>

                  <span
                    onClick={handleNextImage}
                    className="h-8 w-8 rounded-full flex items-center justify-center bg-white cursor-pointer"
                  >
                    <FaChevronRight />
                  </span>
                </div>

                <img
                  src={listing.images[currentImageIndex].url}
                  className="h-full w-full rounded-t-2xl object-cover"
                  alt={listing.title}
                />
              </>
            ) : (
              // Show YouTube video
              <YouTubeEmbed url={listing.youtubeVideo} />
            )}
          </section>

          <section className="p-6 flex flex-col gap-4">
            <article className="flex flex-col">
              <section className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <h3 className="text-xl text-primary font-semibold">
                  &#8358;{listing.price.toLocaleString()}
                </h3>
              </section>
              <section className="flex items-center justify-between text-xs text-zinc-600 font-medium">
                <div className="flex items-center">
                  <IoLocationOutline /> {listing.location.street}
                </div>

                <section className="flex items-center gap-3">
                  <main className="flex items-center gap-1">
                    <IoStarOutline /> {listing.averageRating}
                  </main>

                  <main className="flex items-center gap-1">
                    <IoEyeOutline /> {listing.views}
                  </main>
                </section>
              </section>
            </article>
            <article className="text-[13px] font-medium ">
              {listing.description || "No description provided."}
            </article>
            <article className="flex items-center gap-1 text-[11px]">
              <span className="p-1 rounded-md flex items-center gap-1 bg-zinc-100 px-2">
                <LuBed /> {listing.bedrooms} Bedrooms
              </span>
              <span className="p-1 rounded-md flex items-center gap-1 bg-zinc-100 px-2">
                <BiShower /> {listing.bathrooms} Bathrooms
              </span>
              <span className="p-1 rounded-md flex items-center gap-1 bg-zinc-100 px-2">
                <LuToilet /> {listing.toilets} Toilets
              </span>
              <span className="p-1 rounded-md flex items-center gap-1 bg-zinc-100 px-2">
                <BiArea /> {listing.areaSize}
                <TbMeterSquare className="-ml-1" />
              </span>
            </article>
            <article className="flex flex-col gap-4 mt-6">
              <main className="flex items-center justify-between">
                <div className="text-sm font-semibold">Property Reviews</div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="h-8 w-8 rounded-full flex items-center justify-center bg-zinc-100 backdrop-blur-lg cursor-pointer">
                    <LuChevronLeft />
                  </span>

                  <span className="h-8 w-8 rounded-full flex items-center justify-center bg-zinc-100 cursor-pointer">
                    <LuChevronRight />
                  </span>
                </div>
              </main>
              {reviews.length < 1 ? (
                <section className="flex flex-col items-center mx-auto gap-2">
                  <img
                    src={noresult}
                    alt="No Reviews yet."
                    className="w-[150px]"
                    loading="lazy"
                  />

                  <p className="text-lg font-medium font-primary">
                    No Reviews yet.
                  </p>
                </section>
              ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-6">
                  {reviews.slice(0, 3).map((review, index) => (
                    <div
                      key={index}
                      className="break-inside-avoid rounded-2xl border border-zinc-200/70 p-3 flex flex-col gap-4 bg-white"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 shrink-0 rounded-full bg-zinc-100 relative">
                          <img
                            src={review.user.profilePhoto}
                            alt={review.user.fristname}
                            className="h-full w-full rounded-full object-cover"
                          />
                        </span>

                        <section className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold capitalize">
                              {`${review.user.firstname} ${
                                review.user.lastname || ""
                              }`}
                            </span>

                            <p className="text-[10px] text-primary font-medium">
                              HouseHunter {review.user.role}
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
                      <p className="text-xs leading-tight">{review.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
            <article className="flex flex-col gap-4">
              <div className="text-sm font-semibold">Location</div>
              <div className="h-[250px] rounded-2xl overflow-hidden">
                <MapContainer
                  center={mapPosition}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />

                  <Marker position={mapPosition}>
                    <Popup>{listing.location.street}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </article>
            <article className="flex items-center justify-between bg-zinc-100 px-6 py-3 rounded-xl">
              <span className="text-sm font-semibold">
                Like this property? Add as favourites and compare listings
              </span>
              <div
                onClick={handleAddToFavourite}
                className="flex items-center justify-center gap-1 text-xs text-white bg-primary rounded-xl px-6 py-2.5 cursor-pointer min-w-[150px]"
              >
                {isFavouriting ? (
                  <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block my-1"></span>
                ) : (
                  <>
                    <IoHeart /> Add to favourite
                  </>
                )}
              </div>
            </article>
            <article className="flex items-center justify-between w-full">
              <section className="flex items-center gap-2">
                <img
                  src={shield}
                  className="w-[70px]"
                  loading="lazy"
                  alt="verified property"
                />

                <main className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Property is verified as real
                  </span>

                  <span className="text-xs">
                    If reported as fake, we'll investigate to confirm if this
                    listing isn't real.
                  </span>
                </main>
              </section>
              <div className="flex items-center text-xs text-primary border border-primary rounded-xl px-6 py-2.5">
                Report property
              </div>
            </article>
          </section>
        </article>

        <article className="w-full max-w-[350px] shrink-0 flex flex-col gap-4">
          <section className="flex flex-col gap-4 p-5 rounded-2xl border border-zinc-200 bg-white items-center w-full">
            <main className="flex items-center justify-between text-lg font-semibold w-full">
              Agent Profile <FaEllipsisH />{" "}
            </main>
            <main className="flex flex-col items-center gap-2">
              <span className="h-20 w-20 rounded-full">
                <img
                  src={agent.profilePhoto}
                  className="h-full w-full rounded-full object-cover"
                  alt={`${agent.firstname} Image`}
                />
              </span>
              <span className="text-[16px] font-semibold">
                {`${agent.firstname} ${agent.lastname || ""}`}
              </span>
            </main>
            <main className="text-[11px] text-center text-zinc-500 font-normal leading-tight">
              {agent.bio}
            </main>
            <main className="flex items-center justify-between w-full text-sm">
              <div className="flex items-center gap-1 text-zinc-500">
                <span className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                  <FaFacebook />
                </span>

                <span className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                  <FaInstagram />
                </span>

                <span className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                  <FaLinkedinIn />
                </span>
              </div>
              <div className="text-xs text-white bg-primary font-normal flex items-center gap-1 px-6 py-2 rounded-full">
                <BiPhoneCall /> Get in Touch
              </div>
            </main>
          </section>

          <section className="flex flex-col gap-4 p-4 rounded-2xl border border-zinc-200 bg-white w-full">
            <div className="text-lg font-semibold">Request Enquiry</div>{" "}
            <form onSubmit={handleEnquiries} className="flex flex-col gap-2">
              <main className="flex gap-2">
                <label htmlFor="name" className="text-[11px]">
                  Name
                </label>

                <input
                  name="name"
                  value={enquiryInput.name}
                  onChange={handleChange}
                  required
                  type="text"
                  id="name"
                  className="bg-zinc-100 w-full rounded-xl p-2 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-sm outline-zinc-200"
                  placeholder="Enter full name"
                />
              </main>
              <main className="flex gap-2">
                <label htmlFor="email" className="text-[11px]">
                  Email
                </label>

                <input
                  value={enquiryInput.email}
                  onChange={handleChange}
                  required
                  name="email"
                  type="email"
                  id="email"
                  className="bg-zinc-100 w-full rounded-xl p-2 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-sm outline-zinc-200"
                  placeholder="Enter email address"
                />
              </main>
              <main className="flex gap-2">
                <label htmlFor="number" className="text-[11px]">
                  Number
                </label>

                <input
                  value={enquiryInput.number}
                  onChange={handleChange}
                  required
                  name="number"
                  type="text"
                  id="number"
                  className="bg-zinc-100 w-full rounded-xl p-2 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-sm outline-zinc-200"
                  placeholder="Enter phone number"
                />
              </main>
              <main className="flex gap-2">
                <label htmlFor="message" className="text-[11px]">
                  Message
                </label>

                <textarea
                  onChange={handleChange}
                  required
                  name="message"
                  id="message"
                  rows={4}
                  maxLength={300}
                  className="bg-zinc-100 w-full rounded-xl p-2 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-xs outline-zinc-200"
                  placeholder="Enter your message"
                  value={enquiryInput.message}
                />
              </main>
              <div className="flex items-center justify-between gap-6 mt-4">
                <button
                  type="submit"
                  className="flex items-center gap-1 rounded-xl justify-center w-full bg-primary text-xs text-white px-6 py-2.5 cursor-pointer"
                >
                  {isEnquiring ? (
                    <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block my-1 "></span>
                  ) : (
                    <>
                      <BiPhoneCall /> Enquire
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/2348012345678?text=Hello ${
                    agent.firstname
                  } ${
                    agent.lastname || ""
                  }, I would like to check the availability for ${
                    listing?.title
                  }, ${
                    listing?.location.state
                  }, ₦${listing?.price.toLocaleString()}. Thank you!`}
                  className="flex items-center justify-center gap-1 rounded-xl w-full bg-green-500 text-xs text-white px-6 py-2.5 cursor-pointer"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </form>
          </section>

          <section className="flex flex-col gap-4 p-4 rounded-2xl border border-zinc-200 bg-white w-full text-[11px]">
            <div className="text-lg font-semibold">Property Details</div>{" "}
            <main className="flex flex-col gap-1">
              <section className="flex items-center gap-1 w-full justify-between">
                <main className="w-full max-w-[90%] bg-zinc-100 p-2 px-4 rounded-lg">
                  Price
                </main>

                <main className="w-full bg-zinc-100 rounded-lg p-2 px-4">
                  &#8358;{listing.price.toLocaleString()}
                </main>
              </section>
              <section className="flex items-center gap-1 w-full justify-between">
                <main className="w-full max-w-[90%] bg-zinc-100 p-2 px-4 rounded-lg">
                  Property Type
                </main>

                <main className="w-full bg-zinc-100 rounded-lg p-2 px-4">
                  {listing.category}
                </main>
              </section>
              <section className="flex items-center gap-1 w-full justify-between">
                <main className="w-full max-w-[90%] bg-zinc-100 p-2 px-4 rounded-lg">
                  Building Size
                </main>

                <main className="w-full bg-zinc-100 rounded-lg p-2 px-4">
                  {listing.areaSize}
                </main>
              </section>
              <section className="flex items-center gap-1 w-full justify-between">
                <main className="w-full max-w-[90%] bg-zinc-100 p-2 px-4 rounded-lg">
                  Bedrooms
                </main>

                <main className="w-full bg-zinc-100 rounded-lg p-2 px-4">
                  {listing.bedrooms}
                </main>
              </section>
              <section className="flex items-center gap-1 w-full justify-between">
                <main className="w-full max-w-[90%] bg-zinc-100 p-2 px-4 rounded-lg">
                  Bathrooms
                </main>

                <main className="w-full bg-zinc-100 rounded-lg p-2 px-4">
                  {listing.bathrooms}
                </main>
              </section>
              <section className="flex items-center gap-1 w-full justify-between">
                <main className="w-full max-w-[90%] bg-zinc-100 p-2 px-4 rounded-lg">
                  Toilets
                </main>

                <main className="w-full bg-zinc-100 rounded-lg p-2 px-4">
                  {listing.toilets}
                </main>
              </section>
            </main>
          </section>

          <section className="flex flex-col gap-4 p-4 rounded-2xl border border-zinc-200 bg-white w-full text-[11px]">
            {" "}
            <div className="text-lg font-semibold">Features</div>
            <main className="w-full flex flex-wrap gap-1.5">
              {listing.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <BiSolidBadgeCheck className="text-green-500" />
                  {feature}
                </div>
              ))}
            </main>
          </section>

          <section className="flex flex-col gap-4 p-4 rounded-2xl border border-zinc-200 bg-white w-full">
            <div className="text-lg font-semibold">Write a review</div>{" "}
            <div
              className="flex items-center gap-1.5 -mt-2 text-xl cursor-pointer"
              onMouseLeave={() => setHoveredRating(0)}
            >
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <span
                    key={i}
                    onClick={() => handleRatingChange(ratingValue)}
                    onMouseEnter={() => setHoveredRating(ratingValue)}
                  >
                    {" "}
                    {ratingValue <= reviewInput.rating ||
                    ratingValue <= hoveredRating ? (
                      <FaStar className="text-yellow-500 transition-all duration-200" />
                    ) : (
                      <FaRegStar className="text-yellow-500 transition-all duration-200" />
                    )}
                  </span>
                );
              })}
            </div>
            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2">
              <main className="flex gap-2">
                <label htmlFor="name" className="text-[11px]">
                  Name
                </label>
                <input
                  name="fullname"
                  value={reviewInput.fullname}
                  onChange={handleReviewInputChange}
                  required
                  type="text"
                  className="bg-zinc-100 w-full rounded-xl p-2 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-xs outline-zinc-200"
                  placeholder="Enter full name"
                />
              </main>
              <main className="flex gap-2">
                <label htmlFor="email" className="text-[11px]">
                  Email
                </label>

                <input
                  value={reviewInput.email}
                  onChange={handleReviewInputChange}
                  required
                  name="email"
                  type="email"
                  className="bg-zinc-100 w-full rounded-xl p-2 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-xs outline-zinc-200"
                  placeholder="Enter email address"
                />
              </main>
              <main className="flex gap-2">
                <label htmlFor="message" className="text-[11px]">
                  Message
                </label>

                <textarea
                  onChange={handleReviewInputChange}
                  required
                  name="message"
                  id="message"
                  rows={4}
                  maxLength={300}
                  className="bg-zinc-100 w-full rounded-xl p-2 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-xs outline-zinc-200"
                  placeholder="Enter your message"
                  value={reviewInput.message}
                />
              </main>
              <button
                type="submit"
                className="flex items-center gap-1 rounded-xl justify-center w-full bg-primary text-xs text-white px-6 py-2.5 cursor-pointer"
              >
                {loadingReviews ? (
                  <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block my-1 "></span>
                ) : (
                  <>
                    <MdReviews /> Submit
                  </>
                )}
              </button>
            </form>
          </section>
        </article>
      </section>
    </article>
  );
}
