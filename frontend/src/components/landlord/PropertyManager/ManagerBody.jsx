import React, { useState } from "react";
import {
  Mail,
  Phone,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  Building,
  Shield,
  Key,
  MapPin,
  Calendar,
  Star,
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

const authorityOptions = [
  { id: "view_properties", label: "View Properties" },
  { id: "edit_properties", label: "Edit Properties" },
  { id: "manage_tenants", label: "Manage Tenants" },
  { id: "view_reports", label: "View Reports" },
  { id: "manage_payments", label: "Manage Payments" },
  { id: "manage_maintenance", label: "Manage Maintenance" },
];

const EditManagerModal = ({ open, onClose, manager, onSave, availableProperties }) => {
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
    assignedProperties: [],
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
        assignedProperties: manager.assignedProperties || [],
      });
    }
  }, [manager, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePropertyToggle = (propertyId) => {
    setForm((prev) => {
      const newAssignedProperties = prev.assignedProperties.includes(propertyId)
        ? prev.assignedProperties.filter((id) => id !== propertyId)
        : [...prev.assignedProperties, propertyId];
      
      return {
        ...prev,
        assignedProperties: newAssignedProperties,
        propertiesManaged: newAssignedProperties.length,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...manager,
        ...form,
        rating: parseFloat(form.rating),
        propertiesManaged: form.assignedProperties.length,
      });
    }
    onClose();
  };

  if (!manager) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-4xl bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Edit Property Manager
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <h3 className="mb-4 text-lg font-medium text-gray-900">Basic Information</h3>
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

            {/* Right Column - Additional Info & Properties */}
            <div className="space-y-4">
              <h3 className="mb-4 text-lg font-medium text-gray-900">Additional Information</h3>
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

              {/* Properties Assignment Section */}
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-medium text-gray-900">Assigned Properties</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 p-2 border border-gray-200 rounded-md">
                  {availableProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <input
                        type="checkbox"
                        id={`property-${property.id}`}
                        checked={form.assignedProperties.includes(property.id)}
                        onChange={() => handlePropertyToggle(property.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`property-${property.id}`}
                        className="flex-1 text-sm text-gray-700 cursor-pointer"
                      >
                        <div className="font-medium">{property.name}</div>
                        <div className="text-gray-500">{property.location}</div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {form.assignedProperties.length} properties assigned
                </div>
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
            Remove Property Manager
          </h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to remove <strong>{manager?.name}</strong>?
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
              Remove
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AssignPropertiesModal = ({ open, onClose, manager, onAssign, availableProperties }) => {
  const [selectedProperties, setSelectedProperties] = useState(
    manager?.assignedProperties || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign(manager.id, selectedProperties);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-xl bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Assign Properties to {manager?.name}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {availableProperties.map((property) => (
                <div key={property.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`property-${property.id}`}
                    checked={selectedProperties.includes(property.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProperties([...selectedProperties, property.id]);
                      } else {
                        setSelectedProperties(
                          selectedProperties.filter((id) => id !== property.id)
                        );
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`property-${property.id}`}
                    className="text-sm text-gray-700"
                  >
                    {property.name} - {property.location}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-gray-200">
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
                Assign Properties
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ManagerActionButtons = ({ manager, onEdit, onDelete, onAssignProperties }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowActions(!showActions)}
        className="p-2 text-gray-500 hover:text-gray-700"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
      {showActions && (
        <div className="absolute right-0 z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
          <button
            onClick={() => {
              onEdit(manager);
              setShowActions(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => {
              onAssignProperties(manager);
              setShowActions(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Building className="w-4 h-4 mr-2" />
            Assign Properties
          </button>
          <button
            onClick={() => {
              onDelete(manager);
              setShowActions(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

const ManagerBody = ({ 
  managers, 
  setManagers, 
  onAssignProperties, 
  onRemoveManager 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmirate, setSelectedEmirate] = useState("All Emirates");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [assignPropertiesModalOpen, setAssignPropertiesModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  // Mock available properties - replace with actual data from your backend
  const availableProperties = [
    { id: 1, name: "Palm Tower 1", location: "Dubai Marina" },
    { id: 2, name: "Burj Vista", location: "Downtown Dubai" },
    { id: 3, name: "Marina Gate", location: "Dubai Marina" },
  ];

  const handleEditManager = (manager) => {
    setSelectedManager(manager);
    setEditModalOpen(true);
  };

  const handleDeleteManager = (manager) => {
    setSelectedManager(manager);
    setDeleteModalOpen(true);
  };

  const handleAssignProperties = (manager) => {
    setSelectedManager(manager);
    setAssignPropertiesModalOpen(true);
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
    setEditModalOpen(false);
  };

  const handleConfirmDelete = (managerToDelete) => {
    onRemoveManager(managerToDelete.id);
    setDeleteModalOpen(false);
  };

  // Filter managers based on search term, emirate, and status
  const filteredManagers = managers.flatMap((group) =>
    group.managersList.filter((manager) => {
      const matchesSearch =
        manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEmirate =
        selectedEmirate === "All Emirates" ||
        manager.AssignedTo === selectedEmirate;
      const matchesStatus =
        selectedStatus === "All Status" || manager.status === selectedStatus;
      return matchesSearch && matchesEmirate && matchesStatus;
    })
  );

  return (
    <div className="mt-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 p-4 mb-6 bg-white rounded-lg shadow sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search managers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedEmirate}
          onChange={(e) => setSelectedEmirate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {emirates.map((emirate) => (
            <option key={emirate} value={emirate}>
              {emirate}
            </option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Managers List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager Details
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Properties
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredManagers.map((manager) => (
                <tr key={manager.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-lg font-medium text-blue-600">
                            {manager.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {manager.name}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {manager.AssignedTo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {manager.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {manager.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        Joined: {manager.joinedDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        {manager.propertiesManaged} Properties
                      </div>
                      <button
                        onClick={() => handleAssignProperties(manager)}
                        className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
                      >
                        <Building className="w-4 h-4 mr-1" />
                        Manage Properties
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                          statusStyles[manager.status]
                        }`}
                      >
                        {manager.status}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        {manager.rating} Rating
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEditManager(manager)}
                        className="p-1 text-gray-400 transition-colors rounded hover:text-blue-600 hover:bg-blue-50"
                        title="Edit Manager"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteManager(manager)}
                        className="p-1 text-gray-400 transition-colors rounded hover:text-red-600 hover:bg-red-50"
                        title="Remove Manager"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedManager && (
        <>
          <EditManagerModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            manager={selectedManager}
            onSave={handleSaveEdit}
            availableProperties={availableProperties}
          />
          <DeleteConfirmationDialog
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            manager={selectedManager}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
};

export default ManagerBody;
