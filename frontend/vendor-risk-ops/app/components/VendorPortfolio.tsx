import React, { useState } from "react";
import { Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { vendorList } from "../dummyData";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function VendorPortfolio({
  handleVendorClick,
  setActiveView,
}: {
  handleVendorClick: (v: any) => void;
  setActiveView: (v: string) => void;
}) {
  // export default function VendorPortfolio({
  //   handleVendorClick,
  // }: {
  //   handleVendorClick: (v: any) => void;
  // }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("All Tiers");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filteredVendors = vendorList.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier =
      tierFilter === "All Tiers" || vendor.tier === tierFilter;
    const matchesCategory =
      categoryFilter === "All Categories" || vendor.category === categoryFilter;
    return matchesSearch && matchesTier && matchesCategory;
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Vendor Portfolio
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage, filter, and assess your third-party ecosystem.
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-medium shadow-sm transition flex items-center space-x-2">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setActiveView("addVendor")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition"
          >
            + Add Vendor
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-t-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap gap-4 items-center justify-between transition-colors">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center w-80 bg-slate-50 dark:bg-slate-950 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-800 focus-within:border-blue-500 transition-colors">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search vendors by name..."
              className="bg-transparent border-none outline-none text-sm ml-2 w-full text-slate-700 dark:text-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-slate-400" />
            <select
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
            >
              <option value="All Tiers">All Tiers</option>
              <option value="Tier 1">Tier 1</option>
              <option value="Tier 2">Tier 2</option>
              <option value="Tier 3">Tier 3</option>
            </select>
            <select
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              <option value="Cloud Infrastructure">Cloud Infrastructure</option>
              <option value="HR & Finance">HR & Finance</option>
              <option value="Facilities">Facilities</option>
              <option value="Payment Gateway">Payment Gateway</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Marketing">Marketing</option>
              <option value="Identity Management">Identity Management</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-b-xl border-x border-b border-slate-200 dark:border-slate-800 overflow-x-auto transition-colors shadow-sm">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="text-xs text-slate-400 dark:text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <th className="p-4 w-12">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-4 font-semibold">Vendor Name</th>
              <th className="p-4 font-semibold">Tier</th>
              <th className="p-4 font-semibold text-center">Score</th>
              <th className="p-4 font-semibold text-center">Issues</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr
                key={vendor.id}
                onClick={() => handleVendorClick(vendor)}
                className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition"
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4">
                  <div className="font-bold">{vendor.name}</div>
                  <div className="text-xs text-slate-400">{vendor.domain}</div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
                    {vendor.tier}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div
                    className={`inline-flex items-center justify-center h-8 w-12 rounded font-bold text-sm ${
                      vendor.score > 80
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {vendor.score}
                  </div>
                </td>
                <td className="p-4 text-center">
                  {vendor.issues > 0 ? (
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                      {vendor.issues}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
