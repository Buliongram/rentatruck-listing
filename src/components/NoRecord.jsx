import { noresult } from "../assets/images/images";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NoRecord() {
  return (
    <section className="flex flex-col items-center mx-auto gap-2 my-32">
      <img
        src={noresult}
        alt="no records found"
        className="w-[150px]"
        loading="lazy"
      />
      <p className="text-xl font-medium font-primary">No Records found.</p>
    </section>
  );
}
