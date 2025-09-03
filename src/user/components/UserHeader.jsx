import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaMagento } from "react-icons/fa6";
import { CiBellOn, CiSettings } from "react-icons/ci";
import { useEffect, useState } from "react";
export default function UserHeader() {
  const [greeting, setGreeting] = useState("");
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const hour = new Date().getHours();
    let greet = "";
    if (hour >= 0 && hour < 12) {
      greet = "Good morning";
    } else if (hour >= 12 && hour < 16) {
      greet = "Good afternoon";
    } else {
      greet = "Good evening";
    }
    setGreeting(greet);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between bg-white p-3 rounded-2xl">
        <Link to={"/"} className="flex items-center gap-1">
          <span className="h-8 w-8 rounded-xl text-[16px] bg-zinc-950 text-white flex items-center justify-center">
            👋
          </span>
          <div className="text-lg font-semibold text-zinc-950 font-primary mt-1 capitalize">
            {`${greeting}, ${user.firstname}!`}
          </div>
        </Link>

        <section className="flex items-center gap-1">
          <span className="h-9 w-9 rounded-full bg-zinc-100/60 flex items-center justify-center text-zinc-950">
            <CiSettings />
          </span>
          <span className="h-9 w-9 rounded-full bg-zinc-100/60 flex items-center justify-center text-zinc-950">
            <CiBellOn />
          </span>
          <main className="flex items-center gap-1 cursor-pointer">
            <span className="h-9 w-9 rounded-full bg-zinc-100/60">
              <img
                src={"https://randomuser.me/api/portraits/men/40.jpg"}
                alt={user.firstname + " Image"}
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold">
                {`${user.firstname} ${user.lastname || ""}`}
              </span>
              <p className="text-[10px] text-zinc-500">{user.role}</p>
            </div>
          </main>
        </section>
      </header>
    </>
  );
}
