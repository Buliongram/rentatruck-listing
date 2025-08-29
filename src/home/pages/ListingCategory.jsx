import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { listings } from "../../data/listingData";
import { MdOutlineLocationCity } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";

import {
  IoChevronDown,
  IoGridOutline,
  IoListOutline,
  IoMapOutline,
} from "react-icons/io5";
import ListingCard from "../components/ListingCard";
import Newsletter from "../includes/Newsletter";
import NoRecord from "../../components/NoRecord";

export default function ListingCategory() {
  const params = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
 
    const listingCategory = listings.filter(
      (listing) => listing.category.toLowerCase() === params.id.toString()
    );

    if (listingCategory.length > 0) {
      setCategory(listingCategory);
    }
    setLoading(false);

  }, [params.id]);

  return (
    <>
      <section className=" p-8 pt-28 lg:px-28 flex flex-col items-center gap-10">
        {category ? (
          <>
            <section className="flex flex-col items-center gap-2 w-full">
              <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
                <TbCategoryPlus />
                <p className=" uppercase" data-aos="flip-up">
                  Category
                </p>
              </span>
              <h1
                className="text-3xl lg:text-5xl font-normal text-center max-w-[800px] w-full mx-auto capitalize"
                data-aos="fade-left"
              >
                {params.id.replaceAll("-", " ")}
              </h1>
            </section>

            <section className="flex w-full items-center justify-between">
              <main className="text-sm font-normal">
                {category?.length} item{category?.length === 1 ? "" : "s"} found
              </main>
              <main className="flex items-center gap-3 text-xl">
                <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <IoGridOutline />
                </div>

                <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <IoListOutline />
                </div>
                <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <IoMapOutline />
                </div>
                <div className=" rounded-lg bg-zinc-100 flex items-center justify-center gap-2 text-sm px-4 py-2">
                  Sort By <IoChevronDown />
                </div>
              </main>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full ">
              {category.map((product, index) => (
                <ListingCard key={product.id} {...product} />
              ))}
            </section>
          </>
        ) : (
          <section className="px-4 py-5">
            <h3 className="text-slate-800 text-xl md:text-2xl text-center py-5">
              {loading ? "Fetching category listings..." : <NoRecord />}
            </h3>
          </section>
        )}
      </section>
      <Newsletter />
    </>
  );
}
