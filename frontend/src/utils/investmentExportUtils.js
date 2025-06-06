import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { calculateInvestmentMetrics, generateCashFlowProjection, generateAmortizationSchedule } from '@/data/landlord/investment/data';

// Helper function to format currency
const formatCurrency = (amount) => {
  return `AED ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Helper function to format percentage
const formatPercentage = (percentage) => {
  return `${percentage.toFixed(2)}%`;
};

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Export Investment Calculations to PDF
export const exportInvestmentToPDF = (calculations, filters = {}) => {
  try {
    if (!calculations || !Array.isArray(calculations) || calculations.length === 0) {
      throw new Error('No calculation data available for export');
    }

    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const allCalculations = calculations.flatMap(group => group.calculationsList || []);
    
    if (allCalculations.length === 0) {
      throw new Error('No calculations found in the provided data');
    }

    // Header
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // Blue-600
    doc.text('Investment Analysis Report', 20, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${currentDate}`, 20, 35);
    
    // Add filters information if any
    let yPosition = 45;
    if (filters.propertyFilter && filters.propertyFilter !== "All Properties") {
      doc.text(`Property Filter: ${filters.propertyFilter}`, 20, yPosition);
      yPosition += 10;
    }
    if (filters.search) {
      doc.text(`Search: ${filters.search}`, 20, yPosition);
      yPosition += 10;
    }
    
    yPosition += 10;

    // Summary Statistics
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text('Portfolio Summary', 20, yPosition);
    yPosition += 15;

    // Calculate portfolio metrics
    const totalInvestment = allCalculations.reduce((sum, calc) => {
      const metrics = calculateInvestmentMetrics(calc);
      return sum + metrics.totalInvestment;
    }, 0);

    const totalAnnualCashFlow = allCalculations.reduce((sum, calc) => {
      const metrics = calculateInvestmentMetrics(calc);
      return sum + metrics.annualCashFlow;
    }, 0);

    const averageROI = allCalculations.length > 0 
      ? allCalculations.reduce((sum, calc) => {
          const metrics = calculateInvestmentMetrics(calc);
          return sum + metrics.totalROI;
        }, 0) / allCalculations.length
      : 0;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Create summary table
    const summaryData = [
      ['Total Investment', formatCurrency(totalInvestment)],
      ['Total Annual Cash Flow', formatCurrency(totalAnnualCashFlow)],
      ['Average ROI', formatPercentage(averageROI)],
      ['Number of Calculations', allCalculations.length.toString()]
    ];

    doc.autoTable({
      startY: yPosition,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 20, right: 20 },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { halign: 'right' }
      }
    });

    yPosition = doc.lastAutoTable.finalY + 20;

    // Individual Calculations
    allCalculations.forEach((calculation, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      const metrics = calculateInvestmentMetrics(calculation);

      doc.setFontSize(14);
      doc.setTextColor(59, 130, 246);
      doc.text(`${index + 1}. ${calculation.name}`, 20, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Property: ${calculation.propertyName}`, 20, yPosition);
      yPosition += 8;

      // Calculation details table
      const calculationData = [
        ['Purchase Price', formatCurrency(calculation.purchasePrice)],
        ['Total Investment', formatCurrency(metrics.totalInvestment)],
        ['Monthly Cash Flow', formatCurrency(metrics.monthlyCashFlow)],
        ['Annual Cash Flow', formatCurrency(metrics.annualCashFlow)],
        ['Cap Rate', formatPercentage(metrics.capRate)],
        ['Cash-on-Cash Return', formatPercentage(metrics.cashOnCashReturn)],
        ['Total ROI', formatPercentage(metrics.totalROI)],
        ['Break Even (months)', Math.round(metrics.breakEvenMonths).toString()]
      ];

      doc.autoTable({
        startY: yPosition,
        head: [['Metric', 'Value']],
        body: calculationData,
        theme: 'striped',
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 20, right: 20 },
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 60, halign: 'right' }
        }
      });

      yPosition = doc.lastAutoTable.finalY + 15;
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
      doc.text('Generated by Property Harmony - Investment Calculator', 20, doc.internal.pageSize.height - 10);
    }

    // Save the PDF
    const filename = `investment-analysis-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    return filename;
  } catch (error) {
    console.error('PDF Export Error:', error);
    throw new Error(`Failed to export PDF: ${error.message}`);
  }
};

// Export Investment Calculations to Excel
export const exportInvestmentToExcel = (calculations, filters = {}) => {
  try {
    if (!calculations || !Array.isArray(calculations) || calculations.length === 0) {
      throw new Error('No calculation data available for export');
    }

    const allCalculations = calculations.flatMap(group => group.calculationsList || []);
    
    if (allCalculations.length === 0) {
      throw new Error('No calculations found in the provided data');
    }

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Summary Sheet
    const totalInvestment = allCalculations.reduce((sum, calc) => {
      const metrics = calculateInvestmentMetrics(calc);
      return sum + metrics.totalInvestment;
    }, 0);

    const totalAnnualCashFlow = allCalculations.reduce((sum, calc) => {
      const metrics = calculateInvestmentMetrics(calc);
      return sum + metrics.annualCashFlow;
    }, 0);

    const averageROI = allCalculations.length > 0 
      ? allCalculations.reduce((sum, calc) => {
          const metrics = calculateInvestmentMetrics(calc);
          return sum + metrics.totalROI;
        }, 0) / allCalculations.length
      : 0;

    const summaryData = [
      ['Investment Analysis Report Summary'],
      ['Generated on:', new Date().toLocaleDateString()],
      [''],
      ['Portfolio Overview'],
      ['Total Investment', totalInvestment],
      ['Total Annual Cash Flow', totalAnnualCashFlow],
      ['Average ROI (%)', averageROI],
      ['Number of Calculations', allCalculations.length],
      [''],
      ['Filters Applied'],
      ['Property Filter', filters.propertyFilter || 'All Properties'],
      ['Search Filter', filters.search || 'None']
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Calculations Sheet
    const calculationData = [
      ['Calculation Name', 'Property Name', 'Property Address', 'Purchase Price', 'Down Payment %', 'Down Payment Amount', 
       'Closing Costs', 'Renovation Costs', 'Total Investment', 'Monthly Rent', 'Monthly Expenses', 'Monthly Cash Flow',
       'Annual Cash Flow', 'Cap Rate %', 'Cash-on-Cash Return %', 'Total ROI %', 'Break Even (months)', 'Interest Rate %',
       'Loan Term (years)', 'Management Fee %', 'Vacancy Rate %', 'Appreciation Rate %', 'Created Date', 'Notes']
    ];

    allCalculations.forEach(calculation => {
      const metrics = calculateInvestmentMetrics(calculation);
      calculationData.push([
        calculation.name,
        calculation.propertyName,
        calculation.propertyAddress || '',
        calculation.purchasePrice,
        calculation.downPayment,
        calculation.downPaymentAmount,
        calculation.closingCosts,
        calculation.renovationCosts,
        metrics.totalInvestment,
        calculation.monthlyRent,
        calculation.monthlyExpenses,
        metrics.monthlyCashFlow,
        metrics.annualCashFlow,
        metrics.capRate,
        metrics.cashOnCashReturn,
        metrics.totalROI,
        Math.round(metrics.breakEvenMonths),
        calculation.interestRate,
        calculation.loanTerm,
        calculation.managementFee,
        calculation.vacancyRate,
        calculation.appreciationRate,
        calculation.createdDate,
        calculation.notes || ''
      ]);
    });

    const calculationSheet = XLSX.utils.aoa_to_sheet(calculationData);

    // Auto-size columns
    const colWidths = [
      { wch: 25 }, // Calculation Name
      { wch: 20 }, // Property Name
      { wch: 30 }, // Property Address
      { wch: 15 }, // Purchase Price
      { wch: 12 }, // Down Payment %
      { wch: 15 }, // Down Payment Amount
      { wch: 12 }, // Closing Costs
      { wch: 15 }, // Renovation Costs
      { wch: 15 }, // Total Investment
      { wch: 12 }, // Monthly Rent
      { wch: 15 }, // Monthly Expenses
      { wch: 15 }, // Monthly Cash Flow
      { wch: 15 }, // Annual Cash Flow
      { wch: 10 }, // Cap Rate %
      { wch: 15 }, // Cash-on-Cash Return %
      { wch: 12 }, // Total ROI %
      { wch: 15 }, // Break Even
      { wch: 12 }, // Interest Rate %
      { wch: 12 }, // Loan Term
      { wch: 12 }, // Management Fee %
      { wch: 12 }, // Vacancy Rate %
      { wch: 15 }, // Appreciation Rate %
      { wch: 12 }, // Created Date
      { wch: 30 }  // Notes
    ];
    calculationSheet['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(workbook, calculationSheet, 'Calculations');

    // Cash Flow Projections Sheet (for first calculation as example)
    if (allCalculations.length > 0) {
      const firstCalculation = allCalculations[0];
      const projections = generateCashFlowProjection(firstCalculation, 10);
      
      const projectionData = [
        [`Cash Flow Projection - ${firstCalculation.name}`],
        [''],
        ['Year', 'Property Value', 'Annual Rent', 'Annual Expenses', 'Annual Cash Flow', 'Cumulative Cash Flow']
      ];

      projections.forEach(projection => {
        projectionData.push([
          projection.year,
          projection.propertyValue,
          projection.annualRent,
          projection.annualExpenses,
          projection.annualCashFlow,
          projection.cumulativeCashFlow
        ]);
      });

      const projectionSheet = XLSX.utils.aoa_to_sheet(projectionData);
      XLSX.utils.book_append_sheet(workbook, projectionSheet, 'Cash Flow Projection');
    }

    // Save the Excel file
    const filename = `investment-analysis-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
    
    return filename;
  } catch (error) {
    console.error('Excel Export Error:', error);
    throw new Error(`Failed to export Excel: ${error.message}`);
  }
};
