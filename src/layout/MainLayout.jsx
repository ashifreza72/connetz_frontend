// src/layout/MainLayout.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader'; // optional
import { IoMenu } from 'react-icons/io5';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-orange-100 h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar for mobile (hamburger menu) */}
        <div className="md:hidden flex items-center justify-between p-4 shadow bg-white">
          <button onClick={() => setSidebarOpen(true)} className="text-2xl">
            <IoMenu />
          </button>
        </div>

        {/* Optional: Full Header */}
        {/* <DashboardHeader /> */}
         

        {/* Page content */}
        <main className="flex-1 p-4 bg-[#f7f5f5] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
