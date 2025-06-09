import React from "react";
import { Card } from "@/components/ui/card";
import { FolderOpen, FileText, HardDrive, Share2 } from "lucide-react";
import { calculateStorageStats, formatFileSize } from "@/data/landlord/documents/data";

const DocumentStats = ({ documents }) => {
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

  // Calculate statistics
  const stats = calculateStorageStats(documents);
  const allDocuments = documents.flatMap(group => group.documentsList);
  
  // Count shared documents
  const sharedDocuments = allDocuments.filter(doc => doc.isShared).length;
  
  // Count categories
  const uniqueCategories = new Set(allDocuments.map(doc => doc.category)).size;
  
  // Calculate storage usage percentage (assuming 10GB limit)
  const storageLimit = 10 * 1024 * 1024 * 1024; // 10GB in bytes
  const storagePercentage = (stats.totalSize / storageLimit) * 100;

  const getStorageColor = (percentage) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-orange-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Documents */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Documents</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalFiles.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {uniqueCategories} categories
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </Card>

      {/* Storage Used */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Storage Used</p>
            <p className={`text-2xl font-bold ${getStorageColor(storagePercentage)}`}>
              {formatFileSize(stats.totalSize)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {storagePercentage.toFixed(1)}% of 10GB
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <HardDrive className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </Card>

      {/* Shared Documents */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Shared Documents</p>
            <p className="text-2xl font-bold text-gray-900">
              {sharedDocuments}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.totalFiles > 0 ? ((sharedDocuments / stats.totalFiles) * 100).toFixed(1) : 0}% of total
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Share2 className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </Card>

      {/* Average File Size */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average File Size</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatFileSize(stats.averageFileSize)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Per document
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DocumentStats;
