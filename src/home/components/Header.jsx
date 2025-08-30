import { FaChevronDown, FaMagento } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { CiLogin } from "react-icons/ci";
import { BsArrowRight, BsFolder2Open } from "react-icons/bs";
import { RiServiceLine, RiShieldKeyholeLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
  FaQuestionCircle,
  FaRegNewspaper,
  FaUsers,
  FaCity,
} from "react-icons/fa";
import { MdGavel, MdRateReview, MdContactMail } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoImagesOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { HiOutlineViewGridAdd } from "react-icons/hi";

export default function Header() {
  const user = useSelector((state) => state.user);
  const userRoles = [
    {
      role: "User",
      Route: "/dashboard",
    },
    {
      role: "Agent",
      Route: "/agency",
    },
    {
      role: "Admin",
      Route: "/admin",
    },
  ];
  const navLinks = [
    {
      id: "1",
      name: "Home",
      path: "/",
      icon: <FiHome />,
    },
    {
      id: "2",
      name: "Listings",
      path: "/listings",
      icon: <BsFolder2Open />,
    },
    {
      id: "3",
      name: "Categories",
      path: "/listing/categories",
      icon: <RiServiceLine />,
    },
    {
      id: "4",
      name: "Agents",
      path: "/agents",
      icon: <FaUsers />,
    },
    {
      id: "5",
      name: "Neighborhoods",
      path: "/neighborhood",
      icon: <FaCity />,
    },
    {
      id: "7",
      name: "Reviews",
      path: "/reviews",
      icon: <MdRateReview />,
    },
    {
      id: "8",
      name: "About",
      path: "/about",
      icon: <IoInformationCircleOutline />,
    },
    {
      id: "9",
      name: "Contact",
      path: "/contact",
      icon: <MdContactMail />,
    },
    {
      id: "10",
      name: "FAQs",
      path: "/faq",
      icon: <FaQuestionCircle />,
    },
    {
      id: "11",
      name: "Privacy Policy",
      path: "/privacy-policy",
      icon: <RiShieldKeyholeLine />,
    },
    {
      id: "12",
      name: "Terms & Conditions",
      path: "/terms-of-service",
      icon: <MdGavel />,
    },
    {
      id: "13",
      name: "Blog",
      path: "/blogs",
      icon: <FaRegNewspaper />,
    },
    {
      id: "14",
      name: "Gallery",
      path: "/gallery",
      icon: <IoImagesOutline />,
    },
  ];
  const userRole = userRoles.find((r) => r.role === user?.role);

  const [dropdown, Setdropdown] = useState(false);
  const location = useLocation();
  const renderLinks = () => {
    return navLinks.map(({ name, path, id, icon }) => (
      <Link
        key={id}
        to={path}
        className={`px-5 py-2 text-xs rounded-full  flex items-center gap-1 border-b border-transparent hover:border-white ${
          location.pathname === path ? "border-white" : ""
        } `}
      >
        {name}
        {icon}
      </Link>
    ));
  };
  const renderLinks2 = () => {
    return navLinks.slice(5).map(({ name, path, id, icon }) => (
      <Link
        key={id}
        to={path}
        className={`px-5 py-2 text-xs rounded-full  flex items-center gap-1 border-b border-transparent hover:border-white ${
          location.pathname === path ? "border-white" : ""
        } `}
      >
        {name}
        {icon}
      </Link>
    ));
  };

  useEffect(() => {
    return () => {
      Setdropdown(false);
    };
  }, [location.pathname]);
  return (
    <>
      <header className="flex items-center justify-between px-6 lg:px-12 fixed w-full top-0 left-0 z-[100] text-white bg-[#013a71]">
        <Link to={"/"} className="flex items-center gap-1">
          <span className="h-8 w-8 rounded-lg text-lg bg-white text-primary flex items-center justify-center">
            <FaMagento />
          </span>
          <div className="text-xl font-medium text-white">HouseHunter</div>
        </Link>

        <main className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.slice(0, 5).map((link, index) => (
            <Link
              key={link.id}
              to={link.path}
              className="flex items-center gap-1"
            >
              {link.name}
            </Link>
          ))}
          <div
            className="flex items-center gap-2 relative py-6 cursor-pointer "
            onMouseEnter={() => Setdropdown(true)}
            onMouseLeave={() => Setdropdown(false)}
          >
            <p>Pages</p>
            <FaChevronDown className="text-xs " />

            <section
              className={`absolute ${
                dropdown ? "maxheightfull" : "maxheight0"
              } bg-primary transition-all backdrop-blur-md w-max top-full rounded-b-2xl overflow-hidden right-0 z-[5] `}
            >
              <main className="flex flex-col w-full p-4 gap-1">
                {renderLinks2()}
                <Link
                  to={"/login"}
                  className="px-5 py-2.5 rounded-full bg-white text-primary flex text-xs items-center gap-1 justify-center"
                >
                  Login
                  <CiLogin />
                </Link>
              </main>
            </section>
          </div>
        </main>

        <section className="hidden lg:flex items-center gap-3 text-sm">
          {user ? (
            <Link
              to={user && userRole ? userRole.Route : "/dashboard"}
              className="flex items-center gap-2 bg-white text-primary p-1 rounded-full pl-4"
            >
              Dashboard
              <span className="h-7 w-7 rounded-full bg-black text-white flex items-center justify-center">
                <HiOutlineViewGridAdd />
              </span>
            </Link>
          ) : (
            <>
              <Link to={"/login"}>Log in</Link>{" "}
              <Link
                to={"/register"}
                className="flex items-center gap-2 bg-white text-primary p-1 rounded-full pl-4"
              >
                Sign up{" "}
                <span className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center">
                  <BsArrowRight />
                </span>
              </Link>
            </>
          )}
        </section>
        {/* <section className="hidden lg:flex items-center gap-10 ">
          <main className="flex items-center gap-5 text-black">
            <div className="flex items-center gap-1">
              <span className="h-9 w-9 rounded-full shrink-0 bg-white flex items-center justify-center cursor-pointer">
                <AiOutlineSearch className="text-lg" />
              </span>
              <Link
                to={"/login"}
                className="h-9 w-9 rounded-full shrink-0 bg-white flex items-center justify-center cursor-pointer"
              >
                <AiOutlineUser className="text-lg" />
              </Link>
            </div>
            <Link
              to={"/register"}
              className="bg-white rounded-full px-6 py-1.5 flex items-center justify-center text-sm font-medium "
            >
              <p className="">Get Started</p>
            </Link>
          </main>
        </section> */}

        <span
          onClick={() => Setdropdown(!dropdown)}
          className="h-9 w-9 rounded-full shrink-0 bg-white text-[#013a71] flex lg:hidden items-center justify-center cursor-pointer my-3 "
        >
          <IoMenu className="text-xl" />
        </span>

        <section
          className={`absolute lg:hidden ${
            dropdown ? "maxheightfull" : "maxheight0"
          } bg-primary transition-all backdrop-blur-md w-max top-full rounded-b-2xl overflow-hidden overflow-y-scroll right-6 z-[5] `}
        >
          <main className="flex flex-col w-full p-4 gap-1">
            {renderLinks()}
            <Link
              to={"/login"}
              className="px-5 py-2.5 rounded-full bg-white text-primary flex text-xs items-center gap-1 justify-center"
            >
              Login
              <CiLogin />
            </Link>
          </main>
        </section>
      </header>
    </>
  );
}
