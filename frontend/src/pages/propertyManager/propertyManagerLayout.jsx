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
  { label: "Properties", path: "/tenants/properties", icon: Home },
  { label: "Work Orders", path: "/tenants/rental-search", icon: Search },
  { label: "Rent Collection", path: "/tenants/my-offers", icon: HandCoins },
  {
    label: "Lease Management",
    path: "/tenants/past-properties",
    icon: History,
  },
  {
    label: "Tenant Coordination",
    path: "/tenants/property-manager",
    icon: Users,
  },
  {
    label: "Inspections",
    path: "/tenants/property-inspection",
    icon: ClipboardCheck,
  },
  { label: "Emails", path: "/tenants/messages", icon: MessageCircle },
  { label: "Settings", path: "/tenants/settings", icon: Settings },
];

const PropertyManagerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar navItems={navItems} title={"Prop Harmony"} user={"Tenant"} />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* TopBar with mobile menu button */}
        <TopBar
          navItems={navItems} // Pass the same navItems
          user={{
            name: "Pankaj Gupta",
            role: "Admin",
            avatar: "https://i.pravatar.cc/40?u=user",
          }}
        />

        {/* Main content area */}
        <main className="flex-1 p-4 overflow-y-auto md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PropertyManagerLayout;
