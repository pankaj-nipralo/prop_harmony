import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  maintenanceCategories,
  priorityLevels,
  techniciansList,
  maintenanceStatuses,
} from "@/data/landlord/maintenance/data";
import { tenantData } from "@/data/landlord/tenant/data";
import { Calendar, X } from "lucide-react";

const EditMaintenanceModal = ({
  open,
  onClose,
  maintenance,
  onUpdateMaintenance,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    propertyName: "",
    propertyAddress: "",
    tenantName: "",
    tenantEmail: "",
    tenantPhone: "",
    category: "",
    priority: "Medium",
    status: "Pending",
    assignedTechnician: "",
    technicianPhone: "",
    technicianEmail: "",
    estimatedCost: "",
    actualCost: "",
    requestedDate: "",
    completedDate: "",
    notes: "",
  });

  // Get all tenants for dropdown
  const allTenants = tenantData.flatMap((group) => group.tenantsList);

  // Populate form when maintenance prop changes
  useEffect(() => {
    if (maintenance) {
      setForm({
        title: maintenance.title || "",
        description: maintenance.description || "",
        propertyName: maintenance.propertyName || "",
        propertyAddress: maintenance.propertyAddress || "",
        tenantName: maintenance.tenantName || "",
        tenantEmail: maintenance.tenantEmail || "",
        tenantPhone: maintenance.tenantPhone || "",
        category: maintenance.category || "",
        priority: maintenance.priority || "Medium",
        status: maintenance.status || "Pending",
        assignedTechnician: maintenance.assignedTechnician || "",
        technicianPhone: maintenance.technicianPhone || "",
        technicianEmail: maintenance.technicianEmail || "",
        estimatedCost: maintenance.estimatedCost || "",
        actualCost: maintenance.actualCost || "",
        requestedDate: maintenance.requestedDate || "",
        completedDate: maintenance.completedDate || "",
        notes: maintenance.notes || "",
      });
    }
  }, [maintenance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Auto-populate tenant details when tenant is selected
    if (name === "tenantName" && value) {
      const selectedTenant = allTenants.find((t) => t.name === value);
      if (selectedTenant) {
        setForm((prev) => ({
          ...prev,
          tenantEmail: selectedTenant.email,
          tenantPhone: selectedTenant.phone,
          propertyName:
            selectedTenant.address.split(" Unit")[0] || selectedTenant.address,
          propertyAddress: selectedTenant.address,
        }));
      }
    }

    // Auto-populate technician details when technician is selected
    if (name === "assignedTechnician" && value) {
      const selectedTechnician = techniciansList.find((t) => t.name === value);
      if (selectedTechnician) {
        setForm((prev) => ({
          ...prev,
          technicianPhone: selectedTechnician.phone,
          technicianEmail: selectedTechnician.email,
        }));
      }
    }

    // Auto-set completion date when status changes to Completed
    if (name === "status" && value === "Completed" && !form.completedDate) {
      setForm((prev) => ({
        ...prev,
        completedDate: new Date().toISOString().split("T")[0],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdateMaintenance && maintenance) {
      const updatedMaintenance = {
        ...maintenance,
        ...form,
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      onUpdateMaintenance(updatedMaintenance);
    }
    onClose();
  };

  if (!maintenance) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-h-[90vh] overflow-y-auto bg-white border-0 rounded-lg shadow-xl md:max-w-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Maintenance Request
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Brief description of the issue"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Detailed description of the maintenance issue"
                required
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tenant Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tenant Name *
              </label>
              <select
                name="tenantName"
                value={form.tenantName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select tenant...</option>
                {allTenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.name}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category, Priority, and Status */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category...</option>
                  {maintenanceCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Priority *
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {maintenanceStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Assigned Technician */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Assigned Technician
              </label>
              <select
                name="assignedTechnician"
                value={form.assignedTechnician}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select technician...</option>
                {techniciansList.map((technician) => (
                  <option key={technician.id} value={technician.name}>
                    {technician.name} - {technician.specialization.join(", ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Dates and Costs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Requested Date *
                </label>
                <div className="relative">
                  <input
                    name="requestedDate"
                    type="date"
                    value={form.requestedDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Estimated Cost
                </label>
                <input
                  name="estimatedCost"
                  value={form.estimatedCost}
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Completion Date and Actual Cost (show only if status is Completed) */}
            {form.status === "Completed" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Completion Date
                  </label>
                  <div className="relative">
                    <input
                      name="completedDate"
                      type="date"
                      value={form.completedDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Actual Cost
                  </label>
                  <input
                    name="actualCost"
                    value={form.actualCost}
                    onChange={handleChange}
                    placeholder="450"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any additional information or special instructions"
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
              >
                Update Request
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMaintenanceModal;
