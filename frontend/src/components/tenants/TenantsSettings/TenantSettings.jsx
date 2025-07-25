// components/TenantSettings.jsx
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Settings,
  User,
  Home,
  Bell,
  CreditCard,
  Save,
} from "lucide-react";
import SettingsNav from "./SettingsNav";
import ProfileSettings from "./ProfileSettings";
import PasswordChangeModal from "./PasswordChangeModal";
import PropertyPreferences from "./PropertyPreferences";
import PaymentMethods from "./PaymentMethods";

const settingsSections = [
  {
    id: "profile",
    name: "Profile Settings",
    icon: User,
    description: "Personal information and emergency contacts",
  },
  {
    id: "property",
    name: "Property Preferences",
    icon: Home,
    description: "Maintenance and property-related preferences",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
    description: "Email, SMS, and push notification preferences",
  },
  {
    id: "payment",
    name: "Payment Methods",
    icon: CreditCard,
    description: "Auto-pay and payment method management",
  },
];

const TenantSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 987-6543",
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Brother",
      phone: "+1 (555) 123-4567",
    },
    profilePicture: null,
  });

  // Property preferences state
  const [propertyPreferences, setPropertyPreferences] = useState({
    maintenanceNotifications: true,
    inspectionReminders: true,
    leaseRenewalAlerts: true,
    communityUpdates: true,
    preferredContactMethod: "email",
    maintenanceTimePreference: "morning",
    allowLandlordEntry: true,
    packageDeliveryInstructions: "Leave at front door",
  });

  // Security state
  const [securitySettings, setSecuritySettings] = useState({
    passwordLastChanged: "2024-05-20",
  });

  // Payment state
  const [paymentSettings, setPaymentSettings] = useState({
    autoPayEnabled: false,
    paymentMethod: "bank_transfer",
    paymentReminders: true,
    receiptPreferences: "email",
    savedPaymentMethods: [
      {
        id: 1,
        type: "bank",
        name: "Chase Checking ****1234",
        isDefault: true,
      },
      {
        id: 2,
        type: "card",
        name: "Visa ****5678",
        isDefault: false,
      },
    ],
  });

  // Password change state
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Payment method form state
  const [showPaymentModal, setShowPaymentModal] = useState({
    open: false,
    method: null,
  });
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    type: "bank",
  });
  const [formError, setFormError] = useState("");

  const handleSaveSettings = (section) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = `${
        settingsSections.find((s) => s.id === section)?.name
      } updated successfully!`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
    }, 1500);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPasswordChangeModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = "Password changed successfully!";
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
    }, 2000);
  };

  const validatePassword = (password) => {
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: hasLength && hasUpper && hasLower && hasNumber && hasSpecial,
      checks: { hasLength, hasUpper, hasLower, hasNumber, hasSpecial },
    };
  };

  const passwordValidation = validatePassword(passwordData.newPassword);

  const handleAddEditPayment = (method = null) => {
    if (method) {
      setPaymentForm({
        name: method.name,
        type: method.type,
      });
    } else {
      setPaymentForm({
        name: "",
        type: "bank",
      });
    }
    setShowPaymentModal({ open: true, method });
  };

  const handleSavePaymentMethod = () => {
    if (!paymentForm.name.trim()) {
      setFormError("Name is required.");
      return;
    }
    setFormError("");
    if (showPaymentModal.method) {
      // Edit existing
      setPaymentSettings((prev) => ({
        ...prev,
        savedPaymentMethods: prev.savedPaymentMethods.map((m) =>
          m.id === showPaymentModal.method.id ? { ...m, ...paymentForm } : m
        ),
      }));
    } else {
      // Add new
      setPaymentSettings((prev) => ({
        ...prev,
        savedPaymentMethods: [
          ...prev.savedPaymentMethods,
          {
            id: Date.now(),
            ...paymentForm,
            isDefault: prev.savedPaymentMethods.length === 0,
          },
        ],
      }));
    }
    setShowPaymentModal({ open: false, method: null });
    setPaymentForm({ name: "", type: "bank" });
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tenant Settings
              </h1>
              <p className="text-gray-600">
                Manage your account and preferences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSaveSettings(activeSection)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg myButton hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <Save size={16} />
              )}
              Save Changes
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 mt-10 lg:grid-cols-4">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4 bg-white border-0 shadow-sm">
              <SettingsNav
                sections={settingsSections}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeSection === "profile" && (
              <Card className="p-6 bg-white border-0 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold text-gray-900">
                  Profile Settings
                </h3>
                <ProfileSettings
                  profileData={profileData}
                  setProfileData={setProfileData}
                  securitySettings={securitySettings}
                  setPasswordChangeModal={setPasswordChangeModal}
                />
              </Card>
            )}

            {/* Property Preferences Settings */}
            {activeSection === "property" && (
              <div className="space-y-6">
                <Card className="p-6 bg-white border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Home className="w-5 h-5 text-blue-600" />
                    Property Preferences
                  </h3>
                  <PropertyPreferences
                    propertyPreferences={propertyPreferences}
                    setPropertyPreferences={setPropertyPreferences}
                  />
                </Card>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                <Card className="p-6 bg-white border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Notification Preferences
                  </h3>
                  <div className="space-y-6">
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
                          Lease Renewal Alerts
                        </label>
                        <p className="text-xs text-gray-500">
                          Receive alerts about lease renewal deadlines
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={propertyPreferences.leaseRenewalAlerts}
                          onChange={(e) =>
                            setPropertyPreferences((prev) => ({
                              ...prev,
                              leaseRenewalAlerts: e.target.checked,
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
                          Community Updates
                        </label>
                        <p className="text-xs text-gray-500">
                          Stay informed about community news and events
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={propertyPreferences.communityUpdates}
                          onChange={(e) =>
                            setPropertyPreferences((prev) => ({
                              ...prev,
                              communityUpdates: e.target.checked,
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
                        <option value="sms">SMS</option>
                        <option value="phone">Phone Call</option>
                        <option value="app">Mobile App</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Payment Methods Settings */}
            {activeSection === "payment" && (
              <div className="space-y-6">
                <Card className="p-6 bg-white border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Auto-Pay Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Enable Auto-Pay
                        </label>
                        <p className="text-xs text-gray-500">
                          Automatically pay rent on the due date each month
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentSettings.autoPayEnabled}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              autoPayEnabled: e.target.checked,
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
                          Get notified before rent is due
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

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Receipt Delivery
                      </label>
                      <select
                        value={paymentSettings.receiptPreferences}
                        onChange={(e) =>
                          setPaymentSettings((prev) => ({
                            ...prev,
                            receiptPreferences: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="both">Email & SMS</option>
                        <option value="none">No Receipt</option>
                      </select>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white border-0 shadow-sm">
                  <PaymentMethods
                    paymentSettings={paymentSettings}
                    setPaymentSettings={setPaymentSettings}
                    handleAddEditPayment={handleAddEditPayment}
                  />
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      <PasswordChangeModal
        open={passwordChangeModal}
        setOpen={setPasswordChangeModal}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        showPasswords={showPasswords}
        setShowPasswords={setShowPasswords}
        handlePasswordChange={handlePasswordChange}
        passwordValidation={passwordValidation}
      />

      {/* Add/Edit Payment Modal */}
      <Dialog
        open={showPaymentModal.open}
        onOpenChange={() => setShowPaymentModal({ open: false, method: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              {showPaymentModal.method
                ? "Edit Payment Method"
                : "Add Payment Method"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSavePaymentMethod();
              }}
            >
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={paymentForm.name}
                  onChange={(e) =>
                    setPaymentForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Visa ****1234 or Chase Checking ****5678"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={paymentForm.type}
                  onChange={(e) =>
                    setPaymentForm((f) => ({ ...f, type: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bank">Bank Account</option>
                  <option value="card">Credit Card</option>
                </select>
              </div>
              {formError && (
                <div className="mb-2 text-sm text-red-600">{formError}</div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowPaymentModal({ open: false, method: null })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantSettings;