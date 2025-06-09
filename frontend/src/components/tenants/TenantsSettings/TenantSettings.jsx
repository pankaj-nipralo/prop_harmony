import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Settings,
  User,
  Home,
  Bell,
  Shield,
  CreditCard,
  MessageSquare,
  Palette,
  Save,
  Camera,
  Key,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  DollarSign,
  Smartphone,
  Sun,
  Moon,
  Monitor,
  FileText,
  Wrench,
  Calendar,
  Receipt,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const TenantSettings = () => {
  // Active section state
  const [activeSection, setActiveSection] = useState("profile");

  // Modal states
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    title: "",
    message: "",
    action: null,
  });

  // Form states
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

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      rentReminders: true,
      maintenanceUpdates: true,
      landlordMessages: true,
      leaseDocuments: true,
      communityNews: false,
      paymentConfirmations: true,
    },
    smsNotifications: {
      urgentMaintenance: true,
      rentDueReminders: true,
      emergencyAlerts: true,
    },
    pushNotifications: {
      realTimeAlerts: true,
      dailyReminders: true,
    },
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: "30",
    passwordLastChanged: "2024-05-20",
    privacyLevel: "standard",
  });

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

  const [maintenancePreferences, setMaintenancePreferences] = useState({
    preferredTimeSlots: ["morning", "afternoon"],
    allowEmergencyEntry: true,
    requireAdvanceNotice: true,
    advanceNoticeHours: "24",
    specialInstructions: "Please call before entering. Dog on premises.",
    contactPreference: "phone",
  });

  const [communicationSettings, setCommunicationSettings] = useState({
    landlordMessaging: true,
    communityForum: true,
    anonymousFeedback: true,
    languagePreference: "en",
    responseTimeExpectation: "24_hours",
    communicationStyle: "formal",
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: "light",
    language: "en",
    timezone: "America/New_York",
    dashboardLayout: "grid",
    compactMode: false,
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
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

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Settings sections configuration for tenants
  const settingsSections = [
    {
      id: "profile",
      name: "Profile Settings",
      icon: User,
      description: "Personal information and emergency contacts",
    },
    // {
    //   id: "property",
    //   name: "Property Preferences",
    //   icon: Home,
    //   description: "Maintenance and property-related preferences",
    // },
    {
      id: "notifications",
      name: "Notifications",
      icon: Bell,
      description: "Email, SMS, and push notification preferences",
    },
    // {
    //   id: "security",
    //   name: "Security & Privacy",
    //   icon: Shield,
    //   description: "Password, 2FA, and privacy settings",
    // },
    {
      id: "payment",
      name: "Payment Methods",
      icon: CreditCard,
      description: "Auto-pay and payment method management",
    },
    // {
    //   id: "maintenance",
    //   name: "Maintenance Preferences",
    //   icon: Wrench,
    //   description: "Service scheduling and access preferences",
    // },
    // {
    //   id: "communication",
    //   name: "Communication",
    //   icon: MessageSquare,
    //   description: "Landlord communication and community settings",
    // },
    // {
    //   id: "system",
    //   name: "System Preferences",
    //   icon: Palette,
    //   description: "Theme, language, and display customization",
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
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Auto-Pay</p>
                <p className="text-2xl font-bold text-gray-900">
                  {paymentSettings.autoPayEnabled ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </Card>
        </div> */}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 mt-10 lg:grid-cols-4">
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
            {/* Profile Settings */}
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
                  </div>

                  {/* Emergency Contact */}
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="mb-4 text-sm font-semibold text-gray-900">
                      Emergency Contact
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          value={profileData.emergencyContact.name}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              emergencyContact: {
                                ...prev.emergencyContact,
                                name: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Relationship
                        </label>
                        <select
                          value={profileData.emergencyContact.relationship}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              emergencyContact: {
                                ...prev.emergencyContact,
                                relationship: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Parent">Parent</option>
                          <option value="Sibling">Sibling</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Friend">Friend</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.emergencyContact.phone}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              emergencyContact: {
                                ...prev.emergencyContact,
                                phone: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Change Password Section */}
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between">
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
                        className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200 myButton"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
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

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          Maintenance Notifications
                        </label>
                        <p className="text-xs text-gray-500">
                          Receive updates about maintenance requests and
                          schedules
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
                            {key === "rentReminders" &&
                              "Get reminders about upcoming rent payments"}
                            {key === "maintenanceUpdates" &&
                              "Receive updates on maintenance requests"}
                            {key === "landlordMessages" &&
                              "Get notified of new landlord messages"}
                            {key === "leaseDocuments" &&
                              "Alerts for new lease documents"}
                            {key === "communityNews" &&
                              "Updates about community events and news"}
                            {key === "paymentConfirmations" &&
                              "Confirmations for rent payments"}
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

                <Card className="p-6 bg-white border-0 shadow-sm">
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
                              {key === "rentDueReminders" &&
                                "Text reminders when rent is due"}
                              {key === "emergencyAlerts" &&
                                "Emergency notifications via SMS"}
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
                </Card>
              </div>
            )}

            {/* Payment Methods Settings */}
            {activeSection === "payment" && (
              <div className="space-y-6">
                <Card className="p-6 border-0 shadow-sm">
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

                <Card className="p-6 border-0 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      Saved Payment Methods
                    </h3>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100 myButton">
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
                                method.type === "bank"
                                  ? "bg-green-100"
                                  : "bg-purple-100"
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
                                {method.type === "bank"
                                  ? "Bank Account"
                                  : "Credit Card"}
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
                                    savedPaymentMethods:
                                      prev.savedPaymentMethods.map((m) => ({
                                        ...m,
                                        isDefault: m.id === method.id,
                                      })),
                                  }));
                                }}
                                className="px-3 py-1 text-xs font-medium text-blue-600 transition-colors rounded bg-blue-50 hover:bg-blue-100"
                              >
                                Set Default
                              </button>
                            )}
                            <button className="p-2 text-gray-400 transition-colors rounded hover:text-gray-600 hover:bg-gray-100">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-400 transition-colors rounded hover:text-red-600 hover:bg-red-50">
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
                        Add a payment method to enable auto-pay and quick
                        payments.
                      </p>
                      <button className="flex items-center gap-2 px-4 py-2 mx-auto text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 myButton">
                        <Plus className="w-4 h-4" />
                        Add Your First Payment Method
                      </button>
                    </div>
                  )}
                </Card>

                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-gray-900">
                    <Receipt className="w-5 h-5 text-blue-600" />
                    Payment History
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            December 2024 Rent
                          </p>
                          <p className="text-xs text-gray-500">
                            Paid on Dec 1, 2024 • Auto-Pay
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          $1,250.00
                        </p>
                        <button className="text-xs text-blue-600 hover:text-blue-800">
                          View Receipt
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            November 2024 Rent
                          </p>
                          <p className="text-xs text-gray-500">
                            Paid on Nov 1, 2024 • Manual Payment
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          $1,250.00
                        </p>
                        <button className="text-xs text-blue-600 hover:text-blue-800">
                          View Receipt
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            October 2024 Rent
                          </p>
                          <p className="text-xs text-gray-500">
                            Paid on Oct 1, 2024 • Auto-Pay
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          $1,250.00
                        </p>
                        <button className="text-xs text-blue-600 hover:text-blue-800">
                          View Receipt
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      View All Payment History
                    </button>
                  </div>
                </Card>
              </div>
            )}

            {/* Placeholder for other sections */}
            {activeSection !== "profile" &&
              activeSection !== "property" &&
              activeSection !== "notifications" &&
              activeSection !== "payment" && (
                <Card className="p-12 text-center border-0 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 rounded-full">
                      {settingsSections.find((s) => s.id === activeSection)
                        ?.icon &&
                        React.createElement(
                          settingsSections.find((s) => s.id === activeSection)
                            .icon,
                          {
                            className: "w-8 h-8 text-gray-400",
                          }
                        )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {
                        settingsSections.find((s) => s.id === activeSection)
                          ?.name
                      }
                    </h3>
                    <p className="text-gray-600">
                      {
                        settingsSections.find((s) => s.id === activeSection)
                          ?.description
                      }
                    </p>
                    <p className="text-sm text-gray-500">
                      This section is coming soon. Stay tuned for updates!
                    </p>
                  </div>
                </Card>
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

export default TenantSettings;
