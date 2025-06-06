import React, { useState } from "react";
import {
  FolderOpen,
  Plus,
  ChevronDown,
  Download,
  Upload,
  ArrowLeft,
  ArrowRight,
  Home,
  ChevronRight,
  Search,
  MoreHorizontal,
} from "lucide-react";
import {
  exportDocumentsToPDF,
  exportDocumentsToExcel,
} from "@/utils/documentExportUtils";

const FileExplorerHeader = ({
  onNewUpload,
  onNewFolder,
  documents,
  filters = {},
  currentPath = [],
  navigationHistory = [[]],
  historyIndex = 0,
  onNavigate,
  onHistoryChange,
  onHistoryIndexChange,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format) => {
    if (!documents || documents.length === 0) {
      alert("No document data available to export.");
      return;
    }

    setIsExporting(true);
    setShowExportMenu(false);

    try {
      let filename;

      if (format === "PDF") {
        filename = exportDocumentsToPDF(documents, filters);
      } else if (format === "Excel") {
        filename = exportDocumentsToExcel(documents, filters);
      }

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
      notification.textContent = `${format} export completed: ${filename}`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      console.error("Export error:", error);
      alert(`Failed to export ${format}. Please try again.`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      onHistoryIndexChange(newIndex);
      onNavigate(navigationHistory[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      const newIndex = historyIndex + 1;
      onHistoryIndexChange(newIndex);
      onNavigate(navigationHistory[newIndex]);
    }
  };

  const handleHome = () => {
    const newPath = [];
    onNavigate(newPath);
    
    // Add to history
    const newHistory = [...navigationHistory.slice(0, historyIndex + 1), newPath];
    onHistoryChange(newHistory);
    onHistoryIndexChange(newHistory.length - 1);
  };

  const handleBreadcrumbClick = (index) => {
    const newPath = currentPath.slice(0, index + 1);
    onNavigate(newPath);
    
    // Add to history
    const newHistory = [...navigationHistory.slice(0, historyIndex + 1), newPath];
    onHistoryChange(newHistory);
    onHistoryIndexChange(newHistory.length - 1);
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < navigationHistory.length - 1;

  return (
    <header className="space-y-4">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderOpen className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Vault</h1>
            <p className="text-gray-600 mt-1">
              File manager for your property documents
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium shadow-sm cursor-pointer ${
                isExporting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Download size={18} />
              {isExporting ? "Exporting..." : "Export"}
              <ChevronDown size={16} />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => handleExport("PDF")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-t-lg cursor-pointer"
                >
                  Export as PDF
                </button>
                <button
                  onClick={() => handleExport("Excel")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-b-lg cursor-pointer"
                >
                  Export as Excel
                </button>
              </div>
            )}
          </div>

          {/* New Folder Button */}
          <button
            onClick={onNewFolder}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium shadow-sm cursor-pointer"
          >
            <Plus size={18} />
            New Folder
          </button>

          {/* Upload Button */}
          <button
            onClick={onNewUpload}
            className="myButton flex items-center gap-2 px-6 py-3 shadow-lg hover:shadow-xl"
          >
            <Upload size={20} />
            Upload
          </button>
        </div>
      </div>

      {/* Navigation Toolbar */}
      <div className="flex items-center gap-4 p-4 bg-white border-0 rounded-lg shadow-sm">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            className={`p-2 rounded-lg transition-colors ${
              canGoBack
                ? "text-gray-700 hover:bg-gray-100 cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
            title="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={handleForward}
            disabled={!canGoForward}
            className={`p-2 rounded-lg transition-colors ${
              canGoForward
                ? "text-gray-700 hover:bg-gray-100 cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
            title="Forward"
          >
            <ArrowRight size={18} />
          </button>
          <button
            onClick={handleHome}
            className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            title="Home"
          >
            <Home size={18} />
          </button>
        </div>

        {/* Address Bar / Breadcrumb */}
        <div className="flex-1 flex items-center gap-1 px-3 py-2 bg-gray-50 rounded-lg">
          <button
            onClick={handleHome}
            className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
          >
            <Home size={14} />
            Root
          </button>
          
          {currentPath.map((folder, index) => (
            <React.Fragment key={index}>
              <ChevronRight size={14} className="text-gray-400" />
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className="px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
              >
                {folder.name || `Folder ${index + 1}`}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <Search size={18} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default FileExplorerHeader;
