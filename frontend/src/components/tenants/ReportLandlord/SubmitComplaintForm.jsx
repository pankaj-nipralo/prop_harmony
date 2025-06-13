import React, { useState } from "react";
import { Upload, Send, RotateCcw, CheckCircle, X } from "lucide-react";

// Toast Component
const Toast = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed z-50 transition-all duration-300 ease-in-out transform top-4 right-4">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
        <CheckCircle className="flex-shrink-0 w-5 h-5" />
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-white transition-colors hover:text-green-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const SubmitComplaintForm = ({
  formData,
  setFormData,
  issueCategories = [],
  priorityLevels = [],
  onSubmit = () => {},
  onClear = () => {},
}) => {
  const [showToast, setShowToast] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      landlordName: "",
      propertyAddress: "",
      incidentDate: "",
      issueCategory: issueCategories[0].value, // Reset to first category
      priorityLevel: priorityLevels[0].value, // Reset to first priority
      subject: "",
      detailedDescription: "",
      evidence: null,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      evidence: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare complete form data for submission
    const submissionData = {
      landlordName: formData.landlordName,
      propertyAddress: formData.propertyAddress,
      incidentDate: formData.incidentDate,
      issueCategory: formData.issueCategory,
      priorityLevel: formData.priorityLevel,
      subject: formData.subject,
      detailedDescription: formData.detailedDescription,
      evidence: formData.evidence
        ? {
            name: formData.evidence.name,
            size: formData.evidence.size,
            type: formData.evidence.type,
            lastModified: formData.evidence.lastModified,
          }
        : null,
      submittedAt: new Date().toISOString(),
    };

    // Log complete form data to console
    console.log(
      "Report Submission Data:",
      JSON.stringify(submissionData, null, 2)
    );

    // Call the original onSubmit handler
    onSubmit(submissionData);

    // Reset the form
    resetForm();

    // Show success toast
    setShowToast(true);

    // Auto-dismiss toast after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleClear = () => {
    resetForm();
    onClear(); // Call the original onClear handler if needed
  };

  return (
    <>
      <Toast
        message="Report submitted successfully"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Submit Complaint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Landlord Name, Property Address, and Incident Date */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="landlordName"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Landlord Name *
              </label>
              <input
                type="text"
                id="landlordName"
                name="landlordName"
                value={formData.landlordName}
                onChange={handleInputChange}
                placeholder="Enter landlord's full name"
                className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="propertyAddress"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Property Address *
              </label>
              <input
                type="text"
                id="propertyAddress"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleInputChange}
                placeholder="Enter property address"
                className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="incidentDate"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Incident Date
              </label>
              <input
                type="date"
                id="incidentDate"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Row 2: Issue Category, Priority Level, and Subject */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="issueCategory"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Issue Category *
              </label>
              <select
                id="issueCategory"
                name="issueCategory"
                value={formData.issueCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {issueCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="priorityLevel"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Priority Level *
              </label>
              <select
                id="priorityLevel"
                name="priorityLevel"
                value={formData.priorityLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {priorityLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Brief summary of the issue"
                className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Row 3: Detailed Description */}
          <div>
            <label
              htmlFor="detailedDescription"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Detailed Description *
            </label>
            <textarea
              id="detailedDescription"
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleInputChange}
              placeholder="Provide a detailed description of the issue, including dates, times, and any relevant circumstances..."
              rows={4}
              className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Row 4: Evidence Upload */}
          <div>
            <label
              htmlFor="evidence"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Evidence (Optional)
            </label>
            <div
              className="p-4 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400"
              onClick={() => document.getElementById("evidence").click()}
            >
              <Upload className="w-6 h-6 mx-auto mb-1 text-gray-400" />
              <p className="mb-1 text-sm text-blue-500">
                Click to upload evidence
              </p>
              <p className="text-xs text-gray-500">
                Images, documents or other supporting files (Max 10MB)
              </p>
              <input
                type="file"
                id="evidence"
                name="evidence"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
              />
              {formData.evidence && (
                <p className="mt-2 text-sm text-green-600">
                  File selected: {formData.evidence.name}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2 justify-self-end w-100 sm:flex-row">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex-1"
            >
              <Send className="w-4 h-4" />
              Submit Report
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmitComplaintForm;
