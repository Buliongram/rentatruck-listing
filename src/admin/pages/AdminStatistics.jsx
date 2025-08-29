import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "../components/CircularProgress";
import GreenSpinner from "../components/GreenSpinner";
import toast from "react-hot-toast";
export default function AdminStatistics() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;

  const user = useSelector((state) => state.user);
  const [fetching, setFetching] = useState({ type: "", status: false });
  const [data, setData] = useState([]);
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
    const fetchAgents = async () => {
      setFetching({ type: "agent", status: true });
      const cacheKey = `househunter-agent-cache-admin-dashboard-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/user/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setAgents(cached.data);
          setFetching({ type: "agent", status: false });
          return;
        }
        const { data } = await axios.get(
          `${API_URL}/statistics/agent/fetch/admin`,
          {
            withCredentials: true,
          }
        );
        setAgents(data);
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
        setFetching({ type: "agent", status: false });
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

    fetchListings();
    // fetchAgents();
    fetchUsers();
    // fetchReviews();
    // fetchContacts();
    // fetchBlogs();
    // fetchEnquiries();
  }, []);
  const activeListings =
    listings?.filter((prop) => prop.status == "active").length || 0;
  const pendingListing =
    listings?.filter((prop) => prop.status == "pending").length || 0;
  const archivedListing =
    listings?.filter((prop) => prop.status == "archived").length || 0;
  const soldListing =
    listings?.filter((prop) => prop.status == "sold").length || 0;
  const rentedListing =
    listings?.filter((prop) => prop.status == "rented").length || 0;
  return (
    <article className="flex flex-col gap-4">
      <section className="w-full flex items-center gap-2">
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium text-zinc-600 leading-tight">
              Total Properties
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "listing" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>{listings && listings.length}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(listings.length) / Number(listings?.length)) *
                100
              ).toFixed(1) || 0
            }
            color={"#155dfc"}
          />
        </article>

        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium text-zinc-600 leading-tight">
              Published Properties
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "listing" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>{activeListings}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(activeListings) / Number(listings?.length)) *
                100
              ).toFixed(1) || 0
            }
            color={"#007a55"}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium leading-tight text-zinc-600 ">
              Pending Properties
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "listing" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>{pendingListing}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(pendingListing) / Number(listings?.length)) *
                100
              ).toFixed(1) || 0
            }
            color={"#ff6900 "}
          />
        </article>

        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium leading-tight text-zinc-600 ">
              Rented Properties
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "listing" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>{rentedListing}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(rentedListing) / Number(listings?.length)) *
                100
              ).toFixed(1) || 0
            }
            color={"#721378"}
          />
        </article>

        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium leading-tight text-zinc-600 ">
              Sold Properties
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "listing" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>{soldListing}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              ((Number(soldListing) / Number(listings?.length)) * 100).toFixed(
                1
              ) || 0
            }
            color={"oklch(72.3% 0.219 149.579)"}
          />
        </article>

        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium leading-tight text-zinc-600 ">
              Archived Properties
            </p>
            <h3 className="font-bold text-2xl font-primary">
              {fetching.type === "listing" && fetching.status ? (
                <GreenSpinner />
              ) : (
                <>{archivedListing}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(archivedListing) / Number(listings?.length)) *
                100
              ).toFixed(1) || 0
            }
            color={"#09090b "}
          />
        </article>
      </section>
      {agents.length}

      <section className="w-full flex items-center gap-2">
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium text-zinc-600 leading-tight">
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
            <p className="text-xs font-medium text-zinc-600 leading-tight">
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
              ).toFixed(1) || 0
            }
            color={"oklch(62.7% 0.194 149.214)"}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium leading-tight text-zinc-600 ">
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
              ).toFixed(1) || 0
            }
            color={"#ff6900 "}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium leading-tight text-zinc-600 ">
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
              ).toFixed(1) || 0
            }
            color={"#fe0000"}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium leading-tight text-zinc-600 ">
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
              ).toFixed(1) || 0
            }
            color={"oklch(72.3% 0.219 149.579)"}
          />
        </article>
        <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs font-medium leading-tight text-zinc-600 ">
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
              ).toFixed(1) || 0
            }
            color={"#09090b "}
          />
        </article>
      </section>
    </article>
  );
}
