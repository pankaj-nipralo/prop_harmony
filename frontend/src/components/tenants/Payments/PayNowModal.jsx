import { DialogContent } from "@/components/ui/dialog";
import { Shield } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const PayNowModal = ({
  paymentAmount,
  setPaymentAmount,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  paymentMethods,
  handlePaymentSubmit,
  setPayNowModal,
}) => {
  return (
    <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Make Payment</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePaymentSubmit();
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Payment Amount
              </label>
              <div className="relative">
                <DirhamSvg className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select payment method</option>
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.name} {method.isDefault ? "(Default)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-lg bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Secure Payment
                </span>
              </div>
              <p className="text-xs text-blue-700">
                Your payment information is encrypted and secure. We never
                store your card details.
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={() => setPayNowModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
};

export default PayNowModal;
