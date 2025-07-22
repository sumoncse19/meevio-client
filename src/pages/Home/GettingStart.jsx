import React, { useState } from "react";
import { motion } from "framer-motion";

const GetStarted = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="bg-[#151515]">
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="bg-gray-900 bg-opacity-70 rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=abstract%20technology%20pattern%20with%20flowing%20blue%20and%20purple%20light%20trails%20on%20dark%20background%2C%20digital%20network%20concept%2C%20futuristic%20minimal%20design&width=1200&height=600&seq=cta1&orientation=landscape')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your application with real-time communication?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get started for free today and join thousands of developers
              building the future of communication.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-3 rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                Start Free Trial
              </button>
              <button className="border border-gray-600 px-6 py-3 rounded-full text-white font-medium hover:border-[#32c6fc] transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                Contact Sales
              </button>
            </div>
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border-none rounded-l-full px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#32c6fc]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] rounded-r-full px-6 py-3 text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Subscribe to our newsletter for developer tips and updates
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
