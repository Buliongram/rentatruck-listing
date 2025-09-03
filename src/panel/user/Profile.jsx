import React, { useRef } from "react";
import { agent4 } from "../../data/agentData";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSettings } from "../utilities/useSettings";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const { handleProfilePhotoUpload, isLoading } = useSettings();

  const fileInputRef = useRef(null);

  const handlePhotoClick = (e) => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleProfilePhotoUpload(file);
    e.target.value = "";
  };
  return (
    <section className="flex flex-col gap-5 w-full lg:p-14 p-4">
      <article className="flex flex-col gap-3 w-full">
        <span className="text-sm font-semibold">My profile</span>
        <main className="flex justify-between p-6 border border-zinc-300 rounded-2xl bg-white w-full">
          <section className="flex items-center gap-2">
            <form
              encType="multipart/form-data"
              className="h-14 w-14 lg:h-20 lg:w-20 rounded-full bg-[#f5f5f3] flex items-center justify-center text-zinc-950 text-xl lg:text-2xl font-semibold cursor-pointer relative group uppercase"
              onClick={handlePhotoClick}
            >
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (user.firstname && user.lastname) || "" ? (
                `${user.firstname[0] + user.lastname[0] || ""}`
              ) : (
                "R"
              )}
              <span className="h-full w-full absolute top-0 left-0 flex flex-col gap-1 items-center justify-center bg-zinc-500/50 rounded-full text-3xl text-white opacity-0 group-hover:opacity-100 transition-all">
                {isLoading.photo ? (
                  <span className="spinner h-[30px] w-[30px] border-4 border-zinc-950 border-b-transparent rounded-full inline-block"></span>
                ) : (
                  <>
                    <FaCamera />
                  </>
                )}
              </span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                disabled={isLoading.photo}
              />
            </form>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium capitalize text-sm">
                {`${user.firstname} ${user.lastname || ""}`}
              </span>
              <p className="text-xs font-medium text-zinc-500">
                HouseHunter {user.type}
              </p>
              <p className="text-xs  text-zinc-400">
                S7irr2oo7b62koaw21yy5ytta42f779vb63r5
              </p>
            </div>
          </section>
          <Link
            to={"/dashboard/security"}
            className="text-xs  cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 h-max px-3 text-zinc-500/80"
          >
            Edit <FaPencilAlt />
          </Link>
        </main>
      </article>
      <article className="flex flex-col gap-4 p-6 border border-zinc-300 rounded-2xl bg-white w-full">
        <section className="flex items-center justify-between">
          <span className="text-sm font-semibold">Personal Information</span>
          <Link
            to={"/dashboard/security"}
            className="text-xs  cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 h-max px-3 text-zinc-500/80"
          >
            Edit <FaPencilAlt />
          </Link>
        </section>
        <section className="flex items-center justify-between text-xs w-full">
          <main className="flex flex-col gap-1 w-full">
            <p className=" text-zinc-500">First Name</p>
            <p className=" font-medium capitalize">{user.firstname}</p>
          </main>

          <main className="flex flex-col gap-1 w-full">
            <p className=" text-zinc-500">Last Name</p>
            <p className=" font-medium capitalize">{user.lastname || ""}</p>
          </main>

          <main className="w-full"></main>
        </section>

        <section className="flex items-center justify-between text-xs w-full">
          <main className="flex flex-col gap-1 w-full">
            <p className=" text-zinc-500">Email address</p>
            <p className=" font-medium">{user.email}</p>
          </main>

          <main className="flex flex-col gap-1 w-full">
            <p className=" text-zinc-500">Phone number</p>
            <p className=" font-medium capitalize">+{user.number}</p>
          </main>

          <main className="w-full"></main>
        </section>

        <section className="flex items-center justify-between text-xs w-full">
          <main className="flex flex-col gap-1 w-full">
            <p className=" text-zinc-500">Account role</p>
            <p className=" font-medium">{user.type}</p>
          </main>

          <main className="flex flex-col gap-1 w-full">
            <p className=" text-zinc-500">Country</p>
            <p className=" font-medium capitalize">{user.country}</p>
          </main>

          <main className="w-full"></main>
        </section>
      </article>

      <article className="flex flex-col gap-4 p-6 border border-zinc-300 rounded-2xl bg-white w-full">
        <section className="flex items-center justify-between">
          <span className="text-sm font-semibold">Address</span>
          <Link
            to={"/dashboard/security"}
            className="text-xs  cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 h-max px-3 text-zinc-500/80"
          >
            Edit <FaPencilAlt />
          </Link>
        </section>
        <section className="flex items-center justify-between text-xs w-full">
          <main className="flex flex-col gap-1 w-full">
            <p className=" text-zinc-500">Country</p>
            <p className=" font-medium capitalize">{user.country}</p>
          </main>

          <main className="flex flex-col gap-1 w-full">
            <p className=" text-zinc-500">City / State</p>
            <p className=" font-medium capitalize">{user.country}</p>
          </main>

          <main className="w-full"></main>
        </section>
        <section className="flex items-center justify-between text-xs w-full">
          <main className="flex flex-col gap-1 w-full">
            <p className=" text-zinc-500">Postal code</p>
            <p className=" font-medium">{user.country}</p>
          </main>

          <main className="w-full"></main>

          <main className="w-full"></main>
        </section>
      </article>
    </section>
  );
}
