import React from "react";
import { Building, Mail, Phone, User } from "lucide-react";

const PropertyDetailsCard = ({
  currentPropertyStatus,
  landlordInfo,
  propertyData,
}) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Building className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            My Property Details
          </h2>
        </div>
        <p className="mb-3 text-sm text-gray-600">
          Information about your current rental property
        </p>

        <div className="grid gap-4 py-4 md:grid-cols-3">
          {/* Property Status */}
          <div className="w-full p-6 bg-gray-100 rounded-lg shadow-sm">
            {/* Title */}
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Oakwood Apartments
            </h3>

            {/* Address */}
            <p className="mb-4 text-sm text-gray-600">
              123 Main Street, Apt 4B, San Francisco, CA 94107
            </p>

            {/* Info Section */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Monthly Rent */}
              <div>
                <p className="text-xs text-gray-500">Monthly Rent</p>
                <p className="text-base font-semibold text-gray-900">
                  AED 1,45
                </p>
              </div>

              {/* Lease Status */}
              <div className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                Active Lease
              </div>
            </div>
          </div>

          {/* Landlord Information */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="mb-3 font-semibold text-center text-gray-900 text-md">
              Landlord Information
            </h4>
            <div className="space-y-1 text-sm text-left text-gray-600">
              <p>{landlordInfo.name}</p>
              <p>{landlordInfo.phone}</p>
              <p className="text-blue-500 cursor-pointer hover:text-blue-600">
                {landlordInfo.email}
              </p>
            </div>
          </div>

          {/* Property Manager */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-gray-600" />
              <h4 className="font-semibold text-gray-900 text-md">
                Property Manager
              </h4>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <div className="font-medium text-gray-900">
                  {propertyData.propertyManager.name}
                </div>
                <div className="text-sm text-gray-600">
                  {propertyData.propertyManager.title}
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2 text-gray-500" />
                <span>{propertyData.propertyManager.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-3 h-3 mr-2 text-gray-500" />
                <span>{propertyData.propertyManager.email}</span>
              </div>
            </div>
            <div className="p-3 mt-4 text-xs text-blue-700 rounded bg-blue-50">
              <strong>Note:</strong> All non-escalation issues to be coordinated
              via the assigned manager.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsCard;
