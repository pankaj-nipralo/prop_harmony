import React, { useState } from "react";
import FileExplorerHeader from "./FileExplorerHeader";
import FileExplorerStats from "./FileExplorerStats";
import FileExplorerBody from "./FileExplorerBody";
import DocumentUploadModal from "./DocumentUploadModal";
import DocumentFolderModal from "./DocumentFolderModal";
import DocumentPasswordModal from "./DocumentPasswordModal";
import { documentsData } from "@/data/landlord/documents/data";

// Mock properties data - in real app this would come from PropertyManager
const mockProperties = [
  { id: 1, name: "Marina View Villa" },
  { id: 2, name: "Sunset Apartments" },
  { id: 3, name: "Business Bay Tower" },
  { id: 4, name: "Downtown Residence" },
  { id: 5, name: "Palm Jumeirah Penthouse" },
];

const DocumentMaster = () => {
  const [documents, setDocuments] = useState(documentsData);
  const [uploadModal, setUploadModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState({
    open: false,
    document: null,
    onVerified: null,
  });
  const [filters, setFilters] = useState({
    categoryFilter: "All Categories",
    propertyFilter: "All Properties",
    search: "",
  });

  // File Explorer Navigation State
  const [currentPath, setCurrentPath] = useState([]);
  const [navigationHistory, setNavigationHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleUploadDocuments = (newDocuments) => {
    setDocuments((prev) => {
      const updatedDocuments = [...prev];

      // Find existing group or create new one
      let targetGroup = updatedDocuments.find((group) => group.id === 1);

      if (targetGroup) {
        targetGroup.documentsList.unshift(...newDocuments);
      } else {
        updatedDocuments.push({
          id: 1,
          documentsList: newDocuments,
        });
      }

      return updatedDocuments;
    });
  };

  const handleCreateFolder = (newFolder) => {
    // Add folder to documents as a special document type
    setDocuments((prev) => {
      const updatedDocuments = [...prev];

      // Find existing group or create new one
      let targetGroup = updatedDocuments.find((group) => group.id === 1);

      if (targetGroup) {
        targetGroup.documentsList.unshift({
          ...newFolder,
          fileType: "folder",
          fileSize: 0,
          filename: newFolder.name,
          originalName: newFolder.name,
          uploadDate: newFolder.createdDate,
          lastModified: newFolder.createdDate,
          uploadedBy: newFolder.createdBy,
          downloadCount: 0,
          fileUrl: null,
          thumbnailUrl: null,
          isShared: false,
          shareLink: null,
          shareExpiry: null,
          version: 1,
          isActive: true,
          tags: [],
        });
      }

      return updatedDocuments;
    });
  };

  const handleNewFolder = () => {
    setFolderModal(true);
  };

  const handlePasswordVerification = (document, onSuccess) => {
    setPasswordModal({
      open: true,
      document: document,
      onVerified: async (password) => {
        // Verify password
        if (document.password === password) {
          onSuccess();
          return true;
        }
        return false;
      },
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <FileExplorerHeader
          onNewUpload={() => setUploadModal(true)}
          onNewFolder={handleNewFolder}
          documents={documents}
          filters={filters}
          currentPath={currentPath}
          navigationHistory={navigationHistory}
          historyIndex={historyIndex}
          onNavigate={setCurrentPath}
          onHistoryChange={setNavigationHistory}
          onHistoryIndexChange={setHistoryIndex}
        />
        <FileExplorerStats documents={documents} currentPath={currentPath} />
        <FileExplorerBody
          documents={documents}
          setDocuments={setDocuments}
          filters={filters}
          setFilters={setFilters}
          properties={mockProperties}
          onPasswordVerification={handlePasswordVerification}
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <DocumentUploadModal
          open={uploadModal}
          onClose={() => setUploadModal(false)}
          onUploadDocuments={handleUploadDocuments}
          properties={mockProperties}
        />

        <DocumentFolderModal
          open={folderModal}
          onClose={() => setFolderModal(false)}
          onCreateFolder={handleCreateFolder}
          properties={mockProperties}
        />

        <DocumentPasswordModal
          open={passwordModal.open}
          onClose={() =>
            setPasswordModal({ open: false, document: null, onVerified: null })
          }
          onPasswordVerified={passwordModal.onVerified}
          documentName={passwordModal.document?.originalName}
          folderName={
            passwordModal.document?.fileType === "folder"
              ? passwordModal.document?.name
              : null
          }
        />
      </div>
    </div>
  );
};

export default DocumentMaster;
