"use client"
import { useState } from 'react';
import Image from "next/image";
import { 
  Layout, 
  Users, 
  Workflow, 
  MessageSquare, 
  BarChart3
} from 'lucide-react';

const PurposeSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Layout,
      title: "Intuitive Interface",
      description: "User-friendly design that enhances productivity and reduces learning curve",
    },
    {
      icon: Users,
      title: "Project Management",
      description: "Powerful tools to keep your projects organized and on track",
    },
    {
      icon: Workflow,
      title: "Custom Workflows",
      description: "Flexible templates and workflows that adapt to your needs",
    },
    
  ];

  return (
    <section id="purpose" className="relative py-24 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-black"></div>
        {/* Animated grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          mask: 'radial-gradient(circle at center, black, transparent 80%)'
        }}></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="relative group">
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              <div className="relative aspect-square rounded-full overflow-hidden border-4 border-purple-300/20 backdrop-blur-sm">
                
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Our Purpose
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className={`
                      relative p-6 rounded-2xl backdrop-blur-sm
                      transition-all duration-300 transform
                      ${hoveredIndex === index ? 'bg-purple-900/40 scale-105' : 'bg-purple-900/20'}
                      hover:shadow-lg hover:shadow-purple-500/20
                      border border-purple-500/20
                    `}>
                      <div className="flex items-start gap-4">
                        <div className={`
                          p-3 rounded-xl
                          ${hoveredIndex === index ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-purple-800/50'}
                          transition-all duration-300
                        `}>
                          <Icon className={`
                            w-6 h-6
                            ${hoveredIndex === index ? 'text-white' : 'text-purple-300'}
                            transition-all duration-300
                          `} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-purple-200/80">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;