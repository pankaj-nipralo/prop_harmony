import React from 'react';
import { Building } from 'lucide-react';

const PropertyDetailsCard = ({ currentPropertyStatus, landlordInfo }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">My Property Details</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">Information about your current rental property</p>
        
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentPropertyStatus.message}</h3>
          <p className="text-gray-600 mb-8">{currentPropertyStatus.description}</p>
          
          <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto">
            <h4 className="font-semibold text-gray-900 mb-4">Landlord Information</h4>
            <div className="text-left space-y-2">
              <p className="text-sm text-gray-600">{landlordInfo.name}</p>
              <p className="text-sm text-gray-600">{landlordInfo.phone}</p>
              <p className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">{landlordInfo.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsCard;
