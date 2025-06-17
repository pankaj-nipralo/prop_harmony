import React from 'react';
import { Wrench, Eye, Calendar, User, DollarSign } from 'lucide-react';
import DirhamSvg from '@/assets/Dirham';

const PropertyMaintenanceHistory = ({ maintenanceHistory, onViewDetails, onUpdateStatus }) => {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Wrench className="w-5 h-5 text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Maintenance History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-4 text-sm font-medium text-left text-gray-600">Request</th>
                <th className="px-4 py-4 text-sm font-medium text-left text-gray-600">Status</th>
                <th className="px-4 py-4 text-sm font-medium text-left text-gray-600">Priority</th>
                <th className="px-4 py-4 text-sm font-medium text-left text-gray-600">Dates</th>
                <th className="px-4 py-4 text-sm font-medium text-left text-gray-600">Assigned To</th>
                <th className="px-4 py-4 text-sm font-medium text-left text-gray-600">Cost</th>
                <th className="px-4 py-4 text-sm font-medium text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceHistory.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{request.title}</div>
                      <div className="text-sm text-gray-500">{request.description}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${request.statusColor}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>Requested: {request.requestDate}</span>
                      </div>
                      {request.completedDate && (
                        <div className="flex items-center gap-1 mt-1 text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>Completed: {request.completedDate}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <User className="w-3 h-3" />
                      <span className="text-sm">{request.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {request.cost ? (
                      <div className="flex items-center gap-1 text-gray-600">
                        <DirhamSvg className="w-3 h-3" />
                        <span className="text-sm font-medium">{request.cost}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewDetails(request.id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                      {request.status !== 'Completed' && (
                        <button
                          onClick={() => onUpdateStatus(request.id)}
                          className="px-3 py-1 text-sm text-gray-600 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {maintenanceHistory.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <Wrench className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No maintenance requests found</p>
            <button className="px-4 py-2 mt-3 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
              Submit First Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyMaintenanceHistory;
