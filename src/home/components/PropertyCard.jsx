import { FaEye, FaLocationDot } from "react-icons/fa6";
import ShareButton from "../../admin/components/ShareButton";
import { Link } from "react-router-dom";
import { BiArea, BiBed } from "react-icons/bi";
import { GiBathtub } from "react-icons/gi";
import { TbMeterSquare } from "react-icons/tb";

export default function PropertyCard({
  _id,
  images,
  title,
  price,
  purpose,
  location,
  bathrooms,
  bedrooms,
  areaSize,
  category,
}) {
  return (
    <>
      <Link to={`/listing/${_id}`} className="h-[320px] rounded-3xl relative">
        {images?.length ? (
          <img
            src={images[0].url}
            loading="lazy"
            className="h-full w-full rounded-2xl object-cover"
            alt={title}
          />
        ) : (
          ""
        )}

        <div className="absolute top-3 left-3 bg-orange-600 text-white rounded-lg text-[10px] font-semibold px-3 py-1">
          {category || "House"}
        </div>

        <div className="absolute top-3 right-3 bg-primary text-white rounded-lg text-[10px] font-semibold px-3 py-1">
          {purpose || "House"}
        </div>

        <main className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[94%] p-3 bg-white rounded-2xl flex flex-col divide-y divide-zinc-300">
          <article className="flex flex-col gap-2 pb-2 w-full">
            <section className="flex items-center gap-5 justify-between">
              <h3 className="text-[15px] font-semibold leading-tight ">
                {title}
              </h3>
              <ShareButton
                listingTitle={title}
                listingUrl={`https://your-domain.com/listing/single/${_id}`}
              />
            </section>
            <p className="text-[10px] text-zinc-600 flex items-center">
              <FaLocationDot className="text-primary" />
              {location.area + ", " + location.state}
            </p>
          </article>
          <article className="flex items-center justify-between pt-2">
            <h3 className="text-[16px] font-semibold font-primary">
              <span className="font">&#8358;</span>
              {price.toLocaleString()}
            </h3>

            <div className="flex items-center gap-1 text-[10px]">
              Williams Graham
              <span className="h-5 w-5 rounded-full">
                <img
                  src={images[0].url}
                  loading="lazy"
                  className="h-full w-full rounded-2xl object-cover"
                  alt={title}
                />
              </span>
            </div>
          </article>

          <main className="flex items-center justify-between text-[11px] text-white bg-primary p-1 rounded-lg font-normal">
            <div className="flex items-center gap-1">
              <BiBed />
              <span>
                {bedrooms} bedroom{bedrooms > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <GiBathtub />
              <span>
                {bathrooms} bathroom{bathrooms > 1 ? "s" : ""}
              </span>
            </div>

            <main className="flex items-center gap-1">
              <BiArea />
              <span>{areaSize}</span>
              <TbMeterSquare className="-ml-1" />
            </main>
          </main>
        </main>
      </Link>
    </>
  );
}
