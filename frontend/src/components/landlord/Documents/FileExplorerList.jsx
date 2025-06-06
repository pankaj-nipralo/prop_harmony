import React from "react";
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
  Check,
} from "lucide-react";
import {
  formatFileSize,
  getFileIcon,
  getFileTypeColor,
} from "@/data/landlord/documents/data";

const FileExplorerList = ({
  documents,
  selectedItems = [],
  onDocumentClick,
  onFolderDoubleClick,
  onPasswordVerification,
  setDocuments,
  viewMode = "list",
}) => {
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

  if (viewMode === "details") {
    return (
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={() => {}}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
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
                  Date Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((document) => {
                const IconComponent = getIconComponent(document.fileType);
                const colorClass = getFileTypeColor(document.fileType);
                const isSelected = selectedItems.includes(document.id);
                const isFolder = document.fileType === "folder";

                return (
                  <tr 
                    key={document.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${isSelected ? "bg-blue-50" : ""}`}
                    onClick={() => onDocumentClick(document)}
                    onDoubleClick={() => {
                      if (isFolder) {
                        onFolderDoubleClick(document);
                      } else {
                        handleViewDocument(document);
                      }
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <IconComponent className={`w-6 h-6 ${colorClass} mr-3`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {document.originalName}
                            </span>
                            {document.isPasswordProtected && (
                              <Lock size={14} className="text-orange-600" title="Password Protected" />
                            )}
                            {document.isShared && (
                              <Share2 size={14} className="text-blue-600" title="Shared" />
                            )}
                          </div>
                          {!isFolder && (
                            <div className="text-sm text-gray-500">
                              {document.filename}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {isFolder ? "Folder" : document.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {document.propertyName || "--"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {isFolder ? `${document.documentCount || 0} items` : formatFileSize(document.fileSize)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(document.uploadDate || document.createdDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {!isFolder && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDocument(document);
                              }}
                              className="text-blue-600 hover:text-blue-900 cursor-pointer"
                              title="View"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadDocument(document);
                              }}
                              className="text-green-600 hover:text-green-900 cursor-pointer"
                              title="Download"
                            >
                              <Download size={16} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDocument(document);
                          }}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          title="Delete"
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
    );
  }

  // List view
  return (
    <Card className="border-0 shadow-sm">
      <div className="divide-y divide-gray-200">
        {documents.map((document) => {
          const IconComponent = getIconComponent(document.fileType);
          const colorClass = getFileTypeColor(document.fileType);
          const isSelected = selectedItems.includes(document.id);
          const isFolder = document.fileType === "folder";

          return (
            <div
              key={document.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                isSelected ? "bg-blue-50" : ""
              }`}
              onClick={() => onDocumentClick(document)}
              onDoubleClick={() => {
                if (isFolder) {
                  onFolderDoubleClick(document);
                } else {
                  handleViewDocument(document);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* Icon */}
                  <IconComponent className={`w-8 h-8 ${colorClass} flex-shrink-0`} />

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {document.originalName}
                      </h3>
                      {document.isPasswordProtected && (
                        <Lock size={14} className="text-orange-600" title="Password Protected" />
                      )}
                      {document.isShared && (
                        <Share2 size={14} className="text-blue-600" title="Shared" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        {isFolder 
                          ? `${document.documentCount || 0} items` 
                          : `${formatFileSize(document.fileSize)} • ${document.fileType.toUpperCase()}`
                        }
                      </span>
                      <span>{document.category || "Folder"}</span>
                      <span>{new Date(document.uploadDate || document.createdDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!isFolder && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDocument(document);
                        }}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadDocument(document);
                        }}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors cursor-pointer"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDocument(document);
                    }}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default FileExplorerList;
