import { Bell, Globe } from "lucide-react";

const NotificationSettings = ({
  notificationSettings,
  setNotificationSettings,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white border-0 shadow-sm">
        <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
          <Bell className="w-5 h-5 text-blue-600" />
          Email Notifications
        </h3>

        <div className="space-y-4">
          {Object.entries(notificationSettings.emailNotifications).map(
            ([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <p className="text-xs text-gray-500">
                    {key === "rentPayments" &&
                      "Get notified when rent payments are received"}
                    {key === "maintenanceRequests" &&
                      "Receive alerts for new maintenance requests"}
                    {key === "tenantMessages" &&
                      "Get notified of new tenant messages"}
                    {key === "leaseExpirations" &&
                      "Alerts for upcoming lease expirations"}
                    {key === "systemUpdates" &&
                      "Notifications about system updates and features"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        emailNotifications: {
                          ...prev.emailNotifications,
                          [key]: e.target.checked,
                        },
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            )
          )}
        </div>
      </div>

      <div className="p-6 bg-white border-0 shadow-sm">
        <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
          <Globe className="w-5 h-5 text-blue-600" />
          Push Notifications
        </h3>

        <div className="space-y-4">
          {Object.entries(notificationSettings.pushNotifications).map(
            ([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <p className="text-xs text-gray-500">
                    {key === "realTimeAlerts" &&
                      "Instant browser notifications for important events"}
                    {key === "dailySummary" &&
                      "Daily summary of property activities"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        pushNotifications: {
                          ...prev.pushNotifications,
                          [key]: e.target.checked,
                        },
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;