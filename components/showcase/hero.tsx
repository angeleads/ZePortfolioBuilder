"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Rocket, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-black">
        <div className="absolute inset-0">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,_0,_255,_0.15)_0%,_transparent_50%)] animate-pulse"></div>
          
          {/* Floating elements */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 50}, ${Math.random() * 255}, 0.3)`,
                animation: `float ${Math.random() * 10 + 10}s infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content */}
          <div className="lg:w-1/2 space-y-8">
            <h1 className={`text-6xl lg:text-7xl font-bold 
              bg-gradient-to-r from-white via-purple-200 to-purple-400 
              bg-clip-text text-transparent
              transform transition-all duration-1000 
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Welcome to
              <span className="block mt-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
                ZePortfolioBuilder
              </span>
            </h1>

            <p className={`text-xl text-purple-100/80 transform transition-all duration-1000 delay-300
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              A futuristic project management tool designed to revolutionize how you build, manage, and showcase your portfolio projects.
            </p>

            <div className={`flex gap-4 transform transition-all duration-1000 delay-500
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link href="/auth" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link href="/demo" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold border border-purple-500/30 hover:border-purple-500 transition-all duration-300">
                <span>Watch Demo</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 3D-like graphic */}
          <div className="lg:w-1/2">
            <div className={`relative transform transition-all duration-1000 delay-700
              ${isVisible ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-12'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Code, label: "Import Code" },
                    { icon: Rocket, label: "Launch Website" }
                  ].map((item, index) => (
                    <div key={index} className="p-6 rounded-xl bg-purple-900/30 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                      <item.icon className="w-8 h-8 mb-4 text-purple-400" />
                      <p className="text-purple-200 font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;