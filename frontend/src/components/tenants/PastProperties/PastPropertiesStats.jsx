import React from 'react';
import { Building2, DollarSign, Star } from 'lucide-react';

const PastPropertiesStats = ({ stats }) => {
  const statsCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Building2,
      iconColor: "text-blue-500"
    },
    {
      title: "Total Rent Paid",
      value: stats.totalRentPaid,
      icon: DollarSign,
      iconColor: "text-green-500"
    },
    {
      title: "Avg Rating Given",
      value: stats.avgRatingGiven,
      icon: Star,
      iconColor: "text-yellow-500"
    },
    {
      title: "Avg Rating Received",
      value: stats.avgRatingReceived,
      icon: Star,
      iconColor: "text-yellow-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {statsCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-2">
                <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PastPropertiesStats;
