import React, { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  ChevronDown,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  User,
  Building,
  Mail,
  Phone,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  warningTypes,
  severityLevels,
  warningStatuses,
} from "@/data/landlord/issueWarning/data";

const WarningBody = ({ warnings, setWarnings }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [severityFilter, setSeverityFilter] = useState("All Severities");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [editModal, setEditModal] = useState({ open: false, warning: null });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    warning: null,
  });
  const [viewModal, setViewModal] = useState({ open: false, warning: null });

  if (!warnings || !Array.isArray(warnings) || warnings.length === 0) {
    return <div className="text-gray-500">No warnings found.</div>;
  }

  const handleEditWarning = (warning) => {
    setEditModal({ open: true, warning });
  };

  const handleDeleteWarning = (warning) => {
    setDeleteModal({ open: true, warning });
  };

  const handleViewWarning = (warning) => {
    setViewModal({ open: true, warning });
  };

  const handleSaveEdit = (updatedWarning) => {
    setWarnings((prev) =>
      prev.map((group) => ({
        ...group,
        warningsList: group.warningsList.map((warning) =>
          warning.id === updatedWarning.id ? updatedWarning : warning
        ),
      }))
    );
  };

  const handleConfirmDelete = (warningToDelete) => {
    setWarnings((prev) =>
      prev.map((group) => ({
        ...group,
        warningsList: group.warningsList.filter(
          (warning) => warning.id !== warningToDelete.id
        ),
      }))
    );
  };

  // Flatten all warnings
  const allWarnings = warnings.flatMap((group) => group.warningsList);

  // Filter warnings
  const filteredWarnings = allWarnings.filter((warning) => {
    const typeMatch =
      typeFilter === "All Types" || warning.warningType === typeFilter;
    const severityMatch =
      severityFilter === "All Severities" ||
      warning.severity === severityFilter;
    const statusMatch =
      statusFilter === "All Status" || warning.status === statusFilter;
    return typeMatch && severityMatch && statusMatch;
  });

  // Search warnings
  const displayedWarnings = filteredWarnings.filter((warning) => {
    const q = search.toLowerCase();
    return (
      warning.recipientName.toLowerCase().includes(q) ||
      warning.subject.toLowerCase().includes(q) ||
      warning.warningType.toLowerCase().includes(q) ||
      warning.property.toLowerCase().includes(q)
    );
  });

  const getSeverityStyle = (severity) => {
    const level = severityLevels.find((s) => s.value === severity);
    return level
      ? `${level.bgColor} ${level.textColor}`
      : "bg-gray-100 text-gray-700";
  };

  const getStatusStyle = (status) => {
    const statusObj = warningStatuses.find((s) => s.value === status);
    return statusObj
      ? `${statusObj.bgColor} ${statusObj.textColor}`
      : "bg-gray-100 text-gray-700";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={14} className="text-gray-500" />;
      case "Acknowledged":
        return <Eye size={14} className="text-blue-500" />;
      case "Resolved":
        return <CheckCircle size={14} className="text-green-500" />;
      case "Escalated":
        return <AlertTriangle size={14} className="text-red-500" />;
      case "Overdue":
        return <XCircle size={14} className="text-red-600" />;
      default:
        return <Clock size={14} className="text-gray-500" />;
    }
  };

  return (
    <div className="mb-4">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Manage Warnings
      </h2>

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 p-4 mb-6 bg-white shadow-sm md:flex-row md:items-center md:justify-between rounded-xl">
        <div className="flex items-center flex-1 gap-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search warnings by recipient, subject, type, or property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All Types">All Types</option>
              {warningTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
          </div>
          <div className="relative">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-4 py-2 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All Severities">All Severities</option>
              {severityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.value}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All Status">All Status</option>
              {warningStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.value}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
          </div>
        </div>
      </div>

      {/* Warning Cards Grid */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {displayedWarnings.length === 0 ? (
          <div className="py-8 text-center text-gray-500 col-span-full">
            No warnings found.
          </div>
        ) : (
          displayedWarnings.map((warning) => (
            <div
              key={warning.id}
              className="w-full p-6 bg-white border border-gray-100 shadow-sm rounded-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 text-lg font-semibold text-white bg-blue-500 rounded-full">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-md">
                      {warning.subject}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getSeverityStyle(
                          warning.severity
                        )}`}
                      >
                        {warning.severity}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusStyle(
                          warning.status
                        )}`}
                      >
                        {getStatusIcon(warning.status)}
                        {warning.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewWarning(warning)}
                    className="p-2 text-gray-500 transition-colors rounded-lg hover:text-blue-600 hover:bg-blue-50"
                    title="View Warning"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEditWarning(warning)}
                    className="p-2 text-gray-500 transition-colors rounded-lg hover:text-blue-600 hover:bg-blue-50"
                    title="Edit Warning"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteWarning(warning)}
                    className="p-2 text-gray-500 transition-colors rounded-lg hover:text-red-600 hover:bg-red-50"
                    title="Delete Warning"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-500" />
                  <span className="truncate">{warning.recipientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building size={14} className="text-gray-500" />
                  <span className="truncate">{warning.property}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-gray-500" />
                  <span>{warning.warningType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-500" />
                  <span>Issued: {warning.issueDate}</span>
                </div>
                {warning.dueDate && (
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-500" />
                    <span>Due: {warning.dueDate}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {warning.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Warning Modal */}
      <ViewWarningModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, warning: null })}
        warning={viewModal.warning}
      />

      {/* Edit Warning Modal */}
      <EditWarningModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, warning: null })}
        warning={editModal.warning}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, warning: null })}
        warning={deleteModal.warning}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

// View Warning Modal Component
const ViewWarningModal = ({ open, onClose, warning }) => {
  if (!warning) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full overflow-y-auto bg-white border-0 rounded-lg shadow-xl max-h-[80vh] max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[900px]">
        <div className="p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Warning Details
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Recipient
                </label>
                <p className="text-gray-800">{warning.recipientName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Property
                </label>
                <p className="text-gray-800">{warning.property}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Warning Type
                </label>
                <p className="text-gray-800">{warning.warningType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Severity
                </label>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    severityLevels.find((s) => s.value === warning.severity)
                      ?.bgColor || "bg-gray-100"
                  } ${
                    severityLevels.find((s) => s.value === warning.severity)
                      ?.textColor || "text-gray-700"
                  }`}
                >
                  {warning.severity}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    warningStatuses.find((s) => s.value === warning.status)
                      ?.bgColor || "bg-gray-100"
                  } ${
                    warningStatuses.find((s) => s.value === warning.status)
                      ?.textColor || "text-gray-700"
                  }`}
                >
                  {warning.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Issue Date
                </label>
                <p className="text-gray-800">{warning.issueDate}</p>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Subject
              </label>
              <p className="text-gray-800">{warning.subject}</p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Description
              </label>
              <p className="text-gray-800 whitespace-pre-wrap">
                {warning.description}
              </p>
            </div>

            {warning.communicationHistory &&
              warning.communicationHistory.length > 0 && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Communication History
                  </label>
                  <div className="space-y-2">
                    {warning.communicationHistory.map((comm) => (
                      <div key={comm.id} className="p-3 rounded-lg bg-gray-50">
                        <div className="flex items-start justify-between">
                          <span className="text-sm font-medium text-gray-800">
                            {comm.message}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comm.date}
                          </span>
                        </div>
                        <span className="text-xs text-gray-600">
                          by {comm.sentBy}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className="flex justify-end pt-4 mt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Edit Warning Modal Component
const EditWarningModal = ({ open, onClose, warning, onSave }) => {
  const [form, setForm] = useState({
    subject: "",
    description: "",
    severity: "Medium",
    warningType: "",
    dueDate: "",
    status: "Pending",
  });

  React.useEffect(() => {
    if (warning && open) {
      setForm({
        subject: warning.subject || "",
        description: warning.description || "",
        severity: warning.severity || "Medium",
        warningType: warning.warningType || "",
        dueDate: warning.dueDate || "",
        status: warning.status || "Pending",
      });
    }
  }, [warning, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...warning,
        ...form,
      });
    }
    onClose();
  };

  if (!warning) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full overflow-y-auto bg-white border-0 rounded-lg shadow-xl max-h-[100vh] max-w-[60vw] sm:max-w-[60vw] md:max-w-[60vw] lg:max-w-[500px]">
        <div className="p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Edit Warning
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Subject *
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Warning Type *
              </label>
              <select
                name="warningType"
                value={form.warningType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {warningTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Severity *
                </label>
                <select
                  name="severity"
                  value={form.severity}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {severityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {warningStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Delete Confirmation Dialog Component
const DeleteConfirmationDialog = ({ open, onClose, warning, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Delete Warning
          </h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete the warning "
            <strong>{warning?.subject}</strong>" for{" "}
            <strong>{warning?.recipientName}</strong>? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(warning);
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WarningBody;
