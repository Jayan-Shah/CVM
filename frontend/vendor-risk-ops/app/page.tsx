/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import CommandCenter from "./components/CommandCenter";
import VendorPortfolio from "./components/VendorPortfolio";
import VendorDetail from "./components/VendorDetail";
import AlertsTriage from "./components/AlertsTriage";
import Reporting from "./components/Reporting";
import Settings from "./components/Settings";
import Questionnaires from "./components/Questionnaires";
import TemplateLibrary from "./components/TemplateLibrary";
import QuestionnaireBuilder from "./components/QuestionnaireBuilder";
import AddVendorFlow from "./components/AddVendorFlow";

// Import initial data
import { initialTemplates } from "./dummyData";

export default function Home() {
  // 1. NAVIGATION & UI STATE
  const [activeView, setActiveView] = useState("commandCenter");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [currentTheme, setCurrentTheme] = useState("dark");

  // 2. DATA STATE (Lifted for persistence)
  const [templates, setTemplates] = useState(initialTemplates);

  // 3. THEME TOGGLE LOGIC
  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(newTheme);

    // Physically toggle the 'dark' class on the root element for Tailwind
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Sync theme on initial load
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // 4. HANDLERS
  const handleVendorClick = (vendor: any) => {
    setSelectedVendor(vendor);
    setActiveView("vendorDetail");
  };

  const handleSaveNewTemplate = (newTemplate: any) => {
    setTemplates((prev) => [newTemplate, ...prev]);
  };

  return (
    <main
      className={`flex h-screen overflow-hidden font-sans transition-colors duration-500 ${
        currentTheme === "dark"
          ? "bg-[#050505] text-slate-200"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Sidebar Component */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col min-w-0 relative">
        {/* GLOBAL HEADER */}
        <header
          className={`h-16 border-b flex items-center justify-between px-8 backdrop-blur-md z-20 transition-colors duration-300 ${
            currentTheme === "dark"
              ? "border-slate-800/50 bg-[#050505]/50"
              : "border-slate-200 bg-white/80"
          }`}
        >
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <span
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                  currentTheme === "dark" ? "text-slate-500" : "text-slate-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search vendors, assets, or CVEs..."
                className={`w-full border rounded-xl py-2 pl-10 pr-4 text-sm outline-none transition-all ${
                  currentTheme === "dark"
                    ? "bg-slate-900/50 border-slate-800 focus:border-blue-500/50 text-white"
                    : "bg-slate-100 border-slate-200 focus:border-blue-400 text-slate-900"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all transform active:scale-90 ${
                currentTheme === "dark"
                  ? "text-slate-400 hover:text-yellow-400"
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              {currentTheme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            {/* Profile Info */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span
                  className={`text-xs font-black leading-none ${
                    currentTheme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Jayan Shah
                </span>
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">
                  Security Lead
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border-2 border-slate-800 flex items-center justify-center font-black text-white shadow-lg">
                JS
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Dashboard Views */}
          {activeView === "commandCenter" && (
            <CommandCenter
              currentTheme={currentTheme}
              handleVendorClick={handleVendorClick}
              setActiveView={setActiveView}
            />
          )}

          {activeView === "vendorPortfolio" && (
            <VendorPortfolio
              handleVendorClick={handleVendorClick}
              setActiveView={setActiveView}
            />
          )}

          {/* CRASH FIX: Ensure we use the 'vendor' prop name */}
          {activeView === "vendorDetail" && selectedVendor && (
            <VendorDetail
              vendor={selectedVendor}
              setActiveView={setActiveView}
            />
          )}

          {activeView === "alertsTriage" && <AlertsTriage />}
          {activeView === "reporting" && (
            <Reporting
              handleVendorClick={handleVendorClick} // ADD THIS PROP
            />
          )}
          {activeView === "settings" && <Settings />}

          {/* Questionnaire System */}
          {activeView === "questionnaires" && (
            <Questionnaires setActiveView={setActiveView} />
          )}

          {activeView === "templateLibrary" && (
            <TemplateLibrary
              setActiveView={setActiveView}
              templates={templates}
            />
          )}

          {activeView === "builder" && (
            <QuestionnaireBuilder
              setActiveView={setActiveView}
              onSave={handleSaveNewTemplate}
            />
          )}

          {/* Onboarding Flow */}
          {activeView === "addVendor" && (
            <AddVendorFlow
              setActiveView={setActiveView}
              templates={templates}
            />
          )}
        </div>
      </section>
    </main>
  );
}
