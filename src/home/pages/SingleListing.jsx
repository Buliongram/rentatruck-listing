import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { listings } from "../../data/listingData";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  IoCheckmarkCircleOutline,
  IoHeartOutline,
  IoShareOutline,
} from "react-icons/io5";
import Newsletter from "../includes/Newsletter";
import NoRecord from "../../components/NoRecord";
import { CiShop } from "react-icons/ci";
import { LuBath, LuBed, LuPaintbrushVertical } from "react-icons/lu";
import { BiArea } from "react-icons/bi";

export default function SingleListing() {
  const position = [9.0579, 7.4951];
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const projectDetails = { projectId: params.id };
  useEffect(() => {
    const fetchListings = async () => {
      const url =
        window.location.hostname === "localhost"
          ? "http://localhost:5000/api/project"
          : "https://rentahome-server.onrender.com/api/project";

      const cacheKey = `project${params.id}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      setLoading(true);

      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${url}/last-updated/${params.id}`);

        if (cached && cached.lastUpdated === lastUpdated) {
          setProject(cached.foundData);
          setLoading(false);
          return;
        }
        const res = await axios.post(`${url}/find`, projectDetails, {
          withCredentials: true,
        });
        const data = res.data;

        if (data.error) {
          toast.error(data.message, { id: "123" });
          setTimeout(() => navigate("/projects"), 1000);
        } else {
          const foundData = data.findProject;
          setProject(foundData);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ foundData, lastUpdated })
          );
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        toast.error("An unknown error occurred", { id: "123" });
        setTimeout(() => navigate("/projects"), 1000);
      }
    };

    const listingData = listings.find((el) => el.id === params.id.toString());
    if (listingData) setListing((prev) => ({ ...listingData }));
    setLoading(false);

    // fetchListings();
  }, [params.id]);

  return (
    <>
      <section className=" p-8 pt-28 lg:px-28 flex flex-col items-center gap-10">
        {listing ? (
          <>
            <section className="flex flex-col lg:flex-row w-full items-center lg:items-end justify-between gap-4">
              <section className="flex flex-col items-center lg:items-start gap-1 w-full lg:gap-2">
                <span className="border rounded-full border-zinc-300 p-0.5 lg:py-1 px-5 text-[10px] lg:text-xs text-primary flex items-center gap-1 w-max">
                  <CiShop />
                  <p className=" uppercase" data-aos="flip-up">
                    Single listing
                  </p>
                </span>
                <h1
                  className="text-3xl lg:text-5xl font-normal text-center lg:text-left w-full mx-auto capitalize"
                  data-aos="fade-left"
                >
                  {listing?.title}
                </h1>
                <p className="text-sm font-normal text-center lg:text-left text-zinc-500 max-w-[500px]">
                  {listing?.address}
                </p>
              </section>
              <main className="flex items-center gap-2 text-[13px]">
                <div className=" rounded-lg bg-zinc-100 flex items-center justify-center gap-1 px-4 py-2">
                  <IoShareOutline /> Share
                </div>

                <div className=" rounded-lg bg-zinc-100 flex items-center justify-center gap-1 px-4 py-2">
                  <IoHeartOutline /> Favourite
                </div>
              </main>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <div className="rounded-lg overflow-hidden group sm:col-span-2 sm:row-span-2">
                <img
                  src={listing?.image[0]}
                  loading="lazy"
                  alt={listing?.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden group ">
                <img
                  src={listing?.image[1]}
                  loading="lazy"
                  alt={listing?.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden group ">
                <img
                  src={listing?.image[2]}
                  loading="lazy"
                  alt={listing?.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </section>

            <section className="flex flex-col lg:flex-row gap-4 w-full -mt-5">
              <section className="w-full flex flex-col gap-4">
                <main className="p-5 border border-zinc-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-zinc-500 text-xs lg:text-sm">
                      Bedrooms
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[13px] lg:text-[15px]">
                      <LuBed /> {listing?.bedroom}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-zinc-500 text-xs lg:text-sm">
                      Bathrooms
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[13px] lg:text-[15px]">
                      <LuBath /> {listing?.bathroom}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-zinc-500 text-xs lg:text-sm">
                      Square Area
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[13px] lg:text-[15px]">
                      <BiArea /> {listing?.squareMeters}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-zinc-500 text-xs lg:text-sm">
                      Repair Quality
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[13px] lg:text-[15px]">
                      <LuPaintbrushVertical /> Moderm Loft
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-zinc-500 text-xs lg:text-sm">
                      Status
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[13px] lg:text-[15px]">
                      <IoCheckmarkCircleOutline /> 4
                    </span>
                  </div>
                </main>

                <main className="flex flex-col">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-sm text-zinc-500 font-normal">
                    {listing?.description}
                  </p>
                </main>

                <main className="flex flex-col mt-6">
                  <h3 className="text-lg font-semibold">Other Information</h3>
                  <p className="text-sm text-zinc-500 font-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio adipisci, nulla doloremque itaque dicta officiis.
                    Consequuntur incidunt cum eveniet voluptate et nobis
                    repellendus ut. Recusandae, vel aut neque atque modi ullam
                    eos ducimus est illum cupiditate veritatis facilis rerum
                    saepe deleniti distinctio in nostrum asperiores.
                    Consequuntur amet nam animi magni.
                  </p>
                </main>

                {/* <main className="bg-zinc-100/50 p-5 rounded-2xl flex items-end justify-between border border-zinc-200">
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-primary">
                      Listed by property owner
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="h-10 w-10 rounded-full">
                        <img
                          src={banner}
                          alt=""
                          className="h-full w-full rounded-full object-cover"
                        />
                      </span>
                      <span className="flex flex-col justify-between text-sm">
                        <p className="font-semibold">Williams</p>
                        <p className="text-xs text-zinc-500">
                          Lorem ipsum dolor sit amet.
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-6 py-1.5 bg-black text-white">
                      hello
                    </span>
                    <span className="px-6 py-1.5 bg-black text-white">
                      hello
                    </span>
                  </div>
                </main> */}
              </section>
              <section className="w-full max-w-[340px] bg-zinc-100 rounded-2xl h-[300px] overflow-hidden">
                <MapContainer
                  center={position}
                  zoom={13}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  <Marker position={position}>
                    <Popup>Guzape Luxury Estate</Popup>
                  </Marker>
                </MapContainer>
              </section>
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
