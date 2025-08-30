import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoRecord from "../../components/NoRecord";
import { BiSearch } from "react-icons/bi";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { MdOutlineMessage } from "react-icons/md";
import {
  IoEyeOutline,
  IoHome,
  IoHomeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";

const API_URL =
  window.location.hostname === "localhost"
    ? `http://localhost:5000/api`
    : `https://rentahome-server.onrender.com/api`;

export default function AdminLeads() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleMessage, setToggleMessage] = useState({
    modal: false,
    message: "",
  });
  const cacheKey = `househunter-enquiry-cache-admin-dashboard-${user._id}`;
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);

  const categories = [{ name: "All" }, { name: "Active" }, { name: "Read" }];

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/enquiry/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setEnquiries(cached.data);
          return;
        }
        const { data } = await axios.get(`${API_URL}/enquiry/fetch`, {
          withCredentials: true,
        });
        setEnquiries(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (err) {
        toast.error("Failed to fetch enquiries.", { id: "123" });
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, [cacheKey]);

  useEffect(() => {
    let filtered = enquiries;
    if (statusFilter === "Read") {
      filtered = enquiries.filter((enquiry) => enquiry.isRead);
    } else if (statusFilter === "Unread") {
      filtered = enquiries.filter((enquiry) => !enquiry.isRead);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (enquiry) =>
          enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredEnquiries(filtered);
  }, [statusFilter, enquiries, searchTerm]);

  const confirmDelete = (enquiryId) => {
    setEnquiryToDelete(enquiryId);
    setToggleDelete(true);
  };

  const handleEnquiryDelete = async () => {
    if (!enquiryToDelete) return;
    toast.loading("Deleting enquiry...", { id: "deleteToast" });
    try {
      const res = await axios.post(
        `${API_URL}/enquiry/delete`,
        { enquiryId: enquiryToDelete },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "deleteToast" });
      } else {
        const { enquiries, lastUpdated } = data;
        setEnquiries(enquiries);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: enquiries, lastUpdated })
        );
        toast.success("Enquiry deleted successfully.", { id: "deleteToast" });
        setToggleDelete(false);
        setEnquiryToDelete(null);
      }
    }  catch (error) {
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

  const handleMarkAsRead = async (enquiryId) => {
    try {
      await axios.post(
        `${API_URL}/enquiry/mark-read`,
        { enquiryId },
        { withCredentials: true }
      );

      setEnquiries((prev) =>
        prev.map((enquiry) =>
          enquiry._id === enquiryId ? { ...enquiry, isRead: true } : enquiry
        )
      );
    } catch (error) {
      toast.error("Failed to mark as read.");
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (!enquiries || enquiries.length < 1) {
    return <NoRecord />;
  }

  return (
    <>
      <article className="flex flex-col gap-5">
        <main className="flex flex-col divide-y divide-zinc-200 w-full p-5 bg-white rounded-3xl">
          <span className="text-2xl flex items-center gap-2 font-semibold pb-6">
            Enquiries{" "}
            <span className="text-white bg-blue-600 p-1 px-2 rounded-lg text-xs">
              {enquiries.length}
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
            <main className="flex items-center p-1 rounded-2xl w-max text-xs border-[1.5px] border-blue-600">
              {categories.map((filter) => (
                <span
                  key={filter.name}
                  onClick={() => setStatusFilter(filter.name)}
                  className={`rounded-xl px-6 py-1.5 cursor-pointer transition duration-200 ${
                    statusFilter === filter.name
                      ? "bg-blue-600 text-white"
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
              <th>
                <div className="flex items-center gap-0.5">
                  Name <HiOutlineChevronUpDown />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-0.5">
                  Phone Number <HiOutlineChevronUpDown />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-0.5">
                  Email <HiOutlineChevronUpDown />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-0.5">
                  Country <HiOutlineChevronUpDown />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-0.5">
                  Agent <HiOutlineChevronUpDown />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-0.5">
                  Status
                  <HiOutlineChevronUpDown />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-0.5">
                  Property ID <HiOutlineChevronUpDown />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-0.5">
                  Action <HiOutlineChevronUpDown />
                </div>
              </th>
            </thead>
            <tbody className="mt-4">
              {filteredEnquiries.map((enquiry) => (
                <tr key={enquiry._id} className="table-row">
                  <td>{enquiry.name}</td>
                  <td>{enquiry.number}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.country}</td>
                  <td>
                    <Link
                      to={`/agent/${enquiry.agentId}`}
                      className="flex items-center gap-1"
                    >
                      <span className="h-5 w-5 rounded-full">
                        <img
                          src={enquiry.agentImage}
                          className="h-full w-full rounded-full"
                          alt={enquiry.agentName}
                        />
                      </span>
                      {enquiry.agentName}
                    </Link>
                  </td>
                  <td>
                    <span
                      className={`px-3 rounded-full w-max py-0.5 flex items-center gap-1 ${
                        enquiry.isRead
                          ? "bg-green-100 text-green-950"
                          : "bg-amber-100"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          enquiry.isRead ? "bg-green-500" : "bg-amber-500"
                        }`}
                      ></span>
                      <p>{enquiry.isRead ? "Read" : "Unread"}</p>
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/listing/${enquiry.propertyId}`}
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
                            message: enquiry.message,
                          });
                          handleMarkAsRead(enquiry._id);
                        }}
                        className="h-6 w-6 rounded-md flex items-center justify-center border bg-blue-600 text-white border-zinc-200 cursor-pointer"
                      >
                        <MdOutlineMessage />
                      </span>
                      <span
                        onClick={() => confirmDelete(enquiry._id)}
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
            <h2 className="font-semibold text-xl">Enquiry Message</h2>
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
            <h2 className="font-semibold text-xl">Are you sure?</h2>
            <p className="text-sm font-medium text-center bg-zinc-100 p-4 rounded-2xl">
              Deleting this enquiry is permanent and irreversible. You will lose
              this record.
            </p>

            <div className="flex items-center w-full gap-4">
              <span
                onClick={() => setToggleDelete(false)}
                className="flex text-xs items-center justify-center gap-2 border border-zinc-300 text-blue-600 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Cancel
              </span>
              <button
                onClick={handleEnquiryDelete}
                className="flex text-xs items-center justify-center shrink gap-2 text-white bg-[#f30000] font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Yes, delete this enquiry
              </button>
            </div>

            <div
              onClick={() => setToggleDelete(false)}
              className="h-7 w-7 flex items-center justify-center text-sm bg-[#f2f2f2] absolute top-4 right-4 rounded-full cursor-pointer"
            >
              <FaXmark />
            </div>
          </section>
        </section>
      )}
    </>
  );
}
