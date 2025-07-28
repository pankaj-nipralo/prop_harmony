import { CreditCard, Clock } from "lucide-react";

const PaymentSettings = ({ paymentSettings, setPaymentSettings }) => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white border-0 shadow-sm Bank Account">
        <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
          <CreditCard className="w-5 h-5 text-blue-600" />
          Bank Account Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Account Name
            </label>
            <input
              type="text"
              value={paymentSettings.bankAccount.accountName}
              onChange={(e) =>
                setPaymentSettings((prev) => ({
                  ...prev,
                  bankAccount: {
                    ...prev.bankAccount,
                    accountName: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Routing Number
            </label>
            <input
              type="text"
              value={paymentSettings.bankAccount.routingNumber}
              onChange={(e) =>
                setPaymentSettings((prev) => ({
                  ...prev,
                  bankAccount: {
                    ...prev.bankAccount,
                    routingNumber: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="****5678"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              value={paymentSettings.bankAccount.accountNumber}
              onChange={(e) =>
                setPaymentSettings((prev) => ({
                  ...prev,
                  bankAccount: {
                    ...prev.bankAccount,
                    accountNumber: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="****1234"
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-0 shadow-sm">
        <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
          <Clock className="w-5 h-5 text-blue-600" />
          Payment Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">
                Auto Deposit
              </label>
              <p className="text-xs text-gray-500">
                Automatically deposit rent payments to your bank account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={paymentSettings.autoDeposit}
                onChange={(e) =>
                  setPaymentSettings((prev) => ({
                    ...prev,
                    autoDeposit: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">
                Payment Reminders
              </label>
              <p className="text-xs text-gray-500">
                Send automatic payment reminders to tenants
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={paymentSettings.paymentReminders}
                onChange={(e) =>
                  setPaymentSettings((prev) => ({
                    ...prev,
                    paymentReminders: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
