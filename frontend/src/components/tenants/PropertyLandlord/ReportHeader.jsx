import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ReportHeader = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'submit', label: 'Submit New Report' },
    { id: 'history', label: 'Report History' }
  ];

  return (
    <div className="space-y-4">
      {/* Main Header */}
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900">Report Landlord</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ReportHeader;
