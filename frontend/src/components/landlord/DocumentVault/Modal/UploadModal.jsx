import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const UploadModal = ({
  open,
  onClose,
  handleUploadFile
}) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      handleUploadFile(file);
      setFile(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Upload File
          </h2>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileChange}
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
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!file}
              className={`px-4 py-2 text-sm font-medium text-white transition-colors rounded-md ${
                file ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Upload
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};