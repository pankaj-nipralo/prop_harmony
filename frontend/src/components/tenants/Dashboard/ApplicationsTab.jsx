import React from 'react';
import { FileText, Building, MapPin, DollarSign, Clock, MessageCircle } from 'lucide-react';

const ApplicationsTab = ({ applications, applicationFilters }) => {
  return (
    <div className="space-y-8">
      {/* Applications Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-900">My Property Applications</h2>
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
          {applicationFilters.map((filter, index) => (
            <option key={index}>{filter}</option>
          ))}
        </select>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {applications.map((application) => (
          <div key={application.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{application.name}</h3>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{application.address}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{application.rent}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${application.statusColor}`}>
                  {application.status}
                </span>
                <div className="flex items-center text-gray-500 mt-2">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="text-xs">Applied: {application.appliedDate}</span>
                </div>
              </div>
            </div>

            {application.counterOffer && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Counter Offer: {application.counterOffer}</span>
                </div>
              </div>
            )}

            {application.status === 'In Negotiation' && (
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Open Negotiations</span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {application.status === 'Counter Offer' && (
                <>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                    Accept Offer
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Decline
                  </button>
                </>
              )}
              {application.status === 'In Negotiation' && (
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Continue Chat
                </button>
              )}
              {application.status === 'Pending Review' && (
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg cursor-not-allowed text-sm font-medium">
                  Awaiting Response
                </button>
              )}
              {application.status === 'Approved' && (
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                  View Contract
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsTab;
