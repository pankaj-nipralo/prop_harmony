import React from "react";
import PropertyDetailsCard from "./PropertyDetailsCard";
import StatsCards from "./StatsCards";
import PaymentsTable from "./PaymentsTable";
import MaintenanceTable from "./MaintenanceTable";

// Dummy data for Overview
const dummyPropertyStatus = {
  message: "Active Lease",
  description:
    "You are currently renting 2BHK Apartment, Downtown Dubai. Lease ends: 30 Dec 2025.",
};

const dummyLandlordInfo = {
  name: "Ahmed Al Farsi",
  phone: "+971 50 123 4567",
  email: "ahmed.alfarsi@email.com",
};

const dummyStats = [
  {
    icon: "Home",
    value: "2BHK",
    title: "Property Type",
    subtitle: "Downtown Dubai",
    color: "text-blue-500",
  },
  {
    icon: "DollarSign",
    value: " 80,000",
    title: "Annual Rent",
    subtitle: "Paid in 4 cheques",
    color: "text-green-500",
  },
  {
    icon: "Clock",
    value: "6",
    title: "Months Left",
    subtitle: "Lease Duration",
    color: "text-yellow-500",
  },
  {
    icon: "CheckCircle",
    value: " 20,000",
    title: "Next Payment",
    subtitle: "Due: 30 Jun 2025",
    color: "text-purple-500",
  },
];

const dummyPayments = [
  {
    date: "2025-03-30",
    amount: "20,000",
    status: "Paid",
    statusColor: "bg-green-100 text-green-700",
    method: "Bank Transfer",
  },
  {
    date: "2024-12-30",
    amount: "20,000",
    status: "Paid",
    statusColor: "bg-green-100 text-green-700",
    method: "Credit Card",
  },
  {
    date: "2024-09-30",
    amount: "20,000",
    status: "Paid",
    statusColor: "bg-green-100 text-green-700",
    method: "Bank Transfer",
  },
];

const dummyMaintenance = [
  {
    date: "2025-05-10",
    issue: "AC not cooling",
    status: "Resolved",
    statusColor: "bg-green-100 text-green-700",
    priority: "High",
  },
  {
    date: "2025-04-15",
    issue: "Leaky faucet",
    status: "In Progress",
    statusColor: "bg-yellow-100 text-yellow-700",
    priority: "Medium",
  },
  {
    date: "2025-03-20",
    issue: "Broken window lock",
    status: "Pending",
    statusColor: "bg-red-100 text-red-700",
    priority: "Low",
  },
];

const OverviewTab = ({ propertyData }) => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <StatsCards stats={dummyStats} />

      {/* My Property Details */}
      <PropertyDetailsCard
        currentPropertyStatus={dummyPropertyStatus}
        landlordInfo={dummyLandlordInfo}
        propertyData={propertyData}
      />

      {/* Recent Rent Payments */}
      <PaymentsTable payments={dummyPayments} />

      {/* Recent Maintenance Requests */}
      <MaintenanceTable maintenanceRequests={dummyMaintenance} />
    </div>
  );
};

export default OverviewTab;
