import React from 'react';
import { CheckCircle } from 'lucide-react';

const ManagerResponsibilities = ({ responsibilities }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Manager Responsibilities</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          {responsibilities.leftColumn.map((responsibility) => (
            <div key={responsibility.id} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{responsibility.text}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {responsibilities.rightColumn.map((responsibility) => (
            <div key={responsibility.id} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{responsibility.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerResponsibilities;
