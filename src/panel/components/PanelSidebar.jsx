import React from "react";
import { BiMessageSquareDetail, BiSupport, BiUser } from "react-icons/bi";
import { FaCrown, FaMagento, FaRegHeart } from "react-icons/fa6";
import { GoShield } from "react-icons/go";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { IoGridOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineReviews } from "react-icons/md";
import { useSelector } from "react-redux";
import { LuHouse } from "react-icons/lu";
import { bluebg } from "../../assets/images/images";

export default function PanelSidebar() {
  const location = useLocation();
  const navLinks = [
    {
      id: "1",
      name: "Dashboard",
      path: "/dashboard",
      icon: <IoGridOutline />,
      user: true,
    },
    {
      id: "2",
      name: "Messages",
      path: "/dashboard/messages",
      icon: <BiMessageSquareDetail />,
      user: true,
    },
    {
      id: "66",
      name: "Listings",
      path: "/dashboard/listings",
      icon: <LuHouse />,
      user: true,
    },
    {
      id: "3",
      name: "Saved Items",
      path: "/dashboard/saved-items",
      icon: <FaRegHeart />,
      user: true,
    },
    {
      id: "4",
      name: "Security",
      path: "/dashboard/security",
      icon: <GoShield />,
      user: true,
    },
    {
      id: "5",
      name: "Reviews",
      path: "/dashboard/reviews",
      icon: <MdOutlineReviews />,
      user: true,
    },
    {
      id: "6",
      name: "Profile",
      path: "/dashboard/profile",
      icon: <BiUser />,
      user: true,
    },
    {
      id: "7",
      name: "Help Center",
      path: "/dashboard/support",
      icon: <BiSupport />,
      user: true,
    },
  ];

  const renderLinks = () => {
    return navLinks.map(({ name, path, id, icon }) => (
      <Link
        key={id}
        to={path}
        className={`px-4 py-2 text-xs rounded-xl  flex items-center gap-1 border-b border-transparent font-semibold ${
          location.pathname === path
            ? "bg-blue-600 text-white"
            : "text-zinc-700 hover:bg-zinc-100/70"
        } `}
      >
        {icon}
        {name}
      </Link>
    ));
  };
  return (
    <>
      <section className="fixed w-[200px] bg-white top-0 left-0 h-full flex flex-col justify-between p-4 py-6 items-center">
        {/* <div className="flex items-center gap-1 text-sm pb-4 border-b border-zinc-200">
          <span className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <HiOutlineHomeModern />
          </span>
          <span className="text-[16px] font-semibold text-emerald-9bg-blue-600">
            RentaHome
          </span>
        </div> */}

        <section className="flex flex-col w-full gap-1">
          {renderLinks()}
        </section>

        <div className="flex flex-col gap-3 rounded-3xl p-3 relative">
          <span className="h-9 w-9 rounded-xl text-[16px] bg-blue-600 text-white flex items-center justify-center relative z-10">
            <FaCrown />
          </span>
          <span className="text-xs font-medium leading-tight text-white relative z-10">
            Subscribe to unlock more powerful and streamlined features
          </span>
          <span className="text-xs bg-blue-600 text-white px-6 rounded-full py-2 w-max relative z-10">
            Subscribe Now!
          </span>
          <img
            src={bluebg}
            className="h-full absolute top-0 left-0 w-full rounded-3xl object-cover opacity-90 z-0"
            alt="blue background"
          />
        </div>
      </section>
    </>
  );
}
