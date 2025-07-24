
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
  // const [isCollapsed, setIsCollapsed] = useState(false);
  // const [isCollapsed, setIsCollapsed] = useState(true);

  const [isCollapsed, setIsCollapsed] = useState(true);  // manual toggle
const [isHovered, setIsHovered] = useState(false);      // hover tracking

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
    <>
    <div className="relative">
      {/* Floating Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:block fixed top-11 left-[250px] transform -translate-y-1/2 z-[100] bg-white rounded-full shadow-lg p-1.5 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-300"
        style={{ 
          left: isSidebarCollapsed ? "82px" : "250px"
        }}
      >
        <div className="bg-[#164ec8] text-white rounded-full p-1.5 cursor-pointer">
          <FaChevronLeft
            className={`transition-transform duration-200 ${isSidebarCollapsed ? "rotate-180" : ""} cursor-pointer`}
            size={16}
          />
        </div>
      </button>

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: isSidebarCollapsed ? "98px" : "262px" }}
        className={`
          fixed top-0 left-0 h-full bg-white shadow-md px-5 z-40 transform
          transition-[width] duration-300 ease-in-out overflow-y-auto overflow-x-hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
          scroll-smooth
        `}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={toggleSidebar}>
            <IoClose className="text-2xl text-[#384551]" />
          </button>
        </div>

        <div className="flex pt-3 text-left flex-col justify-between h-full">
          <div>
            <div className={`flex items-center ${isCollapsed ? "justify-start" : "justify-start"} ml-1 mb-8`}>
              <img
                src={isSidebarCollapsed ? logoIcon : logoFull}
                alt="Logo"
                className="h-10 transition-all duration-300"
              />
            </div>

            {/* Rest of the navigation */}
            <nav className="flex flex-col gap-5 text-[15px] text-[#384551] pb-8">
  {/* Top Section */}
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
        isTeamOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />
      )}
    </button>

    {isTeamOpen && !isSidebarCollapsed && (
      <div className="ml-1 mt-1 flex flex-col gap-1 text-[15px] text-[#384551]">
        <NavItem icon={<FaUser />} label="Team Leader" to="/team/leader" collapsed={isSidebarCollapsed} />
        <NavItem icon={<FaUser />} label="Staff" to="/team/staff" collapsed={isSidebarCollapsed} />
      </div>
    )}
  </div>

  {/* Other Main Items */}
  <NavItem icon={<FaCogs />} label="Integration" to="/integration" collapsed={isSidebarCollapsed} />
  <NavItem icon={<FaFileInvoice />} label="Subscription" to="/subscription" collapsed={isSidebarCollapsed} />
  <NavItem icon={<FaFileInvoice />} label="Billing" to="/billing" collapsed={isSidebarCollapsed} />

  {/* Section Title */}
  {!isSidebarCollapsed && (
    <div className="mt-6 text-sm font-medium text-gray-400 px-5 uppercase tracking-wide">Apps & Pages</div>
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
      {!isSidebarCollapsed && (isSettingsOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />)}
    </button>

    {isSettingsOpen && !isSidebarCollapsed && (
      <div className="ml-1 mt-1 flex flex-col gap-1 text-[.9375rem] text-[#384551]">
        <NavItem icon={<FaCogs />} label="App Settings" to="/settings/app" collapsed={isSidebarCollapsed} />
        <NavItem icon={<FaCogs />} label="API Settings" to="/settings/api" collapsed={isSidebarCollapsed} />
      </div>
    )}
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
        </div>
      </aside>
    </div>
    </>
  );
};

// Reusable NavItem with collapse support

const NavItem = ({ icon, label, to, collapsed = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-between w-full px-8 py-2 rounded-md hover:bg-gray-100 text-[#384551] text-[15px] min-h-[2.625rem] transition-all duration-300
      ${isActive ? "bg-indigo-100 text-[#164ec8] font-medium" : ""}`
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
