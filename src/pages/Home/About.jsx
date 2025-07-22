import React from "react";
import { motion } from "framer-motion";
import aboutNexImg from "../../assets/aboutNex.png";

const About = () => {
  return (
    <div className="bg-[#151515] text-white">
      <div
        id="about"
        className="container mx-auto py-8 flex flex-col md:flex-row items-center overflow-hidden"
      >
        {/* About Us Section */}
        <section className="py-16 pb-0 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
                  Meevio
                </span>
              </h2>
              <p className="text-gray-300 mb-8">
                We're revolutionizing the way people connect through video
                calls. Our platform provides crystal-clear communication, making
                remote interactions feel more personal and engaging than ever
                before.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900 bg-opacity-60 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-[#32c6fc] mb-2">
                    24M+
                  </div>
                  <p className="text-gray-400">Active Users</p>
                </div>
                <div className="bg-gray-900 bg-opacity-60 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-[#8659d3] mb-2">
                    150+
                  </div>
                  <p className="text-gray-400">Countries</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[400px] bg-[url('https://readdy.ai/api/search-image?query=modern%20office%20team%20collaborating%20through%20video%20conference%20call%2C%20showing%20multiple%20screens%20with%20diverse%20participants%2C%20professional%20setting%20with%20blue%20accent%20lighting&width=600&height=800&seq=about1&orientation=portrait')] bg-cover bg-center rounded-xl"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
