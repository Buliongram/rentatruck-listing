import React from "react";
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
import GreenSpinner from "../../components/GreenSpinner";
export default function Properties({ fetching, listings, data }) {
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
    <>
      <article className="flex flex-col gap-4">
        <main className="flex flex-col gap-2">
          <span className="text-lg font-bold">Listings Statistics</span>

          <section className="w-full flex flex-col gap-4">
            <main className="flex items-center gap-2 w-full">
              <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
                <main className="flex flex-col gap-1">
                  <p className="text-[13px] font-semibold leading-tight text-zinc-600">
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
                    (Number(listings.length) / Number(listings?.length)) *
                      100 || 0
                  }
                  color={"#155dfc"}
                />
              </article>

              <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
                <main className="flex flex-col gap-1">
                  <p className="text-[13px] font-semibold leading-tight text-zinc-600">
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
                    (Number(activeListings) / Number(listings?.length)) * 100 ||
                    0
                  }
                  color={"#007a55"}
                />
              </article>
              <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
                <main className="flex flex-col gap-1">
                  <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
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
                    (Number(pendingListing) / Number(listings?.length)) * 100 ||
                    0
                  }
                  color={"#ff6900 "}
                />
              </article>
            </main>
            <main className="flex items-center gap-2 w-full">
              <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
                <main className="flex flex-col gap-1">
                  <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
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
                    (Number(rentedListing) / Number(listings?.length)) * 100 ||
                    0
                  }
                  color={"#721378"}
                />
              </article>

              <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
                <main className="flex flex-col gap-1">
                  <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
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
                    (Number(soldListing) / Number(listings?.length)) * 100 || 0
                  }
                  color={"oklch(72.3% 0.219 149.579)"}
                />
              </article>

              <article className="bg-white rounded-xl p-3 w-full flex items-center justify-between">
                <main className="flex flex-col gap-1">
                  <p className="text-[13px] font-semibold leading-tight text-zinc-600 ">
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
                    (Number(archivedListing) / Number(listings?.length)) *
                      100 || 0
                  }
                  color={"#09090b "}
                />
              </article>
            </main>
          </section>
        </main>

        <section className="w-full flex gap-4">
          <article className="p-6 rounded-3xl flex flex-col w-full gap-4 bg-white">
            <div className="flex items-center w-full justify-between">
              <span className="text-sm font-semibold">Published Properties</span>
              <span className="text-xs bg-zinc-100 px-3 rounded-full py-1.5 w-max flex items-center gap-0.5">
                Last 6 months
              </span>
            </div>
            {fetching.type === "chart" && fetching.status ? (
              <Loader padding={10} />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.activeListings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </article>

          <article className="p-6 rounded-3xl flex flex-col w-full gap-4 bg-white">
            <div className="flex items-center w-full justify-between">
              <span className="text-sm font-semibold">Sold Properties</span>
              <span className="text-xs bg-zinc-100 px-3 rounded-full py-1.5 w-max flex items-center gap-0.5">
                Last 6 months
              </span>
            </div>
            {fetching.type === "chart" && fetching.status ? (
              <Loader padding={10} />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data.soldListings}>
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

          <article className="p-6 rounded-3xl flex flex-col w-full gap-4 bg-white">
            <div className="flex items-center w-full justify-between">
              <span className="text-sm font-semibold">Rented Properties</span>
              <span className="text-xs bg-zinc-100 px-3 rounded-full py-1.5 w-max flex items-center gap-0.5">
                Last 6 months
              </span>
            </div>
            {fetching.type === "chart" && fetching.status ? (
              <Loader padding={10} />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data.rentedListings}>
                  <CartesianGrid strokeDasharray="3 3" />
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
        </section>
      </article>
    </>
  );
}
