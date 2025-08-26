import React from "react";
import { BiMessageSquareDetail, BiSupport, BiUser } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import { GoGear, GoShield } from "react-icons/go";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { IoGridOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineReviews } from "react-icons/md";
import { useSelector } from "react-redux";

export default function AdminSidebar() {
  const location = useLocation();
  const navLinks = [
    {
      id: "1",
      name: "Overview",
      path: "/admin",
      icon: <IoGridOutline />,
      user: true,
    },
    {
      id: "2",
      name: "Messages",
      path: "/admin/messages",
      icon: <BiMessageSquareDetail />,
      user: true,
    },
    {
      id: "3",
      name: "Saved Items",
      path: "/admin/saved-items",
      icon: <FaRegHeart />,
      user: true,
    },
    {
      id: "4",
      name: "Security",
      path: "/admin/security",
      icon: <GoShield />,
      user: true,
    },
    {
      id: "5",
      name: "Reviews",
      path: "/admin/reviews",
      icon: <MdOutlineReviews />,
      user: true,
    },
    {
      id: "6",
      name: "Profile",
      path: "/admin/profile",
      icon: <BiUser />,
      user: true,
    },
    {
      id: "7",
      name: "Help Center",
      path: "/admin/support",
      icon: <BiSupport />,
      user: true,
    },
  ];

  const renderLinks = () => {
    return navLinks.map(({ name, path, id, icon }) => (
      <Link
        key={id}
        to={path}
        className={`px-4 py-2 text-xs rounded-xl  flex items-center gap-1 border-b border-transparent font-medium ${
          location.pathname === path
            ? "bg-emerald-950 text-white"
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
        <div className="flex items-center gap-1 text-sm pb-4 border-b border-zinc-200">
          <span className="h-7 w-7 rounded-lg bg-emerald-950 text-white flex items-center justify-center">
            <HiOutlineHomeModern />
          </span>
          <span className="text-[16px] font-semibold text-emerald-9bg-emerald-950">
            RentaHome
          </span>
        </div>

        <section className="flex flex-col w-full gap-1">
          {renderLinks()}
        </section>

        <section className="flex flex-col w-full rounded-3xl border border-zinc-200 p-4 gap-3 h-max bg-zinc-100/60">
          <span className="h-8 w-8 flex items-center justify-center bg-emerald-950 rounded-lg"></span>
          <p className="text-[11px] leading-tight text-zinc-500 font-normal">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde,
            illum.
          </p>
          <Link className=" bg-emerald-950 text-white text-xs py-2 px-4 rounded-lg text-center ">
            Click Me
          </Link>
        </section>
      </section>
    </>
  );
}
