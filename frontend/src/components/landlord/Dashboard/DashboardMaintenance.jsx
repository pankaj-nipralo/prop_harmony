import React from 'react'
import { Wrench, CheckCircle, Clock, AlertCircle, ArrowRight, User, Calendar, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { maintenanceData } from "@/data/landlord/maintenance/data";
import { Link } from "react-router-dom";

// Get the maintenance list directly from maintenanceData
const maintenanceList = maintenanceData[0]?.maintenanceList || [];

// Calculate stats
const totalRequests = maintenanceList.length;
const openRequests = maintenanceList.filter(item => item.status === "Open").length;
const inProgressRequests = maintenanceList.filter(item => item.status === "In Progress").length;
const completedRequests = maintenanceList.filter(item => item.status === "Completed").length;

const maintenanceStats = [
  {
    label: "Total Requests",
    value: totalRequests,
    icon: <Wrench className="w-5 h-5 text-gray-400" />,
    color: "border-gray-200",
  },
  {
    label: "Open",
    value: openRequests,
    icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
    color: "border-amber-200",
  },
  {
    label: "In Progress",
    value: inProgressRequests,
    icon: <Clock className="w-5 h-5 text-blue-500" />,
    color: "border-blue-200",
  },
  {
    label: "Completed",
    value: completedRequests,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    color: "border-green-200",
  },
];

const getPriorityStyle = (priority) => {
  switch (priority) {
    case 'High':
      return 'text-red-800 bg-red-100';
    case 'Medium':
      return 'text-yellow-800 bg-yellow-100';
    case 'Low':
      return 'text-green-800 bg-green-100';
    default:
      return 'text-gray-800 bg-gray-100';
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Open':
      return 'text-red-800 bg-red-100';
    case 'In Progress':
      return 'text-blue-800 bg-blue-100';
    case 'Completed':
      return 'text-green-800 bg-green-100';
    case 'Pending':
      return 'text-yellow-800 bg-yellow-100';
    default:
      return 'text-gray-800 bg-gray-100';
  }
};

const DashboardMaintenance = () => {
  // Get the first 3 maintenance requests
  const recentRequests = maintenanceList.slice(0, 3);

  console.log('Maintenance List:', maintenanceList); // Debug log
  console.log('Recent Requests:', recentRequests); // Debug log

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
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-gray-400" />
            <CardTitle className="text-lg font-semibold text-gray-800">Recent Maintenance Requests</CardTitle>
          </div>
          <Link 
            to="/landlord/maintenance" 
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent>
          {recentRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Request
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Property
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors duration-150`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.title}
                          </div>
                          <div className="max-w-xs text-sm text-gray-500 truncate">
                            {request.description}
                          </div>
                          <div className="flex items-center mt-1">
                            <User className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {request.tenantName}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">
                            {request.propertyName}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityStyle(request.priority)}`}>
                          {request.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(request.status)}`}>
                          {request.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {request.requestedDate}
                          </span>
                        </div>
                        {request.estimatedCost && (
                          <div className="flex items-center mt-1">
                            <DollarSign className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {request.estimatedCost}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400 text-base">
              No maintenance requests found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardMaintenance