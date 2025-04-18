"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#purpose", label: "Purpose" },
    { href: "#call-to-action", label: "Get Started" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div
        className={`absolute inset-x-0 -top-5 h-[calc(100%+20px)] backdrop-blur-xl 
        transition-all duration-500 -z-10 
        ${isScrolled ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6">
        <div
          className={`relative rounded-full border border-purple-500/20
          bg-gray-900/50 backdrop-blur-md overflow-hidden transition-all duration-300
          ${isScrolled ? "p-4" : "p-6"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 animate-gradient" />
          <div className="relative flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              ZePortfolioBuilder
            </h1>
            <nav className="hidden md:block">
              <ul className="flex gap-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="relative font-medium text-purple-200/80 hover:text-white transition-colors duration-300 group"
                    >
                      {item.label}
                      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              className="md:hidden text-purple-200 hover:text-white transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <div
          className={`md:hidden transition-all duration-300 ease-in-out 
          ${isMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
        >
          <nav className="bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-purple-500/20 overflow-hidden">
            <ul className="p-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block p-2 text-purple-200/80 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
