import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Eye,
  Edit,
  Trash2,
  Download,
  Send,
  MoreVertical,
  Calendar,
  User,
  Home,
  CreditCard,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  RefreshCw,
  Filter,
  Settings,
  FileText,
} from "lucide-react";
import {
  formatCurrency,
  formatPaymentDate,
  getPaymentStatusColor,
  paymentTypes,
  paymentMethods,
  paymentStatuses,
} from "@/data/landlord/payments/data";

const PaymentsBody = ({
  payments,
  isLoading,
  onViewPayment,
  onEditPayment,
  onDeletePayment,
  onDownloadReceipt,
  onSendReminder,
  showFilters,
  filters,
  onFilterChange,
  searchTerm, 
  onSearchChange, 
  onShowFilters,
  onRefresh,
  onExportPayments,
  totalPayments,
}) => {
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [sortField, setSortField] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedPayments = [...payments].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "amount" || sortField === "netAmount") {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    } else if (sortField === "dueDate" || sortField === "paidDate") {
      aValue = new Date(aValue || 0);
      bValue = new Date(bValue || 0);
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "partial":
        return <DollarSign className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
      partial: "bg-orange-100 text-orange-800",
      cancelled: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
          colors[status] || colors.pending
        }`}
      >
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleSelectPayment = (paymentId) => {
    setSelectedPayments((prev) =>
      prev.includes(paymentId)
        ? prev.filter((id) => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPayments.length === payments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(payments.map((p) => p.id));
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 border-0">
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 animate-pulse"
            >
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between p-4 space-x-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center flex-1 space-x-4">
          {/* Search Input */}
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

          {/* Filter Toggle */}
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

        {/* Action Buttons */}
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

          {/* <button
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <Settings size={16} />
              Settings
            </button> */}
        </div>
      </div>

      {/* Summary Info */}
      <div className="flex items-center justify-between px-6 pt-2 border-t border-gray-200">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span>
            <span className="font-medium text-gray-900">{totalPayments}</span>{" "}
            total payments
          </span>
          <span className="text-gray-400">•</span>
          <span>
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
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
      </div>
      {/* Filters Panel */}
      {showFilters && (
        <Card className="p-6 bg-white border-0">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Filter Payments
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={filters.status || "all"}
                onChange={(e) =>
                  onFilterChange({ ...filters, status: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {paymentStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                value={filters.type || "all"}
                onChange={(e) =>
                  onFilterChange({ ...filters, type: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {paymentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Method
              </label>
              <select
                value={filters.method || "all"}
                onChange={(e) =>
                  onFilterChange({ ...filters, method: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Date Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={filters.dateFrom || ""}
                  onChange={(e) =>
                    onFilterChange({ ...filters, dateFrom: e.target.value })
                  }
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={filters.dateTo || ""}
                  onChange={(e) =>
                    onFilterChange({ ...filters, dateTo: e.target.value })
                  }
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Payments Table */}
      <Card className="border-0 shadow-none">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Payment History
          </h3>
          {selectedPayments.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedPayments.length} selected
              </span>
              <button className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
                Bulk Actions
              </button>
            </div>
          )}
        </div>

        <div className="p-4 overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="w-full ">
            <thead>
              <tr className="border-b border-gray-200">
                {/* <th className="w-8 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedPayments.length === payments.length &&
                        payments.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th> */}
                <th
                  className="py-3 text-sm font-medium text-left text-gray-700 cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("paymentId")}
                >
                  Payment ID
                </th>
                <th
                  className="py-3 text-sm font-medium text-left text-gray-700 cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("tenantName")}
                >
                  Tenant
                </th>
                <th
                  className="py-3 text-sm font-medium text-left text-gray-700 cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("propertyName")}
                >
                  Property
                </th>
                <th
                  className="py-3 text-sm font-medium text-left text-gray-700 cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("paymentType")}
                >
                  Type
                </th>
                <th
                  className="py-3 text-sm font-medium text-left text-gray-700 cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("amount")}
                >
                  Amount
                </th>
                <th
                  className="py-3 text-sm font-medium text-left text-gray-700 cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("dueDate")}
                >
                  Due Date
                </th>
                <th
                  className="py-3 text-sm font-medium text-left text-gray-700 cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("status")}
                >
                  Status
                </th>
                <th className="py-3 text-sm font-medium text-right text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  {/* <td className="py-4">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => handleSelectPayment(payment.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td> */}
                  <td className="py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.paymentId}
                    </div>
                    <div className="text-xs text-gray-500">
                      {payment.transactionId || "No transaction ID"}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {payment.tenantName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {payment.tenantEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {payment.propertyName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {payment.propertyAddress}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
                      {payment.paymentType.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(payment.amount)}
                    </div>
                    {payment.lateFee > 0 && (
                      <div className="text-xs text-red-600">
                        +{formatCurrency(payment.lateFee)} late fee
                      </div>
                    )}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">
                          {formatPaymentDate(payment.dueDate)}
                        </div>
                        {payment.paidDate && (
                          <div className="text-xs text-green-600">
                            Paid: {formatPaymentDate(payment.paidDate)}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">{getStatusBadge(payment.status)}</td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onViewPayment(payment)}
                        className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-100"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEditPayment(payment)}
                        className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                        title="Edit Payment"
                      >
                        <Edit size={16} />
                      </button>
                      {payment.receiptGenerated && (
                        <button
                          onClick={() => onDownloadReceipt(payment)}
                          className="p-2 text-green-600 transition-colors rounded-lg hover:bg-green-100"
                          title="Download Receipt"
                        >
                          <Download size={16} />
                        </button>
                      )}
                      {payment.status === "pending" && (
                        <button
                          onClick={() => onSendReminder(payment)}
                          className="p-2 text-orange-600 transition-colors rounded-lg hover:bg-orange-100"
                          title="Send Reminder"
                        >
                          <Send size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => onDeletePayment(payment)}
                        className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-100"
                        title="Delete Payment"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="py-12 text-center">
            <DollarSign className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No payments found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by recording your first payment.
            </p>
            <button
              onClick={() => onAddPayment && onAddPayment()}
              className="mt-4 myButton"
            >
              Record Payment
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PaymentsBody;
