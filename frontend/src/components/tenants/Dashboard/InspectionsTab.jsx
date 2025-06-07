import React from 'react';
import { Eye, Calendar, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const InspectionsTab = ({ inspections, inspectionTableHeaders }) => {
  return (
    <div className="space-y-8">
      {/* Inspections Header */}
      <div className="flex items-center gap-2">
        <Eye className="w-6 h-6 text-gray-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Property Inspections</h2>
      </div>

      {/* Scheduled Inspections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Scheduled Inspections</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {inspectionTableHeaders.map((header, index) => (
                    <th key={index} className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inspections.map((inspection) => (
                  <tr key={inspection.id} className="border-b border-gray-100">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{inspection.type}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{inspection.property}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <div>
                          <div className="text-sm font-medium">{inspection.date}</div>
                          <div className="text-xs text-gray-500">{inspection.time}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{inspection.inspector}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${inspection.statusColor}`}>
                        {inspection.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        {inspection.status === 'Pending Response' && (
                          <>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Deny">
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Reschedule">
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {inspection.status === 'Completed' && (
                          <button className="flex items-center gap-1 px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                            <Eye className="w-3 h-3" />
                            View Report
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
    </div>
  );
};

export default InspectionsTab;
