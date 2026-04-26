import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Bell, User, Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-700/30 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="text-slate-400 hover:text-white transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
          </button>

          <div className="flex items-center gap-2 bg-slate-700 rounded-xl px-3 py-2 hover:bg-slate-600 transition-colors">
            <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md">
              <User size={14} className="text-white" />
            </div>
            <span className="text-slate-300 text-sm font-medium">
              {user?.username || "User"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
