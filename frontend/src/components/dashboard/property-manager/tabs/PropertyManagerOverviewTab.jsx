// Property Manager Overview Tab Component
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
  Users, 
  ClipboardList, 
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const PropertyManagerOverviewTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Get property manager dashboard configuration
  const config = ROLE_DASHBOARD_CONFIGS[APP_CONSTANTS.USER_ROLES.PROPERTY_MANAGER];
  
  // Dashboard stats
  const { stats, loading: statsLoading } = useDashboardStats(filters.timeRange);
  
  // Chart data
  const { chartData: occupancyData, loading: occupancyLoading } = useChartData('occupancy', filters.timeRange);
  const { chartData: collectionData, loading: collectionLoading } = useChartData('collection', filters.timeRange);
  
  // Recent activity
  const { activity, loading: activityLoading } = useRecentActivity(10);
  
  // Table state for work orders
  const { tableState, setPage, setPageSize, toggleSort } = useTableState();

  // Prepare stats cards data
  const statsCardsData = [
    {
      key: 'managedProperties',
      title: 'Managed Properties',
      value: stats?.managedProperties || 0,
      subtitle: 'Total properties',
      icon: Building2,
      color: 'blue',
      showCurrency: false
    },
    {
      key: 'totalTenants',
      title: 'Total Tenants',
      value: stats?.totalTenants || 0,
      subtitle: 'Across all properties',
      icon: Users,
      color: 'green',
      showCurrency: false
    },
    {
      key: 'activeWorkOrders',
      title: 'Active Work Orders',
      value: stats?.activeWorkOrders || 0,
      subtitle: 'Pending completion',
      icon: ClipboardList,
      color: 'yellow',
      showCurrency: false
    },
    {
      key: 'collectionRate',
      title: 'Collection Rate',
      value: `${stats?.collectionRate || 0}%`,
      subtitle: 'This month',
      icon: DollarSign,
      color: 'purple',
      showCurrency: false,
      trend: stats?.collectionRate > 90 ? 'up' : 'down',
      trendValue: Math.abs(stats?.collectionRate - 90 || 0)
    }
  ];

  // Filter configurations
  const filterConfigs = [
    getCommonFilterConfigs().timeRange,
    {
      key: 'landlord',
      label: 'Landlord',
      type: 'select',
      options: [
        { value: 'all', label: 'All Landlords' },
        { value: 'pankaj_gupta', label: 'Pankaj Gupta' },
        { value: 'gaurav_kanchan', label: 'Gaurav Kanchan' },
        { value: 'uzair_sayyed', label: 'Uzair Sayyed' }
      ]
    },
    getCommonFilterConfigs().propertyType,
    getCommonFilterConfigs().status
  ];

  // Work orders table columns
  const workOrdersColumns = [
    { 
      key: 'property', 
      label: 'Property', 
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">Tenant: {item.tenant}</div>
        </div>
      )
    },
    { key: 'issue', label: 'Issue', sortable: true },
    { 
      key: 'priority', 
      label: 'Priority', 
      sortable: true,
      render: (value) => {
        const colors = {
          low: 'bg-gray-100 text-gray-800',
          medium: 'bg-yellow-100 text-yellow-800',
          high: 'bg-orange-100 text-orange-800',
          urgent: 'bg-red-100 text-red-800'
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    },
    { key: 'status', label: 'Status', type: 'badge', statusType: 'maintenance' },
    { key: 'createdAt', label: 'Created', type: 'date', sortable: true }
  ];

  // Lease expirations table columns
  const leaseColumns = [
    { key: 'tenant', label: 'Tenant', sortable: true },
    { key: 'property', label: 'Property', sortable: true },
    { key: 'expiryDate', label: 'Expiry Date', type: 'date', sortable: true },
    { 
      key: 'status', 
      label: 'Renewal Status', 
      render: (value) => {
        const colors = {
          'renewal-confirmed': 'bg-green-100 text-green-800',
          'not-renewing': 'bg-red-100 text-red-800',
          'pending-renewal': 'bg-yellow-100 text-yellow-800'
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value]}`}>
            {value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        );
      }
    }
  ];

  // Mock data (in real app, this would come from the data prop)
  const workOrders = [
    {
      id: 1,
      property: "Sunset Apartments #101",
      tenant: "Sarah Johnson",
      issue: "Plumbing repair",
      status: "in-progress",
      priority: "high",
      createdAt: "2024-01-20"
    },
    {
      id: 2,
      property: "Marina View #205",
      tenant: "Michael Chen",
      issue: "AC maintenance",
      status: "pending",
      priority: "medium",
      createdAt: "2024-01-19"
    }
  ];

  const leaseExpirations = [
    {
      id: 1,
      tenant: "Emma Wilson",
      property: "Downtown Loft #7B",
      expiryDate: "2024-08-05",
      status: "renewal-confirmed"
    },
    {
      id: 2,
      tenant: "John Smith",
      property: "Garden View #12A",
      expiryDate: "2024-07-22",
      status: "not-renewing"
    }
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
      <DashboardSection title="Management Overview">
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
            title="Occupancy Rate Trends"
            type="line"
            data={occupancyData}
            loading={occupancyLoading || loading}
            config={{
              dataKey: 'occupancy',
              xAxisKey: 'date'
            }}
          />
          
          <DashboardChart
            title="Rent Collection Performance"
            type="bar"
            data={collectionData}
            loading={collectionLoading || loading}
            config={{
              dataKey: 'collected',
              xAxisKey: 'month'
            }}
          />
        </DashboardGrid>
      </DashboardSection>

      {/* Active Work Orders */}
      <DashboardSection title="Active Work Orders">
        <DataTable
          title="Urgent Work Orders"
          data={workOrders}
          columns={workOrdersColumns}
          loading={loading}
          pagination={false}
          sorting={true}
          emptyMessage="No active work orders"
        />
      </DashboardSection>

      {/* Upcoming Lease Expirations */}
      <DashboardSection title="Upcoming Lease Expirations">
        <DataTable
          title="Lease Renewals"
          data={leaseExpirations}
          columns={leaseColumns}
          loading={loading}
          pagination={false}
          sorting={true}
          emptyMessage="No upcoming lease expirations"
        />
      </DashboardSection>
    </>
  );
};

export default PropertyManagerOverviewTab;
