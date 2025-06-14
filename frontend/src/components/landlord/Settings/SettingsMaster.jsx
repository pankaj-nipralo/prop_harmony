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
  Camera,
  Key,
  Smartphone,
  Clock,
  Globe,
  Moon,
  Sun,
  Monitor,
  Check,
  Eye,
  EyeOff,
  Database,
  LogOut,
  DollarSign,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force navigation even if logout fails
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
    // {
    //   id: "property",
    //   name: "Property Management",
    //   icon: Building,
    //   description: "Default lease terms and property settings",
    // },
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
      id: "security",
      name: "Security",
      icon: Shield,
      description: "Password, 2FA, and security settings",
    },
    {
      id: "payment",
      name: "Payment & Billing",
      icon: CreditCard,
      description: "Bank details and payment processing",
    },
    // {
    //   id: "documents",
    //   name: "Document Management",
    //   icon: FileText,
    //   description: "Templates, storage, and retention policies",
    // },
    // {
    //   id: "communication",
    //   name: "Tenant Communication",
    //   icon: MessageSquare,
    //   description: "Auto-responses and communication settings",
    // },
    // {
    //   id: "system",
    //   name: "System Preferences",
    //   icon: Palette,
    //   description: "Theme, language, and dashboard customization",
    // },
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

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Profile</p>
                <p className="text-2xl font-bold text-gray-900">Complete</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Security</p>
                <p className="text-2xl font-bold text-gray-900">
                  {securitySettings.twoFactorEnabled ? "Enhanced" : "Basic"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Notifications
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    Object.values(
                      notificationSettings.emailNotifications
                    ).filter(Boolean).length
                  }
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Theme</p>
                <p className="text-2xl font-bold text-gray-900 capitalize">
                  {systemSettings.theme}
                </p>
              </div>
            </div>
          </Card>
        </div> */}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
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

                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                        {profileData.profilePicture ? (
                          <img
                            src={profileData.profilePicture}
                            alt="Profile"
                            className="object-cover w-20 h-20 rounded-full"
                          />
                        ) : (
                          <User className="w-10 h-10 text-blue-600" />
                        )}
                      </div>
                      <button className="absolute p-1 text-white transition-colors bg-blue-600 rounded-full -bottom-1 -right-1 hover:bg-blue-700">
                        <Camera size={14} />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Profile Picture
                      </h4>
                      <p className="text-sm text-gray-600">
                        Upload a professional photo
                      </p>
                      <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                      {/* Optional password info or icon can be added here later */}

                      <div className="flex flex-col gap-3 sm:flex-row sm:ml-auto">
                        <button
                          onClick={() => setPasswordChangeModal(true)}
                          className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          Change Password
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Currency Settings */}
            {activeSection === "currency" && (
              <Card className="p-6 bg-white border-0 shadow-sm">
                <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  Currency Settings
                </h3>

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
                      This currency will be used for all rent amounts, fees, and
                      financial calculations
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
                          <span className="font-semibold">
                            {propertySettings.currency}
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-blue-600">
                          Note: Changing currency will affect all future
                          transactions. Existing records will maintain their
                          original currency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Property Management Settings */}
            {activeSection === "property" && (
              <div className="space-y-6">
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Building className="w-5 h-5 text-blue-600" />
                    Default Property Settings
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Default Lease Term (months)
                      </label>
                      <select
                        value={propertySettings.defaultLeaseTerm}
                        onChange={(e) =>
                          setPropertySettings((prev) => ({
                            ...prev,
                            defaultLeaseTerm: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="18">18 months</option>
                        <option value="24">24 months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Rent Due Date
                      </label>
                      <select
                        value={propertySettings.rentDueDate}
                        onChange={(e) =>
                          setPropertySettings((prev) => ({
                            ...prev,
                            rentDueDate: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 28 }, (_, i) => i + 1).map(
                          (day) => (
                            <option key={day} value={day.toString()}>
                              {day}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Late Fee Amount ($)
                      </label>
                      <input
                        type="number"
                        value={propertySettings.lateFeeAmount}
                        onChange={(e) =>
                          setPropertySettings((prev) => ({
                            ...prev,
                            lateFeeAmount: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Late Fee Grace Period (days)
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
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0.5">0.5x Monthly Rent</option>
                        <option value="1">1x Monthly Rent</option>
                        <option value="1.5">1.5x Monthly Rent</option>
                        <option value="2">2x Monthly Rent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Maintenance Response Time (hours)
                      </label>
                      <select
                        value={propertySettings.maintenanceResponseTime}
                        onChange={(e) =>
                          setPropertySettings((prev) => ({
                            ...prev,
                            maintenanceResponseTime: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="12">12 hours</option>
                        <option value="24">24 hours</option>
                        <option value="48">48 hours</option>
                        <option value="72">72 hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Allow Pets by Default
                        </label>
                        <p className="text-xs text-gray-500">
                          New properties will allow pets unless specified
                          otherwise
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={propertySettings.allowPetsByDefault}
                          onChange={(e) =>
                            setPropertySettings((prev) => ({
                              ...prev,
                              allowPetsByDefault: e.target.checked,
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
                          Require Renters Insurance
                        </label>
                        <p className="text-xs text-gray-500">
                          Tenants must provide proof of renters insurance
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={propertySettings.requireRentersInsurance}
                          onChange={(e) =>
                            setPropertySettings((prev) => ({
                              ...prev,
                              requireRentersInsurance: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                <Card className="p-6 bg-white border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Email Notifications
                  </h3>

                  <div className="space-y-4">
                    {Object.entries(
                      notificationSettings.emailNotifications
                    ).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
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
                    ))}
                  </div>
                </Card>

                {/* <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    SMS Notifications
                  </h3>

                  <div className="space-y-4">
                    {Object.entries(notificationSettings.smsNotifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <label className="text-sm font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <p className="text-xs text-gray-500">
                              {key === "urgentMaintenance" &&
                                "SMS alerts for urgent maintenance issues"}
                              {key === "overduePayments" &&
                                "Text notifications for overdue rent payments"}
                              {key === "emergencyContacts" &&
                                "Emergency contact notifications via SMS"}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) =>
                                setNotificationSettings((prev) => ({
                                  ...prev,
                                  smsNotifications: {
                                    ...prev.smsNotifications,
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
                </Card> */}

                <Card className="p-6 bg-white border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Push Notifications
                  </h3>

                  <div className="space-y-4">
                    {Object.entries(notificationSettings.pushNotifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
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
                </Card>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === "security" && (
              <div className="space-y-6">
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Account Security
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Password
                          </h4>
                          <p className="text-xs text-gray-500">
                            Last changed: {securitySettings.passwordLastChanged}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPasswordChangeModal(true)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100 myButton"
                      >
                        Change Password
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Two-Factor Authentication
                        </label>
                        <p className="text-xs text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorEnabled}
                          onChange={(e) =>
                            setSecuritySettings((prev) => ({
                              ...prev,
                              twoFactorEnabled: e.target.checked,
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
                          Login Notifications
                        </label>
                        <p className="text-xs text-gray-500">
                          Get notified when someone logs into your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.loginNotifications}
                          onChange={(e) =>
                            setSecuritySettings((prev) => ({
                              ...prev,
                              loginNotifications: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Session Timeout (minutes)
                      </label>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            sessionTimeout: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="480">8 hours</option>
                      </select>
                      <p className="mt-1 text-xs text-gray-500">
                        Automatically log out after this period of inactivity
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Payment & Billing Settings */}
            {activeSection === "payment" && (
              <div className="space-y-6">
                <Card className="p-6 bg-white border-0 shadow-sm Bank Account">
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
                </Card>

                {/* <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Processing Fees
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Credit Card Fee (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={paymentSettings.processingFees.creditCard}
                        onChange={(e) =>
                          setPaymentSettings((prev) => ({
                            ...prev,
                            processingFees: {
                              ...prev.processingFees,
                              creditCard: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Bank Transfer Fee (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={paymentSettings.processingFees.bankTransfer}
                        onChange={(e) =>
                          setPaymentSettings((prev) => ({
                            ...prev,
                            processingFees: {
                              ...prev.processingFees,
                              bankTransfer: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        PayPal Fee (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={paymentSettings.processingFees.paypal}
                        onChange={(e) =>
                          setPaymentSettings((prev) => ({
                            ...prev,
                            processingFees: {
                              ...prev.processingFees,
                              paypal: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </Card> */}

                <Card className="p-6 bg-white border-0 shadow-sm">
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
                          Automatically deposit rent payments to your bank
                          account
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
                </Card>
              </div>
            )}

            {/* Document Management Settings */}
            {activeSection === "documents" && (
              <div className="space-y-6">
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Default Templates
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Lease Agreement Template
                      </label>
                      <select
                        value={documentSettings.defaultTemplates.leaseAgreement}
                        onChange={(e) =>
                          setDocumentSettings((prev) => ({
                            ...prev,
                            defaultTemplates: {
                              ...prev.defaultTemplates,
                              leaseAgreement: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Standard Residential Lease">
                          Standard Residential Lease
                        </option>
                        <option value="Month-to-Month Agreement">
                          Month-to-Month Agreement
                        </option>
                        <option value="Commercial Lease">
                          Commercial Lease
                        </option>
                        <option value="Student Housing Lease">
                          Student Housing Lease
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Move-In Checklist Template
                      </label>
                      <select
                        value={
                          documentSettings.defaultTemplates.moveInChecklist
                        }
                        onChange={(e) =>
                          setDocumentSettings((prev) => ({
                            ...prev,
                            defaultTemplates: {
                              ...prev.defaultTemplates,
                              moveInChecklist: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Property Inspection Form">
                          Property Inspection Form
                        </option>
                        <option value="Detailed Room Checklist">
                          Detailed Room Checklist
                        </option>
                        <option value="Basic Condition Report">
                          Basic Condition Report
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Move-Out Checklist Template
                      </label>
                      <select
                        value={
                          documentSettings.defaultTemplates.moveOutChecklist
                        }
                        onChange={(e) =>
                          setDocumentSettings((prev) => ({
                            ...prev,
                            defaultTemplates: {
                              ...prev.defaultTemplates,
                              moveOutChecklist: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Move-Out Inspection">
                          Move-Out Inspection
                        </option>
                        <option value="Security Deposit Checklist">
                          Security Deposit Checklist
                        </option>
                        <option value="Final Walkthrough Form">
                          Final Walkthrough Form
                        </option>
                      </select>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Database className="w-5 h-5 text-blue-600" />
                    Storage & Retention
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Document Retention Period (years)
                      </label>
                      <select
                        value={documentSettings.retentionPeriod}
                        onChange={(e) =>
                          setDocumentSettings((prev) => ({
                            ...prev,
                            retentionPeriod: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="3">3 years</option>
                        <option value="5">5 years</option>
                        <option value="7">7 years</option>
                        <option value="10">10 years</option>
                        <option value="permanent">Permanent</option>
                      </select>
                      <p className="mt-1 text-xs text-gray-500">
                        How long to keep documents after tenant moves out
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Automatic Backup
                        </label>
                        <p className="text-xs text-gray-500">
                          Automatically backup documents to cloud storage
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={documentSettings.autoBackup}
                          onChange={(e) =>
                            setDocumentSettings((prev) => ({
                              ...prev,
                              autoBackup: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Cloud Storage Status
                      </label>
                      <div className="flex items-center gap-2 p-3 border border-green-200 rounded-lg bg-green-50">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800 capitalize">
                          {documentSettings.cloudStorage}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Tenant Communication Settings */}
            {activeSection === "communication" && (
              <div className="space-y-6">
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Auto-Response Messages
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Maintenance Request Response
                      </label>
                      <textarea
                        value={
                          communicationSettings.autoResponses
                            .maintenanceRequests
                        }
                        onChange={(e) =>
                          setCommunicationSettings((prev) => ({
                            ...prev,
                            autoResponses: {
                              ...prev.autoResponses,
                              maintenanceRequests: e.target.value,
                            },
                          }))
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter auto-response message for maintenance requests..."
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        General Inquiry Response
                      </label>
                      <textarea
                        value={
                          communicationSettings.autoResponses.generalInquiries
                        }
                        onChange={(e) =>
                          setCommunicationSettings((prev) => ({
                            ...prev,
                            autoResponses: {
                              ...prev.autoResponses,
                              generalInquiries: e.target.value,
                            },
                          }))
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter auto-response message for general inquiries..."
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Communication Preferences
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Tenant Portal Enabled
                        </label>
                        <p className="text-xs text-gray-500">
                          Allow tenants to access the online portal
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={communicationSettings.tenantPortalEnabled}
                          onChange={(e) =>
                            setCommunicationSettings((prev) => ({
                              ...prev,
                              tenantPortalEnabled: e.target.checked,
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
                          Allow Tenant Messaging
                        </label>
                        <p className="text-xs text-gray-500">
                          Enable direct messaging between you and tenants
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={communicationSettings.allowTenantMessaging}
                          onChange={(e) =>
                            setCommunicationSettings((prev) => ({
                              ...prev,
                              allowTenantMessaging: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Business Hours Start
                        </label>
                        <input
                          type="time"
                          value={communicationSettings.businessHours.start}
                          onChange={(e) =>
                            setCommunicationSettings((prev) => ({
                              ...prev,
                              businessHours: {
                                ...prev.businessHours,
                                start: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Business Hours End
                        </label>
                        <input
                          type="time"
                          value={communicationSettings.businessHours.end}
                          onChange={(e) =>
                            setCommunicationSettings((prev) => ({
                              ...prev,
                              businessHours: {
                                ...prev.businessHours,
                                end: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Timezone
                        </label>
                        <select
                          value={communicationSettings.businessHours.timezone}
                          onChange={(e) =>
                            setCommunicationSettings((prev) => ({
                              ...prev,
                              businessHours: {
                                ...prev.businessHours,
                                timezone: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="EST">EST - Eastern</option>
                          <option value="CST">CST - Central</option>
                          <option value="MST">MST - Mountain</option>
                          <option value="PST">PST - Pacific</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* System Preferences Settings */}
            {activeSection === "system" && (
              <div className="space-y-6">
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Palette className="w-5 h-5 text-blue-600" />
                    Appearance & Layout
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["light", "dark", "auto"].map((theme) => (
                          <button
                            key={theme}
                            onClick={() =>
                              setSystemSettings((prev) => ({
                                ...prev,
                                theme: theme,
                              }))
                            }
                            className={`p-3 border rounded-lg text-center transition-colors ${
                              systemSettings.theme === theme
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center justify-center mb-2">
                              {theme === "light" && <Sun className="w-5 h-5" />}
                              {theme === "dark" && <Moon className="w-5 h-5" />}
                              {theme === "auto" && (
                                <Monitor className="w-5 h-5" />
                              )}
                            </div>
                            <span className="text-sm font-medium capitalize">
                              {theme}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Dashboard Layout
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["grid", "list"].map((layout) => (
                          <button
                            key={layout}
                            onClick={() =>
                              setSystemSettings((prev) => ({
                                ...prev,
                                dashboardLayout: layout,
                              }))
                            }
                            className={`p-3 border rounded-lg text-center transition-colors ${
                              systemSettings.dashboardLayout === layout
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="text-sm font-medium capitalize">
                              {layout} View
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Compact Mode
                        </label>
                        <p className="text-xs text-gray-500">
                          Use smaller spacing and condensed layouts
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={systemSettings.compactMode}
                          onChange={(e) =>
                            setSystemSettings((prev) => ({
                              ...prev,
                              compactMode: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Localization
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <select
                        value={systemSettings.language}
                        onChange={(e) =>
                          setSystemSettings((prev) => ({
                            ...prev,
                            language: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Timezone
                      </label>
                      <select
                        value={systemSettings.timezone}
                        onChange={(e) =>
                          setSystemSettings((prev) => ({
                            ...prev,
                            timezone: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">
                          Pacific Time
                        </option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      <Dialog open={passwordChangeModal} onOpenChange={setPasswordChangeModal}>
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Change Password
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePasswordChange();
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPasswords.current ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          new: !prev.new,
                        }))
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPasswords.new ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {passwordData.newPassword && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.checks.hasLength
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span
                          className={
                            passwordValidation.checks.hasLength
                              ? "text-green-600"
                              : "text-gray-500"
                          }
                        >
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.checks.hasUpper
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span
                          className={
                            passwordValidation.checks.hasUpper
                              ? "text-green-600"
                              : "text-gray-500"
                          }
                        >
                          Uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.checks.hasLower
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span
                          className={
                            passwordValidation.checks.hasLower
                              ? "text-green-600"
                              : "text-gray-500"
                          }
                        >
                          Lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.checks.hasNumber
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span
                          className={
                            passwordValidation.checks.hasNumber
                              ? "text-green-600"
                              : "text-gray-500"
                          }
                        >
                          Number
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            passwordValidation.checks.hasSpecial
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span
                          className={
                            passwordValidation.checks.hasSpecial
                              ? "text-green-600"
                              : "text-gray-500"
                          }
                        >
                          Special character
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                  {passwordData.confirmPassword &&
                    passwordData.newPassword !==
                      passwordData.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600">
                        Passwords do not match
                      </p>
                    )}
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setPasswordChangeModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    !passwordValidation.isValid ||
                    passwordData.newPassword !== passwordData.confirmPassword
                  }
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 myButton disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog
        open={confirmationModal.open}
        onOpenChange={() =>
          setConfirmationModal({
            open: false,
            title: "",
            message: "",
            action: null,
          })
        }
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              {confirmationModal.title}
            </h2>
            <p className="mb-6 text-gray-600">{confirmationModal.message}</p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  setConfirmationModal({
                    open: false,
                    title: "",
                    message: "",
                    action: null,
                  })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmationModal.action}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 myButton"
              >
                Confirm
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsMaster;
