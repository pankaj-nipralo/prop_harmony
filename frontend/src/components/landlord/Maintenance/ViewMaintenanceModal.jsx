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
      <DialogContent className="w-full max-h-[90vh] overflow-y-auto bg-white border-0 rounded-lg shadow-xl md:max-w-4xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Maintenance Request Details
            </h2> 
          </div>

          <div className="space-y-6">
            {/* Request Summary */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="mb-4 text-lg font-medium text-gray-800">Request Summary</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">Title:</span>
                  <p className="font-medium text-gray-800">{maintenance.title}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Category:</span>
                  <span className="inline-flex px-2 py-1 ml-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
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
              <h3 className="mb-3 text-lg font-medium text-gray-800">Description</h3>
              <div className="p-4 rounded-lg bg-blue-50">
                <p className="text-gray-700">{maintenance.description}</p>
              </div>
            </div>

            {/* Property and Tenant Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-800">Property Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 mt-1 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-800">{maintenance.propertyName}</p>
                      <p className="text-sm text-gray-600">{maintenance.propertyAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-800">Tenant Information</h3>
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
                <h3 className="mb-3 text-lg font-medium text-gray-800">Assigned Technician</h3>
                <div className="p-4 rounded-lg bg-green-50">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-800">{maintenance.assignedTechnician}</p>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-800">Timeline</h3>
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
                <h3 className="mb-3 text-lg font-medium text-gray-800">Cost Information</h3>
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
                        <p className="font-medium text-gray-800">{maintenance.actualCost}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            {maintenance.notes && (
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-800">Additional Notes</h3>
                <div className="p-4 rounded-lg bg-yellow-50">
                  <p className="text-gray-700">{maintenance.notes}</p>
                </div>
              </div>
            )}

            {/* Request Metadata */}
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-3">
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
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
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
