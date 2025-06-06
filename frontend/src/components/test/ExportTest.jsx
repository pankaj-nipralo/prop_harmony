import React from 'react';
import { exportToPDF, exportToExcel } from '@/utils/exportUtils';

// Sample test data
const testTransactions = [
  {
    id: 1,
    transactionsList: [
      {
        id: 1,
        date: "2024-06-05",
        propertyName: "Marina View Villa",
        description: "Monthly rent payment",
        category: "Rent Income",
        amount: 8500,
        type: "Income",
        paymentMethod: "Bank Transfer",
        receiptNumber: "REC-2024-001",
        tenantName: "John Doe",
        notes: "Regular monthly rent collection"
      },
      {
        id: 2,
        date: "2024-06-10",
        propertyName: "Sunset Apartments",
        description: "Plumbing repair",
        category: "Maintenance Costs",
        amount: 450,
        type: "Expense",
        paymentMethod: "Cash",
        receiptNumber: "INV-2024-002",
        vendorName: "Dubai Plumbing Services",
        notes: "Emergency repair"
      }
    ]
  }
];

const ExportTest = () => {
  const handleTestPDF = () => {
    try {
      const filename = exportToPDF(testTransactions, {});
      console.log('PDF exported:', filename);
      alert('PDF export test successful!');
    } catch (error) {
      console.error('PDF export error:', error);
      alert('PDF export test failed: ' + error.message);
    }
  };

  const handleTestExcel = () => {
    try {
      const filename = exportToExcel(testTransactions, {});
      console.log('Excel exported:', filename);
      alert('Excel export test successful!');
    } catch (error) {
      console.error('Excel export error:', error);
      alert('Excel export test failed: ' + error.message);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Export Functionality Test</h2>
      <div className="space-x-4">
        <button 
          onClick={handleTestPDF}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Test PDF Export
        </button>
        <button 
          onClick={handleTestExcel}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Test Excel Export
        </button>
      </div>
    </div>
  );
};

export default ExportTest;
