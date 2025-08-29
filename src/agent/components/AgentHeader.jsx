import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  BiChevronDown,
  BiMessageSquareDetail,
  BiSupport,
  BiUser,
} from "react-icons/bi";
import { BsHouse, BsHouseAdd, BsHouseAddFill, BsHouseFill } from "react-icons/bs";
import { CiBellOn, CiSettings } from "react-icons/ci";
import {
  FaHeart,
  FaHouseChimneyUser,
  FaMagento,
  FaRegChartBar,
  FaRegHeart,
  FaUsers,
} from "react-icons/fa6";
import { GoShield } from "react-icons/go";
import { IoExitOutline, IoGrid, IoGridOutline } from "react-icons/io5";
import { LuHouse, LuMapPinHouse } from "react-icons/lu";
import { MdMessage, MdOutlineReviews, MdReviews } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../../assets/store/userSlice";

export default function AgentHeader() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  const userState = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disableBtn, setDisableBtn] = useState(false);
  const navLinks = [
    {
      id: "01",
      name: "Overview",
      path: "/agency",
      icon: <IoGrid />,
      user: false,
    },
    {
      id: "1",
      name: "Listings",
      path: "/agency/listings",
      icon: <BsHouseFill />,
      user: false,
    },
    {
      id: "2",
      name: "Post Property",
      path: "/agency/listing/create",
      icon: <BsHouseAddFill />,
      user: false,
    },
    {
      id: "3",
      name: "Enquiries",
      path: "/agency/enquiries",
      icon: <MdMessage />,
      user: false,
    },
    {
      id: "6",
      name: "Reviews",
      path: "/agency/reviews",
      icon: <MdReviews />,
      user: false,
    },
    {
      id: "7",
      name: "Saved Items",
      path: "/agency/saved-items",
      icon: <FaHeart />,
      user: false,
    },
  ];
  const [dropdown, Setdropdown] = useState(false);
  const renderLinks = () => {
    return navLinks.map(({ name, path, id, icon }) => (
      <Link
        key={id}
        to={path}
        className={`flex items-center gap-0.5 text-xs px-3 py-1.5 rounded-xl font-semibold ${
          location.pathname === path
            ? "bg-blue-600 text-white "
            : "bg-zinc-100/60 hover:bg-blue-600 text-zinc-600 hover:text-white"
        } `}
      >
        {icon}
        {name}
      </Link>
    ));
  };

  const handleLogout = async () => {
    toast.loading("Logging you out", { id: "123" });
    try {
      const res = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "123" });
      } else {
        toast.success(data.message, { id: "123" });
        dispatch(updateUser(null));
        setTimeout(() => {
          navigate(0);
        }, 500);
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Unable to log you out. Please try again",
          {
            id: "123",
          }
        );
      } else {
        toast.error("Something went wrong. Please try again.", { id: "123" });
      }
      setDisableBtn(false);
    }
  };
  const dropdownLinks = [
    {
      id: "1",
      name: "Overview",
      path: "/agency",
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
  const renderDropdownLinks = () => {
    return dropdownLinks.map(({ name, path, id, icon }) => (
      <Link
        key={id}
        to={path}
        className={`flex items-center gap-0.5 text-xs px-3 py-2.5 rounded-xl font-semibold ${
          location.pathname === path
            ? "bg-blue-600 text-white "
            : "bg-zinc-100/60 hover:bg-blue-600 text-zinc-600 hover:text-white"
        } `}
      >
        {icon}
        {name}
      </Link>
    ));
  };

  return (
    <header className="flex items-center justify-between bg-white p-3 rounded-2xl relative">
      <Link to={"/"} className="flex items-center gap-1">
        <span className="h-8 w-8 rounded-xl text-[16px] bg-blue-600 text-white flex items-center justify-center">
          <FaMagento />
        </span>
        <div className="text-lg font-semibold text-blue-600 font-primary mt-1">
          HouseHunter
        </div>
      </Link>
      <section className="flex items-center gap-2">{renderLinks()}</section>

      <section className="flex items-center gap-1">
        <span className="h-9 w-9 rounded-full bg-zinc-100/60 flex items-center justify-center text-blue-600">
          <CiSettings />
        </span>
        <span className="h-9 w-9 rounded-full bg-zinc-100/60 flex items-center justify-center text-blue-600">
          <CiBellOn />
        </span>
        <main
          onClick={() => Setdropdown(!dropdown)}
          className="flex items-center gap-1 cursor-pointer"
        >
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

      <section
        className={`absolute ${
          dropdown ? "maxheightfull" : "maxheight0"
        } bg-white transition-all backdrop-blur-md w-[200px] top-full rounded-b-2xl overflow-hidden right-0 z-[11] `}
      >
        <main className="flex flex-col w-full p-4 gap-1">
          {renderDropdownLinks()}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-0.5 text-xs px-3 py-2.5 rounded-xl font-semibold bg-[#f30000] cursor-pointer text-white `}
          >
            {disableBtn ? (
              <span className="spinner h-[15px] w-[15px] mx-auto border-2 border-white border-b-transparent rounded-full inline-block"></span>
            ) : (
              <>
                <IoExitOutline /> Logout
              </>
            )}
          </button>
        </main>
      </section>
    </header>
  );
}
