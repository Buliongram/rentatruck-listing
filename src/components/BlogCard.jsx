import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({
  id,
  title,
  author,
  date,
  thumbnail,
  authorImage,
}) {
  return (
    <>
      <Link to={`/blogs/${id}`} className="flex flex-col gap-3">
        <div className="h-[200px] rounded-2xl overflow-hidden relative ">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
        <h3 className="text-sm lg:text-lg font-medium">{title}</h3>

        <div className="flex items-center gap-2">
          <Link to={'/'} className="h-10 w-10 rounded-full shrink-0">
            <img
              src={authorImage}
              alt={author}
              className="h-full w-full rounded-full object-cover"
            />
          </Link>
          <span className="flex flex-col justify-between text-xs gap-1 ">
            <h3 className="font-semibold text-primary">{author}</h3>
            <p className="text-zinc-500">{date}</p>
          </span>
        </div>
      </Link>
    </>
  );
}
