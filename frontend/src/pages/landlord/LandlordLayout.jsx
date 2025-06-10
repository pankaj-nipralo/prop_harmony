import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import {
  LayoutDashboard,
  Home,
  List,
  Search,
  Users,
  Briefcase,
  ShieldAlert,
  ClipboardCheck,
  Wrench,
  FileText,
  Calculator,
  FileArchive,
  Star,
  MessageCircle,
  CreditCard,
  BarChart3,
  Settings,
  FileUser,
} from "lucide-react";
import { TopBar } from "@/components/layout/Topbar";

const navItems = [
  { label: "Dashboard", path: "/landlord/dashboard", icon: LayoutDashboard },
  { label: "Properties", path: "/landlord/properties", icon: Home },
  {
    label: "Property Listings",
    path: "/landlord/property-listings",
    icon: List,
  },
  { label: "Rental Search", path: "/landlord/rental-search", icon: Search },
  { label: "Applications", path: "/landlord/applications", icon: FileUser },
  { label: "My Tenants", path: "/landlord/my-tenants", icon: Users },
  {
    label: "Property Managers",
    path: "/landlord/property-manager",
    icon: Briefcase,
  },
  {
    label: "Issue Warning",
    path: "/landlord/issue-warning",
    icon: ShieldAlert,
  },
  {
    label: "Property Inspections",
    path: "/landlord/property-inspection",
    icon: ClipboardCheck,
  },
  { label: "Maintenance", path: "/landlord/maintenance", icon: Wrench },
  { label: "Bookkeeping", path: "/landlord/bookkeeping", icon: FileText },
  {
    label: "Investment Calculator",
    path: "/landlord/investment-calculator",
    icon: Calculator,
  },
  {
    label: "Document Vault",
    path: "/landlord/document-vault",
    icon: FileArchive,
  },
  { label: "Ratings", path: "/landlord/ratings", icon: Star },
  { label: "Emails", path: "/landlord/messages", icon: MessageCircle },
  { label: "Payments", path: "/landlord/payemnts", icon: CreditCard },
  { label: "Reports", path: "/landlord/reports", icon: BarChart3 },
  { label: "Settings", path: "/landlord/settings", icon: Settings },
];

const LandLordLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar navItems={navItems} title={"Prop Harmony"} user={"Landlord"} />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* TopBar with mobile menu button */}
        <TopBar
          navItems={navItems} // Pass the same navItems
        />

        {/* Main content area */}
        <main className="flex-1 p-4 overflow-y-auto md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LandLordLayout;
