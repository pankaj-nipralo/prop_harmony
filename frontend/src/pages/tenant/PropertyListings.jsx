import React from 'react';
import { History } from 'lucide-react';

const PropertyListings = () => {
  return (
    <div className="bg-transparent">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-3">
          <History className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Past Properties</h1>
            <p className="mt-1 text-gray-600">
              View your rental history and past properties
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
        <p className="text-gray-600">
          Your rental history and past properties will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default PropertyListings;
