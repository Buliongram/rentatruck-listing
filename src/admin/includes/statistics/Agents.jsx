import React from "react";
import GreenSpinner from "../../components/GreenSpinner";
import CircularProgress from "../../components/CircularProgress";
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
import Loader from "../../../components/Loader";
export default function Agents({ fetching, agents, data }) {
  return (
    <main className="flex flex-col gap-2">
      <span className="text-lg font-bold">Agents Statistics</span>
      <section className="w-full flex items-center gap-4">
        <article className="p-6 rounded-3xl flex flex-col w-full gap-4 bg-white">
          <div className="flex items-center w-full justify-between">
            <span className="text-lg font-bold">Agents Breakdown</span>
            <span className="text-xs bg-zinc-100 px-3 rounded-full py-1.5 w-max flex items-center gap-0.5">
              Last 6 months
            </span>
          </div>
          {fetching.type === "user" && fetching.status ? (
            <Loader padding={10} />
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.agents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#f30000"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </article>
        <section className="flex flex-col gap-4 w-full">
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600">
                Total Agents
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "user" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>{agents && agents.length}</>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(agents.length) / Number(agents?.length)) * 100 || 0
              }
              color={"#155dfc"}
            />
          </article>
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600">
                Active Agents
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "user" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {agents?.filter((prop) => prop.status == "active").length ||
                      0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  agents?.filter((prop) => prop.status == "active").length || 0
                ) /
                  Number(agents?.length)) *
                  100 || 0
              }
              color={"oklch(62.7% 0.194 149.214)"}
            />
          </article>
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                Suspended Agents
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "user" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {agents?.filter((prop) => prop.status == "suspended")
                      .length || 0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  agents?.filter((prop) => prop.status == "suspended").length ||
                    0
                ) /
                  Number(agents?.length)) *
                  100 || 0
              }
              color={"#ff6900 "}
            />
          </article>
        </section>
        <section className="flex flex-col gap-4 w-full">
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                Banned Agents
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "user" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {agents?.filter((prop) => prop.status == "banned").length ||
                      0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  agents?.filter((prop) => prop.status == "banned").length || 0
                ) /
                  Number(agents?.length)) *
                  100 || 0
              }
              color={"#fe0000"}
            />
          </article>
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                Verified Agents
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "user" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {agents?.filter((prop) => prop.kycStatus == "verified")
                      .length || 0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  agents?.filter((prop) => prop.kycStatus == "verified")
                    .length || 0
                ) /
                  Number(agents?.length)) *
                  100 || 0
              }
              color={"oklch(72.3% 0.219 149.579)"}
            />
          </article>
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                Unverified Agents
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "user" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {agents?.filter((prop) => prop.kycStatus == "unverified")
                      .length || 0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  agents?.filter((prop) => prop.kycStatus == "unverified")
                    .length || 0
                ) /
                  Number(agents?.length)) *
                  100 || 0
              }
              color={"#09090b "}
            />
          </article>
        </section>
      </section>
    </main>
  );
}
