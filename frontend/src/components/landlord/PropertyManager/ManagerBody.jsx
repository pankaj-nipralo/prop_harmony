import React, { useState } from "react";
import {
  Mail,
  Phone,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  Building,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-800",
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-800",
};

const emirates = [
  "All Emirates",
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];
const statusOptions = ["All Status", "Active", "Inactive"];

const EditManagerModal = ({ open, onClose, manager, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    joinedDate: "",
    status: "Active",
    rating: 4.5,
    propertiesManaged: 0,
    AssignedTo: "Dubai",
    EmiratesCovered: 0,
  });

  React.useEffect(() => {
    if (manager && open) {
      setForm({
        name: manager.name || "",
        email: manager.email || "",
        phone: manager.phone || "",
        address: manager.address || "",
        joinedDate: manager.joinedDate || "",
        status: manager.status || "Active",
        rating: manager.rating || 4.5,
        propertiesManaged: manager.propertiesManaged || 0,
        AssignedTo: manager.AssignedTo || "Dubai",
        EmiratesCovered: manager.EmiratesCovered || 0,
      });
    }
  }, [manager, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...manager,
        ...form,
        rating: parseFloat(form.rating),
        propertiesManaged: parseInt(form.propertiesManaged) || 0,
        EmiratesCovered: parseInt(form.EmiratesCovered) || 0,
      });
    }
    onClose();
  };

  if (!manager) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-xl bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Edit Property Manager
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="manager@example.com"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+971 50 123 4567"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Palm Street, Dubai"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Joined Date
                </label>
                <input
                  name="joinedDate"
                  type="date"
                  value={form.joinedDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Assigned Emirate
                </label>
                <select
                  name="AssignedTo"
                  value={form.AssignedTo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <input
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Properties Managed
                </label>
                <input
                  name="propertiesManaged"
                  type="number"
                  min="0"
                  value={form.propertiesManaged}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end col-span-2 pt-4 space-x-3 border-t border-gray-200">
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

const DeleteConfirmationDialog = ({ open, onClose, manager, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Delete Property Manager
          </h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete <strong>{manager?.name}</strong>?
            This action cannot be undone.
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
                onConfirm(manager);
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

const ManagerActionButtons = ({ manager, onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onEdit(manager)}
        className="p-2 text-gray-500 transition-colors rounded-lg hover:text-blue-600 hover:bg-blue-50"
        title="Edit Manager"
      >
        <Edit size={16} />
      </button>
      <button
        onClick={() => onDelete(manager)}
        className="p-2 text-gray-500 transition-colors rounded-lg hover:text-red-600 hover:bg-red-50"
        title="Delete Manager"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

const ManagerBody = ({ managers, setManagers }) => {
  const [search, setSearch] = useState("");
  const [emirateFilter, setEmirateFilter] = useState("All Emirates");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [editModal, setEditModal] = useState({ open: false, manager: null });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    manager: null,
  });

  if (!managers || !Array.isArray(managers) || managers.length === 0) {
    return <div className="text-gray-500">No managers found.</div>;
  }

  const handleEditManager = (manager) => {
    setEditModal({ open: true, manager });
  };

  const handleDeleteManager = (manager) => {
    setDeleteModal({ open: true, manager });
  };

  const handleSaveEdit = (updatedManager) => {
    setManagers((prev) =>
      prev.map((group) => ({
        ...group,
        managersList: group.managersList.map((manager) =>
          manager.id === updatedManager.id ? updatedManager : manager
        ),
      }))
    );
  };

  const handleConfirmDelete = (managerToDelete) => {
    setManagers((prev) =>
      prev.map((group) => ({
        ...group,
        managersList: group.managersList.filter(
          (manager) => manager.id !== managerToDelete.id
        ),
      }))
    );
  };

  // Flatten all managers
  const allManagers = managers.flatMap((group) => group.managersList);

  // Filter managers by emirate and status
  const filteredManagers = allManagers.filter((manager) => {
    const emirateMatch =
      emirateFilter === "All Emirates" || manager.AssignedTo === emirateFilter;
    const statusMatch =
      statusFilter === "All Status" || manager.status === statusFilter;
    return emirateMatch && statusMatch;
  });

  // Search managers
  const displayedManagers = filteredManagers.filter((manager) => {
    const q = search.toLowerCase();
    return (
      manager.name.toLowerCase().includes(q) ||
      manager.email.toLowerCase().includes(q) ||
      (manager.phone && manager.phone.toLowerCase().includes(q))
    );
  });

  return (
    <div className="mb-4">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Manage Property Managers
      </h2>

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 p-4 mb-6 bg-white shadow-sm md:flex-row md:items-center md:justify-between rounded-xl">
        <div className="flex items-center flex-1 gap-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search managers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <div className="relative">
            <select
              value={emirateFilter}
              onChange={(e) => setEmirateFilter(e.target.value)}
              className="px-4 py-2 pr-8 text-sm border border-gray-200 rounded-lg appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {emirates.map((emirate) => (
                <option key={emirate} value={emirate}>
                  {emirate}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 pr-8 text-sm border border-gray-200 rounded-lg appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
          </div>
        </div>
      </div>

      {/* Manager Cards Grid */}
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {displayedManagers.length === 0 ? (
          <div className="py-8 text-center text-gray-500 col-span-full">
            No managers found.
          </div>
        ) : (
          displayedManagers.map((manager) => (
            <div
              key={manager.id}
              className="w-full p-6 space-y-5 bg-white border border-gray-200 shadow-sm rounded-xl"
            >
              {/* Header: Avatar + Name + Status + Actions */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-blue-600 rounded-full">
                    {manager.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {manager.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 mt-1 inline-block rounded-full font-medium capitalize ${
                        statusStyles[manager.status] || statusStyles.inactive
                      }`}
                    >
                      {manager.status}
                    </span>
                  </div>
                </div>
                <ManagerActionButtons
                  manager={manager}
                  onEdit={handleEditManager}
                  onDelete={handleDeleteManager}
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-500" />
                  <span className="truncate">{manager.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-500" />
                  <span>{manager.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building size={14} className="text-gray-500" />
                  <span>
                    <strong>{manager.propertiesManaged || 0}</strong> Properties
                    Managed
                  </span>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="pt-4 mt-4 space-y-2 text-sm border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500">Assigned Emirates:</span>
                    <div className="font-medium text-gray-900">
                      {manager.AssignedTo}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Joined:{" "}
                  <span className="font-medium">{manager.joinedDate}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Manager Modal */}
      <EditManagerModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, manager: null })}
        manager={editModal.manager}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, manager: null })}
        manager={deleteModal.manager}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManagerBody;
