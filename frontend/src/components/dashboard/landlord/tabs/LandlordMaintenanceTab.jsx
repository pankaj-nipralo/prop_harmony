// Landlord Maintenance Tab Component
import React, { useState } from 'react';
import { DashboardSection, DashboardGrid } from '@/components/shared/DashboardLayout';
import { StatsGrid } from '@/components/shared/StatsCard';
import DataTable from '@/components/shared/DataTable';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTableState } from '@/hooks/useFilters';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Eye,
  MessageSquare,
  Calendar
} from 'lucide-react';

const LandlordMaintenanceTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Table state
  const { tableState, setPage, setPageSize, toggleSort } = useTableState({
    pageSize: 10,
    sortField: 'createdAt',
    sortDirection: 'desc'
  });

  // Local state
  const [searchTerm, setSearchTerm] = useState('');

  // Mock maintenance data
  const maintenanceRequests = [
    {
      id: 1,
      title: "AC Unit Not Working",
      property: "Sunset Apartments Unit 101",
      tenant: "Sarah Johnson",
      category: "HVAC",
      priority: "high",
      status: "in-progress",
      createdAt: "2024-01-20T10:30:00Z",
      assignedTo: "Ahmed Maintenance Co.",
      estimatedCost: 500,
      description: "Air conditioning unit stopped working, tenant reports no cold air"
    },
    {
      id: 2,
      title: "Leaky Faucet in Kitchen",
      property: "Downtown Loft",
      tenant: "Michael Chen",
      category: "Plumbing",
      priority: "medium",
      status: "open",
      createdAt: "2024-01-19T14:15:00Z",
      assignedTo: null,
      estimatedCost: 150,
      description: "Kitchen faucet has been dripping for several days"
    },
    {
      id: 3,
      title: "Broken Window Lock",
      property: "Marina View Villa",
      tenant: null,
      category: "Security",
      priority: "low",
      status: "completed",
      createdAt: "2024-01-18T09:00:00Z",
      assignedTo: "Dubai Security Services",
      estimatedCost: 200,
      description: "Window lock mechanism needs replacement"
    }
  ];

  // Stats data
  const maintenanceStats = [
    {
      key: 'totalRequests',
      title: 'Total Requests',
      value: maintenanceRequests.length,
      subtitle: 'This month',
      icon: Wrench,
      color: 'blue'
    },
    {
      key: 'pendingRequests',
      title: 'Pending',
      value: maintenanceRequests.filter(r => r.status === 'open').length,
      subtitle: 'Awaiting assignment',
      icon: Clock,
      color: 'yellow'
    },
    {
      key: 'inProgressRequests',
      title: 'In Progress',
      value: maintenanceRequests.filter(r => r.status === 'in-progress').length,
      subtitle: 'Being worked on',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      key: 'completedRequests',
      title: 'Completed',
      value: maintenanceRequests.filter(r => r.status === 'completed').length,
      subtitle: 'This month',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  // Filter configurations
  const filterConfigs = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'open', label: 'Open' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    },
    {
      key: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { value: 'all', label: 'All Priorities' },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ]
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'all', label: 'All Categories' },
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'electrical', label: 'Electrical' },
        { value: 'hvac', label: 'HVAC' },
        { value: 'security', label: 'Security' },
        { value: 'appliances', label: 'Appliances' },
        { value: 'other', label: 'Other' }
      ]
    },
    getCommonFilterConfigs().dateFrom,
    getCommonFilterConfigs().dateTo
  ];

  // Table columns
  const columns = [
    {
      key: 'title',
      label: 'Request',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{item.category}</div>
        </div>
      )
    },
    {
      key: 'property',
      label: 'Property',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          {item.tenant && (
            <div className="text-sm text-gray-500">Tenant: {item.tenant}</div>
          )}
        </div>
      )
    },
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
          <Badge className={colors[value]}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      type: 'badge',
      statusType: 'maintenance'
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      render: (value) => value || <span className="text-gray-400">Unassigned</span>
    },
    {
      key: 'estimatedCost',
      label: 'Est. Cost',
      sortable: true,
      type: 'currency'
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      type: 'date'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" title="View Details">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Message Tenant">
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Schedule">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Handle create request
  const handleCreateRequest = () => {
    console.log('Create new maintenance request');
    // Implement create request functionality
  };

  return (
    <>
      {/* Stats Cards */}
      <DashboardSection title="Maintenance Overview">
        <StatsGrid 
          stats={maintenanceStats}
          loading={loading}
          columns={4}
        />
      </DashboardSection>

      {/* Filters */}
      <DashboardSection title="Filter Requests">
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

      {/* Maintenance Requests Table */}
      <DashboardSection 
        title="Maintenance Requests"
        actions={
          <Button onClick={handleCreateRequest} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Request
          </Button>
        }
      >
        <DataTable
          title="All Maintenance Requests"
          data={maintenanceRequests}
          columns={columns}
          loading={loading}
          pagination={true}
          sorting={true}
          currentPage={tableState.page}
          pageSize={tableState.pageSize}
          totalItems={maintenanceRequests.length}
          sortField={tableState.sortField}
          sortDirection={tableState.sortDirection}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSort={toggleSort}
          emptyMessage="No maintenance requests found"
          actions={
            <Button variant="outline" size="sm">
              Export
            </Button>
          }
        />
      </DashboardSection>
    </>
  );
};

export default LandlordMaintenanceTab;
