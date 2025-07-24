// Dashboard configuration constants
export const DASHBOARD_CONFIGS = {
  // Chart colors and themes
  CHART_COLORS: {
    primary: "#3B82F6",
    secondary: "#10B981", 
    accent: "#F59E0B",
    danger: "#EF4444",
    warning: "#F59E0B",
    success: "#10B981",
    info: "#3B82F6",
    gradient: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]
  },

  // Status configurations
  STATUS_CONFIGS: {
    property: {
      occupied: { label: "Occupied", color: "text-green-600", bg: "bg-green-100" },
      available: { label: "Available", color: "text-blue-600", bg: "bg-blue-100" },
      maintenance: { label: "Maintenance", color: "text-yellow-600", bg: "bg-yellow-100" },
      unavailable: { label: "Unavailable", color: "text-red-600", bg: "bg-red-100" }
    },
    payment: {
      paid: { label: "Paid", color: "text-green-600", bg: "bg-green-100" },
      pending: { label: "Pending", color: "text-yellow-600", bg: "bg-yellow-100" },
      overdue: { label: "Overdue", color: "text-red-600", bg: "bg-red-100" },
      partial: { label: "Partial", color: "text-orange-600", bg: "bg-orange-100" }
    },
    maintenance: {
      open: { label: "Open", color: "text-blue-600", bg: "bg-blue-100" },
      "in-progress": { label: "In Progress", color: "text-yellow-600", bg: "bg-yellow-100" },
      completed: { label: "Completed", color: "text-green-600", bg: "bg-green-100" },
      cancelled: { label: "Cancelled", color: "text-red-600", bg: "bg-red-100" }
    },
    lease: {
      active: { label: "Active", color: "text-green-600", bg: "bg-green-100" },
      expiring: { label: "Expiring Soon", color: "text-yellow-600", bg: "bg-yellow-100" },
      expired: { label: "Expired", color: "text-red-600", bg: "bg-red-100" },
      renewed: { label: "Renewed", color: "text-blue-600", bg: "bg-blue-100" }
    }
  },

  // Filter options
  FILTER_OPTIONS: {
    timeRange: [
      { value: "7d", label: "Last 7 days" },
      { value: "30d", label: "Last 30 days" },
      { value: "90d", label: "Last 3 months" },
      { value: "1y", label: "Last year" },
      { value: "all", label: "All time" }
    ],
    propertyType: [
      { value: "all", label: "All Properties" },
      { value: "apartment", label: "Apartment" },
      { value: "house", label: "House" },
      { value: "condo", label: "Condo" },
      { value: "townhouse", label: "Townhouse" },
      { value: "studio", label: "Studio" }
    ],
    status: [
      { value: "all", label: "All Status" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" }
    ]
  },

  // Table configurations
  TABLE_CONFIGS: {
    pagination: {
      defaultPageSize: 10,
      pageSizeOptions: [5, 10, 20, 50]
    },
    sorting: {
      defaultSort: { field: "createdAt", direction: "desc" }
    }
  },

  // Card configurations
  CARD_CONFIGS: {
    stats: {
      animationDuration: 300,
      showTrend: true,
      showIcon: true
    }
  },

  // Dashboard refresh intervals (in milliseconds)
  REFRESH_INTERVALS: {
    dashboard: 30000, // 30 seconds
    notifications: 60000, // 1 minute
    realtime: 5000 // 5 seconds for real-time data
  }
};

// Role-specific dashboard configurations
export const ROLE_DASHBOARD_CONFIGS = {
  landlord: {
    defaultTab: "overview",
    enabledFeatures: ["properties", "tenants", "payments", "maintenance", "reports"],
    statsCards: [
      { key: "totalProperties", label: "Total Properties", icon: "Building2" },
      { key: "monthlyIncome", label: "Monthly Income", icon: "DollarSign" },
      { key: "occupancyRate", label: "Occupancy Rate", icon: "Users" },
      { key: "maintenanceRequests", label: "Maintenance Requests", icon: "Wrench" }
    ]
  },
  
  tenant: {
    defaultTab: "overview",
    enabledFeatures: ["properties", "payments", "maintenance", "applications"],
    statsCards: [
      { key: "leaseRemaining", label: "Lease Remaining", icon: "Clock" },
      { key: "monthlyRent", label: "Monthly Rent", icon: "DollarSign" },
      { key: "paymentRate", label: "Payment Rate", icon: "CheckCircle" },
      { key: "utilityCost", label: "Utility Cost", icon: "Home" }
    ]
  },
  
  property_manager: {
    defaultTab: "overview",
    enabledFeatures: ["properties", "tenants", "workOrders", "rentCollection", "analytics"],
    statsCards: [
      { key: "managedProperties", label: "Managed Properties", icon: "Building2" },
      { key: "totalTenants", label: "Total Tenants", icon: "Users" },
      { key: "activeWorkOrders", label: "Active Work Orders", icon: "ClipboardList" },
      { key: "collectionRate", label: "Collection Rate", icon: "DollarSign" }
    ]
  }
};
