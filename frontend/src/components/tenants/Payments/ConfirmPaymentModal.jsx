import { DialogContent } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const ConfirmPaymentModal = ({
  paymentAmount,
  selectedPaymentMethod,
  paymentMethods,
  handleConfirmPayment,
  setConfirmPaymentModal,
}) => {
  return (
    <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Confirm Payment
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-3 font-medium text-gray-900">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  <DirhamSvg size={14} className="mb-1 mr-1" />
                  {paymentAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">
                  {paymentMethods.find(
                    (m) => m.id.toString() === selectedPaymentMethod
                  )?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property:</span>
                <span className="font-medium">Sunset Apartments #4B</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Please confirm your payment details before proceeding.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={() => setConfirmPaymentModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmPayment}
            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ConfirmPaymentModal;
