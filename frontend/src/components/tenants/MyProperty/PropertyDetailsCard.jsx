import React from "react";
import {
  Home,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const PropertyDetailsCard = ({
  property,
  leaseInfo,
  contactInfo,
  onContactLandlord,
  onContactManager,
}) => {
  return (
    <div className="space-y-6">
      {/* Current Property Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Current Property
              </h2>
            </div>
            <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
              {property.status}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {property.name}
              </h3>
              <div className="flex items-center mb-4 text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{property.address}</span>
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">
                    {property.type}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-medium text-gray-900">
                    {property.bedrooms}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="font-medium text-gray-900">
                    {property.bathrooms}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-medium text-gray-900">
                    {property.area}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-900">
                  Property Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs text-blue-700 rounded-md bg-blue-50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Lease Duration */}
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">
                    Lease Duration
                  </h4>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span>{leaseInfo.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 transition-all duration-300 bg-blue-500 rounded-full"
                      style={{ width: `${leaseInfo.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Start Date</span>
                    <div className="font-medium text-gray-900">
                      {leaseInfo.startDate}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">End Date</span>
                    <div className="font-medium text-gray-900">
                      {leaseInfo.endDate}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {leaseInfo.daysRemaining}
                  </div>
                  <div className="text-sm text-gray-600">Days Remaining</div>
                </div>
                {leaseInfo.renewalNotice && (
                  <div className="p-2 mt-3 border border-yellow-200 rounded-md bg-yellow-50">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-xs text-yellow-800">
                        {leaseInfo.renewalNotice}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Rent Information */}
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">
                    Rent Information
                  </h4>
                </div>
                <div className="mb-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {leaseInfo.monthlyRent}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Rent</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date</span>
                    <span className="font-medium text-gray-900">
                      {leaseInfo.dueDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit Paid</span>
                    <span className="font-medium text-gray-900">
                      {leaseInfo.depositPaid}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Payment</span>
                    <span className="font-medium text-gray-900">
                      {leaseInfo.nextPaymentDate}
                    </span>
                  </div>
                </div>
                <Link
                  to={"/tenants/payemnts"}
                  
                >
                  <button className="w-full px-4 py-2 mt-3 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600">Pay Rent</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Contact Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">Landlord</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {contactInfo.landlord.name}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{contactInfo.landlord.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{contactInfo.landlord.email}</span>
                </div>
              </div>
              <button
                onClick={onContactLandlord}
                className="w-full px-4 py-2 mt-3 text-sm font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Contact Landlord
              </button>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-gray-900">
                Property Manager
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {contactInfo.propertyManager.name}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {contactInfo.propertyManager.phone}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {contactInfo.propertyManager.email}
                  </span>
                </div>
              </div>
              <button
                onClick={onContactManager}
                className="w-full px-4 py-2 mt-3 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Contact Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsCard;
