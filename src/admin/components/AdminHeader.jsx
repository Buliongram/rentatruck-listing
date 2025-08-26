import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsHouseAdd } from "react-icons/bs";
import { CiBellOn, CiSettings } from "react-icons/ci";
import {
  FaHouseChimneyUser,
  FaMagento,
  FaRegChartBar,
  FaUsers,
} from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import { LuHouse, LuMapPinHouse } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function AdminHeader() {
  const userState = useSelector((state) => state.user);
  const location = useLocation();
  const navLinks = [
    {
      id: "01",
      name: "Overview",
      path: "/admin",
      icon: <IoGridOutline />,
      user: false,
    },
    {
      id: "1",
      name: "Listings",
      path: "/admin/listings",
      icon: <LuHouse />,
      user: false,
    },
    {
      id: "2",
      name: "Post Property",
      path: "/admin/create/listing",
      icon: <BsHouseAdd />,
      user: false,
    },
    {
      id: "3",
      name: "Enquiries",
      path: "/admin/enquiries",
      icon: <BsHouseAdd />,
      user: false,
    },
    {
      id: "4",
      name: "Statistics",
      path: "/admin/statistics",
      icon: <FaRegChartBar />,
      user: false,
    },
    {
      id: "5",
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
      user: false,
    },
    {
      id: "6",
      name: "Agents",
      path: "/admin/agents",
      icon: <LuMapPinHouse />,
      user: false,
    },
  ];

  const renderLinks = () => {
    return navLinks.map(({ name, path, id, icon }) => (
      <Link
        key={id}
        to={path}
        className={`flex items-center gap-0.5 text-xs px-3 py-1.5 rounded-xl font-semibold ${
          location.pathname === path
            ? "bg-emerald-950 text-white "
            : "bg-zinc-100/60 hover:bg-emerald-950 text-zinc-600 hover:text-white"
        } `}
      >
        {icon}
        {name}
      </Link>
    ));
  };
  return (
    <header className="flex items-center justify-between bg-white p-3 rounded-2xl">
      <Link to={"/"} className="flex items-center gap-1">
        <span className="h-8 w-8 rounded-xl text-[16px] bg-emerald-950 text-white flex items-center justify-center">
          <FaMagento />
        </span>
        <div className="text-lg font-semibold text-emerald-950 font-primary mt-1">
          HouseHunter
        </div>
      </Link>
      <section className="flex items-center gap-2">{renderLinks()}</section>

      <section className="flex items-center gap-1">
        <span className="h-9 w-9 rounded-full bg-zinc-100/60 flex items-center justify-center text-emerald-950">
          <CiSettings />
        </span>
        <span className="h-9 w-9 rounded-full bg-zinc-100/60 flex items-center justify-center text-emerald-950">
          <CiBellOn />
        </span>
        <main className="flex items-center gap-1 cursor-pointer">
          <span className="h-9 w-9 rounded-full bg-zinc-100/60">
            <img
              src={"https://randomuser.me/api/portraits/men/46.jpg"}
              alt={userState.firstname + " Image"}
              className="h-full w-full rounded-full object-cover"
            />
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">
              {`${userState.firstname} ${userState.lastname}`}
            </span>
            <p className="text-[10px] text-zinc-500">{userState.role}</p>
          </div>
          <BiChevronDown />
        </main>
      </section>
    </header>
  );
}
