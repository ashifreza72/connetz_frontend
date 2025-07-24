// src/layout/MainLayout.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader'; // optional
import Footer from '../components/Footer';
import { IoMenu } from 'react-icons/io5';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen scroll-smooth overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center justify-between p-4 shadow bg-white">
          <button onClick={() => setSidebarOpen(true)} className="text-2xl">
            <IoMenu />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#f7f5f5]">
          <div className="p-4 min-h-[calc(100vh-8rem)]">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
