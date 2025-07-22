import React from "react";
import { IoMdHome } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdContactMail } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";
import UserMenu from "../../../components/UserMenu";
import logo from "../../../assets/logo.png";

function MeetingNavbar() {
  const baseStyle = "md:flex lg:flex-col md:gap-2 lg:gap-0 font-semibold";

  const links = (
    <div className="lg:flex">
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? "text-[#32c6fc]" : "text-gray-300"}`
          }
        >
          Home <IoMdHome />
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/meeting/chat-history"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? "text-[#32c6fc]" : "text-gray-300"}`
          }
        >
          Chat History <IoChatboxEllipses />
        </NavLink>
      </li>
    </div>
  );

  return (
    <div className="bg-[#151515] shadow-sm w-full fixed top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto navbar px-2">
        {/* Mobile menu (left side on small devices) */}
        <div className="navbar-start lg:hidden">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 p-2 shadow bg-gray-800"
            >
              {links}
            </ul>
          </div>
        </div>

        {/* Logo: always on the left */}
        <div className="navbar-start hidden lg:flex">
          <Link to="/" className="flex items-center font-semibold text-2xl">
            <img
              className="w-6 h-6 object-cover mr-2"
              src={logo}
              alt="Meevio Logo"
            />
            <div className="text-2xl font-bold bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
              Meevio
            </div>
          </Link>
        </div>

        {/* Center links for large screens */}
        <div className="hidden lg:flex lg:mx-auto">
          <ul className="menu menu-horizontal px-1 text-base">{links}</ul>
        </div>

        {/* Show logo in center for small devices */}
        <div className="navbar-center lg:hidden">
          <Link
            to="/"
            className="flex items-center font-semibold text-2xl -ml-5"
          >
            <img
              className="w-8 h-8 object-cover mr-2"
              src={logo}
              alt="Meevio Logo"
            />
            <div className="text-2xl font-bold bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
              Meevio
            </div>
          </Link>
        </div>

        {/* User menu */}
        <div className="navbar-end">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

export default MeetingNavbar;
