import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

export default function AgentCard({ id, name, title, image }) {
  return (
    <>
      <Link to={`/agent/single/${id}`} className="flex flex-col gap-3 group">
        <div className="h-[280px] rounded-2xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover rounded-2xl group-hover:scale-[1.2]"
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="flex flex-col">
            <h3 className="font-medium lg:text-lg">{name}</h3>
            <p className="text-zinc-500 font-normal text-xs">{title}</p>
          </span>
          <span className="flex items-center justify-center h-8 w-8 border border-zinc-400 rounded-full">
            <GoArrowUpRight />
          </span>
        </div>
      </Link>
    </>
  );
}
