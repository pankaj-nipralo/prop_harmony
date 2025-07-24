 
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const DeleteModal = ({ 
  isOpen, 
  onClose, 
  item, 
  onConfirm 
}) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Delete {item.type === "folder" ? "Folder" : "File"}
          </h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete "
            <strong>{item.name}</strong>"?
            {item.type === "folder" &&
              item.children?.length > 0 &&
              ` This folder contains ${item.children.length} items.`}{" "}
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(item);
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};