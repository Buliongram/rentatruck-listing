import React from "react";
import { LuNewspaper } from "react-icons/lu";
import { blogs } from "../../data/BlogData";
import BlogCard from "../../components/BlogCard";

export default function Blogs() {
  return (
    <>
      <section className="flex flex-col gap-10 p-8  py-28 lg:p-28 lg:pb-0">
        <section className="flex flex-col items-center gap-2 w-full">
          <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
            <LuNewspaper />
            <p className=" uppercase" data-aos="flip-up">
              Blog
            </p>
          </span>
          <h1
            className="text-3xl lg:text-5xl font-normal text-center max-w-[700px] w-full mx-auto"
            data-aos="fade-left"
          >
            Our Blog
          </h1>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </section>
      </section>
    </>
  );
}
