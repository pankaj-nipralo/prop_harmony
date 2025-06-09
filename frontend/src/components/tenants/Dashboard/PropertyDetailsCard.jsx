import React from "react";
import { Building } from "lucide-react";

const PropertyDetailsCard = ({ currentPropertyStatus, landlordInfo }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            My Property Details
          </h2>
        </div>
        <p className="mb-6 text-sm text-gray-600">
          Information about your current rental property
        </p>

        <div className="flex items-center justify-around py-12 text-center">
          <div className="">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {currentPropertyStatus.message}
            </h3>
            <p className="mb-8 text-gray-600">
              {currentPropertyStatus.description}
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-50">
            <h4 className="mb-4 font-semibold text-gray-900">
              Landlord Information
            </h4>
            <div className="space-y-2 text-left">
              <p className="text-sm text-gray-600">{landlordInfo.name}</p>
              <p className="text-sm text-gray-600">{landlordInfo.phone}</p>
              <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                {landlordInfo.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsCard;
