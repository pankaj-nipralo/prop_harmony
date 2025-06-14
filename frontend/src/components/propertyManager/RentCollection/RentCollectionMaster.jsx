import React, { useState, useMemo } from "react";
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

const tableData = [
  {
    landlord: "Pankaj Gupta",
    property: "Sunset Apartments",
    unit: "Unit 101",
    tenant: "John Smith",
    amount: "2,500",
    due: "1/1/2025",
    status: "collected",
  },
  {
    landlord: "Pankaj Gupta",
    property: "Marina View",
    unit: "Unit 205",
    tenant: "Sarah Johnson",
    amount: "3,200",
    due: "1/1/2025",
    status: "pending",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Central Plaza",
    unit: "Unit 304",
    tenant: "Mike Wilson",
    amount: "2,800",
    due: "1/1/2025",
    status: "overdue",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 102",
    tenant: "Lisa Brown",
    amount: "2,400",
    due: "1/1/2025",
    status: "collected",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Bay View",
    unit: "Unit 501",
    tenant: "David Lee",
    amount: "3,500",
    due: "1/1/2025",
    status: "pending",
  },
  // Additional data for Pankaj Gupta
  {
    landlord: "Pankaj Gupta",
    property: "Sunset Apartments",
    unit: "Unit 102",
    tenant: "Emma Davis",
    amount: "2,600",
    due: "2/1/2025",
    status: "collected",
  },
  {
    landlord: "Pankaj Gupta",
    property: "Marina View",
    unit: "Unit 206",
    tenant: "James Wilson",
    amount: "3,300",
    due: "2/1/2025",
    status: "pending",
  },
  {
    landlord: "Pankaj Gupta",
    property: "Sunset Apartments",
    unit: "Unit 103",
    tenant: "Sophie Brown",
    amount: "2,700",
    due: "3/1/2025",
    status: "collected",
  },
  // Additional data for Gaurav Kanchan
  {
    landlord: "Gaurav Kanchan",
    property: "Central Plaza",
    unit: "Unit 305",
    tenant: "Alex Turner",
    amount: "2,900",
    due: "2/1/2025",
    status: "overdue",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Bay View",
    unit: "Unit 502",
    tenant: "Maria Garcia",
    amount: "3,600",
    due: "3/1/2025",
    status: "collected",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Central Plaza",
    unit: "Unit 306",
    tenant: "Tom Harris",
    amount: "2,850",
    due: "4/1/2025",
    status: "pending",
  },
  // Additional data for Uzair Sayyed
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 103",
    tenant: "Rachel Green",
    amount: "2,450",
    due: "2/1/2025",
    status: "collected",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 104",
    tenant: "Chris Martin",
    amount: "2,550",
    due: "3/1/2025",
    status: "overdue",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 105",
    tenant: "Emma Watson",
    amount: "2,650",
    due: "4/1/2025",
    status: "pending",
  },
  // More data for future months
  {
    landlord: "Pankaj Gupta",
    property: "Sunset Apartments",
    unit: "Unit 104",
    tenant: "Daniel Lee",
    amount: "2,800",
    due: "5/1/2025",
    status: "collected",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Bay View",
    unit: "Unit 503",
    tenant: "Sarah Parker",
    amount: "3,700",
    due: "5/1/2025",
    status: "pending",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 106",
    tenant: "Michael Brown",
    amount: "2,750",
    due: "5/1/2025",
    status: "overdue",
  },
  {
    landlord: "Pankaj Gupta",
    property: "Marina View",
    unit: "Unit 207",
    tenant: "Jessica White",
    amount: "3,400",
    due: "6/1/2025",
    status: "collected",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Central Plaza",
    unit: "Unit 307",
    tenant: "David Miller",
    amount: "2,950",
    due: "6/1/2025",
    status: "pending",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 107",
    tenant: "Emily Davis",
    amount: "2,850",
    due: "6/1/2025",
    status: "collected",
  }
];

// Get unique landlords for filter
const uniqueLandlords = [...new Set(tableData.map(item => item.landlord))];

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
  const [selectedLandlord, setSelectedLandlord] = useState("all");

  // Filter table data based on selected landlord
  const filteredTableData = useMemo(() => {
    return selectedLandlord === "all" 
      ? tableData 
      : tableData.filter(item => item.landlord === selectedLandlord);
  }, [selectedLandlord]);

  // Calculate summary stats from filtered data
  const summaryStats = useMemo(() => {
    const stats = {
      totalCollected: 0,
      totalPending: 0,
      totalOverdue: 0,
      collectedCount: 0,
      pendingCount: 0,
      overdueCount: 0,
    };

    filteredTableData.forEach(item => {
      const amount = parseInt(item.amount.replace(/,/g, ''));
      if (item.status === 'collected') {
        stats.totalCollected += amount;
        stats.collectedCount++;
      } else if (item.status === 'pending') {
        stats.totalPending += amount;
        stats.pendingCount++;
      } else if (item.status === 'overdue') {
        stats.totalOverdue += amount;
        stats.overdueCount++;
      }
    });

    const totalExpected = stats.totalCollected + stats.totalPending + stats.totalOverdue;
    const collectionRate = totalExpected > 0 
      ? Math.round((stats.totalCollected / totalExpected) * 100) 
      : 0;

    return {
      ...stats,
      totalExpected,
      collectionRate
    };
  }, [filteredTableData]);

  // Generate chart data from filtered data
  const chartData = useMemo(() => {
    const months = [
      "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025",
      // "Jul 2025", "Aug 2025", "Sept 2025", "Oct 2025", "Nov 2025", "Dec 2025"
    ];

    return months.map(month => {
      const monthData = filteredTableData.filter(item => {
        const dueDate = new Date(item.due);
        const dueMonth = dueDate.toLocaleString('default', { month: 'short' }) + ' ' + dueDate.getFullYear();
        return dueMonth === month;
      });

      return {
        month,
        collected: monthData.filter(item => item.status === 'collected')
          .reduce((sum, item) => sum + parseInt(item.amount.replace(/,/g, '')), 0),
        pending: monthData.filter(item => item.status === 'pending')
          .reduce((sum, item) => sum + parseInt(item.amount.replace(/,/g, '')), 0),
        overdue: monthData.filter(item => item.status === 'overdue')
          .reduce((sum, item) => sum + parseInt(item.amount.replace(/,/g, '')), 0),
      };
    });
  }, [filteredTableData]);

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
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-200"
              value={selectedLandlord}
              onChange={(e) => setSelectedLandlord(e.target.value)}
            >
              <option value="all">All Landlords</option>
              {uniqueLandlords.map((landlord) => (
                <option key={landlord} value={landlord}>
                  {landlord}
                </option>
              ))}
            </select>
            <Button className="flex items-center gap-2 text-white bg-blue-500 myButton hover:bg-blue-600">
              <FileDown className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <div>
              <span className="text-sm text-gray-500">Total Collected</span>
              <span className="block text-2xl font-bold text-green-600">
                AED {summaryStats.totalCollected.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">{summaryStats.collectionRate}% collection rate</span>
            </div>
          </Card>
          <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <div>
              <span className="text-sm text-gray-500">Pending</span>
              <span className="block text-2xl font-bold text-yellow-600">
                AED {summaryStats.totalPending.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">{summaryStats.pendingCount} units</span>
            </div>
          </Card>
          <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <div>
              <span className="text-sm text-gray-500">Overdue</span>
              <span className="block text-2xl font-bold text-red-600">
                AED {summaryStats.totalOverdue.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">{summaryStats.overdueCount} units</span>
            </div>
          </Card>
          <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <div>
              <span className="text-sm text-gray-500">Total Expected</span>
              <span className="block text-2xl font-bold text-blue-600">
                AED {summaryStats.totalExpected.toLocaleString()}
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
                  <th className="px-3 py-2 font-medium text-left">Landlord</th>
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
                {filteredTableData.map((row, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-800">{row.landlord}</td>
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
