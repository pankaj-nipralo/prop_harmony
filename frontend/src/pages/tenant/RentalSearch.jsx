import React from 'react';
import { Search } from 'lucide-react';

const RentalSearch = () => {
  return (
    <div className="bg-transparent">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-3">
          <Search className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rental Search</h1>
            <p className="mt-1 text-gray-600">
              Find your next perfect rental property
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
        <p className="text-gray-600">
          Rental search functionality for tenants will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default RentalSearch;
