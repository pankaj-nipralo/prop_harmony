// Landlord Payments Tab Component
import React, { useState } from 'react';
import { DashboardSection, DashboardGrid } from '@/components/shared/DashboardLayout';
import { StatsGrid } from '@/components/shared/StatsCard';
import DataTable from '@/components/shared/DataTable';
import DashboardChart from '@/components/shared/DashboardChart';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { Button } from '@/components/ui/button';
import { useTableState } from '@/hooks/useFilters';
import { useChartData } from '@/hooks/useDashboardData';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  Download,
  Send,
  Eye
} from 'lucide-react';

const LandlordPaymentsTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Table state
  const { tableState, setPage, setPageSize, toggleSort } = useTableState({
    pageSize: 10,
    sortField: 'dueDate',
    sortDirection: 'desc'
  });

  // Chart data
  const { chartData: paymentTrends, loading: chartLoading } = useChartData('payments', filters.timeRange);

  // Local state
  const [searchTerm, setSearchTerm] = useState('');

  // Mock payment data
  const payments = [
    {
      id: 1,
      tenant: "Sarah Johnson",
      property: "Sunset Apartments Unit 101",
      amount: 8500,
      dueDate: "2024-02-01",
      paidDate: "2024-01-30",
      status: "paid",
      type: "rent",
      method: "bank_transfer",
      reference: "TXN001234"
    },
    {
      id: 2,
      tenant: "Michael Chen",
      property: "Downtown Loft",
      amount: 6000,
      dueDate: "2024-02-01",
      paidDate: null,
      status: "pending",
      type: "rent",
      method: null,
      reference: null
    },
    {
      id: 3,
      tenant: "Sarah Johnson",
      property: "Sunset Apartments Unit 101",
      amount: 200,
      dueDate: "2024-01-15",
      paidDate: "2024-01-20",
      status: "overdue",
      type: "utilities",
      method: "credit_card",
      reference: "TXN001235"
    }
  ];

  // Payment stats
  const paymentStats = [
    {
      key: 'totalCollected',
      title: 'Total Collected',
      value: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
      subtitle: 'This month',
      icon: DollarSign,
      color: 'green',
      showCurrency: true,
      trend: 'up',
      trendValue: 5.2
    },
    {
      key: 'pendingPayments',
      title: 'Pending',
      value: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
      subtitle: 'Awaiting payment',
      icon: Clock,
      color: 'yellow',
      showCurrency: true
    },
    {
      key: 'overduePayments',
      title: 'Overdue',
      value: payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
      subtitle: 'Past due date',
      icon: TrendingDown,
      color: 'red',
      showCurrency: true
    },
    {
      key: 'collectionRate',
      title: 'Collection Rate',
      value: '94.5%',
      subtitle: 'Last 12 months',
      icon: TrendingUp,
      color: 'blue',
      trend: 'up',
      trendValue: 2.1
    }
  ];

  // Filter configurations
  const filterConfigs = [
    {
      key: 'status',
      label: 'Payment Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
        { value: 'overdue', label: 'Overdue' },
        { value: 'partial', label: 'Partial' }
      ]
    },
    {
      key: 'type',
      label: 'Payment Type',
      type: 'select',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'rent', label: 'Rent' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'deposit', label: 'Security Deposit' },
        { value: 'fees', label: 'Fees' }
      ]
    },
    getCommonFilterConfigs().dateFrom,
    getCommonFilterConfigs().dateTo,
    getCommonFilterConfigs().minAmount,
    getCommonFilterConfigs().maxAmount
  ];

  // Table columns
  const columns = [
    {
      key: 'tenant',
      label: 'Tenant',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{item.property}</div>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      type: 'currency'
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <span className="capitalize">
          {value.replace('_', ' ')}
        </span>
      )
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true,
      type: 'date'
    },
    {
      key: 'paidDate',
      label: 'Paid Date',
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleDateString() : '-'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      type: 'badge',
      statusType: 'payment'
    },
    {
      key: 'method',
      label: 'Method',
      render: (value) => {
        if (!value) return '-';
        return value.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" title="View Details">
            <Eye className="w-4 h-4" />
          </Button>
          {item.status === 'pending' && (
            <Button variant="ghost" size="sm" title="Send Reminder">
              <Send className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" title="Download Receipt">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Handle send reminder
  const handleSendReminder = () => {
    console.log('Send payment reminder');
    // Implement send reminder functionality
  };

  // Handle export
  const handleExport = () => {
    console.log('Export payment data');
    // Implement export functionality
  };

  return (
    <>
      {/* Payment Stats */}
      <DashboardSection title="Payment Overview">
        <StatsGrid 
          stats={paymentStats}
          loading={loading}
          columns={4}
        />
      </DashboardSection>

      {/* Payment Trends Chart */}
      <DashboardSection title="Payment Trends">
        <DashboardChart
          title="Monthly Payment Collection"
          type="bar"
          data={paymentTrends}
          loading={chartLoading || loading}
          config={{
            dataKey: 'collected',
            xAxisKey: 'month'
          }}
        />
      </DashboardSection>

      {/* Filters */}
      <DashboardSection title="Filter Payments">
        <FilterPanel
          filters={filters}
          searchTerm={searchTerm}
          onFilterChange={onFilterChange}
          onSearchChange={setSearchTerm}
          onReset={onResetFilters}
          filterConfigs={filterConfigs}
          showSearch={true}
          activeFilterCount={Object.keys(filters).filter(key => 
            filters[key] && filters[key] !== 'all'
          ).length + (searchTerm ? 1 : 0)}
        />
      </DashboardSection>

      {/* Payments Table */}
      <DashboardSection 
        title="Payment History"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSendReminder}>
              <Send className="w-4 h-4 mr-2" />
              Send Reminders
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        }
      >
        <DataTable
          title="All Payments"
          data={payments}
          columns={columns}
          loading={loading}
          pagination={true}
          sorting={true}
          currentPage={tableState.page}
          pageSize={tableState.pageSize}
          totalItems={payments.length}
          sortField={tableState.sortField}
          sortDirection={tableState.sortDirection}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSort={toggleSort}
          emptyMessage="No payments found"
        />
      </DashboardSection>
    </>
  );
};

export default LandlordPaymentsTab;
