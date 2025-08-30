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

export default function Enquiry({ fetching, enquiries, data }) {
  return (
    <main className="flex flex-col gap-2">
      <span className="text-lg font-bold">Enquiries Statistics</span>
      <section className="w-full flex gap-4 flex-row-reverse">
        <main className="flex flex-col gap-4 w-full h-full">
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600">
                Total Enquiries
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "enquiry" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>{enquiries && enquiries.length}</>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(enquiries.length) / Number(enquiries?.length)) * 100 ||
                0
              }
              color={"#155dfc"}
            />
          </article>

          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                Message Enquiries
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "review" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {enquiries?.filter((prop) => prop.medium == "message")
                      .length || 0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  enquiries?.filter((prop) => prop.medium == "message")
                    .length || 0
                ) /
                  Number(enquiries?.length)) *
                  100 || 0
              }
              color={"#09090b "}
            />
          </article>

          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                Unread Enquiries
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "review" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {enquiries?.filter((prop) => prop.isRead === false)
                      .length || 0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  enquiries?.filter((prop) => prop.isRead === false).length || 0
                ) /
                  Number(enquiries?.length)) *
                  100 || 0
              }
              color={"#4a5565"}
            />
          </article>
        </main>
        <main className="flex flex-col gap-4 w-full">
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                Phone Enquiries
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "review" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {enquiries?.filter((prop) => prop.medium == "phone")
                      .length || 0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  enquiries?.filter((prop) => prop.medium == "phone").length ||
                    0
                ) /
                  Number(enquiries?.length)) *
                  100 || 0
              }
              color={"#ff6900 "}
            />
          </article>
          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                WhatsApp Enquiries
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "review" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {enquiries?.filter((prop) => prop.medium == "whatsapp")
                      .length || 0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  enquiries?.filter((prop) => prop.medium == "whatsapp")
                    .length || 0
                ) /
                  Number(enquiries?.length)) *
                  100 || 0
              }
              color={"#fe0000"}
            />
          </article>

          <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
            <main className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
                Read Enquiries
              </p>
              <h3 className="font-bold text-2xl font-primary">
                {fetching.type === "review" && fetching.status ? (
                  <GreenSpinner />
                ) : (
                  <>
                    {enquiries?.filter((prop) => prop.isRead === true).length ||
                      0}
                  </>
                )}
              </h3>
            </main>
            <CircularProgress
              percentage={
                (Number(
                  enquiries?.filter((prop) => prop.isRead === true).length || 0
                ) /
                  Number(enquiries?.length)) *
                  100 || 0
              }
              color={"oklch(51.8% 0.253 323.949)"}
            />
          </article>
        </main>
        <article className="p-6 rounded-3xl flex flex-col w-full gap-4 bg-white">
          <div className="flex items-center w-full justify-between">
            <span className="text-lg font-bold">Enquiries Breakdown</span>
            <span className="text-xs bg-zinc-100 px-3 rounded-full py-1.5 w-max flex items-center gap-0.5">
              Last 6 months
            </span>
          </div>
          {fetching.type === "review" && fetching.status ? (
            <Loader padding={10} />
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data.enquiries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#f97316"
                  fill="#f97316"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </article>
      </section>
    </main>
  );
}
