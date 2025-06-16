import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileText, Home, Wrench } from "lucide-react";
import { dashboardData } from "@/data/landlord/dashboard/data";
import DirhamSvg from "@/assets/Dirham";

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {/* Property Card */}
      <Card className="transition-all duration-300 bg-white border-0 shadow-lg hover:shadow-xl hover:border-blue-500/20">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Properties
          </CardTitle>
          <div className="p-2 rounded-lg bg-blue-100/50">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-800">
            {dashboardData.totalProperties}
          </div>
          <p className="mt-1 text-xs text-gray-500">Total Units</p>
        </CardContent>
      </Card>

      {/* Income Card */}
      <Card className="transition-all duration-300 bg-white border-0 shadow-lg hover:shadow-xl hover:border-green-500/20">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm font-medium text-gray-500">
            Monthly Income
          </CardTitle>
          <div className="p-2 rounded-lg bg-green-100/50">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="gap-2 text-2xl font-bold text-gray-800 ">
            <DirhamSvg size={18} className="mb-1.5 mr-2" />
             {dashboardData.monthlyIncome.toLocaleString()}
          </div>
          <p className="flex items-center mt-1 text-xs font-medium text-green-500">
            <span className="inline-block mr-1">↑</span>
            {dashboardData.incomeChange}% vs last month
          </p>
        </CardContent>
      </Card>

      {/* Occupancy Card */}
      <Card className="transition-all duration-300 bg-white border-0 shadow-lg hover:shadow-xl hover:border-purple-500/20">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm font-medium text-gray-500">
            Occupancy Rate
          </CardTitle>
          <div className="p-2 rounded-lg bg-purple-100/50">
            <Home className="w-5 h-5 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-800">
            {dashboardData.occupancyRate}%
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-purple-600 h-1.5 rounded-full"
              style={{ width: `${dashboardData.occupancyRate}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {dashboardData.occupiedUnits} occupied of {dashboardData.totalUnits}
          </p>
        </CardContent>
      </Card>

      {/* Maintenance Card */}
      <Card className="transition-all duration-300 bg-white border-0 shadow-lg hover:shadow-xl hover:border-yellow-500/20">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm font-medium text-gray-500">
            Maintenance Requests
          </CardTitle>
          <div className="p-2 rounded-lg bg-yellow-100/50">
            <Wrench className="w-5 h-5 text-yellow-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-800">
            {dashboardData.maintenanceRequests}
          </div>
          <div className="flex items-center mt-1">
            <span className="mr-2 text-xs font-medium text-green-500">
              {dashboardData.resolvedRequests} resolved
            </span>
            <span className="text-xs font-medium text-amber-500">
              {dashboardData.pendingRequests} pending
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
