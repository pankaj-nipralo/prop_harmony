import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  Calendar,
  Filter,
  Settings,
  FileText,
  Mail,
  Clock
} from "lucide-react";

const ReportsHeader = ({
  selectedReportType,
  onReportTypeChange,
  dateRange,
  onDateRangeChange,
  customDateRange,
  onCustomDateRangeChange,
  onExport,
  onRefresh,
  onScheduleReport,
  isLoading = false,
  totalReports = 0,
  lastUpdated
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const reportTypes = [
    { id: 'financial', label: 'Financial Reports', icon: BarChart3 },
    { id: 'payment', label: 'Payment Reports', icon: FileText },
    { id: 'property', label: 'Property Reports', icon: Settings },
    { id: 'tenant', label: 'Tenant Reports', icon: Settings },
    { id: 'maintenance', label: 'Maintenance Reports', icon: Settings }
  ];

  const dateRanges = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const exportFormats = [
    // { value: 'pdf', label: 'Export PDF', icon: FileText },
    { value: 'excel', label: 'Export Excel', icon: FileText },
    // { value: 'png', label: 'Export PNG', icon: FileText }
  ];

  const handleExport = (format) => {
    onExport && onExport(format);
  };

  const handleScheduleReport = () => {
    setShowScheduleModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <Card className="border-0 shadow-none">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex items-center space-x-3"> 
              <BarChart3 className="w-8 h-8 text-blue-600" /> 
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-sm text-gray-600">
                Comprehensive insights and performance metrics for your properties
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                showFilters 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter size={16} />
              Filters
            </button>

            <div className="flex items-center space-x-2">
              {exportFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => handleExport(format.value)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={isLoading}
                >
                  <Download size={14} />
                  {format.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleScheduleReport}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
            >
              <Mail size={16} />
              Schedule
            </button>

            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-4 py-2 myButton"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Report Summary */}
        {/* <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{totalReports}</span> reports available
            </div>
            {lastUpdated && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock size={14} />
                <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Report Type: <span className="font-medium text-gray-900 capitalize">{selectedReportType}</span>
            </div>
            <div className="text-sm text-gray-600">
              Period: <span className="font-medium text-gray-900">{dateRanges.find(r => r.value === dateRange)?.label}</span>
            </div>
          </div>
        </div> */}
      </Card>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="p-6 bg-white border-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Report Type Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Report Type
              </label>
              <select
                value={selectedReportType}
                onChange={(e) => onReportTypeChange && onReportTypeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {reportTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => onDateRangeChange && onDateRangeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Date Range */}
            {dateRange === 'custom' && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Custom Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={customDateRange?.from || ''}
                    onChange={(e) => onCustomDateRangeChange && onCustomDateRangeChange({
                      ...customDateRange,
                      from: e.target.value
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    value={customDateRange?.to || ''}
                    onChange={(e) => onCustomDateRangeChange && onCustomDateRangeChange({
                      ...customDateRange,
                      to: e.target.value
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between pt-4 mt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  onReportTypeChange && onReportTypeChange('financial');
                  onDateRangeChange && onDateRangeChange('lastyear');
                }}
                className="px-3 py-1 text-sm text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
              >
                Financial Overview
              </button>
              <button
                onClick={() => {
                  onReportTypeChange && onReportTypeChange('payment');
                  onDateRangeChange && onDateRangeChange('last3months');
                }}
                className="px-3 py-1 text-sm text-green-600 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
              >
                Payment Analysis
              </button>
              <button
                onClick={() => {
                  onReportTypeChange && onReportTypeChange('property');
                  onDateRangeChange && onDateRangeChange('last6months');
                }}
                className="px-3 py-1 text-sm text-purple-600 transition-colors bg-purple-100 rounded-lg hover:bg-purple-200"
              >
                Property Performance
              </button>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 text-sm text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Hide Filters
            </button>
          </div>
        </Card>
      )}

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/20">
          <Card className="w-full max-w-md p-6 bg-white border-0">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Schedule Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Frequency
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-sm text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onScheduleReport && onScheduleReport();
                  setShowScheduleModal(false);
                }}
                className="px-4 py-2 myButton"
              >
                Schedule
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReportsHeader;
