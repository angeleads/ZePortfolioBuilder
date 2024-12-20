import Link from 'next/link';
import { ArrowRight, Code, Rocket, ChevronRight } from 'lucide-react';

const CallToActionSection = () => {
  return (
    <section id="call-to-action" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900">
        {/* Animated lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-full"
              style={{
                top: `${33 * (i + 1)}%`,
                animation: `moveLeft ${10 + i * 2}s linear infinite`,
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Ready to Transform Your Portfolio?
          </h2>

          <p className="text-xl text-purple-200/80">
            Join thousands of developers who are already using ZePortfolioBuilder to showcase their work and manage projects efficiently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link href="/pricing" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold border border-purple-500/30 hover:border-purple-500 transition-all duration-300">
              <span>View Pricing</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;