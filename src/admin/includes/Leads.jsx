import { format, parseISO } from "date-fns";
import { BiMessage, BiPhone } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";

export default function Leads() {
  return (
    <>
      <section className="w-full flex justify-between gap-5 bg-white rounded-2xl overflow-hidden border border-zinc-200 divide-x divide-zinc-200 p-3">
        <div className="flex flex-col w-full max-w-[250px] shrink-0 p-4 justify-center items-center">
          <span className="text-4xl font-medium font-primary -mb-2">1</span>
          <p className="text-[11px] text-zinc-500">
            {format(parseISO(new Date().toISOString()), "MMMM")} Leads
          </p>
        </div>

        <main className="flex justify-between px-4 w-full">
          <section className="flex items-center gap-1">
            <span className="h-10 w-10 rounded-full bg-emerald-950 flex items-center justify-center text-white text-xl">
              <BiPhone />
            </span>
            <div className="flex flex-col-reverse">
              <span className="text-lg font-medium font-primary -mb-2">1</span>
              <p className="text-[11px] text-zinc-500">Phone</p>
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <span className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-500">
              ?
            </span>
            <p className="text-xs text-orange-500">25%</p>
          </section>
        </main>

        <main className="flex justify-between px-4 w-full">
          <section className="flex items-center gap-1">
            <span className="h-10 w-10 rounded-full bg-red-800 flex items-center justify-center text-white text-xl">
              <FaWhatsapp />
            </span>
            <div className="flex flex-col-reverse">
              <span className="text-lg font-medium font-primary -mb-2">1</span>
              <p className="text-[11px] text-zinc-500">WhatsApp</p>
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <span className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-500">
              ?
            </span>
            <p className="text-xs text-green-500">25%</p>
          </section>
        </main>

        <main className="flex justify-between px-4 w-full">
          <section className="flex items-center gap-1">
            <span className="h-10 w-10 rounded-full bg-yellow-700 flex items-center justify-center text-white text-xl">
              <BiMessage />
            </span>
            <div className="flex flex-col-reverse">
              <span className="text-lg font-medium font-primary -mb-2">1</span>
              <p className="text-[11px] text-zinc-500">Messages</p>
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <span className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-sm text-zinc-500">
              ?
            </span>
            <p className="text-xs text-indigo-500">25%</p>
          </section>
        </main>
      </section>
    </>
  );
}
