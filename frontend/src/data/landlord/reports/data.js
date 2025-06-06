// Reports data for Property Harmony Dashboard
export const reportsData = {
  // Financial Reports Data
  financialReports: {
    monthlyRevenue: [
      { month: 'Jan 2024', revenue: 85000, expenses: 28000, profit: 57000, properties: 12 },
      { month: 'Feb 2024', revenue: 87500, expenses: 31000, profit: 56500, properties: 12 },
      { month: 'Mar 2024', revenue: 92000, expenses: 29500, profit: 62500, properties: 13 },
      { month: 'Apr 2024', revenue: 94500, expenses: 32000, profit: 62500, properties: 13 },
      { month: 'May 2024', revenue: 96000, expenses: 30500, profit: 65500, properties: 14 },
      { month: 'Jun 2024', revenue: 98500, expenses: 33000, profit: 65500, properties: 14 },
      { month: 'Jul 2024', revenue: 101000, expenses: 35000, profit: 66000, properties: 15 },
      { month: 'Aug 2024', revenue: 103500, expenses: 34500, profit: 69000, properties: 15 },
      { month: 'Sep 2024', revenue: 105000, expenses: 36000, profit: 69000, properties: 16 },
      { month: 'Oct 2024', revenue: 107500, expenses: 37500, profit: 70000, properties: 16 },
      { month: 'Nov 2024', revenue: 110000, expenses: 38000, profit: 72000, properties: 17 },
      { month: 'Dec 2024', revenue: 112500, expenses: 39500, profit: 73000, properties: 17 }
    ],
    
    expenseBreakdown: [
      { category: 'Maintenance', amount: 156000, percentage: 35, color: '#ef4444' },
      { category: 'Property Management', amount: 89000, percentage: 20, color: '#3b82f6' },
      { category: 'Insurance', amount: 67000, percentage: 15, color: '#10b981' },
      { category: 'Property Taxes', amount: 78000, percentage: 17.5, color: '#f59e0b' },
      { category: 'Utilities', amount: 45000, percentage: 10, color: '#8b5cf6' },
      { category: 'Marketing', amount: 11000, percentage: 2.5, color: '#06b6d4' }
    ],

    cashFlow: [
      { month: 'Jan', inflow: 85000, outflow: 28000, net: 57000 },
      { month: 'Feb', inflow: 87500, outflow: 31000, net: 56500 },
      { month: 'Mar', inflow: 92000, outflow: 29500, net: 62500 },
      { month: 'Apr', inflow: 94500, outflow: 32000, net: 62500 },
      { month: 'May', inflow: 96000, outflow: 30500, net: 65500 },
      { month: 'Jun', inflow: 98500, outflow: 33000, net: 65500 },
      { month: 'Jul', inflow: 101000, outflow: 35000, net: 66000 },
      { month: 'Aug', inflow: 103500, outflow: 34500, net: 69000 },
      { month: 'Sep', inflow: 105000, outflow: 36000, net: 69000 },
      { month: 'Oct', inflow: 107500, outflow: 37500, net: 70000 },
      { month: 'Nov', inflow: 110000, outflow: 38000, net: 72000 },
      { month: 'Dec', inflow: 112500, outflow: 39500, net: 73000 }
    ]
  },

  // Payment Reports Data
  paymentReports: {
    collectionRates: [
      { month: 'Jan', collected: 95.5, pending: 3.2, overdue: 1.3 },
      { month: 'Feb', collected: 94.8, pending: 3.8, overdue: 1.4 },
      { month: 'Mar', collected: 96.2, pending: 2.9, overdue: 0.9 },
      { month: 'Apr', collected: 97.1, pending: 2.1, overdue: 0.8 },
      { month: 'May', collected: 96.8, pending: 2.4, overdue: 0.8 },
      { month: 'Jun', collected: 98.2, pending: 1.5, overdue: 0.3 },
      { month: 'Jul', collected: 97.9, pending: 1.8, overdue: 0.3 },
      { month: 'Aug', collected: 98.5, pending: 1.2, overdue: 0.3 },
      { month: 'Sep', collected: 97.6, pending: 2.1, overdue: 0.3 },
      { month: 'Oct', collected: 98.8, pending: 1.0, overdue: 0.2 },
      { month: 'Nov', collected: 99.1, pending: 0.7, overdue: 0.2 },
      { month: 'Dec', collected: 98.9, pending: 0.9, overdue: 0.2 }
    ],

    paymentMethods: [
      { method: 'Bank Transfer', count: 245, percentage: 68.5, amount: 756000 },
      { method: 'Online Payment', count: 78, percentage: 21.8, amount: 234000 },
      { method: 'Cash', count: 23, percentage: 6.4, amount: 67000 },
      { method: 'Check', count: 12, percentage: 3.3, amount: 43000 }
    ],

    overdueAnalysis: [
      { range: '1-7 days', count: 8, amount: 24500, percentage: 15.2 },
      { range: '8-15 days', count: 5, amount: 18200, percentage: 11.3 },
      { range: '16-30 days', count: 3, amount: 12800, percentage: 7.9 },
      { range: '31+ days', count: 2, amount: 8900, percentage: 5.5 }
    ]
  },

  // Property Reports Data
  propertyReports: {
    occupancyRates: [
      { property: 'Marina View Villa', occupancy: 95.8, revenue: 156000, units: 12 },
      { property: 'Sunset Apartments', occupancy: 92.3, revenue: 134000, units: 18 },
      { property: 'Downtown Loft', occupancy: 88.9, revenue: 98000, units: 9 },
      { property: 'Garden Heights', occupancy: 96.7, revenue: 187000, units: 24 },
      { property: 'City Center Plaza', occupancy: 91.2, revenue: 145000, units: 15 },
      { property: 'Riverside Complex', occupancy: 94.4, revenue: 167000, units: 20 }
    ],

    maintenanceCosts: [
      { month: 'Jan', routine: 12000, emergency: 8500, total: 20500 },
      { month: 'Feb', routine: 11500, emergency: 6200, total: 17700 },
      { month: 'Mar', routine: 13200, emergency: 9800, total: 23000 },
      { month: 'Apr', routine: 14500, emergency: 7300, total: 21800 },
      { month: 'May', routine: 15800, emergency: 5900, total: 21700 },
      { month: 'Jun', routine: 16200, emergency: 8700, total: 24900 },
      { month: 'Jul', routine: 17500, emergency: 12300, total: 29800 },
      { month: 'Aug', routine: 16800, emergency: 9200, total: 26000 },
      { month: 'Sep', routine: 15200, emergency: 7800, total: 23000 },
      { month: 'Oct', routine: 14800, emergency: 6500, total: 21300 },
      { month: 'Nov', routine: 13500, emergency: 8900, total: 22400 },
      { month: 'Dec', routine: 12800, emergency: 11200, total: 24000 }
    ],

    propertyPerformance: [
      { property: 'Marina View Villa', roi: 12.8, appreciation: 8.5, netIncome: 132000 },
      { property: 'Sunset Apartments', roi: 11.2, appreciation: 7.2, netIncome: 98000 },
      { property: 'Downtown Loft', roi: 9.8, appreciation: 6.8, netIncome: 76000 },
      { property: 'Garden Heights', roi: 14.5, appreciation: 9.1, netIncome: 156000 },
      { property: 'City Center Plaza', roi: 10.9, appreciation: 7.8, netIncome: 112000 },
      { property: 'Riverside Complex', roi: 13.2, appreciation: 8.9, netIncome: 143000 }
    ]
  },

  // Tenant Reports Data
  tenantReports: {
    satisfaction: [
      { category: 'Property Condition', score: 4.3, responses: 156 },
      { category: 'Maintenance Response', score: 4.1, responses: 142 },
      { category: 'Communication', score: 4.5, responses: 167 },
      { category: 'Value for Money', score: 3.9, responses: 134 },
      { category: 'Overall Experience', score: 4.2, responses: 178 }
    ],

    leaseRenewals: [
      { month: 'Jan', renewed: 12, expired: 3, rate: 80.0 },
      { month: 'Feb', renewed: 8, expired: 2, rate: 80.0 },
      { month: 'Mar', renewed: 15, expired: 2, rate: 88.2 },
      { month: 'Apr', renewed: 11, expired: 4, rate: 73.3 },
      { month: 'May', renewed: 9, expired: 1, rate: 90.0 },
      { month: 'Jun', renewed: 14, expired: 3, rate: 82.4 },
      { month: 'Jul', renewed: 13, expired: 2, rate: 86.7 },
      { month: 'Aug', renewed: 16, expired: 1, rate: 94.1 },
      { month: 'Sep', renewed: 10, expired: 3, rate: 76.9 },
      { month: 'Oct', renewed: 12, expired: 2, rate: 85.7 },
      { month: 'Nov', renewed: 14, expired: 1, rate: 93.3 },
      { month: 'Dec', renewed: 11, expired: 2, rate: 84.6 }
    ],

    demographics: [
      { ageGroup: '18-25', count: 23, percentage: 12.8 },
      { ageGroup: '26-35', count: 67, percentage: 37.2 },
      { ageGroup: '36-45', count: 54, percentage: 30.0 },
      { ageGroup: '46-55', count: 28, percentage: 15.6 },
      { ageGroup: '56+', count: 8, percentage: 4.4 }
    ]
  },

  // Maintenance Reports Data
  maintenanceReports: {
    requestVolumes: [
      { month: 'Jan', requests: 45, completed: 42, pending: 3, avgTime: 2.3 },
      { month: 'Feb', requests: 38, completed: 36, pending: 2, avgTime: 2.1 },
      { month: 'Mar', requests: 52, completed: 48, pending: 4, avgTime: 2.8 },
      { month: 'Apr', requests: 41, completed: 39, pending: 2, avgTime: 2.2 },
      { month: 'May', requests: 47, completed: 44, pending: 3, avgTime: 2.5 },
      { month: 'Jun', requests: 56, completed: 52, pending: 4, avgTime: 3.1 },
      { month: 'Jul', requests: 63, completed: 58, pending: 5, avgTime: 3.4 },
      { month: 'Aug', requests: 49, completed: 46, pending: 3, avgTime: 2.7 },
      { month: 'Sep', requests: 44, completed: 42, pending: 2, avgTime: 2.4 },
      { month: 'Oct', requests: 39, completed: 37, pending: 2, avgTime: 2.0 },
      { month: 'Nov', requests: 42, completed: 40, pending: 2, avgTime: 2.3 },
      { month: 'Dec', requests: 48, completed: 45, pending: 3, avgTime: 2.6 }
    ],

    categoryBreakdown: [
      { category: 'Plumbing', count: 156, avgCost: 285, totalCost: 44460 },
      { category: 'Electrical', count: 89, avgCost: 195, totalCost: 17355 },
      { category: 'HVAC', count: 67, avgCost: 425, totalCost: 28475 },
      { category: 'Appliances', count: 78, avgCost: 315, totalCost: 24570 },
      { category: 'General Repairs', count: 134, avgCost: 165, totalCost: 22110 },
      { category: 'Painting', count: 45, avgCost: 275, totalCost: 12375 }
    ],

    responseTimeAnalysis: [
      { priority: 'Emergency', avgHours: 2.1, target: 4, performance: 'Excellent' },
      { priority: 'High', avgHours: 8.5, target: 24, performance: 'Good' },
      { priority: 'Medium', avgHours: 48.2, target: 72, performance: 'Good' },
      { priority: 'Low', avgHours: 96.8, target: 168, performance: 'Excellent' }
    ]
  }
};

// Report configuration and metadata
export const reportTypes = [
  { id: 'financial', label: 'Financial Reports', icon: 'DollarSign', color: 'blue' },
  { id: 'payment', label: 'Payment Reports', icon: 'CreditCard', color: 'green' },
  { id: 'property', label: 'Property Reports', icon: 'Home', color: 'purple' },
  { id: 'tenant', label: 'Tenant Reports', icon: 'Users', color: 'orange' },
  { id: 'maintenance', label: 'Maintenance Reports', icon: 'Wrench', color: 'red' }
];

export const dateRanges = [
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'last3months', label: 'Last 3 Months' },
  { value: 'last6months', label: 'Last 6 Months' },
  { value: 'lastyear', label: 'Last Year' },
  { value: 'custom', label: 'Custom Range' }
];

export const exportFormats = [
  { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
  { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
  { value: 'png', label: 'PNG Image', icon: 'Image' },
  { value: 'csv', label: 'CSV Data', icon: 'Database' }
];

// Utility functions for reports
export const calculateGrowthRate = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const formatCurrency = (amount, currency = 'AED') => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const getReportData = (reportType, dateRange = 'lastyear') => {
  // Filter data based on date range (simplified for demo)
  switch (reportType) {
    case 'financial':
      return reportsData.financialReports;
    case 'payment':
      return reportsData.paymentReports;
    case 'property':
      return reportsData.propertyReports;
    case 'tenant':
      return reportsData.tenantReports;
    case 'maintenance':
      return reportsData.maintenanceReports;
    default:
      return reportsData.financialReports;
  }
};

export const generateReportSummary = (reportType) => {
  const data = getReportData(reportType);
  
  switch (reportType) {
    case 'financial':
      const totalRevenue = data.monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
      const totalExpenses = data.monthlyRevenue.reduce((sum, item) => sum + item.expenses, 0);
      const totalProfit = totalRevenue - totalExpenses;
      
      return {
        totalRevenue,
        totalExpenses,
        totalProfit,
        profitMargin: (totalProfit / totalRevenue) * 100,
        avgMonthlyRevenue: totalRevenue / 12
      };
      
    case 'payment':
      const avgCollectionRate = data.collectionRates.reduce((sum, item) => sum + item.collected, 0) / 12;
      const totalOverdue = data.overdueAnalysis.reduce((sum, item) => sum + item.amount, 0);
      
      return {
        avgCollectionRate,
        totalOverdue,
        totalPayments: data.paymentMethods.reduce((sum, item) => sum + item.count, 0),
        totalAmount: data.paymentMethods.reduce((sum, item) => sum + item.amount, 0)
      };
      
    default:
      return {};
  }
};
