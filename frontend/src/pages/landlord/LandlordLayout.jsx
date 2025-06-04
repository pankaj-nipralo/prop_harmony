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
} from "lucide-react";
import { TopBar } from "@/components/layout/Topbar";

const navItems = [
  { label: "Dashboard", path: "/landlord/dashboard", icon: LayoutDashboard },
  { label: "Properties", path: "/landlord/properties", icon: Home },
  { label: "Property Listings", path: "/landlord/listings", icon: List },
  { label: "Rental Search", path: "/landlord/rental-search", icon: Search },
  { label: "My Tenants", path: "/landlord/tenants", icon: Users },
  { label: "Property Managers", path: "/landlord/managers", icon: Briefcase },
  { label: "Issue Warning", path: "/landlord/warnings", icon: ShieldAlert },
  {
    label: "Property Inspections",
    path: "/landlord/inspections",
    icon: ClipboardCheck,
  },
  { label: "Maintenance", path: "/landlord/maintenance", icon: Wrench },
  { label: "Bookkeeping", path: "/landlord/bookkeeping", icon: FileText },
  {
    label: "Investment Calculator",
    path: "/landlord/calculator",
    icon: Calculator,
  },
  { label: "Document Vault", path: "/landlord/documents", icon: FileArchive },
  { label: "Ratings", path: "/landlord/ratings", icon: Star },
  { label: "Messages", path: "/landlord/messages", icon: MessageCircle },
  { label: "Payments", path: "/landlord/payments", icon: CreditCard },
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
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          navItems={navItems} // Pass the same navItems
          user={{
            name: "John Doe",
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

export default LandLordLayout;
