import React, { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import RentCollectionChart from "./RentCollectionChart";
import OccupancyRateChart from "./OccupancyRateChart";
import ActiveWorkOrdersTable from "./ActiveWorkOrdersTable";
import LeaseExpirationsTable from "./LeaseExpirationsTable";
import { generateDashboardData } from "@/data/propertyManager/dashboard/data";

const DashboardMaster = () => { 
  const [dashboardData, setDashboardData] = useState(generateDashboardData());

  // Simulate data loading 

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
