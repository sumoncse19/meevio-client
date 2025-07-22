import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is Meevio and how does it work?",
    answer:
      "Meevio is a video calling platform that enables crystal-clear communication through your web browser or mobile device. It uses advanced technology to ensure high-quality video and audio transmission.",
  },
  {
    question: "Is Meevio free to use?",
    answer:
      "We offer both free and premium plans. The free plan includes basic features, while premium plans provide additional capabilities for businesses and power users.",
  },
  {
    question: "How secure are Meevio video calls?",
    answer:
      "All Meevio communications are encrypted end-to-end, ensuring your conversations remain private and secure.",
  },
  {
    question: "Can I use Meevio on multiple devices?",
    answer:
      "Yes, Meevio works seamlessly across desktop and mobile devices. You can switch between devices during calls without interruption.",
  },
  {
    question: "Can I schedule meetings ?",
    answer:
      "Yes, Meevio provides scheduling feature. It will notify you before 1hour of scheduled time & mail you a reminder",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(1); // 2nd open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#151515]">
      <div
        id="faq"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 "
      >
        <div className="flex flex-col justify-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about Meevio
          </p>
        </div>
        <div className="flex flex-col md:grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Illustration with background */}
          <div className="relative hidden lg:flex justify-center w-full">
            {/* Background block */}
            <div
              id="parent-Block"
              className="absolute bottom-5 left-5 sm:left-14 w-64 sm:w-80 md:w-96 h-52 sm:h-72 md:h-80 bg-[#12161f] rounded-t-2xl z-10"
            >
              {/* Small extra block */}
              <div className="w-20 sm:w-28 h-16 sm:h-24 bg-black absolute right-0 bottom-0 z-0 rounded-tl-2xl hidden sm:block"></div>
            </div>
            {/* Illustration */}
            <img
              src="https://i.ibb.co/ZpXnnfXH/Image-68-1.png"
              alt="FAQ Illustration"
              className="relative top-4 z-20 w-40 sm:w-56 md:w-72"
            />
          </div>
          {/* Right Side FAQ */}
          <div className="w-full">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left py-4 px-4 sm:px-5 flex justify-between items-center text-base sm:text-lg font-semibold text-gray-100"
                  >
                    {faq.question}
                    <span
                      className={`text-gray-500 transform transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`px-4 sm:px-5 bg-[#12171f] overflow-hidden transition-all duration-400 ease-in-out ${
                      openIndex === index
                        ? "max-h-96 opacity-100 py-4"
                        : "max-h-0 opacity-0 py-0"
                    }`}
                  >
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
