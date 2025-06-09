import React from "react";
import { Card } from "@/components/ui/card";
import { 
  FolderOpen, 
  FileText, 
  HardDrive, 
  Share2,
  Folder,
  Lock,
  Clock,
  Users
} from "lucide-react";
import { calculateStorageStats, formatFileSize } from "@/data/landlord/documents/data";

const FileExplorerStats = ({ documents, currentPath = [] }) => {
  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">No Data</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Get current folder documents
  const getCurrentFolderDocuments = () => {
    if (currentPath.length === 0) {
      // Root level - show all documents
      return documents.flatMap(group => group.documentsList);
    }
    
    // Navigate to current folder
    let currentDocuments = documents.flatMap(group => group.documentsList);
    
    // Filter documents in current path
    // This is a simplified version - in a real implementation, 
    // you'd have a proper folder structure
    return currentDocuments.filter(doc => {
      // For now, show all documents regardless of path
      // In a real implementation, you'd filter by folder hierarchy
      return true;
    });
  };

  const currentFolderDocuments = getCurrentFolderDocuments();
  const allDocuments = documents.flatMap(group => group.documentsList);
  
  // Calculate statistics for current folder
  const currentFolderStats = calculateStorageStats([{ documentsList: currentFolderDocuments }]);
  const totalStats = calculateStorageStats(documents);
  
  // Count different types in current folder
  const folderCount = currentFolderDocuments.filter(doc => doc.fileType === "folder").length;
  const fileCount = currentFolderDocuments.filter(doc => doc.fileType !== "folder").length;
  const sharedCount = currentFolderDocuments.filter(doc => doc.isShared).length;
  const protectedCount = currentFolderDocuments.filter(doc => doc.isPasswordProtected).length;
  
  // Calculate storage usage percentage (assuming 10GB limit)
  const storageLimit = 10 * 1024 * 1024 * 1024; // 10GB in bytes
  const storagePercentage = (totalStats.totalSize / storageLimit) * 100;

  const getStorageColor = (percentage) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-orange-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-green-600";
  };

  const isInFolder = currentPath.length > 0;
  const currentFolderName = isInFolder ? currentPath[currentPath.length - 1]?.name || "Current Folder" : "Root";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Current Folder Items */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {isInFolder ? "Items in Folder" : "Total Items"}
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {currentFolderDocuments.length.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {folderCount} folders, {fileCount} files
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            {isInFolder ? (
              <Folder className="w-6 h-6 text-blue-600" />
            ) : (
              <FileText className="w-6 h-6 text-blue-600" />
            )}
          </div>
        </div>
      </Card>

      {/* Storage Used */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {isInFolder ? "Folder Size" : "Total Storage"}
            </p>
            <p className={`text-2xl font-bold ${isInFolder ? "text-gray-900" : getStorageColor(storagePercentage)}`}>
              {formatFileSize(isInFolder ? currentFolderStats.totalSize : totalStats.totalSize)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {isInFolder 
                ? `${((currentFolderStats.totalSize / totalStats.totalSize) * 100).toFixed(1)}% of total`
                : `${storagePercentage.toFixed(1)}% of 10GB`
              }
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <HardDrive className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </Card>

      {/* Shared Items */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {isInFolder ? "Shared in Folder" : "Shared Items"}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {sharedCount}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {currentFolderDocuments.length > 0 
                ? `${((sharedCount / currentFolderDocuments.length) * 100).toFixed(1)}% of items`
                : "0% of items"
              }
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Share2 className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </Card>

      {/* Protected Items */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {isInFolder ? "Protected in Folder" : "Protected Items"}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {protectedCount}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {currentFolderDocuments.length > 0 
                ? `${((protectedCount / currentFolderDocuments.length) * 100).toFixed(1)}% secured`
                : "0% secured"
              }
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Lock className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FileExplorerStats;
