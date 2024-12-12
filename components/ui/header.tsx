"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-green-50 backdrop-blur-sm shadow-sm" : ""
      }`}
    >
      <div className="max-w-8xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-2 mt-2">
            <Link href="/" className="block text-3xl font-bold text-gray-200 hover:text-purple-300">
              ZePortfolioBuilder
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/projects"
                  className="text-lg font-medium text-gray-200 hover:underline hover:text-purple-300  px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-lg font-medium text-gray-200 hover:underline hover:text-purple-300 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
