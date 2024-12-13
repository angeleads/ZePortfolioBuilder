// components/CallToActionSection.tsx
"use client";
import Link from "next/link";

const CallToActionSection = () => {
  return (
    <section
      id="call-to-action"
      className="h-screen flex flex-col justify-center items-center p-20 bg-cover bg-center"
    >
      <h2 className="text-5xl mb-4 font-bold bg-gradient-to-b bg-clip-text text-transparent from-slate-200 to-slate-500">Ready to Get Started?</h2>
      <Link
        className="flex justify-center items-center text-center"
        href="/signup"
      >
        <button className=" before:ease relative h-16 w-40 overflow-hidden border border-purple-500 bg-purple-500 rounded-2xl text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-purple-500 hover:before:-translate-x-40">
          Sign Up
        </button>
      </Link>
    </section>
  );
};

export default CallToActionSection;
