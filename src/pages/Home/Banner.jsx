import bannerVideo from "../../assets/bannerVideo.mp4";
const Banner = () => {
  return (
    <div id="banner" className="w-full bg-[#151515]">
      <div className="container mx-auto text-white">
        {/* Hero Section */}
        <section className="relative py-14 px-8 mx-auto mb-8">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 ">
                Crystal-Clear Video Calls,
                <br />
                <span className="animated-gradient-text">
                  Anytime, Anywhere!
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl">
                Build engaging video and voice experiences with our powerful API
                platform. Connect users globally with enterprise-grade
                reliability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-3 rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                  Start for Free
                </button>
                <button className="border border-gray-600 px-6 py-3 rounded-full text-white font-medium hover:border-[#32c6fc] transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                  Talk to Sales
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-video rounded-md overflow-hidden bg-gray-900 shadow-2xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={bannerVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <div
                    id="volumeToast"
                    className="hidden opacity-0 bg-black/70 text-white text-sm px-3 py-1 rounded-full transition-all duration-300"
                  >
                    Volume toggled
                  </div>
                  <button
                    className="text-white bg-black/50 p-2 rounded-full cursor-pointer hover:bg-black/70 transition-all duration-300"
                    onClick={() => {
                      const audio = document.getElementById("bgMusic");
                      const volumeIcon = document.getElementById("volumeIcon");
                      const volumeToast =
                        document.getElementById("volumeToast");
                      if (audio.paused) {
                        audio.play();
                        volumeIcon.className = "fas fa-volume-up";
                      } else {
                        audio.pause();
                        volumeIcon.className = "fas fa-volume-mute";
                      }
                      // Show toast notification
                      volumeToast.textContent = audio.paused
                        ? "Audio muted"
                        : "Audio playing";
                      volumeToast.classList.remove("hidden");
                      volumeToast.classList.remove("opacity-0");
                      // Hide toast after delay
                      setTimeout(() => {
                        volumeToast.classList.add("opacity-0");
                        setTimeout(() => {
                          volumeToast.classList.add("hidden");
                        }, 300);
                      }, 2000);
                    }}
                  >
                    <i id="volumeIcon" className="fas fa-volume-up"></i>
                  </button>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#32c6fc]/20 to-[#8659d3]/20 rounded-xl blur-xl -z-10"></div>
            </div>
          </div>
        </section>
        {/* Trusted By Section */}
        <section className="px-8 max-w-7xl mx-auto">
          <p className="text-center text-gray-400 mb-8">
            Trusted by thousands of developers worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            {["Microsoft", "Google", "Amazon", "Meta", "Zoom"].map(
              (company) => (
                <div key={company} className="flex items-center text-gray-400">
                  <i className="fa fa-building mr-2"></i>
                  <span className="text-sm font-medium">{company}</span>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Banner;
