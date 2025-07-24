import { Folder, Lock, Key, Trash2, Archive, FileText, Image } from "lucide-react";
import {
  getFileIcon,
  getFileTypeColor,
  formatFileSize,
} from "@/data/landlord/documents/data";

export const FileItem = ({ item, onClick, onSetPassword, onDelete }) => {
  const IconComponent = getIconComponent(item);
  const isFolder = item.type === "folder";

  return (
    <div
      className="p-4 transition-all duration-200 bg-white border-0 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:scale-105 group"
      onClick={onClick}
    >
      <div className="space-y-3">
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
                onSetPassword();
              }}
              className="p-1 text-gray-500 transition-colors rounded hover:text-blue-600 hover:bg-blue-50"
              title="Set Password"
            >
              <Key size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 text-gray-500 transition-colors rounded hover:text-red-600 hover:bg-red-50"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {item.isPasswordProtected && (
          <div className="flex items-center justify-center gap-1 text-xs text-orange-600">
            <Lock size={10} />
            <span>Protected</span>
          </div>
        )}
      </div>
    </div>
  );
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
