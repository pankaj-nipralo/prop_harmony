import { DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

const PaymentMethodsModal = ({
  paymentMethods,
  setPaymentMethodsModal,
  setAddPaymentMethodModal,
}) => {
  return (
    <DialogContent className="w-full max-w-2xl bg-white border-0 rounded-lg shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Payment Methods
          </h2>
          <button
            onClick={() => setAddPaymentMethodModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Method
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <Card key={method.id} className="p-4 border-0 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.type}</p>
                      {method.isDefault && (
                        <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 text-gray-500 transition-colors rounded hover:text-blue-600 hover:bg-blue-50"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 text-gray-500 transition-colors rounded hover:text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setPaymentMethodsModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

export default PaymentMethodsModal;
