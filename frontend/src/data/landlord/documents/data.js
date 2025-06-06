export const documentsData = [
  {
    id: 1,
    documentsList: [
      {
        id: 1,
        filename: "Marina_Villa_Lease_Agreement.pdf",
        originalName: "Marina Villa Lease Agreement",
        fileType: "pdf",
        fileSize: 2456789, // bytes
        category: "Contracts",
        propertyName: "Marina View Villa",
        propertyId: 1,
        uploadDate: "2024-06-01",
        lastModified: "2024-06-01",
        uploadedBy: "Property Manager",
        description: "Main lease agreement for Marina View Villa",
        tags: ["lease", "contract", "marina", "villa"],
        expiryDate: "2025-06-01",
        version: 1,
        isActive: true,
        downloadCount: 5,
        fileUrl: "/documents/marina_villa_lease.pdf",
        thumbnailUrl: "/thumbnails/marina_villa_lease.jpg",
        isShared: false,
        shareLink: null,
        shareExpiry: null,
        isPasswordProtected: false,
        password: null,
      },
      {
        id: 2,
        filename: "Property_Insurance_Policy_2024.pdf",
        originalName: "Property Insurance Policy 2024",
        fileType: "pdf",
        fileSize: 1234567,
        category: "Insurance",
        propertyName: "Marina View Villa",
        propertyId: 1,
        uploadDate: "2024-05-15",
        lastModified: "2024-05-15",
        uploadedBy: "Property Manager",
        description: "Annual property insurance policy document",
        tags: ["insurance", "policy", "2024", "coverage"],
        expiryDate: "2025-05-15",
        version: 1,
        isActive: true,
        downloadCount: 3,
        fileUrl: "/documents/insurance_policy_2024.pdf",
        thumbnailUrl: "/thumbnails/insurance_policy.jpg",
        isShared: true,
        shareLink: "https://vault.propertyharmony.com/share/abc123",
        shareExpiry: "2024-12-31",
        isPasswordProtected: true,
        password: "secure123",
      },
      {
        id: 3,
        filename: "Maintenance_Receipt_June_2024.jpg",
        originalName: "Maintenance Receipt June 2024",
        fileType: "jpg",
        fileSize: 987654,
        category: "Receipts",
        propertyName: "Sunset Apartments",
        propertyId: 2,
        uploadDate: "2024-06-10",
        lastModified: "2024-06-10",
        uploadedBy: "Property Manager",
        description: "Plumbing repair receipt for June 2024",
        tags: ["receipt", "maintenance", "plumbing", "june"],
        expiryDate: null,
        version: 1,
        isActive: true,
        downloadCount: 1,
        fileUrl: "/documents/maintenance_receipt_june.jpg",
        thumbnailUrl: "/thumbnails/maintenance_receipt.jpg",
        isShared: false,
        shareLink: null,
        shareExpiry: null,
        isPasswordProtected: false,
        password: null,
      },
      {
        id: 4,
        filename: "Property_Photos_Marina_Villa.zip",
        originalName: "Property Photos Marina Villa",
        fileType: "zip",
        fileSize: 15678901,
        category: "Property Photos",
        propertyName: "Marina View Villa",
        propertyId: 1,
        uploadDate: "2024-04-20",
        lastModified: "2024-04-20",
        uploadedBy: "Property Manager",
        description: "Complete photo collection of Marina View Villa",
        tags: ["photos", "marina", "villa", "property"],
        expiryDate: null,
        version: 2,
        isActive: true,
        downloadCount: 8,
        fileUrl: "/documents/property_photos_marina.zip",
        thumbnailUrl: "/thumbnails/property_photos.jpg",
        isShared: true,
        shareLink: "https://vault.propertyharmony.com/share/def456",
        shareExpiry: "2024-12-31",
        isPasswordProtected: false,
        password: null,
      },
      {
        id: 5,
        filename: "Legal_Notice_Tenant_Default.docx",
        originalName: "Legal Notice Tenant Default",
        fileType: "docx",
        fileSize: 456789,
        category: "Legal Documents",
        propertyName: "Business Bay Tower",
        propertyId: 3,
        uploadDate: "2024-05-30",
        lastModified: "2024-05-30",
        uploadedBy: "Legal Team",
        description: "Legal notice for tenant default case",
        tags: ["legal", "notice", "tenant", "default"],
        expiryDate: "2024-12-30",
        version: 1,
        isActive: true,
        downloadCount: 2,
        fileUrl: "/documents/legal_notice_default.docx",
        thumbnailUrl: "/thumbnails/legal_document.jpg",
        isShared: false,
        shareLink: null,
        shareExpiry: null,
        isPasswordProtected: true,
        password: "legal2024",
      },
      {
        id: 6,
        filename: "Monthly_Invoice_May_2024.xlsx",
        originalName: "Monthly Invoice May 2024",
        fileType: "xlsx",
        fileSize: 234567,
        category: "Invoices",
        propertyName: "Sunset Apartments",
        propertyId: 2,
        uploadDate: "2024-05-31",
        lastModified: "2024-05-31",
        uploadedBy: "Accounting",
        description: "Monthly service invoice for May 2024",
        tags: ["invoice", "monthly", "may", "2024"],
        expiryDate: null,
        version: 1,
        isActive: true,
        downloadCount: 4,
        fileUrl: "/documents/monthly_invoice_may.xlsx",
        thumbnailUrl: "/thumbnails/invoice.jpg",
        isShared: false,
        shareLink: null,
        shareExpiry: null,
        isPasswordProtected: false,
        password: null,
      },
    ],
  },
];

// Document categories
export const documentCategories = [
  "All Categories",
  "Contracts",
  "Invoices",
  "Receipts",
  "Legal Documents",
  "Property Photos",
  "Insurance",
  "Maintenance Records",
  "Financial Reports",
  "Tenant Documents",
  "Compliance Documents",
  "Other",
];

// Supported file types
export const supportedFileTypes = {
  documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  spreadsheets: [".xls", ".xlsx", ".csv"],
  images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"],
  archives: [".zip", ".rar", ".7z"],
  presentations: [".ppt", ".pptx"],
  other: [".xml", ".json"],
};

// Default document template
export const defaultDocument = {
  filename: "",
  originalName: "",
  fileType: "",
  fileSize: 0,
  category: "Other",
  propertyName: "",
  propertyId: null,
  description: "",
  tags: [],
  expiryDate: null,
  version: 1,
  isActive: true,
  isPasswordProtected: false,
  password: null,
};

// Utility functions
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileIcon = (fileType) => {
  const type = fileType.toLowerCase();
  if (["pdf"].includes(type)) return "FileText";
  if (["doc", "docx"].includes(type)) return "FileText";
  if (["xls", "xlsx", "csv"].includes(type)) return "FileSpreadsheet";
  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(type))
    return "Image";
  if (["zip", "rar", "7z"].includes(type)) return "Archive";
  if (["ppt", "pptx"].includes(type)) return "Presentation";
  return "File";
};

export const getFileTypeColor = (fileType) => {
  const type = fileType.toLowerCase();
  if (["pdf"].includes(type)) return "text-red-600";
  if (["doc", "docx"].includes(type)) return "text-blue-600";
  if (["xls", "xlsx", "csv"].includes(type)) return "text-green-600";
  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(type))
    return "text-purple-600";
  if (["zip", "rar", "7z"].includes(type)) return "text-orange-600";
  if (["ppt", "pptx"].includes(type)) return "text-yellow-600";
  return "text-gray-600";
};

export const isImageFile = (fileType) => {
  return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
    fileType.toLowerCase()
  );
};

export const isPreviewable = (fileType) => {
  return ["pdf", "jpg", "jpeg", "png", "gif", "bmp", "webp", "txt"].includes(
    fileType.toLowerCase()
  );
};

// Storage analytics
export const calculateStorageStats = (documents) => {
  const allDocs = documents.flatMap((group) => group.documentsList);

  const totalSize = allDocs.reduce((sum, doc) => sum + doc.fileSize, 0);
  const totalFiles = allDocs.length;

  const categoryStats = {};
  const typeStats = {};

  allDocs.forEach((doc) => {
    // Category stats
    if (!categoryStats[doc.category]) {
      categoryStats[doc.category] = { count: 0, size: 0 };
    }
    categoryStats[doc.category].count++;
    categoryStats[doc.category].size += doc.fileSize;

    // Type stats
    if (!typeStats[doc.fileType]) {
      typeStats[doc.fileType] = { count: 0, size: 0 };
    }
    typeStats[doc.fileType].count++;
    typeStats[doc.fileType].size += doc.fileSize;
  });

  return {
    totalSize,
    totalFiles,
    categoryStats,
    typeStats,
    averageFileSize: totalFiles > 0 ? totalSize / totalFiles : 0,
  };
};

// Search and filter functions
export const searchDocuments = (documents, searchTerm) => {
  if (!searchTerm) return documents;

  const term = searchTerm.toLowerCase();
  return documents.map((group) => ({
    ...group,
    documentsList: group.documentsList.filter(
      (doc) =>
        doc.filename.toLowerCase().includes(term) ||
        doc.originalName.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        doc.category.toLowerCase().includes(term) ||
        doc.propertyName.toLowerCase().includes(term) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(term))
    ),
  }));
};

export const filterDocuments = (documents, filters) => {
  return documents.map((group) => ({
    ...group,
    documentsList: group.documentsList.filter((doc) => {
      const categoryMatch =
        !filters.category ||
        filters.category === "All Categories" ||
        doc.category === filters.category;
      const propertyMatch =
        !filters.property ||
        filters.property === "All Properties" ||
        doc.propertyName === filters.property;
      const typeMatch =
        !filters.fileType ||
        filters.fileType === "All Types" ||
        doc.fileType === filters.fileType;

      let dateMatch = true;
      if (filters.dateFrom) {
        dateMatch =
          dateMatch && new Date(doc.uploadDate) >= new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        dateMatch =
          dateMatch && new Date(doc.uploadDate) <= new Date(filters.dateTo);
      }

      return categoryMatch && propertyMatch && typeMatch && dateMatch;
    }),
  }));
};
