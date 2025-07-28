import { Globe } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const CurrencySettings = ({ propertySettings, setPropertySettings }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Default Currency
        </label>
        <select
          value={propertySettings.currency}
          onChange={(e) =>
            setPropertySettings((prev) => ({
              ...prev,
              currency: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="AED">AED - UAE Dirham (د.إ)</option>
          <option value="INR">INR - Indian Rupee (₹)</option>
          <option value="JPY">JPY - Japanese Yen (¥)</option>
          <option value="USD">USD - US Dollar ($)</option>
          <option value="EUR">EUR - Euro (€)</option>
          <option value="GBP">GBP - British Pound (£)</option>
          <option value="CAD">CAD - Canadian Dollar (C$)</option>
          <option value="AUD">AUD - Australian Dollar (A$)</option>
          <option value="CHF">CHF - Swiss Franc (CHF)</option>
          <option value="CNY">CNY - Chinese Yuan (¥)</option>
          <option value="SGD">SGD - Singapore Dollar (S$)</option>
          <option value="HKD">HKD - Hong Kong Dollar (HK$)</option>
        </select>
        <p className="mt-1 text-xs text-gray-500">
          This currency will be used for all rent amounts, fees, and financial
          calculations
        </p>
      </div>

      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Globe className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900">
              Currency Information
            </h4>
            <p className="mt-1 text-xs text-blue-700">
              Currently selected:{" "}
              <span className="font-semibold">{propertySettings.currency}</span>
            </p>
            <p className="mt-1 text-xs text-blue-600">
              Note: Changing currency will affect all future transactions.
              Existing records will maintain their original currency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencySettings;
