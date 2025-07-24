// Refactored Property Manager Dashboard Master Component
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useFilters } from '@/hooks/useFilters';
import { APP_CONSTANTS } from '@/config/constants';
import { ROLE_DASHBOARD_CONFIGS } from '@/config/dashboard-configs';

// Tab components
import PropertyManagerOverviewTab from './tabs/PropertyManagerOverviewTab';
import PropertyManagerPropertiesTab from './tabs/PropertyManagerPropertiesTab';
import PropertyManagerWorkOrdersTab from './tabs/PropertyManagerWorkOrdersTab';
import PropertyManagerAnalyticsTab from './tabs/PropertyManagerAnalyticsTab';

const PropertyManagerDashboardMaster = () => {
  // Get dashboard configuration for property manager
  const config = ROLE_DASHBOARD_CONFIGS[APP_CONSTANTS.USER_ROLES.PROPERTY_MANAGER];
  
  // State management
  const [activeTab, setActiveTab] = useState(config.defaultTab);
  
  // Filters for dashboard data
  const { filters, updateFilter, resetFilters, getFilterQuery } = useFilters({
    timeRange: '30d',
    landlord: 'all',
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

  // Handle export
  const handleExport = () => {
    console.log('Export property manager dashboard data');
    // Implement export functionality
  };

  // Handle settings
  const handleSettings = () => {
    console.log('Open property manager dashboard settings');
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
      role={APP_CONSTANTS.USER_ROLES.PROPERTY_MANAGER}
      title="Property Manager Dashboard"
      subtitle="Manage properties, tenants, and work orders across multiple landlords"
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
        <PropertyManagerOverviewTab 
          data={dashboardData}
          loading={loading}
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />
      </TabsContent>

      {/* Properties Tab */}
      <TabsContent value="properties" className="space-y-6">
        <PropertyManagerPropertiesTab 
          data={dashboardData}
          loading={loading}
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />
      </TabsContent>

      {/* Work Orders Tab */}
      <TabsContent value="work-orders" className="space-y-6">
        <PropertyManagerWorkOrdersTab 
          data={dashboardData}
          loading={loading}
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="analytics" className="space-y-6">
        <PropertyManagerAnalyticsTab 
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

export default PropertyManagerDashboardMaster;
