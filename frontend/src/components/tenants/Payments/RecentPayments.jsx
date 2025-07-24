import { Card } from "@/components/ui/card";
import { CheckCircle, Download, Eye } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const RecentPayments = ({
  paymentHistory,
  setPaymentHistoryModal,
  handleViewReceipt,
  handleDownloadReceipt,
}) => {
  return (
    <Card className="bg-white border-0 shadow-sm gap-0">
      <div className="p-6 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Payments
          </h3>
          <button
            onClick={() => setPaymentHistoryModal(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        {paymentHistory.slice(0, 3).map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  <DirhamSvg size={14} className="mb-1.5 mr-1" />
                  {payment.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(payment.date).toLocaleDateString()} •{" "}
                  {payment.method}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                {payment.status}
              </span>
              <button
                onClick={() => handleViewReceipt(payment)}
                className="p-1 text-gray-500 transition-colors hover:text-blue-600"
                title="View Receipt"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => handleDownloadReceipt(payment)}
                className="p-1 text-gray-500 transition-colors hover:text-green-600"
                title="Download Receipt"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentPayments;
