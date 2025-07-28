import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Settings,
  User,
  Building,
  Bell,
  Shield,
  CreditCard,
  FileText,
  MessageSquare,
  Palette,
  Save,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DirhamSvg from "@/assets/Dirham";

// Import components
import ProfileSettings from "./ProfileSettings";
import CurrencySettings from "./CurrencySettings";
import NotificationSettings from "./NotificationSettings";
import PaymentSettings from "./PaymentSettings";
import PasswordChangeModal from "./PasswordChangeModal";
import ConfirmationModal from "./ConfirmationModal";

const SettingsMaster = () => {
  // Active section state
  const [activeSection, setActiveSection] = useState("profile");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Modal states
  const [profileEditModal, setProfileEditModal] = useState(false);
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    title: "",
    message: "",
    action: null,
  });

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: "Pankaj",
    lastName: "Gupta",
    email: "SP@propharmony.com",
    phone: "+91 12345 67890",
    address: "106, Main Street, City, State 12345",
    company: "SP LLC",
    profilePicture: null,
  });

  const [propertySettings, setPropertySettings] = useState({
    defaultLeaseTerm: "12",
    rentDueDate: "1",
    lateFeeAmount: "50",
    lateFeeGracePeriod: "5",
    securityDepositMultiplier: "1",
    maintenanceResponseTime: "24",
    allowPetsByDefault: false,
    requireRentersInsurance: true,
    defaultRentAmount: "1250",
    currency: "AED",
    paymentDueDay: "1",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      rentPayments: true,
      maintenanceRequests: true,
      tenantMessages: true,
      leaseExpirations: true,
      systemUpdates: false,
    },
    smsNotifications: {
      urgentMaintenance: true,
      overduePayments: true,
      emergencyContacts: true,
    },
    pushNotifications: {
      realTimeAlerts: true,
      dailySummary: true,
    },
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: "30",
    passwordLastChanged: "2024-05-15",
  });

  const [paymentSettings, setPaymentSettings] = useState({
    bankAccount: {
      accountName: "Smith Properties LLC",
      routingNumber: "****5678",
      accountNumber: "****1234",
    },
    processingFees: {
      creditCard: "2.9",
      bankTransfer: "0.5",
      paypal: "3.2",
    },
    autoDeposit: true,
    paymentReminders: true,
  });

  const [documentSettings, setDocumentSettings] = useState({
    defaultTemplates: {
      leaseAgreement: "Standard Residential Lease",
      moveInChecklist: "Property Inspection Form",
      moveOutChecklist: "Move-Out Inspection",
    },
    retentionPeriod: "7",
    autoBackup: true,
    cloudStorage: "enabled",
  });

  const [communicationSettings, setCommunicationSettings] = useState({
    autoResponses: {
      maintenanceRequests:
        "Thank you for your maintenance request. We will respond within 24 hours.",
      generalInquiries:
        "Thank you for contacting us. We will get back to you soon.",
    },
    tenantPortalEnabled: true,
    allowTenantMessaging: true,
    businessHours: {
      start: "09:00",
      end: "17:00",
      timezone: "EST",
    },
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: "light",
    language: "en",
    timezone: "America/New_York",
    dashboardLayout: "grid",
    compactMode: false,
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Settings sections configuration
  const settingsSections = [
    {
      id: "profile",
      name: "Profile Settings",
      icon: User,
      description: "Personal information and contact details",
    },
    {
      id: "currency",
      name: "Currency",
      icon: Building,
      description: "Currency settings",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: Bell,
      description: "Email, SMS, and push notification preferences",
    },
    {
      id: "payment",
      name: "Payment & Billing",
      icon: CreditCard,
      description: "Bank details and payment processing",
    },
  ];

  // Handler functions
  const handleSaveSettings = (section) => {
    setIsLoading(true);

    // Simulate API call
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

    setConfirmationModal({
      open: true,
      title: "Change Password",
      message:
        "Are you sure you want to change your password? You will need to log in again.",
      action: () => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setPasswordChangeModal(false);
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setConfirmationModal({
            open: false,
            title: "",
            message: "",
            action: null,
          });

          const notification = document.createElement("div");
          notification.className =
            "fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
          notification.textContent = "Password changed successfully!";
          document.body.appendChild(notification);
          setTimeout(() => notification.remove(), 4000);
        }, 2000);
      },
    });
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">
                Manage your account and system preferences
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mt-7">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4 bg-white border-0 shadow-sm">
              <nav className="space-y-2">
                {settingsSections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <IconComponent size={18} />
                      <div className="flex-1">
                        <span className="block text-sm font-medium">
                          {section.name}
                        </span>
                        <span className="block text-xs opacity-75">
                          {section.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {activeSection === "profile" && (
              <Card className="p-6 bg-white border-0 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold text-gray-900">
                  Profile Settings
                </h3>
                <ProfileSettings
                  profileData={profileData}
                  setProfileData={setProfileData}
                  setPasswordChangeModal={setPasswordChangeModal}
                />
              </Card>
            )}

            {activeSection === "currency" && (
              <Card className="p-6 bg-white border-0 shadow-sm">
                <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                  <DirhamSvg className="w-5 h-5 text-blue-600" />
                  Currency Settings
                </h3>
                <CurrencySettings
                  propertySettings={propertySettings}
                  setPropertySettings={setPropertySettings}
                />
              </Card>
            )}

            {activeSection === "notifications" && (
              <NotificationSettings
                notificationSettings={notificationSettings}
                setNotificationSettings={setNotificationSettings}
              />
            )}

            {activeSection === "payment" && (
              <PaymentSettings
                paymentSettings={paymentSettings}
                setPaymentSettings={setPaymentSettings}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <PasswordChangeModal
        passwordChangeModal={passwordChangeModal}
        setPasswordChangeModal={setPasswordChangeModal}
        handlePasswordChange={handlePasswordChange}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
      />

      <ConfirmationModal
        confirmationModal={confirmationModal}
        setConfirmationModal={setConfirmationModal}
      />
    </div>
  );
};

export default SettingsMaster;