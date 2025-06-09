import React from "react";
import FileExplorerHeader from "./FileExplorerHeader";
import FileExplorerStats from "./FileExplorerStats";
import FileExplorerBody from "./FileExplorerBody";

// Test component to verify our file manager components work
const FileManagerTest = () => {
  const testDocuments = [
    {
      id: 1,
      documentsList: [
        {
          id: 1,
          filename: "test.pdf",
          originalName: "Test Document",
          fileType: "pdf",
          fileSize: 1024000,
          category: "Contracts",
          propertyName: "Test Property",
          propertyId: 1,
          uploadDate: "2024-01-01",
          lastModified: "2024-01-01",
          uploadedBy: "Test User",
          description: "Test document",
          tags: ["test"],
          expiryDate: null,
          version: 1,
          isActive: true,
          downloadCount: 0,
          fileUrl: "/test.pdf",
          thumbnailUrl: null,
          isShared: false,
          shareLink: null,
          shareExpiry: null,
          isPasswordProtected: false,
          password: null,
        },
        {
          id: 2,
          filename: "Test Folder",
          originalName: "Test Folder",
          fileType: "folder",
          fileSize: 0,
          category: "Other",
          propertyName: "",
          propertyId: null,
          uploadDate: "2024-01-01",
          lastModified: "2024-01-01",
          uploadedBy: "Test User",
          description: "Test folder",
          tags: [],
          expiryDate: null,
          version: 1,
          isActive: true,
          downloadCount: 0,
          fileUrl: null,
          thumbnailUrl: null,
          isShared: false,
          shareLink: null,
          shareExpiry: null,
          isPasswordProtected: false,
          password: null,
          documentCount: 0,
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">File Manager Test</h1>
        
        <FileExplorerHeader
          onNewUpload={() => console.log("Upload clicked")}
          onNewFolder={() => console.log("New folder clicked")}
          documents={testDocuments}
          filters={{}}
          currentPath={[]}
          navigationHistory={[[]]}
          historyIndex={0}
          onNavigate={() => {}}
          onHistoryChange={() => {}}
          onHistoryIndexChange={() => {}}
        />
        
        <FileExplorerStats 
          documents={testDocuments} 
          currentPath={[]}
        />
        
        <FileExplorerBody
          documents={testDocuments}
          setDocuments={() => {}}
          filters={{}}
          setFilters={() => {}}
          properties={[]}
          onPasswordVerification={() => {}}
          currentPath={[]}
          setCurrentPath={() => {}}
          selectedItems={[]}
          setSelectedItems={() => {}}
          viewMode="grid"
          setViewMode={() => {}}
          sortBy="name"
          setSortBy={() => {}}
          sortOrder="asc"
          setSortOrder={() => {}}
        />
      </div>
    </div>
  );
};

export default FileManagerTest;
