import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import {
  AiOutlineMenuFold,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { HiOutlineHomeModern } from "react-icons/hi2";
export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between px-6 lg:px-12 py-3 fixed w-full top-0 left-0 z-10 text-white bg-[#013a71]">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-white text-primary flex items-center justify-center">
            <HiOutlineHomeModern />
          </span>
          <span className="text-xl font-semibold">RentaHome</span>
        </div>

        <section className="hidden lg:flex items-center gap-10 ">
          <main className="flex items-center gap-6 text-sm font-medium">
            <p>Rent</p>
            <p>Buy</p>
            <p>Sell</p>
            <div className="flex items-center gap-2">
              <p>Manage Property</p>
              <FaChevronDown className="text-xs " />
            </div>
          </main>
          <main className="flex items-center gap-5 text-black">
            <div className="flex items-center gap-1">
              <span className="h-9 w-9 rounded-full shrink-0 bg-white flex items-center justify-center cursor-pointer">
                <AiOutlineSearch className="text-lg" />
              </span>
              <span className="h-9 w-9 rounded-full shrink-0 bg-white flex items-center justify-center cursor-pointer">
                <AiOutlineUser className="text-lg" />
              </span>
            </div>
            <a
              href=""
              className="bg-white rounded-full px-6 py-1.5 flex items-center justify-center text-sm font-medium "
            >
              <p className="">Get Started</p>
            </a>
          </main>
        </section>

        <span className="h-9 w-9 rounded-full shrink-0 bg-white text-[#013a71] flex lg:hidden items-center justify-center cursor-pointer ">
          <IoMenu className="text-xl" />
        </span>
      </header>
    </>
  );
}
