import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteContractorDialog = ({
  isOpen,
  onOpenChange,
  onDelete,
  contractor,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Delete Contractor
          </h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete the contractor "
            <strong>{contractor?.name}</strong>"? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={onDelete}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteContractorDialog;