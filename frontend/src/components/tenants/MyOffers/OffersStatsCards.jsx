import React from 'react';
import { Clock, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

const OffersStatsCards = ({ offersData }) => {
  const statsConfig = [
    {
      key: 'applied',
      label: 'Applied',
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      key: 'inNegotiation',
      label: 'In Negotiation',
      icon: MessageSquare,
      color: 'text-orange-500'
    },
    {
      key: 'approved',
      label: 'Approved',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      key: 'rejected',
      label: 'Rejected',
      icon: XCircle,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div key={stat.key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <IconComponent className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{offersData[stat.key]}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OffersStatsCards;
