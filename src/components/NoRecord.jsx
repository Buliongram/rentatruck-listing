import { noresult } from "../assets/images/images";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NoRecord({ margin, text, fontSize }) {
  return (
    <section
      className={`flex flex-col items-center mx-auto gap-2 ${
        margin ? `my-${margin}` : "my-32"
      }`}
    >
      <img
        src={noresult}
        alt="no records found"
        className="w-[150px]"
        loading="lazy"
      />
      <p
        className={`${
          fontSize ? `text-[${fontSize}px]` : "text-lg"
        } font-medium font-primary`}
      >
        {text || "No Records found."}
      </p>
    </section>
  );
}
