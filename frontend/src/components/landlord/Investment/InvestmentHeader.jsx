import React, { useState } from "react";
import { Calculator, Plus, FileDown, ChevronDown, Download } from "lucide-react";
import { exportToPDF, exportToExcel } from "@/utils/exportUtils";

const InvestmentHeader = ({ onNewCalculation, calculations, filters = {} }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format) => {
    if (!calculations || calculations.length === 0) {
      alert('No calculation data available to export.');
      return;
    }

    setIsExporting(true);
    setShowExportMenu(false);

    try {
      let filename;
      
      if (format === "PDF") {
        filename = exportToPDF(calculations, filters);
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
        notification.innerHTML = `
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
              <div class="font-semibold">PDF Export Successful!</div>
              <div class="text-sm opacity-90">Investment report downloaded: ${filename}</div>
            </div>
          </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
      } else if (format === "Excel") {
        filename = exportToExcel(calculations, filters);
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
        notification.innerHTML = `
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
              <div class="font-semibold">Excel Export Successful!</div>
              <div class="text-sm opacity-90">Investment report downloaded: ${filename}</div>
            </div>
          </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
      }
    } catch (error) {
      console.error('Export error:', error);
      // Create error notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
      notification.innerHTML = `
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <div>
            <div class="font-semibold">Export Failed</div>
            <div class="text-sm opacity-90">Failed to export ${format} report. Please try again.</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 7000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Calculator className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Investment Calculator</h1>
          <p className="text-gray-600 mt-1">Analyze property investments and calculate returns</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Export Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={isExporting}
            className={`flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium shadow-sm cursor-pointer ${
              isExporting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isExporting ? (
              <Download size={18} className="animate-bounce" />
            ) : (
              <FileDown size={18} />
            )}
            {isExporting ? 'Exporting...' : 'Export'}
            <ChevronDown size={16} />
          </button>
          
          {showExportMenu && !isExporting && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={() => handleExport('PDF')}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FileDown size={16} className="text-blue-500" />
                  Export as PDF
                </button>
                <button
                  onClick={() => handleExport('Excel')}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FileDown size={16} className="text-green-500" />
                  Export as Excel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* New Calculation Button */}
        <button 
          onClick={onNewCalculation} 
          className="myButton flex items-center gap-2 px-6 py-3 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          New Calculation
        </button>
      </div>
    </header>
  );
};

export default InvestmentHeader;
