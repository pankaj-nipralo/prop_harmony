import React from 'react'
import { Wrench, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const maintenanceStats = [
  {
    label: "Total Requests",
    value: 0,
    icon: <Wrench className="w-5 h-5 text-gray-400" />,
    color: "border-gray-200",
  },
  {
    label: "Open",
    value: 0,
    icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
    color: "border-amber-200",
  },
  {
    label: "In Progress",
    value: 0,
    icon: <Clock className="w-5 h-5 text-blue-500" />,
    color: "border-blue-200",
  },
  {
    label: "Completed",
    value: 0,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    color: "border-green-200",
  },
];

const DashboardMaintenance = () => {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
        {maintenanceStats.map((stat) => (
          <Card key={stat.label} className={`flex flex-col border-0 shadow-md bg-white ${stat.color}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                {stat.label}
                {stat.icon}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Maintenance Requests Table */}
      <Card className="bg-white border-0 shadow-md">
        <CardHeader className="pb-2 flex flex-row items-center gap-2">
          <Wrench className="w-5 h-5 text-gray-400" />
          <CardTitle className="text-lg font-semibold text-gray-800">All Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-gray-400 text-base">
            No maintenance requests found
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardMaintenance