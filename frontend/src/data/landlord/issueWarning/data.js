export const warningData = [
  {
    id: 101,
    warningsList: [
      {
        id: 1,
        recipientType: "tenant", // tenant, property_manager, contractor
        recipientId: 12,
        recipientName: "Ahmed Al-Mansouri",
        recipientEmail: "ahmed.mansouri@email.com",
        recipientPhone: "+971-50-123-4567",
        property: "Apt 302, Marina District",
        warningType: "Noise Complaint",
        severity: "Medium", // Low, Medium, High, Critical
        subject: "Noise",
        description: "You are loud",
        issueDate: "2024-12-15",
        dueDate: "2024-12-22",
        status: "Pending", // Pending, Acknowledged, Resolved, Escalated, Overdue
        createdBy: "Property Manager",
        createdById: 1,
        acknowledgmentDate: null,
        resolutionDate: null,
        resolutionNotes: "",
        escalationLevel: 0,
        isTemplate: false,
        tags: ["noise", "complaint"],
        attachments: [],
        communicationHistory: [
          {
            id: 1,
            type: "warning_sent",
            date: "2024-12-15",
            message: "Warning sent to tenant",
            sentBy: "System",
          },
        ],
      },
      {
        id: 2,
        recipientType: "tenant",
        recipientId: 13,
        recipientName: "Pankaj Gupta",
        recipientEmail: "pankaj.gupta@email.com",
        recipientPhone: "+971-50-987-6543",
        property: "Sunset Apartments Unit 101",
        warningType: "Lease Violation",
        severity: "High",
        subject: "Unauthorized Pet",
        description:
          "Keeping pets without permission violates lease agreement clause 4.2",
        issueDate: "2024-12-10",
        dueDate: "2024-12-17",
        status: "Acknowledged",
        createdBy: "Property Manager",
        createdById: 1,
        acknowledgmentDate: "2024-12-12",
        resolutionDate: null,
        resolutionNotes: "",
        escalationLevel: 0,
        isTemplate: false,
        tags: ["lease", "violation", "pets"],
        attachments: [],
        communicationHistory: [
          {
            id: 1,
            type: "warning_sent",
            date: "2024-12-10",
            message: "Warning sent to tenant",
            sentBy: "System",
          },
          {
            id: 2,
            type: "acknowledged",
            date: "2024-12-12",
            message: "Warning acknowledged by tenant",
            sentBy: "Pankaj Gupta",
          },
        ],
      },
      {
        id: 3,
        recipientType: "tenant",
        recipientId: 12,
        recipientName: "Ahmed Al-Mansouri",
        recipientEmail: "ahmed.mansouri@email.com",
        recipientPhone: "+971-50-123-4567",
        property: "Apt 302, Marina District",
        warningType: "Payment Issue",
        severity: "Critical",
        subject: "Late Rent Payment",
        description:
          "Rent payment is 15 days overdue. Immediate action required.",
        issueDate: "2024-12-01",
        dueDate: "2024-12-08",
        status: "Escalated",
        createdBy: "Property Manager",
        createdById: 1,
        acknowledgmentDate: "2024-12-03",
        resolutionDate: null,
        resolutionNotes: "",
        escalationLevel: 2,
        isTemplate: false,
        tags: ["payment", "overdue", "critical"],
        attachments: [],
        communicationHistory: [
          {
            id: 1,
            type: "warning_sent",
            date: "2024-12-01",
            message: "Warning sent to tenant",
            sentBy: "System",
          },
          {
            id: 2,
            type: "acknowledged",
            date: "2024-12-03",
            message: "Warning acknowledged by tenant",
            sentBy: "Ahmed Al-Mansouri",
          },
          {
            id: 3,
            type: "escalated",
            date: "2024-12-08",
            message: "Warning escalated due to no resolution",
            sentBy: "System",
          },
        ],
      },
    ],
  },
];

export const warningTypes = [
  "Noise Complaint",
  "Lease Violation",
  "Payment Issue",
  "Property Damage",
  "Unauthorized Modifications",
  "Parking Violation",
  "Maintenance Access",
  "Subletting Violation",
  "Cleanliness Issue",
  "Safety Violation",
  "Other",
];

export const severityLevels = [
  {
    value: "Low",
    color: "yellow",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
  },
  {
    value: "Medium",
    color: "orange",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
  },
  {
    value: "High",
    color: "red",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
  },
  {
    value: "Critical",
    color: "red",
    bgColor: "bg-red-200",
    textColor: "text-red-800",
  },
];

export const warningStatuses = [
  {
    value: "Pending",
    color: "gray",
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
  },
  {
    value: "Acknowledged",
    color: "blue",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  {
    value: "Resolved",
    color: "green",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
  },
  {
    value: "Escalated",
    color: "red",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
  },
  {
    value: "Overdue",
    color: "red",
    bgColor: "bg-red-200",
    textColor: "text-red-800",
  },
];

export const warningTemplates = [
  {
    id: 1,
    name: "Noise Complaint Template",
    warningType: "Noise Complaint",
    severity: "Medium",
    subject: "Noise Complaint",
    description:
      "We have received complaints about excessive noise from your unit. Please be mindful of noise levels, especially during quiet hours (10 PM - 8 AM).",
  },
  {
    id: 2,
    name: "Late Payment Template",
    warningType: "Payment Issue",
    severity: "High",
    subject: "Late Rent Payment",
    description:
      "Your rent payment is overdue. Please make payment immediately to avoid further action.",
  },
  {
    id: 3,
    name: "Lease Violation Template",
    warningType: "Lease Violation",
    severity: "High",
    subject: "Lease Agreement Violation",
    description:
      "You are in violation of your lease agreement. Please review the terms and take corrective action immediately.",
  },
];
