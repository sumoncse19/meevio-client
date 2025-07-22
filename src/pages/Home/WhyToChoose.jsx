import React from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { FcDataEncryption } from "react-icons/fc";
import { MdOutlineScreenShare } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";

const Features = [
  {
    title: "Global Infrastructure",
    description:
      "Distributed network across 200+ data centers ensures low latency connections worldwide.",
    icon: <BsGlobe />,
  },
  {
    title: "Enterprise Security",
    description:
      "End-to-end encryption and compliance with major security standards including GDPR and HIPAA.",
    icon: <FcDataEncryption />,
  },
  {
    title: "Scalable Architecture",
    description:
      "Built to handle millions of concurrent users with 99.99% uptime SLA guarantee.",
    icon: <FaDatabase />,
  },
];
const WhyToChoose = () => {
  return (
    <div className="bg-[#151515] text-white py-10 pt-0 px-4">
      <section className="px-8 py-10 container mx-auto">
        <div className="text-center mb-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why developers{" "}
            <span className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
              choose Meevio
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our platform provides everything you need to build exceptional
            real-time experiences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Features.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-900 bg-opacity-60 p-6 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
            >
              {/* Corner border animation */}
              <div className="absolute inset-0 pointer-events-none">
                <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#32c6fc] to-[#8659d3] flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-white">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyToChoose;
