import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Create a Room",
      desc: "Click ‘Start Call’ to generate your unique room link instantly.",
    },
    {
      number: "2",
      title: "Share the Link",
      desc: "Send the room link to your team members or friends.",
    },
    {
      number: "3",
      title: "Join & Start Talking",
      desc: "Enter the room and enjoy seamless communication.",
    },
  ];

  return (
    <div className="bg-[#151515]">
      <section className="px-8 py-10 container mx-auto">
        <div className="text-center mb-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
            How It{" "}
            <span className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get started with Meevio in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
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
                  {item.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white animated-gradient-text">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
