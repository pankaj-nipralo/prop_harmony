import React, { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import RentCollectionChart from "./RentCollectionChart";
import OccupancyRateChart from "./OccupancyRateChart";
import ActiveWorkOrdersTable from "./ActiveWorkOrdersTable";
import LeaseExpirationsTable from "./LeaseExpirationsTable";
import { generateDashboardData } from "@/data/propertyManager/dashboard/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DashboardMaster = () => {
  const [dashboardData, setDashboardData] = useState(generateDashboardData());
  const [selectedLandlord, setSelectedLandlord] = useState("all");
  const [filteredData, setFilteredData] = useState(dashboardData);

  // Get unique landlords from the data
  const landlords = ["all", ...new Set(dashboardData.maintenanceRequests.map(req => req.landlord))];

  // Filter data when landlord selection changes
  useEffect(() => {
    if (selectedLandlord === "all") {
      setFilteredData(dashboardData);
    } else {
      // Filter maintenance requests
      const filteredMaintenanceRequests = dashboardData.maintenanceRequests.filter(
        req => req.landlord === selectedLandlord
      );

      // Filter lease expirations
      const filteredLeaseExpirations = dashboardData.leaseExpirations.filter(
        lease => lease.landlord === selectedLandlord
      );

      // Filter recent activity
      const filteredRecentActivity = dashboardData.recentActivity.filter(activity => 
        activity.message.toLowerCase().includes(selectedLandlord.toLowerCase())
      );

      // Filter notifications
      const filteredNotifications = dashboardData.notifications.filter(notification => 
        notification.message.toLowerCase().includes(selectedLandlord.toLowerCase())
      );

      // Calculate filtered rent collection data based on the selected landlord's properties
      const landlordProperties = new Set(
        filteredMaintenanceRequests.map(req => req.property)
      );

      // Calculate rent collection data for the selected landlord's properties
      const filteredRentCollection = {
        months: dashboardData.rentCollection.months,
        collected: dashboardData.rentCollection.collected.map((amount, index) => {
          // Calculate a proportional amount based on the number of properties
          const propertyRatio = landlordProperties.size / dashboardData.totalProperties;
          return Math.round(amount * propertyRatio);
        }),
        pending: dashboardData.rentCollection.pending.map((amount, index) => {
          const propertyRatio = landlordProperties.size / dashboardData.totalProperties;
          return Math.round(amount * propertyRatio);
        }),
        overdue: dashboardData.rentCollection.overdue.map((amount, index) => {
          const propertyRatio = landlordProperties.size / dashboardData.totalProperties;
          return Math.round(amount * propertyRatio);
        })
      };

      // Calculate filtered occupancy rate based on the selected landlord's properties
      const propertyRatio = landlordProperties.size / dashboardData.totalProperties;
      const filteredOccupancyRate = Math.round(dashboardData.occupancyRate * propertyRatio);

      // Calculate filtered stats
      const filteredStats = {
        totalProperties: landlordProperties.size,
        occupiedUnits: Math.round(dashboardData.occupiedUnits * propertyRatio),
        occupancyRate: filteredOccupancyRate,
        activeWorkOrders: filteredMaintenanceRequests.length,
        inProgressOrders: filteredMaintenanceRequests.filter(req => req.status === "In Progress").length,
        pendingOrders: filteredMaintenanceRequests.filter(req => req.status === "Pending").length,
        completedOrders: Math.round(dashboardData.completedOrders * propertyRatio),
        upcomingRenewals: filteredLeaseExpirations.length
      };

      const filtered = {
        ...dashboardData,
        ...filteredStats,
        maintenanceRequests: filteredMaintenanceRequests,
        leaseExpirations: filteredLeaseExpirations,
        recentActivity: filteredRecentActivity,
        notifications: filteredNotifications,
        rentCollection: filteredRentCollection,
        occupancyRate: filteredOccupancyRate
      };

      setFilteredData(filtered);
    }
  }, [selectedLandlord, dashboardData]);

  return (
    <div className="min-h-screen">
      <div className="p-6">
        {/* Header */}
        <DashboardHeader />

        {/* Landlord Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 bg-gray-100 rounded-lg mb-6 shadow-sm">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Filter by Landlord:
          </label>

          <Select value={selectedLandlord} onValueChange={setSelectedLandlord}>
            <SelectTrigger className="w-full sm:w-[220px] bg-white border border-gray-300 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <SelectValue placeholder="Select landlord" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
              {landlords.map((landlord) => (
                <SelectItem
                  key={landlord}
                  value={landlord}
                  className="text-sm px-3 py-2 hover:bg-blue-50 cursor-pointer rounded-md"
                >
                  {landlord === "all" ? "All Landlords" : landlord}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <DashboardStats data={filteredData} />

        {/* Charts Row - Side by Side */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <RentCollectionChart data={filteredData} />
          <OccupancyRateChart data={filteredData} />
        </div>

        {/* Active Work Orders Table */}
        <div className="mb-8">
          <ActiveWorkOrdersTable data={filteredData} />
        </div>

        {/* Upcoming Lease Expirations Table */}
        <div>
          <LeaseExpirationsTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardMaster;
