export const paymentsData = [
  {
    id: 1,
    paymentsList: [
      {
        id: 1,
        paymentId: "PAY-2024-001",
        tenantId: 1,
        tenantName: "Ahmed Al-Mansouri",
        tenantEmail: "ahmed.mansouri@email.com",
        propertyId: 1,
        propertyName: "Marina View Villa",
        propertyAddress: "123 Marina Street, Dubai Marina",
        amount: 8500,
        currency: "",
        paymentType: "rent",
        paymentMethod: "bank_transfer",
        status: "paid",
        dueDate: "2024-12-01T00:00:00Z",
        paidDate: "2024-11-28T14:30:00Z",
        transactionId: "TXN-20241128-001",
        description: "Monthly Rent Payment - December 2024",
        notes: "Payment received on time via bank transfer",
        receiptGenerated: true,
        receiptUrl: "/receipts/PAY-2024-001.pdf",
        lateFee: 0,
        discount: 0,
        netAmount: 8500,
        paymentPeriod: {
          from: "2024-12-01",
          to: "2024-12-31"
        },
        createdAt: "2024-11-28T14:30:00Z",
        updatedAt: "2024-11-28T14:30:00Z"
      },
      {
        id: 2,
        paymentId: "PAY-2024-002",
        tenantId: 2,
        tenantName: "Sarah Johnson",
        tenantEmail: "sarah.johnson@email.com",
        propertyId: 2,
        propertyName: "Sunset Apartments",
        propertyAddress: "456 Oak Avenue, Apt 2A",
        amount: 7200,
        currency: "",
        paymentType: "rent",
        paymentMethod: "online",
        status: "pending",
        dueDate: "2024-12-01T00:00:00Z",
        paidDate: null,
        transactionId: null,
        description: "Monthly Rent Payment - December 2024",
        notes: "Payment reminder sent",
        receiptGenerated: false,
        receiptUrl: null,
        lateFee: 0,
        discount: 0,
        netAmount: 7200,
        paymentPeriod: {
          from: "2024-12-01",
          to: "2024-12-31"
        },
        createdAt: "2024-11-15T10:00:00Z",
        updatedAt: "2024-12-10T09:00:00Z"
      },
      {
        id: 3,
        paymentId: "PAY-2024-003",
        tenantId: 3,
        tenantName: "Michael Chen",
        tenantEmail: "michael.chen@email.com",
        propertyId: 3,
        propertyName: "Downtown Loft",
        propertyAddress: "789 Pine Road, Apt 7C",
        amount: 6800,
        currency: "",
        paymentType: "rent",
        paymentMethod: "cash",
        status: "overdue",
        dueDate: "2024-11-01T00:00:00Z",
        paidDate: null,
        transactionId: null,
        description: "Monthly Rent Payment - November 2024",
        notes: "Payment overdue by 15 days",
        receiptGenerated: false,
        receiptUrl: null,
        lateFee: 340,
        discount: 0,
        netAmount: 7140,
        paymentPeriod: {
          from: "2024-11-01",
          to: "2024-11-30"
        },
        createdAt: "2024-10-15T10:00:00Z",
        updatedAt: "2024-12-15T10:00:00Z"
      },
      {
        id: 4,
        paymentId: "PAY-2024-004",
        tenantId: 4,
        tenantName: "Emma Wilson",
        tenantEmail: "emma.wilson@email.com",
        propertyId: 3,
        propertyName: "Downtown Loft",
        propertyAddress: "789 Pine Road, Apt 5B",
        amount: 5000,
        currency: "",
        paymentType: "security_deposit",
        paymentMethod: "bank_transfer",
        status: "paid",
        dueDate: "2024-10-01T00:00:00Z",
        paidDate: "2024-09-28T11:15:00Z",
        transactionId: "TXN-20240928-002",
        description: "Security Deposit",
        notes: "Security deposit for new lease",
        receiptGenerated: true,
        receiptUrl: "/receipts/PAY-2024-004.pdf",
        lateFee: 0,
        discount: 0,
        netAmount: 5000,
        paymentPeriod: {
          from: "2024-10-01",
          to: "2025-10-01"
        },
        createdAt: "2024-09-28T11:15:00Z",
        updatedAt: "2024-09-28T11:15:00Z"
      },
      {
        id: 5,
        paymentId: "PAY-2024-005",
        tenantId: 5,
        tenantName: "David Rodriguez",
        tenantEmail: "david.rodriguez@email.com",
        propertyId: 2,
        propertyName: "Sunset Apartments",
        propertyAddress: "456 Oak Avenue, Apt 3B",
        amount: 450,
        currency: "",
        paymentType: "utilities",
        paymentMethod: "check",
        status: "paid",
        dueDate: "2024-12-05T00:00:00Z",
        paidDate: "2024-12-03T16:20:00Z",
        transactionId: "CHK-20241203-001",
        description: "Utility Bills - November 2024",
        notes: "Electricity and water bills",
        receiptGenerated: true,
        receiptUrl: "/receipts/PAY-2024-005.pdf",
        lateFee: 0,
        discount: 0,
        netAmount: 450,
        paymentPeriod: {
          from: "2024-11-01",
          to: "2024-11-30"
        },
        createdAt: "2024-12-03T16:20:00Z",
        updatedAt: "2024-12-03T16:20:00Z"
      },
      {
        id: 6,
        paymentId: "PAY-2024-006",
        tenantId: 1,
        tenantName: "Ahmed Al-Mansouri",
        tenantEmail: "ahmed.mansouri@email.com",
        propertyId: 1,
        propertyName: "Marina View Villa",
        propertyAddress: "123 Marina Street, Dubai Marina",
        amount: 1200,
        currency: "",
        paymentType: "maintenance",
        paymentMethod: "bank_transfer",
        status: "partial",
        dueDate: "2024-12-10T00:00:00Z",
        paidDate: "2024-12-08T10:45:00Z",
        transactionId: "TXN-20241208-003",
        description: "AC Repair and Maintenance",
        notes: "Partial payment received, balance pending",
        receiptGenerated: true,
        receiptUrl: "/receipts/PAY-2024-006.pdf",
        lateFee: 0,
        discount: 100,
        netAmount: 1100,
        paymentPeriod: {
          from: "2024-12-01",
          to: "2024-12-31"
        },
        createdAt: "2024-12-08T10:45:00Z",
        updatedAt: "2024-12-08T10:45:00Z"
      }
    ]
  }
];

// Payment types
export const paymentTypes = [
  { value: "all", label: "All Types" },
  { value: "rent", label: "Rent Payment" },
  { value: "security_deposit", label: "Security Deposit" },
  { value: "utilities", label: "Utilities" },
  { value: "maintenance", label: "Maintenance" },
  { value: "late_fee", label: "Late Fee" },
  { value: "other", label: "Other" }
];

// Payment methods
export const paymentMethods = [
  { value: "all", label: "All Methods" },
  { value: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
  { value: "cash", label: "Cash", icon: "💵" },
  { value: "check", label: "Check", icon: "📝" },
  { value: "online", label: "Online Payment", icon: "💳" },
  { value: "card", label: "Credit/Debit Card", icon: "💳" },
  { value: "digital_wallet", label: "Digital Wallet", icon: "📱" }
];

// Payment statuses
export const paymentStatuses = [
  { value: "all", label: "All Statuses" },
  { value: "paid", label: "Paid", color: "green" },
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "overdue", label: "Overdue", color: "red" },
  { value: "partial", label: "Partial", color: "orange" },
  { value: "cancelled", label: "Cancelled", color: "gray" }
];

// Utility functions
export const getPaymentsByStatus = (payments, status) => {
  if (!payments) return [];
  if (status === "all") return payments;
  return payments.filter(payment => payment.status === status);
};

export const getPaymentsByType = (payments, type) => {
  if (!payments) return [];
  if (type === "all") return payments;
  return payments.filter(payment => payment.paymentType === type);
};

export const getPaymentsByMethod = (payments, method) => {
  if (!payments) return [];
  if (method === "all") return payments;
  return payments.filter(payment => payment.paymentMethod === method);
};

export const searchPayments = (payments, searchTerm) => {
  if (!searchTerm || !payments) return payments;
  
  const term = searchTerm.toLowerCase();
  return payments.filter(payment =>
    payment.tenantName.toLowerCase().includes(term) ||
    payment.propertyName.toLowerCase().includes(term) ||
    payment.paymentId.toLowerCase().includes(term) ||
    payment.description.toLowerCase().includes(term) ||
    payment.transactionId?.toLowerCase().includes(term)
  );
};

export const filterPayments = (payments, filters) => {
  if (!payments) return [];
  
  return payments.filter(payment => {
    // Status filter
    if (filters.status && filters.status !== "all" && 
        payment.status !== filters.status) {
      return false;
    }
    
    // Type filter
    if (filters.type && filters.type !== "all" && 
        payment.paymentType !== filters.type) {
      return false;
    }
    
    // Method filter
    if (filters.method && filters.method !== "all" && 
        payment.paymentMethod !== filters.method) {
      return false;
    }
    
    // Property filter
    if (filters.property && filters.property !== "all" && 
        payment.propertyName !== filters.property) {
      return false;
    }
    
    // Date range filter
    if (filters.dateFrom && new Date(payment.dueDate) < new Date(filters.dateFrom)) {
      return false;
    }
    
    if (filters.dateTo && new Date(payment.dueDate) > new Date(filters.dateTo)) {
      return false;
    }
    
    // Amount range filter
    if (filters.amountFrom && payment.amount < parseFloat(filters.amountFrom)) {
      return false;
    }
    
    if (filters.amountTo && payment.amount > parseFloat(filters.amountTo)) {
      return false;
    }
    
    return true;
  });
};

export const formatCurrency = (amount, currency = "") => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatPaymentDate = (dateString) => {
  if (!dateString) return "Not paid";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getPaymentStatusColor = (status) => {
  const statusObj = paymentStatuses.find(s => s.value === status);
  return statusObj ? statusObj.color : "gray";
};

export const calculatePaymentStats = (payments) => {
  if (!payments || payments.length === 0) {
    return {
      totalPayments: 0,
      totalAmount: 0,
      paidAmount: 0,
      pendingAmount: 0,
      overdueAmount: 0,
      collectionRate: 0,
      averagePayment: 0
    };
  }

  const totalPayments = payments.length;
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidPayments = payments.filter(p => p.status === "paid");
  const paidAmount = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === "pending");
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const overduePayments = payments.filter(p => p.status === "overdue");
  const overdueAmount = overduePayments.reduce((sum, p) => sum + p.amount, 0);
  
  const collectionRate = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;
  const averagePayment = totalPayments > 0 ? totalAmount / totalPayments : 0;

  return {
    totalPayments,
    totalAmount,
    paidAmount,
    pendingAmount,
    overdueAmount,
    collectionRate,
    averagePayment,
    paidCount: paidPayments.length,
    pendingCount: pendingPayments.length,
    overdueCount: overduePayments.length
  };
};
