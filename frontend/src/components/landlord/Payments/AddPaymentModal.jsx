import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X, 
  Calendar,
  User,
  Home,
  CreditCard,
  FileText,
  Save,
  AlertCircle,
} from "lucide-react";
import {
  paymentTypes,
  paymentMethods,
  formatCurrency,
} from "@/data/landlord/payments/data";
import { tenantData } from "@/data/landlord/tenant/data";
import DirhamSvg from "@/assets/Dirham";

const AddPaymentModal = ({
  isOpen,
  onClose,
  onSave,
  editingPayment = null,
}) => {
  const [formData, setFormData] = useState({
    tenantId: "",
    tenantName: "",
    tenantEmail: "",
    propertyId: "",
    propertyName: "",
    propertyAddress: "",
    amount: "",
    paymentType: "rent",
    paymentMethod: "bank_transfer",
    status: "paid",
    dueDate: "",
    paidDate: "",
    transactionId: "",
    description: "",
    notes: "",
    lateFee: "",
    discount: "",
    paymentPeriodFrom: "",
    paymentPeriodTo: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get all tenants from tenant data
  const allTenants = tenantData[0]?.tenantsList || [];

  useEffect(() => {
    if (editingPayment) {
      setFormData({
        tenantId: editingPayment.tenantId || "",
        tenantName: editingPayment.tenantName || "",
        tenantEmail: editingPayment.tenantEmail || "",
        propertyId: editingPayment.propertyId || "",
        propertyName: editingPayment.propertyName || "",
        propertyAddress: editingPayment.propertyAddress || "",
        amount: editingPayment.amount?.toString() || "",
        paymentType: editingPayment.paymentType || "rent",
        paymentMethod: editingPayment.paymentMethod || "bank_transfer",
        status: editingPayment.status || "paid",
        dueDate: editingPayment.dueDate
          ? editingPayment.dueDate.split("T")[0]
          : "",
        paidDate: editingPayment.paidDate
          ? editingPayment.paidDate.split("T")[0]
          : "",
        transactionId: editingPayment.transactionId || "",
        description: editingPayment.description || "",
        notes: editingPayment.notes || "",
        lateFee: editingPayment.lateFee?.toString() || "",
        discount: editingPayment.discount?.toString() || "",
        paymentPeriodFrom: editingPayment.paymentPeriod?.from || "",
        paymentPeriodTo: editingPayment.paymentPeriod?.to || "",
      });
    } else {
      // Reset form for new payment
      const today = new Date().toISOString().split("T")[0];
      setFormData({
        tenantId: "",
        tenantName: "",
        tenantEmail: "",
        propertyId: "",
        propertyName: "",
        propertyAddress: "",
        amount: "",
        paymentType: "rent",
        paymentMethod: "bank_transfer",
        status: "paid",
        dueDate: today,
        paidDate: today,
        transactionId: "",
        description: "",
        notes: "",
        lateFee: "",
        discount: "",
        paymentPeriodFrom: "",
        paymentPeriodTo: "",
      });
    }
    setErrors({});
  }, [editingPayment, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Auto-populate tenant info when tenant is selected
    if (field === "tenantId" && value) {
      const selectedTenant = allTenants.find((t) => t.id.toString() === value);
      if (selectedTenant) {
        setFormData((prev) => ({
          ...prev,
          tenantName: selectedTenant.name,
          tenantEmail: selectedTenant.email,
          propertyName: selectedTenant.address,
          propertyAddress: selectedTenant.address,
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tenantId) newErrors.tenantId = "Please select a tenant";
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!formData.dueDate) newErrors.dueDate = "Please select a due date";
    if (!formData.description.trim())
      newErrors.description = "Please enter a description";

    // If status is paid, require paid date
    if (formData.status === "paid" && !formData.paidDate) {
      newErrors.paidDate = "Please enter the paid date";
    }

    // If payment method requires transaction ID
    if (
      (formData.paymentMethod === "bank_transfer" ||
        formData.paymentMethod === "online") &&
      formData.status === "paid" &&
      !formData.transactionId.trim()
    ) {
      newErrors.transactionId =
        "Transaction ID is required for this payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const paymentData = {
        ...formData,
        amount: parseFloat(formData.amount),
        lateFee: parseFloat(formData.lateFee) || 0,
        discount: parseFloat(formData.discount) || 0,
        netAmount:
          parseFloat(formData.amount) +
          (parseFloat(formData.lateFee) || 0) -
          (parseFloat(formData.discount) || 0),
        paymentPeriod: {
          from: formData.paymentPeriodFrom,
          to: formData.paymentPeriodTo,
        },
        currency: "AED",
        receiptGenerated: formData.status === "paid",
        receiptUrl:
          formData.status === "paid" ? `/receipts/PAY-${Date.now()}.pdf` : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await onSave(paymentData);
      onClose();
    } catch (error) {
      console.error("Error saving payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateNetAmount = () => {
    const amount = parseFloat(formData.amount) || 0;
    const lateFee = parseFloat(formData.lateFee) || 0;
    const discount = parseFloat(formData.discount) || 0;
    return amount + lateFee - discount;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-5xl max-h-[90vh] overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <div className="p-2 bg-blue-500 rounded-lg">
              <DirhamSvg className="w-6 h-6 text-white" />
            </div>
            {editingPayment ? "Edit Payment" : "Record New Payment"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tenant Selection */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <User className="w-5 h-5 text-blue-600" />
              Tenant Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select Tenant *
                </label>
                <select
                  value={formData.tenantId}
                  onChange={(e) =>
                    handleInputChange("tenantId", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.tenantId ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={editingPayment}
                >
                  <option value="">Choose a tenant...</option>
                  {allTenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name} - {tenant.address}
                    </option>
                  ))}
                </select>
                {errors.tenantId && (
                  <p className="mt-1 text-sm text-red-600">{errors.tenantId}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tenant Email
                </label>
                <input
                  type="email"
                  value={formData.tenantEmail}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </Card>

          {/* Property Information */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <Home className="w-5 h-5 text-blue-600" />
              Property Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Property Name
                </label>
                <input
                  type="text"
                  value={formData.propertyName}
                  onChange={(e) =>
                    handleInputChange("propertyName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter property name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Property Address
                </label>
                <input
                  type="text"
                  value={formData.propertyAddress}
                  onChange={(e) =>
                    handleInputChange("propertyAddress", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter property address"
                />
              </div>
            </div>
          </Card>

          {/* Payment Details */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Payment Details
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Amount *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Type *
                </label>
                <select
                  value={formData.paymentType}
                  onChange={(e) =>
                    handleInputChange("paymentType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {paymentTypes
                    .filter((type) => type.value !== "all")
                    .map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Method *
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    handleInputChange("paymentMethod", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {paymentMethods
                    .filter((method) => method.value !== "all")
                    .map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Late Fee
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.lateFee}
                  onChange={(e) => handleInputChange("lateFee", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Discount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) =>
                    handleInputChange("discount", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Net Amount
                </label>
                <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(calculateNetAmount())}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Status and Dates */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <Calendar className="w-5 h-5 text-blue-600" />
              Status & Dates
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="partial">Partial</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Due Date *
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.dueDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Paid Date {formData.status === "paid" && "*"}
                </label>
                <input
                  type="date"
                  value={formData.paidDate}
                  onChange={(e) =>
                    handleInputChange("paidDate", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.paidDate ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={formData.status !== "paid"}
                />
                {errors.paidDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.paidDate}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Period From
                </label>
                <input
                  type="date"
                  value={formData.paymentPeriodFrom}
                  onChange={(e) =>
                    handleInputChange("paymentPeriodFrom", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment Period To
                </label>
                <input
                  type="date"
                  value={formData.paymentPeriodTo}
                  onChange={(e) =>
                    handleInputChange("paymentPeriodTo", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </Card>

          {/* Transaction Details */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <FileText className="w-5 h-5 text-blue-600" />
              Transaction Details
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={formData.transactionId}
                  onChange={(e) =>
                    handleInputChange("transactionId", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.transactionId ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter transaction ID"
                />
                {errors.transactionId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.transactionId}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description *
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter payment description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any additional notes..."
              />
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4" />
              <span>* Required fields</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 myButton"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {editingPayment ? "Update Payment" : "Save Payment"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentModal;
