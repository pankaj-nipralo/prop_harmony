import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  inspectionTypes, 
  priorityLevels, 
  inspectorsList 
} from "@/data/landlord/propertyInspection/data";
import { tenantData } from "@/data/landlord/tenant/data";
import { Calendar, X } from "lucide-react";

const defaultForm = {
  propertyName: "",
  propertyAddress: "",
  tenantName: "",
  tenantEmail: "",
  tenantPhone: "",
  inspectorId: "",
  inspectorName: "",
  inspectionType: "",
  priority: "Medium",
  requestedDate: "",
  scheduledDate: "",
  notes: "",
};

const AddInspectionModal = ({ open, onClose, onAddInspection }) => {
  const [form, setForm] = useState(defaultForm);

  // Get all tenants for dropdown
  const allTenants = tenantData.flatMap(group => group.tenantsList);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Auto-populate tenant details when tenant is selected
    if (name === "tenantName" && value) {
      const selectedTenant = allTenants.find(t => t.name === value);
      if (selectedTenant) {
        setForm(prev => ({
          ...prev,
          tenantEmail: selectedTenant.email,
          tenantPhone: selectedTenant.phone,
          propertyName: selectedTenant.address.split(" Unit")[0] || selectedTenant.address,
          propertyAddress: selectedTenant.address,
        }));
      }
    }

    // Auto-populate inspector details when inspector is selected
    if (name === "inspectorId" && value) {
      const selectedInspector = inspectorsList.find(i => i.id.toString() === value);
      if (selectedInspector) {
        setForm(prev => ({
          ...prev,
          inspectorName: selectedInspector.name,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddInspection) {
      const newInspection = {
        ...form,
        id: Date.now(),
        inspectorId: parseInt(form.inspectorId),
        status: "Pending",
        completedDate: null,
        findings: [],
        overallCondition: null,
        recommendations: [],
        nextInspectionDate: null,
        photos: [],
        createdBy: "Property Manager",
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        areasInspected: [],
        inspectionDuration: null,
        reportGenerated: false,
        reportUrl: null,
        tags: [form.inspectionType.toLowerCase().replace(/\s+/g, '-')]
      };
      onAddInspection(newInspection);
    }
    setForm(defaultForm);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl max-h-[80vh] bg-white border-0 rounded-lg shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Create Inspection Request
            </h2> 
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Property Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Property Name *
              </label>
              <input
                name="propertyName"
                value={form.propertyName}
                onChange={handleChange}
                placeholder="Enter property name"
                required
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

            {/* Inspector */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Inspector *
              </label>
              <select
                name="inspectorId"
                value={form.inspectorId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select inspector...</option>
                {inspectorsList.map((inspector) => (
                  <option key={inspector.id} value={inspector.id}>
                    {inspector.name} - {inspector.specialization.join(", ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Inspection Type and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Inspection Type *
                </label>
                <select
                  name="inspectionType"
                  value={form.inspectionType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select inspection type...</option>
                  {inspectionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
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
            </div>

            {/* Requested Date */}
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

            {/* Notes */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional notes about the inspection"
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
                Create Request
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddInspectionModal;
