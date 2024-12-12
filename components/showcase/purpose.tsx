// components/TestimonialsSection.tsx
import Image from "next/image";

const PurposeSection = () => {
  return (
    <section
      id="purpose"
      className="p-28 bg-gradient-to-b from-purple-700 to-black flex flex-col md:flex-row items-center"
    >
      <div className="flex justify-center items-center w-screen rounded-full">
        <Image
          src="/images/project-example.png"
          alt="Feature Image"
          width={400}
          height={400}
          className="rounded-full border-2 border-slate-200 shadow-md"
        />
      </div>
      <div className="w-2/4 mt-20 mr-40">
        <h2 className="text-4xl font-bold mb-8 text-center md:text-left bg-gradient-to-b bg-clip-text text-transparent from-slate-200 to-slate-400">
          Our Purpose
        </h2>
        <ul className="list-disc list-inside text-lg space-y-4">
          <li className="flex items-start">
            <div className="w-6 h-6 bg-purple-700 rounded-full mr-4"></div>
            <p className="text-xl">Intuitive and user-friendly interface</p>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-purple-700 rounded-full mr-4"></div>
            <p className="text-xl">Powerful project management tools</p>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-purple-700 rounded-full mr-4"></div>
            <p className="text-xl">Customizable workflows and templates</p>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-purple-700 rounded-full mr-4"></div>
            <p className="text-xl">Real-time collaboration and communication</p>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-purple-700 rounded-full mr-4"></div>
            <p className="text-xl">Advanced reporting and analytics</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PurposeSection;
