// Property Manager Properties Tab Component
import React, { useState } from 'react';
import { DashboardSection } from '@/components/shared/DashboardLayout';
import DataTable from '@/components/shared/DataTable';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTableState, useSelection } from '@/hooks/useFilters';
import { 
  Eye, 
  Edit, 
  Users,
  MapPin,
  Building,
  DollarSign
} from 'lucide-react';

const PropertyManagerPropertiesTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Table state
  const { tableState, setPage, setPageSize, toggleSort } = useTableState({
    pageSize: 10,
    sortField: 'name',
    sortDirection: 'asc'
  });

  // Selection state
  const { 
    selectedItems, 
    toggleItem, 
    selectAll, 
    clearSelection, 
    isSelected,
    hasSelection 
  } = useSelection();

  // Local state
  const [searchTerm, setSearchTerm] = useState('');

  // Mock properties data
  const properties = [
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main Street, Dubai Marina",
      landlord: "Pankaj Gupta",
      type: "apartment",
      units: 8,
      occupiedUnits: 7,
      occupancyRate: 87.5,
      monthlyRevenue: 28000,
      status: "active",
      lastInspection: "2024-01-15",
      tenants: [
        { name: "Sarah Johnson", unit: "101" },
        { name: "Michael Chen", unit: "102" }
      ]
    },
    {
      id: 2,
      name: "Marina View Complex",
      address: "456 Palm Street, Palm Jumeirah",
      landlord: "Gaurav Kanchan",
      type: "villa",
      units: 4,
      occupiedUnits: 3,
      occupancyRate: 75,
      monthlyRevenue: 17000,
      status: "active",
      lastInspection: "2024-01-10",
      tenants: [
        { name: "Emma Wilson", unit: "A" },
        { name: "David Brown", unit: "B" }
      ]
    },
    {
      id: 3,
      name: "Downtown Business Center",
      address: "789 Business Bay, Downtown Dubai",
      landlord: "Uzair Sayyed",
      type: "commercial",
      units: 12,
      occupiedUnits: 10,
      occupancyRate: 83.3,
      monthlyRevenue: 45000,
      status: "active",
      lastInspection: "2024-01-20",
      tenants: [
        { name: "Tech Solutions LLC", unit: "501" },
        { name: "Marketing Pro", unit: "502" }
      ]
    }
  ];

  // Filter configurations
  const filterConfigs = [
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
    getCommonFilterConfigs().status,
    {
      key: 'occupancyRange',
      label: 'Occupancy Rate',
      type: 'select',
      options: [
        { value: 'all', label: 'All Rates' },
        { value: '90-100', label: '90-100%' },
        { value: '75-89', label: '75-89%' },
        { value: '50-74', label: '50-74%' },
        { value: '0-49', label: 'Below 50%' }
      ]
    }
  ];

  // Table columns
  const columns = [
    {
      key: 'select',
      label: '',
      render: (_, item) => (
        <input
          type="checkbox"
          checked={isSelected(item.id)}
          onChange={() => toggleItem(item.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      )
    },
    {
      key: 'name',
      label: 'Property',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-gray-400" />
            {value}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" />
            {item.address}
          </div>
          <div className="text-sm text-blue-600 mt-1">
            Landlord: {item.landlord}
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <Badge variant="outline">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      key: 'occupancy',
      label: 'Occupancy',
      sortable: true,
      render: (_, item) => (
        <div>
          <div className="font-medium text-gray-900">
            {item.occupiedUnits}/{item.units} units
          </div>
          <div className={`text-sm font-medium ${
            item.occupancyRate >= 90 ? 'text-green-600' :
            item.occupancyRate >= 75 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {item.occupancyRate}% occupied
          </div>
        </div>
      )
    },
    {
      key: 'monthlyRevenue',
      label: 'Monthly Revenue',
      sortable: true,
      type: 'currency'
    },
    {
      key: 'tenants',
      label: 'Recent Tenants',
      render: (tenants) => (
        <div className="space-y-1">
          {tenants.slice(0, 2).map((tenant, index) => (
            <div key={index} className="text-sm text-gray-600 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {tenant.name} (Unit {tenant.unit})
            </div>
          ))}
          {tenants.length > 2 && (
            <div className="text-xs text-gray-400">
              +{tenants.length - 2} more
            </div>
          )}
        </div>
      )
    },
    {
      key: 'lastInspection',
      label: 'Last Inspection',
      type: 'date',
      sortable: true
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" title="View Details">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Edit Property">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="View Revenue">
            <DollarSign className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on properties:`, selectedItems);
    // Implement bulk actions
  };

  // Bulk actions component
  const bulkActions = hasSelection && (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">
        {selectedItems.length} selected
      </span>
      <Button variant="outline" size="sm" onClick={() => handleBulkAction('inspect')}>
        Schedule Inspection
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleBulkAction('report')}>
        Generate Report
      </Button>
      <Button variant="ghost" size="sm" onClick={clearSelection}>
        Clear
      </Button>
    </div>
  );

  return (
    <>
      {/* Filters */}
      <DashboardSection title="Property Filters">
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

      {/* Properties Table */}
      <DashboardSection 
        title="Managed Properties"
        subtitle="Properties under your management across all landlords"
        actions={
          <div className="flex items-center gap-2">
            {bulkActions}
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        }
      >
        <DataTable
          title="All Properties"
          data={properties}
          columns={columns}
          loading={loading}
          pagination={true}
          sorting={true}
          currentPage={tableState.page}
          pageSize={tableState.pageSize}
          totalItems={properties.length}
          sortField={tableState.sortField}
          sortDirection={tableState.sortDirection}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSort={toggleSort}
          emptyMessage="No properties found"
        />
      </DashboardSection>
    </>
  );
};

export default PropertyManagerPropertiesTab;
