import React, { useState } from "react";
import {
  Search,
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
  MessageSquare,
  FileText,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  inspectionTypes,
  inspectionStatuses,
  priorityLevels,
} from "@/data/landlord/propertyInspection/data";
import { useAuth } from "@/contexts/AuthContext";
import TenantInspectionResponseModal from "./TenantInspectionResponseModal";
import TenantInspectionReportView from "./TenantInspectionReportView";

const TenantInspectionBody = ({ inspections, updateInspection }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [viewMode, setViewMode] = useState("requests"); // "requests" or "reports"

  const [responseModal, setResponseModal] = useState({
    open: false,
    inspection: null,
  });
  const [reportViewModal, setReportViewModal] = useState({
    open: false,
    inspection: null,
  });

  if (!inspections || !Array.isArray(inspections) || inspections.length === 0) {
    return <div className="text-gray-500">No inspections found.</div>;
  }

  // Flatten all inspections and filter for current tenant
  const allInspections = inspections.flatMap((group) => group.inspectionsList);
  const tenantInspections = allInspections.filter(inspection =>
    inspection.tenantEmail === "mike.tenant@email.com" // In real app, use current user email
  );

  // Filter inspections based on view mode
  const filteredByMode =
    viewMode === "requests"
      ? tenantInspections.filter((i) =>
        [
          "Pending Tenant Response",
          "Tenant Accepted",
          "Tenant Declined",
          "Reschedule Requested",
          "Confirmed",
          "In Progress",
        ].includes(i.status)
      )
      : tenantInspections.filter((i) =>
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
        return <FileText size={14} className="text-blue-500" />;
      default:
        return <Clock size={14} className="text-gray-500" />;
    }
  };

  // Handler functions
  const handleRespondToInspection = (inspection) => {
    setResponseModal({ open: true, inspection });
  };

  const handleViewReport = (inspection) => {
    setReportViewModal({ open: true, inspection });
  };

  const handleAddComment = (inspection) => {
    // This would open a comment modal in a real implementation
    console.log("Add comment for inspection:", inspection.id);
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex p-1 bg-white rounded-lg">
          <button
            onClick={() => setViewMode("requests")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${viewMode === "requests"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
              }`}
          >
            Inspection Requests
          </button>
          <button
            onClick={() => setViewMode("reports")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${viewMode === "reports"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
              }`}
          >
            Inspection Reports
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="p-4 bg-white border-0 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center flex-1 gap-2 p-1 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by property, inspector, or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-1 border-0 border-gray-200 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        ) : (
          <Card className="overflow-hidden border-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Property
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Inspector
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      {viewMode === "requests" ? "Requested Date" : "Completed Date"}
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
                            {inspection.inspectorName}
                          </div>
                        </div>
                      </td>
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
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {viewMode === "requests" ? inspection.requestedDate : inspection.completedDate}
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
                          {/* Tenant-specific actions based on status */}
                          {user?.role === 'tenant' && (
                            <>
                              {inspection.status === "Pending Tenant Response" && (
                                <button
                                  onClick={() => handleRespondToInspection(inspection)}
                                  className="px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded cursor-pointer hover:bg-blue-700 myButton"
                                >
                                  Respond
                                </button>
                              )}

                              {viewMode === "reports" && inspection.status === "Report Generated" && (
                                <>
                                  <button
                                    onClick={() => handleViewReport(inspection)}
                                    className="flex items-center gap-1 px-3 py-1 text-xs text-blue-600 transition-colors rounded cursor-pointer bg-blue-50 hover:bg-blue-100 myButton"
                                  >
                                    <Eye size={14} />
                                    View Report
                                  </button>
                                  {/* <button
                                    onClick={() => handleAddComment(inspection)}
                                    className="flex items-center gap-1 px-3 py-1 text-xs text-green-600 transition-colors rounded cursor-pointer bg-green-50 hover:bg-green-100 myButton"
                                  >
                                    <MessageSquare size={14} />
                                    Comment
                                  </button> */}
                                </>
                              )}
                            </>
                          )}

                          {/* View details - available to all */}
                          {
                            inspection.status !== "Report Generated" && (

                              <button
                                onClick={() => handleViewReport(inspection)}
                                className="flex items-center gap-1 px-3 py-1 text-xs text-gray-100 transition-colors myButton"
                              >
                                <Eye size={14} />
                                View
                              </button>
                            )
                          }
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
      <TenantInspectionResponseModal
        open={responseModal.open}
        onClose={() => setResponseModal({ open: false, inspection: null })}
        inspection={responseModal.inspection}
        onUpdateResponse={updateInspection}
      />

      <TenantInspectionReportView
        open={reportViewModal.open}
        onClose={() => setReportViewModal({ open: false, inspection: null })}
        inspection={reportViewModal.inspection}
        onAddComment={updateInspection}
      />
    </div>
  );
};

export default TenantInspectionBody;
