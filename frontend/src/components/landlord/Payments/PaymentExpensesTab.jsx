import React, { useState } from "react";
import ExpenseStats from "./ExpenseStats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
  Wallet,
  CreditCard,
  Building,
  AlertCircle,
  Receipt,
  Clock,
  DollarSign,
  ReceiptText,
} from "lucide-react";
import DirhamSvg from "@/assets/Dirham";
import { getExpenseStatusColor } from "@/data/landlord/expenses/data";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Status options for filtering
const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "maintenance", label: "Maintenance" },
  { value: "utilities", label: "Utilities" },
  { value: "repairs", label: "Repairs" },
  { value: "insurance", label: "Insurance" },
  { value: "taxes", label: "Taxes" },
  { value: "other", label: "Other" },
];

// Payment Processing Modal Component
const ExpensePaymentModal = ({
  isOpen,
  onClose,
  expense,
  onProcessPayment,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    amount: expense?.amount || 0,
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (selectedMethod === "card") {
      if (!formData.cardNumber.match(/^\d{16}$/)) {
        errors.cardNumber = "Please enter a valid 16-digit card number";
      }
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        errors.expiryDate = "Please enter a valid expiry date (MM/YY)";
      }
      if (!formData.cvc.match(/^\d{3}$/)) {
        errors.cvc = "Please enter a valid 3-digit CVC";
      }
    }
    if (!formData.amount || formData.amount <= 0) {
      errors.amount = "Please enter a valid amount";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue =
        value
          .replace(/\s/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || "";
    }
    if (name === "expiryDate") {
      formattedValue =
        value
          .replace(/\//g, "")
          .match(/^(\d{0,2})(\d{0,2})/)
          ?.slice(1)
          .filter(Boolean)
          .join("/") || "";
    }
    if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }
    if (name === "amount") {
      formattedValue = parseFloat(value) || 0;
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      onProcessPayment({
        expenseId: expense?.id,
        method: selectedMethod,
        amount: formData.amount,
        timestamp: new Date().toISOString(),
        cardDetails:
          selectedMethod === "card"
            ? {
                lastFourDigits: formData.cardNumber.slice(-4),
                expiryDate: formData.expiryDate,
              }
            : undefined,
      });

      onClose();
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-0 sm:max-w-[600px] max-h-screen overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-blue-900">
            <Wallet className="w-5 h-5 text-blue-500" />
            Process Expense Payment
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Expense Details */}
          <Card className="border-0 bg-blue-50">
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-blue-900">{expense.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      expense.status === "overdue"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {expense.status.charAt(0).toUpperCase() +
                      expense.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-blue-700">{expense.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-2xl font-bold text-blue-700">
                    <DirhamSvg size={24} className="mr-1" />
                    {expense.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-600">
                    Due: {new Date(expense.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Amount */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Payment Amount
              </Label>
              <div className="relative">
                <DirhamSvg
                  size={16}
                  className="absolute text-gray-400 left-3 top-3"
                />
                <Input
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  className="pl-8 border-0 bg-gray-50 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              {formErrors.amount && (
                <p className="text-xs text-red-500">{formErrors.amount}</p>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">
                Payment Method
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={selectedMethod === "card" ? "default" : "outline"}
                  className={`myButton flex items-center justify-center gap-2 py-6 ${
                    selectedMethod === "card"
                      ? "bg-blue-500 text-white"
                      : "border-0 bg-gray-50 text-gray-700 hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedMethod("card")}
                >
                  <CreditCard className="w-5 h-5" />
                  Card Payment
                </Button>
                <Button
                  type="button"
                  variant={selectedMethod === "bank" ? "default" : "outline"}
                  className={`myButton flex items-center justify-center gap-2 py-6 ${
                    selectedMethod === "bank"
                      ? "bg-blue-500 text-white"
                      : "border-0 bg-gray-50 text-gray-700 hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedMethod("bank")}
                >
                  <Building className="w-5 h-5" />
                  Bank Transfer
                </Button>
              </div>
            </div>

            {/* Card Payment Form */}
            {selectedMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Card Number
                  </Label>
                  <Input
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    className={`border-0 bg-gray-50 focus:ring-1 focus:ring-blue-500 ${
                      formErrors.cardNumber ? "ring-1 ring-red-500" : ""
                    }`}
                  />
                  {formErrors.cardNumber && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.cardNumber}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Expiry Date
                    </Label>
                    <Input
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`border-0 bg-gray-50 focus:ring-1 focus:ring-blue-500 ${
                        formErrors.expiryDate ? "ring-1 ring-red-500" : ""
                      }`}
                    />
                    {formErrors.expiryDate && (
                      <p className="mt-1 text-xs text-red-500">
                        {formErrors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      CVC
                    </Label>
                    <Input
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                      className={`border-0 bg-gray-50 focus:ring-1 focus:ring-blue-500 ${
                        formErrors.cvc ? "ring-1 ring-red-500" : ""
                      }`}
                    />
                    {formErrors.cvc && (
                      <p className="mt-1 text-xs text-red-500">
                        {formErrors.cvc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bank Transfer Details */}
            {selectedMethod === "bank" && (
              <Card className="border-0 bg-gray-50">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      Bank Transfer Details
                    </h4>
                    <Building className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Bank:</p>
                      <p className="text-sm font-medium text-gray-900">
                        Emirates NBD
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Account Name:</p>
                      <p className="text-sm font-medium text-gray-900">
                        Property Harmony
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">IBAN:</p>
                      <p className="text-sm font-medium text-gray-900">
                        AE123456789012345678901
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Reference:</p>
                      <p className="text-sm font-medium text-gray-900">
                        {expense.expenseId}
                      </p>
                    </div>
                  </div>

                  <Card className="border border-yellow-200 bg-yellow-50">
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 mt-0.5 text-yellow-600" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-yellow-800">
                            Important Notice
                          </p>
                          <p className="text-sm text-yellow-700">
                            Please use the reference number when making the bank
                            transfer. After transfer, click 'Confirm Payment' to
                            mark as pending verification.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isProcessing}
                className="text-gray-700 bg-gray-100 border-0 hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing}
                className="myButton"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Confirm Payment"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const handlePayExpense = (expense) => {
    setSelectedExpense(expense);
    setShowPaymentModal(true);
  };

  const handleProcessPayment = (paymentDetails) => {
    setPaymentData(paymentDetails);
    setShowPaymentModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmPayment = () => {
    // Here you would typically call an API to process the payment
    console.log("Processing payment:", paymentData);

    // Simulate payment processing
    setTimeout(() => {
      setShowConfirmationModal(false);
      setPaymentData(null);
      setSelectedExpense(null);

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = `Payment of ${paymentData?.amount?.toLocaleString()} processed successfully!`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);

      // Refresh the expenses list
      if (onRefresh) onRefresh();
    }, 1500);
  };
  // Payment Confirmation Modal Component
  const PaymentConfirmationModal = () => (
    <Dialog
      open={showConfirmationModal}
      onOpenChange={setShowConfirmationModal}
    >
      <DialogContent className="border-0 sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-blue-900">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            Confirm Payment
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <Card className="border-0 bg-blue-50">
            <div className="p-4">
              <div className="space-y-3">
                <h3 className="font-medium text-blue-900">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Expense:</span>
                    <span className="text-sm font-medium text-blue-900">
                      {selectedExpense?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Amount:</span>
                    <div className="flex items-center text-lg font-bold text-blue-700">
                      <DirhamSvg size={16} className="mr-1" />
                      {paymentData?.amount?.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">
                      Payment Method:
                    </span>
                    <span className="text-sm font-medium text-blue-900 capitalize">
                      {paymentData?.method === "card"
                        ? "Credit Card"
                        : "Bank Transfer"}
                    </span>
                  </div>
                  {paymentData?.cardDetails && (
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Card:</span>
                      <span className="text-sm font-medium text-blue-900">
                        **** **** **** {paymentData.cardDetails.lastFourDigits}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-yellow-200 bg-yellow-50">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 text-yellow-600" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-yellow-800">
                    Confirmation Required
                  </p>
                  <p className="text-sm text-yellow-700">
                    Please confirm that you want to process this payment. This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmationModal(false)}
              className="text-gray-700 bg-gray-100 border-0 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmPayment} className="myButton">
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ReceiptText className="w-6 h-6 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Expense Payments
            </h1>
            <p className="text-sm text-gray-600">
              Manage and process property expense payments
            </p>
          </div>
        </div>
        <Button onClick={() => onAddExpense?.()} className="myButton">
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div> */}

      {/* Stats */}
      <ExpenseStats stats={stats || {}} isLoading={isLoading} />

      {/* Search and Filter */}
      <Card className="w-full bg-white border-0 shadow-sm">
        <div className="px-4">
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 text-gray-400 left-3 top-2.5" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full text-sm bg-gray-100 border-0 rounded-lg pl-9 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Filter Button */}
              <Button
                variant="outline"
                onClick={onShowFilters}
                className={`myButton flex items-center gap-2 px-3 py-2 text-sm rounded-lg border-0 hover:bg-blue-100 ${
                  showFilters
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50 text-white"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>

              {/* Refresh Button */}
              <Button
                variant="outline"
                onClick={onRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 border-0 rounded-lg myButton bg-gray-50 hover:bg-blue-100"
              >
                <RefreshCcw
                  className={`w-4 h-4 ${
                    isLoading ? "animate-spin text-blue-500" : "text-gray-100"
                  }`}
                />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 border-t border-gray-100">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {/* Status Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Status
                </label>
                <select
                  value={filters?.status || "all"}
                  onChange={(e) =>
                    onFilterChange({ ...filters, status: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border-0 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Category
                </label>
                <select
                  value={filters?.category || "all"}
                  onChange={(e) =>
                    onFilterChange({ ...filters, category: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border-0 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filters */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  From Date
                </label>
                <input
                  type="date"
                  value={filters?.fromDate || "2025-06-01"}
                  onChange={(e) =>
                    onFilterChange({ ...filters, fromDate: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border-0 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  To Date
                </label>
                <input
                  type="date"
                  value={filters?.toDate || "2025-06-30"}
                  onChange={(e) =>
                    onFilterChange({ ...filters, toDate: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border-0 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </Card>
      {/* Expenses Table */}
      <Card className="border-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 z-10 bg-white shadow-sm">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Details
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Property
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Due Date
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors duration-150`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {expense.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {expense.description}
                      </div>
                      {expense.vendor && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          {expense.vendor}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900">
                        {expense.propertyName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {expense.propertyAddress}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                      {expense.category.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center font-medium text-gray-900">
                      <DirhamSvg size={13} className="mr-1" />
                      {expense.amount.toLocaleString()}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                        expense.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : expense.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : expense.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
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

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {new Date(expense.dueDate).toLocaleDateString()}
                      </div>
                      {expense.paidDate && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          Paid on{" "}
                          {new Date(expense.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewExpense(expense)}
                        className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditExpense(expense)}
                        className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {expense.receiptUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      {(expense.status === "pending" ||
                        expense.status === "overdue") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePayExpense(expense)}
                          className="p-1 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        >
                          <Wallet className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <Receipt className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="text-gray-500">No expenses found</div>
                      <Button
                        onClick={() => onAddExpense?.()}
                        className="myButton"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Expense
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Modal */}
      {selectedExpense && (
        <ExpensePaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedExpense(null);
          }}
          expense={selectedExpense}
          onProcessPayment={handleProcessPayment}
        />
      )}

      {/* Payment Confirmation Modal */}
      {showConfirmationModal && <PaymentConfirmationModal />}
    </div>
  );
};

export default PaymentExpensesTab;
