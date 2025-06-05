import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  X,
  Building,
  User,
  Calendar,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react";
import {
  inspectionStatuses,
  priorityLevels,
  conditionLevels,
} from "@/data/landlord/propertyInspection/data";

const ViewInspectionModal = ({ open, onClose, inspection }) => {
  if (!inspection) return null;

  const getStatusStyle = (status) => {
    const statusObj = inspectionStatuses.find((s) => s.value === status);
    return statusObj
      ? `${statusObj.bgColor} ${statusObj.textColor}`
      : "bg-gray-100 text-gray-700";
  };

  const getPriorityStyle = (priority) => {
    const priorityObj = priorityLevels.find((p) => p.value === priority);
    return priorityObj
      ? `${priorityObj.bgColor} ${priorityObj.textColor}`
      : "bg-gray-100 text-gray-700";
  };

  const getConditionStyle = (condition) => {
    const conditionObj = conditionLevels.find((c) => c.value === condition);
    return conditionObj
      ? `${conditionObj.bgColor} ${conditionObj.textColor}`
      : "bg-gray-100 text-gray-700";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl md:max-w-2xl max-h-[80vh] bg-white border-0 rounded-lg shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {inspection.status === "Completed"
                ? "Inspection Report"
                : "Inspection Details"}
            </h2>
          </div>

          {inspection.status === "Completed" ? (
            // Completed Inspection Report View
            <div className="space-y-6">
              {/* Report Summary */}
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="mb-4 text-lg font-medium text-gray-800">
                  Report Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Property:
                    </span>
                    <p className="text-gray-800">{inspection.propertyName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Tenant:
                    </span>
                    <p className="text-gray-800">{inspection.tenantName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Inspector:
                    </span>
                    <p className="text-gray-800">{inspection.inspectorName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Date:
                    </span>
                    <p className="text-gray-800">{inspection.completedDate}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-600">
                    Overall Condition:
                  </span>
                  <span
                    className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionStyle(
                      inspection.overallCondition
                    )}`}
                  >
                    {inspection.overallCondition}
                  </span>
                </div>
              </div>

              {/* Areas Inspected */}
              {inspection.findings && inspection.findings.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">
                    Areas Inspected
                  </h3>
                  <div className="space-y-3">
                    {inspection.findings.map((finding, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800">
                            {finding.area}
                          </h4>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionStyle(
                              finding.condition
                            )}`}
                          >
                            {finding.condition}
                          </span>
                        </div>
                        <p className="mb-2 text-sm text-gray-600">
                          {finding.notes}
                        </p>
                        {finding.issues && finding.issues.length > 0 && (
                          <div>
                            <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                              <AlertTriangle size={14} />
                              Issues Found:
                            </span>
                            <ul className="ml-5 text-sm text-gray-600 list-disc list-inside">
                              {finding.issues.map((issue, issueIndex) => (
                                <li key={issueIndex}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inspector Notes and Recommendations */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">
                    Inspector Notes
                  </h3>
                  <div className="p-4 rounded-lg bg-blue-50">
                    <p className="text-sm text-gray-700">
                      {inspection.notes ||
                        "Property is in good condition overall. Minor maintenance needed."}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">
                    Recommendations
                  </h3>
                  <div className="p-4 rounded-lg bg-green-50">
                    {inspection.recommendations &&
                    inspection.recommendations.length > 0 ? (
                      <ul className="space-y-1">
                        {inspection.recommendations.map((rec, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <CheckCircle
                              size={14}
                              className="text-green-600 mt-0.5 flex-shrink-0"
                            />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-700">
                        No specific recommendations at this time.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Next Inspection */}
              {inspection.nextInspectionDate && (
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">
                    Next Inspection
                  </h3>
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-yellow-50">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Scheduled for {inspection.nextInspectionDate}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Regular Inspection Details View
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Property
                    </label>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {inspection.propertyName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {inspection.propertyAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Tenant
                    </label>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-800">{inspection.tenantName}</p>
                        <p className="text-sm text-gray-600">
                          {inspection.tenantEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Inspector
                    </label>
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-800">
                        {inspection.inspectorName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Inspection Type
                    </label>
                    <p className="text-gray-800">{inspection.inspectionType}</p>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Priority
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityStyle(
                        inspection.priority
                      )}`}
                    >
                      {inspection.priority}
                    </span>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                        inspection.status
                      )}`}
                    >
                      {inspection.status}
                    </span>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Requested Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-800">
                        {inspection.requestedDate}
                      </p>
                    </div>
                  </div>

                  {inspection.scheduledDate && (
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-600">
                        Scheduled Date
                      </label>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-800">
                          {inspection.scheduledDate}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {inspection.notes && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Notes
                  </label>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-gray-800">{inspection.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

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

export default ViewInspectionModal;
