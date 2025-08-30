import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "../components/CircularProgress";
import GreenSpinner from "../components/GreenSpinner";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Properties from "../includes/statistics/Properties";
import Users from "../includes/statistics/Users";
import Agents from "../includes/statistics/Agents";
import Reviews from "../includes/statistics/Reviews";
import Enquiry from "../includes/statistics/Enquiries";
import Contacts from "../includes/statistics/Contacts";
export default function AdminStatistics() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;

  const user = useSelector((state) => state.user);
  const [fetching, setFetching] = useState({ type: "", status: false });
  const [data, setData] = useState({
    activeListings: [],
    soldListings: [],
    rentedListings: [],
    users: [],
    agents: [],
  });

  const [listings, setListings] = useState([]);
  const [agents, setAgents] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      setFetching({ type: "listing", status: true });
      const cacheKey = `househunter-listing-cache-admin-dashboard-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/listing/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setListings(cached.data);
          setFetching({ type: "listing", status: false });
          return;
        }
        const { data } = await axios.get(
          `${API_URL}/statistics/listing/fetch/admin`,
          {
            withCredentials: true,
          }
        );
        setListings(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (error) {
        console.error(error);
        if (error.response?.data) {
          toast.error(
            error.response.data.message ||
              "Unable to perfom your request. Please try again.",
            {
              id: "123",
            }
          );
        } else {
          toast.error("Unable to perfom your request. Please try again.", {
            id: "123",
          });
        }
      } finally {
        setFetching({ type: "listing", status: false });
      }
    };
    const fetchUsers = async () => {
      setFetching({ type: "user", status: true });
      const cacheKey = `househunter-user-cache-admin-dashboard-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/user/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setUsers(cached.data.filter((data) => data.role === "User"));
          setAgents(cached.data.filter((data) => data.role === "Agent"));
          setFetching({ type: "user", status: false });
          return;
        }
        const { data } = await axios.get(
          `${API_URL}/statistics/user/fetch/admin`,
          {
            withCredentials: true,
          }
        );
        setUsers(data.filter((data) => data.role === "User"));
        setAgents(data.filter((data) => data.role === "Agent"));
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (error) {
        console.error(error);
        if (error.response?.data) {
          toast.error(
            error.response.data.message ||
              "Unable to perfom your request. Please try again.",
            {
              id: "123",
            }
          );
        } else {
          toast.error("Unable to perfom your request. Please try again.", {
            id: "123",
          });
        }
      } finally {
        setFetching({ type: "user", status: false });
      }
    };
    const fetchReviews = async () => {
      setFetching({ type: "review", status: true });
      const cacheKey = `househunter-review-cache-admin-dashboard-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/review/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setReviews(cached.data);
          setFetching({ type: "review", status: false });
          return;
        }
        const { data } = await axios.get(
          `${API_URL}/statistics/review/fetch/admin`,
          {
            withCredentials: true,
          }
        );
        setReviews(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (error) {
        console.error(error);
        if (error.response?.data) {
          toast.error(
            error.response.data.message ||
              "Unable to perfom your request. Please try again.",
            {
              id: "123",
            }
          );
        } else {
          toast.error("Unable to perfom your request. Please try again.", {
            id: "123",
          });
        }
      } finally {
        setFetching({ type: "review", status: false });
      }
    };
    const fetchContacts = async () => {
      setFetching({ type: "contact", status: true });
      const cacheKey = `househunter-contact-cache-admin-dashboard-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/contact/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setContacts(cached.data);
          setFetching({ type: "contact", status: false });
          return;
        }
        const { data } = await axios.get(
          `${API_URL}/statistics/contact/fetch/admin`,
          {
            withCredentials: true,
          }
        );
        setContacts(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (error) {
        console.error(error);
        if (error.response?.data) {
          toast.error(
            error.response.data.message ||
              "Unable to perfom your request. Please try again.",
            {
              id: "123",
            }
          );
        } else {
          toast.error("Unable to perfom your request. Please try again.", {
            id: "123",
          });
        }
      } finally {
        setFetching({ type: "contact", status: false });
      }
    };
    const fetchBlogs = async () => {
      setFetching({ type: "blog", status: true });
      const cacheKey = `househunter-blog-cache-admin-dashboard-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/blog/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setBlogs(cached.data);
          setFetching({ type: "blog", status: false });
          return;
        }
        const { data } = await axios.get(
          `${API_URL}/statistics/blog/fetch/admin`,
          {
            withCredentials: true,
          }
        );
        setBlogs(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (error) {
        console.error(error);
        if (error.response?.data) {
          toast.error(
            error.response.data.message ||
              "Unable to perfom your request. Please try again.",
            {
              id: "123",
            }
          );
        } else {
          toast.error("Unable to perfom your request. Please try again.", {
            id: "123",
          });
        }
      } finally {
        setFetching({ type: "blog", status: false });
      }
    };
    const fetchEnquiries = async () => {
      setFetching({ type: "enquiry", status: true });
      const cacheKey = `househunter-enquiry-cache-admin-dashboard-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/enquiry/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setEnquiries(cached.data);
          setFetching({ type: "enquiry", status: false });
          return;
        }
        const { data } = await axios.get(
          `${API_URL}/statistics/enquiry/fetch/admin`,
          {
            withCredentials: true,
          }
        );
        setEnquiries(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (error) {
        console.error(error);
        if (error.response?.data) {
          toast.error(
            error.response.data.message ||
              "Unable to perfom your request. Please try again.",
            {
              id: "123",
            }
          );
        } else {
          toast.error("Unable to perfom your request. Please try again.", {
            id: "123",
          });
        }
      } finally {
        setFetching({ type: "enquiry", status: false });
      }
    };
    const fetchData = async () => {
      setFetching({ type: "chart", status: true });
      try {
        const res = await axios.get(`${API_URL}/statistics/combined-stats`, {
          withCredentials: true,
        });

        const listingsData = res.data.listings;
        const usersData = res.data.usersByMonth;
        const reviewData = res.data.reviewsByMonth;
        const enquiryData = res.data.enquiriesByMonth;
        const contactData = res.data.contactsByMonth;

        const now = new Date();
        const activeListings = [];
        const soldListings = [];
        const rentedListings = [];
        const users = [];
        const agents = [];
        const reviews = [];
        const enquiries = [];
        const contacts = [];

        // Create maps for quick data lookup
        const listingsMap = listingsData.reduce((acc, yearData) => {
          yearData.months.forEach((monthData) => {
            const key = `${yearData._id}-${monthData.month}`;
            if (!acc[key]) acc[key] = {};
            acc[key][monthData.status] = monthData.count;
          });
          return acc;
        }, {});

        const usersMap = usersData.reduce((acc, yearData) => {
          yearData.months.forEach((monthData) => {
            const key = `${yearData._id}-${monthData.month}`;
            if (!acc[key]) acc[key] = {};
            acc[key][monthData.role] = monthData.count;
          });
          return acc;
        }, {});

        const reviewsMap = reviewData.reduce((acc, item) => {
          const key = `${item._id.year}-${item._id.month}`;
          acc[key] = item.count;
          return acc;
        }, {});

        const enquiryMap = enquiryData.reduce((acc, item) => {
          const key = `${item._id.year}-${item._id.month}`;
          acc[key] = item.count;
          return acc;
        }, {});

        const contactMap = contactData.reduce((acc, item) => {
          const key = `${item._id.year}-${item._id.month}`;
          acc[key] = item.count;
          return acc;
        }, {});

        // Single loop to process all data types
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const year = d.getFullYear();
          const month = d.getMonth() + 1;
          const label = d.toLocaleDateString("en-US", { month: "short" });
          const key = `${year}-${month}`;

          const listingsCounts = listingsMap[key] || {};
          activeListings.push({
            date: label,
            count: listingsCounts.active || 0,
          });
          soldListings.push({ date: label, count: listingsCounts.sold || 0 });
          rentedListings.push({
            date: label,
            count: listingsCounts.rented || 0,
          });

          const usersCounts = usersMap[key] || {};
          users.push({ date: label, count: usersCounts.User || 0 });
          agents.push({ date: label, count: usersCounts.Agent || 0 });

          reviews.push({ date: label, count: reviewsMap[key] || 0 });
          enquiries.push({ date: label, count: enquiryMap[key] || 0 });
          contacts.push({ date: label, count: contactMap[key] || 0 });
        }

        setData({
          activeListings,
          soldListings,
          rentedListings,
          users,
          agents,
          reviews,
          enquiries,
          contacts,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setFetching({ type: "chart", status: false });
      }
    };

    fetchData();
    fetchListings();
    fetchUsers();
    fetchReviews();
    fetchContacts();
    // fetchBlogs();
    fetchEnquiries();
  }, []);

  return (
    <article className="flex flex-col gap-4">
      <Properties fetching={fetching} listings={listings} data={data} />
      <Users fetching={fetching} users={users} data={data} />

      <Agents fetching={fetching} agents={agents} data={data} />
      <Reviews fetching={fetching} reviews={reviews} data={data} />
      <Enquiry fetching={fetching} enquiries={enquiries} data={data} />
      <Contacts fetching={fetching} contacts={contacts} data={data} />

      {/* <section className="w-full flex items-center gap-4">
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold leading-tight text-zinc-600">
              Total Users
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "user" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>{users && users.length}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              ((Number(users.length) / Number(users?.length)) * 100).toFixed(
                1
              ) || 0
            }
            color={"#155dfc"}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold leading-tight text-zinc-600">
              Active Users
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "user" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>
                  {users?.filter((prop) => prop.status == "active").length || 0}
                </>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(
                  users?.filter((prop) => prop.status == "active").length || 0
                ) /
                  Number(users?.length)) *
                100
              ) || 0
            }
            color={"oklch(62.7% 0.194 149.214)"}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
              Suspended Users
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "user" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>
                  {users?.filter((prop) => prop.status == "suspended").length ||
                    0}
                </>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(
                  users?.filter((prop) => prop.status == "suspended").length ||
                    0
                ) /
                  Number(users?.length)) *
                100
              ) || 0
            }
            color={"#ff6900 "}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
              Banned Users
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "user" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>
                  {users?.filter((prop) => prop.status == "banned").length || 0}
                </>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(
                  users?.filter((prop) => prop.status == "banned").length || 0
                ) /
                  Number(users?.length)) *
                100
              ) || 0
            }
            color={"#fe0000"}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
              Verified Users
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "user" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>
                  {users?.filter((prop) => prop.kycStatus == "verified")
                    .length || 0}
                </>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(
                  users?.filter((prop) => prop.kycStatus == "verified")
                    .length || 0
                ) /
                  Number(users?.length)) *
                100
              ) || 0
            }
            color={"oklch(72.3% 0.219 149.579)"}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
              Unverified Users
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "user" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>
                  {users?.filter((prop) => prop.kycStatus == "unverified")
                    .length || 0}
                </>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(
                  users?.filter((prop) => prop.kycStatus == "unverified")
                    .length || 0
                ) /
                  Number(users?.length)) *
                100
              ) || 0
            }
            color={"#09090b "}
          />
        </article>
      </section> */}
    </article>
  );
}
