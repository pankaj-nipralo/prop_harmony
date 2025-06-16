import React from "react";
import { Building2, Star } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const PastPropertiesStats = ({ stats }) => {
  const statsCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Building2,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Rent Paid",
      value: `${stats.totalRentPaid}`,
      icon: () => { <DirhamSvg size={12} className="mb-1 mr-1" color1="" />},
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg Rating Given",
      value: stats.avgRatingGiven,
      icon: Star,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Avg Rating Received",
      value: stats.avgRatingReceived,
      icon: Star,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="p-5 transition-shadow bg-white border-0 shadow-sm rounded-2xl hover:shadow-md mb-7"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-2 rounded-full ${stat.bgColor} ${stat.iconColor}`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PastPropertiesStats;
