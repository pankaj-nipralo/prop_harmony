import React, { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import RentCollectionChart from "./RentCollectionChart";
import OccupancyRateChart from "./OccupancyRateChart";
import ActiveWorkOrdersTable from "./ActiveWorkOrdersTable";
import LeaseExpirationsTable from "./LeaseExpirationsTable";
import { generateDashboardData } from "@/data/propertyManager/dashboard/data";

const DashboardMaster = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Simulate data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      // Generate realistic property management data
      const data = generateDashboardData();
      setDashboardData(data);
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              Loading Dashboard
            </h2>
            <p className="text-gray-500">
              Fetching your property management data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="p-6">
        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <DashboardStats data={dashboardData} />

        {/* Charts Row - Side by Side */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <RentCollectionChart data={dashboardData} />
          <OccupancyRateChart data={dashboardData} />
        </div>

        {/* Active Work Orders Table */}
        <div className="mb-8">
          <ActiveWorkOrdersTable data={dashboardData} />
        </div>

        {/* Upcoming Lease Expirations Table */}
        <div>
          <LeaseExpirationsTable data={dashboardData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardMaster;
