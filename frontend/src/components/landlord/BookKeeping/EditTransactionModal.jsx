import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  transactionCategories, 
  paymentMethods 
} from "@/data/landlord/bookkeeping/data";
import { tenantData } from "@/data/landlord/tenant/data";
import { Calendar, X } from "lucide-react";

const EditTransactionModal = ({ open, onClose, transaction, onUpdateTransaction }) => {
  const [form, setForm] = useState({
    date: "",
    propertyName: "",
    propertyAddress: "",
    description: "",
    category: "",
    amount: "",
    type: "Income",
    paymentMethod: "",
    receiptNumber: "",
    tenantName: "",
    vendorName: "",
    notes: "",
  });

  // Get all tenants for dropdown
  const allTenants = tenantData.flatMap(group => group.tenantsList);

  // Get categories based on transaction type
  const availableCategories = form.type === "Income" 
    ? transactionCategories.income 
    : transactionCategories.expense;

  // Populate form when transaction changes
  useEffect(() => {
    if (transaction) {
      setForm({
        date: transaction.date || "",
        propertyName: transaction.propertyName || "",
        propertyAddress: transaction.propertyAddress || "",
        description: transaction.description || "",
        category: transaction.category || "",
        amount: transaction.amount?.toString() || "",
        type: transaction.type || "Income",
        paymentMethod: transaction.paymentMethod || "",
        receiptNumber: transaction.receiptNumber || "",
        tenantName: transaction.tenantName || "",
        vendorName: transaction.vendorName || "",
        notes: transaction.notes || "",
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Auto-populate tenant details when tenant is selected
    if (name === "tenantName" && value) {
      const selectedTenant = allTenants.find(t => t.name === value);
      if (selectedTenant) {
        setForm(prev => ({
          ...prev,
          propertyName: selectedTenant.address.split(" Unit")[0] || selectedTenant.address,
          propertyAddress: selectedTenant.address,
        }));
      }
    }

    // Reset category when transaction type changes
    if (name === "type") {
      setForm(prev => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdateTransaction && transaction) {
      const updatedTransaction = {
        ...transaction,
        ...form,
        amount: parseFloat(form.amount),
        lastUpdated: new Date().toISOString().split('T')[0],
        tags: [form.category.toLowerCase().replace(/\s+/g, '-'), form.type.toLowerCase()]
      };
      onUpdateTransaction(updatedTransaction);
    }
    onClose();
  };

  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Transaction
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 transition-colors rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Transaction Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Transaction Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Income"
                    checked={form.type === "Income"}
                    onChange={handleChange}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-green-700">Income</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Expense"
                    checked={form.type === "Expense"}
                    onChange={handleChange}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-red-700">Expense</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description *
              </label>
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of the transaction"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category and Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category...</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Amount *
                </label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Property Selection */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Property *
              </label>
              <input
                name="propertyName"
                value={form.propertyName}
                onChange={handleChange}
                placeholder="Property name"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tenant/Vendor Selection */}
            {form.type === "Income" ? (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tenant (Optional)
                </label>
                <select
                  name="tenantName"
                  value={form.tenantName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select tenant...</option>
                  {allTenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.name}>
                      {tenant.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Vendor/Payee (Optional)
                </label>
                <input
                  name="vendorName"
                  value={form.vendorName}
                  onChange={handleChange}
                  placeholder="Vendor or payee name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Date and Payment Method */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date *
                </label>
                <div className="relative">
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Method *
                </label>
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select method...</option>
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Receipt Number */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Receipt/Invoice Number (Optional)
              </label>
              <input
                name="receiptNumber"
                value={form.receiptNumber}
                onChange={handleChange}
                placeholder="Receipt or invoice number"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional notes or comments"
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
              >
                Update Transaction
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionModal;
