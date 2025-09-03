import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import NoRecord from "../../components/NoRecord";
import { BiSearch } from "react-icons/bi";
import { format, parseISO } from "date-fns";
import { MdOutlineMessage } from "react-icons/md";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaCircleExclamation, FaXmark } from "react-icons/fa6";
import { LuBadgeCheck, LuBan } from "react-icons/lu";

export default function AdminReviews() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [selectedReview, setSelectedReview] = useState({
    id: null,
    status: "",
  });
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleMessage, setToggleMessage] = useState({
    modal: false,
    message: "",
  });
  const cacheKey = `househunter-review-cache-admin-dashboard-${user._id}`;
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const categories = [
    { name: "All" },
    { name: "Published" },
    { name: "Pending" },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/review/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setReviews(cached.data);
          return;
        }
        const { data } = await axios.get(`${API_URL}/reviews/fetch/admin`, {
          withCredentials: true,
        });
        setReviews(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (err) {
        toast.error("Failed to fetch reviews.", { id: "123" });
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [cacheKey]);

  useEffect(() => {
    let filtered = reviews;
    if (statusFilter === "Pending") {
      filtered = reviews.filter((review) => review.status === "pending");
    } else if (statusFilter === "Published") {
      filtered = reviews.filter((review) => review.status === "published");
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredReviews(filtered);
  }, [statusFilter, reviews, searchTerm]);

  const confirmDelete = (reviewId) => {
    setSelectedReview({ id: reviewId, status: "delete" });
    setToggleDelete(true);
  };

  const confirmStatus = (id, status) => {
    setSelectedReview({ id: id, status: status });
    setToggleStatus(true);
  };

  const handleReviewDelete = async () => {
    if (!selectedReview.id) return;
    toast.loading("Deleting review...", { id: "deleteToast" });
    try {
      const res = await axios.post(
        `${API_URL}/reviews/delete`,
        { reviewId: selectedReview.id },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "deleteToast" });
      } else {
        const { reviews, lastUpdated } = data;
        setReviews(reviews);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: reviews, lastUpdated })
        );
        toast.success("Review deleted successfully.", { id: "deleteToast" });
        setToggleDelete(false);
        setSelectedReview({ id: null, status: "" });
      }
    } catch (error) {
      toast.error("Failed to delete review.", { id: "deleteToast" });
    }
  };

  const handleReviewStatus = async () => {
    if (!selectedReview.id && selectedReview.status == "") return;
    toast.loading("Updating review status...", { id: "123" });
    try {
      const res = await axios.put(
        `${API_URL}/reviews/status`,
        { reviewId: selectedReview.id, status: selectedReview.status },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "123" });
      } else {
        const { reviews, lastUpdated, message } = data;
        setReviews((rev) =>
          rev.map((review) =>
            review._id === selectedReview.id
              ? {
                  ...review,
                  status:
                    selectedReview.status === "pending"
                      ? "pending"
                      : "published",
                }
              : review
          )
        );
        setFilteredReviews((rev) =>
          rev.map((review) =>
            review._id === selectedReview.id
              ? {
                  ...review,
                  status:
                    selectedReview.status === "pending"
                      ? "pending"
                      : "published",
                }
              : review
          )
        );
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: reviews, lastUpdated })
        );
        toast.success(message, { id: "123" });
        setToggleStatus(false);
        setSelectedReview({ id: null, status: "" });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Unable to process your request. Please try again",
          {
            id: "deleteToast",
          }
        );
      } else {
        toast.error("An unknown error occured. Please try again.", {
          id: "deleteToast",
        });
      }
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (!reviews || reviews.length < 1) {
    return <NoRecord />;
  }

  const tableHeaders = [
    "Date Created",
    "Full Name",
    "Email",
    "Type",
    "Country",
    "Rating",
    "Agent",
    "Status",
    "Property",
    "Action",
  ];

  return (
    <>
      <article className="flex flex-col gap-5">
        <main className="flex flex-col divide-y divide-zinc-200 w-full p-5 bg-white rounded-3xl">
          <span className="text-2xl flex items-center gap-2 font-semibold pb-6">
            Reviews{" "}
            <span className="text-white bg-zinc-950 p-1 px-2 rounded-lg text-xs">
              {reviews.length}
            </span>
          </span>
          <section className="flex items-center justify-between pt-4">
            <main className="flex items-center gap-2 bg-zinc-100 rounded-full pl-4 p-2 w-full max-w-[350px]">
              <BiSearch />
              <input
                type="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="Search anything"
                className="placeholder:text-xs outline-none bg-transparent text-sm text-zinc-500 pr-6"
              />
            </main>
            <main className="flex items-center p-1 rounded-2xl w-max text-xs border-[1.5px] border-zinc-950">
              {categories.map((filter) => (
                <span
                  key={filter.name}
                  onClick={() => setStatusFilter(filter.name)}
                  className={`rounded-xl px-6 py-1.5 cursor-pointer transition duration-200 ${
                    statusFilter === filter.name
                      ? "bg-zinc-950 text-white"
                      : "hover:bg-white"
                  }`}
                >
                  {filter.name}
                </span>
              ))}
            </main>
          </section>
        </main>

        <main className="flex flex-col w-full bg-white rounded-3xl p-4">
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={header}>
                    <div className="flex items-center gap-0.5">
                      {header} <HiOutlineChevronUpDown />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="mt-4">
              {filteredReviews.map((review) => (
                <tr key={review._id} className="table-row">
                  <td>
                    {format(parseISO(review.createdAt), "E, d MMMM yyyy")}
                  </td>
                  <td>{review.fullname}</td>
                  <td>{review.email}</td>
                  <td>{review.reviewType}</td>
                  <td>{review.country}</td>
                  <td>
                    <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < review.rating ? <FaStar /> : <FaRegStar />}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/agent/${review.agent._id}`}
                      className="flex items-center gap-1"
                    >
                      {review.agent.profilePhoto && (
                        <span className="h-5 w-5 rounded-full">
                          <img
                            src={review.agent.profilePhoto}
                            className="h-full w-full rounded-full"
                            alt={review.agent.firstname}
                          />
                        </span>
                      )}

                      {`${review.agent.firstname} ${
                        review.agent.lastname || ""
                      }`}
                    </Link>
                  </td>
                  <td>
                    <span
                      className={`px-3 rounded-full w-max py-0.5 flex items-center gap-1 ${
                        review.status === "published"
                          ? "bg-green-100 text-green-950"
                          : "bg-amber-100"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          review.status === "published"
                            ? "bg-green-500"
                            : "bg-amber-500"
                        }`}
                      ></span>
                      <p className="capitalize">{review.status}</p>
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/listing/${review.property._id}`}
                      className="w-max flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5"
                    >
                      <IoEyeOutline /> View property
                    </Link>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        onClick={() => {
                          setToggleMessage({
                            modal: true,
                            message: review.message,
                          });
                        }}
                        className="h-6 w-6 rounded-md flex items-center justify-center border bg-zinc-950 text-white border-zinc-200 cursor-pointer"
                      >
                        <MdOutlineMessage />
                      </span>
                      {review.status == "pending" ? (
                        <span
                          onClick={() => confirmStatus(review._id, "published")}
                          className="h-6 w-6 rounded-md flex items-center justify-center border bg-green-500 text-white border-zinc-200 cursor-pointer"
                        >
                          <LuBadgeCheck />
                        </span>
                      ) : (
                        <span
                          onClick={() => confirmStatus(review._id, "pending")}
                          className="h-6 w-6 rounded-md flex items-center justify-center border bg-orange-500 text-white border-zinc-200 cursor-pointer"
                        >
                          <LuBan />
                        </span>
                      )}
                      <span
                        onClick={() => confirmDelete(review._id)}
                        className="h-6 w-6 rounded-md flex items-center justify-center border bg-[#f30000] text-white border-zinc-200 cursor-pointer"
                      >
                        <IoTrashOutline />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </article>

      {toggleMessage.modal && (
        <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50">
          <section
            className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[450px] w-full fixed md:relative bottom-0 `}
          >
            <h2 className="font-semibold text-xl">Review Message</h2>
            <p className="text-sm font-medium text-center bg-zinc-100 p-4 rounded-2xl">
              {toggleMessage.message}
            </p>

            <div
              onClick={() => setToggleMessage({ modal: false, message: "" })}
              className="h-7 w-7 flex items-center justify-center text-sm bg-[#f2f2f2] absolute top-4 right-4 rounded-full cursor-pointer"
            >
              <FaXmark />
            </div>
          </section>
        </section>
      )}

      {toggleDelete && (
        <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50">
          <section
            className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[450px] w-full fixed md:relative bottom-0 `}
          >
            <FaCircleExclamation className="text-[#fe0000] text-7xl" />
            <div className="flex flex-col gap-1 items-center">
              <h2 className="font-semibold text-xl">Are you sure?</h2>

              <p className="text-sm font-medium text-center">
                Deleting this review is permanent and irreversible. You will
                lose this record.
              </p>
            </div>

            <div className="flex items-center w-full gap-4">
              <span
                onClick={() => setToggleDelete(false)}
                className="flex text-xs items-center justify-center gap-2 border border-zinc-300 text-zinc-950 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Cancel
              </span>
              <button
                onClick={handleReviewDelete}
                className="flex text-xs items-center justify-center shrink gap-2 text-white bg-[#f30000] font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Yes, delete this review
              </button>
            </div>
          </section>
        </section>
      )}

      {toggleStatus && (
        <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50">
          <section
            className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[450px] w-full fixed md:relative bottom-0 `}
          >
            <FaCircleExclamation className="text-[#fe0000] text-7xl" />
            <div className="flex flex-col gap-1 items-center">
              <h2 className="font-semibold text-xl">Are you sure?</h2>

              <p className="text-sm font-medium text-center">
                Are you sure you want to update this review status? Once
                confirmed, the changes will be saved and visible to users.
              </p>
            </div>

            <div className="flex items-center w-full gap-4">
              <span
                onClick={() => setToggleStatus(false)}
                className="flex text-xs items-center justify-center gap-2 border border-zinc-300 text-zinc-950 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Cancel
              </span>
              <button
                onClick={handleReviewStatus}
                className="flex text-xs items-center justify-center shrink gap-2 text-white bg-zinc-950 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Yes, proceed
              </button>
            </div>
          </section>
        </section>
      )}
    </>
  );
}
