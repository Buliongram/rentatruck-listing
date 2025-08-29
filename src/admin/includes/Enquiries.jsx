import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "../components/CircularProgress";
import GreenSpinner from "../components/GreenSpinner";
import {
  MdMessage,
  MdOutlineMessage,
  MdOutlinePermPhoneMsg,
} from "react-icons/md";
import { FaRegNewspaper, FaSquareWhatsapp } from "react-icons/fa6";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaUsers } from "react-icons/fa";
import Loader from "../../components/Loader";
import NoRecord from "../../components/NoRecord";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Enquiries({ listings, agents, fetching }) {
  const user = useSelector((state) => state.user);
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState({ type: "", status: false });
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading({ type: "enquiry", status: true });
      const cacheKey = `househunter-enquiry-cache-dadmin-dashboard-${user._id}`;
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
        toast.error("Failed to fetch enquiries.");
      } finally {
        setLoading({ type: "enquiry", status: false });
      }
    };
    const fetchUsers = async () => {
      setLoading({ type: "user", status: true });
      const cacheKey = `househunter-enquiry-cache-dadmin-dashboard-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/user/updatedAt`, {
          withCredentials: true,
        });
        if (cached && cached.lastUpdated === lastUpdated) {
          setUsers(cached.data);
          return;
        }
        const { data } = await axios.get(`${API_URL}/user/fetch`, {
          withCredentials: true,
        });
        setUsers(data);
        localStorage.setItem(
          `househunter-user-cache-dadmin-dashboard-${user._id}`,
          JSON.stringify({ data, lastUpdated })
        );
      } catch (err) {
        toast.error("Failed to fetch users.");
      } finally {
        setLoading({ type: "user", status: false });
      }
    };
    fetchUsers();
    fetchEnquiries();
  }, []);
  const tableHeaders = [
    "Name",
    "Phone Number",
    "Email",
    "Country",
    "Message",
    "Status",
  ];

  const data = {
    labels: ["ENQUIRIES", "LISTINGS", "AGENTS", "USERS", "BLOGS", "CONTACTS"],
    datasets: [
      {
        label: "HOUSE HUNTER BREAKDOWN",
        data: [
          enquiries?.length || 0,
          listings?.length || 0,
          agents?.length || 0,
          users?.length || 0,
          blogs?.length || 0,
          contacts?.length || 0,
        ],
        backgroundColor: [
          "#f54900",
          "#4f39f6",
          "#00c950",
          "#fe9a00",
          "oklch(51.8% 0.253 323.949)",
          "oklch(64.8% 0.2 131.684)",
        ],
        borderColor: [
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const phoneEnquiry =
    enquiries?.filter((prop) => prop.medium == "phone").length || 0;
  const whatsappEnquiry =
    enquiries?.filter((prop) => prop.medium == "whatsapp").length || 0;
  const messageEnquiry =
    enquiries?.filter((prop) => prop.medium == "message").length || 0;
  return (
    <>
      <section className="w-full flex items-center gap-4">
        <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs text-zinc-500">Total Enquiries</p>
            <h3 className="font-bold text-2xl font-primary">
              {loading.type === "enquiry" && loading.status ? (
                <GreenSpinner />
              ) : (
                <>{enquiries && enquiries.length}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (Number(enquiries?.length) / Number(enquiries?.length)) * 100 || 0
            }
            color={"#155dfc"}
          />
        </article>
        <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs text-zinc-500 ">Message</p>
            <h3 className="font-bold text-2xl text-orange-600 font-primary">
              {loading.type === "enquiry" && loading.status ? (
                <GreenSpinner />
              ) : (
                <>{messageEnquiry}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (Number(messageEnquiry) / Number(enquiries?.length)) * 100 || 0
            }
            color={"#f54900 "}
            icon={<MdMessage className="text-xl text-orange-600" />}
          />
        </article>

        <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs text-zinc-500">Phone</p>
            <h3 className="font-bold text-2xl font-primary text-indigo-600">
              {loading.type === "enquiry" && loading.status ? (
                <GreenSpinner />
              ) : (
                <>{phoneEnquiry}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (Number(phoneEnquiry) / Number(enquiries?.length)) * 100 || 0
            }
            color={"#4f39f6"}
            icon={<MdOutlinePermPhoneMsg className="text-xl text-indigo-600" />}
          />
        </article>
        <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs text-zinc-500 ">WhatsApp</p>
            <h3 className="font-bold text-2xl font-primary text-green-500">
              {loading.type === "enquiry" && loading.status ? (
                <GreenSpinner />
              ) : (
                <>{whatsappEnquiry}</>
              )}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (Number(whatsappEnquiry) / Number(enquiries?.length)) * 100 || 0
            }
            color={"#00c950"}
            icon={<FaSquareWhatsapp className="text-xl text-green-500" />}
          />
        </article>
      </section>

      <main className="flex flex-col w-full gap-5 bg-white rounded-3xl p-4 min-h-[300px]">
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold">Latest Enquiries</span>
          <Link
            to={"/admin/enquiries"}
            className="text-xs bg-blue-600 text-white px-3 rounded-full py-1.5 w-max flex items-center gap-0.5"
          >
            <IoEyeOutline /> View all
          </Link>
        </div>

        {loading.type === "enquiry" && loading.status ? (
          <Loader padding={10} text={"Loading Enquiries"} />
        ) : (
          <>
            {enquiries && enquiries.length > 0 ? (
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
                  {enquiries.slice(0, 4).map((enquiry) => (
                    <tr key={enquiry._id} className="table-row">
                      <td>{enquiry.name}</td>
                      <td>{enquiry.number}</td>
                      <td>{enquiry.email}</td>
                      <td>{enquiry.country}</td>
                      <td>{`${enquiry.message.slice(0, 40)}....`}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoRecord
                fontSize={12}
                margin={5}
                text={"No enquiry record found"}
              />
            )}
          </>
        )}
      </main>

      <section className="w-full flex gap-4">
        <article className="p-6 rounded-3xl flex flex-col items-center justify-center w-full max-h-[350px] gap-4 bg-white">
          <PolarArea data={data} options={options} />
        </article>
        <section className="flex flex-col gap-2 w-full max-h-[350px]">
          <main className="flex items-center gap-2 w-full h-full">
            <article className="bg-white rounded-2xl p-4 w-full h-full flex items-center justify-between">
              <main className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500">Total Blogs</p>
                <h3 className="font-bold text-2xl font-primary">
                  {loading.type === "blog" && loading.status ? (
                    <GreenSpinner />
                  ) : (
                    <>{blogs && blogs.length}</>
                  )}
                </h3>
              </main>
              <CircularProgress
                percentage={
                  (Number(blogs.length) / Number(blogs?.length)) * 100 || 0
                }
                color={"#155dfc"}
                icon={<FaRegNewspaper className="text-2xl text-blue-600" />}
              />
            </article>
            <article className="bg-white rounded-2xl p-4 w-full h-full flex items-center justify-between">
              <main className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500">Published Blogs</p>
                <h3 className="font-bold text-2xl font-primary">
                  {loading.type === "blog" && loading.status ? (
                    <GreenSpinner />
                  ) : (
                    <>
                      {blogs?.filter((prop) => prop.status == "published")
                        .length || 0}
                    </>
                  )}
                </h3>
              </main>
              <CircularProgress
                percentage={
                  (Number(
                    blogs?.filter((prop) => prop.status == "published")
                      .length || 0
                  ) /
                    Number(blogs?.length)) *
                    100 || 0
                }
                color={"oklch(51.8% 0.253 323.949)"}
                icon={<FaRegNewspaper className="text-2xl text-fuchsia-700" />}
              />
            </article>
          </main>
          <main className="flex items-center gap-2 w-full h-full">
            <article className="bg-white rounded-2xl p-4 w-full h-full flex items-center justify-between">
              <main className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500">Total Users</p>
                <h3 className="font-bold text-2xl font-primary">
                  {loading.type === "user" && loading.status ? (
                    <GreenSpinner />
                  ) : (
                    <>{users && users.length}</>
                  )}
                </h3>
              </main>
              <CircularProgress
                percentage={
                  (Number(users.length) / Number(users?.length)) * 100 || 0
                }
                color={"#18181b"}
                icon={<FaUsers className="text-2xl text-zinc-900" />}
              />
            </article>
            <article className="bg-white rounded-2xl p-4 w-full h-full flex items-center justify-between">
              <main className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500">Active Users</p>
                <h3 className="font-bold text-2xl font-primary">
                  {loading.type === "user" && loading.status ? (
                    <GreenSpinner />
                  ) : (
                    <>
                      {users?.filter((prop) => prop.status == "active")
                        .length || 0}
                    </>
                  )}
                </h3>
              </main>
              <CircularProgress
                percentage={
                  (Number(
                    users?.filter((prop) => prop.status == "active").length || 0
                  ) /
                    Number(users?.length)) *
                    100 || 0
                }
                color={"oklch(72.3% 0.219 149.579)"}
                icon={<FaUsers className="text-2xl text-green-500" />}
              />
            </article>
          </main>
          <main className="flex items-center gap-2 w-full h-full">
            <article className="bg-white rounded-2xl p-4 w-full h-full flex items-center justify-between">
              <main className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500">Total Contact</p>
                <h3 className="font-bold text-2xl font-primary">
                  {loading.type === "contact" && loading.status ? (
                    <GreenSpinner />
                  ) : (
                    <>{contacts && contacts.length}</>
                  )}
                </h3>
              </main>
              <CircularProgress
                percentage={
                  (Number(contacts.length) / Number(contacts?.length)) * 100 ||
                  0
                }
                color={"oklch(64.8% 0.2 131.684)"}
                icon={<MdOutlineMessage className="text-2xl text-lime-600" />}
              />
            </article>
            <article className="bg-white rounded-2xl p-4 w-full h-full flex items-center justify-between">
              <main className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500">Unread Contact</p>
                <h3 className="font-bold text-2xl font-primary">
                  {loading.type === "contact" && loading.status ? (
                    <GreenSpinner />
                  ) : (
                    <>
                      {contacts?.filter((prop) => prop.status == "unread")
                        .length || 0}
                    </>
                  )}
                </h3>
              </main>
              <CircularProgress
                percentage={
                  (Number(
                    contacts?.filter((prop) => prop.status == "unread")
                      .length || 0
                  ) /
                    Number(contacts?.length)) *
                    100 || 0
                }
                color={"oklch(70.5% 0.213 47.604)"}
                icon={<MdOutlineMessage className="text-2xl text-orange-500" />}
              />
            </article>
          </main>
        </section>
      </section>
    </>
  );
}
