import React, { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Upload,
  FileText,
  Image,
  Archive,
  File,
  Trash2,
  Plus,
  AlertCircle,
  Lock,
  Unlock,
} from "lucide-react";
import {
  documentCategories,
  supportedFileTypes,
  defaultDocument,
  formatFileSize,
  getFileIcon,
  getFileTypeColor,
} from "@/data/landlord/documents/data";

const DocumentUploadModal = ({
  open,
  onClose,
  onUploadDocuments,
  properties = [],
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      return {
        id: Date.now() + Math.random(),
        file: file,
        filename: file.name,
        originalName: file.name.split(".").slice(0, -1).join("."),
        fileType: fileExtension,
        fileSize: file.size,
        category: "Other",
        propertyName: "",
        propertyId: null,
        description: "",
        tags: [],
        expiryDate: "",
        isPasswordProtected: false,
        password: "",
        uploadProgress: 0,
        isValid: validateFile(file),
      };
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const validateFile = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const allSupportedTypes = Object.values(supportedFileTypes).flat();

    if (file.size > maxSize) {
      return { valid: false, error: "File size exceeds 50MB limit" };
    }

    if (!allSupportedTypes.includes(`.${fileExtension}`)) {
      return { valid: false, error: "File type not supported" };
    }

    return { valid: true, error: null };
  };

  const updateFileData = (fileId, field, value) => {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, [field]: value } : file
      )
    );
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleUpload = async () => {
    const validFiles = uploadedFiles.filter((file) => file.isValid.valid);

    if (validFiles.length === 0) {
      alert("No valid files to upload");
      return;
    }

    // Check if all required fields are filled
    const incompleteFiles = validFiles.filter(
      (file) =>
        !file.category ||
        file.category === "Other" ||
        !file.propertyName ||
        (file.isPasswordProtected && !file.password)
    );

    if (incompleteFiles.length > 0) {
      alert(
        "Please fill in all required fields including passwords for protected files"
      );
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload progress
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 20) {
          updateFileData(file.id, "uploadProgress", progress);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      // Create document objects
      const newDocuments = validFiles.map((file) => ({
        ...defaultDocument,
        id: Date.now() + Math.random(),
        filename: file.filename,
        originalName: file.originalName,
        fileType: file.fileType,
        fileSize: file.fileSize,
        category: file.category,
        propertyName: file.propertyName,
        propertyId: file.propertyId,
        description: file.description,
        tags: file.tags,
        expiryDate: file.expiryDate || null,
        isPasswordProtected: file.isPasswordProtected,
        password: file.isPasswordProtected ? file.password : null,
        uploadDate: new Date().toISOString().split("T")[0],
        lastModified: new Date().toISOString().split("T")[0],
        uploadedBy: "Property Manager",
        downloadCount: 0,
        fileUrl: `/documents/${file.filename}`,
        thumbnailUrl: `/thumbnails/${file.filename.split(".")[0]}.jpg`,
        isShared: false,
        shareLink: null,
        shareExpiry: null,
      }));

      onUploadDocuments(newDocuments);
      setUploadedFiles([]);
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const getIconComponent = (fileType) => {
    const iconName = getFileIcon(fileType);
    switch (iconName) {
      case "Image":
        return Image;
      case "Archive":
        return Archive;
      default:
        return FileText;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-6xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Upload className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Upload to File Manager
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 transition-colors rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Upload Area */}
          <Card className="p-8 mb-6 border-0 shadow-sm">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Drop files here or click to browse
              </h3>
              <p className="mb-4 text-gray-600">
                Support for PDF, DOC, XLS, images, and more. Max file size: 50MB
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 myButton"
              >
                <Plus size={18} className="mr-2" />
                Select Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.gif,.zip,.rar,.7z,.ppt,.pptx,.txt,.rtf"
              />
            </div>
          </Card>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Files to Upload ({uploadedFiles.length})
              </h3>
              <div className="space-y-4 overflow-y-auto max-h-96">
                {uploadedFiles.map((file) => {
                  const IconComponent = getIconComponent(file.fileType);
                  const colorClass = getFileTypeColor(file.fileType);

                  return (
                    <div
                      key={file.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <IconComponent className={`w-8 h-8 ${colorClass}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {file.filename}
                            </h4>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="p-1 text-gray-400 transition-colors cursor-pointer hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <p className="mb-3 text-xs text-gray-500">
                            {formatFileSize(file.fileSize)} •{" "}
                            {file.fileType.toUpperCase()}
                          </p>

                          {!file.isValid.valid && (
                            <div className="flex items-center gap-2 p-2 mb-3 rounded-md bg-red-50">
                              <AlertCircle className="w-4 h-4 text-red-600" />
                              <span className="text-xs text-red-600">
                                {file.isValid.error}
                              </span>
                            </div>
                          )}

                          {file.isValid.valid && (
                            <>
                              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                <div>
                                  <label className="block mb-1 text-xs font-medium text-gray-700">
                                    Category *
                                  </label>
                                  <select
                                    value={file.category}
                                    onChange={(e) =>
                                      updateFileData(
                                        file.id,
                                        "category",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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

                                <div>
                                  <label className="block mb-1 text-xs font-medium text-gray-700">
                                    Property *
                                  </label>
                                  <select
                                    value={file.propertyName}
                                    onChange={(e) => {
                                      const selectedProperty = properties.find(
                                        (p) => p.name === e.target.value
                                      );
                                      updateFileData(
                                        file.id,
                                        "propertyName",
                                        e.target.value
                                      );
                                      updateFileData(
                                        file.id,
                                        "propertyId",
                                        selectedProperty?.id || null
                                      );
                                    }}
                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  >
                                    <option value="">Select Property</option>
                                    {properties.map((property) => (
                                      <option
                                        key={property.id}
                                        value={property.name}
                                      >
                                        {property.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block mb-1 text-xs font-medium text-gray-700">
                                    Expiry Date
                                  </label>
                                  <input
                                    type="date"
                                    value={file.expiryDate}
                                    onChange={(e) =>
                                      updateFileData(
                                        file.id,
                                        "expiryDate",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </div>
                              </div>

                              {/* Password Protection */}
                              <div className="p-3 mt-3 rounded-md bg-gray-50">
                                <div className="flex items-center gap-2 mb-2">
                                  {file.isPasswordProtected ? (
                                    <Lock className="w-4 h-4 text-blue-600" />
                                  ) : (
                                    <Unlock className="w-4 h-4 text-gray-500" />
                                  )}
                                  <input
                                    type="checkbox"
                                    id={`password-${file.id}`}
                                    checked={file.isPasswordProtected}
                                    onChange={(e) =>
                                      updateFileData(
                                        file.id,
                                        "isPasswordProtected",
                                        e.target.checked
                                      )
                                    }
                                    className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <label
                                    htmlFor={`password-${file.id}`}
                                    className="text-xs font-medium text-gray-700"
                                  >
                                    Password protect this file
                                  </label>
                                </div>
                                {file.isPasswordProtected && (
                                  <div>
                                    <input
                                      type="password"
                                      value={file.password}
                                      onChange={(e) =>
                                        updateFileData(
                                          file.id,
                                          "password",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Enter password"
                                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                )}
                              </div>
                            </>
                          )}

                          {file.uploadProgress > 0 && (
                            <div className="mt-3">
                              <div className="flex justify-between mb-1 text-xs text-gray-600">
                                <span>Uploading...</span>
                                <span>{file.uploadProgress}%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                  className="h-2 transition-all duration-300 bg-blue-600 rounded-full"
                                  style={{ width: `${file.uploadProgress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upload Actions */}
              <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-gray-200">
                <button
                  onClick={onClose}
                  disabled={isUploading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={
                    isUploading ||
                    uploadedFiles.filter((f) => f.isValid.valid).length === 0
                  }
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUploading
                    ? "Uploading..."
                    : `Upload ${
                        uploadedFiles.filter((f) => f.isValid.valid).length
                      } Files`}
                </button>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadModal;
