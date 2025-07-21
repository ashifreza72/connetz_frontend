// src/components/DashboardHeader.jsx
import { useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaQuestionCircle,
  FaComments,
  FaPowerOff,
} from "react-icons/fa";

const DashboardHeader = ({
  user = { name: "John Doe", role: "Admin", avatar: "" },
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-sm flex items-center px-6 mx-12 rounded-sm sticky top-0 z-30 py-4">

      {/* You can optionally add a left section here */}

      {/* Right Section (Notification + Profile) */}
      <div className="flex items-center space-x-4 ml-auto relative">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-600 text-xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
        </div>

        {/* Profile Avatar */}
        <div className="relative">
          <img
            onClick={() => setShowDropdown(!showDropdown)}
            src={user.avatar || "https://i.pravatar.cc/32"}
            alt="User Avatar"
            className="w-9 h-9 rounded-full cursor-pointer border"
          />

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-3 z-50">
              <div className="px-4 py-2 border-b">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar || "https://i.pravatar.cc/32"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{user.name}</h4>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
              </div>

              <ul className="px-4 py-2 space-y-2 text-sm">
                <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                  <FaUserCircle /> <span>My Profile</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                  <FaCog /> <span>Settings</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                  <FaQuestionCircle /> <span>User Guide</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                  <FaComments /> <span>Live Chat Support</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-red-600 cursor-pointer">
                  <FaPowerOff /> <span>Log Out</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
