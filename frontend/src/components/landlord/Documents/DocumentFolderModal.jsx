import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { X, FolderPlus, Lock, Unlock } from "lucide-react";
import { documentCategories } from "@/data/landlord/documents/data";

const DocumentFolderModal = ({
  open,
  onClose,
  onCreateFolder,
  properties = [],
}) => {
  const [folderData, setFolderData] = useState({
    name: "",
    description: "",
    category: "Other",
    propertyName: "",
    propertyId: null,
    isPasswordProtected: false,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFolderData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!folderData.name.trim()) {
      newErrors.name = "Folder name is required";
    }

    if (!folderData.propertyName) {
      newErrors.propertyName = "Please select a property";
    }

    if (folderData.isPasswordProtected) {
      if (!folderData.password) {
        newErrors.password = "Password is required for protected folders";
      } else if (folderData.password.length < 4) {
        newErrors.password = "Password must be at least 4 characters";
      }

      if (folderData.password !== folderData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newFolder = {
      id: Date.now(),
      name: folderData.name,
      description: folderData.description,
      category: folderData.category,
      propertyName: folderData.propertyName,
      propertyId: folderData.propertyId,
      isPasswordProtected: folderData.isPasswordProtected,
      password: folderData.isPasswordProtected ? folderData.password : null,
      createdDate: new Date().toISOString().split("T")[0],
      createdBy: "Property Manager",
      documentCount: 0,
      type: "folder",
    };

    onCreateFolder(newFolder);

    // Reset form
    setFolderData({
      name: "",
      description: "",
      category: "Other",
      propertyName: "",
      propertyId: null,
      isPasswordProtected: false,
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    onClose();
  };

  const handlePropertyChange = (e) => {
    const selectedProperty = properties.find((p) => p.name === e.target.value);
    setFolderData((prev) => ({
      ...prev,
      propertyName: e.target.value,
      propertyId: selectedProperty?.id || null,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FolderPlus className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Create New Folder
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Folder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Folder Name *
              </label>
              <input
                name="name"
                value={folderData.name}
                onChange={handleChange}
                placeholder="e.g., Lease Agreements 2024"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={folderData.description}
                onChange={handleChange}
                placeholder="Optional description for this folder"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={folderData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {documentCategories
                  .filter((cat) => cat !== "All Categories")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>

            {/* Property */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property *
              </label>
              <select
                name="propertyName"
                value={folderData.propertyName}
                onChange={handlePropertyChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.propertyName ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.name}>
                    {property.name}
                  </option>
                ))}
              </select>
              {errors.propertyName && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.propertyName}
                </p>
              )}
            </div>

            {/* Password Protection */}
            <Card className="p-4 border-0 bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                {folderData.isPasswordProtected ? (
                  <Lock className="w-5 h-5 text-blue-600" />
                ) : (
                  <Unlock className="w-5 h-5 text-gray-500" />
                )}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPasswordProtected"
                    name="isPasswordProtected"
                    checked={folderData.isPasswordProtected}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isPasswordProtected"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Password protect this folder
                  </label>
                </div>
              </div>

              {folderData.isPasswordProtected && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={folderData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={folderData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">
                    Documents in this folder will require a password to view
                  </p>
                </div>
              )}
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button type="submit" className="myButton px-4 py-2 text-sm">
                <FolderPlus size={16} className="mr-2" />
                Create Folder
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentFolderModal;
