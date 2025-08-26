import React from "react";
import { noresult } from "../../assets/images/images";

export default function Messages() {
  return (
    <section className="flex flex-col items-center justify-center mx-auto gap-2 h-[400px]">
      <img
        src={noresult}
        alt="no records found"
        className="w-[150px]"
        loading="lazy"
      />
      <p className="font-medium">You currently have no conversations</p>
    </section>
  );
}
