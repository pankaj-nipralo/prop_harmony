import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Plus,
  History,
  Building,
  User,
  Shield,
  Banknote,
  Smartphone,
  Receipt,
  Eye,
  Trash2,
  Edit,
} from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const TenantPaymentMaster = () => {
  // Payment state
  const [currentBalance, setCurrentBalance] = useState(1250.0);
  const [nextDueDate] = useState("2024-07-01");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Modal states
  const [payNowModal, setPayNowModal] = useState(false);
  const [paymentHistoryModal, setPaymentHistoryModal] = useState(false);
  const [paymentMethodsModal, setPaymentMethodsModal] = useState(false);
  const [addPaymentMethodModal, setAddPaymentMethodModal] = useState(false);
  const [confirmPaymentModal, setConfirmPaymentModal] = useState(false);
  const [receiptModal, setReceiptModal] = useState({
    open: false,
    payment: null,
  });

  // Payment data
  const [paymentMethods] = useState([
    {
      id: 1,
      type: "Credit Card",
      name: "Visa ending in 4532",
      icon: CreditCard,
      isDefault: true,
    },
    {
      id: 2,
      type: "Bank Transfer",
      name: "Chase Bank ****1234",
      icon: Banknote,
      isDefault: false,
    },
    {
      id: 3,
      type: "PayPal",
      name: "john.doe@email.com",
      icon: Smartphone,
      isDefault: false,
    },
  ]);

  const [paymentHistory] = useState([
    {
      id: 1,
      date: "2024-06-01",
      amount: 1250.0,
      method: "Credit Card",
      status: "Completed",
      reference: "PAY-2024-001",
      property: "Sunset Apartments #4B",
    },
    {
      id: 2,
      date: "2024-05-01",
      amount: 1250.0,
      method: "Bank Transfer",
      status: "Completed",
      reference: "PAY-2024-002",
      property: "Sunset Apartments #4B",
    },
    {
      id: 3,
      date: "2024-04-01",
      amount: 1250.0,
      method: "Credit Card",
      status: "Completed",
      reference: "PAY-2024-003",
      property: "Sunset Apartments #4B",
    },
    {
      id: 4,
      date: "2024-03-01",
      amount: 1250.0,
      method: "PayPal",
      status: "Completed",
      reference: "PAY-2024-004",
      property: "Sunset Apartments #4B",
    },
  ]);

  // Calculate stats
  const totalPaidThisYear = paymentHistory
    .filter(
      (payment) =>
        payment.date.startsWith("2024") && payment.status === "Completed"
    )
    .reduce((total, payment) => total + payment.amount, 0);

  const getPaymentStatus = () => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);

    if (currentBalance === 0)
      return {
        status: "Paid",
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    if (today > dueDate)
      return {
        status: "Overdue",
        color: "text-red-600",
        bgColor: "bg-red-100",
      };
    if (today.getTime() === dueDate.getTime())
      return {
        status: "Due Today",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
      };
    return {
      status: "Upcoming",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    };
  };

  const paymentStatus = getPaymentStatus();

  // Handler functions
  const handlePayNow = () => {
    setPaymentAmount(currentBalance.toString());
    setPayNowModal(true);
  };

  const handlePaymentSubmit = () => {
    if (!paymentAmount || !selectedPaymentMethod) {
      alert("Please fill in all required fields");
      return;
    }
    setPayNowModal(false);
    setConfirmPaymentModal(true);
  };

  const handleConfirmPayment = async () => {
    setIsProcessingPayment(true);
    setConfirmPaymentModal(false);

    // Simulate payment processing
    setTimeout(() => {
      const newBalance = currentBalance - parseFloat(paymentAmount);
      setCurrentBalance(Math.max(0, newBalance));
      setIsProcessingPayment(false);
      setPaymentAmount("");
      setSelectedPaymentMethod("");

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = `Payment of $${paymentAmount} processed successfully!`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
    }, 2000);
  };

  const handleViewReceipt = (payment) => {
    setReceiptModal({ open: true, payment });
  };

  const handleDownloadReceipt = (payment) => {
    // Simulate receipt download
    const receiptContent = `
      PAYMENT RECEIPT
      ================
      Reference: ${payment.reference}
      Date: ${payment.date}
      Amount: $${payment.amount.toFixed(2)}
      Method: ${payment.method}
      Property: ${payment.property}
      Status: ${payment.status}
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${payment.reference}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rent Payment</h1>
            <p className="text-gray-600">
              Manage your rent payments and payment history
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePayNow}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg cursor-pointer myButton hover:bg-blue-700"
          >
            {/* <DollarSign size={16} /> */}
            <DirhamSvg size={16} color1="#ffffff" />
            Pay Now
          </button>
          <button
            onClick={() => setPaymentHistoryModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors bg-white border border-blue-600 rounded-lg cursor-pointer hover:bg-blue-50"
          >
            <History size={16} />
            Payment History
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-6 my-10 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center gap-4 ">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DirhamSvg className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Current Balance
              </p>
              <span className="text-2xl font-bold text-gray-900">
                {/* <DirhamSvg size={20} className="mb-1.5 mr-1" /> */}
                {currentBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Next Due Date</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Date(nextDueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center gap-4">
            <div className={`p-3 ${paymentStatus.bgColor} rounded-lg`}>
              {paymentStatus.status === "Paid" ? (
                <CheckCircle className={`w-6 h-6 ${paymentStatus.color}`} />
              ) : paymentStatus.status === "Overdue" ? (
                <AlertCircle className={`w-6 h-6 ${paymentStatus.color}`} />
              ) : (
                <Clock className={`w-6 h-6 ${paymentStatus.color}`} />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Payment Status
              </p>
              <p className={`text-2xl font-bold ${paymentStatus.color}`}>
                {paymentStatus.status}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Receipt className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Paid This Year
              </p>
              <p className="text-2xl font-bold text-gray-900">
                <DirhamSvg size={20} className="mb-1.5 mr-1" />
                ${totalPaidThisYear.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Rent Due Section */}
      {currentBalance > 0 && (
        <Card className="p-6 border-0 border-l-4 shadow-sm border-l-orange-400 bg-orange-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-orange-600" />
              <div>
                <h3 className="text-lg font-semibold text-orange-800">
                  Rent Payment Due
                </h3>
                <p className="text-orange-700">
                  Your rent payment of{" "}
                  <span className="font-bold">
                    ${currentBalance.toFixed(2)}
                  </span>{" "}
                  is due on{" "}
                  <span className="font-bold">
                    {new Date(nextDueDate).toLocaleDateString()}
                  </span>
                </p>
                {new Date() > new Date(nextDueDate) && (
                  <p className="mt-1 text-sm text-red-600">
                    ⚠️ This payment is overdue. Late fees may apply.
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handlePayNow}
              className="px-6 py-3 font-medium text-white transition-colors bg-orange-600 rounded-lg myButton hover:bg-orange-700"
            >
              Pay Now
            </button>
          </div>
        </Card>
      )}

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 gap-6 my-10 md:grid-cols-3">
        <Card
          className="p-6 transition-shadow bg-white border-0 shadow-sm cursor-pointer hover:shadow-md"
          onClick={() => setPaymentMethodsModal(true)}
        >
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-blue-100 rounded-full">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Payment Methods
            </h3>
            <p className="text-sm text-gray-600">
              Manage your saved payment methods
            </p>
          </div>
        </Card>

        <Card
          className="p-6 transition-shadow bg-white border-0 shadow-sm cursor-pointer hover:shadow-md"
          onClick={() => setPaymentHistoryModal(true)}
        >
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-green-100 rounded-full">
              <History className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Payment History
            </h3>
            <p className="text-sm text-gray-600">View all your past payments</p>
          </div>
        </Card>

        <Card
          className="p-6 transition-shadow bg-white border-0 shadow-sm cursor-pointer hover:shadow-md"
          onClick={handlePayNow}
        >
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-purple-100 rounded-full">
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Make Payment
            </h3>
            <p className="text-sm text-gray-600">
              Pay your rent quickly and securely
            </p>
          </div>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card className="bg-white border-0 shadow-sm">
        <div className="p-6 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Payments
            </h3>
            <button
              onClick={() => setPaymentHistoryModal(true)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          {paymentHistory.slice(0, 3).map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(payment.date).toLocaleDateString()} •{" "}
                    {payment.method}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  {payment.status}
                </span>
                <button
                  onClick={() => handleViewReceipt(payment)}
                  className="p-1 text-gray-500 transition-colors hover:text-blue-600"
                  title="View Receipt"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleDownloadReceipt(payment)}
                  className="p-1 text-gray-500 transition-colors hover:text-green-600"
                  title="Download Receipt"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pay Now Modal */}
      <Dialog open={payNowModal} onOpenChange={setPayNowModal}>
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Make Payment
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePaymentSubmit();
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Payment Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select payment method</option>
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name} {method.isDefault ? "(Default)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Secure Payment
                    </span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Your payment information is encrypted and secure. We never
                    store your card details.
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setPayNowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 myButton"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Payment Modal */}
      <Dialog open={confirmPaymentModal} onOpenChange={setConfirmPaymentModal}>
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Confirm Payment
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="mb-3 font-medium text-gray-900">
                  Payment Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">${paymentAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">
                      {
                        paymentMethods.find(
                          (m) => m.id.toString() === selectedPaymentMethod
                        )?.name
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property:</span>
                    <span className="font-medium">Sunset Apartments #4B</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Please confirm your payment details before proceeding.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setConfirmPaymentModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 myButton"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment History Modal */}
      <Dialog open={paymentHistoryModal} onOpenChange={setPaymentHistoryModal}>
        <DialogContent className="w-full bg-white border-0 rounded-lg shadow-xl md:max-w-7xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Payment History
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Method
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {payment.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {payment.reference}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewReceipt(payment)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Receipt"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDownloadReceipt(payment)}
                            className="text-green-600 hover:text-green-900"
                            title="Download Receipt"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setPaymentHistoryModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Methods Modal */}
      <Dialog open={paymentMethodsModal} onOpenChange={setPaymentMethodsModal}>
        <DialogContent className="w-full max-w-2xl bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Payment Methods
              </h2>
              <button
                onClick={() => setAddPaymentMethodModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg myButton hover:bg-blue-600"
              >
                <Plus size={16} />
                Add Method
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <Card key={method.id} className="p-4 border-0 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {method.name}
                          </p>
                          <p className="text-sm text-gray-600">{method.type}</p>
                          {method.isDefault && (
                            <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-gray-500 transition-colors rounded hover:text-blue-600 hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 text-gray-500 transition-colors rounded hover:text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setPaymentMethodsModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Modal */}
      <Dialog
        open={receiptModal.open}
        onOpenChange={() => setReceiptModal({ open: false, payment: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Payment Receipt
            </h2>

            {receiptModal.payment && (
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="mb-4 text-center">
                    <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">
                      Property Harmony
                    </h3>
                    <p className="text-sm text-gray-600">Payment Receipt</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <span className="font-medium">
                        {receiptModal.payment.reference}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {new Date(
                          receiptModal.payment.date
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">
                        ${receiptModal.payment.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium">
                        {receiptModal.payment.method}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property:</span>
                      <span className="font-medium">
                        {receiptModal.payment.property}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        {receiptModal.payment.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => handleDownloadReceipt(receiptModal.payment)}
                    className="flex items-center gap-2 px-4 py-2 mx-auto text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                  >
                    <Download size={16} />
                    Download Receipt
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setReceiptModal({ open: false, payment: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing Payment Overlay */}
      {isProcessingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/20">
          <Card className="p-8 bg-white border-0 rounded-lg shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Processing Payment
              </h3>
              <p className="text-gray-600">
                Please wait while we process your payment...
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TenantPaymentMaster;
