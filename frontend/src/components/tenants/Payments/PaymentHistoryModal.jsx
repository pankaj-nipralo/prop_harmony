import { DialogContent } from "@/components/ui/dialog";
import { Download, Eye } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const PaymentHistoryModal = ({
  paymentHistory,
  setPaymentHistoryModal,
  handleViewReceipt,
  handleDownloadReceipt,
}) => {
  return (
    <DialogContent className="w-full bg-white border-0 rounded-lg shadow-xl md:max-w-7xl">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Payment History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Method
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Reference
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <DirhamSvg size={12} className="mb-1 mr-1" />
                    {payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {payment.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {payment.reference}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewReceipt(payment)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Receipt"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDownloadReceipt(payment)}
                        className="text-green-600 hover:text-green-900"
                        title="Download Receipt"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setPaymentHistoryModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

export default PaymentHistoryModal;
