import React, { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Building,
  ClipboardCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown,
  Filter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  inspectionTypes,
  inspectionStatuses,
  priorityLevels,
} from "@/data/landlord/propertyInspection/data";
import { useAuth } from "@/contexts/AuthContext";
import ScheduleInspectionModal from "./ScheduleInspectionModal";
import ViewInspectionModal from "./ViewInspectionModal";
import InspectionReportModal from "./InspectionReportModal";
import TenantResponseModal from "./TenantResponseModal";

const InspectionBody = ({ inspections, setInspections }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [viewMode, setViewMode] = useState("requests"); // "requests" or "reports"
  const [scheduleModal, setScheduleModal] = useState({
    open: false,
    inspection: null,
  });
  const [viewModal, setViewModal] = useState({ open: false, inspection: null });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    inspection: null,
  });
  const [reportModal, setReportModal] = useState({
    open: false,
    inspection: null,
  });
  const [tenantResponseModal, setTenantResponseModal] = useState({
    open: false,
    inspection: null,
  });

  if (!inspections || !Array.isArray(inspections) || inspections.length === 0) {
    return <div className="text-gray-500">No inspections found.</div>;
  }

  // Flatten all inspections
  const allInspections = inspections.flatMap((group) => group.inspectionsList);

  // Filter inspections based on view mode
  const filteredByMode =
    viewMode === "requests"
      ? allInspections.filter((i) =>
          [
            "Pending Tenant Response",
            "Tenant Accepted",
            "Tenant Declined",
            "Reschedule Requested",
            "Confirmed",
            "In Progress",
          ].includes(i.status)
        )
      : allInspections.filter((i) =>
          ["Completed", "Report Generated"].includes(i.status)
        );

  // Apply filters
  const filteredInspections = filteredByMode.filter((inspection) => {
    const typeMatch =
      typeFilter === "All Types" || inspection.inspectionType === typeFilter;
    const statusMatch =
      statusFilter === "All Status" || inspection.status === statusFilter;
    const priorityMatch =
      priorityFilter === "All Priorities" ||
      inspection.priority === priorityFilter;
    return typeMatch && statusMatch && priorityMatch;
  });

  // Search inspections
  const displayedInspections = filteredInspections.filter((inspection) => {
    const q = search.toLowerCase();
    return (
      inspection.propertyName.toLowerCase().includes(q) ||
      inspection.tenantName.toLowerCase().includes(q) ||
      inspection.inspectorName.toLowerCase().includes(q) ||
      inspection.inspectionType.toLowerCase().includes(q)
    );
  });

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending Tenant Response":
        return <Clock size={14} className="text-yellow-500" />;
      case "Tenant Accepted":
        return <CheckCircle size={14} className="text-green-500" />;
      case "Tenant Declined":
        return <XCircle size={14} className="text-red-500" />;
      case "Reschedule Requested":
        return <AlertTriangle size={14} className="text-orange-500" />;
      case "Confirmed":
        return <Calendar size={14} className="text-blue-500" />;
      case "In Progress":
        return <ClipboardCheck size={14} className="text-purple-500" />;
      case "Completed":
        return <CheckCircle size={14} className="text-green-500" />;
      case "Report Generated":
        return <CheckCircle size={14} className="text-blue-500" />;
      case "Cancelled":
        return <XCircle size={14} className="text-red-500" />;
      default:
        return <Clock size={14} className="text-gray-500" />;
    }
  };

  // Handler functions
  const handleScheduleInspection = (inspection) => {
    setScheduleModal({ open: true, inspection });
  };

  const handleViewInspection = (inspection) => {
    setViewModal({ open: true, inspection });
  };

  const handleDeleteInspection = (inspection) => {
    setDeleteModal({ open: true, inspection });
  };

  const handleGenerateReport = (inspection) => {
    setReportModal({ open: true, inspection });
  };

  const handleTenantResponse = (inspection) => {
    setTenantResponseModal({ open: true, inspection });
  };

  const handleScheduleSubmit = (inspectionId, scheduledDate) => {
    setInspections((prev) =>
      prev.map((group) => ({
        ...group,
        inspectionsList: group.inspectionsList.map((inspection) =>
          inspection.id === inspectionId
            ? { ...inspection, scheduledDate, status: "Scheduled" }
            : inspection
        ),
      }))
    );
  };

  const handleMarkComplete = (inspectionId) => {
    setInspections((prev) =>
      prev.map((group) => ({
        ...group,
        inspectionsList: group.inspectionsList.map((inspection) =>
          inspection.id === inspectionId
            ? {
                ...inspection,
                status: "Completed",
                completedDate: new Date().toISOString().split("T")[0],
                overallCondition: "Good", // Default condition
              }
            : inspection
        ),
      }))
    );
  };

  const handleConfirmDelete = (inspectionToDelete) => {
    setInspections((prev) =>
      prev.map((group) => ({
        ...group,
        inspectionsList: group.inspectionsList.filter(
          (inspection) => inspection.id !== inspectionToDelete.id
        ),
      }))
    );
  };

  const handleSaveReport = (inspectionId, reportData) => {
    setInspections((prev) =>
      prev.map((group) => ({
        ...group,
        inspectionsList: group.inspectionsList.map((inspection) =>
          inspection.id === inspectionId
            ? {
                ...inspection,
                status: "Report Generated",
                inspectionReport: reportData,
                reportGenerated: true,
                reportSharedWithTenant: true,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : inspection
        ),
      }))
    );
    setReportModal({ open: false, inspection: null });
  };

  const handleUpdateTenantResponse = (inspectionId, responseData) => {
    setInspections((prev) =>
      prev.map((group) => ({
        ...group,
        inspectionsList: group.inspectionsList.map((inspection) =>
          inspection.id === inspectionId
            ? {
                ...inspection,
                ...responseData,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : inspection
        ),
      }))
    );
    setTenantResponseModal({ open: false, inspection: null });
  };

  const handleConfirmInspection = (inspectionId) => {
    setInspections((prev) =>
      prev.map((group) => ({
        ...group,
        inspectionsList: group.inspectionsList.map((inspection) =>
          inspection.id === inspectionId
            ? {
                ...inspection,
                status: "Confirmed",
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : inspection
        ),
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setViewMode("requests")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              viewMode === "requests"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Inspection Requests
          </button>
          <button
            onClick={() => setViewMode("reports")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              viewMode === "reports"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Inspection Reports
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="p-4 border-0 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center flex-1 gap-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by property, tenant, inspector, or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Types">All Types</option>
                {inspectionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Status">All Status</option>
                {inspectionStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.value}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
            </div>
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Priorities">All Priorities</option>
                {priorityLevels.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.value}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Content Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {viewMode === "requests"
            ? "Inspection Requests"
            : "Inspection Reports"}
        </h2>

        {displayedInspections.length === 0 ? (
          <Card className="p-8 text-center border-0 shadow-sm">
            <ClipboardCheck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">
              No{" "}
              {viewMode === "requests"
                ? "inspection requests"
                : "inspection reports"}{" "}
              found.
            </p>
          </Card>
        ) : viewMode === "requests" ? (
          // Inspection Requests Table View
          <Card className="overflow-hidden border-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase ">
                      Property
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Requested Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedInspections.map((inspection) => (
                    <tr key={inspection.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {inspection.propertyName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {inspection.propertyAddress}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="text-sm text-gray-900">
                            {inspection.tenantName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            inspection.inspectionType === "Routine"
                              ? "bg-green-100 text-green-800"
                              : inspection.inspectionType === "Maintenance"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {inspection.inspectionType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {inspection.requestedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                            inspection.status
                          )}`}
                        >
                          {getStatusIcon(inspection.status)}
                          {inspection.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityStyle(
                            inspection.priority
                          )}`}
                        >
                          {inspection.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {/* Landlord-only actions - role-based access control */}
                          {user?.role === "landlord" && (
                            <>
                              {inspection.status ===
                                "Pending Tenant Response" && (
                                <button
                                  onClick={() =>
                                    handleTenantResponse(inspection)
                                  }
                                  className="px-3 py-1 text-xs text-white transition-colors bg-yellow-600 rounded cursor-pointer hover:bg-yellow-700 myButton"
                                >
                                  Simulate Response
                                </button>
                              )}
                              {inspection.status === "Tenant Accepted" && (
                                <button
                                  onClick={() =>
                                    handleConfirmInspection(inspection.id)
                                  }
                                  className="px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded cursor-pointer hover:bg-blue-700 myButton"
                                >
                                  Confirm
                                </button>
                              )}
                              {inspection.status === "Reschedule Requested" && (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() =>
                                      handleConfirmInspection(inspection.id)
                                    }
                                    className="px-2 py-1 text-xs text-white transition-colors bg-green-600 rounded cursor-pointer hover:bg-green-700 myButton"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleTenantResponse(inspection)
                                    }
                                    className="px-2 py-1 text-xs text-white transition-colors bg-orange-600 rounded cursor-pointer hover:bg-orange-700 myButton"
                                  >
                                    Counter
                                  </button>
                                </div>
                              )}
                              {inspection.status === "Confirmed" && (
                                <button
                                  onClick={() =>
                                    handleMarkComplete(inspection.id)
                                  }
                                  className="px-3 py-1 text-xs text-white transition-colors bg-green-600 rounded cursor-pointer hover:bg-green-700 myButton"
                                >
                                  Mark Complete
                                </button>
                              )}
                              {inspection.status === "Completed" && (
                                <button
                                  onClick={() =>
                                    handleGenerateReport(inspection)
                                  }
                                  className="px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded cursor-pointer hover:bg-blue-700 myButton"
                                >
                                  Generate Report
                                </button>
                              )}
                            </>
                          )}

                          {/* Common actions for all roles */}
                          <button
                            onClick={() => handleViewInspection(inspection)}
                            className="flex items-center gap-1 px-3 py-1 text-xs text-blue-600 transition-colors rounded cursor-pointer bg-blue-50 hover:bg-blue-100 myButton"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          {/* Landlord-only delete action */}
                          {user?.role === "landlord" && (
                            <button
                              onClick={() => handleDeleteInspection(inspection)}
                              className="flex items-center gap-1 px-3 py-1 text-xs text-red-600 transition-colors rounded cursor-pointer bg-red-50 hover:bg-red-100"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          // Inspection Reports Table View
          <Card className="overflow-hidden border-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Property
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Inspector
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Overall Condition
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedInspections.map((inspection) => (
                    <tr key={inspection.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="text-sm font-medium text-gray-900">
                            {inspection.propertyName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="text-sm text-gray-900">
                            {inspection.tenantName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {inspection.inspectorName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {inspection.completedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            inspection.overallCondition === "Good"
                              ? "bg-green-100 text-green-800"
                              : inspection.overallCondition === "Fair"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {inspection.overallCondition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {/* View Report - Available to all roles */}
                          {inspection.status === "Report Generated" ? (
                            <button
                              onClick={() => handleViewInspection(inspection)}
                              className="flex items-center gap-1 px-3 py-1 text-xs text-blue-600 transition-colors rounded cursor-pointer bg-blue-50 hover:bg-blue-100 myButton"
                            >
                              <Eye size={14} />
                              View Report
                            </button>
                          ) : (
                            /* Generate Report - Landlord only */
                            user?.role === "landlord" && (
                              <button
                                onClick={() => handleGenerateReport(inspection)}
                                className="flex items-center gap-1 px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded cursor-pointer hover:bg-blue-700 myButton"
                              >
                                <ClipboardCheck size={14} />
                                Generate Report
                              </button>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Modals */}
      <ScheduleInspectionModal
        open={scheduleModal.open}
        onClose={() => setScheduleModal({ open: false, inspection: null })}
        inspection={scheduleModal.inspection}
        onSchedule={handleScheduleSubmit}
      />

      <ViewInspectionModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, inspection: null })}
        inspection={viewModal.inspection}
      />

      <InspectionReportModal
        open={reportModal.open}
        onClose={() => setReportModal({ open: false, inspection: null })}
        inspection={reportModal.inspection}
        onSaveReport={handleSaveReport}
      />

      <TenantResponseModal
        open={tenantResponseModal.open}
        onClose={() =>
          setTenantResponseModal({ open: false, inspection: null })
        }
        inspection={tenantResponseModal.inspection}
        onUpdateResponse={handleUpdateTenantResponse}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={() => setDeleteModal({ open: false, inspection: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Delete Inspection
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the inspection for "
              <strong>{deleteModal.inspection?.propertyName}</strong>"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  setDeleteModal({ open: false, inspection: null })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleConfirmDelete(deleteModal.inspection);
                  setDeleteModal({ open: false, inspection: null });
                }}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InspectionBody;
