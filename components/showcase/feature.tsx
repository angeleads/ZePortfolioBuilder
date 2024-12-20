// components/FeaturesSection.tsx
"use client";
import { useEffect, useState } from 'react';
import { Layout, Users, BarChart3 } from 'lucide-react';

const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('features');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const features = [
    {
      icon: Layout,
      title: "Project Management",
      description: "Manage multiple projects with ease. Create, edit, and delete projects as needed with our intuitive interface.",
      bgClass: "from-purple-600 to-pink-600"
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Real-time collaboration with team members. Assign tasks, track progress, and communicate effectively.",
      bgClass: "from-blue-600 to-purple-600"
    },
    {
      icon: BarChart3,
      title: "Customizable Dashboards",
      description: "Personalize your workspace with customizable widgets, charts, and visualizations to stay informed.",
      bgClass: "from-pink-600 to-purple-600"
    }
  ];

  return (
    <section id="features" className="relative py-32 overflow-hidden bg-gray-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900"></div>
        {/* Animated grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          mask: 'radial-gradient(circle at center, black, transparent 80%)'
        }}></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className={`text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-6 
            transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Powerful Features
          </h2>
          <p className={`text-xl text-purple-200/80 max-w-3xl mx-auto 
            transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Experience the next generation of portfolio management with our cutting-edge features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 delay-${index * 200} 
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="relative group">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgClass} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                
                <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 
                  hover:border-purple-500/40 transition-all duration-300 h-full
                  transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                  
                  {/* Icon container with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl mb-6 mx-auto flex items-center justify-center
                    bg-gradient-to-r ${feature.bgClass} transform transition-transform duration-500
                    group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  
                  <p className="text-purple-200/80 text-center">
                    {feature.description}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-r from-pink-500/10 to-transparent rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
