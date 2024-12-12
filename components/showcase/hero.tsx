// components/HeroSection.tsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section id="hero" className="h-screen w-screen flex justify-center items-center bg-gradient-to-b from-black to-purple-900">
      <div className="">
        <h1 className="text-6xl font-bold bg-gradient-to-b bg-clip-text text-transparent from-slate-200 to-slate-500">Welcome to ZePortfolioBuilder</h1>
        <p className="text-2xl mb-8 text-white text-center">A futuristic project management tool designed to help you manage your projects efficiently.</p>
        <Link className="flex justify-center items-center text-center" href="#call-to-action">
          <button className=" before:ease relative h-16 w-40 overflow-hidden border border-purple-500 bg-purple-500 rounded-2xl text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-purple-500 hover:before:-translate-x-40">Get Started</button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
