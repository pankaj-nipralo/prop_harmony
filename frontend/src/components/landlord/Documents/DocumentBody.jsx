import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Search,
  Filter,
  ChevronDown,
  Grid3X3,
  List,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  FileText,
  Image,
  Archive,
  Calendar,
  Building,
  Tag,
  User,
  Folder,
  Lock,
} from "lucide-react";
import {
  documentCategories,
  formatFileSize,
  getFileIcon,
  getFileTypeColor,
  searchDocuments,
  filterDocuments,
} from "@/data/landlord/documents/data";
import DocumentViewModal from "./DocumentViewModal";

const DocumentBody = ({
  documents,
  setDocuments,
  filters,
  setFilters,
  properties = [],
  onPasswordVerification,
}) => {
  const [search, setSearch] = useState(filters?.search || "");
  const [categoryFilter, setCategoryFilter] = useState(
    filters?.categoryFilter || "All Categories"
  );
  const [propertyFilter, setPropertyFilter] = useState(
    filters?.propertyFilter || "All Properties"
  );
  const [viewMode, setViewMode] = useState("grid");
  const [viewModal, setViewModal] = useState({
    open: false,
    document: null,
  });
  const [editModal, setEditModal] = useState({
    open: false,
    document: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    document: null,
  });

  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center border-0 shadow-sm">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No documents found.</p>
        </Card>
      </div>
    );
  }

  // Flatten all documents
  const allDocuments = documents.flatMap((group) => group.documentsList);

  // Get unique properties for filter
  const uniqueProperties = [
    ...new Set(allDocuments.map((doc) => doc.propertyName)),
  ];

  // Apply filters and search
  let filteredDocuments = filterDocuments(documents, {
    category: categoryFilter,
    property: propertyFilter,
  });

  filteredDocuments = searchDocuments(filteredDocuments, search);

  // Flatten filtered results
  const displayedDocuments = filteredDocuments.flatMap(
    (group) => group.documentsList
  );

  const getIconComponent = (fileType) => {
    if (fileType === "folder") return Folder;

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

  // Handler functions
  const handleViewDocument = (document) => {
    if (document.isPasswordProtected && onPasswordVerification) {
      onPasswordVerification(document, () => {
        setViewModal({ open: true, document });
      });
    } else {
      setViewModal({ open: true, document });
    }
  };

  const handleEditDocument = (document) => {
    setEditModal({ open: true, document });
  };

  const handleDeleteDocument = (document) => {
    setDeleteModal({ open: true, document });
  };

  const handleDownloadDocument = (document) => {
    const performDownload = () => {
      try {
        // Create a blob URL for the file (simulated)
        const fileContent = `This is a simulated download of ${document.filename}`;
        const blob = new Blob([fileContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        // Create download link
        const link = document.createElement("a");
        link.href = url;
        link.download = document.filename;
        link.style.display = "none";

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(url);

        // Update download count
        setDocuments((prev) =>
          prev.map((group) => ({
            ...group,
            documentsList: group.documentsList.map((doc) =>
              doc.id === document.id
                ? { ...doc, downloadCount: doc.downloadCount + 1 }
                : doc
            ),
          }))
        );

        // Show success notification
        const notification = document.createElement("div");
        notification.className =
          "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
        notification.textContent = `Downloaded: ${document.filename}`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      } catch (error) {
        console.error("Download error:", error);
        alert("Failed to download file. Please try again.");
      }
    };

    // Check if password protected
    if (document.isPasswordProtected && onPasswordVerification) {
      onPasswordVerification(document, performDownload);
    } else {
      performDownload();
    }
  };

  const handleShareDocument = (document, shareSettings) => {
    // Generate share link
    const shareLink = `https://vault.propertyharmony.com/share/${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    setDocuments((prev) =>
      prev.map((group) => ({
        ...group,
        documentsList: group.documentsList.map((doc) =>
          doc.id === document.id
            ? {
                ...doc,
                isShared: true,
                shareLink: shareLink,
                shareExpiry: shareSettings.expiryDate || null,
              }
            : doc
        ),
      }))
    );
  };

  const handleConfirmDelete = (documentToDelete) => {
    setDocuments((prev) =>
      prev.map((group) => ({
        ...group,
        documentsList: group.documentsList.filter(
          (doc) => doc.id !== documentToDelete.id
        ),
      }))
    );
    setDeleteModal({ open: false, document: null });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <Card className="p-4 border-0 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center flex-1 gap-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (setFilters) {
                  setFilters((prev) => ({ ...prev, search: e.target.value }));
                }
              }}
              className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    if (setFilters) {
                      setFilters((prev) => ({
                        ...prev,
                        categoryFilter: e.target.value,
                      }));
                    }
                  }}
                  className="px-3 py-2 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {documentCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
              </div>
            </div>

            <div className="relative">
              <select
                value={propertyFilter}
                onChange={(e) => {
                  setPropertyFilter(e.target.value);
                  if (setFilters) {
                    setFilters((prev) => ({
                      ...prev,
                      propertyFilter: e.target.value,
                    }));
                  }
                }}
                className="px-3 py-2 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Properties">All Properties</option>
                {uniqueProperties.map((property) => (
                  <option key={property} value={property}>
                    {property}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Documents Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Documents ({displayedDocuments.length})
          </h2>
        </div>

        {displayedDocuments.length === 0 ? (
          <Card className="p-8 text-center border-0 shadow-sm">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">
              No documents found matching your criteria.
            </p>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedDocuments.map((document) => {
              const IconComponent = getIconComponent(document.fileType);
              const colorClass = getFileTypeColor(document.fileType);

              return (
                <Card
                  key={document.id}
                  className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="space-y-3">
                    {/* File Icon and Actions */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <IconComponent
                          className={`w-10 h-10 ${colorClass} mb-2`}
                        />
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                          {document.originalName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(document.fileSize)} •{" "}
                          {document.fileType.toUpperCase()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDocument(document);
                          }}
                          className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50"
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadDocument(document);
                          }}
                          className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-green-600 hover:bg-green-50"
                          title="Download"
                        >
                          <Download size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDocument(document);
                          }}
                          className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Document Info */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Tag size={12} />
                        <span>{document.category}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Building size={12} />
                        <span className="truncate">
                          {document.propertyName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar size={12} />
                        <span>
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                      {document.isShared && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Share2 size={12} />
                          <span>Shared</span>
                        </div>
                      )}
                      {document.isPasswordProtected && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <Lock size={12} />
                          <span>Protected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedDocuments.map((document) => {
                    const IconComponent = getIconComponent(document.fileType);
                    const colorClass = getFileTypeColor(document.fileType);

                    return (
                      <tr key={document.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <IconComponent
                              className={`w-6 h-6 ${colorClass} mr-3`}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">
                                  {document.originalName}
                                </span>
                                {document.isPasswordProtected && (
                                  <Lock
                                    size={14}
                                    className="text-orange-600"
                                    title="Password Protected"
                                  />
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {document.filename}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {document.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {document.propertyName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatFileSize(document.fileSize)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewDocument(document)}
                              className="text-blue-600 hover:text-blue-900 cursor-pointer"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDownloadDocument(document)}
                              className="text-green-600 hover:text-green-900 cursor-pointer"
                            >
                              <Download size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteDocument(document)}
                              className="text-red-600 hover:text-red-900 cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* View Modal */}
      <DocumentViewModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, document: null })}
        document={viewModal.document}
        onEdit={handleEditDocument}
        onDelete={handleDeleteDocument}
        onDownload={handleDownloadDocument}
        onShare={handleShareDocument}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={() => setDeleteModal({ open: false, document: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Delete Document
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete "
              <strong>{deleteModal.document?.originalName}</strong>"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModal({ open: false, document: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(deleteModal.document)}
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

export default DocumentBody;
