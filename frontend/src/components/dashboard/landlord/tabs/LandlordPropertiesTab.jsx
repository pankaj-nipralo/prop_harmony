// Landlord Properties Tab Component
import React, { useState } from 'react';
import { DashboardSection, DashboardGrid } from '@/components/shared/DashboardLayout';
import DataTable from '@/components/shared/DataTable';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTableState, useSelection } from '@/hooks/useFilters';
import { 
  Plus, 
  Edit, 
  Eye, 
  MoreHorizontal,
  MapPin,
  Bed,
  Bath,
  Square
} from 'lucide-react';

const LandlordPropertiesTab = ({ 
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

  // Mock properties data (in real app, this would come from the data prop)
  const properties = [
    {
      id: 1,
      name: "Sunset Apartments Unit 101",
      address: "123 Main Street, Dubai Marina, Dubai",
      type: "apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      rent: 8500,
      status: "occupied",
      tenant: "Sarah Johnson",
      leaseEnd: "2024-12-31",
      occupancy: 100,
      lastInspection: "2024-01-15"
    },
    {
      id: 2,
      name: "Marina View Villa",
      address: "456 Palm Street, Palm Jumeirah, Dubai",
      type: "villa",
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      rent: 18000,
      status: "available",
      tenant: null,
      leaseEnd: null,
      occupancy: 0,
      lastInspection: "2024-01-10"
    },
    {
      id: 3,
      name: "Downtown Loft",
      address: "789 City Center, Downtown Dubai",
      type: "loft",
      bedrooms: 1,
      bathrooms: 1,
      area: 800,
      rent: 6000,
      status: "occupied",
      tenant: "Michael Chen",
      leaseEnd: "2024-08-15",
      occupancy: 100,
      lastInspection: "2024-01-20"
    }
  ];

  // Filter configurations
  const filterConfigs = [
    getCommonFilterConfigs().propertyType,
    getCommonFilterConfigs().status,
    {
      key: 'bedrooms',
      label: 'Bedrooms',
      type: 'select',
      options: [
        { value: 'all', label: 'All Bedrooms' },
        { value: '1', label: '1 Bedroom' },
        { value: '2', label: '2 Bedrooms' },
        { value: '3', label: '3 Bedrooms' },
        { value: '4+', label: '4+ Bedrooms' }
      ]
    },
    getCommonFilterConfigs().minAmount,
    getCommonFilterConfigs().maxAmount
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
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {item.address}
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
      key: 'details',
      label: 'Details',
      render: (_, item) => (
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Bed className="w-3 h-3" />
            {item.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3 h-3" />
            {item.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-3 h-3" />
            {item.area} sq ft
          </span>
        </div>
      )
    },
    {
      key: 'rent',
      label: 'Monthly Rent',
      sortable: true,
      type: 'currency'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      type: 'badge',
      statusType: 'property'
    },
    {
      key: 'tenant',
      label: 'Current Tenant',
      render: (value, item) => (
        <div>
          {value ? (
            <>
              <div className="font-medium text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">
                Lease ends: {new Date(item.leaseEnd).toLocaleDateString()}
              </div>
            </>
          ) : (
            <span className="text-gray-400">Vacant</span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on items:`, selectedItems);
    // Implement bulk actions
  };

  // Handle add property
  const handleAddProperty = () => {
    console.log('Add new property');
    // Implement add property functionality
  };

  // Bulk actions component
  const bulkActions = hasSelection && (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">
        {selectedItems.length} selected
      </span>
      <Button variant="outline" size="sm" onClick={() => handleBulkAction('edit')}>
        Edit
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleBulkAction('delete')}>
        Delete
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
        title="Properties Management"
        actions={
          <div className="flex items-center gap-2">
            {bulkActions}
            <Button onClick={handleAddProperty} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Property
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
          searchable={false} // We handle search in the filter panel
          currentPage={tableState.page}
          pageSize={tableState.pageSize}
          totalItems={properties.length}
          sortField={tableState.sortField}
          sortDirection={tableState.sortDirection}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSort={toggleSort}
          emptyMessage="No properties found"
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

export default LandlordPropertiesTab;
