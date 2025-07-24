// Landlord Overview Tab Component
import React from 'react';
import { DashboardSection, DashboardGrid } from '@/components/shared/DashboardLayout';
import { StatsGrid } from '@/components/shared/StatsCard';
import DashboardChart from '@/components/shared/DashboardChart';
import DataTable from '@/components/shared/DataTable';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { useDashboardStats, useChartData, useRecentActivity } from '@/hooks/useDashboardData';
import { useTableState } from '@/hooks/useFilters';
import { ROLE_DASHBOARD_CONFIGS } from '@/config/dashboard-configs';
import { APP_CONSTANTS } from '@/config/constants';
import { 
  Building2, 
  DollarSign, 
  Users, 
  Wrench,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const LandlordOverviewTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Get landlord dashboard configuration
  const config = ROLE_DASHBOARD_CONFIGS[APP_CONSTANTS.USER_ROLES.LANDLORD];
  
  // Dashboard stats
  const { stats, loading: statsLoading } = useDashboardStats(filters.timeRange);
  
  // Chart data
  const { chartData: incomeData, loading: incomeLoading } = useChartData('income', filters.timeRange);
  const { chartData: occupancyData, loading: occupancyLoading } = useChartData('occupancy', filters.timeRange);
  
  // Recent activity
  const { activity, loading: activityLoading } = useRecentActivity(10);
  
  // Table state for properties
  const { tableState, setPage, setPageSize, toggleSort } = useTableState();

  // Prepare stats cards data
  const statsCardsData = [
    {
      key: 'totalProperties',
      title: 'Total Properties',
      value: stats?.totalProperties || 0,
      subtitle: 'Properties owned',
      icon: Building2,
      color: 'blue',
      showCurrency: false
    },
    {
      key: 'monthlyIncome',
      title: 'Monthly Income',
      value: stats?.monthlyIncome || 0,
      subtitle: `${stats?.incomeChange > 0 ? '+' : ''}${stats?.incomeChange || 0}% from last month`,
      icon: DollarSign,
      color: 'green',
      showCurrency: true,
      trend: stats?.incomeChange > 0 ? 'up' : stats?.incomeChange < 0 ? 'down' : 'neutral',
      trendValue: Math.abs(stats?.incomeChange || 0)
    },
    {
      key: 'occupancyRate',
      title: 'Occupancy Rate',
      value: `${stats?.occupancyRate || 0}%`,
      subtitle: `${stats?.occupiedUnits || 0} of ${stats?.totalUnits || 0} units`,
      icon: Users,
      color: 'purple',
      showCurrency: false
    },
    {
      key: 'maintenanceRequests',
      title: 'Maintenance Requests',
      value: stats?.maintenanceRequests || 0,
      subtitle: stats?.maintenanceTrend === 'down' ? 'Trending down' : 'Active requests',
      icon: Wrench,
      color: stats?.maintenanceTrend === 'down' ? 'green' : 'yellow',
      showCurrency: false,
      trend: stats?.maintenanceTrend === 'down' ? 'down' : 'up'
    }
  ];

  // Filter configurations
  const filterConfigs = [
    getCommonFilterConfigs().timeRange,
    getCommonFilterConfigs().propertyType,
    getCommonFilterConfigs().status
  ];

  // Properties table columns
  const propertiesColumns = [
    { key: 'name', label: 'Property Name', sortable: true },
    { key: 'units', label: 'Units', sortable: true },
    { key: 'occupancy', label: 'Occupancy', sortable: true, render: (value) => `${value}%` },
    { key: 'revenue', label: 'Monthly Revenue', sortable: true, type: 'currency' },
    { key: 'status', label: 'Status', type: 'badge', statusType: 'property' }
  ];

  // Recent activity table columns
  const activityColumns = [
    { key: 'type', label: 'Type', render: (value) => value.charAt(0).toUpperCase() + value.slice(1) },
    { key: 'message', label: 'Activity' },
    { key: 'timestamp', label: 'Time', type: 'date' }
  ];

  return (
    <>
      {/* Filters */}
      <DashboardSection title="Filters">
        <FilterPanel
          filters={filters}
          onFilterChange={onFilterChange}
          onReset={onResetFilters}
          filterConfigs={filterConfigs}
          showSearch={false}
          activeFilterCount={Object.keys(filters).filter(key => 
            filters[key] && filters[key] !== 'all'
          ).length}
        />
      </DashboardSection>

      {/* Stats Cards */}
      <DashboardSection title="Overview Statistics">
        <StatsGrid 
          stats={statsCardsData}
          loading={statsLoading || loading}
          columns={4}
        />
      </DashboardSection>

      {/* Charts */}
      <DashboardSection title="Performance Analytics">
        <DashboardGrid columns={2}>
          <DashboardChart
            title="Income vs Expenses"
            type="bar"
            data={incomeData}
            loading={incomeLoading || loading}
            config={{
              dataKey: 'income',
              xAxisKey: 'date'
            }}
          />
          
          <DashboardChart
            title="Occupancy Rate Trend"
            type="line"
            data={occupancyData}
            loading={occupancyLoading || loading}
            config={{
              dataKey: 'occupancy',
              xAxisKey: 'date'
            }}
          />
        </DashboardGrid>
      </DashboardSection>

      {/* Properties Overview */}
      <DashboardSection title="Properties Overview">
        <DataTable
          title="Property Performance"
          data={data?.properties || []}
          columns={propertiesColumns}
          loading={loading}
          pagination={true}
          sorting={true}
          currentPage={tableState.page}
          pageSize={tableState.pageSize}
          totalItems={data?.properties?.length || 0}
          sortField={tableState.sortField}
          sortDirection={tableState.sortDirection}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSort={toggleSort}
          emptyMessage="No properties found"
        />
      </DashboardSection>

      {/* Recent Activity */}
      <DashboardSection title="Recent Activity">
        <DataTable
          title="Latest Updates"
          data={activity}
          columns={activityColumns}
          loading={activityLoading || loading}
          pagination={false}
          sorting={false}
          emptyMessage="No recent activity"
        />
      </DashboardSection>
    </>
  );
};

export default LandlordOverviewTab;
