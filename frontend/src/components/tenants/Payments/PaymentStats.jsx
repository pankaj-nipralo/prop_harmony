import { Card } from "@/components/ui/card";
import { Calendar, CheckCircle, AlertCircle, Clock, ReceiptText } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

 const PaymentStats = ({ currentBalance, nextDueDate, totalPaidThisYear, paymentStatus }) => {
  return (
    <div className="grid grid-cols-1 gap-6 my-10 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center gap-4 ">
          <div className="p-3 bg-blue-100 rounded-lg">
            <DirhamSvg className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Current Balance</p>
            <span className="text-2xl font-bold text-gray-900">
              {currentBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Next Due Date</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Date(nextDueDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`p-3 ${paymentStatus.bgColor} rounded-lg`}>
            {paymentStatus.status === "Paid" ? (
              <CheckCircle className={`w-6 h-6 ${paymentStatus.color}`} />
            ) : paymentStatus.status === "Overdue" ? (
              <AlertCircle className={`w-6 h-6 ${paymentStatus.color}`} />
            ) : (
              <Clock className={`w-6 h-6 ${paymentStatus.color}`} />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Payment Status</p>
            <p className={`text-2xl font-bold ${paymentStatus.color}`}>
              {paymentStatus.status}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <ReceiptText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Paid This Year</p>
            <p className="text-2xl font-bold text-gray-900">
              <DirhamSvg size={20} className="mb-1.5 mr-1" />
              {totalPaidThisYear.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentStats;