// Refactored Landlord Dashboard Master Component
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useFilters } from '@/hooks/useFilters';
import { APP_CONSTANTS } from '@/config/constants';
import { ROLE_DASHBOARD_CONFIGS } from '@/config/dashboard-configs';

// Tab components
import LandlordOverviewTab from './tabs/LandlordOverviewTab';
import LandlordPropertiesTab from './tabs/LandlordPropertiesTab';
import LandlordMaintenanceTab from './tabs/LandlordMaintenanceTab';
import LandlordPaymentsTab from './tabs/LandlordPaymentsTab';

const LandlordDashboardMaster = () => {
  // Get dashboard configuration for landlord
  const config = ROLE_DASHBOARD_CONFIGS[APP_CONSTANTS.USER_ROLES.LANDLORD];
  
  // State management
  const [activeTab, setActiveTab] = useState(config.defaultTab);
  
  // Filters for dashboard data
  const { filters, updateFilter, resetFilters, getFilterQuery } = useFilters({
    timeRange: '30d',
    propertyType: 'all',
    status: 'all'
  });

  // Dashboard data
  const { 
    data: dashboardData, 
    loading, 
    error, 
    lastUpdated, 
    refresh 
  } = useDashboardData(getFilterQuery());

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle refresh
  const handleRefresh = async () => {
    await refresh();
  };

  // Handle export (placeholder)
  const handleExport = () => {
    console.log('Export dashboard data');
    // Implement export functionality
  };

  // Handle settings (placeholder)
  const handleSettings = () => {
    console.log('Open dashboard settings');
    // Implement settings functionality
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      role={APP_CONSTANTS.USER_ROLES.LANDLORD}
      title="Landlord Dashboard"
      subtitle="Manage your properties, tenants, and rental income"
      activeTab={activeTab}
      onTabChange={handleTabChange}
      loading={loading}
      lastUpdated={lastUpdated}
      onRefresh={handleRefresh}
      showRefresh={true}
      showExport={true}
      showSettings={true}
      onExport={handleExport}
      onSettings={handleSettings}
    >
      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <LandlordOverviewTab 
          data={dashboardData}
          loading={loading}
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />
      </TabsContent>

      {/* Properties Tab */}
      <TabsContent value="properties" className="space-y-6">
        <LandlordPropertiesTab 
          data={dashboardData}
          loading={loading}
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />
      </TabsContent>

      {/* Maintenance Tab */}
      <TabsContent value="maintenance" className="space-y-6">
        <LandlordMaintenanceTab 
          data={dashboardData}
          loading={loading}
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />
      </TabsContent>

      {/* Payments Tab */}
      <TabsContent value="payments" className="space-y-6">
        <LandlordPaymentsTab 
          data={dashboardData}
          loading={loading}
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />
      </TabsContent>
    </DashboardLayout>
  );
};

export default LandlordDashboardMaster;
