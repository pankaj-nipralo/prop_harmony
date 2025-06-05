import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  warningTypes,
  severityLevels,
  warningTemplates,
} from "@/data/landlord/issueWarning/data";
import { tenantData } from "@/data/landlord/tenant/data";
import { Send, Save } from "lucide-react";

const defaultForm = {
  recipientType: "tenant",
  recipientId: "",
  recipientName: "",
  recipientEmail: "",
  recipientPhone: "",
  property: "",
  warningType: "",
  severity: "Medium",
  subject: "",
  description: "",
  dueDate: "",
  templateId: "",
};

const AddWarningModal = ({ open, onClose, onAddWarning }) => {
  const [form, setForm] = useState(defaultForm);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Get all tenants for dropdown
  const allTenants = tenantData.flatMap((group) => group.tenantsList);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Auto-populate recipient details when tenant is selected
    if (name === "recipientId" && value) {
      const selectedTenant = allTenants.find((t) => t.id.toString() === value);
      if (selectedTenant) {
        setForm((prev) => ({
          ...prev,
          recipientName: selectedTenant.name,
          recipientEmail: selectedTenant.email,
          recipientPhone: selectedTenant.phone,
          property: selectedTenant.address,
        }));
      }
    }
  };

  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);

    if (templateId) {
      const template = warningTemplates.find(
        (t) => t.id.toString() === templateId
      );
      if (template) {
        setForm((prev) => ({
          ...prev,
          warningType: template.warningType,
          severity: template.severity,
          subject: template.subject,
          description: template.description,
        }));
      }
    }
  };

  const handleSubmit = (e, action = "send") => {
    e.preventDefault();
    if (onAddWarning) {
      const newWarning = {
        ...form,
        id: Date.now(),
        recipientId: parseInt(form.recipientId),
        issueDate: new Date().toISOString().split("T")[0],
        status: action === "draft" ? "Draft" : "Pending",
        createdBy: "Property Manager",
        createdById: 1,
        acknowledgmentDate: null,
        resolutionDate: null,
        resolutionNotes: "",
        escalationLevel: 0,
        isTemplate: false,
        tags: [form.warningType.toLowerCase().replace(/\s+/g, "_")],
        attachments: [],
        communicationHistory:
          action === "draft"
            ? []
            : [
                {
                  id: 1,
                  type: "warning_sent",
                  date: new Date().toISOString().split("T")[0],
                  message: "Warning sent to recipient",
                  sentBy: "System",
                },
              ],
      };
      onAddWarning(newWarning);
    }
    setForm(defaultForm);
    setSelectedTemplate("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full overflow-y-auto bg-white border-0 rounded-lg shadow-xl max-h-[80vh] max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[900px]">
        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Issue Warning
          </h2>

          <form className="grid grid-cols-2 gap-4">
            {/* Left Column - Warning Details */}
            <div className="space-y-3">
              <h3 className="mb-3 text-lg font-medium text-gray-700">
                Warning Details
              </h3>

              {/* Template Selection */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Use Template (Optional)
                </label>
                <select
                  value={selectedTemplate}
                  onChange={handleTemplateChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 "
                >
                  <option value="">Select a template...</option>
                  {warningTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Tenant */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Select Tenant *
                </label>
                <select
                  name="recipientId"
                  value={form.recipientId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 "
                >
                  <option value="">Choose tenant...</option>
                  {allTenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name} - {tenant.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* Warning Type */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Warning Type *
                </label>
                <select
                  name="warningType"
                  value={form.warningType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 "
                >
                  <option value="">Select warning type...</option>
                  {warningTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Severity Level *
                </label>
                <select
                  name="severity"
                  value={form.severity}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 "
                >
                  {severityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Enter warning subject"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Response Due Date
                </label>
                <input
                  name="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail..."
                  required
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
              </div>
            </div>

            {/* Right Column - Warning Preview */}
            <div className="space-y-3">
              <h3 className="mb-3 text-lg font-medium text-gray-700">
                Warning Preview
              </h3>

              <div className="p-3 shadow-xl rounded-xl bg-gray-50">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      To:{" "}
                    </span>
                    <span className="text-sm text-gray-800">
                      {form.recipientName || "Select tenant"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Property:{" "}
                    </span>
                    <span className="text-sm text-gray-800">
                      {form.property || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Warning Type:{" "}
                    </span>
                    <span className="text-sm text-gray-800">
                      {form.warningType || "N/A"}
                    </span>
                  </div>
                  {form.severity && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Severity:{" "}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          severityLevels.find((s) => s.value === form.severity)
                            ?.bgColor || "bg-gray-100"
                        } ${
                          severityLevels.find((s) => s.value === form.severity)
                            ?.textColor || "text-gray-700"
                        }`}
                      >
                        {form.severity}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-gray-200">
                  <h4 className="mb-1 text-sm font-medium text-gray-800">
                    {form.subject || "Subject"}
                  </h4>
                  <p className="overflow-y-auto text-sm text-gray-600 whitespace-pre-wrap max-h-85">
                    {form.description || "Description will appear here..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between col-span-2 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "draft")}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Save size={16} />
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "send")}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                >
                  <Send size={16} />
                  Send Warning
                </button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWarningModal;
