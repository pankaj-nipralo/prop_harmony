import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Settings,
  User,
  Home,
  Mail,
  CreditCard,
  Shield,
  Globe,
  Save,
  Eye,
  EyeOff,
  Bell,
  Lock,
  Key,
  Database,
  Clock,
  DollarSign,
} from "lucide-react";

const SettingsMaster = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Settings state
  const [accountSettings, setAccountSettings] = useState({
    firstName: "Ahmed",
    lastName: "Al-Mansouri",
    email: "ahmed.mansouri@propertyharmony.com",
    phone: "+971-55-123-4567",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: {
      email: true,
      sms: true,
      push: true,
      marketing: false,
    },
  });

  const [propertySettings, setPropertySettings] = useState({
    defaultRentAmount: "8500",
    currency: "AED",
    paymentDueDay: "1",
    lateFeePercentage: "5",
    lateFeeGracePeriod: "3",
    securityDepositMultiplier: "1",
    maintenanceRequestAutoAssign: true,
    inspectionFrequency: "quarterly",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.propertyharmony.com",
    smtpPort: "587",
    smtpUsername: "noreply@propertyharmony.com",
    smtpPassword: "",
    fromName: "Property Harmony",
    fromEmail: "noreply@propertyharmony.com",
    autoReminders: true,
    reminderDaysBefore: "3",
    overdueReminderFrequency: "weekly",
  });

  const [paymentSettings, setPaymentSettings] = useState({
    acceptedMethods: {
      bankTransfer: true,
      cash: true,
      check: true,
      online: true,
      card: false,
      digitalWallet: false,
    },
    bankDetails: {
      bankName: "Emirates NBD",
      accountNumber: "1234567890",
      iban: "AE070331234567890123456",
      swiftCode: "EBILAEAD",
    },
    processingFee: "2.5",
    autoReconciliation: true,
  });

  const [systemSettings, setSystemSettings] = useState({
    timezone: "Asia/Dubai",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    language: "en",
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: "7years",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
    apiAccess: false,
    auditLog: true,
  });

  const tabs = [
    { id: "account", label: "Account Settings", icon: User },
    { id: "property", label: "Property Settings", icon: Home },
    { id: "email", label: "Email Settings", icon: Mail },
    { id: "payment", label: "Payment Settings", icon: CreditCard },
    { id: "system", label: "System Settings", icon: Globe },
    { id: "security", label: "Security Settings", icon: Shield },
  ];

  const handleSave = async (section) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`${section} settings saved successfully!`);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <Card className="p-6 border-0">
        <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
          <User className="w-5 h-5 text-blue-600" />
          Profile Information
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={accountSettings.firstName}
              onChange={(e) =>
                setAccountSettings((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={accountSettings.lastName}
              onChange={(e) =>
                setAccountSettings((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={accountSettings.email}
              onChange={(e) =>
                setAccountSettings((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={accountSettings.phone}
              onChange={(e) =>
                setAccountSettings((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0">
        <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
          <Lock className="w-5 h-5 text-blue-600" />
          Change Password
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={accountSettings.currentPassword}
                onChange={(e) =>
                  setAccountSettings((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={accountSettings.newPassword}
                onChange={(e) =>
                  setAccountSettings((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={accountSettings.confirmPassword}
              onChange={(e) =>
                setAccountSettings((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0">
        <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
          <Bell className="w-5 h-5 text-blue-600" />
          Notification Preferences
        </h3>

        <div className="space-y-4">
          {Object.entries(accountSettings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()} Notifications
                </label>
                <p className="text-xs text-gray-500">
                  Receive notifications via{" "}
                  {key === "push" ? "browser push" : key}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setAccountSettings((prev) => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        [key]: e.target.checked,
                      },
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave("Account")}
          className="flex items-center gap-2 px-6 py-2 myButton"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save size={16} />
          )}
          Save Account Settings
        </button>
      </div>
    </div>
  );

  const renderPropertySettings = () => (
    <div className="space-y-6">
      <Card className="p-6 border-0">
        <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
          <DollarSign className="w-5 h-5 text-blue-600" />
          Default Payment Settings
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Default Rent Amount
            </label>
            <input
              type="number"
              value={propertySettings.defaultRentAmount}
              onChange={(e) =>
                setPropertySettings((prev) => ({
                  ...prev,
                  defaultRentAmount: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              value={propertySettings.currency}
              onChange={(e) =>
                setPropertySettings((prev) => ({
                  ...prev,
                  currency: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="AED">AED - UAE Dirham</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Payment Due Day
            </label>
            <select
              value={propertySettings.paymentDueDay}
              onChange={(e) =>
                setPropertySettings((prev) => ({
                  ...prev,
                  paymentDueDay: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day.toString()}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0">
        <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
          <Clock className="w-5 h-5 text-blue-600" />
          Late Fee Configuration
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Late Fee Percentage (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={propertySettings.lateFeePercentage}
              onChange={(e) =>
                setPropertySettings((prev) => ({
                  ...prev,
                  lateFeePercentage: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Grace Period (Days)
            </label>
            <input
              type="number"
              value={propertySettings.lateFeeGracePeriod}
              onChange={(e) =>
                setPropertySettings((prev) => ({
                  ...prev,
                  lateFeeGracePeriod: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Security Deposit Multiplier
            </label>
            <select
              value={propertySettings.securityDepositMultiplier}
              onChange={(e) =>
                setPropertySettings((prev) => ({
                  ...prev,
                  securityDepositMultiplier: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="0.5">0.5x Monthly Rent</option>
              <option value="1">1x Monthly Rent</option>
              <option value="1.5">1.5x Monthly Rent</option>
              <option value="2">2x Monthly Rent</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave("Property")}
          className="flex items-center gap-2 px-6 py-2 myButton"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save size={16} />
          )}
          Save Property Settings
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return renderAccountSettings();
      case "property":
        return renderPropertySettings();
      case "email":
        return (
          <div className="p-8 text-center text-gray-500">
            Email Settings - Coming Soon
          </div>
        );
      case "payment":
        return (
          <div className="p-8 text-center text-gray-500">
            Payment Settings - Coming Soon
          </div>
        );
      case "system":
        return (
          <div className="p-8 text-center text-gray-500">
            System Settings - Coming Soon
          </div>
        );
      case "security":
        return (
          <div className="p-8 text-center text-gray-500">
            Security Settings - Coming Soon
          </div>
        );
      default:
        return renderAccountSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6">
        {/* Header */}
        <Card className="p-6 mb-6 border-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-600">
                Manage your Property Harmony preferences
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 border-0">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon size={18} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMaster;
