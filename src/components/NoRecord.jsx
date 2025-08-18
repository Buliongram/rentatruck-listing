import { noresult } from "../assets/images/images";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NoRecord() {
  return (
    <section className="flex flex-col items-center mx-auto gap-2">
      <img
        src={noresult}
        alt="no records found"
        className="w-[150px]"
        loading="lazy"
      />
      <p className="text-xl lg:text-2xl  font-medium">No Records found.</p>
      <Link to={"/"} className="button-primary">
        Back to home
        <FaHome />
      </Link>
    </section>
  );
}
