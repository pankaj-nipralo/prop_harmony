// Property Inspections Data
export const inspections = [
  {
    id: 1,
    type: "Move-in Inspection",
    property: "Oakwood Apartments - Apt 4B",
    date: "February 5, 2025",
    time: "10:00 AM",
    inspector: "John Smith",
    status: "Pending Response",
    statusColor: "bg-yellow-100 text-yellow-800"
  },
  {
    id: 2,
    type: "Quarterly Inspection", 
    property: "Oakwood Apartments - Apt 4B",
    date: "February 15, 2025",
    time: "2:00 PM",
    inspector: "Sarah Johnson",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800"
  },
  {
    id: 3,
    type: "Maintenance Follow-up",
    property: "Oakwood Apartments - Apt 4B", 
    date: "January 25, 2025",
    time: "11:00 AM",
    inspector: "Mike Wilson",
    status: "Completed",
    statusColor: "bg-gray-100 text-gray-800"
  }
];

export const inspectionTableHeaders = [
  "Type",
  "Property", 
  "Proposed Date & Time",
  "Inspector",
  "Status",
  "Actions"
];
