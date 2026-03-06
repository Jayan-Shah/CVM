/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Sliders,
  BellRing,
  Save,
  RefreshCcw,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { riskConfig } from "../dummyData";

export default function Settings() {
  // 1. Manage both Weights AND Thresholds in state
  const [weights, setWeights] = useState(riskConfig.weights);
  const [criticalThreshold, setCriticalThreshold] = useState(
    riskConfig.thresholds.critical
  );
  const [warningThreshold, setWarningThreshold] = useState(
    riskConfig.thresholds.warning
  );

  const handleSliderChange = (id: string, newValue: number) => {
    setWeights((prevWeights) =>
      prevWeights.map((w) => (w.id === id ? { ...w, value: newValue } : w))
    );
  };

  // 2. Updated Reset function to clear everything back to defaults
  const handleReset = () => {
    setWeights(riskConfig.weights);
    setCriticalThreshold(riskConfig.thresholds.critical);
    setWarningThreshold(riskConfig.thresholds.warning);
  };

  const totalWeight = weights.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="animate-in fade-in duration-500 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            System Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Configure the global risk scoring engine and notification logic.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-lg font-bold transition hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95"
          >
            <RefreshCcw size={18} />
            <span>Reset Defaults</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition transform active:scale-95">
            <Save size={18} />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Risk Weighting Engine */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                  <Sliders size={20} />
                </div>
                <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Risk Weighting Engine
                </h2>
              </div>

              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black ${
                  totalWeight === 100
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {totalWeight !== 100 && <AlertTriangle size={12} />}
                Total Weight: {totalWeight}%
              </div>
            </div>

            <div className="space-y-10">
              {weights.map((weight) => (
                <div key={weight.id} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <div className="space-y-1">
                      <label className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
                        {weight.label}
                      </label>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                        {weight.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900 dark:text-white">
                        {weight.value}
                      </span>
                      <span className="text-xs font-bold text-slate-400 ml-0.5">
                        %
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weight.value}
                    onChange={(e) =>
                      handleSliderChange(weight.id, parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Alert Thresholds */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <BellRing size={16} /> Alert Thresholds
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  Critical Alert Trigger
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    {/* CHANGED: value={criticalThreshold} instead of defaultValue */}
                    <input
                      type="number"
                      value={criticalThreshold}
                      onChange={(e) =>
                        setCriticalThreshold(parseInt(e.target.value) || 0)
                      }
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm font-bold outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Pts</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  Warning Alert Trigger
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    {/* CHANGED: value={warningThreshold} instead of defaultValue */}
                    <input
                      type="number"
                      value={warningThreshold}
                      onChange={(e) =>
                        setWarningThreshold(parseInt(e.target.value) || 0)
                      }
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm font-bold outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Pts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
            <ShieldCheck size={32} className="mb-4 text-blue-200" />
            <h3 className="text-lg font-bold mb-1">CVM Core Engine</h3>
            <p className="text-blue-100 text-xs leading-relaxed opacity-80">
              Score recalculation is performed in real-time. Thresholds
              determine when system-wide alerts are triggered for analysts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
