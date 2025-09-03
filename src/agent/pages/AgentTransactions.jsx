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
import { format, parseISO } from "date-fns";

const API_URL =
  window.location.hostname === "localhost"
    ? `http://localhost:5000/api`
    : `https://rentahome-server.onrender.com/api`;

export default function AgentTransactions() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleMessage, setToggleMessage] = useState({
    modal: false,
    message: "",
  });
  const cacheKey = `househunter-transaction-cache-admin-dashboard-${user._id}`;
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const categories = [
    { name: "All" },
    { name: "Pending" },
    { name: "Successful" },
    { name: "Failed" },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/transaction/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setTransactions(cached.data);
          return;
        }
        const { data } = await axios.get(`${API_URL}/transaction/fetch/agent`, {
          withCredentials: true,
        });
        setTransactions(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (err) {
        toast.error("Failed to fetch transactions.", { id: "123" });
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [cacheKey]);

  useEffect(() => {
    let filtered = transactions;
    if (statusFilter === "Pending") {
      filtered = transactions.filter(
        (transaction) => transaction.status === "pending"
      );
    } else if (statusFilter === "Successful") {
      filtered = transactions.filter(
        (transaction) =>
          transaction.status === "successful" ||
          transaction.status === "completed"
      );
    } else if (statusFilter === "Failed") {
      filtered = transactions.filter(
        (transaction) => transaction.status === "failed"
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.reference
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.currency.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTransactions(filtered);
  }, [statusFilter, transactions, searchTerm]);

  const tableHeaders = [
    "Date Created",
    "Reference",
    "Amount",
    "Plan",
    "Currency",
    "Status",
    "Action",
  ];

  if (loading) {
    return <Loader />;
  }
  if (!transactions || transactions.length < 1) {
    return <NoRecord />;
  }

  return (
    <>
      <article className="flex flex-col gap-5">
        <main className="flex flex-col divide-y divide-zinc-200 w-full p-5 bg-white rounded-3xl">
          <span className="text-2xl flex items-center gap-2 font-semibold pb-6">
            Transactions{" "}
            <span className="text-white bg-zinc-950 p-1 px-2 rounded-lg text-xs">
              {transactions.length}
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id} className="table-row">
                  <td>
                    {format(parseISO(transaction.createdAt), "E, d MMMM yyyy")}
                  </td>
                  <td>{transaction.reference}</td>
                  <td>&#8358;{transaction.amount.toLocaleString()}</td>
                  <td>{transaction.plan}</td>
                  <td>{transaction.currency}</td>
                  <td>
                    {" "}
                    <span
                      className={`px-3 rounded-full w-max py-0.5 flex items-center gap-1 ${
                        {
                          successful: "text-green-500 bg-green-100",
                          completed: "text-green-500 bg-green-100",
                          failed: "text-[#fe0000] bg-red-100",
                          pending: "text-amber-400 bg-amber-100",
                        }[transaction.status] || "bg-gray-300"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="h-6 w-6 rounded-md flex items-center justify-center border bg-zinc-950 text-white border-zinc-200 cursor-pointer">
                        <MdOutlineMessage />
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
            <h2 className="font-semibold text-xl">transaction Message</h2>
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
    </>
  );
}
