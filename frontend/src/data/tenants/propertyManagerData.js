// Property Manager Data
export const managerData = {
  name: "John Manager",
  title: "Property Manager",
  rating: 4.6,
  totalRating: 5.0,
  email: "john.manager@propharmony.com",
  phone: "+971-50-987-6543",
  avgResponse: "2 hours",
  managingProperties: 15,
  availability: {
    schedule: "Mon-Fri 9AM-6PM",
    emergencySupport: "Emergency support available 24/7"
  },
  languages: ["English", "Arabic"],
  contactOptions: [
    { type: "call", label: "Call", icon: "Phone", phoneNo: "+971-50-987-6543" },
    { type: "email", label: "Email", icon: "Mail", emailId: "john.manager@propharmony.com" },
    // { type: "message", label: "Message", icon: "MessageCircle" }
  ]
};

export const responsibilitiesData = {
  leftColumn: [
    { id: 1, text: "Property maintenance coordination", completed: true },
    { id: 2, text: "Emergency response (24/7)", completed: true },
    { id: 3, text: "Monthly property inspections", completed: true },
    { id: 4, text: "Rent collection assistance", completed: true }
  ],
  rightColumn: [
    { id: 5, text: "Tenant communication and support", completed: true },
    { id: 6, text: "Lease documentation", completed: true },
    { id: 7, text: "Vendor management", completed: true }
  ]
};

export const activitiesData = [
  {
    id: 1,
    title: "Scheduled AC repair for unit 4B",
    date: "2024-01-20",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
    icon: "AlertTriangle"
  },
  {
    id: 2,
    title: "Quarterly property inspection",
    date: "2024-01-18",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
    icon: "CheckCircle"
  },
  {
    id: 3,
    title: "Responded to tenant inquiry",
    date: "2024-01-17",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
    icon: "MessageCircle"
  }
];

export const emergencyData = {
  title: "24/7 Emergency Support",
  description: "For urgent maintenance issues or emergencies, contact the property manager immediately.",
  phone: "+971-50-987-6543",
  buttonText: "Emergency Call: +971-50-987-6543"
};
