
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaMagento,
} from "react-icons/fa6";
import { CiBellOn, CiSettings } from "react-icons/ci";
export default function PanelHeader() {
  const location = useLocation();
  const userState = useSelector((state) => state.user);

  return (
    <>
      <header className="flex items-center justify-between bg-white p-3 rounded-2xl">
        <Link to={"/"} className="flex items-center gap-1">
          <span className="h-8 w-8 rounded-xl text-[16px] bg-blue-600 text-white flex items-center justify-center">
            <FaMagento />
          </span>
          <div className="text-lg font-semibold text-blue-600 font-primary mt-1">
            HouseHunter
          </div>
        </Link>

        <section className="flex items-center gap-1">
          <span className="h-9 w-9 rounded-full bg-zinc-100/60 flex items-center justify-center text-blue-600">
            <CiSettings />
          </span>
          <span className="h-9 w-9 rounded-full bg-zinc-100/60 flex items-center justify-center text-blue-600">
            <CiBellOn />
          </span>
          <main className="flex items-center gap-1 cursor-pointer">
            <span className="h-9 w-9 rounded-full bg-zinc-100/60">
              <img
                src={"https://randomuser.me/api/portraits/men/40.jpg"}
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
          </main>
        </section>
      </header>
    </>
  );
}
