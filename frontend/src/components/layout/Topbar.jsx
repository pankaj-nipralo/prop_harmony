import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Search, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import UserProfile from "../auth/UserProfile";
import { useAuth } from "../../contexts/AuthContext";

export function TopBar({
  className,
  navItems = [], // Accept navItems prop
}) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Find the current page title from navItems
  const getCurrentTitle = () => {
    const currentItem = navItems.find(
      (item) => item.path === location.pathname
    );
    return currentItem?.label || "Dashboard"; // Default title
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between h-[77px] px-4 md:px-6 bg-white border-b border-gray-200",
        className
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </Button> */}

        <h1 className="text-2xl font-semibold text-gray-900">
          {getCurrentTitle()}
        </h1>
      </div>

      {/* Right side - Profile section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User Profile */}
        {isAuthenticated && <UserProfile />}
      </div>
    </header>
  );
}
