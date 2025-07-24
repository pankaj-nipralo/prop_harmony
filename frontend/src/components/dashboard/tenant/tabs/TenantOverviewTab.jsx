// Tenant Overview Tab Component
import React from 'react';
import { DashboardSection, DashboardGrid } from '@/components/shared/DashboardLayout';
import { StatsGrid } from '@/components/shared/StatsCard';
import DataTable from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDashboardStats, useRecentActivity } from '@/hooks/useDashboardData';
import { useTableState } from '@/hooks/useFilters';
import { ROLE_DASHBOARD_CONFIGS } from '@/config/dashboard-configs';
import { APP_CONSTANTS } from '@/config/constants';
import { 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Home,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Wrench
} from 'lucide-react';

const TenantOverviewTab = ({ 
  data, 
  loading, 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Get tenant dashboard configuration
  const config = ROLE_DASHBOARD_CONFIGS[APP_CONSTANTS.USER_ROLES.TENANT];
  
  // Dashboard stats
  const { stats, loading: statsLoading } = useDashboardStats(filters.timeRange);
  
  // Recent activity
  const { activity, loading: activityLoading } = useRecentActivity(5);
  
  // Table state for payments
  const { tableState, setPage, setPageSize, toggleSort } = useTableState();

  // Prepare stats cards data
  const statsCardsData = [
    {
      key: 'leaseRemaining',
      title: 'Lease Remaining',
      value: `${stats?.leaseRemaining || 0} days`,
      subtitle: 'Until lease expires',
      icon: Clock,
      color: 'blue',
      showCurrency: false
    },
    {
      key: 'monthlyRent',
      title: 'Monthly Rent',
      value: stats?.monthlyRent || 0,
      subtitle: `Annual: AED ${(stats?.monthlyRent * 12) || 0}`,
      icon: DollarSign,
      color: 'green',
      showCurrency: true
    },
    {
      key: 'paymentRate',
      title: 'Payment Rate',
      value: `${stats?.paymentRate || 0}%`,
      subtitle: 'On-time payments',
      icon: CheckCircle,
      color: 'green',
      showCurrency: false
    },
    {
      key: 'utilityCost',
      title: 'Avg Utility Cost',
      value: stats?.utilityCost || 0,
      subtitle: 'Per month',
      icon: Home,
      color: 'purple',
      showCurrency: true
    }
  ];

  // Mock data (in real app, this would come from the data prop)
  const currentProperty = {
    name: "Modern 2BR Apartment",
    address: "123 Downtown Street, Dubai Marina, Dubai",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    rent: 2400,
    leaseStart: "2023-07-01",
    leaseEnd: "2025-06-30",
    status: "Active Lease"
  };

  const landlordInfo = {
    name: "Ahmed Al Farsi",
    phone: "+971 50 123 4567",
    email: "ahmed.alfarsi@email.com",
    company: "Al Farsi Properties"
  };

  const recentPayments = [
    {
      id: 1,
      amount: 2400,
      date: "2024-01-01",
      status: "paid",
      type: "rent",
      method: "bank_transfer"
    },
    {
      id: 2,
      amount: 150,
      date: "2024-01-01",
      status: "paid",
      type: "utilities",
      method: "credit_card"
    },
    {
      id: 3,
      amount: 2400,
      date: "2023-12-01",
      status: "paid",
      type: "rent",
      method: "bank_transfer"
    }
  ];

  const maintenanceRequests = [
    {
      id: 1,
      title: "AC not working properly",
      status: "in-progress",
      date: "2024-01-10",
      priority: "high",
      category: "HVAC"
    },
    {
      id: 2,
      title: "Kitchen faucet dripping",
      status: "completed",
      date: "2024-01-05",
      priority: "medium",
      category: "Plumbing"
    }
  ];

  // Payment table columns
  const paymentColumns = [
    { key: 'date', label: 'Date', type: 'date', sortable: true },
    { key: 'amount', label: 'Amount', type: 'currency', sortable: true },
    { 
      key: 'type', 
      label: 'Type', 
      render: (value) => value.charAt(0).toUpperCase() + value.slice(1)
    },
    { key: 'status', label: 'Status', type: 'badge', statusType: 'payment' },
    { 
      key: 'method', 
      label: 'Method',
      render: (value) => value ? value.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-'
    }
  ];

  // Maintenance table columns
  const maintenanceColumns = [
    { key: 'title', label: 'Request', sortable: true },
    { key: 'category', label: 'Category' },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (value) => {
        const colors = {
          low: 'bg-gray-100 text-gray-800',
          medium: 'bg-yellow-100 text-yellow-800',
          high: 'bg-orange-100 text-orange-800'
        };
        return (
          <Badge className={colors[value]}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        );
      }
    },
    { key: 'status', label: 'Status', type: 'badge', statusType: 'maintenance' },
    { key: 'date', label: 'Date', type: 'date', sortable: true }
  ];

  return (
    <>
      {/* Stats Cards */}
      <DashboardSection title="Lease Overview">
        <StatsGrid 
          stats={statsCardsData}
          loading={statsLoading || loading}
          columns={4}
        />
      </DashboardSection>

      {/* Current Property & Landlord Info */}
      <DashboardSection title="Current Property">
        <DashboardGrid columns={2}>
          {/* Property Details */}
          <Card className="bg-white border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-600" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">{currentProperty.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {currentProperty.address}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="ml-2 font-medium">{currentProperty.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Bedrooms:</span>
                  <span className="ml-2 font-medium">{currentProperty.bedrooms}</span>
                </div>
                <div>
                  <span className="text-gray-500">Area:</span>
                  <span className="ml-2 font-medium">{currentProperty.area} sq ft</span>
                </div>
                <div>
                  <span className="text-gray-500">Monthly Rent:</span>
                  <span className="ml-2 font-medium">AED {currentProperty.rent.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Lease: {new Date(currentProperty.leaseStart).toLocaleDateString()} - {new Date(currentProperty.leaseEnd).toLocaleDateString()}
                  </span>
                </div>
                <Badge className="mt-2 bg-green-100 text-green-800">
                  {currentProperty.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Landlord Information */}
          <Card className="bg-white border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Landlord Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">{landlordInfo.name}</h3>
                <p className="text-sm text-gray-600">{landlordInfo.company}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{landlordInfo.phone}</span>
                  <Button variant="outline" size="sm">Call</Button>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{landlordInfo.email}</span>
                  <Button variant="outline" size="sm">Email</Button>
                </div>
              </div>

              <div className="pt-2 border-t">
                <Button className="w-full">
                  <Wrench className="w-4 h-4 mr-2" />
                  Submit Maintenance Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </DashboardGrid>
      </DashboardSection>

      {/* Recent Payments */}
      <DashboardSection title="Recent Payments">
        <DataTable
          title="Payment History"
          data={recentPayments}
          columns={paymentColumns}
          loading={loading}
          pagination={false}
          sorting={true}
          emptyMessage="No payment history available"
        />
      </DashboardSection>

      {/* Recent Maintenance */}
      <DashboardSection title="Maintenance Requests">
        <DataTable
          title="Recent Requests"
          data={maintenanceRequests}
          columns={maintenanceColumns}
          loading={loading}
          pagination={false}
          sorting={true}
          emptyMessage="No maintenance requests found"
        />
      </DashboardSection>
    </>
  );
};

export default TenantOverviewTab;
