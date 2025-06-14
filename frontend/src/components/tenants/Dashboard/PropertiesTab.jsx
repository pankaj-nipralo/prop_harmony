import React from "react";
import {
  Building,
  FileText,
  MapPin,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DirhamSvg from "@/assets/Dirham";

const PropertiesTab = ({ propertyData }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* My Properties Header */}
      <div className="flex items-center gap-2">
        <Building className="w-6 h-6 text-gray-600" />
        <h2 className="text-2xl font-semibold text-gray-900">My Properties</h2>
      </div>

      {/* Property Tabs */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <Building className="w-4 h-4" />
          Current Property
        </button>
        <button
          onClick={() => navigate("/tenants/past-properties")}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <FileText className="w-4 h-4" />
          Past Properties
        </button>
      </div>

      {/* Current Property Details */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              Current Property Details
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h4 className="mb-3 text-lg font-semibold text-gray-900">
                {propertyData.name}
              </h4>
              <div className="flex items-center mb-4 text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{propertyData.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-1 mb-2 text-green-600">
                    {/* <DirhamSvg size={15} color1="" /> */}
                    <span className="text-sm font-medium">Monthly Rent</span>
                  </div>
                  <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
                    <DirhamSvg size={15} color1="" />
                    {propertyData.monthlyRent}
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2 text-blue-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Lease Period</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {propertyData.leaseStart} - {propertyData.leaseEnd}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-gray-600" />
                <h4 className="font-semibold text-gray-900">
                  Property Manager
                </h4>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-gray-900">
                    {propertyData.propertyManager.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {propertyData.propertyManager.title}
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-3 h-3 mr-2" />
                  <span className="text-sm">
                    {propertyData.propertyManager.phone}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-3 h-3 mr-2" />
                  <span className="text-sm">
                    {propertyData.propertyManager.email}
                  </span>
                </div>
              </div>
              <div className="p-3 mt-4 text-xs text-blue-600 rounded bg-blue-50">
                <strong>Note:</strong> All non-escalation issues to be
                coordinated via the assigned manager
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesTab;
