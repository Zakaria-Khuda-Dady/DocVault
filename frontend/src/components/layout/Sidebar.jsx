import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, FileText, User, LogOut, X } from "lucide-react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Documents", icon: FileText, path: "/documents" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-purple-700/50 z-30 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-purple-700/30">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="text-white w-5 h-5" strokeWidth={2.5} />
            </div>
            <h1 className="text-white font-bold text-base">DocVault</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-slate-400 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="px-5 py-4 border-b border-purple-700/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-violet-600 rounded-xl flex items-center justify-center shrink-0">
              <User size={16} className="text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">
                {user?.username || "User"}
              </p>
              <p className="text-slate-400 text-xs truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1 flex-1">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500/10 to-violet-600/10 text-orange-400 border border-orange-500/30"
                    : "text-slate-300 hover:bg-purple-800/50 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-purple-700/30">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-orange-400 hover:bg-purple-800/50 transition-colors w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
