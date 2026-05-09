import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { LayoutDashboard, CheckSquare, Dumbbell, Moon, Activity,
  BarChart2, Calendar, Settings, Menu, X, Sun, Zap, Bot, Utensils, Wallet,
} from "lucide-react";

const NAV_ITEMS = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/tasks", icon: CheckSquare, label: "Tasks" },
  { path: "/fitness", icon: Dumbbell, label: "Fitness" },
  { path: "/prayer", icon: Moon, label: "Prayer" },
  { path: "/habits", icon: Activity, label: "Habits" },
  { path: "/food", icon: Utensils, label: "Food AI" },
  { path: "/budget", icon: Wallet, label: "Budget" },
  { path: "/analytics", icon: BarChart2, label: "Analytics" },
  { path: "/schedule", icon: Calendar, label: "Schedule" },
  { path: "/ai", icon: Bot, label: "AI Assistant" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function Layout({ children }) {
  const { state, dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentPage = NAV_ITEMS.find(n => n.path === location.pathname)?.label || "Dashboard";

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-700 rounded-xl flex items-center justify-center shadow-md">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">LifeAssist</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">Your daily companion</div>
          </div>
          <button className="ml-auto lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom user info */}
        <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm">K</div>
            <div>
              <div className="text-sm font-semibold">Kaif</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">Student · Worker</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content — offset by sidebar width on large screens */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-4">
          <button className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <h1 className="font-semibold text-gray-800 dark:text-gray-100">{currentPage}</h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </span>
            <button
              onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {state.darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
