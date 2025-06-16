import React from "react";
import ExpenseStats from "./ExpenseStats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, RefreshCcw } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";
import { getExpenseStatusColor } from "@/data/landlord/expenses/data";

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
      <ExpenseStats stats={stats || {}} isLoading={isLoading} />

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
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
        <Button onClick={onAddExpense} disabled={isLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Expenses Table */}
      <div className="bg-white border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Details</th>
                <th className="px-6 py-3">Property</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="bg-white hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {expense.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {expense.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {expense.propertyName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {expense.propertyAddress}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <DirhamSvg size={14} className="mr-1" />
                      {expense.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`${getExpenseStatusColor(
                        expense.status
                      )} font-medium`}
                    >
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(expense.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewExpense(expense)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditExpense(expense)}
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentExpensesTab;
