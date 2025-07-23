import { useContext, useEffect, useState } from "react";
import AddClientModal from "../components/AddClientModal";
import Swal from "sweetalert2";
import { Search, Filter, ChevronDown } from 'lucide-react';
 import addIcon from '../assets/images/add-book-icon.png';  
 import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 

 
console.log("API CALL TO:", `${process.env.REACT_APP_BASE_API}/api/dashboard`);


const tabApiMap = {
  "All Clients": `${process.env.REACT_APP_BASE_API}/api/dashboard`,
  "Uncontacted": `${process.env.REACT_APP_BASE_API}/api/clients/uncontacted`,
  "Follow Ups": `${process.env.REACT_APP_BASE_API}/api/clients/follow-ups`,
  "Recently Viewed Content": `${process.env.REACT_APP_BASE_API}/api/clients/recently-viewed`,
};




const Clients = () => {
   const { user, loading: authLoading } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Clients");

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");


 
   useEffect(() => {
  const fetchClients = async () => {
    if (authLoading || !user) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // const user_id = 10;
      const user_type = localStorage.getItem("user_type");
      const userData = JSON.parse(localStorage.getItem("user"));
      const user_id = userData?.id
// console.log(user_id)
   
      if (!token) {
        Swal.fire("Unauthorized", "Please login again.", "warning");
        return;
      }

      const res = await fetch(tabApiMap[activeTab], {
        headers: {
          "XF-token": `${token}`,
          "user_id": `${user_id}`,
          "user_type": `${user_type}`,
        },
      });

      const data = await res.json();
      console.log('now',data)
      console.log("Fetched client data:", data);

      if (res.ok && data.data?.leads) {
        const clientList = Array.isArray(data.data.leads)
          ? data.data.leads
          : Array.isArray(data.data.leads?.clients)
          ? data.data.leads.clients
          : [];

        setClients(clientList);
        setCurrentPage(1);
      } else {
        Swal.fire("Error", data.message || "Failed to fetch clients", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Network error. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  fetchClients();
}, [activeTab, user, authLoading]);  


 

  const addClient = (newClient) => {
    if (activeTab === "All Clients") {
      setClients((prev) => [...prev, newClient]);
    }
  };

  const navigate = useNavigate();

//   const handleRowClick = (client) => {
//  navigate("/client-details", { state: { clientId: client.id } });

// };

const handleRowClick = (client) => {
  console.log("Clicked client:", client); // ✅ Should print
  navigate("/client-details", { state: { clientId: client.id } });
};


  const tabs = [
    { id: 1, label: "All Clients" },
    { id: 2, label: "Uncontacted" },
    { id: 3, label: "Follow Ups" },
    { id: 4, label: "Recently Viewed Content" },
  ];

  const filters = ['All', 'Active', 'Inactive', 'New'];
  

  // ✅ Safe filtering
  const filteredClients = Array.isArray(clients)
    ? clients.filter((client) => {
        const matchesFilter =
          selectedFilter === "All" ||
          client.status?.toLowerCase() === selectedFilter.toLowerCase();
        const matchesSearch = client.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      })
    : [];

        // Pagination logic
        const totalPages = Math.ceil(filteredClients.length / entriesPerPage);
        const indexOfLastEntry = currentPage * entriesPerPage;
        const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
        const currentClients = filteredClients.slice(indexOfFirstEntry, indexOfLastEntry);

        const handlePageChange = (page) => {
          if (page >= 1 && page <= totalPages) setCurrentPage(page);
        };

        
  return (
    <div className="p-1 mx-9">
      {/* 🔘 Top Bar */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Clients</h1>
      
       <button
  onClick={() => setModalOpen(true)}
  className="bg-[#164ec8] hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-3xl shadow-[0_4px_12px_rgba(115,103,240,0.5)] flex items-center gap-2"
>
  <img src={addIcon} alt="Add" className="w-5 h-5" />
  ADD CLIENT
</button>


      </div>

      {/* 📋 Custom Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {/* 🧭 Tabs */}
        <div className="flex items-center space-x-4 mb-3 bg-white p-4 rounded">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab(tab.label)}
                className={`inline-flex items-center justify-center gap-2 px-5 py-1 rounded-md font-bold text-sm leading-6 transition-colors duration-150 ease-out ${
                  activeTab === tab.label
                    ? " text-[#164ec8]"
                    : "bg-transparent text-[#6c757d] hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
              <span
                className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-bold border ${
                  activeTab === tab.label
                    ? " text-white bg-[#164ec8]"
                    : "border-gray-300 text-gray-600 bg-white"
                }`}
              >
                {tab.id}
            </span>
            <span
              className={`font-medium ${
                activeTab === tab.label ? "text-white-600" : "text-gray-600"
              }`}
            >
              {tab.label}
            </span>
            
          </div>

            
          </div>

              </button>
              {index < tabs.length - 1 && <span className="text-gray-600 font-bold">{">"}</span>}
            </div>
          ))}
        </div>

        {/* 🔍 Search and Filter */}
       <div className="flex items-center gap-4 mb-3">
  {/* Search (70%) */}
  <div className="w-[70%] ml-5">
    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md w-full">
      <Search className="w-4 h-4 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  </div>

  {/* Filter (30%) */}
  <div className="w-[30%] relative mr-5">
    <button
      onClick={() => setShowFilter(!showFilter)}
      className="flex items-center justify-between w-full gap-2 bg-gray-100 px-4 py-2 rounded-md text-sm font-semibold text-gray-800"
    >
      <Filter className="w-4 h-4" />
      {selectedFilter}
      <ChevronDown className="w-4 h-4" />
    </button>

        {showFilter && (
          <div className="absolute right-0 mt-2 w-full bg-white border rounded-md shadow-md z-10">
            {filters.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setSelectedFilter(item);
                  setShowFilter(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  item === selectedFilter ? 'font-medium text-[#164ec8]' : 'text-gray-700'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
  </div>
</div>


        {/* 📄 Table */}
        <table className="min-w-full table-auto border-separate [border-spacing:0_10px] text-[14px]">
          <thead className="align-bottom border-0 border-solid border-inherit">
            <tr>
              <th className="w-[15%] px-12 text-start py-[1.051rem] text-[#384551] text-[14.5px] uppercase font-semibold bg-white border-t border-b">
                Name
              </th>
              <th className="w-[40%] px-5 text-start py-[1.051rem] text-[#384551] text-[14.5px] uppercase font-semibold bg-white border-t border-b">
                Details
              </th>
              <th className="w-[10%] px-5 text-start py-[1.051rem] text-[#384551] text-[14.5px] uppercase font-semibold bg-white border-t border-b">
                Last Activity
              </th>
              <th className="w-[10%] px-4 text-start py-[1.051rem] text-[#384551] text-[14.5px] uppercase font-semibold bg-white border-t border-b">
                Date Added
              </th>
            </tr>
          </thead>
          <tbody>
           {currentClients.map((client, idx) => (
           <tr
              key={client.id || idx}
              onClick={() => handleRowClick(client)}
              
              className="hover:bg-gray-100 bg-white cursor-pointer transition-all duration-200 shadow-[inset_0_0_0_9999px_var(--tw-bg-opacity)]"
            >

            <td className="px-6 py-[0.252rem] text-[.9375rem] text-black font-semibold border-b flex text-center items-center whitespace-nowrap">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="avatar"
                className="w-8 h-8 rounded-full mr-3"
              />
              {client.name || "-"}
            </td>
            <td className="px-5 py-[0.252rem] text-[.9375rem] text-black font-semibold border-b max-w-[300px] truncate">
              {client.campaign?.length > 100
                ? client.campaign.slice(0, 100) + "..."
                : client.campaign || "-"}
            </td>
              <td className="px-5 py-[0.252rem] text-[.9375rem] text-black border-b font-semibold whitespace-nowrap">
                {client.date
                  ? new Date(client.date).toLocaleString(undefined, {
                      dateStyle: "medium",
                    })
                  : "-"}
              </td>
              <td className="px-5 py-[0.252rem] text-[.9375rem] text-black border-b font-semibold whitespace-nowrap">
                {client.created_at
                  ? new Date(client.created_at).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "-"}
              </td>
            </tr>
           ))}
          </tbody>

        </table>

        {/* Pagination */}
        {!loading && (
          <div className="flex items-center justify-between mt-1 px-4 pb-2">
            <p className="text-sm text-gray-500">
              Showing {indexOfFirstEntry + 1} to{" "}
              {Math.min(indexOfLastEntry, filteredClients.length)} of {filteredClients.length} entries
            </p>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-[#164ec8] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>

      {/*  Modal */}
      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addClient}
      />
    </div>
  );
};

export default Clients;



