import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Desktop sidebar - always visible */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar isSidebarOpen={true} toggleSidebar={toggleSidebar} />
      </div>

      {/* Mobile sidebar - toggleable */}
      <div className="lg:hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex-1 flex flex-col lg:pl-64">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 overflow-auto bg-slate-50">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
