import { Card } from "@/components/ui/card";
import { CreditCard, History } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

  const QuickActions = ({ 
  setPaymentMethodsModal, 
  setPaymentHistoryModal, 
  handlePayNow 
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 my-10 md:grid-cols-3">
      <Card
        className="p-6 transition-shadow bg-white border-0 shadow-sm cursor-pointer hover:shadow-md"
        onClick={() => setPaymentMethodsModal(true)}
      >
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-blue-100 rounded-full">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Payment Methods</h3>
          <p className="text-sm text-gray-600">Manage your saved payment methods</p>
        </div>
      </Card>

      <Card
        className="p-6 transition-shadow bg-white border-0 shadow-sm cursor-pointer hover:shadow-md"
        onClick={() => setPaymentHistoryModal(true)}
      >
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-green-100 rounded-full">
            <History className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Payment History</h3>
          <p className="text-sm text-gray-600">View all your past payments</p>
        </div>
      </Card>

      <Card
        className="p-6 transition-shadow bg-white border-0 shadow-sm cursor-pointer hover:shadow-md"
        onClick={handlePayNow}
      >
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-purple-100 rounded-full">
            <DirhamSvg className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Make Payment</h3>
          <p className="text-sm text-gray-600">Pay your rent quickly and securely</p>
        </div>
      </Card>
    </div>
  );
};

export default QuickActions;
