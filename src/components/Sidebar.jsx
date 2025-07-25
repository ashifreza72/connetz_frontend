
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome, FaUsers, FaCogs, FaFileInvoice,
  FaUser, FaQuestionCircle, FaComments, FaSignOutAlt,
  FaPowerOff, FaBars,
  FaChevronLeft
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import logoFull from "../assets/images/connetz-logo-red.png";
import logoIcon from "../assets/images/connetz.png";
import Swal from "sweetalert2";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isSidebarCollapsed = isCollapsed && !isHovered;
  

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
            // localStorage.setItem("XF-session-token",data.session.session_token); 
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
          timer: 1500,
          showConfirmButton: false,
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
    <div className="relative">
      {/* Floating Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:block fixed top-9 left-[250px] transform -translate-y-1/2 z-[100] bg-[#f7f5f5] rounded-full shadow-lg p-1 border border-[#f7f5f5] hover:bg-gray-50 cursor-pointer transition-all duration-300"
        style={{ 
          left: isSidebarCollapsed ? "82px" : "250px"
        }}
      >
        <div className="bg-[#164ec8] text-white rounded-full p-1">
          <FaChevronLeft
            className={`transition-transform duration-200 ${isSidebarCollapsed ? "rotate-180" : ""}`}
            size={16}
          />
        </div>
      </button>

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: isSidebarCollapsed ? "98px" : "262px" }}
        className={`
          fixed top-0 left-0 h-full bg-white shadow-md z-40 transform
          transition-[width] duration-300 ease-in-out
          ${isOpen ? "translate-x-0 overflow-y-auto" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col md:h-full md:overflow-visible
        `}
      >
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 px-5 pt-3 sticky top-0 bg-white z-10">
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end mb-4">
            <button onClick={toggleSidebar}>
              <IoClose className="text-2xl text-[#384551]" />
            </button>
          </div>

          {/* Logo */}
          <div className={`flex items-center ${isCollapsed ? "justify-start" : "justify-start"} ml-1 mb-8`}>
            <img
              src={isSidebarCollapsed ? logoIcon : logoFull}
              alt="Logo"
              className="h-10 transition-all duration-300"
            />
          </div>
        </div>

        {/* Scrollable Navigation Section */}
        <div className="flex-1 px-5 
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
          scroll-smooth"
        >
          <nav className="flex flex-col gap-2 text-[15px] text-[#384551] pb-8">
            {/* Navigation Items */}
            <NavItem icon={<FaHome />} label="Dashboard" to="/dashboard" collapsed={isSidebarCollapsed} />

            {/* Team Dropdown */}
            <div>
              <button
                onClick={() => setIsTeamOpen(!isTeamOpen)}
                className="flex items-center justify-between w-full px-5 py-2 rounded-md hover:bg-gray-100 text-[#384551] text-[15px] min-h-[2.625rem]"
              >
                <span className="flex items-center gap-3 px-3">
                  <FaUsers />
                  {!isSidebarCollapsed && <span>Team</span>}
                </span>
                {!isSidebarCollapsed && (
                  <FaChevronRight 
                    size={14} 
                    className={`transform transition-transform duration-300 ${isTeamOpen ? 'rotate-90' : ''}`}
                  />
                )}
              </button>

              <div 
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  !isSidebarCollapsed ? (isTeamOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0') : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-1 pt-1 flex flex-col gap-1 text-[15px] text-[#384551]">
                  <NavItem icon={<FaUser />} label="Team Leader" to="/team/leader" collapsed={isSidebarCollapsed} />
                  <NavItem icon={<FaUser />} label="Staff" to="/team/staff" collapsed={isSidebarCollapsed} />
                </div>
              </div>
            </div>

            {/* Other Main Items */}
            <NavItem icon={<FaCogs />} label="Integration" to="/integration" collapsed={isSidebarCollapsed} />
            <NavItem icon={<FaFileInvoice />} label="Subscription" to="/subscription" collapsed={isSidebarCollapsed} />
            <NavItem icon={<FaFileInvoice />} label="Billing" to="/billing" collapsed={isSidebarCollapsed} />

            {/* Section Title */}
            {!isSidebarCollapsed && (
              <div className="mt-2 text-sm font-medium text-gray-400 px-5 uppercase tracking-wide">Apps & Pages</div>
            )}

            {/* Apps & Pages Section */}
            <NavItem icon={<FaUser />} label="My Profile" to="/profile" collapsed={isSidebarCollapsed} />

            {/* Settings Dropdown */}
            <div>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center justify-between w-full px-5 py-2 rounded-md hover:bg-gray-100 text-[#384551] text-[.9375rem]"
              >
                <span className="flex items-center gap-3 px-3">
                  <FaCogs className="text-[.9375rem]" />
                  {!isSidebarCollapsed && <span>Settings</span>}
                </span>
                {!isSidebarCollapsed && (
                  <FaChevronRight 
                    size={14} 
                    className={`transform transition-transform duration-300 ${isSettingsOpen ? 'rotate-90' : ''}`}
                  />
                )}
              </button>

              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  !isSidebarCollapsed ? (isSettingsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0') : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-1 pt-1 flex flex-col gap-1 text-[.9375rem] text-[#384551]">
                  <NavItem icon={<FaCogs />} label="App Settings" to="/settings/app" collapsed={isSidebarCollapsed} />
                  <NavItem icon={<FaCogs />} label="API Settings" to="/settings/api" collapsed={isSidebarCollapsed} />
                </div>
              </div>
            </div>

            {/* Other Bottom Items */}
            <NavItem icon={<FaQuestionCircle />} label="User Guide" to="/guide" collapsed={isSidebarCollapsed} />
            <NavItem icon={<FaComments />} label="Live Chat Support" to="/support" collapsed={isSidebarCollapsed} />

            {/* Logout Item */}
            <li
              onClick={handleLogout}
              className="flex items-center ml-8 space-x-2 hover:text-red-600 cursor-pointer"
            >
              <FaPowerOff />
              {!isSidebarCollapsed && <span>Log Out</span>}
            </li>
          </nav>
        </div>
      </aside>
    </div>
  );
};

// Reusable NavItem with collapse support

const NavItem = ({ icon, label, to, collapsed = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-between w-full px-8 py-2 rounded-md hover:bg-gray-100 text-[#384551] text-[15px] min-h-[2.625rem] transition-all duration-300 
      ${isActive ? "bg-indigo-100 shadow-sm text-blue-700 font-medium" : ""}`
    }
  >
    {/* Left: Icon + Label (gap-5) */}
    <span className="flex items-center gap-5">
      <span className="text-[.9375rem]">{icon}</span>

      {/* Label only shown when expanded */}
      {!collapsed && (
        <span
          className="whitespace-nowrap transition-all duration-300"
          style={{
            pointerEvents: collapsed ? "none" : "auto",
          }}
        >
          {label}
        </span>
      )}
    </span>

    {/* Optionally add right element (chevron, count, etc.) here */}
  </NavLink>
);




export default Sidebar;
