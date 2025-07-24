// Property Manager Analytics Tab Component
import React from 'react';
import { DashboardSection, DashboardGrid } from '@/components/shared/DashboardLayout';
import DashboardChart from '@/components/shared/DashboardChart';
import { StatsGrid } from '@/components/shared/StatsCard';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { useChartData } from '@/hooks/useDashboardData';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart,
  Download,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PropertyManagerAnalyticsTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Chart data hooks
  const { chartData: revenueData, loading: revenueLoading } = useChartData('revenue', filters.timeRange);
  const { chartData: occupancyData, loading: occupancyLoading } = useChartData('occupancy', filters.timeRange);
  const { chartData: maintenanceData, loading: maintenanceLoading } = useChartData('maintenance', filters.timeRange);
  const { chartData: propertyTypeData, loading: propertyTypeLoading } = useChartData('propertyTypes', filters.timeRange);

  // Analytics stats
  const analyticsStats = [
    {
      key: 'totalRevenue',
      title: 'Total Revenue',
      value: 156000,
      subtitle: 'This month',
      icon: TrendingUp,
      color: 'green',
      showCurrency: true,
      trend: 'up',
      trendValue: 8.2
    },
    {
      key: 'avgOccupancy',
      title: 'Avg Occupancy',
      value: '88.5%',
      subtitle: 'Across all properties',
      icon: BarChart3,
      color: 'blue',
      trend: 'up',
      trendValue: 3.1
    },
    {
      key: 'maintenanceCosts',
      title: 'Maintenance Costs',
      value: 12500,
      subtitle: 'This month',
      icon: TrendingDown,
      color: 'red',
      showCurrency: true,
      trend: 'down',
      trendValue: 5.4
    },
    {
      key: 'profitMargin',
      title: 'Profit Margin',
      value: '24.8%',
      subtitle: 'Revenue - Expenses',
      icon: PieChart,
      color: 'purple',
      trend: 'up',
      trendValue: 2.3
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
    getCommonFilterConfigs().propertyType
  ];

  // Mock chart data
  const mockRevenueData = [
    { month: 'Jan', revenue: 145000, expenses: 35000, profit: 110000 },
    { month: 'Feb', revenue: 152000, expenses: 38000, profit: 114000 },
    { month: 'Mar', revenue: 148000, expenses: 36000, profit: 112000 },
    { month: 'Apr', revenue: 156000, expenses: 39000, profit: 117000 },
    { month: 'May', revenue: 162000, expenses: 41000, profit: 121000 },
    { month: 'Jun', revenue: 158000, expenses: 40000, profit: 118000 }
  ];

  const mockOccupancyData = [
    { month: 'Jan', occupancy: 85 },
    { month: 'Feb', occupancy: 87 },
    { month: 'Mar', occupancy: 86 },
    { month: 'Apr', occupancy: 89 },
    { month: 'May', occupancy: 91 },
    { month: 'Jun', occupancy: 88 }
  ];

  const mockMaintenanceData = [
    { month: 'Jan', requests: 45, completed: 42, cost: 15000 },
    { month: 'Feb', requests: 38, completed: 36, cost: 13500 },
    { month: 'Mar', requests: 52, completed: 48, cost: 18000 },
    { month: 'Apr', requests: 41, completed: 39, cost: 14200 },
    { month: 'May', requests: 35, completed: 34, cost: 12500 },
    { month: 'Jun', requests: 43, completed: 41, cost: 15800 }
  ];

  const mockPropertyTypeData = [
    { type: 'Apartments', count: 15, revenue: 85000 },
    { type: 'Villas', count: 8, revenue: 45000 },
    { type: 'Commercial', count: 5, revenue: 26000 }
  ];

  // Handle export
  const handleExportReport = () => {
    console.log('Export analytics report');
    // Implement export functionality
  };

  // Handle share
  const handleShareReport = () => {
    console.log('Share analytics report');
    // Implement share functionality
  };

  return (
    <>
      {/* Filters */}
      <DashboardSection title="Analytics Filters">
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

      {/* Analytics Stats */}
      <DashboardSection 
        title="Key Performance Indicators"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShareReport}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        }
      >
        <StatsGrid 
          stats={analyticsStats}
          loading={loading}
          columns={4}
        />
      </DashboardSection>

      {/* Revenue Analytics */}
      <DashboardSection title="Revenue & Profitability">
        <DashboardGrid columns={2}>
          <DashboardChart
            title="Revenue vs Expenses"
            type="bar"
            data={mockRevenueData}
            loading={revenueLoading || loading}
            config={{
              dataKey: 'revenue',
              xAxisKey: 'month'
            }}
            height={350}
          />
          
          <DashboardChart
            title="Profit Trends"
            type="line"
            data={mockRevenueData}
            loading={revenueLoading || loading}
            config={{
              dataKey: 'profit',
              xAxisKey: 'month'
            }}
            height={350}
          />
        </DashboardGrid>
      </DashboardSection>

      {/* Occupancy & Maintenance */}
      <DashboardSection title="Operational Metrics">
        <DashboardGrid columns={2}>
          <DashboardChart
            title="Occupancy Rate Trends"
            type="line"
            data={mockOccupancyData}
            loading={occupancyLoading || loading}
            config={{
              dataKey: 'occupancy',
              xAxisKey: 'month'
            }}
            height={350}
          />
          
          <DashboardChart
            title="Maintenance Requests"
            type="bar"
            data={mockMaintenanceData}
            loading={maintenanceLoading || loading}
            config={{
              dataKey: 'requests',
              xAxisKey: 'month'
            }}
            height={350}
          />
        </DashboardGrid>
      </DashboardSection>

      {/* Property Distribution */}
      <DashboardSection title="Portfolio Analysis">
        <DashboardGrid columns={2}>
          <DashboardChart
            title="Property Type Distribution"
            type="pie"
            data={mockPropertyTypeData}
            loading={propertyTypeLoading || loading}
            config={{
              dataKey: 'count',
              nameKey: 'type'
            }}
            height={350}
          />
          
          <DashboardChart
            title="Revenue by Property Type"
            type="bar"
            data={mockPropertyTypeData}
            loading={propertyTypeLoading || loading}
            config={{
              dataKey: 'revenue',
              xAxisKey: 'type'
            }}
            height={350}
          />
        </DashboardGrid>
      </DashboardSection>

      {/* Maintenance Cost Analysis */}
      <DashboardSection title="Maintenance Cost Analysis">
        <DashboardChart
          title="Monthly Maintenance Costs"
          type="line"
          data={mockMaintenanceData}
          loading={maintenanceLoading || loading}
          config={{
            dataKey: 'cost',
            xAxisKey: 'month'
          }}
          height={300}
        />
      </DashboardSection>
    </>
  );
};

export default PropertyManagerAnalyticsTab;
