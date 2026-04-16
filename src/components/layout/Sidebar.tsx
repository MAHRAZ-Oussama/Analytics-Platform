"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  Star,
  BrainCircuit,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Promotions", href: "/promotions", icon: GraduationCap },
  { label: "Étudiants", href: "/students", icon: Users },
  { label: "Pédagogie", href: "/pedagogy", icon: BookOpen },
  { label: "Qualité", href: "/quality", icon: Star },
  { label: "IA & Prédiction", href: "/ai", icon: BrainCircuit },
  { label: "Paramètres", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 h-screen bg-[#4B3F99] flex flex-col transition-all duration-300 z-30",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={clsx("flex items-center h-24 px-4 border-b border-white/10 bg-gradient-to-r from-[#4B3F99] to-[#3d3278]", collapsed ? "justify-center" : "justify-center")}>
        <img 
          src="/logo-epsi.svg" 
          alt="EPSI Logo" 
          className="h-16 flex-shrink-0"
          title="EPSI Platform"
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center h-10 mx-2 mb-0.5 rounded-lg transition-all group",
                collapsed ? "justify-center px-0" : "px-3 gap-3",
                active
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
              {collapsed && (
                <span className="sr-only">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 mx-2 mb-4 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* User */}
      {!collapsed && (
        <div className="px-4 pb-4 border-t border-white/10 pt-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4FC3C7] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">AD</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">Admin EPSI</p>
              <p className="text-white/50 text-xs truncate">admin@epsi.fr</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
