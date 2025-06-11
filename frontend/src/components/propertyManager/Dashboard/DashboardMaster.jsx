import React, { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";
import DashboardRecentActivity from "./DashboardRecentActivity";
import DashboardQuickActions from "./DashboardQuickActions";
import DashboardNotifications from "./DashboardNotifications";

const DashboardMaster = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Simulate data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate realistic property management data
      const data = generateDashboardData();
      setDashboardData(data);
      setIsLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6 mx-auto max-w-7xl">
        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <DashboardStats data={dashboardData} />

        {/* Charts and Quick Actions Row */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardCharts data={dashboardData} />
          </div>
          <div>
            <DashboardQuickActions />
          </div>
        </div>

        {/* Recent Activity and Notifications Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DashboardRecentActivity data={dashboardData} />
          <DashboardNotifications data={dashboardData} />
        </div>
      </div>
    </div>
  );
};
