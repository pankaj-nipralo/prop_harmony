export const investmentData = [
  {
    id: 1,
    calculationsList: [
      {
        id: 1,
        name: "Marina View Villa Investment",
        propertyName: "Marina View Villa",
        propertyAddress: "Unit 1502, Marina View Apartments, Dubai Marina",
        purchasePrice: 1500000,
        downPayment: 20, // percentage
        downPaymentAmount: 300000,
        closingCosts: 45000,
        renovationCosts: 50000,
        monthlyRent: 8000,
        monthlyExpenses: 1500,
        propertyTaxRate: 0.8, // percentage
        annualInsurance: 5000,
        interestRate: 4.5, // percentage
        loanTerm: 25, // years
        managementFee: 8, // percentage
        maintenanceReserve: 5, // percentage
        vacancyRate: 5, // percentage
        appreciationRate: 3, // percentage
        createdDate: "2024-06-01",
        lastUpdated: "2024-06-01",
        createdBy: "Property Manager",
        tags: ["villa", "marina", "investment"],
        notes: "High-end property with good rental potential"
      },
      {
        id: 2,
        name: "Sunset Apartments Investment",
        propertyName: "Sunset Apartments",
        propertyAddress: "Unit 101, Sunset Apartments, Dubai Marina",
        purchasePrice: 950000,
        downPayment: 25, // percentage
        downPaymentAmount: 237500,
        closingCosts: 28500,
        renovationCosts: 25000,
        monthlyRent: 6500,
        monthlyExpenses: 1200,
        propertyTaxRate: 0.8, // percentage
        annualInsurance: 3800,
        interestRate: 4.2, // percentage
        loanTerm: 30, // years
        managementFee: 8, // percentage
        maintenanceReserve: 5, // percentage
        vacancyRate: 7, // percentage
        appreciationRate: 2.5, // percentage
        createdDate: "2024-05-15",
        lastUpdated: "2024-05-15",
        createdBy: "Property Manager",
        tags: ["apartment", "marina", "investment"],
        notes: "Good entry-level investment property"
      },
      {
        id: 3,
        name: "Business Bay Tower Investment",
        propertyName: "Business Bay Tower",
        propertyAddress: "Unit 2505, Business Bay Tower, Business Bay",
        purchasePrice: 2200000,
        downPayment: 30, // percentage
        downPaymentAmount: 660000,
        closingCosts: 66000,
        renovationCosts: 80000,
        monthlyRent: 12000,
        monthlyExpenses: 2200,
        propertyTaxRate: 0.8, // percentage
        annualInsurance: 8800,
        interestRate: 4.8, // percentage
        loanTerm: 20, // years
        managementFee: 8, // percentage
        maintenanceReserve: 5, // percentage
        vacancyRate: 4, // percentage
        appreciationRate: 4, // percentage
        createdDate: "2024-04-20",
        lastUpdated: "2024-04-20",
        createdBy: "Property Manager",
        tags: ["tower", "business-bay", "premium"],
        notes: "Premium property with excellent appreciation potential"
      }
    ]
  }
];

// Default calculation template
export const defaultCalculation = {
  name: "",
  propertyName: "",
  propertyAddress: "",
  purchasePrice: 0,
  downPayment: 20,
  downPaymentAmount: 0,
  closingCosts: 0,
  renovationCosts: 0,
  monthlyRent: 0,
  monthlyExpenses: 0,
  propertyTaxRate: 0.8,
  annualInsurance: 0,
  interestRate: 4.5,
  loanTerm: 25,
  managementFee: 8,
  maintenanceReserve: 5,
  vacancyRate: 5,
  appreciationRate: 3,
  notes: ""
};

// Investment calculation functions
export const calculateInvestmentMetrics = (calculation) => {
  const {
    purchasePrice,
    downPaymentAmount,
    closingCosts,
    renovationCosts,
    monthlyRent,
    monthlyExpenses,
    propertyTaxRate,
    annualInsurance,
    interestRate,
    loanTerm,
    managementFee,
    maintenanceReserve,
    vacancyRate,
    appreciationRate
  } = calculation;

  // Basic calculations
  const loanAmount = purchasePrice - downPaymentAmount;
  const totalInvestment = downPaymentAmount + closingCosts + renovationCosts;
  
  // Monthly calculations
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyMortgagePayment = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  
  // Annual calculations
  const annualRent = monthlyRent * 12;
  const effectiveAnnualRent = annualRent * (1 - vacancyRate / 100);
  const annualPropertyTax = purchasePrice * (propertyTaxRate / 100);
  const annualManagementFee = effectiveAnnualRent * (managementFee / 100);
  const annualMaintenanceReserve = effectiveAnnualRent * (maintenanceReserve / 100);
  const annualMortgagePayments = monthlyMortgagePayment * 12;
  const annualExpenses = (monthlyExpenses * 12) + annualPropertyTax + annualInsurance + 
                        annualManagementFee + annualMaintenanceReserve;
  
  // Cash flow calculations
  const netOperatingIncome = effectiveAnnualRent - annualExpenses + annualMortgagePayments;
  const annualCashFlow = effectiveAnnualRent - annualExpenses - annualMortgagePayments;
  const monthlyCashFlow = annualCashFlow / 12;
  
  // Investment ratios
  const capRate = (netOperatingIncome / purchasePrice) * 100;
  const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;
  const grossRentMultiplier = purchasePrice / annualRent;
  
  // ROI with appreciation
  const annualAppreciation = purchasePrice * (appreciationRate / 100);
  const totalAnnualReturn = annualCashFlow + annualAppreciation;
  const totalROI = (totalAnnualReturn / totalInvestment) * 100;
  
  // Break-even analysis
  const breakEvenMonths = totalInvestment / Math.abs(monthlyCashFlow);
  
  return {
    loanAmount,
    totalInvestment,
    monthlyMortgagePayment,
    annualRent,
    effectiveAnnualRent,
    annualExpenses,
    annualMortgagePayments,
    netOperatingIncome,
    annualCashFlow,
    monthlyCashFlow,
    capRate,
    cashOnCashReturn,
    grossRentMultiplier,
    totalROI,
    breakEvenMonths,
    annualAppreciation
  };
};

// Generate cash flow projections
export const generateCashFlowProjection = (calculation, years = 10) => {
  const metrics = calculateInvestmentMetrics(calculation);
  const projections = [];
  
  let currentPropertyValue = calculation.purchasePrice;
  let currentRent = calculation.monthlyRent * 12;
  
  for (let year = 1; year <= years; year++) {
    // Apply appreciation
    currentPropertyValue *= (1 + calculation.appreciationRate / 100);
    currentRent *= (1 + Math.min(calculation.appreciationRate / 100, 0.03)); // Cap rent growth at 3%
    
    const effectiveRent = currentRent * (1 - calculation.vacancyRate / 100);
    const expenses = (calculation.monthlyExpenses * 12) + 
                    (currentPropertyValue * calculation.propertyTaxRate / 100) +
                    calculation.annualInsurance +
                    (effectiveRent * calculation.managementFee / 100) +
                    (effectiveRent * calculation.maintenanceReserve / 100);
    
    const cashFlow = effectiveRent - expenses - metrics.annualMortgagePayments;
    
    projections.push({
      year,
      propertyValue: Math.round(currentPropertyValue),
      annualRent: Math.round(effectiveRent),
      annualExpenses: Math.round(expenses),
      annualCashFlow: Math.round(cashFlow),
      cumulativeCashFlow: projections.reduce((sum, p) => sum + p.annualCashFlow, 0) + cashFlow
    });
  }
  
  return projections;
};

// Generate amortization schedule
export const generateAmortizationSchedule = (calculation, years = 5) => {
  const { loanAmount, monthlyMortgagePayment } = calculateInvestmentMetrics(calculation);
  const monthlyRate = calculation.interestRate / 100 / 12;
  const schedule = [];
  
  let remainingBalance = loanAmount;
  let totalInterest = 0;
  
  const totalMonths = years * 12;
  
  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyMortgagePayment - interestPayment;
    remainingBalance -= principalPayment;
    totalInterest += interestPayment;
    
    schedule.push({
      month,
      payment: monthlyMortgagePayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: remainingBalance,
      totalInterest
    });
  }
  
  return schedule;
};

// Investment assessment
export const assessInvestment = (calculation) => {
  const metrics = calculateInvestmentMetrics(calculation);
  const assessments = [];
  
  // Cash flow assessment
  if (metrics.monthlyCashFlow < 0) {
    assessments.push({
      type: "warning",
      title: "Negative Cash Flow Warning",
      message: `This property will require AED ${Math.abs(metrics.monthlyCashFlow).toFixed(0)} monthly to cover expenses.`
    });
  } else if (metrics.monthlyCashFlow < 500) {
    assessments.push({
      type: "caution",
      title: "Low Cash Flow",
      message: "This property generates minimal positive cash flow. Consider higher rent or lower expenses."
    });
  }
  
  // ROI assessment
  if (metrics.totalROI < 5) {
    assessments.push({
      type: "poor",
      title: "Poor Investment",
      message: "This property shows poor returns. Consider other opportunities."
    });
  } else if (metrics.totalROI < 10) {
    assessments.push({
      type: "fair",
      title: "Fair Investment",
      message: "This property shows moderate returns. Review assumptions carefully."
    });
  } else if (metrics.totalROI < 15) {
    assessments.push({
      type: "good",
      title: "Good Investment",
      message: "This property shows good investment potential."
    });
  } else {
    assessments.push({
      type: "excellent",
      title: "Excellent Investment",
      message: "This property shows excellent investment potential."
    });
  }
  
  // Cap rate assessment
  if (metrics.capRate < 4) {
    assessments.push({
      type: "info",
      title: "Low Cap Rate",
      message: "Cap rate is below market average. Ensure strong appreciation potential."
    });
  }
  
  return assessments;
};
