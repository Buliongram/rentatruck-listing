import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Loader from "../../components/Loader";
import { noresult } from "../../assets/images/images";
import NoRecord from "../../components/NoRecord";

export default function Charts({ agents, fetching }) {
  const user = useSelector((state) => state.user);
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/statistics/listings-by-month`);

        const now = new Date();
        const months = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const label = d.toLocaleDateString("en-US", { month: "short" });

          const found = res.data.find(
            (item) =>
              new Date(item.date).getMonth() === d.getMonth() &&
              new Date(item.date).getFullYear() === d.getFullYear()
          );

          months.push({
            date: label,
            count: found ? found.count : 0,
          });
        }

        setData(months);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="flex gap-4">
      <article className="p-6 rounded-3xl flex flex-col w-full gap-4 bg-white">
        <div className="flex items-center w-full justify-between">
          <span className="text-[16px] font-semibold">Property Breakdown</span>
          <span className="text-xs bg-zinc-100 px-3 rounded-full py-1.5 w-max flex items-center gap-0.5">
            Last 6 months
          </span>
        </div>

        {loading ? (
          <Loader padding={10} />
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 " />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#155dfc"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </article>
      <article className="p-6 rounded-3xl flex flex-col w-full gap-4 bg-white">
        <span className="text-[16px] font-semibold">Top Agents</span>

        {fetching ? (
          <Loader padding={5} text={"Loading Agents"} />
        ) : (
          <>
            {agents && agents.length ? (
              <>
                <section className=" h-full flex flex-col gap-2">
                  {agents.map((agent, index) => (
                    <main className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-10 w-10 rounded-full">
                          <img
                            src={agent.profilePhoto}
                            className="h-full w-full rounded-full object-cover"
                            alt={agent.firstname}
                          />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold capitalize">{`${
                            agent.firstname
                          } ${agent.middlename || ""} ${agent.lastname}`}</span>
                          <p className="text-[10px] text-zinc-500">
                            {agent.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <h3 className="text-2xl text-blue-600 font-semibold">
                          {agent.totalisting}
                        </h3>
                        <p className="text-[11px] text-zinc-500">
                          Total Listing
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <h3 className="text-xs font-semibold">
                          {agent.country}
                        </h3>
                        <p className="text-[11px] text-zinc-500">Country</p>
                      </div>
                    </main>
                  ))}
                </section>
                <Link
                  to={"/admin/agents"}
                  className="text-xs bg-zinc-100 px-3 rounded-full py-2 w-full text-center justify-center flex items-center gap-0.5"
                >
                  View all agents
                </Link>
              </>
            ) : (
              <NoRecord
                fontSize={12}
                margin={5}
                text={"No agent record found"}
              />
            )}
          </>
        )}
      </article>
    </section>
  );
}
