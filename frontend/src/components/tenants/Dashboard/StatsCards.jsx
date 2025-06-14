import React from 'react';
import { Clock, CheckCircle, Home } from 'lucide-react';
import DirhamSvg from '@/assets/Dirham';

const iconMap = {
  Clock,
  DollarSign: () => <DirhamSvg size={20} color1="#16a34a" />,
  CheckCircle,
  Home
};

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.icon];
        return (
          <div key={index} className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-3">
              {typeof IconComponent === 'function' ? <IconComponent /> : <IconComponent className={`w-5 h-5 ${stat.color}`} />}
            </div>
            <div className="mb-1 text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="mb-1 text-sm text-gray-600">{stat.title}</div>
            <div className="text-xs text-gray-500">{stat.subtitle}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
