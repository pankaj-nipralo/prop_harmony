import { Search } from "lucide-react";
import React from "react";

const RentalHeader = () => {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      <div className="flex items-center gap-3">
        <Search className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Rental Search
          </h1>
          <p className="mt-1 text-gray-600">
            Search and discover available rental properties
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentalHeader;
