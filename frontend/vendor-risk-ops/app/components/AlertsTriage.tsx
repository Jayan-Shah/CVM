/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  ShieldAlert,
  MoreHorizontal,
} from "lucide-react";
import { alertsData } from "../dummyData";

export default function AlertsTriage() {
  const openAlerts = alertsData.filter((a) => a.status === "Open");
  const investigatingAlerts = alertsData.filter(
    (a) => a.status === "Investigating"
  );
  const resolvedAlerts = alertsData.filter((a) => a.status === "Resolved");

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50";
      case "High":
        return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/50";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800/50";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    }
  };

  const AlertCard = ({ alert }: { alert: any }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition cursor-grab group">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getSeverityStyle(
            alert.severity
          )}`}
        >
          {alert.severity}
        </span>
        <button className="text-slate-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1 leading-snug">
        {alert.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
        {alert.vendor}
      </p>
      <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-3 mt-1">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          {alert.id}
        </span>
        <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 space-x-1">
          <Clock size={12} />
          <span>{alert.time}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Alerts & Triage
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and remediate active vendor vulnerabilities.
          </p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        <div className="bg-slate-100 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/20">
            <div className="flex items-center space-x-2">
              <ShieldAlert size={18} className="text-red-500" />
              <h2 className="font-bold text-slate-800 dark:text-slate-200">
                Open Alerts
              </h2>
            </div>
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded-full">
              {openAlerts.length}
            </span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {openAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/20">
            <div className="flex items-center space-x-2">
              <AlertCircle size={18} className="text-orange-500" />
              <h2 className="font-bold text-slate-800 dark:text-slate-200">
                Investigating
              </h2>
            </div>
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded-full">
              {investigatingAlerts.length}
            </span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {investigatingAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/20">
            <div className="flex items-center space-x-2">
              <CheckCircle size={18} className="text-green-500" />
              <h2 className="font-bold text-slate-800 dark:text-slate-200">
                Resolved (30d)
              </h2>
            </div>
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded-full">
              {resolvedAlerts.length}
            </span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar opacity-75">
            {resolvedAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
