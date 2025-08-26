import axios from "axios";
import { useEffect, useState } from "react";
import { BiArchiveIn, BiSolidCheckCircle } from "react-icons/bi";

import { MdPendingActions } from "react-icons/md";
import { useSelector } from "react-redux";
import GreenSpinner from "../components/GreenSpinner";
export default function Listings() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchListings = async () => {
      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api/listing`
          : `https://rentahome-server.onrender.com/api/listing`;

      setLoading(true);
      const cacheKey = `RentaHome-listing-cache-${user._id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${url}/last-updated`);

        if (cached && cached.lastUpdated === lastUpdated) {
          setListings(cached.data);
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`${url}/fetch`, {
          withCredentials: true,
        });
        setListings(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const activeListings =
    listings?.filter((prop) => prop.status == "active").length || 0;
  const pendingListing =
    listings?.filter((prop) => prop.status == "pending").length || 0;
  const archivedListing =
    listings?.filter((prop) => prop.status == "archived").length || 0;
  return (
    <>
      <section className="w-full flex justify-between gap-5 bg-white rounded-2xl overflow-hidden border border-zinc-200 divide-x divide-zinc-200 p-3">
        <main className="flex justify-between px-4 w-full">
          <section className="flex items-center gap-1">
            <div className="h-14 w-14 shrink-0 border rounded-full p-1 flex items-center justify-center border-zinc-300">
              <span className="h-full w-full rounded-full bg-green-100 flex items-center justify-center text-green-500 text-xl">
                <BiSolidCheckCircle />
              </span>
            </div>
            <div className="flex flex-col-reverse">
              <span className="text-lg font-medium font-primary -mb-2">
                {loading ? <GreenSpinner /> : <>{activeListings}</>}
              </span>
              <p className="text-[11px] text-zinc-500">Active Listings</p>
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <span className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-500">
              ?
            </span>
            <p className="text-xs text-green-500">
              {(Number(activeListings) / Number(listings?.length)) * 100 || 0}%
            </p>
          </section>
        </main>

        <main className="flex justify-between px-4 w-full">
          <section className="flex items-center gap-1">
            <div className="h-14 w-14 shrink-0 border rounded-full p-1 flex items-center justify-center border-zinc-300">
              <span className="h-full w-full rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl">
                <MdPendingActions />
              </span>
            </div>
            <div className="flex flex-col-reverse">
              <span className="text-lg font-medium font-primary -mb-2">
                {loading ? <GreenSpinner /> : <>{pendingListing}</>}
              </span>
              <p className="text-[11px] text-zinc-500">Pending Listings</p>
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <span className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-500">
              ?
            </span>
            <p className="text-xs text-orange-500">
              {(Number(pendingListing) / Number(listings?.length)) * 100 || 0}%
            </p>
          </section>
        </main>

        <main className="flex justify-between px-4 w-full">
          <section className="flex items-center gap-1">
            <div className="h-14 w-14 shrink-0 border rounded-full p-1 flex items-center justify-center border-zinc-300">
              <span className="h-full w-full rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 text-xl">
                <BiArchiveIn />
              </span>
            </div>
            <div className="flex flex-col-reverse">
              <span className="text-lg font-medium font-primary -mb-2">
                {loading ? <GreenSpinner /> : <>{archivedListing}</>}
              </span>
              <p className="text-[11px] text-zinc-500">Archived Listings</p>
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <span className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-500">
              ?
            </span>
            <p className="text-xs text-indigo-500">
              {(Number(archivedListing) / Number(listings?.length)) * 100 || 0}%
            </p>
          </section>
        </main>

        <div className="flex flex-col w-full max-w-[200px] shrink-0 p-4 justify-center items-center">
          <span className="text-4xl font-medium font-primary -mb-2">
            {loading ? <GreenSpinner /> : <>{listings && listings.length}</>}
          </span>
          <p className="text-[11px] text-zinc-500">Total Listings</p>
        </div>
      </section>
    </>
  );
}
