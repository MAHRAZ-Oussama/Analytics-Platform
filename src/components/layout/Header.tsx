"use client";

import { Bell, Search, Moon, Sun, Sparkles } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [dark, setDark] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 bg-gradient-to-r from-white to-slate-50 border-b border-gray-100 flex items-center px-6 gap-4 sticky top-0 z-20 shadow-sm">
      {/* Title with Icon */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold bg-gradient-to-r from-[#4B3F99] to-[#4FC3C7] bg-clip-text text-transparent truncate">
            {title}
          </h1>
          {title.includes("Dashboard") && (
            <Sparkles size={16} className="text-[#F39C12] flex-shrink-0 animate-pulse-subtle" />
          )}
        </div>
        {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Rechercher..."
          className="pl-9 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B3F99]/30 focus:border-[#4B3F99] w-56 transition-all"
        />
      </div>

      {/* Actions */}
      <button
        onClick={toggleDark}
        title={dark ? "Mode clair" : "Mode sombre"}
        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <button 
        className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
        title="Notifications"
        aria-label="Notifications"
      >
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
      </button>

      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4B3F99] to-[#4FC3C7] flex items-center justify-center shadow-md">
        <span className="text-white text-xs font-semibold">AD</span>
      </div>
    </header>
  );
}
