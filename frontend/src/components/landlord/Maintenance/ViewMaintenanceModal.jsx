import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  X, 
  Building, 
  User, 
  Calendar, 
  Wrench, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Phone,
  Mail
} from "lucide-react";
import { 
  maintenanceStatuses, 
  priorityLevels 
} from "@/data/landlord/maintenance/data";

const ViewMaintenanceModal = ({ open, onClose, maintenance }) => {
  if (!maintenance) return null;

  const getStatusStyle = (status) => {
    const statusObj = maintenanceStatuses.find(s => s.value === status);
    return statusObj ? `${statusObj.bgColor} ${statusObj.textColor}` : "bg-gray-100 text-gray-700";
  };

  const getPriorityStyle = (priority) => {
    const priorityObj = priorityLevels.find(p => p.value === priority);
    return priorityObj ? `${priorityObj.bgColor} ${priorityObj.textColor}` : "bg-gray-100 text-gray-700";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl max-h-screen bg-white border-0 rounded-lg shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Maintenance Request Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Request Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Request Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Title:</span>
                  <p className="text-gray-800 font-medium">{maintenance.title}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Category:</span>
                  <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {maintenance.category}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Priority:</span>
                  <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityStyle(maintenance.priority)}`}>
                    {maintenance.priority}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(maintenance.status)}`}>
                    {maintenance.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Description</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">{maintenance.description}</p>
              </div>
            </div>

            {/* Property and Tenant Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Property Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-gray-800 font-medium">{maintenance.propertyName}</p>
                      <p className="text-sm text-gray-600">{maintenance.propertyAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Tenant Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-800">{maintenance.tenantName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-600">{maintenance.tenantEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-600">{maintenance.tenantPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technician Information */}
            {maintenance.assignedTechnician && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Assigned Technician</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-800 font-medium">{maintenance.assignedTechnician}</p>
                    </div>
                    {maintenance.technicianEmail && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-600">{maintenance.technicianEmail}</p>
                      </div>
                    )}
                    {maintenance.technicianPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-600">{maintenance.technicianPhone}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Dates and Cost Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <span className="text-sm font-medium text-gray-600">Requested:</span>
                      <p className="text-gray-800">{maintenance.requestedDate}</p>
                    </div>
                  </div>
                  {maintenance.completedDate && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-600">Completed:</span>
                        <p className="text-gray-800">{maintenance.completedDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Cost Information</h3>
                <div className="space-y-3">
                  {maintenance.estimatedCost && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="text-sm font-medium text-gray-600">Estimated:</span>
                        <p className="text-gray-800">{maintenance.estimatedCost}</p>
                      </div>
                    </div>
                  )}
                  {maintenance.actualCost && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-600">Actual:</span>
                        <p className="text-gray-800 font-medium">{maintenance.actualCost}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            {maintenance.notes && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Additional Notes</h3>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-700">{maintenance.notes}</p>
                </div>
              </div>
            )}

            {/* Request Metadata */}
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Created by:</span>
                  <p>{maintenance.createdBy}</p>
                </div>
                <div>
                  <span className="font-medium">Created date:</span>
                  <p>{maintenance.createdDate}</p>
                </div>
                <div>
                  <span className="font-medium">Last updated:</span>
                  <p>{maintenance.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMaintenanceModal;
