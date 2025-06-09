import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Search,
  FolderPlus,
  Upload,
  Grid3X3,
  List,
  Trash2,
  FileText,
  Image,
  Archive,
  Folder,
  Lock,
  Home,
  ChevronRight,
  Key,
} from "lucide-react";
import {
  formatFileSize,
  getFileIcon,
  getFileTypeColor,
} from "@/data/landlord/documents/data";

const DocumentBody = () => {
  // File manager state
  const [currentPath, setCurrentPath] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");

  // Modal states
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
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
    name: "Document Vault",
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
        ],
      },
      {
        id: "licenses",
        name: "Licenses",
        type: "folder",
        isPasswordProtected: true,
        password: "123456",
        children: [],
      },
      {
        id: "inspection-reports",
        name: "Inspection Reports",
        type: "folder",
        isPasswordProtected: false,
        password: null,
        children: [],
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
    if (file.isPasswordProtected) {
      setPasswordModal({
        open: true,
        item: file,
        action: () => {
          // Open file viewer
          console.log("Opening file:", file.name);
          setPasswordModal({ open: false, item: null, action: null });
        },
      });
    } else {
      console.log("Opening file:", file.name);
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
    const newFile = {
      id: `file_${Date.now()}`,
      name: file.name,
      type: "file",
      fileType: file.name.split(".").pop().toLowerCase(),
      size: file.size,
      uploadDate: new Date().toISOString().split("T")[0],
      isPasswordProtected: false,
      password: null,
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

  const currentItems = getCurrentItems();

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <Card className="p-4 border-0 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPath([])}
              className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 transition-colors rounded hover:bg-blue-50"
            >
              <Home size={16} />
              <span>Document Vault</span>
            </button>
            {currentPath.map((pathItem, index) => {
              const folder = getCurrentFolder();
              return (
                <div key={pathItem} className="flex items-center gap-1">
                  <ChevronRight size={14} className="text-gray-400" />
                  <button
                    onClick={() => navigateToPath(index)}
                    className="px-2 py-1 text-sm text-blue-600 transition-colors rounded hover:bg-blue-50"
                  >
                    {folder.name}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search files and folders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setCreateFolderModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg myButton hover:bg-blue-600"
            >
              <FolderPlus size={16} />
              New Folder
            </button>

            <button
              onClick={() => setUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg myButton hover:bg-blue-600"
            >
              <Upload size={16} />
              Upload
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* File Manager Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentPath.length === 0
              ? "Document Vault"
              : getCurrentFolder().name}{" "}
            ({currentItems.length} items)
          </h2>
        </div>

        {currentItems.length === 0 ? (
          <Card className="p-8 text-center border-0 shadow-sm">
            <Folder className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">
              This folder is empty. Create a new folder or upload files to get
              started.
            </p>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentItems.map((item) => {
              const IconComponent = getIconComponent(item);
              const isFolder = item.type === "folder";

              return (
                <Card
                  key={item.id}
                  className="p-4 transition-shadow border-0 shadow-sm cursor-pointer hover:shadow-md group"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="space-y-3">
                    {/* Icon and Actions */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="relative">
                          <IconComponent
                            className={`w-10 h-10 mb-2 ${
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
                              className="absolute -top-1 -right-1 text-orange-600 bg-white rounded-full p-0.5"
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
                      <div className="flex items-center gap-1 transition-opacity opacity-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPasswordSetModal({ open: true, item });
                          }}
                          className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50"
                          title="Set Password"
                        >
                          <Key size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(item);
                          }}
                          className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Item Info */}
                    <div className="space-y-1 text-xs">
                      {!isFolder && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <span>
                            Uploaded:{" "}
                            {new Date(item.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {item.isPasswordProtected && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <Lock size={12} />
                          <span>Password Protected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="overflow-hidden border-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Size
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Modified
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item) => {
                    const IconComponent = getIconComponent(item);
                    const isFolder = item.type === "folder";

                    return (
                      <tr
                        key={item.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleItemClick(item)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <IconComponent
                              className={`w-6 h-6 mr-3 ${
                                isFolder
                                  ? item.isPasswordProtected
                                    ? "text-orange-500"
                                    : "text-blue-500"
                                  : getFileTypeColor(item.fileType)
                              }`}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </span>
                                {item.isPasswordProtected && (
                                  <Lock
                                    size={14}
                                    className="text-orange-600"
                                    title="Password Protected"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {isFolder ? "Folder" : item.fileType?.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {isFolder
                            ? `${item.children?.length || 0} items`
                            : formatFileSize(item.size)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {isFolder
                            ? "-"
                            : new Date(item.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPasswordSetModal({ open: true, item });
                              }}
                              className="text-blue-600 cursor-pointer hover:text-blue-900"
                              title="Set Password"
                            >
                              <Key size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteItem(item);
                              }}
                              className="text-red-600 cursor-pointer hover:text-red-900"
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
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleUploadFile(file);
                }
              }}
              className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
    </div>
  );
};

export default DocumentBody;
