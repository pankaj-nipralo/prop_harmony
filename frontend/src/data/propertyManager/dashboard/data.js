// Property Manager Dashboard Data
export const generateDashboardData = () => {
  return {
    // Property statistics
    totalProperties: 12,
    occupiedUnits: 10,
    occupancyRate: 83,
    
    // Work orders
    activeWorkOrders: 8,
    inProgressOrders: 5,
    pendingOrders: 3,
    completedOrders: 42,
    
    // Lease information
    upcomingRenewals: 3,
    leaseExpirations: [
      { tenant: "Sarah Johnson", property: "Sunset Apartments #101", landlord: "Pankaj Gupta", expiryDate: "2024-07-15", status: "Pending Renewal" },
      { tenant: "Michael Chen", property: "Marina View Villa #3", landlord: "Gaurav Kanchan", expiryDate: "2024-07-22", status: "Not Renewing" },
      { tenant: "Emma Wilson", property: "Downtown Loft #7B", landlord: "Uzair Sayyed", expiryDate: "2024-08-05", status: "Renewal Confirmed" }
    ],
    
    // Rent collection data
    rentCollection: {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      collected: [82000, 85000, 86000, 87000, 88000, 92000],
      pending: [5000, 4000, 4500, 3500, 3000, 2500],
      overdue: [3000, 2500, 2000, 1500, 1000, 500]
    },
    
    // Maintenance requests
    maintenanceRequests: [
      { landlord: "Pankaj Gupta", property: "Sunset Apartments #203", issue: "AC Repair", tenant: "David Miller", status: "In Progress", priority: "High" },
      { landlord: "Uzair Sayyed", property: "Marina View Villa #3", issue: "Plumbing Leak", tenant: "Michael Chen", status: "Pending", priority: "Critical" },
      { landlord: "Gaurav Kanchan", property: "Downtown Loft #5A", issue: "Electrical Issue", tenant: "Lisa Wang", status: "In Progress", priority: "Medium" },
      { landlord: "Pankaj Gupta", property: "Sunset Apartments #101", issue: "Appliance Repair", tenant: "Sarah Johnson", status: "Pending", priority: "Low" },
      { landlord: "Pankaj Gupta", property: "Palm Residence #7", issue: "Door Lock Replacement", tenant: "James Wilson", status: "In Progress", priority: "Medium" }
    ],
    
    // Recent activity
    recentActivity: [
      { type: "maintenance", message: "Completed AC repair at Sunset Apartments #203", time: "2 hours ago" },
      { type: "lease", message: "Lease renewal processed for Downtown Loft #7B", time: "5 hours ago" },
      { type: "inspection", message: "Scheduled inspection for Marina View Villa #3", time: "Yesterday" },
      { type: "payment", message: "Rent collected from Palm Residence #7", time: "Yesterday" },
      { type: "maintenance", message: "New maintenance request from Sunset Apartments #101", time: "2 days ago" }
    ],
    
    // Notifications
    notifications: [
      { type: "urgent", message: "Critical plumbing issue at Marina View Villa #3 requires immediate attention", time: "1 hour ago" },
      { type: "warning", message: "3 lease agreements expiring in the next 30 days", time: "5 hours ago" },
      { type: "info", message: "Monthly property inspection reports due by end of week", time: "Yesterday" },
      { type: "success", message: "All rent payments for June have been processed", time: "2 days ago" }
    ]
  };
};