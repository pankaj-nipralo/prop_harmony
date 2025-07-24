// Tenant Applications Tab Component
import React, { useState } from 'react';
import { DashboardSection } from '@/components/shared/DashboardLayout';
import { StatsGrid } from '@/components/shared/StatsCard';
import DataTable from '@/components/shared/DataTable';
import FilterPanel, { getCommonFilterConfigs } from '@/components/shared/FilterPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTableState } from '@/hooks/useFilters';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Eye,
  Edit,
  Download
} from 'lucide-react';

const TenantApplicationsTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Table state
  const { tableState, setPage, setPageSize, toggleSort } = useTableState({
    pageSize: 10,
    sortField: 'submittedDate',
    sortDirection: 'desc'
  });

  // Local state
  const [searchTerm, setSearchTerm] = useState('');

  // Mock applications data
  const applications = [
    {
      id: 1,
      propertyName: "Luxury 2BR Apartment",
      propertyAddress: "Marina Walk, Dubai Marina",
      landlord: "Ahmed Properties LLC",
      submittedDate: "2024-01-15",
      status: "pending",
      monthlyRent: 3200,
      applicationFee: 500,
      securityDeposit: 3200,
      notes: "Application under review by landlord",
      documents: ["ID Copy", "Salary Certificate", "Bank Statement"]
    },
    {
      id: 2,
      propertyName: "Modern Studio",
      propertyAddress: "Business Bay, Downtown Dubai",
      landlord: "City Properties",
      submittedDate: "2024-01-10",
      status: "approved",
      monthlyRent: 2800,
      applicationFee: 300,
      securityDeposit: 2800,
      notes: "Application approved. Lease signing scheduled.",
      documents: ["ID Copy", "Salary Certificate", "Bank Statement", "Emirates ID"]
    },
    {
      id: 3,
      propertyName: "3BR Villa",
      propertyAddress: "Jumeirah Village Circle",
      landlord: "Premium Homes",
      submittedDate: "2024-01-05",
      status: "rejected",
      monthlyRent: 4500,
      applicationFee: 750,
      securityDeposit: 4500,
      notes: "Application rejected due to insufficient income documentation.",
      documents: ["ID Copy", "Salary Certificate"]
    },
    {
      id: 4,
      propertyName: "1BR Apartment",
      propertyAddress: "DIFC, Dubai",
      landlord: "Financial District Properties",
      submittedDate: "2023-12-20",
      status: "withdrawn",
      monthlyRent: 3800,
      applicationFee: 400,
      securityDeposit: 3800,
      notes: "Application withdrawn by tenant",
      documents: ["ID Copy", "Salary Certificate", "Bank Statement"]
    }
  ];

  // Application stats
  const applicationStats = [
    {
      key: 'totalApplications',
      title: 'Total Applications',
      value: applications.length,
      subtitle: 'All time',
      icon: FileText,
      color: 'blue'
    },
    {
      key: 'pendingApplications',
      title: 'Pending',
      value: applications.filter(a => a.status === 'pending').length,
      subtitle: 'Awaiting response',
      icon: Clock,
      color: 'yellow'
    },
    {
      key: 'approvedApplications',
      title: 'Approved',
      value: applications.filter(a => a.status === 'approved').length,
      subtitle: 'Successful applications',
      icon: CheckCircle,
      color: 'green'
    },
    {
      key: 'rejectedApplications',
      title: 'Rejected',
      value: applications.filter(a => a.status === 'rejected').length,
      subtitle: 'Unsuccessful applications',
      icon: XCircle,
      color: 'red'
    }
  ];

  // Filter configurations
  const filterConfigs = [
    {
      key: 'status',
      label: 'Application Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'withdrawn', label: 'Withdrawn' }
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
      key: 'propertyName',
      label: 'Property',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{item.propertyAddress}</div>
          <div className="text-sm text-blue-600">{item.landlord}</div>
        </div>
      )
    },
    {
      key: 'monthlyRent',
      label: 'Monthly Rent',
      sortable: true,
      type: 'currency'
    },
    {
      key: 'submittedDate',
      label: 'Submitted',
      sortable: true,
      type: 'date'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const colors = {
          pending: 'bg-yellow-100 text-yellow-800',
          approved: 'bg-green-100 text-green-800',
          rejected: 'bg-red-100 text-red-800',
          withdrawn: 'bg-gray-100 text-gray-800'
        };
        return (
          <Badge className={colors[value]}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        );
      }
    },
    {
      key: 'applicationFee',
      label: 'App Fee',
      sortable: true,
      type: 'currency'
    },
    {
      key: 'documents',
      label: 'Documents',
      render: (documents) => (
        <div className="text-sm">
          <span className="font-medium">{documents.length} files</span>
          <div className="text-xs text-gray-500 mt-1">
            {documents.slice(0, 2).join(', ')}
            {documents.length > 2 && ` +${documents.length - 2} more`}
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
          {item.status === 'pending' && (
            <Button variant="ghost" size="sm" title="Edit Application">
              <Edit className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" title="Download">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Handle new application
  const handleNewApplication = () => {
    console.log('Create new application');
    // Implement new application functionality
  };

  return (
    <>
      {/* Application Stats */}
      <DashboardSection title="Application Overview">
        <StatsGrid 
          stats={applicationStats}
          loading={loading}
          columns={4}
        />
      </DashboardSection>

      {/* Filters */}
      <DashboardSection title="Filter Applications">
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

      {/* Applications Table */}
      <DashboardSection 
        title="Rental Applications"
        subtitle="Track all your rental applications and their status"
        actions={
          <div className="flex items-center gap-2">
            <Button onClick={handleNewApplication} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Application
            </Button>
            <Button variant="outline" size="sm">
              Export List
            </Button>
          </div>
        }
      >
        <DataTable
          title="All Applications"
          data={applications}
          columns={columns}
          loading={loading}
          pagination={true}
          sorting={true}
          currentPage={tableState.page}
          pageSize={tableState.pageSize}
          totalItems={applications.length}
          sortField={tableState.sortField}
          sortDirection={tableState.sortDirection}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSort={toggleSort}
          emptyMessage="No applications found"
        />
      </DashboardSection>

      {/* Application Tips */}
      <DashboardSection title="Application Tips">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Tips for Successful Applications</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Ensure all required documents are uploaded and up-to-date</li>
            <li>• Provide accurate income information and employment details</li>
            <li>• Submit applications promptly as properties move quickly</li>
            <li>• Include a cover letter explaining why you're a good tenant</li>
            <li>• Be prepared to pay application fees and security deposits</li>
          </ul>
        </div>
      </DashboardSection>
    </>
  );
};

export default TenantApplicationsTab;
