"use client";
import React from "react";
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  Shield,
  ClipboardList,
  Settings as SettingsIcon,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (v: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  // Helper to determine if a nav item is active
  const isActive = (view: string) => activeView === view;

  // Helper for button styles to keep the JSX clean
  const getBtnStyle = (view: string) => `
    w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 group
    ${
      isActive(view)
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
    }
  `;

  return (
    <aside className="w-64 bg-slate-900 dark:bg-[#0a0a0b] border-r border-slate-800 flex flex-col transition-colors duration-300 z-20">
      {/* Brand Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Shield className="text-white" size={18} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            CVM<span className="text-blue-500">.</span>
          </span>
        </div>
      </div>

      {/* Main Scrollable Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Monitoring Group */}
        <div className="space-y-2">
          <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Dashboards
          </p>

          <button
            onClick={() => setActiveView("commandCenter")}
            className={getBtnStyle("commandCenter")}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard size={18} />
              <span>Command Center</span>
            </div>
            {isActive("commandCenter") && <ChevronRight size={14} />}
          </button>

          <button
            onClick={() => setActiveView("vendorPortfolio")}
            className={getBtnStyle("vendorPortfolio")}
          >
            <div className="flex items-center gap-3">
              <Users size={18} />
              <span>Vendor Portfolio</span>
            </div>
            {(isActive("vendorPortfolio") || activeView === "vendorDetail") && (
              <ChevronRight size={14} />
            )}
          </button>

          <button
            onClick={() => setActiveView("alertsTriage")}
            className={getBtnStyle("alertsTriage")}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} />
              <span>Alerts & Triage</span>
            </div>
            {isActive("alertsTriage") && <ChevronRight size={14} />}
          </button>
        </div>

        {/* Intelligence Group */}
        <div className="space-y-2">
          <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Reporting
          </p>

          <button
            onClick={() => setActiveView("reporting")}
            className={getBtnStyle("reporting")}
          >
            <div className="flex items-center gap-3">
              <Shield size={18} />
              <span>Compliance Engine</span>
            </div>
            {isActive("reporting") && <ChevronRight size={14} />}
          </button>

          <button
            onClick={() => setActiveView("questionnaires")}
            className={getBtnStyle("questionnaires")}
          >
            <div className="flex items-center gap-3">
              <ClipboardList size={18} />
              <span>Questionnaires</span>
            </div>
            {(isActive("questionnaires") ||
              activeView === "builder" ||
              activeView === "templateLibrary") && <ChevronRight size={14} />}
          </button>
        </div>
      </nav>

      {/* Bottom Fixed Section for Settings */}
      <div className="p-4 mt-auto border-t border-slate-800 bg-slate-900/40 dark:bg-black/20">
        <button
          onClick={() => setActiveView("settings")}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-sm transition-all duration-200
            ${
              isActive("settings")
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }
          `}
        >
          <SettingsIcon
            size={18}
            className={isActive("settings") ? "animate-spin-slow" : ""}
          />
          <span>System Settings</span>
        </button>
      </div>
    </aside>
  );
}
