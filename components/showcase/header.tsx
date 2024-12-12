// components/Header.tsx
"use client";

const Header = () => {
  return (
    <div className="p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold ml-5">ZePortfolioBuilder</h1>
      <nav>
        <ul className="flex gap-4 mr-5 space-x-6">
          <li>
            <a
              href="#hero"
              className="text-purple-500 text-lg font-bold hover:underline hover:text-white transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-purple-500 text-lg font-bold hover:text-white hover:underline  transition duration-300"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#purpose"
              className="text-purple-500 text-lg font-bold hover:text-white transition hover:underline duration-300"
            >
              Purpose
            </a>
          </li>
          <li>
            <a
              href="#call-to-action"
              className="text-purple-500 text-lg font-bold hover:text-white transition hover:underline duration-300"
            >
              Get Started
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
