import React, { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  User,
  Building,
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown,
  Filter,
  Calendar,
  DollarSign,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  maintenanceCategories,
  maintenanceStatuses,
  priorityLevels,
  techniciansList,
} from "@/data/landlord/maintenance/data";
import ViewMaintenanceModal from "./ViewMaintenanceModal";
import EditMaintenanceModal from "./EditMaintenanceModal";
import { useAuth } from "@/contexts/AuthContext";
import DirhamSvg from "@/assets/Dirham";

const MaintenanceBody = ({ maintenance, setMaintenance }) => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [viewModal, setViewModal] = useState({
    open: false,
    maintenance: null,
  });
  const [editModal, setEditModal] = useState({
    open: false,
    maintenance: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    maintenance: null,
  });
  const [assignModal, setAssignModal] = useState({
    open: false,
    maintenance: null,
    selectedTechnician: null,
    remarks: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    maintenance: null,
  });
  const [resolveModal, setResolveModal] = useState({
    open: false,
    maintenance: null,
    closingRemarks: "",
  });
  const { user } = useAuth();
  const isPropertyManager = user?.role === "property_manager";

  if (!maintenance || !Array.isArray(maintenance) || maintenance.length === 0) {
    return <div className="text-gray-500">No maintenance requests found.</div>;
  }

  // Flatten all maintenance requests
  const allMaintenance = maintenance.flatMap((group) => group.maintenanceList);

  // Apply filters
  const filteredMaintenance = allMaintenance.filter((request) => {
    const categoryMatch =
      categoryFilter === "All Categories" ||
      request.category === categoryFilter;
    const statusMatch =
      statusFilter === "All Status" || request.status === statusFilter;
    const priorityMatch =
      priorityFilter === "All Priorities" ||
      request.priority === priorityFilter;
    return categoryMatch && statusMatch && priorityMatch;
  });

  // Search maintenance requests
  const displayedMaintenance = filteredMaintenance.filter((request) => {
    const q = search.toLowerCase();
    return (
      request.title.toLowerCase().includes(q) ||
      request.description.toLowerCase().includes(q) ||
      request.propertyName.toLowerCase().includes(q) ||
      request.tenantName.toLowerCase().includes(q) ||
      request.category.toLowerCase().includes(q)
    );
  });

  const getStatusStyle = (status) => {
    const statusObj = maintenanceStatuses.find((s) => s.value === status);
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
      case "Pending":
        return <Clock size={14} className="text-yellow-500" />;
      case "Open":
        return <AlertTriangle size={14} className="text-red-500" />;
      case "In Progress":
        return <Wrench size={14} className="text-blue-500" />;
      case "Completed":
        return <CheckCircle size={14} className="text-green-500" />;
      case "Cancelled":
        return <XCircle size={14} className="text-gray-500" />;
      default:
        return <Clock size={14} className="text-gray-500" />;
    }
  };

  // Handler functions
  const handleViewMaintenance = (request) => {
    setViewModal({ open: true, maintenance: request });
  };

  const handleEditMaintenance = (request) => {
    setEditModal({ open: true, maintenance: request });
  };

  const handleDeleteMaintenance = (request) => {
    setDeleteModal({ open: true, maintenance: request });
  };

  const handleUpdateMaintenance = (updatedMaintenance) => {
    setMaintenance((prev) =>
      prev.map((group) => ({
        ...group,
        maintenanceList: group.maintenanceList.map((request) =>
          request.id === updatedMaintenance.id ? updatedMaintenance : request
        ),
      }))
    );
  };

  const handleConfirmDelete = (maintenanceToDelete) => {
    setMaintenance((prev) =>
      prev.map((group) => ({
        ...group,
        maintenanceList: group.maintenanceList.filter(
          (request) => request.id !== maintenanceToDelete.id
        ),
      }))
    );
  };

  const handleStatusChange = (requestId, newStatus) => {
    setMaintenance((prev) =>
      prev.map((group) => ({
        ...group,
        maintenanceList: group.maintenanceList.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status: newStatus,
                completedDate:
                  newStatus === "Completed"
                    ? new Date().toISOString().split("T")[0]
                    : request.completedDate,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : request
        ),
      }))
    );
  };

  const handleAssign = (request) => {
    setAssignModal({
      open: true,
      maintenance: request,
      selectedTechnician: null,
      remarks: "",
    });
  };

  const handleConfirm = (request) => {
    setConfirmModal({
      open: true,
      maintenance: request,
    });
  };

  const handleResolve = (request) => {
    setResolveModal({
      open: true,
      maintenance: request,
      closingRemarks: "",
    });
  };

  const handleAssignSubmit = () => {
    const { maintenance, selectedTechnician, remarks } = assignModal;
    if (!selectedTechnician) return;

    setMaintenance((prev) =>
      prev.map((group) => ({
        ...group,
        maintenanceList: group.maintenanceList.map((request) =>
          request.id === maintenance.id
            ? {
                ...request,
                status: "In Progress",
                assignedTechnician: selectedTechnician.name,
                technicianPhone: selectedTechnician.phone,
                technicianEmail: selectedTechnician.email,
                remarks,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : request
        ),
      }))
    );
    setAssignModal({
      open: false,
      maintenance: null,
      selectedTechnician: null,
      remarks: "",
    });
  };

  const handleConfirmSubmit = () => {
    const { maintenance } = confirmModal;
    setMaintenance((prev) =>
      prev.map((group) => ({
        ...group,
        maintenanceList: group.maintenanceList.map((request) =>
          request.id === maintenance.id
            ? {
                ...request,
                status: "In Progress",
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : request
        ),
      }))
    );
    setConfirmModal({ open: false, maintenance: null });
  };

  const handleResolveSubmit = () => {
    const { maintenance, closingRemarks } = resolveModal;
    setMaintenance((prev) =>
      prev.map((group) => ({
        ...group,
        maintenanceList: group.maintenanceList.map((request) =>
          request.id === maintenance.id
            ? {
                ...request,
                status: "Completed",
                closingRemarks,
                completedDate: new Date().toISOString().split("T")[0],
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : request
        ),
      }))
    );
    setResolveModal({ open: false, maintenance: null, closingRemarks: "" });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <Card className="p-4 bg-white border-0 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Bar */}
          <div className="flex items-center flex-1 gap-3 px-4 py-2 transition-shadow bg-gray-100 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, property, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="relative w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 pr-10 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Categories">All Categories</option>
                {maintenanceCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2" />
            </div>

            {/* Status Filter */}
            <div className="relative w-40">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 pr-10 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Status">All Status</option>
                {maintenanceStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.value}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2" />
            </div>

            {/* Priority Filter */}
            <div className="relative w-40">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-4 py-2 pr-10 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Priorities">All Priorities</option>
                {priorityLevels.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.value}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Content Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Maintenance Requests
        </h2>

        {displayedMaintenance.length === 0 ? (
          <Card className="p-8 text-center bg-white border-0 shadow-sm">
            <Wrench className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No maintenance requests found.</p>
          </Card>
        ) : (
          <Card className="overflow-hidden border-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Request
                    </th>
                    {isPropertyManager && (
                      <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Landlord
                      </th>
                    )}
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Property
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Remarks
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedMaintenance.map((request, index) => (
                    <tr
                      key={request.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors duration-150`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.title}
                          </div>
                          <div className="max-w-xs text-sm text-gray-500 truncate">
                            {request.description}
                          </div>
                          <div className="flex items-center mt-1">
                            <User className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {request.tenantName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {isPropertyManager && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900">
                              {request.landlordName}
                            </div>
                          </div>
                        </td>
                      )}

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <Building className="w-4 h-4 mr-2 text-gray-400" /> */}
                          <div className="text-sm text-gray-900">
                            {request.propertyName}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                          {request.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityStyle(
                            request.priority
                          )}`}
                        >
                          {request.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                            request.status
                          )}`}
                        >
                          {getStatusIcon(request.status)}
                          {request.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {request.requestedDate}
                          </span>
                        </div>
                        {request.estimatedCost && (
                          <div className="flex items-center mt-1">
                            <DirhamSvg className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {request.estimatedCost}
                            </span>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {request.status === "Pending" && (
                            <button
                              onClick={() => handleAssign(request)}
                              className="px-3 py-1 text-xs text-white transition-colors bg-orange-600 rounded hover:bg-orange-700"
                            >
                              Assign
                            </button>
                          )}
                          {request.status === "Open" && (
                            <button
                              onClick={() => handleConfirm(request)}
                              className="px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                            >
                              Confirm
                            </button>
                          )}
                          {request.status === "In Progress" && (
                            <button
                              onClick={() => handleResolve(request)}
                              className="px-3 py-1 text-xs text-white transition-colors bg-green-600 rounded hover:bg-green-700"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => handleViewMaintenance(request)}
                          className="p-1 text-gray-500 transition-colors rounded hover:text-blue-600 hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditMaintenance(request)}
                          className="p-1 text-gray-500 transition-colors rounded hover:text-blue-600 hover:bg-blue-50"
                          title="Edit Request"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteMaintenance(request)}
                          className="p-1 text-gray-500 transition-colors rounded hover:text-red-600 hover:bg-red-50"
                          title="Delete Request"
                        >
                          <Trash2 size={16} />
                        </button>
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
      <ViewMaintenanceModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, maintenance: null })}
        maintenance={viewModal.maintenance}
      />

      <EditMaintenanceModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, maintenance: null })}
        maintenance={editModal.maintenance}
        onUpdateMaintenance={handleUpdateMaintenance}
      />

      {/* Updated Assign Modal */}
      <Dialog
        open={assignModal.open}
        onOpenChange={() =>
          setAssignModal({
            open: false,
            maintenance: null,
            selectedTechnician: null,
            remarks: "",
          })
        }
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Assign Maintenance Request
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select Technician
                </label>
                <div className="space-y-2 overflow-y-auto max-h-60">
                  {techniciansList
                    .filter(
                      (tech) =>
                        tech.specialization.includes(
                          assignModal.maintenance?.category
                        ) && tech.availability === "Available"
                    )
                    .map((technician) => (
                      <div
                        key={technician.id}
                        onClick={() =>
                          setAssignModal((prev) => ({
                            ...prev,
                            selectedTechnician: technician,
                          }))
                        }
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          assignModal.selectedTechnician?.id === technician.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {technician.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {technician.specialization.join(", ")}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">
                                {technician.rating}
                              </span>
                            </div> */}
                            {/* <span className="text-sm text-gray-500">
                              ({technician.completedJobs} jobs)
                            </span> */}
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>{technician.email}</p>
                          <p>{technician.phone}</p>
                        </div>
                      </div>
                    ))}
                </div>
                {techniciansList.filter(
                  (tech) =>
                    tech.specialization.includes(
                      assignModal.maintenance?.category
                    ) && tech.availability === "Available"
                ).length === 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    No available technicians found for this category.
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <textarea
                  value={assignModal.remarks}
                  onChange={(e) =>
                    setAssignModal((prev) => ({
                      ...prev,
                      remarks: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add any additional remarks..."
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() =>
                  setAssignModal({
                    open: false,
                    maintenance: null,
                    selectedTechnician: null,
                    remarks: "",
                  })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignSubmit}
                disabled={!assignModal.selectedTechnician}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Modal */}
      <Dialog
        open={confirmModal.open}
        onOpenChange={() => setConfirmModal({ open: false, maintenance: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Confirm Action
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to confirm this action? This will mark the
              maintenance request as in progress.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  setConfirmModal({ open: false, maintenance: null })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resolve Modal */}
      <Dialog
        open={resolveModal.open}
        onOpenChange={() =>
          setResolveModal({
            open: false,
            maintenance: null,
            closingRemarks: "",
          })
        }
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Resolve Maintenance Request
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Closing Remarks
                </label>
                <textarea
                  value={resolveModal.closingRemarks}
                  onChange={(e) =>
                    setResolveModal((prev) => ({
                      ...prev,
                      closingRemarks: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add closing remarks..."
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() =>
                  setResolveModal({
                    open: false,
                    maintenance: null,
                    closingRemarks: "",
                  })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleResolveSubmit}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={() => setDeleteModal({ open: false, maintenance: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Delete Maintenance Request
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the maintenance request "
              <strong>{deleteModal.maintenance?.title}</strong>"? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  setDeleteModal({ open: false, maintenance: null })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleConfirmDelete(deleteModal.maintenance);
                  setDeleteModal({ open: false, maintenance: null });
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

export default MaintenanceBody;
