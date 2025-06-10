import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  Shield,
  Phone,
  Mail,
  Calendar,
  Building,
  Users,
  DollarSign,
} from "lucide-react";

const UserProfile = ({ className = "" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleSettings = () => {
    setIsOpen(false);
    const basePath =
      user?.role === "landlord"
        ? "/landlord"
        : user?.role === "tenant"
        ? "/tenant"
        : "/property-manager";
    navigate(`${basePath}/settings`);
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "landlord":
        return "Landlord";
      case "tenant":
        return "Tenant";
      case "property_manager":
        return "Property Manager";
      default:
        return "User";
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "landlord":
        return "bg-blue-100 text-blue-800";
      case "tenant":
        return "bg-green-100 text-green-800";
      case "property_manager":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatsForRole = () => {
    if (!user) return [];

    switch (user.role) {
      case "landlord":
        return [
          { icon: Building, label: "Properties", value: user.properties || 0 },
          { icon: Users, label: "Tenants", value: user.totalTenants || 0 },
          {
            icon: DollarSign,
            label: "Monthly Revenue",
            value: `$${(user.monthlyRevenue || 0).toLocaleString()}`,
          },
        ];
      case "tenant":
        return [
          {
            icon: Building,
            label: "Current Property",
            value: user.currentProperty ? "1" : "0",
          },
          {
            icon: DollarSign,
            label: "Monthly Rent",
            value: `$${(user.monthlyRent || 0).toLocaleString()}`,
          },
          {
            icon: Calendar,
            label: "Lease End",
            value: user.leaseEndDate
              ? new Date(user.leaseEndDate).toLocaleDateString()
              : "N/A",
          },
        ];
      case "property_manager":
        return [
          {
            icon: Building,
            label: "Managed Properties",
            value: user.managedProperties || 0,
          },
          {
            icon: Users,
            label: "Managed Tenants",
            value: user.managedTenants || 0,
          },
          { icon: Shield, label: "Company", value: user.company || "N/A" },
        ];
      default:
        return [];
    }
  };

  if (!user) return null;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 transition-colors rounded-lg hover:bg-gray-100"
      >
        {/* Avatar */}
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="object-cover w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>

        {/* User Info */}
        <div className="hidden text-left md:block">
          <p className="text-sm font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-500">
            {getRoleDisplayName(user.role)}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full w-80">
          {/* User Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                      user.role
                    )}`}
                  >
                    {getRoleDisplayName(user.role)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          {/* <div className="p-4 border-b border-gray-200">
            <h4 className="mb-3 text-sm font-medium text-gray-900">
              Quick Stats
            </h4>
            <div className="space-y-2">
              {getStatsForRole().map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Actions */}
          <div className="p-2">
            <button
              onClick={handleSettings}
              className="flex items-center w-full gap-3 px-3 py-2 text-sm text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-3 px-3 py-2 text-sm text-red-600 transition-colors rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
