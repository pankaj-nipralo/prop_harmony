import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { LayoutDashboard, Users, FolderKanban, Mail, FileText, Inbox, ScrollText, UserCog, Settings } from "lucide-react";


const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Clients", path: "/admin/clients", icon: Users },
  { label: "Projects", path: "/admin/projects", icon: FolderKanban },
  { label: "SMTP Configs", path: "/admin/smtp", icon: Mail },
  {
    label: "Email Templates",
    path: "/admin/email-templates",
    icon: FileText,
  },
  { label: "Forms", path: "/admin/forms", icon: ScrollText },
  { label: "Form Submissions", path: "/admin/submissions", icon: Inbox },
  { label: "Users", path: "/admin/users", icon: UserCog },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

const LandLordLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar navItems={navItems} />
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LandLordLayout;
