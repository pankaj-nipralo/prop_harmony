export const expensesData = [
  {
    id: 1,
    expensesList: [
      {
        id: 1,
        expenseId: "EXP-2024-001",
        amount: 1200,
        category: "maintenance",
        title: "AC Repair and Service",
        description: "Annual AC maintenance for Marina View Villa",
        propertyId: 1,
        propertyName: "Marina View Villa",
        propertyAddress: "123 Marina Street, Dubai Marina",
        vendor: "Cool Air Services",
        vendorContact: "+971 50 123 4567",
        paymentMethod: "bank_transfer",
        status: "paid",
        dueDate: "2024-12-15T00:00:00Z",
        paidDate: "2024-12-10T09:30:00Z",
        transactionId: "ETXN-20241210-001",
        receiptUrl: "/receipts/EXP-2024-001.pdf",
        notes: "Annual maintenance contract",
        createdAt: "2024-12-01T08:00:00Z",
        updatedAt: "2024-12-10T09:30:00Z",
      },
      {
        id: 2,
        expenseId: "EXP-2024-002",
        amount: 2500,
        category: "utilities",
        title: "DEWA Bill - Q4 2024",
        description: "Electricity and water charges for Sunset Apartments",
        propertyId: 2,
        propertyName: "Sunset Apartments",
        propertyAddress: "456 Oak Avenue, Apt 2A",
        vendor: "DEWA",
        vendorContact: "04 601 9999",
        paymentMethod: "auto_debit",
        status: "pending",
        dueDate: "2024-12-20T00:00:00Z",
        paidDate: null,
        transactionId: null,
        receiptUrl: null,
        notes: "Quarterly utility payment",
        createdAt: "2024-12-05T10:00:00Z",
        updatedAt: "2024-12-05T10:00:00Z",
      },
      {
        id: 3,
        expenseId: "EXP-2024-003",
        amount: 5000,
        category: "renovation",
        title: "Kitchen Renovation",
        description: "Kitchen cabinet replacement and painting",
        propertyId: 3,
        propertyName: "Downtown Loft",
        propertyAddress: "789 Pine Road, Apt 7C",
        vendor: "Modern Interiors LLC",
        vendorContact: "+971 55 987 6543",
        paymentMethod: "bank_transfer",
        status: "overdue",
        dueDate: "2024-11-30T00:00:00Z",
        paidDate: null,
        transactionId: null,
        receiptUrl: null,
        notes: "Payment pending contractor completion",
        createdAt: "2024-11-15T14:00:00Z",
        updatedAt: "2024-12-01T09:00:00Z",
      },
      {
        id: 4,
        expenseId: "EXP-2024-004",
        amount: 800,
        category: "insurance",
        title: "Property Insurance Premium",
        description: "Annual property insurance renewal",
        propertyId: 1,
        propertyName: "Marina View Villa",
        propertyAddress: "123 Marina Street, Dubai Marina",
        vendor: "Secure Insurance Co.",
        vendorContact: "04 123 4567",
        paymentMethod: "credit_card",
        status: "paid",
        dueDate: "2024-12-05T00:00:00Z",
        paidDate: "2024-12-03T11:15:00Z",
        transactionId: "ETXN-20241203-002",
        receiptUrl: "/receipts/EXP-2024-004.pdf",
        notes: "Annual premium payment",
        createdAt: "2024-11-25T09:00:00Z",
        updatedAt: "2024-12-03T11:15:00Z",
      },
      {
        id: 5,
        expenseId: "EXP-2024-005",
        amount: 1500,
        category: "maintenance",
        title: "Plumbing Repairs",
        description: "Emergency plumbing repairs in bathroom",
        propertyId: 2,
        propertyName: "Sunset Apartments",
        propertyAddress: "456 Oak Avenue, Apt 2A",
        vendor: "Quick Fix Plumbing",
        vendorContact: "+971 54 765 4321",
        paymentMethod: "cash",
        status: "processing",
        dueDate: "2024-12-18T00:00:00Z",
        paidDate: null,
        transactionId: null,
        receiptUrl: null,
        notes: "Emergency repair work",
        createdAt: "2024-12-12T16:00:00Z",
        updatedAt: "2024-12-12T16:00:00Z",
      },
    ],
    expenseCategories: [
      "maintenance",
      "utilities",
      "renovation",
      "insurance",
      "taxes",
      "cleaning",
      "pest_control",
      "landscaping",
      "security",
      "other",
    ],
    paymentMethods: [
      "cash",
      "credit_card",
      "bank_transfer",
      "auto_debit",
      "cheque",
    ],
    statuses: ["pending", "processing", "paid", "overdue", "cancelled"],
  },
];

export const formatExpenseDate = (date) => {
  if (!date) return "Not available";
  return new Date(date).toLocaleDateString("en-AE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getExpenseStatusColor = (status) => {
  const colors = {
    paid: "text-green-600",
    pending: "text-yellow-600",
    processing: "text-blue-600",
    overdue: "text-red-600",
    cancelled: "text-gray-600",
  };
  return colors[status] || "text-gray-600";
};

export const calculateExpenseStats = (expenses) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return {
    totalExpenses: expenses.reduce((sum, exp) => sum + exp.amount, 0),
    paidExpenses: expenses
      .filter((exp) => exp.status === "paid")
      .reduce((sum, exp) => sum + exp.amount, 0),
    pendingExpenses: expenses
      .filter((exp) => exp.status === "pending" || exp.status === "processing")
      .reduce((sum, exp) => sum + exp.amount, 0),
    overdueExpenses: expenses
      .filter((exp) => exp.status === "overdue")
      .reduce((sum, exp) => sum + exp.amount, 0),
    monthlyExpenses: expenses
      .filter((exp) => {
        const expDate = new Date(exp.createdAt);
        return (
          expDate.getMonth() === currentMonth &&
          expDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, exp) => sum + exp.amount, 0),
  };
};
