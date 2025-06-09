import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Search,
  Filter,
  ChevronDown,
  Grid3X3,
  List,
  LayoutGrid,
  Rows3,
  SortAsc,
  SortDesc,
  FileText,
  Folder,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  Lock,
  MoreVertical,
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
import FileExplorerGrid from "./FileExplorerGrid";
import FileExplorerList from "./FileExplorerList";

const FileExplorerBody = ({
  documents,
  setDocuments,
  filters,
  setFilters,
  properties = [],
  onPasswordVerification,
  currentPath = [],
  setCurrentPath,
  selectedItems = [],
  setSelectedItems,
  viewMode = "grid",
  setViewMode,
  sortBy = "name",
  setSortBy,
  sortOrder = "asc",
  setSortOrder,
}) => {
  const [search, setSearch] = useState(filters?.search || "");
  const [categoryFilter, setCategoryFilter] = useState(
    filters?.categoryFilter || "All Categories"
  );
  const [propertyFilter, setPropertyFilter] = useState(
    filters?.propertyFilter || "All Properties"
  );
  const [viewModal, setViewModal] = useState({
    open: false,
    document: null,
  });
  const [showSortMenu, setShowSortMenu] = useState(false);

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

  // Get current folder documents
  const getCurrentFolderDocuments = () => {
    if (currentPath.length === 0) {
      // Root level - show all documents
      return documents.flatMap(group => group.documentsList);
    }
    
    // In a real implementation, you'd navigate through folder hierarchy
    // For now, we'll show all documents
    return documents.flatMap(group => group.documentsList);
  };

  const currentFolderDocuments = getCurrentFolderDocuments();
  
  // Get unique properties for filter
  const uniqueProperties = [
    ...new Set(currentFolderDocuments.map((doc) => doc.propertyName)),
  ];

  // Apply filters and search
  let filteredDocuments = filterDocuments([{ documentsList: currentFolderDocuments }], {
    category: categoryFilter,
    property: propertyFilter,
  });

  filteredDocuments = searchDocuments(filteredDocuments, search);

  // Flatten filtered results
  let displayedDocuments = filteredDocuments.flatMap(
    (group) => group.documentsList
  );

  // Apply sorting
  displayedDocuments.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case "name":
        aValue = a.originalName.toLowerCase();
        bValue = b.originalName.toLowerCase();
        break;
      case "date":
        aValue = new Date(a.uploadDate);
        bValue = new Date(b.uploadDate);
        break;
      case "size":
        aValue = a.fileSize;
        bValue = b.fileSize;
        break;
      case "type":
        aValue = a.fileType.toLowerCase();
        bValue = b.fileType.toLowerCase();
        break;
      default:
        aValue = a.originalName.toLowerCase();
        bValue = b.originalName.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Separate folders and files
  const folders = displayedDocuments.filter(doc => doc.fileType === "folder");
  const files = displayedDocuments.filter(doc => doc.fileType !== "folder");
  
  // Show folders first, then files
  displayedDocuments = [...folders, ...files];

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
    setShowSortMenu(false);
  };

  const handleFolderDoubleClick = (folder) => {
    const newPath = [...currentPath, folder];
    setCurrentPath(newPath);
    setSelectedItems([]);
  };

  const handleDocumentClick = (document) => {
    if (selectedItems.includes(document.id)) {
      setSelectedItems(selectedItems.filter(id => id !== document.id));
    } else {
      setSelectedItems([...selectedItems, document.id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === displayedDocuments.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(displayedDocuments.map(doc => doc.id));
    }
  };

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "date", label: "Date Modified" },
    { value: "size", label: "Size" },
    { value: "type", label: "Type" },
  ];

  const viewModes = [
    { value: "grid", icon: Grid3X3, label: "Grid" },
    { value: "list", icon: List, label: "List" },
    { value: "tiles", icon: LayoutGrid, label: "Tiles" },
    { value: "details", icon: Rows3, label: "Details" },
  ];

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card className="p-4 border-0 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search and Filters */}
          <div className="flex items-center flex-1 gap-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search in current folder..."
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

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
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
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                {sortOrder === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
                Sort
                <ChevronDown size={14} />
              </button>

              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSort(option.value)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer ${
                        sortBy === option.value ? "bg-blue-50 text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {viewModes.map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.value}
                    onClick={() => setViewMode(mode.value)}
                    className={`p-2 rounded-md transition-colors cursor-pointer ${
                      viewMode === mode.value
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    title={mode.label}
                  >
                    <IconComponent size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* File Explorer Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {displayedDocuments.length} items
            </h2>
            {selectedItems.length > 0 && (
              <span className="text-sm text-blue-600">
                {selectedItems.length} selected
              </span>
            )}
          </div>
          
          {displayedDocuments.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              {selectedItems.length === displayedDocuments.length ? "Deselect All" : "Select All"}
            </button>
          )}
        </div>

        {displayedDocuments.length === 0 ? (
          <Card className="p-8 text-center border-0 shadow-sm">
            <Folder className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">
              This folder is empty.
            </p>
          </Card>
        ) : viewMode === "grid" || viewMode === "tiles" ? (
          <FileExplorerGrid
            documents={displayedDocuments}
            selectedItems={selectedItems}
            onDocumentClick={handleDocumentClick}
            onFolderDoubleClick={handleFolderDoubleClick}
            onPasswordVerification={onPasswordVerification}
            setDocuments={setDocuments}
            viewMode={viewMode}
          />
        ) : (
          <FileExplorerList
            documents={displayedDocuments}
            selectedItems={selectedItems}
            onDocumentClick={handleDocumentClick}
            onFolderDoubleClick={handleFolderDoubleClick}
            onPasswordVerification={onPasswordVerification}
            setDocuments={setDocuments}
            viewMode={viewMode}
          />
        )}
      </div>

      {/* View Modal */}
      <DocumentViewModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, document: null })}
        document={viewModal.document}
        onEdit={() => {}}
        onDelete={() => {}}
        onDownload={() => {}}
        onShare={() => {}}
      />
    </div>
  );
};

export default FileExplorerBody;
