import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Image,
  Archive,
  Folder,
  Eye,
  Download,
  Trash2,
  Share2,
  Edit,
  Lock,
  Calendar,
  Building,
  Tag,
  Check,
} from "lucide-react";
import {
  formatFileSize,
  getFileIcon,
  getFileTypeColor,
} from "@/data/landlord/documents/data";

const FileExplorerGrid = ({
  documents,
  selectedItems = [],
  onDocumentClick,
  onFolderDoubleClick,
  onPasswordVerification,
  setDocuments,
  viewMode = "grid",
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

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

  const handleViewDocument = (document) => {
    if (document.isPasswordProtected && onPasswordVerification) {
      onPasswordVerification(document, () => {
        // Handle view logic
      });
    } else {
      // Handle view logic
    }
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

  const handleDeleteDocument = (document) => {
    if (confirm(`Are you sure you want to delete "${document.originalName}"?`)) {
      setDocuments((prev) =>
        prev.map((group) => ({
          ...group,
          documentsList: group.documentsList.filter(
            (doc) => doc.id !== document.id
          ),
        }))
      );
    }
  };

  const gridCols = viewMode === "tiles" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  const cardSize = viewMode === "tiles" ? "p-3" : "p-4";

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {documents.map((document) => {
        const IconComponent = getIconComponent(document.fileType);
        const colorClass = getFileTypeColor(document.fileType);
        const isSelected = selectedItems.includes(document.id);
        const isFolder = document.fileType === "folder";

        return (
          <Card
            key={document.id}
            className={`${cardSize} border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group relative ${
              isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
            onMouseEnter={() => setHoveredItem(document.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => onDocumentClick(document)}
            onDoubleClick={() => {
              if (isFolder) {
                onFolderDoubleClick(document);
              } else {
                handleViewDocument(document);
              }
            }}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-2 left-2 z-10">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-blue-500 border-blue-500"
                    : hoveredItem === document.id
                    ? "border-gray-400 bg-white"
                    : "border-transparent"
                }`}
              >
                {isSelected && <Check size={12} className="text-white" />}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 z-10">
              <div className={`flex items-center gap-1 transition-opacity ${
                hoveredItem === document.id ? "opacity-100" : "opacity-0"
              }`}>
                {!isFolder && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDocument(document);
                      }}
                      className="p-1 text-gray-500 bg-white rounded shadow-sm hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title="View"
                    >
                      <Eye size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadDocument(document);
                      }}
                      className="p-1 text-gray-500 bg-white rounded shadow-sm hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                      title="Download"
                    >
                      <Download size={12} />
                    </button>
                  </>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDocument(document);
                  }}
                  className="p-1 text-gray-500 bg-white rounded shadow-sm hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {/* File Icon and Name */}
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <IconComponent
                    className={`${viewMode === "tiles" ? "w-8 h-8" : "w-12 h-12"} ${colorClass}`}
                  />
                </div>
                <h3 className={`font-medium text-gray-900 ${viewMode === "tiles" ? "text-xs" : "text-sm"} line-clamp-2 mb-1`}>
                  {document.originalName}
                </h3>
                {!isFolder && (
                  <p className={`text-gray-500 ${viewMode === "tiles" ? "text-xs" : "text-xs"}`}>
                    {formatFileSize(document.fileSize)} • {document.fileType.toUpperCase()}
                  </p>
                )}
              </div>

              {/* Document Info - Only show in grid mode, not tiles */}
              {viewMode === "grid" && (
                <div className="space-y-1 text-xs">
                  {!isFolder && (
                    <>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Tag size={10} />
                        <span className="truncate">{document.category}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Building size={10} />
                        <span className="truncate">{document.propertyName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar size={10} />
                        <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </>
                  )}
                  
                  {/* Status Indicators */}
                  <div className="flex items-center gap-2 mt-2">
                    {document.isShared && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Share2 size={10} />
                        <span>Shared</span>
                      </div>
                    )}
                    {document.isPasswordProtected && (
                      <div className="flex items-center gap-1 text-orange-600">
                        <Lock size={10} />
                        <span>Protected</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Folder Info */}
              {isFolder && viewMode === "grid" && (
                <div className="text-xs text-gray-600 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span>{document.documentCount || 0} items</span>
                  </div>
                  {document.isPasswordProtected && (
                    <div className="flex items-center justify-center gap-1 mt-1 text-orange-600">
                      <Lock size={10} />
                      <span>Protected</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default FileExplorerGrid;
