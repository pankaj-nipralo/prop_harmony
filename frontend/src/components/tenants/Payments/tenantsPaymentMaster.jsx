import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { CreditCard, History, Banknote, Smartphone } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";
import PaymentStats from "./PaymentStats";
import PaymentDueAlert from "./PaymentDueAlert";
import QuickActions from "./QuickActions";
import RecentPayments from "./RecentPayments";
import PayNowModal from "./PayNowModal";
import ConfirmPaymentModal from "./ConfirmPaymentModal";
import PaymentHistoryModal from "./PaymentHistoryModal";
import PaymentMethodsModal from "./PaymentMethodsModal";
import ReceiptModal from "./ReceiptModal";

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

  console.log(addPaymentMethodModal);

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
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <DirhamSvg size={16} color1="#ffffff" />
            Pay Now
          </button>
          <button
            onClick={() => setPaymentHistoryModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors bg-white border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            <History size={16} />
            Payment History
          </button>
        </div>
      </div>

      <PaymentStats
        currentBalance={currentBalance}
        nextDueDate={nextDueDate}
        totalPaidThisYear={totalPaidThisYear}
        paymentStatus={paymentStatus}
      />

      <PaymentDueAlert
        currentBalance={currentBalance}
        nextDueDate={nextDueDate}
        handlePayNow={handlePayNow}
      />

      <QuickActions
        setPaymentMethodsModal={setPaymentMethodsModal}
        setPaymentHistoryModal={setPaymentHistoryModal}
        handlePayNow={handlePayNow}
      />

      <RecentPayments
        paymentHistory={paymentHistory}
        setPaymentHistoryModal={setPaymentHistoryModal}
        handleViewReceipt={handleViewReceipt}
        handleDownloadReceipt={handleDownloadReceipt}
      />

      {/* Modals */}
      <Dialog open={payNowModal} onOpenChange={setPayNowModal}>
        <PayNowModal
          paymentAmount={paymentAmount}
          setPaymentAmount={setPaymentAmount}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          paymentMethods={paymentMethods}
          handlePaymentSubmit={handlePaymentSubmit}
          setPayNowModal={setPayNowModal}
        />
      </Dialog>

      <Dialog open={confirmPaymentModal} onOpenChange={setConfirmPaymentModal}>
        <ConfirmPaymentModal
          paymentAmount={paymentAmount}
          selectedPaymentMethod={selectedPaymentMethod}
          paymentMethods={paymentMethods}
          handleConfirmPayment={handleConfirmPayment}
          setConfirmPaymentModal={setConfirmPaymentModal}
        />
      </Dialog>

      <Dialog open={paymentHistoryModal} onOpenChange={setPaymentHistoryModal}>
        <PaymentHistoryModal
          paymentHistory={paymentHistory}
          setPaymentHistoryModal={setPaymentHistoryModal}
          handleViewReceipt={handleViewReceipt}
          handleDownloadReceipt={handleDownloadReceipt}
        />
      </Dialog>

      <Dialog open={paymentMethodsModal} onOpenChange={setPaymentMethodsModal}>
        <PaymentMethodsModal
          paymentMethods={paymentMethods}
          setPaymentMethodsModal={setPaymentMethodsModal}
          setAddPaymentMethodModal={setAddPaymentMethodModal}
        />
      </Dialog>

      <Dialog
        open={receiptModal.open}
        onOpenChange={() => setReceiptModal({ open: false, payment: null })}
      >
        <ReceiptModal
          receiptModal={receiptModal}
          setReceiptModal={setReceiptModal}
          handleDownloadReceipt={handleDownloadReceipt}
        />
      </Dialog>

      {/* Processing Payment Overlay */}
      {isProcessingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/20">
          <div className="p-8 bg-white border-0 rounded-lg shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Processing Payment
              </h3>
              <p className="text-gray-600">
                Please wait while we process your payment...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantPaymentMaster;
