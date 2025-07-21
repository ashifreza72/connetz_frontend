import React from "react";        
import DashboardHeader from "../components/DashboardHeader";
import Clients from "../components/Clients";

const user = {
  name: "John Doe",
  role: "Admin",
  avatar: "https://randomuser.me/api/portraits/men/75.jpg", // Use a dynamic user image here
};

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader user={user} />
      <main className="p-2">
        {/* Dashboard Content Here */}
        <Clients />
       
      </main>
    </div>
  );
};

export default Dashboard;
