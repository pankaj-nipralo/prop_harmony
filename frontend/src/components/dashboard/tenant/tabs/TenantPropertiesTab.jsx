// Tenant Properties Tab Component
import React, { useState } from 'react';
import { DashboardSection, DashboardGrid } from '@/components/shared/DashboardLayout';
import DataTable from '@/components/shared/DataTable';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTableState } from '@/hooks/useFilters';
import { 
  Home, 
  MapPin, 
  Calendar, 
  DollarSign,
  Eye,
  FileText,
  Star,
  Bed,
  Bath,
  Square
} from 'lucide-react';

const TenantPropertiesTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Table state
  const { tableState, setPage, setPageSize, toggleSort } = useTableState({
    pageSize: 10,
    sortField: 'startDate',
    sortDirection: 'desc'
  });

  // Local state
  const [searchTerm, setSearchTerm] = useState('');

  // Mock properties data (current and past)
  const properties = [
    {
      id: 1,
      name: "Modern 2BR Apartment",
      address: "123 Downtown Street, Dubai Marina",
      type: "apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      rent: 2400,
      startDate: "2023-07-01",
      endDate: "2025-06-30",
      status: "current",
      landlord: "Ahmed Al Farsi",
      rating: 4.5,
      images: ["image1.jpg", "image2.jpg"],
      amenities: ["Pool", "Gym", "Parking", "Security"]
    },
    {
      id: 2,
      name: "Cozy Studio Downtown",
      address: "456 Business Bay, Downtown Dubai",
      type: "studio",
      bedrooms: 0,
      bathrooms: 1,
      area: 600,
      rent: 1800,
      startDate: "2022-01-01",
      endDate: "2023-06-30",
      status: "past",
      landlord: "Sarah Johnson",
      rating: 4.0,
      images: ["image3.jpg"],
      amenities: ["Pool", "Gym"]
    },
    {
      id: 3,
      name: "Luxury 3BR Villa",
      address: "789 Palm Jumeirah, Dubai",
      type: "villa",
      bedrooms: 3,
      bathrooms: 3,
      area: 2500,
      rent: 4500,
      startDate: "2021-03-01",
      endDate: "2021-12-31",
      status: "past",
      landlord: "Michael Chen",
      rating: 5.0,
      images: ["image4.jpg", "image5.jpg", "image6.jpg"],
      amenities: ["Private Pool", "Garden", "Maid's Room", "Parking"]
    }
  ];

  // Current property (first property with current status)
  const currentProperty = properties.find(p => p.status === 'current');

  // Filter configurations
  const filterConfigs = [
    {
      key: 'status',
      label: 'Property Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Properties' },
        { value: 'current', label: 'Current Property' },
        { value: 'past', label: 'Past Properties' }
      ]
    },
    getCommonFilterConfigs().propertyType,
    {
      key: 'bedrooms',
      label: 'Bedrooms',
      type: 'select',
      options: [
        { value: 'all', label: 'All Bedrooms' },
        { value: '0', label: 'Studio' },
        { value: '1', label: '1 Bedroom' },
        { value: '2', label: '2 Bedrooms' },
        { value: '3+', label: '3+ Bedrooms' }
      ]
    },
    getCommonFilterConfigs().dateFrom,
    getCommonFilterConfigs().dateTo
  ];

  // Table columns
  const columns = [
    {
      key: 'name',
      label: 'Property',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900 flex items-center gap-2">
            <Home className="w-4 h-4 text-gray-400" />
            {value}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
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
            {item.bedrooms || 'Studio'}
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
      key: 'period',
      label: 'Lease Period',
      render: (_, item) => (
        <div className="text-sm">
          <div className="font-medium">
            {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
          </div>
          <div className="text-gray-500">
            {Math.round((new Date(item.endDate) - new Date(item.startDate)) / (1000 * 60 * 60 * 24 * 30))} months
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge className={value === 'current' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" title="View Details">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="View Documents">
            <FileText className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      {/* Current Property Highlight */}
      {currentProperty && (
        <DashboardSection title="Current Property">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-blue-600" />
                  {currentProperty.name}
                </div>
                <Badge className="bg-green-100 text-green-800">Active Lease</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {currentProperty.address}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3 h-3" />
                      {currentProperty.bedrooms || 'Studio'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3 h-3" />
                      {currentProperty.bathrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-3 h-3" />
                      {currentProperty.area} sq ft
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-lg">AED {currentProperty.rent.toLocaleString()}/month</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Until {new Date(currentProperty.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Lease Documents
                  </Button>
                </div>
              </div>
              
              {/* Amenities */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProperty.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </DashboardSection>
      )}

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
        title="Property History"
        subtitle="All properties you have rented"
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
          actions={
            <Button variant="outline" size="sm">
              Export History
            </Button>
          }
        />
      </DashboardSection>
    </>
  );
};

export default TenantPropertiesTab;
