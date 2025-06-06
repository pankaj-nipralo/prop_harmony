import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

// Helper function to format currency
const formatCurrency = (amount) => {
  return `AED ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Calculate statistics from transactions
const calculateStats = (transactions) => {
  const allTransactions = transactions.flatMap(
    (group) => group.transactionsList
  );

  const totalIncome = allTransactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = allTransactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    netProfit,
    totalTransactions: allTransactions.length,
  };
};

// Export to PDF
export const exportToPDF = (transactions, filters = {}) => {
  try {
    if (
      !transactions ||
      !Array.isArray(transactions) ||
      transactions.length === 0
    ) {
      throw new Error("No transaction data available for export");
    }

    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const allTransactions = transactions.flatMap(
      (group) => group.transactionsList || []
    );

    if (allTransactions.length === 0) {
      throw new Error("No transactions found in the provided data");
    }

    const stats = calculateStats(transactions);

    // Header
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // Blue-600
    doc.text("Bookkeeping Report", 20, 25);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${currentDate}`, 20, 35);

    // Add filters information if any
    let yPosition = 45;
    if (filters.propertyFilter && filters.propertyFilter !== "All Properties") {
      doc.text(`Property: ${filters.propertyFilter}`, 20, yPosition);
      yPosition += 10;
    }
    if (filters.categoryFilter && filters.categoryFilter !== "All Categories") {
      doc.text(`Category: ${filters.categoryFilter}`, 20, yPosition);
      yPosition += 10;
    }
    if (filters.typeFilter && filters.typeFilter !== "All Types") {
      doc.text(`Type: ${filters.typeFilter}`, 20, yPosition);
      yPosition += 10;
    }

    yPosition += 10;

    // Summary Statistics
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text("Financial Summary", 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Create summary table
    const summaryData = [
      ["Total Income", formatCurrency(stats.totalIncome)],
      ["Total Expenses", formatCurrency(stats.totalExpenses)],
      ["Net Profit", formatCurrency(stats.netProfit)],
      ["Total Transactions", stats.totalTransactions.toString()],
    ];

    doc.autoTable({
      startY: yPosition,
      head: [["Metric", "Value"]],
      body: summaryData,
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 20, right: 20 },
      columnStyles: {
        0: { fontStyle: "bold" },
        1: { halign: "right" },
      },
    });

    yPosition = doc.lastAutoTable.finalY + 20;

    // Transactions Table
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text("Transaction Details", 20, yPosition);
    yPosition += 10;

    // Prepare transaction data for table
    const tableData = allTransactions.map((transaction) => [
      formatDate(transaction.date),
      transaction.propertyName,
      transaction.description,
      transaction.category,
      formatCurrency(transaction.amount),
      transaction.type,
      transaction.paymentMethod || "N/A",
    ]);

    doc.autoTable({
      startY: yPosition,
      head: [
        [
          "Date",
          "Property",
          "Description",
          "Category",
          "Amount",
          "Type",
          "Payment Method",
        ],
      ],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 10, right: 10 },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25, halign: "right" },
        5: { cellWidth: 15 },
        6: { cellWidth: 20 },
      },
      didParseCell: function (data) {
        // Color code transaction types
        if (data.column.index === 5) {
          // Type column
          if (data.cell.text[0] === "Income") {
            data.cell.styles.textColor = [34, 197, 94]; // Green
          } else if (data.cell.text[0] === "Expense") {
            data.cell.styles.textColor = [239, 68, 68]; // Red
          }
        }
      },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 30,
        doc.internal.pageSize.height - 10
      );
      doc.text(
        "Generated by Property Harmony - Bookkeeping System",
        20,
        doc.internal.pageSize.height - 10
      );
    }

    // Save the PDF
    const filename = `bookkeeping-report-${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(filename);

    return filename;
  } catch (error) {
    console.error("PDF Export Error:", error);
    throw new Error(`Failed to export PDF: ${error.message}`);
  }
};

// Export to Excel
export const exportToExcel = (transactions, filters = {}) => {
  try {
    if (
      !transactions ||
      !Array.isArray(transactions) ||
      transactions.length === 0
    ) {
      throw new Error("No transaction data available for export");
    }

    const allTransactions = transactions.flatMap(
      (group) => group.transactionsList || []
    );

    if (allTransactions.length === 0) {
      throw new Error("No transactions found in the provided data");
    }

    const stats = calculateStats(transactions);

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Summary Sheet
    const summaryData = [
      ["Bookkeeping Report Summary"],
      ["Generated on:", new Date().toLocaleDateString()],
      [""],
      ["Financial Overview"],
      ["Total Income", stats.totalIncome],
      ["Total Expenses", stats.totalExpenses],
      ["Net Profit", stats.netProfit],
      ["Total Transactions", stats.totalTransactions],
      [""],
      ["Filters Applied"],
      ["Property Filter", filters.propertyFilter || "All Properties"],
      ["Category Filter", filters.categoryFilter || "All Categories"],
      ["Type Filter", filters.typeFilter || "All Types"],
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);

    // Style the summary sheet
    summarySheet["A1"] = {
      v: "Bookkeeping Report Summary",
      t: "s",
      s: { font: { bold: true, sz: 16 } },
    };
    summarySheet["A4"] = {
      v: "Financial Overview",
      t: "s",
      s: { font: { bold: true, sz: 14 } },
    };
    summarySheet["A10"] = {
      v: "Filters Applied",
      t: "s",
      s: { font: { bold: true, sz: 14 } },
    };

    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    // Transactions Sheet
    const transactionData = [
      [
        "Date",
        "Property",
        "Description",
        "Category",
        "Amount",
        "Type",
        "Payment Method",
        "Tenant/Vendor",
        "Receipt Number",
        "Notes",
      ],
    ];

    allTransactions.forEach((transaction) => {
      transactionData.push([
        transaction.date,
        transaction.propertyName,
        transaction.description,
        transaction.category,
        transaction.amount,
        transaction.type,
        transaction.paymentMethod || "",
        transaction.tenantName || transaction.vendorName || "",
        transaction.receiptNumber || "",
        transaction.notes || "",
      ]);
    });

    const transactionSheet = XLSX.utils.aoa_to_sheet(transactionData);

    // Auto-size columns
    const colWidths = [
      { wch: 12 }, // Date
      { wch: 25 }, // Property
      { wch: 30 }, // Description
      { wch: 20 }, // Category
      { wch: 15 }, // Amount
      { wch: 10 }, // Type
      { wch: 18 }, // Payment Method
      { wch: 20 }, // Tenant/Vendor
      { wch: 18 }, // Receipt Number
      { wch: 30 }, // Notes
    ];
    transactionSheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, transactionSheet, "Transactions");

    // Category Analysis Sheet
    const categoryStats = {};
    allTransactions.forEach((transaction) => {
      if (!categoryStats[transaction.category]) {
        categoryStats[transaction.category] = {
          income: 0,
          expense: 0,
          count: 0,
        };
      }

      if (transaction.type === "Income") {
        categoryStats[transaction.category].income += transaction.amount;
      } else {
        categoryStats[transaction.category].expense += transaction.amount;
      }
      categoryStats[transaction.category].count++;
    });

    const categoryData = [
      ["Category Analysis"],
      [""],
      ["Category", "Income", "Expenses", "Net", "Transaction Count"],
    ];

    Object.entries(categoryStats).forEach(([category, stats]) => {
      const net = stats.income - stats.expense;
      categoryData.push([
        category,
        stats.income,
        stats.expense,
        net,
        stats.count,
      ]);
    });

    const categorySheet = XLSX.utils.aoa_to_sheet(categoryData);
    categorySheet["A1"] = {
      v: "Category Analysis",
      t: "s",
      s: { font: { bold: true, sz: 16 } },
    };

    XLSX.utils.book_append_sheet(workbook, categorySheet, "Category Analysis");

    // Save the Excel file
    const filename = `bookkeeping-report-${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(workbook, filename);

    return filename;
  } catch (error) {
    console.error("Excel Export Error:", error);
    throw new Error(`Failed to export Excel: ${error.message}`);
  }
};

// Export filtered data
export const exportFilteredData = (transactions, filters, format) => {
  // Apply filters to transactions
  let filteredTransactions = [...transactions];

  if (filters.search) {
    filteredTransactions = filteredTransactions.map((group) => ({
      ...group,
      transactionsList: group.transactionsList.filter((transaction) => {
        const searchTerm = filters.search.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchTerm) ||
          transaction.propertyName.toLowerCase().includes(searchTerm) ||
          transaction.category.toLowerCase().includes(searchTerm) ||
          (transaction.tenantName &&
            transaction.tenantName.toLowerCase().includes(searchTerm)) ||
          (transaction.vendorName &&
            transaction.vendorName.toLowerCase().includes(searchTerm))
        );
      }),
    }));
  }

  if (format === "PDF") {
    return exportToPDF(filteredTransactions, filters);
  } else if (format === "Excel") {
    return exportToExcel(filteredTransactions, filters);
  }
};
