// Navigation configuration for all dashboard types
import { 
  LayoutDashboard, 
  Home, 
  FileText, 
  Eye, 
  Users, 
  DollarSign, 
  Wrench, 
  BarChart3,
  Settings,
  Building2,
  ClipboardList,
  MessageSquare,
  Calendar,
  Shield
} from "lucide-react";

export const NAVIGATION_CONFIG = {
  landlord: {
    primary: [
      { key: "overview", label: "Overview", icon: LayoutDashboard, path: "/landlord/dashboard" },
      { key: "properties", label: "Properties", icon: Building2, path: "/landlord/properties" },
      { key: "tenants", label: "Tenants", icon: Users, path: "/landlord/tenants" },
      { key: "applications", label: "Applications", icon: FileText, path: "/landlord/applications" },
      { key: "payments", label: "Payments", icon: DollarSign, path: "/landlord/payments" },
      { key: "maintenance", label: "Maintenance", icon: Wrench, path: "/landlord/maintenance" },
      { key: "reports", label: "Reports", icon: BarChart3, path: "/landlord/reports" }
    ],
    secondary: [
      { key: "messages", label: "Messages", icon: MessageSquare, path: "/landlord/messages" },
      { key: "inspections", label: "Inspections", icon: Eye, path: "/landlord/inspections" },
      { key: "settings", label: "Settings", icon: Settings, path: "/landlord/settings" }
    ]
  },
  
  tenant: {
    primary: [
      { key: "overview", label: "Overview", icon: LayoutDashboard, path: "/tenant/dashboard" },
      { key: "properties", label: "My Properties", icon: Home, path: "/tenant/properties" },
      { key: "payments", label: "Payments", icon: DollarSign, path: "/tenant/payments" },
      { key: "maintenance", label: "Maintenance", icon: Wrench, path: "/tenant/maintenance" },
      { key: "applications", label: "Applications", icon: FileText, path: "/tenant/applications" }
    ],
    secondary: [
      { key: "inspections", label: "Inspections", icon: Eye, path: "/tenant/inspections" },
      { key: "messages", label: "Messages", icon: MessageSquare, path: "/tenant/messages" },
      { key: "settings", label: "Settings", icon: Settings, path: "/tenant/settings" }
    ]
  },
  
  property_manager: {
    primary: [
      { key: "overview", label: "Overview", icon: LayoutDashboard, path: "/property-manager/dashboard" },
      { key: "properties", label: "Properties", icon: Building2, path: "/property-manager/properties" },
      { key: "tenants", label: "Tenants", icon: Users, path: "/property-manager/tenants" },
      { key: "work-orders", label: "Work Orders", icon: ClipboardList, path: "/property-manager/work-orders" },
      { key: "rent-collection", label: "Rent Collection", icon: DollarSign, path: "/property-manager/rent-collection" },
      { key: "lease-management", label: "Lease Management", icon: FileText, path: "/property-manager/lease-management" }
    ],
    secondary: [
      { key: "contractors", label: "Contractors", icon: Shield, path: "/property-manager/contractors" },
      { key: "inspections", label: "Inspections", icon: Eye, path: "/property-manager/inspections" },
      { key: "reports", label: "Reports", icon: BarChart3, path: "/property-manager/reports" },
      { key: "settings", label: "Settings", icon: Settings, path: "/property-manager/settings" }
    ]
  }
};

// Dashboard tab configurations
export const DASHBOARD_TABS = {
  landlord: [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "properties", label: "Properties", icon: Building2 },
    { key: "maintenance", label: "Maintenance", icon: Wrench },
    { key: "payments", label: "Payments", icon: DollarSign }
  ],
  
  tenant: [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "properties", label: "Properties", icon: Home },
    { key: "applications", label: "Applications", icon: FileText },
    { key: "inspections", label: "Inspections", icon: Eye }
  ],
  
  property_manager: [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "properties", label: "Properties", icon: Building2 },
    { key: "work-orders", label: "Work Orders", icon: ClipboardList },
    { key: "analytics", label: "Analytics", icon: BarChart3 }
  ]
};
