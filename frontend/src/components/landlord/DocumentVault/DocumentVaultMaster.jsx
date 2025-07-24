import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Upload,
  FolderPlus,
  Shield,
  Grid3X3,
  List,
  Folder,
  FileText,
  Image,
  Archive,
  Lock,
  Key,
  Trash2,
  ChevronRight,
  Search,
  Download,
} from "lucide-react";
import {
  formatFileSize,
  getFileIcon,
  getFileTypeColor,
} from "@/data/landlord/documents/data";

const DocumentVaultMaster = () => {
  // File manager state
  const [currentPath, setCurrentPath] = useState([]);
  // const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // Modal states
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [fileViewModal, setFileViewModal] = useState({
    open: false,
    file: null,
  });
  const [passwordModal, setPasswordModal] = useState({
    open: false,
    item: null,
    action: null,
  });
  const [passwordSetModal, setPasswordSetModal] = useState({
    open: false,
    item: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    item: null,
  });

  // File system structure
  const [fileSystem, setFileSystem] = useState({
    id: "root",
    name: "Root",
    type: "folder",
    isPasswordProtected: false,
    password: null,
    children: [
      {
        id: "agreements",
        name: "Agreements",
        type: "folder",
        isPasswordProtected: false,
        password: null,
        children: [
          {
            id: "file1",
            name: "Property Agreement.pdf",
            type: "file",
            fileType: "pdf",
            size: 2456789,
            uploadDate: "2024-06-01",
            isPasswordProtected: false,
            password: null,
          },
          {
            id: "file2",
            name: "Property Photo.jpg",
            type: "file",
            fileType: "jpg",
            size: 812030, // 812.03 KB as shown in the user's message
            uploadDate: "2024-06-15",
            isPasswordProtected: false,
            password: null,
          },
        ],
      },
      {
        id: "licenses",
        name: "Licenses",
        type: "folder",
        isPasswordProtected: true,
        password: "123456",
        children: [
          {
            id: "file3",
            name: "Building License.png",
            type: "file",
            fileType: "png",
            size: 1024000,
            uploadDate: "2024-05-20",
            isPasswordProtected: false,
            password: null,
          },
        ],
      },
      {
        id: "inspection-reports",
        name: "Inspection Reports",
        type: "folder",
        isPasswordProtected: false,
        password: null,
        children: [
          {
            id: "file4",
            name: "Inspection Photo 1.jpeg",
            type: "file",
            fileType: "jpeg",
            size: 945600,
            uploadDate: "2024-06-10",
            isPasswordProtected: false,
            password: null,
          },
          {
            id: "file5",
            name: "Inspection Report.pdf",
            type: "file",
            fileType: "pdf",
            size: 1856000,
            uploadDate: "2024-06-10",
            isPasswordProtected: false,
            password: null,
          },
        ],
      },
    ],
  });

  // Helper functions
  const getCurrentFolder = () => {
    let current = fileSystem;
    for (const pathItem of currentPath) {
      current = current.children.find((child) => child.id === pathItem);
      if (!current) return fileSystem;
    }
    return current;
  };

  const getFolderAtPath = (path) => {
    let current = fileSystem;
    for (const pathItem of path) {
      current = current.children.find((child) => child.id === pathItem);
      if (!current) return fileSystem;
    }
    return current;
  };

  const getCurrentItems = () => {
    const currentFolder = getCurrentFolder();
    if (!currentFolder || !currentFolder.children) return [];

    return currentFolder.children.filter((item) => {
      if (!search) return true;
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  };

  const navigateToFolder = (folderId) => {
    const folder = getCurrentItems().find(
      (item) => item.id === folderId && item.type === "folder"
    );
    if (!folder) return;

    if (folder.isPasswordProtected) {
      setPasswordModal({
        open: true,
        item: folder,
        action: () => {
          setCurrentPath([...currentPath, folderId]);
          setPasswordModal({ open: false, item: null, action: null });
        },
      });
    } else {
      setCurrentPath([...currentPath, folderId]);
    }
  };

  const navigateToPath = (index) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const getIconComponent = (item) => {
    if (item.type === "folder") {
      return item.isPasswordProtected ? Lock : Folder;
    }

    const iconName = getFileIcon(item.fileType);
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
  const handleItemClick = (item) => {
    if (item.type === "folder") {
      navigateToFolder(item.id);
    } else {
      handleViewFile(item);
    }
  };

  const handleViewFile = (file) => {
    const openFile = () => {
      // Check if it's an image file for preview
      if (
        file.fileType &&
        ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
          file.fileType.toLowerCase()
        )
      ) {
        // Use actual uploaded file URL if available, otherwise use sample URL
        const imageUrl = file.fileUrl || createSampleImageUrl(file);
        setFileViewModal({
          open: true,
          file: { ...file, imageUrl: imageUrl },
        });
      } else {
        // For other files, trigger download
        handleDownloadFile(file);
      }
    };

    if (file.isPasswordProtected) {
      setPasswordModal({
        open: true,
        item: file,
        action: () => {
          openFile();
          setPasswordModal({ open: false, item: null, action: null });
        },
      });
    } else {
      openFile();
    }
  };

  // Create a sample image URL for demo purposes
  const createSampleImageUrl = (file) => {
    // In a real application, this would be the actual file URL from your server
    // For demo purposes, we'll use a placeholder image service
    const width = 800;
    const height = 600;
    const seed = file.name.replace(/[^a-zA-Z0-9]/g, ""); // Use filename as seed for consistent images

    // Using picsum.photos for demo images
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  };

  const handleDownloadFile = (file) => {
    try {
      let url;

      if (file.fileUrl && file.fileObject) {
        // Use actual uploaded file
        url = file.fileUrl;
      } else {
        // Create a simulated file for demo files
        const fileContent = `This is a simulated download of ${file.name}`;
        const blob = new Blob([fileContent], { type: "text/plain" });
        url = URL.createObjectURL(blob);
      }

      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      link.style.display = "none";

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up only if we created a new blob URL
      if (!file.fileUrl) {
        URL.revokeObjectURL(url);
      }

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-4 py-2 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = `Downloaded: ${file.name}`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file. Please try again.");
    }
  };

  const handleDeleteItem = (item) => {
    setDeleteModal({ open: true, item });
  };

  const handleCreateFolder = (folderName) => {
    const newFolder = {
      id: `folder_${Date.now()}`,
      name: folderName,
      type: "folder",
      isPasswordProtected: false,
      password: null,
      children: [],
    };

    setFileSystem((prev) => {
      const updateFolder = (folder, path) => {
        if (path.length === 0) {
          return {
            ...folder,
            children: [...folder.children, newFolder],
          };
        }

        return {
          ...folder,
          children: folder.children.map((child) =>
            child.id === path[0] ? updateFolder(child, path.slice(1)) : child
          ),
        };
      };

      return updateFolder(prev, currentPath);
    });

    setCreateFolderModal(false);
  };

  const handleUploadFile = (file) => {
    // Create a URL for the actual uploaded file
    const fileUrl = URL.createObjectURL(file);

    const newFile = {
      id: `file_${Date.now()}`,
      name: file.name,
      type: "file",
      fileType: file.name.split(".").pop().toLowerCase(),
      size: file.size,
      uploadDate: new Date().toISOString().split("T")[0],
      isPasswordProtected: false,
      password: null,
      fileUrl: fileUrl, // Store the actual file URL
      fileObject: file, // Store the file object for later use
    };

    setFileSystem((prev) => {
      const updateFolder = (folder, path) => {
        if (path.length === 0) {
          return {
            ...folder,
            children: [...folder.children, newFile],
          };
        }

        return {
          ...folder,
          children: folder.children.map((child) =>
            child.id === path[0] ? updateFolder(child, path.slice(1)) : child
          ),
        };
      };

      return updateFolder(prev, currentPath);
    });

    setUploadModal(false);

    // Show success notification
    const notification = document.createElement("div");
    notification.className =
      "fixed z-50 px-4 py-2 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
    notification.textContent = `Uploaded: ${file.name}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleConfirmDelete = (itemToDelete) => {
    setFileSystem((prev) => {
      const updateFolder = (folder, path) => {
        if (path.length === 0) {
          return {
            ...folder,
            children: folder.children.filter(
              (child) => child.id !== itemToDelete.id
            ),
          };
        }

        return {
          ...folder,
          children: folder.children.map((child) =>
            child.id === path[0] ? updateFolder(child, path.slice(1)) : child
          ),
        };
      };

      return updateFolder(prev, currentPath);
    });

    setDeleteModal({ open: false, item: null });
  };

  const handleVerification = () => {
    // Demo verification - in production, this would verify with backend
    if (verificationCode === "123456") {
      setIsVerified(true);
      setVerificationCode("");
    } else {
      alert("Invalid verification code. Use '123456' for demo.");
    }
  };

  const handleResendCode = () => {
    alert(
      "Verification code sent to your registered device. Use '123456' for demo."
    );
  };

  const currentItems = getCurrentItems();

  // Cleanup file URLs when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      // Cleanup any created object URLs
      const cleanupFileUrls = (folder) => {
        folder.children?.forEach((child) => {
          if (child.type === "file" && child.fileUrl) {
            URL.revokeObjectURL(child.fileUrl);
          } else if (child.type === "folder") {
            cleanupFileUrls(child);
          }
        });
      };
      cleanupFileUrls(fileSystem);
    };
  }, [fileSystem]);

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Document Vault</h1>
            <p className="text-gray-600">
              Securely store and manage your important documents
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg myButton hover:bg-blue-700"
          >
            <Upload size={16} />
            Upload
          </button>
          <button
            onClick={() => setCreateFolderModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors bg-white border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            <FolderPlus size={16} />
            New Folder
          </button>
        </div>
      </div>

      {/* Verification Section */}
      {!isVerified && (
        <Card className="p-6 border-0 border-l-4 shadow-sm bg-yellow-50 border-l-yellow-400">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="mb-2 font-semibold text-yellow-800">
                Verify your identity to access protected content
              </h3>
              <p className="mb-4 text-sm text-yellow-700">
                Enter the 6-digit verification code sent to your registered
                device
              </p>
              <p className="mb-4 text-xs text-yellow-600">
                Demo: Use "123456" as the OTP for testing
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="px-3 py-2 bg-white border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  maxLength={6}
                />
                <button
                  onClick={handleVerification}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-yellow-600 rounded-lg myButton hover:bg-yellow-700"
                >
                  Verify
                </button>
                <button
                  onClick={handleResendCode}
                  className="px-4 py-2 text-sm font-medium text-yellow-600 transition-colors bg-white border border-yellow-600 rounded-lg hover:bg-yellow-50"
                >
                  Resend Code
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Breadcrumb and View Controls */}
      <div className="flex items-center justify-between px-4 py-4 bg-white rounded-2xl my-7">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setCurrentPath([])}
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Root
          </button>
          {currentPath.map((pathItem, index) => {
            // Get the folder at this specific path level
            const pathToFolder = currentPath.slice(0, index + 1);
            const pathFolder = getFolderAtPath(pathToFolder);
            return (
              <div key={pathItem} className="flex items-center gap-1">
                <ChevronRight size={14} className="text-gray-400" />
                <button
                  onClick={() => navigateToPath(index)}
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  {pathFolder.name}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            List View
          </button> */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center flex-1 gap-3 px-4 py-3 transition-shadow bg-white border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search calculations..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="w-full p-1 text-sm text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none"
          />
        </div>
      </div>
      {/* File Manager Grid */}
      <div className="space-y-4 mt-7">
        {currentItems.length === 0 ? (
          <Card className="p-12 text-center bg-white border-0 shadow-sm">
            <Folder className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              This folder is empty
            </h3>
            <p className="text-gray-500">
              Create a new folder or upload files to get started.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {currentItems.map((item) => {
              const IconComponent = getIconComponent(item);
              const isFolder = item.type === "folder";

              return (
                <Card
                  key={item.id}
                  className="p-4 transition-all duration-200 bg-white border-0 shadow-sm cursor-pointer hover:shadow-md hover:scale-105 group"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="space-y-3">
                    {/* Icon and Actions */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 text-center">
                        <div className="relative inline-block">
                          <IconComponent
                            className={`w-12 h-12 mx-auto mb-2 ${
                              isFolder
                                ? item.isPasswordProtected
                                  ? "text-orange-500"
                                  : "text-blue-500"
                                : getFileTypeColor(item.fileType)
                            }`}
                          />
                          {item.isPasswordProtected && (
                            <Lock
                              size={12}
                              className="absolute -top-1 -right-1 text-orange-600 bg-white rounded-full p-0.5 border border-orange-200"
                            />
                          )}
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-900 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {isFolder
                            ? `${item.children?.length || 0} items`
                            : `${formatFileSize(
                                item.size
                              )} • ${item.fileType?.toUpperCase()}`}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 transition-opacity opacity-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPasswordSetModal({ open: true, item });
                          }}
                          className="p-1 text-gray-500 transition-colors rounded hover:text-blue-600 hover:bg-blue-50"
                          title="Set Password"
                        >
                          <Key size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(item);
                          }}
                          className="p-1 text-gray-500 transition-colors rounded hover:text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Item Info */}
                    {item.isPasswordProtected && (
                      <div className="flex items-center justify-center gap-1 text-xs text-orange-600">
                        <Lock size={10} />
                        <span>Protected</span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Folder Modal */}
      <Dialog open={createFolderModal} onOpenChange={setCreateFolderModal}>
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Create New Folder
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const folderName = formData.get("folderName");
                if (folderName.trim()) {
                  handleCreateFolder(folderName.trim());
                }
              }}
            >
              <input
                name="folderName"
                type="text"
                placeholder="Folder name"
                className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setCreateFolderModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 myButton"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload File Modal */}
      <Dialog open={uploadModal} onOpenChange={setUploadModal}>
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Upload File
            </h2>
            <div className="mb-4">
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleUploadFile(file);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*,application/pdf,.doc,.docx,.txt"
              />
              <p className="mt-2 text-xs text-gray-500">
                Supported formats: Images (JPG, PNG, GIF), PDF, Word documents,
                Text files
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setUploadModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Entry Modal */}
      <Dialog
        open={passwordModal.open}
        onOpenChange={() =>
          setPasswordModal({ open: false, item: null, action: null })
        }
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Enter Password
            </h2>
            <p className="mb-4 text-gray-600">
              This {passwordModal.item?.type} is password protected. Please
              enter the password to access it.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const password = formData.get("password");
                if (password === passwordModal.item?.password) {
                  passwordModal.action?.();
                } else {
                  alert("Incorrect password");
                }
              }}
            >
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setPasswordModal({ open: false, item: null, action: null })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 myButton"
                >
                  Access
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Set Password Modal */}
      <Dialog
        open={passwordSetModal.open}
        onOpenChange={() => setPasswordSetModal({ open: false, item: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Set Password Protection
            </h2>
            <p className="mb-4 text-gray-600">
              Set a password to protect "{passwordSetModal.item?.name}".
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const password = formData.get("password");
                if (password.trim()) {
                  // Update the item with password protection
                  setFileSystem((prev) => {
                    const updateItem = (folder, path) => {
                      if (path.length === 0) {
                        return {
                          ...folder,
                          children: folder.children.map((child) =>
                            child.id === passwordSetModal.item.id
                              ? {
                                  ...child,
                                  isPasswordProtected: true,
                                  password: password.trim(),
                                }
                              : child
                          ),
                        };
                      }

                      return {
                        ...folder,
                        children: folder.children.map((child) =>
                          child.id === path[0]
                            ? updateItem(child, path.slice(1))
                            : child
                        ),
                      };
                    };

                    return updateItem(prev, currentPath);
                  });
                  setPasswordSetModal({ open: false, item: null });
                }
              }}
            >
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setPasswordSetModal({ open: false, item: null })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 myButton"
                >
                  Set Password
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={() => setDeleteModal({ open: false, item: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Delete {deleteModal.item?.type === "folder" ? "Folder" : "File"}
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete "
              <strong>{deleteModal.item?.name}</strong>"?
              {deleteModal.item?.type === "folder" &&
                deleteModal.item?.children?.length > 0 &&
                ` This folder contains ${deleteModal.item.children.length} items.`}{" "}
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModal({ open: false, item: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(deleteModal.item)}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Viewer Modal */}
      <Dialog
        open={fileViewModal.open}
        onOpenChange={() => setFileViewModal({ open: false, file: null })}
      >
        <DialogContent className="w-full max-w-4xl bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {fileViewModal.file?.name}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadFile(fileViewModal.file)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                >
                  <Download size={16} />
                  Download
                </button>
                {/* <button
                  onClick={() => setFileViewModal({ open: false, file: null })}
                  className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button> */}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              {fileViewModal.file?.fileType &&
              ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
                fileViewModal.file.fileType.toLowerCase()
              ) ? (
                <div className="text-center">
                  {/* Actual Image Display */}
                  <div className="mb-4">
                    <img
                      src={fileViewModal.file?.imageUrl}
                      alt={fileViewModal.file?.name}
                      className="object-contain max-w-full mx-auto rounded-lg shadow-md max-h-96"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div
                      className="flex items-center justify-center w-32 h-32 mx-auto bg-gray-200 rounded-lg"
                      style={{ display: "none" }}
                    >
                      <Image className="w-12 h-12 text-gray-500" />
                    </div>
                  </div>
                  <p className="font-medium text-gray-600">
                    {fileViewModal.file?.name}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {formatFileSize(fileViewModal.file?.size)} •{" "}
                    {fileViewModal.file?.fileType?.toUpperCase()}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {fileViewModal.file?.fileUrl
                      ? "Uploaded image file"
                      : "Demo image from Picsum Photos service"}
                  </p>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg">
                    <FileText className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="font-medium text-gray-600">
                    {fileViewModal.file?.name}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {formatFileSize(fileViewModal.file?.size)} •{" "}
                    {fileViewModal.file?.fileType?.toUpperCase()}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Preview not available for this file type
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentVaultMaster;