// Tenant Inspections Tab Component
import React, { useState } from 'react';
import { DashboardSection } from '@/components/shared/DashboardLayout';
import DataTable from '@/components/shared/DataTable';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTableState } from '@/hooks/useFilters';
import { useInspectionSync } from '@/hooks/useInspectionSync';
import { 
  Eye, 
  Calendar, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  FileText,
  Camera,
  MessageSquare
} from 'lucide-react';

const TenantInspectionsTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Table state
  const { tableState, setPage, setPageSize, toggleSort } = useTableState({
    pageSize: 10,
    sortField: 'scheduledDate',
    sortDirection: 'desc'
  });

  // Inspection sync hook
  const { inspections, isLoading: inspectionsLoading, updateInspection } = useInspectionSync();

  // Local state
  const [searchTerm, setSearchTerm] = useState('');

  // Mock inspections data
  const tenantInspections = [
    {
      id: 1,
      type: "Move-in Inspection",
      property: "Modern 2BR Apartment",
      address: "123 Downtown Street, Dubai Marina",
      scheduledDate: "2023-07-01",
      completedDate: "2023-07-01",
      status: "completed",
      inspector: "Ahmed Al Farsi",
      findings: "Property in excellent condition. Minor scuff on bedroom wall noted.",
      photos: 15,
      documents: ["Inspection Report", "Photo Gallery"],
      tenantSignature: true,
      landlordSignature: true
    },
    {
      id: 2,
      type: "Routine Inspection",
      property: "Modern 2BR Apartment",
      address: "123 Downtown Street, Dubai Marina",
      scheduledDate: "2024-01-15",
      completedDate: "2024-01-15",
      status: "completed",
      inspector: "Property Manager",
      findings: "Property well-maintained. No issues found.",
      photos: 8,
      documents: ["Inspection Report"],
      tenantSignature: true,
      landlordSignature: true
    },
    {
      id: 3,
      type: "Maintenance Follow-up",
      property: "Modern 2BR Apartment",
      address: "123 Downtown Street, Dubai Marina",
      scheduledDate: "2024-02-01",
      completedDate: null,
      status: "scheduled",
      inspector: "Ahmed Al Farsi",
      findings: null,
      photos: 0,
      documents: [],
      tenantSignature: false,
      landlordSignature: false
    },
    {
      id: 4,
      type: "Move-out Inspection",
      property: "Cozy Studio Downtown",
      address: "456 Business Bay, Downtown Dubai",
      scheduledDate: "2023-06-30",
      completedDate: "2023-06-30",
      status: "completed",
      inspector: "Sarah Johnson",
      findings: "Minor cleaning required. Security deposit partially refunded.",
      photos: 12,
      documents: ["Inspection Report", "Deposit Calculation"],
      tenantSignature: true,
      landlordSignature: true
    }
  ];

  // Filter configurations
  const filterConfigs = [
    {
      key: 'status',
      label: 'Inspection Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    },
    {
      key: 'type',
      label: 'Inspection Type',
      type: 'select',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'move-in', label: 'Move-in' },
        { value: 'move-out', label: 'Move-out' },
        { value: 'routine', label: 'Routine' },
        { value: 'maintenance', label: 'Maintenance Follow-up' }
      ]
    },
    getCommonFilterConfigs().dateFrom,
    getCommonFilterConfigs().dateTo
  ];

  // Table columns
  const columns = [
    {
      key: 'type',
      label: 'Inspection Type',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-400" />
            {value}
          </div>
          <div className="text-sm text-gray-500">{item.property}</div>
        </div>
      )
    },
    {
      key: 'scheduledDate',
      label: 'Scheduled Date',
      sortable: true,
      type: 'date'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const colors = {
          scheduled: 'bg-blue-100 text-blue-800',
          completed: 'bg-green-100 text-green-800',
          cancelled: 'bg-red-100 text-red-800'
        };
        const icons = {
          scheduled: Clock,
          completed: CheckCircle,
          cancelled: AlertTriangle
        };
        const Icon = icons[value];
        
        return (
          <Badge className={`${colors[value]} flex items-center gap-1`}>
            <Icon className="w-3 h-3" />
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        );
      }
    },
    {
      key: 'inspector',
      label: 'Inspector',
      sortable: true
    },
    {
      key: 'documentation',
      label: 'Documentation',
      render: (_, item) => (
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <Camera className="w-3 h-3 text-gray-400" />
            <span>{item.photos} photos</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <FileText className="w-3 h-3 text-gray-400" />
            <span>{item.documents.length} documents</span>
          </div>
        </div>
      )
    },
    {
      key: 'signatures',
      label: 'Signatures',
      render: (_, item) => (
        <div className="text-sm space-y-1">
          <div className={`flex items-center gap-1 ${item.tenantSignature ? 'text-green-600' : 'text-gray-400'}`}>
            <CheckCircle className="w-3 h-3" />
            <span>Tenant</span>
          </div>
          <div className={`flex items-center gap-1 ${item.landlordSignature ? 'text-green-600' : 'text-gray-400'}`}>
            <CheckCircle className="w-3 h-3" />
            <span>Landlord</span>
          </div>
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
          {item.status === 'completed' && (
            <Button variant="ghost" size="sm" title="Download Report">
              <FileText className="w-4 h-4" />
            </Button>
          )}
          {item.status === 'scheduled' && (
            <Button variant="ghost" size="sm" title="Add Comments">
              <MessageSquare className="w-4 h-4" />
            </Button>
          )}
        </div>
      )
    }
  ];

  // Next inspection
  const nextInspection = tenantInspections.find(i => i.status === 'scheduled');

  return (
    <>
      {/* Next Inspection Highlight */}
      {nextInspection && (
        <DashboardSection title="Upcoming Inspection">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  {nextInspection.type}
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {new Date(nextInspection.scheduledDate).toLocaleDateString()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">{nextInspection.property}</h4>
                  <p className="text-sm text-gray-600">{nextInspection.address}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Inspector: {nextInspection.inspector}
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Comments
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </DashboardSection>
      )}

      {/* Filters */}
      <DashboardSection title="Filter Inspections">
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

      {/* Inspections Table */}
      <DashboardSection 
        title="Inspection History"
        subtitle="All property inspections for your rentals"
      >
        <DataTable
          title="All Inspections"
          data={tenantInspections}
          columns={columns}
          loading={loading || inspectionsLoading}
          pagination={true}
          sorting={true}
          currentPage={tableState.page}
          pageSize={tableState.pageSize}
          totalItems={tenantInspections.length}
          sortField={tableState.sortField}
          sortDirection={tableState.sortDirection}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSort={toggleSort}
          emptyMessage="No inspections found"
          actions={
            <Button variant="outline" size="sm">
              Export Reports
            </Button>
          }
        />
      </DashboardSection>

      {/* Inspection Guidelines */}
      <DashboardSection title="Inspection Guidelines">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">What to Expect During Inspections</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Move-in:</strong> Document property condition before occupancy</li>
            <li>• <strong>Routine:</strong> Regular checks to ensure property maintenance</li>
            <li>• <strong>Move-out:</strong> Final inspection to assess any damages</li>
            <li>• <strong>Maintenance:</strong> Follow-up after repairs or improvements</li>
          </ul>
          <div className="mt-3 text-sm text-gray-600">
            <strong>Your Rights:</strong> You have the right to be present during all inspections and to receive copies of all inspection reports.
          </div>
        </div>
      </DashboardSection>
    </>
  );
};

export default TenantInspectionsTab;
