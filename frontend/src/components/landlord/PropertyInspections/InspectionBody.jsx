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
import { useInspectionSync } from "@/hooks/useInspectionSync";
import ScheduleInspectionModal from "./ScheduleInspectionModal";
import ViewInspectionModal from "./ViewInspectionModal";
import InspectionReportModal from "./InspectionReportModal";
import TenantResponseModal from "./TenantResponseModal";

const InspectionBody = () => {
  const { user } = useAuth();
  const { inspections, setInspections, updateInspection, addInspection } =
    useInspectionSync();
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
    updateInspection(inspectionId, {
      scheduledDate,
      status: "Scheduled",
    });
  };

  const handleMarkComplete = (inspectionId) => {
    updateInspection(inspectionId, {
      status: "Completed",
      completedDate: new Date().toISOString().split("T")[0],
      overallCondition: "Good", // Default condition
    });
    setViewMode("reports");
  };

  const handleConfirmDelete = (inspectionToDelete) => {
    // For deletion, we need to update the inspections array directly
    const updatedInspections = inspections.map((group) => ({
      ...group,
      inspectionsList: group.inspectionsList.filter(
        (inspection) => inspection.id !== inspectionToDelete.id
      ),
    }));

    setInspections(updatedInspections);
  };

  const handleSaveReport = (inspectionId, reportData) => {
    updateInspection(inspectionId, {
      status: "Report Generated",
      inspectionReport: reportData,
      reportGenerated: true,
      reportSharedWithTenant: true,
    });
    setReportModal({ open: false, inspection: null });
  };

  const handleUpdateTenantResponse = (inspectionId, responseData) => {
    updateInspection(inspectionId, responseData);
    setTenantResponseModal({ open: false, inspection: null });
  };

  const handleConfirmInspection = (inspectionId) => {
    updateInspection(inspectionId, { status: "Confirmed" });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <Card className="px-3 py-4 bg-white border-0 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="flex items-center flex-1 gap-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by property, tenant, inspector, or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Type Filter */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Types">All Types</option>
                {inspectionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none right-2 top-1/2" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Status">All Status</option>
                {inspectionStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.value}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none right-2 top-1/2" />
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Priorities">All Priorities</option>
                {priorityLevels.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.value}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none right-2 top-1/2" />
            </div>
          </div>
        </div>
      </Card>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-lg ">
          <button
            onClick={() => setViewMode("requests")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${viewMode === "requests"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
          >
            Inspection Requests
          </button>
          <button
            onClick={() => setViewMode("reports")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${viewMode === "reports"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
          >
            Inspection Reports
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {viewMode === "requests"
            ? "Inspection Requests"
            : "Inspection Reports"}
        </h2>

        {displayedInspections.length === 0 ? (
          <Card className="p-8 text-center border-0">
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
          <Card className="overflow-hidden border-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                  <tr>
                    {[
                      "Property",
                      "Tenant",
                      "Type",
                      "Requested Date",
                      "Status",
                      "Priority",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedInspections.map((inspection, index) => (
                    <tr
                      key={inspection.id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition-colors duration-150`}
                    >
                      {/* Property */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {inspection.propertyName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {inspection.propertyAddress}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Tenant */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div>{inspection.tenantName}</div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${inspection.inspectionType === "Routine"
                              ? "bg-green-100 text-green-800"
                              : inspection.inspectionType === "Maintenance"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {inspection.inspectionType}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                        {inspection.requestedDate}
                      </td>

                      {/* Status */}
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

                      {/* Priority */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityStyle(
                            inspection.priority
                          )}`}
                        >
                          {inspection.priority}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          {["landlord", "property_manager"].includes(
                            user?.role
                          ) && (
                              <>
                                {/* {inspection.status ===
                                "Pending Tenant Response" && (
                                <button
                                  onClick={() =>
                                    handleTenantResponse(inspection)
                                  }
                                  className="px-3 py-1 text-xs text-white transition-colors bg-yellow-600 rounded cursor-pointer hover:bg-yellow-700 myButton"
                                >
                                  Simulate Response
                                </button>
                              )} */}
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
                                    Start Inspection
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
                          {["landlord", "property_manager"].includes(
                            user?.role
                          ) && (
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
          <Card className="overflow-hidden border-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                  <tr>
                    {[
                      "Property",
                      "Tenant",
                      "Inspector",
                      "Date",
                      "Overall Condition",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedInspections.map((inspection, index) => (
                    <tr
                      key={inspection.id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition-colors duration-150`}
                    >
                      {/* Property */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="text-sm font-medium text-gray-900">
                            {inspection.propertyName}
                          </div>
                        </div>
                      </td>

                      {/* Tenant */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="text-sm text-gray-900">
                            {inspection.tenantName}
                          </div>
                        </div>
                      </td>

                      {/* Inspector */}
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {inspection.inspectorName}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {inspection.completedDate}
                      </td>

                      {/* Overall Condition */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${inspection.overallCondition === "Good"
                              ? "bg-green-100 text-green-800"
                              : inspection.overallCondition === "Fair"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {inspection.overallCondition}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {inspection.status === "Report Generated" ? (
                            <button
                              onClick={() => handleViewInspection(inspection)}
                              className="flex items-center gap-1 px-3 py-1 text-xs text-blue-600 transition-colors rounded cursor-pointer bg-blue-50 hover:bg-blue-100 myButton"
                            >
                              <Eye size={14} />
                              View Report
                            </button>
                          ) : (
                            ["landlord", "property_manager"].includes(
                              user?.role
                            ) && (
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
