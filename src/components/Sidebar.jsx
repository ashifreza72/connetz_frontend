import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import {
  FaHome, FaUsers, FaCogs, FaFileInvoice,
  FaUser, FaQuestionCircle, FaComments, FaSignOutAlt,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/connetz-logo-red.png";  
import Swal from "sweetalert2";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [isTeamOpen, setIsTeamOpen] = useState(false);
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);

//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//   try {
//     // Call backend logout API
//     const response = await fetch("http://192.168.1.57:8000/api/logout", {
//       method: "POST",  
//       headers: {
//         "Content-Type": "application/json",
//         // "Authorization": `Bearer ${localStorage.getItem("token")}`  
//          "Authorization": localStorage.getItem("token")
//       },
//     });

//     if (response.ok) {
//       logout(); 
//       navigate("/login");
//     } else {
//       console.error("Logout API failed");
//     }
//   } catch (error) {
//     console.error("Logout error:", error);
//   }
// };

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { logout } = useAuth();

  const navLogout = async () => {
  console.log("Logout response:", navLogout);
  try {
    const response = await fetch("http://192.168.1.57:8000/api/logout", {
      method: "POST",
     headers: {
          "Content-Type": "application/json",
          'XF-token': localStorage.getItem("token"),
          'user_id': localStorage.getItem("user_id"),
          Authorization: localStorage.getItem("token"),
        },
    });

    if (response.ok) {
      logout(); // clear context + localStorage
      Swal.fire("Logged out!", "See you again!", "success");
      Navigate("/login"); // ✅ Correct redirection
    } else {
      console.error("Logout API failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};



  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-md p-4 z-40 transform
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex
      `}
    >
      {/* Close button on mobile */}
      <div className="md:hidden flex justify-end mb-4">
        <button onClick={toggleSidebar}>
          <IoClose className="text-2xl text-[#384551]" />
        </button>
      </div>

 
      <div className="flex pt-3 text-left flex-col justify-between h-full">
        <div>
          
          
          {/* Logo */}
         <div className="flex justify-start items-start ml-3 font-bold text-[2.9375rem] mb-8 gap-2">
            <img src={logo} alt="Logo" className="h-10" />
          </div>
          {/* Main Menu */}
          <nav className="flex flex-col gap-2 text-[15px] text-[#384551]">
            <NavItem
              icon={<FaHome className="text-[15px]" />}
              label="Dashboard"
              to="/dashboard"
            />

          {/* Team with subitems */}
          <div>
            <button
              onClick={() => setIsTeamOpen(!isTeamOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100 text-[#384551] text-[15px] min-h-[2.625rem]"
            >
              <span className="flex items-center gap-3">
                <FaUsers className="text-[15px]" />
                <span>Team</span>
              </span>
              {isTeamOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
            </button>

        {isTeamOpen && (
          <div className="ml-1 mt-1 flex flex-col gap-1 text-[15px] text-[#384551]">
            <NavItem
              icon={<FaUser className="text-[15px]" />}
              label="Team Leader"
              to="/team/leader"
            />
            <NavItem
              icon={<FaUser className="text-[15px]" />}
              label="Staff"
              to="/team/staff"
            />
          </div>
        )}
      </div>

      <NavItem
        icon={<FaCogs className="text-[15px]" />}
        label="Integration"
        to="/integration"
      />
      <NavItem
        icon={<FaFileInvoice className="text-[15px]" />}
        label="Subscription"
        to="/subscription"
      />
      <NavItem
        icon={<FaFileInvoice className="text-[15px]" />}
        label="Billing"
        to="/billing"
      />
    </nav>

          {/* Apps & Pages */}
          <div className="mt-6 text-[10px] font-medium text-gray-400 px-2 uppercase tracking-wide">Apps & Pages</div>
          <nav className="flex flex-col gap-2 mt-2 text-[.9375rem] text-[#384551]">
            <NavItem icon={<FaUser />} label="My Profile" to="/profile" />

            {/* Settings with subitems */}
            <div>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100 text-[#384551] text-[.9375rem]"
              >
                <span className="flex items-center gap-3">
                  <FaCogs className="text-[.9375rem]" />
                  <span>Settings</span>
                </span>
                {isSettingsOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
              </button>
              {isSettingsOpen && (
                <div className="ml-1 mt-1 flex flex-col gap-1 text-[.9375rem] text-[#384551]">
                  <NavItem icon={<FaCogs />} label="App Settings" to="/settings/app" />
                  <NavItem icon={<FaCogs />} label="API Settings" to="/settings/api" />
                </div>
              )}
            </div>

            <NavItem icon={<FaQuestionCircle />} label="User Guide" to="/guide" />
            <NavItem icon={<FaComments />} label="Live Chat Support" to="/support" />
           <NavItem
              onClick={navLogout}
              icon={<FaSignOutAlt />}
              label="LogOut"
              to="/login"
              className="w-full text-sm font-semibold bg-[#7367F0] text-white py-2 rounded-lg shadow-[0_4px_12px_rgba(115,103,240,0.5)] hover:shadow-[0_6px_16px_rgba(115,103,240,0.6)] transition-shadow"
           />
          
          </nav>
        </div>
      </div>
    </aside>
  );
};

// Reusable NavItem
const NavItem = ({ icon, label, to, noIcon = false, end=false}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-[.9375rem] ${
        isActive ? "bg-indigo-100 text-blue-600 font-medium" : "hover:bg-gray-100 text-[#384551]"
      }`
    }
  >
    {!noIcon && <span className="text-[.9375rem]">{icon}</span>}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
