import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaTelegram,
  FaMale,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import DashboardHeader from "../components/DashboardHeader";
import addIcon from "../assets/images/add-book-icon.png";
import AddActivityModal from "../components/AddActivityModal";
import {
   
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGlobe
} from "react-icons/fa";


// Function to get icon based on source
const getSourceIcon = (source) => {
  switch (source?.toLowerCase()) {
    case "facebook":
      return <FaFacebook className="text-blue-600 text-xl" />;
    case "google":
      return <FaGoogle className="text-red-500 text-xl" />;
    case "instagram":
      return <FaInstagram className="text-pink-500 text-xl" />;
    case "linkedin":
      return <FaLinkedin className="text-blue-700 text-xl" />;
    case "twitter":
      return <FaTwitter className="text-sky-500 text-xl" />;
    default:
      return <FaGlobe className="text-gray-500 text-xl" />;
  }
};

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = "#" + ((hash >> 24) & 0xFF).toString(16).padStart(2, '0') +
                       ((hash >> 16) & 0xFF).toString(16).padStart(2, '0') +
                       ((hash >> 8) & 0xFF).toString(16).padStart(2, '0');
  return color;
};


const getInitials = (name) => {
  if (!name) return "-";
  const parts = name.trim().split(" ");
  const first = parts[0]?.charAt(0).toUpperCase() || "";
  const last = parts[1]?.charAt(0).toUpperCase() || "";
  return first + last;
};


const ClientDetails = () => {
  const [client, setClient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const clientId = location.state?.clientId;
  const [activity, setActivity] = useState([]);
  const [activeTab, setActiveTab] = useState("All Clients");
  const [showTrialNotice, setShowTrialNotice] = useState(true);

  useEffect(() => {
    const fetchClientDetails = async () => {
    try {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user"));
  const user_id = userData?.id

  const res = await fetch(`http://192.168.1.57:8000/api/app/leads/${clientId}`, {
    headers: {
      "Content-Type": "application/json",
      "XF-Token": token,        
      "user-id": user_id,     
    },
  });

  const data = await res.json();
  console.log('enter', data);

  if (data.status && data.data) {
    setClient(data.data);
  } else {
    console.error("Client data not found");
  }
} catch (err) {
  console.error("Failed to fetch client details:", err);
}
    };

    if (clientId) {
      fetchClientDetails();
    }
  }, [clientId]);

  const addActivity = (newActivity) => {
    if (activeTab === "All Clients") {
      setActivity((prev) => [...prev, newActivity]);
    }
  };

  if (!client) return <div className="text-center p-10">Loading...</div>;
  
  return (
    <div className="min-h-screen bg-[#f7f5f5]">
      <DashboardHeader />
      <div className="px-1 mx-4 md:mx-12 2xl:mx-auto pt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{client.name}</h1>
          <span className="text-gray-600 text-sm">
            <a href="/" className="text-[#164ec8] hover:underline">Home</a> &gt; Client Info
          </span>
        </div>
        
        {/* Rest of your existing JSX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Info */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Client Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    {/* <div className="flex items-center space-x-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                    style={{ backgroundColor: stringToColor(client.name || "-") }}
                  >
                    {client.name ? client.name.charAt(0).toUpperCase() : "-"}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Display Name</div>
                    <div className="font-medium text-gray-900">{client.name}</div>
                  </div>
                </div> */}

                <div className="flex items-center space-x-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: stringToColor(client.name || "-") }}
                  >
                    {getInitials(client.name)}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Display Name</div>
                    <div className="font-medium text-gray-900">{client.name}</div>
                  </div>
                </div>


                    <div className="flex items-center space-x-4">
                    <FaPhoneAlt className="text-[#164ec8]" />
                    <div>
                        <div className="text-sm text-gray-500">Mobile Number</div>
                        <div className="font-medium text-gray-900">{client.phone}</div>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <FaWhatsapp className="text-green-500" />
                    <div>
                        <div className="text-sm text-gray-500">WhatsApp Number</div>
                        <div className="font-medium text-gray-900">{client.phone}</div>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <FaEnvelope className="text-[#164ec8]" />
                    <div>
                        <div className="text-sm text-gray-500">Email Address</div>
                        <div className="font-medium text-gray-900">
                        {client.email}
                        </div>
                    </div>
                    </div>
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Client Notes</div>
                    <div className="text-gray-800 text-sm whitespace-pre-line">
                    {client.campaign}
                    </div>
                </div>
                </div>
          </div>

          {/* Lead Source */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Lead Source</h2>
            <div className="text-gray-500 text-sm mb-4">
              Display content from your connected accounts on your site
            </div>
           <div className="flex items-center space-x-4">
      {getSourceIcon(client.source)}
      <span className="text-gray-800 font-medium">{client.source}</span>
    </div>
          </div>

          {/* Send Response */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Send Response On</h2>
            <div className="text-gray-500 text-sm mb-4">
              Please select the type of response you want to send
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border rounded-xl p-6 shadow-lg cursor-pointer hover:bg-gray-50 flex flex-col items-start gap-3">
      <FaPhoneAlt className="text-yellow-500 text-4xl" />
      <div className="font-semibold text-2xl text-gray-600">Phone Call</div>
     </div>
     <div className="border rounded-xl p-6 shadow-lg cursor-pointer hover:bg-gray-50 flex flex-col items-start gap-3">
     <FaEnvelope className="text-[#164ec8] text-4xl" />
    <div className="font-semibold text-2xl text-gray-600">Message</div>
  </div>
  <div className="border rounded-xl p-6 shadow-lg cursor-pointer hover:bg-gray-50 flex flex-col items-start gap-3">
    <FaWhatsapp className="text-green-500 text-4xl" />
    <div className="font-semibold text-2xl text-gray-600">WhatsApp</div>
  </div>
  <div className="border rounded-xl p-6 shadow-lg cursor-pointer hover:bg-gray-50 flex flex-col items-start gap-3">
    <FaTelegram className="text-green-500 text-4xl" />
    <div className="font-semibold text-2xl text-gray-600">Telegram</div>
  </div>
  <div className="border rounded-xl p-6 shadow-lg cursor-pointer hover:bg-gray-50 flex flex-col items-start gap-3">
    <FaMale className="text-green-500 text-4xl" />
    <div className="font-semibold text-2xl text-gray-600">Male</div>
  </div>
 
 
            </div>
          </div>
        </div>

        {/* Right Section - Timeline */}
        <div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Timeline</h2>
             <button
          onClick={() => setModalOpen(true)}
          className="bg-[#164ec8] hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-3xl shadow-[0_4px_12px_rgba(115,103,240,0.5)] flex items-center gap-2"
        >
          <img src={addIcon} alt="Add" className="w-5 h-5" />
          ADD Activity
        </button>
            </div>

            <ul className="space-y-5 max-h-[720px] overflow-y-auto pr-2">
              {client.timeline?.map((item, index) => (
                <li key={index} className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 mt-2 bg-[#164ec8] rounded-full"></span>
                    <div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                      <div className="text-sm text-gray-800 font-medium">
                        {item.message}
                      </div>
                    </div>
                  </div>
                  <BsThreeDotsVertical className="text-gray-400 mt-2 cursor-pointer" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* 🪟 Modal */}
      <AddActivityModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addActivity}
      />
        </div>
    </div>
  );
};

export default ClientDetails;
