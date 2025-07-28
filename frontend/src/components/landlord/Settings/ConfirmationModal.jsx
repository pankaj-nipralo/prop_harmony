import { Dialog, DialogContent } from "@/components/ui/dialog";

const ConfirmationModal = ({ confirmationModal, setConfirmationModal }) => {
  return (
    <Dialog
      open={confirmationModal.open}
      onOpenChange={() =>
        setConfirmationModal({
          open: false,
          title: "",
          message: "",
          action: null,
        })
      }
    >
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {confirmationModal.title}
          </h2>
          <p className="mb-6 text-gray-600">{confirmationModal.message}</p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() =>
                setConfirmationModal({
                  open: false,
                  title: "",
                  message: "",
                  action: null,
                })
              }
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmationModal.action}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 myButton"
            >
              Confirm
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
