import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  ChevronUp,
  LogOut,
  User,
  Bell,
  CreditCard,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Sidebar({ navItems, title , user }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    // Initialize state based on current viewport
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col bg-[#1d3658] text-white h-screen transition-all duration-300 ease-in-out shadow-xl",
        isCollapsed ? "w-16 md:w-20" : "w-54 md:w-60"
      )}
      data-testid="sidebar"
    >
      <div className="flex flex-col h-full ">
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-3">
          {!isCollapsed && (
            <div>
              <h2 className="font-bold truncate text-md md:text-xl whitespace-nowrap">
                {title} 
              </h2>
              <p>
                <span className="text-sm text-white/70">{user}</span>
              </p>
            </div>
          )}
          <Button
            onClick={() => setIsCollapsed((prev) => !prev)}
            variant="ghost"
            size="icon"
            className="text-white rounded-full cursor-pointer hover:bg-white/10 focus:bg-white/10 md:rounded-lg"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <Menu size={16} className="shrink-0" />
            ) : (
              <ChevronLeft size={16} className="shrink-0" />
            )}
          </Button>
        </div>

        {/* Scrollable navigation area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <SidebarItems isCollapsed={isCollapsed} navItems={navItems} />
        </div>

        <SidebarFooter isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}

function SidebarItems({ isCollapsed, navItems }) {
  return (
    <nav className="py-2 space-y-1 border-t md:py-2 border-white/10">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "group flex items-center rounded-lg md:rounded-xl font-sm transition-all duration-200",
              "py-2 px-2 mx-1 md:py-3 md:px-4",
              isActive
                ? "bg-gray-400/50 text-white shadow"
                : "text-white/60 hover:bg-white/10 hover:text-white",
              isCollapsed ? "justify-center" : "justify-start"
            )
          }
          aria-label={isCollapsed ? item.label : undefined}
        >
          <item.icon
            className={cn(
              "h-4 w-4 md:h-5 md:w-5 text-white/70 shrink-0",
              !isCollapsed && "mr-3"
            )}
          />
          {!isCollapsed && (
            <span className="text-[16px] truncate">{item.label}</span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function SidebarFooter({ isCollapsed }) {
  return (
    <div className="p-2 border-t md:p-4 border-white/10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full text-white hover:bg-white/10 p-1.5 md:p-2",
              isCollapsed && "justify-center"
            )}
          >
            <div
              className={cn(
                "flex items-center w-full cursor-pointer",
                isCollapsed ? "justify-center" : "justify-between"
              )}
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/40?u=user"
                  alt="User avatar"
                  className="rounded-full w-7 h-7 md:w-8 md:h-8 shrink-0"
                />
                {!isCollapsed && (
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-medium text-white truncate md:text-sm">
                      Pankaj Gupta
                    </p>
                    <p className="text-[10px] md:text-xs text-white/60 truncate">
                      Admin
                    </p>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <ChevronUp className="w-4 h-4 text-white/50 shrink-0" />
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 text-black bg-white border-none shadow-xl"
          align="start"
          side="top"
        >
          <DropdownMenuLabel className="flex flex-col">
            <span className="font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">m@example.com</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
