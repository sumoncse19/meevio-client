import React from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { FcDataEncryption } from "react-icons/fc";
import { MdOutlineScreenShare } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import { RiChatDownloadLine } from "react-icons/ri";
import { MdGroups2 } from "react-icons/md";
const Features = [
  {
    icon: <IoVideocamOutline />,
    title: "High-quality Video & Audio",
    desc: "Crystal-clear HD video and pristine audio quality for the best communication experience.",
  },
  {
    icon: <FcDataEncryption />,
    title: "End-to-End Encryption",
    desc: "Your conversations are protected with military-grade encryption technology.",
  },
  {
    icon: <MdOutlineScreenShare />,
    title: "Screen Sharing",
    desc: "Share your screen instantly for better collaboration and presentations.",
  },
  {
    icon: <FaRocketchat />,
    title: "Real-time Chat",
    desc: "Send messages, share files, and collaborate while on your video call.",
  },
  {
    icon: <RiChatDownloadLine />,
    title: "Chat Download",
    desc: "Download your chat history for future reference and compliance.",
  },
  {
    icon: <MdGroups2 />,
    title: "Group Calls",
    desc: "Host meetings with up to 100 participants with no quality compromise.",
  },
];

const FeaturesSection = () => {
  return (
    <div id="features" className="bg-[#151515] text-white py-10 pt-0 px-4">
      <section className="py-20 px-8 max-w-7xl container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What our{" "}
            <span className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
              Meevio provide
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our platform provides everything you need to build exceptional
            real-time experiences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 bg-opacity-60 p-6 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
            >
              {/* Corner border animation */}
              <div className="absolute inset-0 pointer-events-none">
                <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#32c6fc] to-[#8659d3] flex items-center justify-center mb-4">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
