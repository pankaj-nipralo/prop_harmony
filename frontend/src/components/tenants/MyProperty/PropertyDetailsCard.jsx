import React from 'react';
import { Home, MapPin, User, Phone, Mail, Calendar, DollarSign, AlertCircle } from 'lucide-react';

const PropertyDetailsCard = ({ 
  property, 
  leaseInfo, 
  contactInfo,
  onContactLandlord,
  onContactManager 
}) => {
  return (
    <div className="space-y-6">
      {/* Current Property Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Current Property</h2>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              {property.status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{property.address}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{property.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-medium text-gray-900">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="font-medium text-gray-900">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-medium text-gray-900">{property.area}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Property Features</h4>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Lease Duration */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">Lease Duration</h4>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{leaseInfo.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${leaseInfo.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Start Date</span>
                    <div className="font-medium text-gray-900">{leaseInfo.startDate}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">End Date</span>
                    <div className="font-medium text-gray-900">{leaseInfo.endDate}</div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <div className="text-2xl font-bold text-gray-900">{leaseInfo.daysRemaining}</div>
                  <div className="text-sm text-gray-600">Days Remaining</div>
                </div>
                {leaseInfo.renewalNotice && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-xs text-yellow-800">{leaseInfo.renewalNotice}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Rent Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">Rent Information</h4>
                </div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-900">{leaseInfo.monthlyRent}</div>
                  <div className="text-sm text-gray-600">Monthly Rent</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date</span>
                    <span className="font-medium text-gray-900">{leaseInfo.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit Paid</span>
                    <span className="font-medium text-gray-900">{leaseInfo.depositPaid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Payment</span>
                    <span className="font-medium text-gray-900">{leaseInfo.nextPaymentDate}</span>
                  </div>
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                  Pay Rent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Landlord</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{contactInfo.landlord.name}</span>
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
                className="w-full mt-3 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Contact Landlord
              </button>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Property Manager</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{contactInfo.propertyManager.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{contactInfo.propertyManager.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{contactInfo.propertyManager.email}</span>
                </div>
              </div>
              <button 
                onClick={onContactManager}
                className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
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
