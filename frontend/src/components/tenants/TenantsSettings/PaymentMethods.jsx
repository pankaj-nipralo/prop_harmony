// components/tenant-settings/PaymentMethods.jsx
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Building, CreditCard, Plus, Trash2 } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const PaymentMethods = ({
  paymentSettings,
  setPaymentSettings,
  handleAddEditPayment,
//   handleDeletePayment,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({
    open: false,
    methodId: null,
  });

  const confirmDeletePayment = () => {
    setPaymentSettings((prev) => ({
      ...prev,
      savedPaymentMethods: prev.savedPaymentMethods.filter(
        (m) => m.id !== showDeleteConfirm.methodId
      ),
    }));
    setShowDeleteConfirm({ open: false, methodId: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <DirhamSvg className="w-5 h-5 text-blue-600" />
          Saved Payment Methods
        </h3>
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100 myButton"
          onClick={() => handleAddEditPayment(null)}
        >
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      <div className="space-y-4">
        {paymentSettings.savedPaymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg transition-colors ${
              method.isDefault
                ? "border-blue-200 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    method.type === "bank" ? "bg-green-100" : "bg-purple-100"
                  }`}
                >
                  {method.type === "bank" ? (
                    <Building
                      className={`w-5 h-5 ${
                        method.type === "bank"
                          ? "text-green-600"
                          : "text-purple-600"
                      }`}
                    />
                  ) : (
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {method.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {method.type === "bank" ? "Bank Account" : "Credit Card"}
                    {method.isDefault && " • Default"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => {
                      setPaymentSettings((prev) => ({
                        ...prev,
                        savedPaymentMethods: prev.savedPaymentMethods.map(
                          (m) => ({
                            ...m,
                            isDefault: m.id === method.id,
                          })
                        ),
                      }));
                    }}
                    className="px-3 py-1 text-xs font-medium text-blue-600 transition-colors rounded bg-blue-50 hover:bg-blue-100"
                  >
                    Set Default
                  </button>
                )}
                <button
                  className="p-2 text-red-400 transition-colors rounded hover:text-red-600 hover:bg-red-50"
                  onClick={() =>
                    setShowDeleteConfirm({ open: true, methodId: method.id })
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paymentSettings.savedPaymentMethods.length === 0 && (
        <div className="py-12 text-center">
          <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h4 className="mb-2 text-lg font-medium text-gray-900">
            No Payment Methods
          </h4>
          <p className="mb-4 text-gray-600">
            Add a payment method to enable auto-pay and quick payments.
          </p>
          <button
            className="flex items-center gap-2 px-4 py-2 mx-auto text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 myButton"
            onClick={() => handleAddEditPayment(null)}
          >
            <Plus className="w-4 h-4" />
            Add Your First Payment Method
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog
        open={showDeleteConfirm.open}
        onOpenChange={() =>
          setShowDeleteConfirm({ open: false, methodId: null })
        }
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Delete Payment Method
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this payment method? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  setShowDeleteConfirm({ open: false, methodId: null })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePayment}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethods;