// My Offers Sample Data
export const offersApplications = [
  {
    id: 1,
    property: "Luxury Downtown Apartment",
    address: "123 Main St, Downtown",
    offerAmount: "$2500/month",
    originalAmount: "$2800",
    status: "Counter Offer",
    statusColor: "bg-orange-100 text-orange-800",
    appliedDate: "2024-01-15",
    messages: 3,
    actions: ["Accept", "Reject"]
  },
  {
    id: 2,
    property: "Modern Studio",
    address: "456 Oak Ave, Midtown",
    offerAmount: "$1800/month",
    originalAmount: null,
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
    appliedDate: "2024-01-10",
    messages: 1,
    actions: ["View"]
  },
  {
    id: 3,
    property: "Spacious Family Home",
    address: "789 Pine St, Suburbs",
    offerAmount: "$3200/month",
    originalAmount: "$3500",
    status: "In Negotiation",
    statusColor: "bg-blue-100 text-blue-800",
    appliedDate: "2024-01-20",
    messages: 5,
    actions: ["View Details"]
  },
  {
    id: 4,
    property: "Cozy Bedroom Apartment",
    address: "321 Elm St, Uptown",
    offerAmount: "$2200/month",
    originalAmount: null,
    status: "Rejected",
    statusColor: "bg-red-100 text-red-800",
    appliedDate: "2024-01-05",
    messages: 2,
    actions: ["View"]
  }
];

export const statusConfigurations = {
  'Applied': {
    icon: 'Clock',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 text-blue-800'
  },
  'Counter Offer': {
    icon: 'MessageSquare',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 text-orange-800'
  },
  'In Negotiation': {
    icon: 'MessageSquare',
    color: 'text-orange-500',
    bgColor: 'bg-blue-100 text-blue-800'
  },
  'Approved': {
    icon: 'CheckCircle',
    color: 'text-green-500',
    bgColor: 'bg-green-100 text-green-800'
  },
  'Rejected': {
    icon: 'XCircle',
    color: 'text-red-500',
    bgColor: 'bg-red-100 text-red-800'
  }
};

export const tableHeaders = [
  "Property",
  "Offer Amount", 
  "Status",
  "Applied Date",
  "Messages",
  "Actions"
];
