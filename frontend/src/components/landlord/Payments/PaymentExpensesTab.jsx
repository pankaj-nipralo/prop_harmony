import React from "react";
import ExpenseStats from "./ExpenseStats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  RefreshCcw,
  User,
  Calendar,
  CheckCircle,
  Edit,
  Download,
  Eye,
} from "lucide-react";
import DirhamSvg from "@/assets/Dirham";
import { getExpenseStatusColor } from "@/data/landlord/expenses/data";
import { Card } from "@/components/ui/card";

const PaymentExpensesTab = ({
  expenses,
  filteredExpenses,
  isLoading,
  stats,
  showFilters,
  filters,
  searchTerm,
  onFilterChange,
  onSearchChange,
  onShowFilters,
  onRefresh,
  onViewExpense,
  onEditExpense,
  onDeleteExpense,
  onAddExpense,
}) => {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <ExpenseStats stats={stats || {}} isLoading={isLoading} />{" "}
      {/* Controls */}
      <Card className="border-none shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <div className="flex flex-wrap items-center flex-1 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute w-4 h-4 text-gray-400 left-3 top-2.5" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={onShowFilters}
              className={showFilters ? "bg-blue-50 text-blue-600" : ""}
            >
              <Filter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCcw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
          <Button
            onClick={onAddExpense}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </Card>{" "}
      {/* Expenses Table */}
      <Card className="border-none shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50/50">
                <th className="p-4 text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Details
                </th>
                <th className="p-4 text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Property
                </th>
                <th className="p-4 text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Category
                </th>
                <th className="p-4 text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Amount
                </th>
                <th className="p-4 text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Status
                </th>
                <th className="p-4 text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Due Date
                </th>
                <th className="p-4 text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredExpenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className="transition-colors bg-white hover:bg-blue-50/40"
                >
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {expense.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {expense.description}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {expense.vendor && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {expense.vendor}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {expense.propertyName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {expense.propertyAddress}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs font-medium capitalize bg-blue-50 text-blue-700 rounded-full">
                      {expense.category.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center font-medium text-gray-900">
                      <DirhamSvg size={14} className="mr-1" />
                      {expense.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${
                        expense.status === "paid"
                          ? "bg-green-50 text-green-700"
                          : expense.status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : expense.status === "processing"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          expense.status === "paid"
                            ? "bg-green-600"
                            : expense.status === "pending"
                            ? "bg-yellow-600"
                            : expense.status === "processing"
                            ? "bg-blue-600"
                            : "bg-red-600"
                        }`}
                      />
                      {expense.status.charAt(0).toUpperCase() +
                        expense.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {new Date(expense.dueDate).toLocaleDateString()}
                      </div>
                      {expense.paidDate && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3" />
                          Paid on{" "}
                          {new Date(expense.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => onViewExpense(expense)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-700"
                        onClick={() => onEditExpense(expense)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {expense.receiptUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-gray-700"
                          onClick={() => onDownloadReceipt?.(expense)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PaymentExpensesTab;
