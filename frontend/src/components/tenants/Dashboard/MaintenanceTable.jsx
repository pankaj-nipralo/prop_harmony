import React from 'react';
import { Wrench } from 'lucide-react';

const MaintenanceTable = ({ maintenanceRequests }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Recent Maintenance Requests</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">Your maintenance requests</p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Issue</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Priority</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRequests.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-gray-500">
                    No maintenance requests found
                  </td>
                </tr>
              ) : (
                maintenanceRequests.map((request, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{request.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{request.issue}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${request.statusColor}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{request.priority}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTable;
