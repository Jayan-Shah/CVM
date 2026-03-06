/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { ArrowLeft, ExternalLink, Mail } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { vendorDetailData } from "../dummyData";

export default function VendorDetail({
  vendor,
  setActiveView,
  currentTheme,
}: {
  vendor: any;
  setActiveView: (v: string) => void;
  currentTheme: string;
}) {
  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      {/* Back Button & Header */}
      <div className="mb-6 flex items-center space-x-4">
        <button
          onClick={() => setActiveView("vendorPortfolio")}
          className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {vendor.name}
            </h1>
            <span className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold uppercase tracking-wider">
              {vendor.tier}
            </span>
          </div>
          <a
            href={`https://${vendor.domain}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-600 mt-1 flex items-center space-x-1 text-sm font-medium"
          >
            <span>{vendor.domain}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Header Actions */}
        <div className="ml-auto flex space-x-3">
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-medium shadow-sm transition flex items-center space-x-2">
            <Mail size={16} />
            <span>Send Questionnaire</span>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition">
            Create Remediation Ticket
          </button>
        </div>
      </div>

      {/* Data Grid: Radar & Trend */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Score & Radar Widget */}
        <div className="xl:col-span-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Overall Risk Score
            </h2>
            <div
              className={`text-3xl font-black ${
                vendor.score > 80
                  ? "text-green-500"
                  : vendor.score > 60
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {vendor.score}
            </div>
          </div>

          <div className="flex-1 min-h-[250px] -mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="70%"
                data={vendorDetailData.radarData}
              >
                <PolarGrid
                  stroke={currentTheme === "dark" ? "#334155" : "#e2e8f0"}
                />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: currentTheme === "dark" ? "#94a3b8" : "#64748b",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.4}
                />
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
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trendline Widget */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
          <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-6">
            12-Month Historical Trend
          </h2>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={vendorDetailData.historicalTrend}
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={currentTheme === "dark" ? "#1e293b" : "#f1f5f9"}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke={currentTheme === "dark" ? "#64748b" : "#94a3b8"}
                  tick={{
                    fill: currentTheme === "dark" ? "#94a3b8" : "#64748b",
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke={currentTheme === "dark" ? "#64748b" : "#94a3b8"}
                  tick={{
                    fill: currentTheme === "dark" ? "#94a3b8" : "#64748b",
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />
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
                    fontWeight: "bold",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ef4444", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Findings Ledger Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <h2 className="font-bold text-slate-800 dark:text-slate-200">
            Active Vulnerabilities & Findings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-xs text-slate-400 dark:text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 font-semibold">Severity</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Age</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {vendorDetailData.openFindings.map((finding) => (
                <tr
                  key={finding.id}
                  className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold border ${
                        finding.severity === "Critical"
                          ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50"
                          : finding.severity === "High"
                          ? "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/50"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800/50"
                      }`}
                    >
                      {finding.severity}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {finding.category}
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-800 dark:text-slate-200">
                    {finding.title}
                  </td>
                  <td className="p-4 text-sm text-slate-500">{finding.age}</td>
                  <td className="p-4">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      {finding.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
