/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ShieldAlert, Globe, Activity } from "lucide-react";
import { portfolioData } from "../dummyData";

export default function CommandCenter({
  currentTheme,
  handleVendorClick,
  setActiveView,
}: {
  currentTheme: string;
  handleVendorClick: (v: any) => void;
  setActiveView: (v: string) => void;
}) {
  // export default function CommandCenter({
  //   currentTheme,
  //   handleVendorClick,
  // }: {
  //   currentTheme: string;
  //   handleVendorClick: (v: any) => void;
  // }) {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Global Command Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Continuous Vendor Threat Exposure
          </p>
        </div>
        <button
          onClick={() => setActiveView("addVendor")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition"
        >
          + Add Vendor
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-center items-center transition-colors">
          <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Portfolio Risk Score
          </h2>
          <div className="text-7xl font-black text-slate-800 dark:text-white">
            {portfolioData.globalScore}
          </div>
          <div className="mt-4 flex items-center space-x-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
            <Activity size={16} />
            <span>Target Score: &gt; 80</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
          <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            Risk Distribution
          </h2>
          <div className="flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData.riskDistribution}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  stroke="none"
                  dataKey="value"
                >
                  {portfolioData.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      currentTheme === "dark" ? "#0f172a" : "#ffffff",
                    borderColor:
                      currentTheme === "dark" ? "#334155" : "#e2e8f0",
                    borderRadius: "8px",
                  }}
                  itemStyle={{
                    color: currentTheme === "dark" ? "#ffffff" : "#0f172a",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between transition-colors">
          <div>
            <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Total Monitored Vendors
            </h2>
            <div className="text-4xl font-bold text-slate-800 dark:text-white">
              {portfolioData.totalVendors}
            </div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30 flex items-start space-x-3 mt-4 transition-colors">
            <ShieldAlert
              className="text-red-500 dark:text-red-400 flex-shrink-0"
              size={24}
            />
            <div>
              <div className="text-red-700 dark:text-red-400 font-bold">
                {portfolioData.criticalAlerts} Critical Alerts Open
              </div>
              <div className="text-red-500 dark:text-red-500/80 text-sm">
                Immediate action required
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-8">
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 dark:text-slate-200">
              Top Offenders
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-xs text-slate-400 dark:text-slate-500 uppercase border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4 font-semibold">Vendor</th>
                  <th className="p-4 font-semibold">Score</th>
                  <th className="p-4 font-semibold">Trend</th>
                  <th className="p-4 font-semibold">Critical Issue</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.topOffenders.map((vendor) => (
                  <tr
                    key={vendor.id}
                    // This is the critical line that makes the row clickable
                    onClick={() => handleVendorClick(vendor)}
                    // Added cursor-pointer so the user knows it's clickable
                    className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {vendor.name}
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">
                        {vendor.domain}
                      </div>
                    </td>
                    <td className="p-4 font-black text-red-500 dark:text-red-400">
                      {vendor.score}
                    </td>
                    <td className="p-4 text-red-500 dark:text-red-400 font-medium">
                      {vendor.trend} pts
                    </td>
                    <td className="p-4">
                      <span className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2 py-1 rounded text-xs font-semibold border border-red-200 dark:border-red-800/50">
                        {vendor.issue}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
          <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Globe size={16} /> Global Threat Feed
          </h2>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {portfolioData.recentEvents.map((event) => (
              <div
                key={event.id}
                className="border-l-2 border-orange-400 dark:border-orange-500 pl-3"
              >
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {event.text}
                </p>
                <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                  {event.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
