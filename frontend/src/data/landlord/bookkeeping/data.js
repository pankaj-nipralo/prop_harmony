export const bookkeepingData = [
  {
    id: 1,
    transactionsList: [
      {
        id: 1,
        date: "2024-06-05",
        propertyName: "Marina View Villa",
        propertyAddress: "Unit 1502, Marina View Apartments, Dubai Marina",
        description: "Monthly rent payment",
        category: "Rent Income",
        amount: 8500,
        type: "Income",
        paymentMethod: "Bank Transfer",
        receiptNumber: "REC-2024-001",
        tenantName: "John Doe",
        notes: "Regular monthly rent collection",
        createdBy: "Property Manager",
        createdDate: "2024-06-05",
        lastUpdated: "2024-06-05",
        tags: ["rent", "income", "monthly"]
      },
      {
        id: 2,
        date: "2024-06-10",
        propertyName: "Sunset Apartments",
        propertyAddress: "Unit 101, Sunset Apartments, Dubai Marina",
        description: "Plumbing repair - kitchen faucet",
        category: "Maintenance Costs",
        amount: 450,
        type: "Expense",
        paymentMethod: "Cash",
        receiptNumber: "INV-2024-002",
        vendorName: "Dubai Plumbing Services",
        notes: "Emergency repair for leaking faucet",
        createdBy: "Property Manager",
        createdDate: "2024-06-10",
        lastUpdated: "2024-06-10",
        tags: ["maintenance", "expense", "plumbing"]
      },
      {
        id: 3,
        date: "2024-06-15",
        propertyName: "Oak Grove Condos",
        propertyAddress: "Unit 205, Oak Grove Condos, Business Bay",
        description: "Security deposit refund",
        category: "Security Deposits",
        amount: 2000,
        type: "Expense",
        paymentMethod: "Bank Transfer",
        receiptNumber: "REF-2024-003",
        tenantName: "Jane Smith",
        notes: "Full security deposit refund after move-out inspection",
        createdBy: "Property Manager",
        createdDate: "2024-06-15",
        lastUpdated: "2024-06-15",
        tags: ["deposit", "refund", "expense"]
      },
      {
        id: 4,
        date: "2024-06-20",
        propertyName: "City Center Apartments",
        propertyAddress: "Unit 302, City Center Apartments, Downtown",
        description: "Electricity bill - June 2024",
        category: "Utilities",
        amount: 320,
        type: "Expense",
        paymentMethod: "Online Payment",
        receiptNumber: "DEWA-2024-004",
        vendorName: "DEWA",
        notes: "Monthly electricity consumption",
        createdBy: "Property Manager",
        createdDate: "2024-06-20",
        lastUpdated: "2024-06-20",
        tags: ["utilities", "electricity", "monthly"]
      },
      {
        id: 5,
        date: "2024-06-25",
        propertyName: "Marina View Villa",
        propertyAddress: "Unit 1502, Marina View Apartments, Dubai Marina",
        description: "Property management fee",
        category: "Property Management Fees",
        amount: 850,
        type: "Expense",
        paymentMethod: "Bank Transfer",
        receiptNumber: "PMF-2024-005",
        vendorName: "Elite Property Management",
        notes: "10% management fee for June 2024",
        createdBy: "Property Manager",
        createdDate: "2024-06-25",
        lastUpdated: "2024-06-25",
        tags: ["management", "fee", "monthly"]
      },
      {
        id: 6,
        date: "2024-06-28",
        propertyName: "Sunset Apartments",
        propertyAddress: "Unit 101, Sunset Apartments, Dubai Marina",
        description: "New tenant security deposit",
        category: "Security Deposits",
        amount: 2500,
        type: "Income",
        paymentMethod: "Bank Transfer",
        receiptNumber: "DEP-2024-006",
        tenantName: "Ahmed Al-Mansouri",
        notes: "Security deposit for new lease agreement",
        createdBy: "Property Manager",
        createdDate: "2024-06-28",
        lastUpdated: "2024-06-28",
        tags: ["deposit", "income", "new-tenant"]
      },
      {
        id: 7,
        date: "2024-06-30",
        propertyName: "Oak Grove Condos",
        propertyAddress: "Unit 205, Oak Grove Condos, Business Bay",
        description: "Property insurance premium",
        category: "Insurance",
        amount: 1200,
        type: "Expense",
        paymentMethod: "Bank Transfer",
        receiptNumber: "INS-2024-007",
        vendorName: "Dubai Insurance Company",
        notes: "Annual property insurance renewal",
        createdBy: "Property Manager",
        createdDate: "2024-06-30",
        lastUpdated: "2024-06-30",
        tags: ["insurance", "annual", "expense"]
      }
    ]
  }
];

export const transactionCategories = {
  income: [
    "Rent Income",
    "Security Deposits",
    "Late Fees",
    "Parking Fees",
    "Utility Reimbursements",
    "Application Fees",
    "Pet Fees",
    "Other Income"
  ],
  expense: [
    "Maintenance Costs",
    "Utilities",
    "Insurance",
    "Property Management Fees",
    "Repairs",
    "Cleaning",
    "Landscaping",
    "Security Deposits",
    "Legal Fees",
    "Advertising",
    "Office Supplies",
    "Professional Services",
    "Other Expenses"
  ]
};

export const paymentMethods = [
  "Bank Transfer",
  "Cash",
  "Check",
  "Credit Card",
  "Online Payment",
  "Mobile Payment",
  "Wire Transfer"
];

export const transactionTypes = [
  { value: "Income", color: "green", bgColor: "bg-green-100", textColor: "text-green-700" },
  { value: "Expense", color: "red", bgColor: "bg-red-100", textColor: "text-red-700" }
];

// Chart data for visualization
export const monthlyTrends = [
  { month: "Jan", income: 25000, expenses: 8000 },
  { month: "Feb", income: 26500, expenses: 7500 },
  { month: "Mar", income: 24000, expenses: 9200 },
  { month: "Apr", income: 27000, expenses: 6800 },
  { month: "May", income: 25500, expenses: 8500 },
  { month: "Jun", income: 28000, expenses: 7200 }
];

export const categoryBreakdown = [
  { category: "Rent Income", amount: 156000, color: "#10B981" },
  { category: "Security Deposits", amount: 15000, color: "#3B82F6" },
  { category: "Maintenance Costs", amount: 12000, color: "#EF4444" },
  { category: "Utilities", amount: 8500, color: "#F59E0B" },
  { category: "Insurance", amount: 6000, color: "#8B5CF6" },
  { category: "Property Management Fees", amount: 15600, color: "#EC4899" }
];

export const propertyPerformance = [
  { property: "Marina View Villa", income: 85000, expenses: 12000 },
  { property: "Sunset Apartments", income: 72000, expenses: 15000 },
  { property: "Oak Grove Condos", income: 68000, expenses: 8000 },
  { property: "City Center Apartments", income: 75000, expenses: 10000 }
];

// Helper functions for calculations
export const calculateTotalIncome = (transactions) => {
  return transactions.reduce((total, group) => {
    return total + group.transactionsList
      .filter(t => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);
  }, 0);
};

export const calculateTotalExpenses = (transactions) => {
  return transactions.reduce((total, group) => {
    return total + group.transactionsList
      .filter(t => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }, 0);
};

export const calculateNetProfit = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  return income - expenses;
};
