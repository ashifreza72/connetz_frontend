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
} from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const DashboardHeader = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState({ name: "Loading...", role: "User", avatar: "" });



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        name: parsed.name || "Unknown",
        role: parsed.position || "User", // based on your login response
        avatar: "", // update if avatar URL is available in future
      });
    }
  }, []);

  if (!visible) return null;


   
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
        //  Clear localStorage and redirect
        localStorage.clear();
        Swal.fire("Logged out!", "See you again!", "success");
        Swal.fire({
                      icon: "success",
                      title: "Logged out!",
                      text: "See you again!",
                       customClass: {
                      confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                    },
                      // timer: 1500,
                      showConfirmButton: true,
                    });

        // Redirect to login
        navigate("/login");
      } else {
        console.error("Logout API failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  return (
    <header className="bg-white shadow-sm flex items-center px-6 mx-12 rounded-sm sticky top-0 z-30 py-4">
      {/* Trial warning bar */}
      <div className="flex justify-between items-center bg-orange-100 text-orange-500 text-sm px-4 py-2 rounded-md w-full max-w-md">
        <span>CONNETZ TRIAL EXPIRES IN 6 DAYS — View Pricing Plan</span>
        <button onClick={() => setVisible(false)} className="ml-3">
          <FaTimes className="text-orange-400 hover:text-orange-500 text-xs" />
        </button>
      </div>

      {/* Notification and Profile */}
      <div className="flex items-center space-x-4 ml-auto relative">
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-600 text-xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
        </div>

        {/* Avatar */}
        <div className="relative">
         <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-9 h-9 rounded-full bg-pink-600 text-white flex items-center justify-center cursor-pointer border font-semibold text-sm"
        >
          {user.name?.charAt(0).toUpperCase() || "-"}
        </div>


          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-3 z-50">
              <div className="px-4 py-2 border-b">
                 

                <div className="flex items-center space-x-2">
                <div
                  className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-semibold text-sm"
                >
                  {user.name?.charAt(0).toUpperCase() || "-"}
                </div>
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
                <li
                  onClick={handleLogout}
                  className="flex items-center space-x-2 hover:text-red-600 cursor-pointer"
                >
                  <FaPowerOff />
                  <span>Log Out</span>
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
