import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiPencil, BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import NoRecord from "../../components/NoRecord";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { MdOutlineMessage } from "react-icons/md";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const API_URL =
  window.location.hostname === "localhost"
    ? `http://localhost:5000/api`
    : `https://rentahome-server.onrender.com/api`;

export default function AdminAgents() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [agentToDelete, setAgentToDelete] = useState(null);
  const [toggleDelete, setToggleDelete] = useState(false);
  const cacheKey = `househunter-agent-cache-admin-dashboard-${user._id}`;
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);

  const categories = [
    { name: "all", type: "all" },
    { name: "active", type: "status" },
    { name: "suspended", type: "status" },
    { name: "banned", type: "status" },
    { name: "verified", type: "kycStatus" },
    { name: "unverified", type: "kycStatus" },
  ];

  const tableHeaders = [
    "Date Joined",
    "Name",
    "Phone Number",
    "Email",
    "Role",
    "Country",
    "Total Listings",
    "Average Rating",
    "Status",
    "KYC Status",
    "Action",
  ];

  const [toggleEdit, setToggleEdit] = useState({
    modal: false,
    firstname: "",
    middlename: "",
    lastname: "",
    number: "",
    email: "",
    role: "",
    status: "",
    agentId: "",
  });

  const clearToggleEdit = () => {
    setToggleEdit({
      modal: false,
      firstname: "",
      middlename: "",
      lastname: "",
      number: "",
      email: "",
      role: "",
      status: "",
      agentId: "",
    });
  };
  const handleChange = (e) => {
    setToggleEdit((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const roles = ["User", "Agent", "Admin"];
  const statuses = ["active", "suspended", "banned"];
  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/agent/updatedAt`, {
          withCredentials: true,
        });
        if (cached && cached.lastUpdated === lastUpdated) {
          setAgents(cached.data);
          return;
        }
        const { data } = await axios.get(`${API_URL}/agent/fetch`, {
          withCredentials: true,
        });
        setAgents(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (err) {
        toast.error("Failed to fetch agents.");
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, [cacheKey]);

  useEffect(() => {
    let filtered = agents;

    if (statusFilter !== "all") {
      const selectedCategory = categories.find(
        (cat) => cat.name === statusFilter
      );
      if (selectedCategory.type === "status") {
        filtered = agents.filter((u) => u.status === statusFilter);
      } else if (selectedCategory.type === "kycStatus") {
        filtered = agents.filter((u) => u.kycStatus === statusFilter);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (agent) =>
          agent.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (agent.lastname &&
            agent.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
          agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (agent.country &&
            agent.country.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredAgents(filtered);
  }, [statusFilter, agents, searchTerm]);

  const handleEditUpload = async (e) => {
    e.preventDefault();
    toast.loading("Editing agent details", { id: "detailsEdit" });
    try {
      const res = await axios.post(`${API_URL}/agent/edit/save`, toggleEdit, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "detailsEdit" });
      } else {
        const { agents, lastUpdated, message } = data;
        setAgents(agents);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: agents, lastUpdated })
        );
        toast.success(message, { id: "detailsEdit" });
        clearToggleEdit();
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Unable to process your request. Please try again",
          {
            id: "detailsEdit",
          }
        );
      } else {
        toast.error("An unknown error occured. Please try again.", {
          id: "detailsEdit",
        });
      }
    }
  };

  const handleAgentDelete = async () => {
    if (!agentToDelete) return;
    toast.loading("Deleting agent...", { id: "deleteToast" });
    try {
      const res = await axios.post(
        `${API_URL}/agent/delete`,
        { agentId: agentToDelete },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "deleteToast" });
      } else {
        const { agents, lastUpdated, message } = data;
        setAgents(agents);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: agents, lastUpdated })
        );
        toast.success(message, { id: "deleteToast" });
        setToggleDelete(false);
        setAgentToDelete(null);
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
  if (!agents || agents.length < 1) {
    return <NoRecord />;
  }

  return (
    <>
      <article className="flex flex-col gap-5">
        <main className="flex flex-col divide-y divide-zinc-200 w-full p-5 bg-white rounded-3xl">
          <span className="text-2xl flex items-center gap-2 font-semibold pb-6">
            Agents{" "}
            <span className="text-white bg-blue-600 p-1 px-2 rounded-lg text-xs">
              {agents.length}
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
                  className={`rounded-xl px-6 py-1.5 cursor-pointer transition duration-200 capitalize ${
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
            <tbody>
              {filteredAgents.map((agent) => (
                <tr key={agent._id}>
                  <td>{format(parseISO(agent.createdAt), "E, d MMMM yyyy")}</td>
                  <td className="capitalize">
                    {agent.firstname} {agent.middlename || ""}{" "}
                    {agent.lastname || ""}
                  </td>
                  <td className="text-blue-600">
                    <a href={`tel:${agent.number}`}>
                      {agent.number || "Not added yet"}
                    </a>
                  </td>
                  <td>
                    <a className="underline" href={`mailto:${agent.email}`}>
                      {agent.email}
                    </a>
                  </td>
                  <td>{agent.role}</td>
                  <td>{agent.country}</td>
                  <td>
                    {" "}
                    {Number(
                      agent.totalisting ? agent.totalisting : 0
                    ).toLocaleString()}
                  </td>

                  <td>
                    {Number(
                      agent.averageRating ? agent.averageRating : 0
                    ).toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`px-3 rounded-full w-max py-0.5 flex items-center gap-1 ${
                        agent.status === "active"
                          ? "bg-green-100 text-green-950"
                          : "bg-red-100 text-red-950"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          agent.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <p className="capitalize">{agent.status}</p>
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-3 rounded-full w-max py-0.5 flex items-center gap-1 ${
                        agent.kycStatus === "verified"
                          ? "bg-green-100 text-green-950"
                          : "bg-amber-100 text-amber-950"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          agent.kycStatus === "verified"
                            ? "bg-green-500"
                            : "bg-amber-500"
                        }`}
                      ></span>
                      <p className="capitalize">{agent.kycStatus}</p>
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        onClick={() => {
                          setToggleEdit({
                            modal: true,
                            firstname: agent.firstname,
                            lastname: agent.lastname || "",
                            middlename: agent.middlename,
                            email: agent.email,
                            number: agent.number,
                            agentId: agent._id,
                            role: agent.role,
                            status: agent.status,
                          });
                        }}
                        className="h-6 w-6 rounded-md flex items-center justify-center border bg-blue-600 text-white border-zinc-200 cursor-pointer"
                      >
                        <BiPencil />
                      </span>
                      <Link
                        to={`/agent/single/${agent._id}`}
                        className="h-6 w-6 rounded-md flex items-center justify-center border bg-fuchsia-700 text-white border-zinc-200 cursor-pointer"
                      >
                        <IoEyeOutline />
                      </Link>
                      <span
                        onClick={() => {
                          setAgentToDelete(agent._id);
                          setToggleDelete(true);
                        }}
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

      {toggleEdit.modal && (
        <form
          onSubmit={handleEditUpload}
          className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50"
        >
          <section
            className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[750px] w-full fixed md:relative bottom-0 `}
          >
            <section className="flex items-center justify-between w-full">
              <h2 className="font-semibold text-lg">Edit Agent Details</h2>

              <div
                onClick={clearToggleEdit}
                className="h-7 w-7 flex items-center justify-center text-sm bg-[#f2f2f2] rounded-full cursor-pointer"
              >
                <FaXmark />
              </div>
            </section>

            <section className="flex items-center gap-4 w-full">
              <article className="flex flex-col gap-2 w-full p-4 bg-white rounded-2xl border border-zinc-200">
                <span className="text-xs font-semibold">
                  Firstname<span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  name="firstname"
                  value={toggleEdit.firstname}
                  onChange={handleChange}
                  className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                  placeholder="Enter first name"
                />
              </article>

              <article className="flex flex-col gap-2 w-full p-4 bg-white rounded-2xl border border-zinc-200">
                <span className="text-xs font-semibold">
                  Middlename<span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  name="middlename"
                  value={toggleEdit.middlename}
                  onChange={handleChange}
                  className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                  placeholder="Enter middle name"
                />
              </article>

              <article className="flex flex-col gap-2 w-full p-4 bg-white rounded-2xl border border-zinc-200">
                <span className="text-xs font-semibold">
                  Lastname<span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  name="lastname"
                  value={toggleEdit.lastname}
                  onChange={handleChange}
                  className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                  placeholder="Enter last name"
                />
              </article>
            </section>

            <section className="flex items-center gap-4 w-full">
              <article className="flex flex-col gap-2 w-full p-4 bg-white rounded-2xl border border-zinc-200">
                <span className="text-xs font-semibold">
                  Phone Number<span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  name="number"
                  value={toggleEdit.number}
                  onChange={handleChange}
                  className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                  placeholder="Enter phone number"
                />
              </article>

              <article className="flex flex-col gap-2 w-full p-4 bg-white rounded-2xl border border-zinc-200">
                <span className="text-xs font-semibold">
                  Email Address<span className="text-red-500">*</span>
                </span>
                <input
                  type="email"
                  required
                  name="email"
                  value={toggleEdit.email}
                  onChange={handleChange}
                  className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                  placeholder="Enter email address"
                />
              </article>
            </section>
            <section className="flex items-center gap-4 w-full">
              <article className="flex flex-col gap-2 w-full p-4 bg-white rounded-2xl border border-zinc-200">
                <span className="text-sm font-semibold">
                  Agent Role<span className="text-red-500">*</span>
                </span>
                <select
                  className="bg-zinc-50 border h-[40px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                  name="role"
                  required
                  value={toggleEdit.role}
                  onChange={handleChange}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </article>

              <article className="flex flex-col gap-2 w-full p-4 bg-white rounded-2xl border border-zinc-200">
                <span className="text-sm font-semibold">
                  Agent Status<span className="text-red-500">*</span>
                </span>
                <select
                  className="bg-zinc-50 border h-[40px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                  name="status"
                  required
                  value={toggleEdit.status}
                  onChange={handleChange}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </article>
            </section>

            <div className="flex items-center w-full gap-4">
              <span
                onClick={clearToggleEdit}
                className="flex text-xs items-center justify-center gap-2 border border-zinc-300 text-blue-600border-blue-600 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Cancel
              </span>
              <button
                type="submit"
                className="flex text-xs items-center justify-center shrink gap-2 text-white bg-blue-600 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                <BiEdit /> Edit agent details
              </button>
            </div>
          </section>
        </form>
      )}

      {toggleDelete && (
        <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50">
          <section
            className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[450px] w-full fixed md:relative bottom-0 `}
          >
            <h2 className="font-semibold text-xl">Are you sure?</h2>
            <p className="text-sm font-medium text-center bg-zinc-100 p-4 rounded-2xl">
              Deleting this agent is permanent and irreversible. You will lose
              this record.
            </p>

            <div className="flex items-center w-full gap-4">
              <span
                onClick={() => setToggleDelete(false)}
                className="flex text-xs items-center justify-center gap-2 border border-zinc-300 text-blue-600border-blue-600 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Cancel
              </span>
              <button
                onClick={handleAgentDelete}
                className="flex text-xs items-center justify-center shrink gap-2 text-white bg-[#f30000] font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Yes, delete this agent
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
