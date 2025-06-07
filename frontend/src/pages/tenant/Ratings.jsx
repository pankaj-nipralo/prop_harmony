import React from 'react';
import { Star } from 'lucide-react';

const Ratings = () => {
  return (
    <div className="bg-transparent">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-3">
          <Star className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ratings</h1>
            <p className="mt-1 text-gray-600">
              Rate your property and landlord experience
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
        <p className="text-gray-600">
          Property and landlord rating system will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default Ratings;
