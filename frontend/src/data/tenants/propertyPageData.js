// My Property Page Sample Data
export const currentProperty = {
  id: 1,
  name: "Luxury Downtown Apartment",
  address: "123 Main St, Downtown, Dubai",
  type: "Apartment",
  bedrooms: 2,
  bathrooms: 2,
  area: "1200 sq ft",
  status: "Active Lease",
  features: [
    "Air Conditioning",
    "Balcony", 
    "Gym Access",
    "Swimming Pool",
    "Parking"
  ],
  images: [
    "/images/property1.jpg",
    "/images/property2.jpg"
  ]
};

export const leaseInformation = {
  startDate: "2024-01-01",
  endDate: "2024-12-31", 
  progress: 100,
  daysRemaining: 0,
  monthlyRent: "AED 7,500",
  depositPaid: "AED 7,500",
  nextPaymentDate: "February 1, 2025",
  dueDate: "1st of each month",
  renewalNotice: "Lease expiring soon. Consider renewal options."
};

export const contactInformation = {
  landlord: {
    name: "Ahmed Al-Rashid",
    phone: "+971-50-123-4567",
    email: "ahmed.rashid@propharmony.com"
  },
  propertyManager: {
    name: "Sarah Johnson", 
    phone: "+971-50-987-6543",
    email: "sarah.johnson@propharmony.com"
  }
};

export const propertyDocuments = [
  {
    id: 1,
    name: "Lease Agreement",
    type: "PDF",
    signedDate: "2024-01-01",
    size: "2.4 MB",
    downloadUrl: "/documents/lease-agreement.pdf"
  },
  {
    id: 2,
    name: "Property Inspection Report",
    type: "PDF", 
    signedDate: "2024-01-01",
    size: "1.8 MB",
    downloadUrl: "/documents/inspection-report.pdf"
  },
  {
    id: 3,
    name: "Move-in Checklist",
    type: "PDF",
    signedDate: "2024-01-01", 
    size: "0.9 MB",
    downloadUrl: "/documents/move-in-checklist.pdf"
  }
];

export const maintenanceHistory = [
  {
    id: 1,
    title: "Air Conditioning Repair",
    description: "AC unit not cooling properly",
    status: "Completed",
    statusColor: "bg-green-100 text-green-800",
    priority: "High",
    priorityColor: "text-red-600",
    requestDate: "2024-01-15",
    completedDate: "2024-01-17",
    assignedTo: "HVAC Specialist",
    cost: "AED 450"
  },
  {
    id: 2,
    title: "Kitchen Faucet Leak",
    description: "Dripping faucet in kitchen sink",
    status: "In Progress", 
    statusColor: "bg-blue-100 text-blue-800",
    priority: "Medium",
    priorityColor: "text-yellow-600",
    requestDate: "2024-01-20",
    completedDate: null,
    assignedTo: "Plumber",
    cost: null
  },
  {
    id: 3,
    title: "Bathroom Light Fixture",
    description: "Light fixture flickering in master bathroom",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-800", 
    priority: "Low",
    priorityColor: "text-green-600",
    requestDate: "2024-01-22",
    completedDate: null,
    assignedTo: "Electrician",
    cost: null
  }
];

export const propertyStats = [
  {
    title: "Lease Progress",
    value: "100%",
    subtitle: "0 days remaining",
    icon: "Calendar",
    color: "text-blue-500"
  },
  {
    title: "Payment Status",
    value: "Current", 
    subtitle: "All payments up to date",
    icon: "CheckCircle",
    color: "text-green-500"
  },
  {
    title: "Maintenance Requests",
    value: "3",
    subtitle: "1 pending, 1 in progress",
    icon: "Wrench", 
    color: "text-orange-500"
  },
  // {
  //   title: "Property Rating",
  //   value: "4.8/5",
  //   subtitle: "Based on amenities",
  //   icon: "Star",
  //   color: "text-yellow-500"
  // }
];

export const quickActions = [
  {
    id: 1,
    title: "Pay Rent",
    description: "Make your monthly rent payment",
    icon: "CreditCard",
    color: "bg-blue-500 hover:bg-blue-600",
    route: "/tenants/payments"
  },
  {
    id: 2,
    title: "Request Maintenance", 
    description: "Submit a maintenance request",
    icon: "Wrench",
    color: "bg-green-500 hover:bg-green-600",
    route: "/tenants/maintenance"
  },
  {
    id: 3,
    title: "Schedule Inspection",
    description: "Request property inspection",
    icon: "Eye",
    color: "bg-purple-500 hover:bg-purple-600", 
    route: "/tenants/property-inspection"
  },
  {
    id: 4,
    title: "Contact Manager",
    description: "Message your property manager",
    icon: "MessageCircle",
    color: "bg-gray-500 hover:bg-gray-600",
    route: "/tenants/messages"
  },
  {
    id: 5,
    title: "Renew Lease",
    description: "Start lease renewal process",
    icon: "RefreshCw", 
    color: "bg-indigo-500 hover:bg-indigo-600",
    route: "/tenants/lease-renewal"
  },
  {
    id: 6,
    title: "Report Issue",
    description: "Report urgent property issues",
    icon: "AlertTriangle",
    color: "bg-red-500 hover:bg-red-600",
    route: "/tenants/issue-warning"
  }
];
