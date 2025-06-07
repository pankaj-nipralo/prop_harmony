import React from 'react';
import { Clock, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

const iconMap = {
  Clock,
  MessageSquare,
  CheckCircle,
  XCircle
};

const OffersTable = ({ 
  applications, 
  tableHeaders, 
  statusConfigurations,
  onAcceptOffer,
  onRejectOffer,
  onViewApplication,
  onViewDetails,
  onViewMessages
}) => {
  const getStatusIcon = (status) => {
    const config = statusConfigurations[status];
    if (!config) return <Clock className="w-4 h-4 text-gray-500" />;
    
    const IconComponent = iconMap[config.icon];
    return <IconComponent className={`w-4 h-4 ${config.color}`} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">All Applications</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {tableHeaders.map((header, index) => (
                  <th key={index} className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{application.property}</div>
                      <div className="text-sm text-gray-500">{application.address}</div>
                      {application.originalAmount && (
                        <div className="text-sm text-blue-600">Counter: {application.offerAmount}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{application.offerAmount}</div>
                    {application.originalAmount && (
                      <div className="text-sm text-gray-500">Original: {application.originalAmount}</div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(application.status)}
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${application.statusColor}`}>
                        {application.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{application.appliedDate}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-blue-600">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">{application.messages}</span>
                      <span 
                        className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer ml-1"
                        onClick={() => onViewMessages(application.id)}
                      >
                        View
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      {application.actions.includes("Accept") && (
                        <button 
                          onClick={() => onAcceptOffer(application.id)}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Accept
                        </button>
                      )}
                      {application.actions.includes("Reject") && (
                        <button 
                          onClick={() => onRejectOffer(application.id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      )}
                      {application.actions.includes("View") && (
                        <button 
                          onClick={() => onViewApplication(application.id)}
                          className="px-3 py-1 text-blue-600 border border-blue-600 text-sm rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          View
                        </button>
                      )}
                      {application.actions.includes("View Details") && (
                        <button 
                          onClick={() => onViewDetails(application.id)}
                          className="px-3 py-1 text-gray-600 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OffersTable;
