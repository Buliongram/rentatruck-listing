import { FaMagento } from "react-icons/fa6";

export default function Preloader() {
  return (
    <section className="fixed top-0 left-0 w-full h-full  z-[200] bg-primary flex items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="h-8 w-8 lg:h-12 lg:w-12 rounded-xl text-2xl bg-white text-primary flex items-center justify-center">
          <FaMagento />
        </span>
        <div className="font-medium text-white loader text-2xl lg:text-4xl"></div>
      </div>
      {/* <img
        src={}
        alt="icon"
        className="w-[80px] border rounded-[24px] border-zinc-300"
      /> */}
    </section>
  );
}
