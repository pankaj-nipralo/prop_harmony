import React, { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Building,
  Calendar,
  DollarSign,
  ChevronDown,
  Filter,
  User,
  Receipt,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { transactionCategories } from "@/data/landlord/bookkeeping/data";
import BookkeepingCharts from "./BookkeepingCharts";
import ViewTransactionModal from "./ViewTransactionModal";
import EditTransactionModal from "./EditTransactionModal";
import DirhamSvg from "@/assets/Dirham";

const BookkeepingBody = ({ transactions, setTransactions }) => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [propertyFilter, setPropertyFilter] = useState("All Properties");
  const [activeTab, setActiveTab] = useState("transactions"); // "transactions" or "charts"
  const [viewModal, setViewModal] = useState({
    open: false,
    transaction: null,
  });
  const [editModal, setEditModal] = useState({
    open: false,
    transaction: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    transaction: null,
  });

  if (
    !transactions ||
    !Array.isArray(transactions) ||
    transactions.length === 0
  ) {
    return <div className="text-gray-500">No transactions found.</div>;
  }

  // Flatten all transactions
  const allTransactions = transactions.flatMap(
    (group) => group.transactionsList
  );

  // Get unique properties for filter
  const uniqueProperties = [
    ...new Set(allTransactions.map((t) => t.propertyName)),
  ];

  // Get all categories for filter
  const allCategories = [
    ...new Set([
      ...transactionCategories.income,
      ...transactionCategories.expense,
    ]),
  ];

  // Apply filters
  const filteredTransactions = allTransactions.filter((transaction) => {
    const categoryMatch =
      categoryFilter === "All Categories" ||
      transaction.category === categoryFilter;
    const typeMatch =
      typeFilter === "All Types" || transaction.type === typeFilter;
    const propertyMatch =
      propertyFilter === "All Properties" ||
      transaction.propertyName === propertyFilter;
    return categoryMatch && typeMatch && propertyMatch;
  });

  // Search transactions
  const displayedTransactions = filteredTransactions.filter((transaction) => {
    const q = search.toLowerCase();
    return (
      transaction.description.toLowerCase().includes(q) ||
      transaction.propertyName.toLowerCase().includes(q) ||
      transaction.category.toLowerCase().includes(q) ||
      (transaction.tenantName &&
        transaction.tenantName.toLowerCase().includes(q)) ||
      (transaction.vendorName &&
        transaction.vendorName.toLowerCase().includes(q))
    );
  });

  const getTypeStyle = (type) => {
    return type === "Income"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  // Handler functions
  const handleViewTransaction = (transaction) => {
    setViewModal({ open: true, transaction });
  };

  const handleEditTransaction = (transaction) => {
    setEditModal({ open: true, transaction });
  };

  const handleDeleteTransaction = (transaction) => {
    setDeleteModal({ open: true, transaction });
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((group) => ({
        ...group,
        transactionsList: group.transactionsList.map((transaction) =>
          transaction.id === updatedTransaction.id
            ? updatedTransaction
            : transaction
        ),
      }))
    );
  };

  const handleConfirmDelete = (transactionToDelete) => {
    setTransactions((prev) =>
      prev.map((group) => ({
        ...group,
        transactionsList: group.transactionsList.filter(
          (transaction) => transaction.id !== transactionToDelete.id
        ),
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="inline-flex gap-2 p-1 bg-white rounded-lg">
          {/* Transactions Tab */}
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer  ${
              activeTab === "transactions"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Transactions
          </button>

          {/* Charts Tab */}
          <button
            onClick={() => setActiveTab("charts")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "charts"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Charts
          </button>
        </div>
      </div>

      {activeTab === "charts" ? (
        <BookkeepingCharts transactions={transactions} />
      ) : (
        <>
          {/* Search and Filter Section */}
          <Card className="p-4 bg-white border-0 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search Input */}
              <div className="flex items-center flex-1 gap-3 px-4 py-2 transition-shadow bg-gray-100 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <Search size={16} className="mr-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (setFilters) {
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }));
                    }
                  }}
                  className="w-full text-sm bg-transparent focus:outline-none"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Property Filter */}
                <div className="relative">
                  {/* <Filter size={16} className="text-gray-500" /> */}
                  <select
                    value={propertyFilter}
                    onChange={(e) => {
                      setPropertyFilter(e.target.value);
                      if (setFilters) {
                        setFilters((prev) => ({
                          ...prev,
                          propertyFilter: e.target.value,
                        }));
                      }
                    }}
                    className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All Properties">All Properties</option>
                    {uniqueProperties.map((property) => (
                      <option key={property} value={property}>
                        {property}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>

                {/* Type Filter */}
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All Types">All Types</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                  <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All Categories">All Categories</option>
                    {allCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>
              </div>
            </div>
          </Card>

          {/* Transactions Table */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Transactions
            </h2>

            {displayedTransactions.length === 0 ? (
              <Card className="p-8 text-center border-0 shadow-sm">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No transactions found.</p>
              </Card>
            ) : (
              <Card className="overflow-hidden border-0 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Property
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Description
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Category
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {displayedTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                {transaction.date}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-2 text-gray-400" />
                              <div className="text-sm text-gray-900">
                                {transaction.propertyName}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {transaction.description}
                              </div>
                              {(transaction.tenantName ||
                                transaction.vendorName) && (
                                <div className="flex items-center mt-1">
                                  <User className="w-3 h-3 mr-1 text-gray-400" />
                                  <span className="text-xs text-gray-500">
                                    {transaction.tenantName ||
                                      transaction.vendorName}
                                  </span>
                                </div>
                              )}
                              {transaction.receiptNumber && (
                                <div className="flex items-center mt-1">
                                  <Receipt className="w-3 h-3 mr-1 text-gray-400" />
                                  <span className="text-xs text-gray-500">
                                    {transaction.receiptNumber}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                              {transaction.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <DirhamSvg
                                className={`w-4 h-4 mr-1 ${
                                  transaction.type === "Income"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              />
                              <span
                                className={`text-sm font-medium ${
                                  transaction.type === "Income"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                AED {transaction.amount.toLocaleString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeStyle(
                                transaction.type
                              )}`}
                            >
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleViewTransaction(transaction)
                                }
                                className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleEditTransaction(transaction)
                                }
                                className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50"
                                title="Edit Transaction"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteTransaction(transaction)
                                }
                                className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-red-600 hover:bg-red-50"
                                title="Delete Transaction"
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
              </Card>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      <ViewTransactionModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, transaction: null })}
        transaction={viewModal.transaction}
      />

      <EditTransactionModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, transaction: null })}
        transaction={editModal.transaction}
        onUpdateTransaction={handleUpdateTransaction}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={() => setDeleteModal({ open: false, transaction: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Delete Transaction
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the transaction "
              <strong>{deleteModal.transaction?.description}</strong>"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  setDeleteModal({ open: false, transaction: null })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleConfirmDelete(deleteModal.transaction);
                  setDeleteModal({ open: false, transaction: null });
                }}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookkeepingBody;
