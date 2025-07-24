import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

  const PaymentDueAlert = ({ currentBalance, nextDueDate, handlePayNow }) => {
  if (currentBalance <= 0) return null;

  return (
    <Card className="p-6 border-0 border-l-4 shadow-sm border-l-orange-400 bg-orange-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AlertCircle className="w-8 h-8 text-orange-600" />
          <div>
            <h3 className="text-lg font-semibold text-orange-800">Rent Payment Due</h3>
            <p className="text-orange-700">
              Your rent payment of{" "}
              <span className="font-bold">
                <DirhamSvg size={14} className="mb-1" />
                {currentBalance.toFixed(2)}
              </span>{" "}
              is due on{" "}
              <span className="font-bold">
                {new Date(nextDueDate).toLocaleDateString()}
              </span>
            </p>
            {new Date() > new Date(nextDueDate) && (
              <p className="mt-1 text-sm text-red-600">
                ⚠️ This payment is overdue. Late fees may apply.
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handlePayNow}
          className="px-6 py-3 font-medium text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-700"
        >
          Pay Now
        </button>
      </div>
    </Card>
  );
};

export default PaymentDueAlert;
