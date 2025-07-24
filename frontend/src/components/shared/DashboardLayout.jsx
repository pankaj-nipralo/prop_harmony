// Reusable dashboard layout component
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Settings, Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DASHBOARD_TABS } from '@/config/navigation';

const DashboardLayout = ({
  role,
  title,
  subtitle,
  children,
  tabs = [],
  activeTab,
  onTabChange,
  loading = false,
  lastUpdated,
  onRefresh,
  showRefresh = true,
  showSettings = false,
  showExport = false,
  showShare = false,
  onSettings,
  onExport,
  onShare,
  headerActions,
  className,
  ...props
}) => {
  const [refreshing, setRefreshing] = useState(false);

  // Use default tabs if none provided
  const dashboardTabs = tabs.length > 0 ? tabs : DASHBOARD_TABS[role] || [];

  // Handle refresh
  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  // Format last updated time
  const formatLastUpdated = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className={cn("min-h-screen bg-gray-50", className)} {...props}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {/* Last Updated */}
              {lastUpdated && (
                <div className="text-sm text-gray-500">
                  Updated {formatLastUpdated(lastUpdated)}
                </div>
              )}
              
              {/* Action Buttons */}
              {showRefresh && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
                  Refresh
                </Button>
              )}
              
              {showExport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExport}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              )}
              
              {showShare && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              )}
              
              {showSettings && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSettings}
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              )}
              
              {/* Custom header actions */}
              {headerActions}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        {dashboardTabs.length > 0 && (
          <Tabs 
            value={activeTab} 
            onValueChange={onTabChange}
            className="w-full"
          >
            <TabsList className="flex items-center justify-start w-full max-w-4xl gap-1 p-1 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              {dashboardTabs.map(({ key, label, icon: Icon, badge }) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                    "data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm",
                    "hover:bg-blue-50 hover:text-blue-700",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                  {badge && (
                    <Badge variant="secondary" className="ml-1">
                      {badge}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            <div className="space-y-6">
              {children}
            </div>
          </Tabs>
        )}

        {/* No Tabs - Direct Content */}
        {dashboardTabs.length === 0 && (
          <div className="space-y-6">
            {children}
          </div>
        )}
      </div>
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
            <span className="text-gray-700">Loading dashboard...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Dashboard section component for organizing content within tabs
export const DashboardSection = ({ 
  title, 
  subtitle, 
  children, 
  className,
  actions,
  ...props 
}) => (
  <div className={cn("space-y-4", className)} {...props}>
    {(title || subtitle || actions) && (
      <div className="flex items-center justify-between">
        <div>
          {title && (
            <h2 className="text-lg font-semibold text-gray-800">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    )}
    {children}
  </div>
);

// Dashboard grid component for responsive layouts
export const DashboardGrid = ({ 
  children, 
  columns = 'auto',
  gap = 6,
  className 
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  };

  return (
    <div className={cn(
      "grid",
      gridClasses[columns] || gridClasses.auto,
      gapClasses[gap] || gapClasses[6],
      className
    )}>
      {children}
    </div>
  );
};

export default DashboardLayout;
