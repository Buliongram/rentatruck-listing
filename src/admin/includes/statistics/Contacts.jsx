import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CircularProgress from "../../components/CircularProgress";
import GreenSpinner from "../../components/GreenSpinner";
import Loader from "../../../components/Loader";

export default function Contacts({ fetching, contacts, data }) {
  return (
    <main className="flex flex-col gap-2">
      <span className="text-lg font-bold">Contacts Statistics</span>
      <section className="w-full flex gap-4">
        <main className="flex flex-col gap-4 w-full h-full">
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between h-full">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600">
                Total Contacts
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "contact" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>{contacts && contacts.length}</>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(contacts.length) / Number(contacts?.length)) * 100 || 0
              }
              color={"#155dfc"}
            />
          </article>
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between h-full">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600">
                Unread Contacts
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "contact" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {contacts?.filter((prop) => prop.isRead === true).length ||
                      0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  contacts?.filter((prop) => prop.isRead === true).length || 0
                ) /
                  Number(contacts?.length)) *
                  100 || 0
              }
              color={"oklch(62.7% 0.194 149.214)"}
            />
          </article>
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between h-[100px]"></article>
        </main>
        <main className="flex flex-col gap-4 w-full">
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                Read Contacts
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "contact" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {contacts?.filter((prop) => prop.isRead === false).length ||
                      0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  contacts?.filter((prop) => prop.isRead === false).length || 0
                ) /
                  Number(contacts?.length)) *
                  100 || 0
              }
              color={"#ff6900 "}
            />
          </article>
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between h-full"></article>
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between h-full"></article>
        </main>
        <article className="p-6 rounded-3xl flex flex-col w-full gap-4 bg-white">
          <div className="flex items-center w-full justify-between">
            <span className="text-lg font-bold">Contacts Breakdown</span>
            <span className="text-xs bg-zinc-100 px-3 rounded-full py-1.5 w-max flex items-center gap-0.5">
              Last 6 months
            </span>
          </div>
          {fetching.type === "contact" && fetching.status ? (
            <Loader padding={10} />
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={data.contacts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="count" barSize={40} fill="#82ca9d" />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  strokeWidth={3}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </article>
      </section>
    </main>
  );
}
