import React from 'react';
import { Home } from 'lucide-react';

const Properties = () => {
  return (
    <div className="bg-transparent">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-3">
          <Home className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Property</h1>
            <p className="mt-1 text-gray-600">
              View details about your current rental property
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
        <p className="text-gray-600">
          Current property details and information will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default Properties;
