import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import {
  LayoutDashboard,
  Home,
  Users,
  UserCheck ,
  ClipboardCheck,
  Wrench,
  HandCoins,
  FileText,
  MessageCircle,
  BarChart3,
  Settings,
} from "lucide-react";
import { TopBar } from "@/components/layout/Topbar";

const navItems = [
  { label: "Dashboard", path: "/manager/dashboard", icon: LayoutDashboard },
  { label: "Properties", path: "/manager/properties", icon: Home }, 
  {
    label: "Property Inspections",
    path: "/manager/property-inspection",
    icon: ClipboardCheck,
  },
  { label: "Contractors", path: "/manager/contractors", icon: UserCheck  },
  { label: "Work Orders", path: "/manager/work-orders", icon: Wrench },
  {
    label: "Rent Collection",
    path: "/manager/rent-collection",
    icon: HandCoins,
  },
  {
    label: "Lease Management",
    path: "/manager/lease-management",
    icon: FileText,
  },
  { label: "Emails", path: "/manager/emails", icon: MessageCircle },
  { label: "Settings", path: "/manager/settings", icon: Settings },
];

const PropertyManagerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar navItems={navItems} title={"Prop Harmony"} user={"Manager"} />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* TopBar with mobile menu button */}
        <TopBar
          navItems={navItems} // Pass the same navItems
          user={{
            name: "Pankaj Gupta",
            role: "Property Manager",
            avatar: "https://i.pravatar.cc/40?u=manager",
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
