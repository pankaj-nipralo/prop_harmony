export const emailsData = [
  {
    id: 1,
    emailsList: [
      {
        id: 1,
        threadId: "thread_001",
        subject: "Maintenance Request - Leaky Faucet",
        from: {
          name: "Ahmed Al-Mansouri",
          email: "ahmed.mansouri@email.com",
          type: "tenant",
        },
        to: [
          {
            name: "Property Manager",
            email: "manager@propertyharmony.com",
            type: "landlord",
          },
        ],
        cc: [],
        bcc: [],
        body: "Hi, I have a leaky faucet in the kitchen that needs to be fixed. It has been dripping for the past week and is getting worse. Could you please arrange for a plumber to come and fix it? I'm available most weekdays after 5 PM and weekends. Thank you.",
        htmlBody:
          "<p>Hi,</p><p>I have a leaky faucet in the kitchen that needs to be fixed. It has been dripping for the past week and is getting worse.</p><p>Could you please arrange for a plumber to come and fix it? I'm available most weekdays after 5 PM and weekends.</p><p>Thank you.</p>",
        date: "2024-12-15T10:30:00Z",
        isRead: false,
        isStarred: true,
        isImportant: true,
        folder: "inbox",
        labels: ["maintenance", "urgent"],
        attachments: [
          {
            id: 1,
            name: "faucet_photo.jpg",
            size: 245760,
            type: "image/jpeg",
            url: "/attachments/faucet_photo.jpg",
          },
        ],
        propertyId: 1,
        propertyName: "Marina View Villa",
        category: "maintenance",
        priority: "high",
        status: "unread",
        replyCount: 0,
        lastReplyDate: null,
      },
      {
        id: 2,
        threadId: "thread_002",
        subject: "Monthly Rent Payment Confirmation",
        from: {
          name: "Property Manager",
          email: "manager@propertyharmony.com",
          type: "landlord",
        },
        to: [
          {
            name: "Sarah Johnson",
            email: "sarah.johnson@email.com",
            type: "tenant",
          },
        ],
        cc: [],
        bcc: [],
        body: "Dear Sarah,\n\nThis is to confirm that we have received your rent payment of AED 8,500 for December 2024. The payment was processed on December 1st, 2024.\n\nThank you for your prompt payment.\n\nBest regards,\nProperty Management Team",
        htmlBody:
          "<p>Dear Sarah,</p><p>This is to confirm that we have received your rent payment of <strong>AED 8,500</strong> for December 2024. The payment was processed on December 1st, 2024.</p><p>Thank you for your prompt payment.</p><p>Best regards,<br>Property Management Team</p>",
        date: "2024-12-01T14:15:00Z",
        isRead: true,
        isStarred: false,
        isImportant: false,
        folder: "sent",
        labels: ["payment", "confirmation"],
        attachments: [
          {
            id: 2,
            name: "payment_receipt.pdf",
            size: 156789,
            type: "application/pdf",
            url: "/attachments/payment_receipt.pdf",
          },
        ],
        propertyId: 2,
        propertyName: "Sunset Apartments",
        category: "payment",
        priority: "normal",
        status: "sent",
        replyCount: 1,
        lastReplyDate: "2024-12-01T16:30:00Z",
      },
      {
        id: 3,
        threadId: "thread_003",
        subject: "Lease Renewal Discussion",
        from: {
          name: "Michael Chen",
          email: "michael.chen@email.com",
          type: "tenant",
        },
        to: [
          {
            name: "Property Manager",
            email: "manager@propertyharmony.com",
            type: "landlord",
          },
        ],
        cc: [],
        bcc: [],
        body: "Hello,\n\nI hope this email finds you well. My current lease is set to expire in March 2025, and I would like to discuss the possibility of renewal.\n\nI have been very happy with the property and would like to continue living here. Could we schedule a meeting to discuss the terms for renewal?\n\nI'm flexible with timing and can meet at your convenience.\n\nBest regards,\nMichael Chen",
        htmlBody:
          "<p>Hello,</p><p>I hope this email finds you well. My current lease is set to expire in March 2025, and I would like to discuss the possibility of renewal.</p><p>I have been very happy with the property and would like to continue living here. Could we schedule a meeting to discuss the terms for renewal?</p><p>I'm flexible with timing and can meet at your convenience.</p><p>Best regards,<br>Michael Chen</p>",
        date: "2024-12-10T09:45:00Z",
        isRead: true,
        isStarred: false,
        isImportant: true,
        folder: "inbox",
        labels: ["lease", "renewal"],
        attachments: [],
        propertyId: 3,
        propertyName: "Downtown Loft",
        category: "lease",
        priority: "normal",
        status: "read",
        replyCount: 2,
        lastReplyDate: "2024-12-11T11:20:00Z",
      },
      {
        id: 4,
        threadId: "thread_004",
        subject: "Property Inspection Scheduled",
        from: {
          name: "Property Manager",
          email: "manager@propertyharmony.com",
          type: "landlord",
        },
        to: [
          {
            name: "Emma Wilson",
            email: "emma.wilson@email.com",
            type: "tenant",
          },
        ],
        cc: [],
        bcc: [],
        body: "Dear Emma,\n\nThis is to inform you that a routine property inspection has been scheduled for your unit at Downtown Loft.\n\nInspection Details:\n- Date: December 20, 2024\n- Time: 2:00 PM - 4:00 PM\n- Inspector: Mike Wilson\n- Contact: +971-55-987-6543\n\nPlease ensure someone is available during this time. If you have any concerns or need to reschedule, please contact us at least 24 hours in advance.\n\nThank you for your cooperation.\n\nBest regards,\nProperty Management Team",
        htmlBody:
          "<p>Dear Emma,</p><p>This is to inform you that a routine property inspection has been scheduled for your unit at Downtown Loft.</p><h4>Inspection Details:</h4><ul><li><strong>Date:</strong> December 20, 2024</li><li><strong>Time:</strong> 2:00 PM - 4:00 PM</li><li><strong>Inspector:</strong> Mike Wilson</li><li><strong>Contact:</strong> +971-55-987-6543</li></ul><p>Please ensure someone is available during this time. If you have any concerns or need to reschedule, please contact us at least 24 hours in advance.</p><p>Thank you for your cooperation.</p><p>Best regards,<br>Property Management Team</p>",
        date: "2024-12-12T11:00:00Z",
        isRead: true,
        isStarred: false,
        isImportant: false,
        folder: "sent",
        labels: ["inspection", "scheduled"],
        attachments: [],
        propertyId: 3,
        propertyName: "Downtown Loft",
        category: "inspection",
        priority: "normal",
        status: "sent",
        replyCount: 0,
        lastReplyDate: null,
      },
      {
        id: 5,
        threadId: "thread_005",
        subject: "Noise Complaint - Unit 205",
        from: {
          name: "David Rodriguez",
          email: "david.rodriguez@email.com",
          type: "tenant",
        },
        to: [
          {
            name: "Property Manager",
            email: "manager@propertyharmony.com",
            type: "landlord",
          },
        ],
        cc: [],
        bcc: [],
        body: "Dear Property Management,\n\nI am writing to file a formal complaint about excessive noise coming from Unit 205 in Sunset Apartments.\n\nThe noise issues include:\n- Loud music playing late at night (after 11 PM)\n- Heavy footsteps and furniture moving\n- Frequent parties on weekends\n\nThis has been ongoing for the past two weeks and is affecting my sleep and work. I have tried speaking with the tenant directly, but the issue persists.\n\nCould you please address this matter urgently?\n\nThank you,\nDavid Rodriguez\nUnit 203",
        htmlBody:
          "<p>Dear Property Management,</p><p>I am writing to file a formal complaint about excessive noise coming from Unit 205 in Sunset Apartments.</p><h4>The noise issues include:</h4><ul><li>Loud music playing late at night (after 11 PM)</li><li>Heavy footsteps and furniture moving</li><li>Frequent parties on weekends</li></ul><p>This has been ongoing for the past two weeks and is affecting my sleep and work. I have tried speaking with the tenant directly, but the issue persists.</p><p>Could you please address this matter urgently?</p><p>Thank you,<br>David Rodriguez<br>Unit 203</p>",
        date: "2024-12-08T16:20:00Z",
        isRead: false,
        isStarred: true,
        isImportant: true,
        folder: "inbox",
        labels: ["complaint", "noise", "urgent"],
        attachments: [],
        propertyId: 2,
        propertyName: "Sunset Apartments",
        category: "complaint",
        priority: "high",
        status: "unread",
        replyCount: 1,
        lastReplyDate: "2024-12-09T10:15:00Z",
      },
      {
        id: 6,
        threadId: "thread_006",
        subject: "Rent Payment Reminder - Sunset Apartments",
        from: {
          name: "Property Manager",
          email: "manager@propertyharmony.com",
          type: "landlord",
        },
        to: [
          {
            name: "Pankaj Gupta",
            email: "pankajgupta1063@email.com",
            type: "tenant",
          },
        ],
        cc: [],
        bcc: [],
        body: "Dear Pankaj Gupta,\n\nThis is a friendly reminder that your rent payment of AED 8,500 for January 2025 is due on January 1st, 2025.\n\nPlease ensure payment is made by the due date to avoid any late fees.\n\nThank you for your prompt attention to this matter.\n\nBest regards,\nProperty Management Team",
        htmlBody:
          "<p>Dear Pankaj Gupta,</p><p>This is a friendly reminder that your rent payment of <strong>AED 8,500</strong> for January 2025 is due on January 1st, 2025.</p><p>Please ensure payment is made by the due date to avoid any late fees.</p><p>Thank you for your prompt attention to this matter.</p><p>Best regards,<br>Property Management Team</p>",
        date: "2024-12-16T09:00:00Z",
        isRead: false,
        isStarred: false,
        isImportant: false,
        folder: "sent",
        labels: ["payment", "reminder"],
        attachments: [],
        propertyId: 2,
        propertyName: "Sunset Apartments",
        category: "payment",
        priority: "normal",
        status: "sent",
        replyCount: 0,
        lastReplyDate: null,
      },
    ],
  },
];

// Email folders/categories
export const emailFolders = [
  { id: "inbox", name: "Inbox", icon: "Inbox", count: 0 },
  { id: "sent", name: "Sent", icon: "Send", count: 0 },
  { id: "drafts", name: "Drafts", icon: "FileText", count: 0 },
  { id: "starred", name: "Starred", icon: "Star", count: 0 },
  { id: "important", name: "Important", icon: "Flag", count: 0 },
  { id: "trash", name: "Trash", icon: "Trash2", count: 0 },
];

// Email categories
export const emailCategories = [
  { value: "all", label: "All Categories" },
  { value: "maintenance", label: "Maintenance" },
  { value: "payment", label: "Payment" },
  { value: "lease", label: "Lease" },
  { value: "inspection", label: "Inspection" },
  { value: "complaint", label: "Complaint" },
  { value: "general", label: "General" },
];

// Email priority levels
export const priorityLevels = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High Priority" },
  { value: "normal", label: "Normal Priority" },
  { value: "low", label: "Low Priority" },
];

// Email templates for common landlord communications
export const emailTemplates = [
  {
    id: 1,
    name: "Rent Reminder",
    subject: "Rent Payment Reminder - {{propertyName}}",
    body: "Dear {{tenantName}},\n\nThis is a friendly reminder that your rent payment of {{amount}} for {{month}} is due on {{dueDate}}.\n\nPlease ensure payment is made by the due date to avoid any late fees.\n\nThank you for your prompt attention to this matter.\n\nBest regards,\nProperty Management Team",
    category: "payment",
  },
  {
    id: 2,
    name: "Maintenance Acknowledgment",
    subject: "Re: Maintenance Request - {{issueType}}",
    body: "Dear {{tenantName}},\n\nThank you for reporting the {{issueType}} in your unit. We have received your request and will arrange for a technician to address this issue.\n\nExpected resolution timeframe: {{timeframe}}\nTechnician contact: {{technicianContact}}\n\nWe will keep you updated on the progress.\n\nBest regards,\nProperty Management Team",
    category: "maintenance",
  },
  {
    id: 3,
    name: "Lease Renewal Offer",
    subject: "Lease Renewal Opportunity - {{propertyName}}",
    body: "Dear {{tenantName}},\n\nWe hope you have been enjoying your stay at {{propertyName}}. Your current lease is set to expire on {{expiryDate}}.\n\nWe would like to offer you the opportunity to renew your lease for another term. Please let us know if you are interested, and we can discuss the terms.\n\nWe value you as a tenant and hope to continue our positive relationship.\n\nBest regards,\nProperty Management Team",
    category: "lease",
  },
  {
    id: 4,
    name: "Property Inspection Notice",
    subject: "Property Inspection Notice - {{propertyName}}",
    body: "Dear {{tenantName}},\n\nThis is to inform you that a routine property inspection has been scheduled for your unit.\n\nInspection Details:\n- Date: {{inspectionDate}}\n- Time: {{inspectionTime}}\n- Inspector: {{inspectorName}}\n\nPlease ensure someone is available during this time. If you need to reschedule, please contact us at least 24 hours in advance.\n\nThank you for your cooperation.\n\nBest regards,\nProperty Management Team",
    category: "inspection",
  },
];

// Utility functions
export const getEmailsByFolder = (emails, folder) => {
  if (!emails) return [];

  switch (folder) {
    case "inbox":
      return emails.filter((email) => email.folder === "inbox");
    case "sent":
      return emails.filter((email) => email.folder === "sent");
    case "drafts":
      return emails.filter((email) => email.folder === "drafts");
    case "starred":
      return emails.filter((email) => email.isStarred);
    case "important":
      return emails.filter((email) => email.isImportant);
    case "trash":
      return emails.filter((email) => email.folder === "trash");
    default:
      return emails;
  }
};

export const getUnreadCount = (emails) => {
  if (!emails) return 0;
  return emails.filter((email) => !email.isRead && email.folder === "inbox")
    .length;
};

export const updateFolderCounts = (emails) => {
  if (!emails) return emailFolders;

  return emailFolders.map((folder) => ({
    ...folder,
    count: getEmailsByFolder(emails, folder.id).length,
  }));
};

export const searchEmails = (emails, searchTerm) => {
  if (!searchTerm || !emails) return emails;

  const term = searchTerm.toLowerCase();
  return emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(term) ||
      email.body.toLowerCase().includes(term) ||
      email.from.name.toLowerCase().includes(term) ||
      email.from.email.toLowerCase().includes(term) ||
      email.propertyName.toLowerCase().includes(term) ||
      email.labels.some((label) => label.toLowerCase().includes(term))
  );
};

export const filterEmails = (emails, filters) => {
  if (!emails) return [];

  return emails.filter((email) => {
    // Category filter
    if (
      filters.category &&
      filters.category !== "all" &&
      email.category !== filters.category
    ) {
      return false;
    }

    // Priority filter
    if (
      filters.priority &&
      filters.priority !== "all" &&
      email.priority !== filters.priority
    ) {
      return false;
    }

    // Property filter
    if (
      filters.property &&
      filters.property !== "all" &&
      email.propertyName !== filters.property
    ) {
      return false;
    }

    // Date range filter
    if (filters.dateFrom && new Date(email.date) < new Date(filters.dateFrom)) {
      return false;
    }

    if (filters.dateTo && new Date(email.date) > new Date(filters.dateTo)) {
      return false;
    }

    // Read status filter
    if (filters.readStatus === "unread" && email.isRead) {
      return false;
    }

    if (filters.readStatus === "read" && !email.isRead) {
      return false;
    }

    return true;
  });
};

export const formatEmailDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Today";
  } else if (diffDays === 2) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return `${diffDays - 1} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Template processing function
export const processEmailTemplate = (template, data) => {
  let processed = template;

  // Replace template variables with actual data
  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    processed = processed.replace(regex, data[key] || `{{${key}}}`);
  });

  return processed;
};

// Get template data for a tenant/property
export const getTemplateData = (tenant, property) => {
  const currentDate = new Date();
  const nextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );

  return {
    tenantName: tenant?.name || "Tenant",
    propertyName: property?.name || "Property",
    amount: tenant?.rent || "AED 8,500",
    month: nextMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    dueDate: nextMonth.toLocaleDateString(),
    issueType: "maintenance issue",
    timeframe: "2-3 business days",
    technicianContact: "+971-55-987-6543",
    expiryDate: "March 31, 2025",
    inspectionDate: "December 20, 2024",
    inspectionTime: "2:00 PM - 4:00 PM",
    inspectorName: "Mike Wilson",
  };
};
