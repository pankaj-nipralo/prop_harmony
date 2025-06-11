export const maintenanceData = [
  {
    id: 1,
    maintenanceList: [
      {
        id: 1,
        title: "Leaking Faucet",
        description: "Faucet in the bathroom is leaking continuously",
        propertyName: "Sunset Apartments",
        propertyAddress: "Unit 101, Sunset Apartments, Dubai Marina",
        tenantName: "John Doe",
        tenantEmail: "john.doe@email.com",
        tenantPhone: "+971-50-123-4567",
        category: "Plumbing",
        priority: "Medium",
        status: "Open",
        requestedDate: "2024-01-10",
        assignedTechnician: "John Doe",
        technicianPhone: "+971-55-987-6543",
        technicianEmail: "john.doe@maintenance.com",
        estimatedCost: "AED 500",
        actualCost: null,
        completedDate: null,
        notes: "Tenant reports constant dripping",
        photos: [],
        createdBy: "Tenant Request",
        createdDate: "2024-01-10",
        lastUpdated: "2024-01-10",
        tags: ["urgent", "plumbing", "bathroom"]
      },
      {
        id: 2,
        title: "Broken Window",
        description: "Window in the living room is cracked and needs replacement",
        propertyName: "Oak Grove Condos",
        propertyAddress: "Unit 205, Oak Grove Condos, Business Bay",
        tenantName: "Jane Smith",
        tenantEmail: "jane.smith@email.com",
        tenantPhone: "+971-50-234-5678",
        category: "Windows & Doors",
        priority: "High",
        status: "In Progress",
        requestedDate: "2024-01-15",
        assignedTechnician: "Mike Wilson",
        technicianPhone: "+971-55-876-5432",
        technicianEmail: "mike.wilson@maintenance.com",
        estimatedCost: "AED 800",
        actualCost: null,
        completedDate: null,
        notes: "Safety concern - needs immediate attention",
        photos: [],
        createdBy: "Property Manager",
        createdDate: "2024-01-15",
        lastUpdated: "2024-01-16",
        tags: ["safety", "windows", "urgent"]
      },
      {
        id: 3,
        title: "HVAC System Maintenance",
        description: "Annual HVAC system cleaning and filter replacement",
        propertyName: "Marina View Apartments",
        propertyAddress: "Unit 1502, Marina View Apartments, Dubai Marina",
        tenantName: "Robert Johnson",
        tenantEmail: "robert.johnson@email.com",
        tenantPhone: "+971-50-345-6789",
        category: "HVAC",
        priority: "Low",
        status: "Completed",
        requestedDate: "2024-01-05",
        assignedTechnician: "Sarah Johnson",
        technicianPhone: "+971-55-765-4321",
        technicianEmail: "sarah.johnson@maintenance.com",
        estimatedCost: "AED 300",
        actualCost: "AED 280",
        completedDate: "2024-01-08",
        notes: "Routine maintenance completed successfully",
        photos: [],
        createdBy: "Scheduled Maintenance",
        createdDate: "2024-01-05",
        lastUpdated: "2024-01-08",
        tags: ["routine", "hvac", "completed"]
      },
      {
        id: 4,
        title: "Kitchen Appliance Repair",
        description: "Refrigerator not cooling properly, needs repair",
        propertyName: "City Center Apartments",
        propertyAddress: "Unit 302, City Center Apartments, Downtown",
        tenantName: "Ahmed Al-Mansouri",
        tenantEmail: "ahmed.mansouri@email.com",
        tenantPhone: "+971-50-456-7890",
        category: "Appliances",
        priority: "High",
        status: "Pending",
        requestedDate: "2024-01-20",
        assignedTechnician: null,
        technicianPhone: null,
        technicianEmail: null,
        estimatedCost: "AED 600",
        actualCost: null,
        completedDate: null,
        notes: "Tenant reports food spoilage issue",
        photos: [],
        createdBy: "Tenant Request",
        createdDate: "2024-01-20",
        lastUpdated: "2024-01-20",
        tags: ["appliances", "urgent", "kitchen"]
      }
    ]
  }
];

export const maintenanceCategories = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Appliances",
  "Windows & Doors",
  "Flooring",
  "Painting",
  "Roofing",
  "Landscaping",
  "Security Systems",
  "Cleaning",
  "General Repairs",
  "Pest Control",
  "Fire Safety"
];

export const maintenanceStatuses = [
  { value: "Pending", color: "yellow", bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
  { value: "Open", color: "red", bgColor: "bg-red-200", textColor: "text-red-700" },
  { value: "In Progress", color: "blue", bgColor: "bg-blue-100", textColor: "text-blue-700" },
  { value: "Completed", color: "green", bgColor: "bg-green-100", textColor: "text-green-700" },
  { value: "Cancelled", color: "gray", bgColor: "bg-gray-100", textColor: "text-gray-700" },
  { value: "On Hold", color: "purple", bgColor: "bg-purple-100", textColor: "text-purple-700" }
];

export const priorityLevels = [
  { value: "Low", color: "gray", bgColor: "bg-gray-100", textColor: "text-gray-700" },
  { value: "Medium", color: "yellow", bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
  { value: "High", color: "orange", bgColor: "bg-orange-100", textColor: "text-orange-700" },
  { value: "Critical", color: "red", bgColor: "bg-red-100", textColor: "text-red-700" }
];

export const techniciansList = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@maintenance.com",
    phone: "+971-55-987-6543",
    specialization: ["Plumbing", "General Repairs"],
    rating: 4.8,
    completedJobs: 156,
    availability: "Available"
  },
  {
    id: 2,
    name: "Mike Wilson",
    email: "mike.wilson@maintenance.com",
    phone: "+971-55-876-5432",
    specialization: ["Windows & Doors", "Security Systems"],
    rating: 4.9,
    completedJobs: 203,
    availability: "Available"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah.johnson@maintenance.com",
    phone: "+971-55-765-4321",
    specialization: ["HVAC", "Electrical"],
    rating: 4.7,
    completedJobs: 89,
    availability: "Busy"
  },
  {
    id: 4,
    name: "David Chen",
    email: "david.chen@maintenance.com",
    phone: "+971-55-654-3210",
    specialization: ["Appliances", "Electrical"],
    rating: 4.6,
    completedJobs: 134,
    availability: "Available"
  }
];
