// src/components/DashboardHeader.jsx
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaQuestionCircle,
  FaComments,
  FaPowerOff,
  FaTimes,
  FaExternalLinkAlt
} from "react-icons/fa";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTrialNotice, setShowTrialNotice] = useState(true);
  const [user, setUser] = useState({ name: "Loading...", role: "User", avatar: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        name: parsed.name || "Unknown",
        role: parsed.position || "User",
        avatar: "",
      });
    }
  }, []);

  const handleLogout = async () => {
    console.log("Logout response:", handleLogout);
    try {
      const response = await fetch("http://192.168.1.57:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'XF-token': localStorage.getItem("token"),
          'user_id': localStorage.getItem("user_id"),
          'user_type': localStorage.getItem("user_type"),
          'XF-session-token': localStorage.getItem("XF-session-token"),
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        localStorage.clear();
        Swal.fire({
          icon: "success",
          title: "Logged out!",
          text: "See you again!",
          customClass: {
            confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
          },
          showConfirmButton: true,
        });
        navigate("/login");
      } else {
        console.error("Logout API failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    //  <div className="p-0 lg:p-1 lg:mx-28"></div>
    <header className="bg-white shadow-sm lg:mx-28 p-0 mb-4 lg:p-1 rounded-sm sticky top-0 z-30">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 gap-3 sm:gap-4 max-w-[1920px] mx-auto">
        {/* Trial warning bar */}
        {showTrialNotice && (
          <div className="flex items-center justify-between bg-orange-100 text-orange-500 text-sm px-3 sm:px-4 py-2 rounded-md w-full sm:max-w-md">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="hidden sm:inline">CONNETZ TRIAL EXPIRES IN 6 DAYS —</span>
              <span className="sm:hidden">TRIAL: 6 DAYS LEFT —</span>
              <Link to="/pricing" className="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap">
                View Pricing
                <FaExternalLinkAlt size={12} />
              </Link>
            </div>
            <button 
              onClick={() => setShowTrialNotice(false)}
              className="ml-2 sm:ml-3 p-1 hover:bg-orange-200 rounded-full transition-colors cursor-default"
            >
              <FaTimes className="text-orange-500 text-xs" />
            </button>
          </div>
        )}

        {/* Notification and Profile */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <button className="relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaBell className="text-gray-600 text-lg sm:text-xl" />
            <span className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          {/* Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-20 h-20 sm:w-9 sm:h-9 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-lg hover:bg-pink-700"
            >
              {user.name?.charAt(0).toUpperCase() || "-"}
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute -right-7 mt-4  w-[280px] sm:w-60 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-lg">
                      {user.name?.charAt(0).toUpperCase() || "-"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{user.name}</h4>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                </div>

                <ul className="py-1 text-[#384551]">
                  <DropdownItem icon={<FaUserCircle />} label="My Profile" />
                  <DropdownItem icon={<FaCog />} label="Settings" />
                  <DropdownItem icon={<FaQuestionCircle />} label="User Guide" />
                  <DropdownItem icon={<FaComments />} label="Live Chat Support" />
                  <DropdownItem 
                    icon={<FaPowerOff />} 
                    label="Log Out" 
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-red-50"
                  />
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Dropdown item component for better organization
const DropdownItem = ({ icon, label, onClick, className = "hover:text-blue-600" }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  </li>
);

export default DashboardHeader;
