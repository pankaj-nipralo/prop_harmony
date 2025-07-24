import { DialogContent } from "@/components/ui/dialog";
import { Building, Download } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

 
const ReceiptModal = ({
  receiptModal,
  setReceiptModal,
  handleDownloadReceipt,
}) => {
  return (
    <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Payment Receipt
        </h2>

        {receiptModal.payment && (
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="mb-4 text-center">
                <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Property Harmony</h3>
                <p className="text-sm text-gray-600">Payment Receipt</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium">
                    {receiptModal.payment.reference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(receiptModal.payment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">
                    <DirhamSvg size={14} className="mb-1 mr-1" />
                    {receiptModal.payment.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-medium">
                    {receiptModal.payment.method}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-medium">
                    {receiptModal.payment.property}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    {receiptModal.payment.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => handleDownloadReceipt(receiptModal.payment)}
                className="flex items-center gap-2 px-4 py-2 mx-auto text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
              >
                <Download size={16} />
                Download Receipt
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setReceiptModal({ open: false, payment: null })}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ReceiptModal;
