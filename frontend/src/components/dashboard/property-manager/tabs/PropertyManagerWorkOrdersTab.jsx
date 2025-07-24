// Property Manager Work Orders Tab Component
import React, { useState } from 'react';
import { DashboardSection, DashboardGrid } from '@/components/shared/DashboardLayout';
import { StatsGrid } from '@/components/shared/StatsCard';
import DataTable from '@/components/shared/DataTable';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTableState } from '@/hooks/useFilters';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  User,
  Wrench
} from 'lucide-react';

const PropertyManagerWorkOrdersTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Table state
  const { tableState, setPage, setPageSize, toggleSort } = useTableState({
    pageSize: 15,
    sortField: 'createdAt',
    sortDirection: 'desc'
  });

  // Local state
  const [searchTerm, setSearchTerm] = useState('');

  // Mock work orders data
  const workOrders = [
    {
      id: 1,
      title: "AC Unit Repair",
      property: "Sunset Apartments #101",
      landlord: "Pankaj Gupta",
      tenant: "Sarah Johnson",
      category: "HVAC",
      priority: "high",
      status: "in-progress",
      assignedTo: "Ahmed HVAC Services",
      estimatedCost: 800,
      actualCost: null,
      createdAt: "2024-01-20T10:30:00Z",
      dueDate: "2024-01-25",
      description: "Central AC unit not cooling properly, needs compressor check"
    },
    {
      id: 2,
      title: "Kitchen Plumbing Fix",
      property: "Marina View #205",
      landlord: "Gaurav Kanchan",
      tenant: "Michael Chen",
      category: "Plumbing",
      priority: "medium",
      status: "pending",
      assignedTo: null,
      estimatedCost: 300,
      actualCost: null,
      createdAt: "2024-01-19T14:15:00Z",
      dueDate: "2024-01-24",
      description: "Kitchen sink drain is clogged, water backing up"
    },
    {
      id: 3,
      title: "Window Lock Replacement",
      property: "Downtown Loft #7B",
      landlord: "Uzair Sayyed",
      tenant: "Emma Wilson",
      category: "Security",
      priority: "low",
      status: "completed",
      assignedTo: "Dubai Security Solutions",
      estimatedCost: 150,
      actualCost: 140,
      createdAt: "2024-01-18T09:00:00Z",
      dueDate: "2024-01-22",
      description: "Bedroom window lock mechanism broken, needs replacement"
    },
    {
      id: 4,
      title: "Electrical Outlet Issue",
      property: "Garden View #12A",
      landlord: "Pankaj Gupta",
      tenant: "David Brown",
      category: "Electrical",
      priority: "urgent",
      status: "open",
      assignedTo: null,
      estimatedCost: 200,
      actualCost: null,
      createdAt: "2024-01-21T16:45:00Z",
      dueDate: "2024-01-23",
      description: "Living room electrical outlet sparking, safety concern"
    }
  ];

  // Work order stats
  const workOrderStats = [
    {
      key: 'totalOrders',
      title: 'Total Work Orders',
      value: workOrders.length,
      subtitle: 'This month',
      icon: ClipboardList,
      color: 'blue'
    },
    {
      key: 'pendingOrders',
      title: 'Pending Assignment',
      value: workOrders.filter(w => w.status === 'pending' || w.status === 'open').length,
      subtitle: 'Need attention',
      icon: Clock,
      color: 'yellow'
    },
    {
      key: 'inProgressOrders',
      title: 'In Progress',
      value: workOrders.filter(w => w.status === 'in-progress').length,
      subtitle: 'Being worked on',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      key: 'completedOrders',
      title: 'Completed',
      value: workOrders.filter(w => w.status === 'completed').length,
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
        { value: 'pending', label: 'Pending Assignment' },
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
        { value: 'urgent', label: 'Urgent' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
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
        { value: 'general', label: 'General Maintenance' }
      ]
    },
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
    getCommonFilterConfigs().dateFrom,
    getCommonFilterConfigs().dateTo
  ];

  // Table columns
  const columns = [
    {
      key: 'title',
      label: 'Work Order',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-gray-400" />
            {value}
          </div>
          <div className="text-sm text-gray-500 mt-1">{item.category}</div>
          <div className="text-xs text-gray-400 mt-1">#{item.id}</div>
        </div>
      )
    },
    {
      key: 'property',
      label: 'Property & Tenant',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <User className="w-3 h-3" />
            {item.tenant}
          </div>
          <div className="text-xs text-blue-600">
            Landlord: {item.landlord}
          </div>
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
      key: 'cost',
      label: 'Cost',
      render: (_, item) => (
        <div>
          <div className="text-sm font-medium">
            Est: AED {item.estimatedCost?.toLocaleString()}
          </div>
          {item.actualCost && (
            <div className="text-sm text-green-600">
              Actual: AED {item.actualCost.toLocaleString()}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true,
      render: (value) => {
        const dueDate = new Date(value);
        const today = new Date();
        const isOverdue = dueDate < today;
        
        return (
          <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
            {dueDate.toLocaleDateString()}
            {isOverdue && <div className="text-xs text-red-500">Overdue</div>}
          </div>
        );
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
          <Button variant="ghost" size="sm" title="Edit Order">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Message">
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Schedule">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Handle create work order
  const handleCreateWorkOrder = () => {
    console.log('Create new work order');
    // Implement create work order functionality
  };

  return (
    <>
      {/* Stats Cards */}
      <DashboardSection title="Work Orders Overview">
        <StatsGrid 
          stats={workOrderStats}
          loading={loading}
          columns={4}
        />
      </DashboardSection>

      {/* Filters */}
      <DashboardSection title="Filter Work Orders">
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

      {/* Work Orders Table */}
      <DashboardSection 
        title="All Work Orders"
        subtitle="Manage maintenance requests across all properties"
        actions={
          <div className="flex items-center gap-2">
            <Button onClick={handleCreateWorkOrder} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Work Order
            </Button>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        }
      >
        <DataTable
          title="Work Orders Management"
          data={workOrders}
          columns={columns}
          loading={loading}
          pagination={true}
          sorting={true}
          currentPage={tableState.page}
          pageSize={tableState.pageSize}
          totalItems={workOrders.length}
          sortField={tableState.sortField}
          sortDirection={tableState.sortDirection}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSort={toggleSort}
          emptyMessage="No work orders found"
        />
      </DashboardSection>
    </>
  );
};

export default PropertyManagerWorkOrdersTab;
