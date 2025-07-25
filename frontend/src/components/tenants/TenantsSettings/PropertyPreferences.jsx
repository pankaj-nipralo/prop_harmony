 
import React from "react";
import { Home } from "lucide-react";

const PropertyPreferences = ({
  propertyPreferences,
  setPropertyPreferences,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-900">
            Maintenance Notifications
          </label>
          <p className="text-xs text-gray-500">
            Receive updates about maintenance requests and schedules
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={propertyPreferences.maintenanceNotifications}
            onChange={(e) =>
              setPropertyPreferences((prev) => ({
                ...prev,
                maintenanceNotifications: e.target.checked,
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
            Inspection Reminders
          </label>
          <p className="text-xs text-gray-500">
            Get notified about upcoming property inspections
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={propertyPreferences.inspectionReminders}
            onChange={(e) =>
              setPropertyPreferences((prev) => ({
                ...prev,
                inspectionReminders: e.target.checked,
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
            Allow Landlord Entry
          </label>
          <p className="text-xs text-gray-500">
            Allow landlord access for maintenance and inspections
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={propertyPreferences.allowLandlordEntry}
            onChange={(e) =>
              setPropertyPreferences((prev) => ({
                ...prev,
                allowLandlordEntry: e.target.checked,
              }))
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Preferred Contact Method
        </label>
        <select
          value={propertyPreferences.preferredContactMethod}
          onChange={(e) =>
            setPropertyPreferences((prev) => ({
              ...prev,
              preferredContactMethod: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="sms">SMS</option>
          <option value="app">Mobile App</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Package Delivery Instructions
        </label>
        <textarea
          value={propertyPreferences.packageDeliveryInstructions}
          onChange={(e) =>
            setPropertyPreferences((prev) => ({
              ...prev,
              packageDeliveryInstructions: e.target.value,
            }))
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Special instructions for package deliveries..."
        />
      </div>
    </div>
  );
};

export default PropertyPreferences;