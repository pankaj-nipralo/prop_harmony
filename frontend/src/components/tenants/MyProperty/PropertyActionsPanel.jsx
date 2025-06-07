import React from 'react';
import { CreditCard, Wrench, Eye, MessageCircle, RefreshCw, AlertTriangle } from 'lucide-react';

const iconMap = {
  CreditCard,
  Wrench,
  Eye,
  MessageCircle,
  RefreshCw,
  AlertTriangle
};

const PropertyActionsPanel = ({ actions, onActionClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => {
            const IconComponent = iconMap[action.icon];
            return (
              <button
                key={action.id}
                onClick={() => onActionClick(action.route)}
                className={`p-4 rounded-lg text-white transition-colors text-left ${action.color}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{action.title}</span>
                </div>
                <p className="text-sm opacity-90">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyActionsPanel;
