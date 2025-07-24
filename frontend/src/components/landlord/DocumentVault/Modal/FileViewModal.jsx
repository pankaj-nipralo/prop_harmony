import { Download, Image, FileText } from "lucide-react";
import { formatFileSize } from "@/data/landlord/documents/data";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const FileViewModal = ({ isOpen, onClose, file, onDownload }) => {
  if (!file) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{file.name}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDownload(file)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            {file.fileType &&
            ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
              file.fileType.toLowerCase()
            ) ? (
              <div className="text-center">
                <div className="mb-4">
                  <img
                    src={file.imageUrl}
                    alt={file.name}
                    className="object-contain max-w-full mx-auto rounded-lg shadow-md max-h-96"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <div
                    className="flex items-center justify-center w-32 h-32 mx-auto bg-gray-200 rounded-lg"
                    style={{ display: "none" }}
                  >
                    <Image className="w-12 h-12 text-gray-500" />
                  </div>
                </div>
                <p className="font-medium text-gray-600">{file.name}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {formatFileSize(file.size)} • {file.fileType?.toUpperCase()}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {file.fileUrl
                    ? "Uploaded image file"
                    : "Demo image from Picsum Photos service"}
                </p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <p className="font-medium text-gray-600">{file.name}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {formatFileSize(file.size)} • {file.fileType?.toUpperCase()}
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
  );
};
