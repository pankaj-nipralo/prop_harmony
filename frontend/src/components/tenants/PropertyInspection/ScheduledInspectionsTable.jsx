import React from 'react';
import { Calendar, Check, X, RotateCcw, Eye } from 'lucide-react';
import { tableHeaders } from '../../../data/tenants/propertyInspectionData';

const ScheduledInspectionsTable = ({ 
  inspections, 
  onApprove, 
  onDeny, 
  onReschedule, 
  onViewReport 
}) => {
  const getActionButtons = (inspection) => {
    switch (inspection.status) {
      case 'Pending Response':
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onApprove(inspection.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => onDeny(inspection.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Deny
            </button>
            <button
              onClick={() => onReschedule(inspection.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reschedule
            </button>
          </div>
        );
      case 'Approved':
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">-</span>
          </div>
        );
      case 'Completed':
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewReport(inspection.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Report
            </button>
          </div>
        );
      default:
        return <span className="text-sm text-gray-500">-</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Scheduled Inspections</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="text-left py-3 px-4 text-sm font-medium text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-900">
                      {inspection.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">
                      {inspection.property}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div className="text-sm">
                        <div className="text-gray-900">{inspection.proposedDate}</div>
                        <div className="text-gray-500">{inspection.proposedTime}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">
                      {inspection.inspector}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inspection.statusColor}`}>
                      {inspection.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {getActionButtons(inspection)}
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

export default ScheduledInspectionsTable;
