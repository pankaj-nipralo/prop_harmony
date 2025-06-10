import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import {
  LayoutDashboard,
  Home,
  History,
  Search,
  Users,
  AlertTriangle,
  ClipboardCheck,
  Wrench,
  Star,
  MessageCircle,
  HandCoins,
  CreditCard,
  Settings,
} from "lucide-react";
import { TopBar } from "@/components/layout/Topbar";

const navItems = [
  { label: "Dashboard", path: "/tenants/dashboard", icon: LayoutDashboard },
  { label: "Rental Search", path: "/tenants/rental-search", icon: Search },
  { label: "My Offers", path: "/tenants/my-offers", icon: HandCoins },
  { label: "My Property", path: "/tenants/properties", icon: Home },
  {
    label: "Past Properties",
    path: "/tenants/past-properties",
    icon: History,
  },
  {
    label: "Property Managers",
    path: "/tenants/property-manager",
    icon: Users,
  },
  {
    label: "Report Landlord",
    path: "/tenants/report-landlord",
    icon: AlertTriangle,
  },
  {
    label: "Property Inspections",
    path: "/tenants/property-inspection",
    icon: ClipboardCheck,
  },
  { label: "Maintenance", path: "/tenants/maintenance", icon: Wrench },
  { label: "Ratings", path: "/tenants/ratings", icon: Star },
  { label: "Emails", path: "/tenants/emails", icon: MessageCircle },
  { label: "Payments", path: "/tenants/payemnts", icon: CreditCard },
  { label: "Settings", path: "/tenants/settings", icon: Settings },
];

const TenantsLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        title={"Prop Harmony"}
        user={"Tenant"}
      />
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

export default TenantsLayout;
