import React from "react";
import { Link, useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { BiBell, BiChevronDown, BiMessage } from "react-icons/bi";
import { BsHouseAdd } from "react-icons/bs";
import { LuHouse, LuMapPinHouse } from "react-icons/lu";
import {
  FaHouseChimneyUser,
  FaMagento,
  FaRegChartBar,
  FaUsers,
} from "react-icons/fa6";
import { CiBellOn, CiCircleChevDown, CiSettings } from "react-icons/ci";
export default function PanelHeader() {
  const location = useLocation();
  const userState = useSelector((state) => state.user);
  const navLinks = [
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
      name: "Leads",
      path: "/admin/leads",
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
      name: "Manage User",
      path: "/admin/users",
      icon: <FaUsers />,
      user: false,
    },
    {
      id: "6",
      name: "Manage Agents",
      path: "/admin/agents",
      icon: <LuMapPinHouse />,
      user: false,
    },
    {
      id: "7",
      name: "Manage Owners",
      path: "/admin/owners",
      icon: <FaHouseChimneyUser />,
      user: false,
    },
  ];
  const renderLinks = () => {
    return navLinks.map(({ name, path, id, icon }) => (
      <Link
        key={id}
        to={path}
        className={`px-4 py-2 text-xs rounded-xl border border-zinc-200  flex items-center gap-1  font-medium ${
          location.pathname === path
            ? "bg-emerald-950 text-white "
            : "bg-zinc-100 hover:bg-emerald-950 text-emerald-950 hover:text-white"
        } `}
      >
        {icon}
        {name}
      </Link>
    ));
  };
  return (
    <>
      {/* <header className="flex flex-col  divide-y divide-zinc-200  sticky top-0 left-0 z-10 p-6 px-8 bg-white">
        <nav className="flex items-center justify-between pb-4">
          <main className="flex flex-col">
            <h3 className="text-xl font-semibold capitalize">
              {location.pathname == "/dashboard"
                ? "Dashboard"
                : location.pathname
                    .replaceAll("/", " ")
                    .replace("dashboard", "")
                    .replaceAll("-", " ")}
            </h3>
            <p className="text-xs text-gray-500">
              {format(parseISO(new Date().toISOString()), "EEEE, d MMMM yyyy")}
            </p>
          </main>
          <main className="flex items-center gap-5">
            {userState.role == "User" ? (
              ""
            ) : (
              <>
                {" "}
                <Link
                  to={"/admin/create/listing"}
                  className=" bg-emerald-950 text-white text-xs py-2 px-4 rounded-lg text-center "
                >
                  Post a Property
                </Link>
                <span className="h-[20px] border border-zinc-200"></span>
              </>
            )}

            <div className="flex items-center gap-2">
              <Link
                to={"/dashboard/notifications"}
                className="h-8 w-8 relative bg-zinc-100  text-primary  rounded-full  flex items-center justify-center cursor-pointer"
              >
                <BiBell />
                <span className="absolute  h-1.5 w-1.5 top-2 right-2 rounded-full bg-red-500"></span>
              </Link>
              <Link
                to={"/dashboard/messages"}
                className="h-8 w-8 bg-zinc-100  rounded-full  flex items-center justify-center cursor-pointer text-primary relative"
              >
                <BiMessage />
                <span className="absolute h-1.5 w-1.5 top-2 right-2 rounded-full bg-green-500"></span>
              </Link>
            </div>
            <span className="h-[20px] border border-zinc-200"></span>
            <Link
              to={"/dashboard/profile"}
              className="flex items-center cursor-pointer"
            >
              <span className="h-9 w-9 rounded-full overflow-hidden bg-[#f5f5f3] flex items-center justify-center font-semibold text-xs text-primary uppercase">
                {userState.profilePhoto ? (
                  <img
                    src={userState.profilePhoto}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : userState.firstname && userState.lastname ? (
                  `${userState.firstname[0] + userState.lastname[0]}`
                ) : (
                  "R"
                )}
              </span>
              <BiChevronDown />
            </Link>
          </main>
        </nav>

        <section className="flex items-center w-full gap-2 pt-4">
          {userState?.role == "User" ? "" : renderLinks()}
        </section>
      </header> */}

      <header className="flex items-center justify-between bg-white p-3 rounded-2xl">
        <Link to={"/"} className="flex items-center gap-1">
          <span className="h-8 w-8 rounded-xl text-[16px] bg-emerald-950 text-white flex items-center justify-center">
            <FaMagento />
          </span>
          <div className="text-xl font-semibold text-emerald-950 font-primary mt-1">
            RentaHome
          </div>
        </Link>

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
    </>
  );
}
