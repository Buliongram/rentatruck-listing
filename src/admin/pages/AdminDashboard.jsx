import React, { useEffect, useState } from "react";
import Leads from "../includes/Leads";
import Listings from "../includes/Listings";
import { useSelector } from "react-redux";
import axios from "axios";

export default function AdminDashboard() {
  const user = useSelector((state) => state.user);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
   const hour = new Date().getHours();
   let greet = "";
   if (hour >= 0 && hour < 12) {
     greet = "Good morning";
   } else if (hour >= 12 && hour < 16) {
     greet = "Good afternoon";
   } else {
     greet = "Good evening";
   }
   setGreeting(greet);

  }, []);

  return (
    <>
      <article className="lg:px-14 p-4 flex flex-col gap-3">
        <div className="text-2xl font-semibold capitalize">
          {greeting}, {user.firstname}!
        </div>

        <main className="flex flex-col gap-2 w-full">
          <span className="font-medium">Leads</span>
          <Leads />
        </main>
        <main className="flex flex-col gap-2 w-full">
          <span className="font-medium">Listings</span>
          <Listings />
        </main>

        <article className="flex items-center gap-3 h-[300px]">
          <section className="p-4 rounded-3xl bg-white w-full border border-zinc-200 h-full max-w-[500px] shrink-0"></section>
          <section className="p-4 rounded-3xl bg-white w-full border border-zinc-200 h-full"></section>
        </article>

        <article className="flex items-center gap-3 h-[300px]">
          <section className="p-4 rounded-3xl bg-white w-full border border-zinc-200 h-full"></section>
          <section className="p-4 rounded-3xl bg-white w-full border border-zinc-200 h-full max-w-[500px] shrink-0"></section>
        </article>
      </article>
    </>
  );
}
