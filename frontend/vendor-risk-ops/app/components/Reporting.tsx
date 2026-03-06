/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  FileText,
  CheckCircle2,
  ShieldCheck,
  Download,
  ListChecks,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";

// Importing data from your central source
import { complianceData, auditLogs, vendorData } from "../dummyData";

// Import the new Enterprise Template
import EnterpriseReportTemplate from "./EnterpriseReportTemplate";

interface ReportingProps {
  handleVendorClick: (vendor: any) => void;
}

export default function Reporting({ handleVendorClick }: ReportingProps) {
  const [selectedFramework, setSelectedFramework] = useState("SOC 2");

  const [isPrinting, setIsPrinting] = useState(false);

  // LOGIC: Trigger the browser's native print engine for the PDF report
  const handlePrintFinished = () => {
    setIsPrinting(false);
  };

  // LOGIC: Mapping logic to simulate vendor violations per framework
  const getMappedVendors = () => {
    if (selectedFramework === "SOC 2") {
      // SOC 2 focuses on lower overall security scores
      return vendorData.filter((v) => v.score < 65);
    }
    if (selectedFramework === "GDPR") {
      // GDPR focuses on Tier 1 vendors with potential privacy impacts
      return vendorData.filter((v) => v.tier === "Tier 1");
    }
    if (selectedFramework === "DORA") {
      // DORA focuses on active operational issues
      return vendorData.filter((v) => v.issues > 0);
    }
    return [];
  };

  const mappedVendors = getMappedVendors();

  return (
    <div className="animate-in fade-in duration-500 space-y-8 relative">
      {/* The Enterprise Report Template 
        (Hidden by default via CSS, becomes visible only during window.print())
      */}
      {isPrinting &&
        ReactDOM.createPortal(
          <EnterpriseReportTemplate onPrintFinished={handlePrintFinished} />,
          document.body
        )}

      {/* Header section with the Report Trigger */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Reporting & Compliance
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Map real-time vendor risks to your regulatory baseline.
          </p>
        </div>
        <button
          onClick={() => setIsPrinting(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition transform active:scale-95"
        >
          <Download size={18} />
          <span>Generate Board Report (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Framework Alignment & Interactive Mapping */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dashboard Summary Cards */}
          <div className="bg-white dark:bg-[#0f1115] rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <ShieldCheck size={14} /> Global Framework Alignment
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceData.map((item: any) => (
                <div
                  key={item.id}
                  className="p-6 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {item.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        item.status === "Healthy"
                          ? "bg-green-500/10 text-green-500"
                          : item.status === "Warning"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                      <span>Coverage: {item.coverage}%</span>
                      <span className="text-red-500">
                        {item.gaps} Critical Gaps
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${
                          item.status === "Healthy"
                            ? "bg-green-500"
                            : item.status === "Warning"
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${item.coverage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Lab: Mapping Overlay */}
          <div className="bg-white dark:bg-[#0f1115] rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                  Regulatory Mapping Overlay
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Vendors currently impacting your {selectedFramework} baseline.
                </p>
              </div>
              <div className="flex bg-slate-100 dark:bg-black p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                {["SOC 2", "GDPR", "DORA"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFramework(f)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                      selectedFramework === f
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-slate-500 hover:text-slate-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[280px]">
              {mappedVendors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mappedVendors.map((vendor) => (
                    <button
                      key={vendor.id}
                      onClick={() => handleVendorClick(vendor)}
                      className="group flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-blue-600/5 transition-all text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                            vendor.score < 55
                              ? "bg-red-500/10 text-red-500"
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {vendor.score}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-white text-sm">
                            {vendor.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                            {selectedFramework === "SOC 2" &&
                              "CC7.1 Logic Access Fail"}
                            {selectedFramework === "GDPR" &&
                              "Art. 32 Privacy Breach"}
                            {selectedFramework === "DORA" &&
                              "ICT Risk Managed Deficit"}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-600 group-hover:text-blue-500 transition-colors"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <ListChecks className="text-slate-600 opacity-20" size={40} />
                  <p className="text-slate-500 font-bold">
                    No mapped vendor gaps for {selectedFramework}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Audit Trail */}
        <div className="bg-white dark:bg-[#0f1115] rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <FileText size={14} /> Audit Trail (Immutable)
          </h2>
          <div className="space-y-8">
            {auditLogs.map((log: any, index: number) => (
              <div key={index} className="flex gap-4 relative">
                {index !== auditLogs.length - 1 && (
                  <div className="absolute left-1.5 top-6 w-0.5 h-10 bg-slate-100 dark:bg-slate-800"></div>
                )}
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                    index === 0
                      ? "bg-blue-500 ring-4 ring-blue-500/20"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                ></div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {log.action}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">
                      {log.user}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500">
                      • {log.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-600/20">
            <ShieldAlert size={32} className="mb-4 text-blue-200 opacity-50" />
            <h3 className="text-lg font-black mb-1">Compliance Lock</h3>
            <p className="text-blue-100 text-[10px] font-medium leading-relaxed">
              All reporting data is cryptographically signed for regulatory
              non-repudiation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
