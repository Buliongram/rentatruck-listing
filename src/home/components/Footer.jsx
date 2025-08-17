import React from "react";
import {
  BiCopy,
  BiCopyright,
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoLinkedinSquare,
  BiLogoTwitter,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { HiOutlineHomeModern } from "react-icons/hi2";

export default function Footer() {
  return (
    <>
      <section className="lg:p-28 lg:py-14 py-8 ">
        <footer className="lg:border-[1.3px] rounded-3xl border-zinc-200 w-full lg:p-12 p-8 shadow-primary flex flex-col divide-y divide-zinc-300">
          <article className="flex flex-col lg:flex-row w-full justify-between pb-6 gap-10">
            <section className="w-full flex flex-col gap-5 justify-between">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center">
                  <HiOutlineHomeModern />
                </span>
                <span className="text-xl font-semibold">RentaHome</span>
              </div>
              <p className="text-xs text-zinc-500 font-normal max-w-[400px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                magni illum voluptas aperiam neque? Expedita dignissimos ab
                voluptates voluptatibus repudiandae?
              </p>
              <div className="flex items-center gap-2 text-lg">
                <BiLogoTwitter />
                <BiLogoInstagram />
                <BiLogoLinkedinSquare />
                <BiLogoFacebookCircle />
              </div>
            </section>
            <section className="w-full flex flex-col lg:flex-row gap-10 justify-end">
              <main className="flex flex-col gap-3">
                <h3 className="font-semibold text-sm uppercase">
                  Buy, rent and sell
                </h3>
                <div className="flex flex-col gap-2 text-zinc-500 text-xs font-normal">
                  <Link to={"/"}>Buy and sell properties</Link>
                  <Link to={"/"}>Rent home</Link>
                  <Link to={"/"}>Builder trade-up</Link>
                </div>
              </main>

              <main className="flex flex-col gap-3">
                <h3 className="font-semibold text-sm uppercase">Sell a home</h3>
                <div className="flex flex-col gap-2 text-zinc-500 text-xs font-normal">
                  <Link to={"/"}>Request an offer</Link>
                  <Link to={"/"}>Pricing</Link>
                  <Link to={"/"}>Reviews</Link>
                  <Link to={"/"}>Stories</Link>
                </div>
              </main>

              <main className="flex flex-col gap-3">
                <h3 className="font-semibold text-sm uppercase">Resources</h3>
                <div className="flex flex-col gap-2 text-zinc-500 text-xs font-normal">
                  <Link to={"/"}>Home</Link>
                  <Link to={"/"}>About</Link>
                  <Link to={"/"}>Properties</Link>
                  <Link to={"/"}>Services</Link>
                </div>
              </main>
            </section>
          </article>
          <section className="pt-6 flex items-center justify-between text-xs text-zinc-500 flex-col lg:flex-row gap-3">
            <span className="flex items-center gap-0.5">
              <BiCopyright /> {new Date().getFullYear()} RentaHome. All rights
              revserved
            </span>
            <div className="flex items-center gap-2 lg:gap-4">
              <Link className="underline">Privacy Policy</Link>
              <Link className="underline">Terms of Service</Link>
              <Link className="underline">Cookies Setting</Link>
            </div>
          </section>
        </footer>
      </section>
    </>
  );
}
