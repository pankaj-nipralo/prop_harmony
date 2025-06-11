import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ClipboardList, Calendar, Clock } from "lucide-react";

const DashboardStats = ({ data }) => {
  const stats = [
    {
      title: "Total Properties Managed",
      value: data.totalProperties,
      subtitle: `Occupancy Rate: ${data.occupancyRate}%`,
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      bgColor: "bg-blue-100/50",
    },
    {
      title: "Active Work Orders",
      value: data.activeWorkOrders,
      subtitle: `${data.inProgressOrders} in progress, ${data.pendingOrders} pending`,
      icon: <ClipboardList className="w-5 h-5 text-amber-600" />,
      bgColor: "bg-amber-100/50",
    },
    {
      title: "Upcoming Lease Renewals",
      value: data.upcomingRenewals,
      subtitle: "Within the next 30 days",
      icon: <Calendar className="w-5 h-5 text-green-600" />,
      bgColor: "bg-green-100/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="transition-all duration-300 bg-white border-0 shadow-lg hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {stat.value}
            </div>
            <p className="mt-1 text-xs text-gray-500">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats
