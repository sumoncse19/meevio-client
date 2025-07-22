import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-16 px-8 border-t border-gray-800 bg-[#151515]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center font-semibold text-2xl mb-4">
              <img
                className="w-6 h-6 object-cover mr-2"
                src={logo}
                alt="Meevio Logo"
              />
              <div className="text-2xl font-bold bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent ">
                Meevio
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-xs">
              Empowering developers to build the future of real-time
              communication.
            </p>
            <div className="text-white flex gap-3 text-xl">
              <FaXTwitter />
              <FaGithub />
              <FaLinkedinIn />
              <FaYoutube />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              {[
                "Video SDK",
                "Voice SDK",
                "Chat SDK",
                "Whiteboard",
                "Analytics",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                "Documentation",
                "API Reference",
                "Sample Apps",
                "Blog",
                "Community",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Contact", "Press", "Legal"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Meevio. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm cursor-pointer"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm cursor-pointer"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
