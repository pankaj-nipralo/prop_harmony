import React from 'react';
import { Clock, DollarSign, CheckCircle, Home } from 'lucide-react';

const iconMap = {
  Clock,
  DollarSign,
  CheckCircle,
  Home
};

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.icon];
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <IconComponent className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
            <div className="text-xs text-gray-500">{stat.subtitle}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
