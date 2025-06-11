import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandCoins, FileDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Updated chartData for collected, pending, and overdue
const chartData = [
  { month: "Jan 2024", collected: 42000, pending: 22000, overdue: 1000 },
  { month: "Feb 2024", collected: 44000, pending: 9500, overdue: 15000 },
  { month: "Mar 2024", collected: 43000, pending: 3000, overdue: 1000 },
  { month: "Apr 2024", collected: 46000, pending: 6000, overdue: 1000 },
  { month: "May 2024", collected: 48000, pending: 11500, overdue: 1000 },
  { month: "Jun 2024", collected: 47000, pending: 3000, overdue: 1500 },
  { month: "Jul 2024", collected: 48000, pending: 2000, overdue: 22000 },
  { month: "Aug 2024", collected: 49000, pending: 2500, overdue: 21000 },
  { month: "Sept 2024", collected: 50000, pending: 3000, overdue: 2500 },
  { month: "Oct 2024", collected: 51000, pending: 4000, overdue: 21000 },
  { month: "Nov 2024", collected: 52000, pending: 3500, overdue: 21500 },
  { month: "Dec 2024", collected: 53000, pending: 3000, overdue: 2000 },
];

const tableData = [
  {
    property: "Sunset Apartments",
    unit: "Unit 101",
    tenant: "John Smith",
    amount: "AED 2,500",
    due: "1/1/2024",
    status: "collected",
  },
  {
    property: "Marina View",
    unit: "Unit 205",
    tenant: "Sarah Johnson",
    amount: "AED 3,200",
    due: "1/1/2024",
    status: "pending",
  },
  {
    property: "Central Plaza",
    unit: "Unit 304",
    tenant: "Mike Wilson",
    amount: "AED 2,800",
    due: "1/1/2024",
    status: "overdue",
  },
  {
    property: "Garden Heights",
    unit: "Unit 102",
    tenant: "Lisa Brown",
    amount: "AED 2,400",
    due: "1/1/2024",
    status: "collected",
  },
  {
    property: "Bay View",
    unit: "Unit 501",
    tenant: "David Lee",
    amount: "AED 3,500",
    due: "1/1/2024",
    status: "pending",
  },
];

const statusColors = {
  collected: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  overdue: "bg-red-100 text-red-700",
};

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Collected", value: "collected" },
  { label: "Pending", value: "pending" },
  { label: "Overdue", value: "overdue" },
];

const RentCollectionMaster = () => {
  const [selectedLine, setSelectedLine] = useState("all");
 
  return (
    <div className="min-h-screen ">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HandCoins className="w-6 h-6 text-blue-500" />
            <h1 className="text-3xl font-semibold text-gray-900">
              Rent Collection
            </h1>
          </div>
          <Button className="flex items-center gap-2 text-white bg-blue-500 myButton hover:bg-blue-600">
            <FileDown className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <div>
              <span className="text-sm text-gray-500">Total Collected</span>
              <span className="block text-2xl font-bold text-green-600">
                AED 51,000
              </span>
              <span className="text-xs text-gray-400">92% collection rate</span>
            </div>
          </Card>
          <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <div>
              <span className="text-sm text-gray-500">Pending</span>
              <span className="block text-2xl font-bold text-yellow-600">
                AED 3,000
              </span>
              <span className="text-xs text-gray-400">2 units</span>
            </div>
          </Card>
          <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <div>
              <span className="text-sm text-gray-500">Overdue</span>
              <span className="block text-2xl font-bold text-red-600">
                AED 1,500
              </span>
              <span className="text-xs text-gray-400">1 units</span>
            </div>
          </Card>
          <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <div>
              <span className="text-sm text-gray-500">Total Expected</span>
              <span className="block text-2xl font-bold text-blue-600">
                AED 55,500
              </span>
              <span className="text-xs text-gray-400">This month</span>
            </div>
          </Card>
        </div>

        {/* Chart */}
        <Card className="p-6 mb-8 border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
            <h2 className="mb-2 text-lg font-semibold text-gray-800 md:mb-0">
              6-Month Rent Collection Trend
            </h2>
            {/* <div className="flex gap-2">
              <select
                className="px-2 py-1 text-sm bg-white border border-gray-200 rounded focus:ring-2 focus:ring-blue-200"
                value={selectedLine}
                onChange={(e) => setSelectedLine(e.target.value)}
              >
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select className="px-2 py-1 text-sm bg-white border border-gray-200 rounded focus:ring-2 focus:ring-blue-200">
                <option>Current Month</option>
              </select>
            </div> */}
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip /> 
              <Line
                type="monotone"
                dataKey="collected"
                name="Collected"
                stroke="#22c55e"
                strokeWidth={2}
                dot
              />
              <Line
                type="monotone"
                dataKey="pending"
                name="Pending"
                stroke="#eab308"
                strokeWidth={2}
                dot
              />
              <Line
                type="monotone"
                dataKey="overdue"
                name="Overdue"
                stroke="#ef4444"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Table */}
        <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Property Collection Details
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-700 bg-gray-100">
                  <th className="px-3 py-2 font-medium text-left">Property</th>
                  <th className="px-3 py-2 font-medium text-left">Unit</th>
                  <th className="px-3 py-2 font-medium text-left">Tenant</th>
                  <th className="px-3 py-2 font-medium text-left">
                    Rent Amount
                  </th>
                  <th className="px-3 py-2 font-medium text-left">Due Date</th>
                  <th className="px-3 py-2 font-medium text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-800">{row.property}</td>
                    <td className="px-3 py-2 text-gray-800">{row.unit}</td>
                    <td className="px-3 py-2 text-gray-800">{row.tenant}</td>
                    <td className="px-3 py-2 text-gray-800">{row.amount}</td>
                    <td className="px-3 py-2 text-gray-800">{row.due}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[row.status]
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RentCollectionMaster;
