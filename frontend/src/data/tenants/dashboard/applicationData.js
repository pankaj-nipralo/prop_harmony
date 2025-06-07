// Property Applications Data
export const applications = [
  {
    id: 1,
    name: "Marina Heights",
    address: "555 Harbor View, Dubai Marina",
    rent: "AED 2,500/month",
    status: "Pending Review",
    appliedDate: "1/20/2025",
    statusColor: "bg-yellow-100 text-yellow-800"
  },
  {
    id: 2,
    name: "City Center Apartments", 
    address: "123 Downtown Blvd, Business Bay",
    rent: "AED 2,200/month",
    status: "Counter Offer",
    appliedDate: "1/18/2025",
    statusColor: "bg-blue-100 text-blue-800",
    counterOffer: "AED 2,000"
  },
  {
    id: 3,
    name: "Skyline Towers",
    address: "789 Sheikh Zayed Road, DIFC", 
    rent: "AED 3,000/month",
    status: "In Negotiation",
    appliedDate: "1/15/2025",
    statusColor: "bg-purple-100 text-purple-800"
  },
  {
    id: 4,
    name: "Palm Residences",
    address: "456 Palm Jumeirah, Dubai",
    rent: "AED 4,500/month", 
    status: "Approved",
    appliedDate: "1/10/2025",
    statusColor: "bg-green-100 text-green-800"
  }
];

export const applicationFilters = [
  "All Applications",
  "Pending",
  "Approved", 
  "Rejected"
];
