import { useSelector } from "react-redux";
import GreenSpinner from "../components/GreenSpinner";
import CircularProgress from "../components/CircularProgress";
export default function Listings({ listings, loading }) {
  const user = useSelector((state) => state.user);

  const activeListings =
    listings?.filter((prop) => prop.status == "active").length || 0;
  const pendingListing =
    listings?.filter((prop) => prop.status == "pending").length || 0;
  const archivedListing =
    listings?.filter((prop) => prop.status == "archived").length || 0;
  return (
    <>
      <section className="w-full flex items-center gap-4">
        <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs text-zinc-500">Total Properties</p>
            <h3 className="font-bold text-2xl font-primary">
              {loading ? <GreenSpinner /> : <>{listings && listings.length}</>}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(listings.length) / Number(listings?.length)) *
                100
              ).toFixed(1) || 0
            }
            color={"#155dfc"}
          />
        </article>

        <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs text-zinc-500">Published Properties</p>
            <h3 className="font-bold text-2xl font-primary">
              {loading ? <GreenSpinner /> : <>{activeListings}</>}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(activeListings) / Number(listings?.length)) *
                100
              ).toFixed(1) || 0
            }
            color={"#007a55"}
          />
        </article>
        <article className="bg-white rounded-2xl p-4 w-full flex items-center justify-between">
          <main className="flex flex-col gap-1">
            <p className="text-xs text-zinc-500 ">Pending Properties</p>
            <h3 className="font-bold text-2xl font-primary">
              {loading ? <GreenSpinner /> : <>{pendingListing}</>}
            </h3>
          </main>
          <CircularProgress
            percentage={
              (
                (Number(pendingListing) / Number(listings?.length)) *
                100
              ).toFixed(1) || 0
            }
            color={"#ff6900 "}
          />
        </article>
      </section>
    </>
  );
}
