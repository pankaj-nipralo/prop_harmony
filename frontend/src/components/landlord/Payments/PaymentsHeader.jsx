import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  FileText,
  Send,
  Settings
} from "lucide-react";

const PaymentsHeader = ({ 
  searchTerm, 
  onSearchChange, 
  onAddPayment,
  onExportPayments,
  onSendReminders,
  onRefresh,
  onShowFilters,
  showFilters,
  totalPayments,
  isLoading 
}) => {
  return (
    <Card className="border-0 shadow-none ">
      <div className="flex flex-col space-y-4">
        {/* Header Title and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3"> 
              <FileText className="w-6 h-6 text-blue-600" /> 
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Payment Management
              </h1>
              <p className="text-sm text-gray-600">
                Track and manage all property payments
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onSendReminders}
              className="flex items-center gap-2 px-4 py-2 text-blue-700 transition-colors bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200"
              disabled={isLoading}
            >
              <Send size={16} />
              Send Reminders
            </button>
            
            <button
              onClick={onAddPayment}
              className="flex items-center gap-2 px-4 py-2 myButton"
              disabled={isLoading}
            >
              <Plus size={16} />
              Record Payment
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        {/* <div className="flex items-center justify-between p-4 space-x-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center flex-1 space-x-4">
           
            <div className="relative flex-1 max-w-md">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search payments, tenants, properties..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

           
            <button
              onClick={onShowFilters}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                showFilters
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>

         
          <div className="flex items-center space-x-2">
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              onClick={onExportPayments}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              disabled={isLoading}
            >
              <Download size={16} />
              Export
            </button>

            <button
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <Settings size={16} />
              Settings
            </button>
          </div>
        </div> */}

        {/* Summary Info */}
        {/* <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span>
              <span className="font-medium text-gray-900">{totalPayments}</span> total payments
            </span>
            <span className="text-gray-400">•</span>
            <span>
              Last updated: {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Paid</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Overdue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600">Partial</span>
            </div>
          </div>
        </div> */}
      </div>
    </Card>
  );
};

export default PaymentsHeader;
