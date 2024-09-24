import React from "react";
import {
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaEnvelope,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import { AiOutlineLinkedin } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-3">
        <div className="flex">
          <div className="flex">
            <AiOutlineLinkedin className=" text-4xl text-[#0a66c2]" />
            <div className="text-2xl font-bold text-[#0a66c2]"> Clone</div>
          </div>

          <div className="flex flex-grow mx-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-700 text-white rounded-r-lg px-4">
              Search
            </button>
          </div>
        </div>

        <div className="flex space-x-8">
          <a
            href="/home"
            className="flex flex-col items-center text-gray-600 hover:text-blue-700"
          >
            <FaHome className="text-2xl" />
            <span className="text-sm">Home</span>
          </a>
          <a
            href="/network"
            className="flex flex-col items-center text-gray-600 hover:text-blue-700"
          >
            <FaUserFriends className="text-2xl" />
            <span className="text-sm">My Network</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-gray-600 hover:text-blue-700"
          >
            <FaBriefcase className="text-2xl" />
            <span className="text-sm">Jobs</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-gray-600 hover:text-blue-700"
          >
            <FaEnvelope className="text-2xl" />
            <span className="text-sm">Messaging</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-gray-600 hover:text-blue-700"
          >
            <FaBell className="text-2xl" />
            <span className="text-sm">Notifications</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-gray-600 hover:text-blue-700"
          >
            <FaUserCircle className="text-2xl" />
            <span className="text-sm">Me</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
