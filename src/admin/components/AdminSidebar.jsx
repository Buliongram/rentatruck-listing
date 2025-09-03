import React, { useState } from "react";
import {
  BiMessageSquareDetail,
  BiPhoneCall,
  BiSupport,
  BiUser,
} from "react-icons/bi";
import { FaRegHeart, FaRegNewspaper } from "react-icons/fa6";
import { GoGear, GoShield } from "react-icons/go";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { IoExitOutline, IoGridOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineReceiptLong, MdOutlineReviews } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { bluebg } from "../../assets/images/images";
import { FaCrown, FaMagento } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { updateUser } from "../../assets/store/userSlice";

export default function AdminSidebar() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disableBtn, setDisableBtn] = useState(false);
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
      name: "Blogs",
      path: "/admin/blogs",
      icon: <FaRegNewspaper />,
      user: true,
    },
    {
      id: "3",
      name: "Contacts",
      path: "/admin/contacts",
      icon: <BiPhoneCall />,
      user: true,
    },
    {
      id: "4",
      name: "Subscriptions",
      path: "/admin/subscriptions",
      icon: <FaCrown />,
      user: true,
    },
    {
      id: "5",
      name: "Transactions",
      path: "/admin/transactions",
      icon: <MdOutlineReceiptLong />,
      user: true,
    },

    // {
    //   id: "2",
    //   name: "Messages",
    //   path: "/admin/messages",
    //   icon: <BiMessageSquareDetail />,
    //   user: true,
    // },
    // {
    //   id: "3",
    //   name: "Saved Items",
    //   path: "/admin/saved-items",
    //   icon: <FaRegHeart />,
    //   user: true,
    // },
    {
      id: "6",
      name: "Security",
      path: "/admin/security",
      icon: <GoShield />,
      user: true,
    },
    // {
    //   id: "5",
    //   name: "Reviews",
    //   path: "/admin/reviews",
    //   icon: <MdOutlineReviews />,
    //   user: true,
    // },
    {
      id: "7",
      name: "Profile",
      path: "/admin/profile",
      icon: <BiUser />,
      user: true,
    },
    // {
    //   id: "7",
    //   name: "Help Center",
    //   path: "/admin/support",
    //   icon: <BiSupport />,
    //   user: true,
    // },
  ];

  const renderLinks = () => {
    return navLinks.map(({ name, path, id, icon }) => (
      <Link
        key={id}
        to={path}
        className={`px-4 py-2 text-xs rounded-xl  flex items-center gap-1 border-b border-transparent font-semibold ${
          location.pathname === path
            ? "bg-zinc-950 text-white"
            : "bg-zinc-100/60 hover:bg-zinc-950 text-zinc-600 hover:text-white"
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
        <main className="flex-col w-full">
          <div className="flex items-center gap-1 text-sm pb-4 border-b border-zinc-200">
            <span className="h-7 w-7 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <HiOutlineHomeModern />
            </span>
            <span className="text-[16px] font-semibold text-emerald-9bg-zinc-950">
              HouseHunter
            </span>
          </div>

          <section className="flex flex-col w-full gap-1 mt-6">
            {renderLinks()}
          </section>
        </main>
        <button
          onClick={handleLogout}
          className="text-xs bg-[#f30000] flex items-center gap-1 text-white px-6 w-full rounded-xl py-2 justify-center cursor-pointer relative z-10"
        >
          {disableBtn ? (
            <span className="spinner h-[15px] w-[15px] mx-auto border-2 border-white border-b-transparent rounded-full inline-block"></span>
          ) : (
            <>
              <IoExitOutline /> Logout
            </>
          )}
        </button>
      </section>
    </>
  );
}
