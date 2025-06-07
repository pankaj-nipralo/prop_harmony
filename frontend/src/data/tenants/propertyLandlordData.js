// Property Landlord Report Data
export const reportData = {
  importantNotice: {
    title: "Important Notice",
    message: "This form is for reporting serious issues with your landlord. All reports are reviewed by our moderation team. False or malicious reports may result in account suspension. Please ensure all information is accurate and truthful."
  }
};

export const issueCategories = [
  { value: "", label: "Select issue category" },
  { value: "maintenance", label: "Maintenance Issues" },
  { value: "harassment", label: "Harassment" },
  { value: "illegal_entry", label: "Illegal Entry" },
  { value: "deposit_issues", label: "Security Deposit Issues" },
  { value: "rent_disputes", label: "Rent Disputes" },
  { value: "safety_concerns", label: "Safety Concerns" },
  { value: "discrimination", label: "Discrimination" },
  { value: "lease_violations", label: "Lease Violations" },
  { value: "other", label: "Other" }
];

export const priorityLevels = [
  { value: "", label: "Select priority level" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" }
];

export const helpData = {
  title: "Need Help?",
  faqs: [
    {
      id: 1,
      question: "What happens after I submit a report?",
      answer: "Our moderation team will review your complaint within 48 hours. We may contact you for additional information if needed."
    },
    {
      id: 2,
      question: "What evidence should I include?",
      answer: "Include any relevant photos, documents, emails, or other evidence that supports your complaint. This helps us investigate more effectively."
    },
    {
      id: 3,
      question: "Is my report confidential?",
      answer: "Yes, all reports are treated confidentially. Only authorized personnel will have access to your complaint details."
    },
    {
      id: 4,
      question: "Emergency situations:",
      answer: "If you're facing an emergency or immediate threat, please contact local authorities first before submitting a report."
    }
  ]
};
