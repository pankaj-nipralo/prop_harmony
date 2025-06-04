import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Search, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopBar({
  onMenuClick,
  user = {},
  className,
  navItems = [], // Accept navItems prop
}) {
  const location = useLocation();

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
        "sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200",
        className
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <h1 className="text-lg font-semibold text-gray-900">
          {getCurrentTitle()}
        </h1>
 
      </div>

      {/* Right side - Profile section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 ml-2">
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium text-gray-900">
              {user.name || "John Doe"}
            </p>
            <p className="text-xs text-gray-500">{user.role || "Admin"}</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <img
              src={user.avatar || "https://i.pravatar.cc/40?u=user"}
              alt="User profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="sr-only">User profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
