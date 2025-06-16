import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  DollarSign,
  Calendar,
  User,
  Home,
  CreditCard,
  FileText,
  Download,
  Edit,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Receipt,
  MapPin,
  Phone,
  Mail,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  formatPaymentDate,
  getPaymentStatusColor,
} from "@/data/landlord/payments/data";
import DirhamSvg from "@/assets/Dirham";
import PaymentProcessModal from "./PaymentProcessModal";

const PaymentDetailsModal = ({
  isOpen,
  onClose,
  payment,
  onEdit,
  onDownloadReceipt,
  onSendReminder,
  onProcessPayment,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!payment) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "overdue":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "partial":
        return <DirhamSvg className="w-5 h-5 text-orange-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      overdue: "bg-red-100 text-red-800 border-red-200",
      partial: "bg-orange-100 text-orange-800 border-orange-200",
      cancelled: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium border rounded-full ${
          colors[status] || colors.pending
        }`}
      >
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "bank_transfer":
        return "🏦";
      case "cash":
        return "💵";
      case "check":
        return "📝";
      case "online":
      case "card":
        return "💳";
      case "digital_wallet":
        return "📱";
      default:
        return "💳";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-5xl max-h-[90vh] overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3 mt-10 text-xl font-bold text-gray-900">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              Payment Details
            </div>
            <div className="flex items-center space-x-2">
              {payment.status === "pending" && (
                <button
                  onClick={() => onSendReminder && onSendReminder(payment)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-orange-700 bg-orange-100 rounded-lg hover:bg-orange-200"
                >
                  <Send size={16} />
                  Send Reminder
                </button>
              )}
              {payment.receiptGenerated && (
                <button
                  onClick={() =>
                    onDownloadReceipt && onDownloadReceipt(payment)
                  }
                  className="flex items-center gap-2 px-3 py-2 text-sm text-green-700 bg-green-100 rounded-lg hover:bg-green-200"
                >
                  <Download size={16} />
                  Download Receipt
                </button>
              )}
              <button
                onClick={() => onEdit && onEdit(payment)}
                className="flex items-center gap-2 px-3 py-2 text-sm myButton"
              >
                <Edit size={16} />
                Edit Payment
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Overview */}
          <Card className="p-6 border-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Overview
                </h3>
                <p className="text-sm text-gray-600">
                  Payment ID: {payment.paymentId}
                </p>
              </div>
              {getStatusBadge(payment.status)}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {formatCurrency(payment.amount)}
                </div>
                <div className="text-sm text-gray-600">Payment Amount</div>
              </div>

              {payment.lateFee > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    +{formatCurrency(payment.lateFee)}
                  </div>
                  <div className="text-sm text-gray-600">Late Fee</div>
                </div>
              )}

              {payment.discount > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    -{formatCurrency(payment.discount)}
                  </div>
                  <div className="text-sm text-gray-600">Discount</div>
                </div>
              )}

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(payment.netAmount)}
                </div>
                <div className="text-sm text-gray-600">Net Amount</div>
              </div>
            </div>
          </Card>

          {/* Tenant Information */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <User className="w-5 h-5 text-blue-600" />
              Tenant Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {payment.tenantName}
                    </div>
                    <div className="text-sm text-gray-600">Tenant</div>
                  </div>
                </div>

                <div className="flex items-center ml-12 space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {payment.tenantEmail}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Property Information */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <Home className="w-5 h-5 text-blue-600" />
              Property Information
            </h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {payment.propertyName}
                  </div>
                  <div className="text-sm text-gray-600">Property</div>
                </div>
              </div>

              <div className="flex items-center ml-12 space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {payment.propertyAddress}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Details */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Payment Details
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Type:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {payment.paymentType.replace("_", " ").toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Method:</span>
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <span>{getPaymentMethodIcon(payment.paymentMethod)}</span>
                    {payment.paymentMethod.replace("_", " ").toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Due Date:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatPaymentDate(payment.dueDate)}
                  </span>
                </div>

                {payment.paidDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Paid Date:</span>
                    <span className="text-sm font-medium text-green-600">
                      {formatPaymentDate(payment.paidDate)}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {payment.transactionId && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Transaction ID:
                    </span>
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {payment.transactionId}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Currency:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {payment.currency}
                  </span>
                </div>

                {payment.paymentPeriod && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Period From:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatPaymentDate(payment.paymentPeriod.from)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Period To:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatPaymentDate(payment.paymentPeriod.to)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* Description and Notes */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <FileText className="w-5 h-5 text-blue-600" />
              Description & Notes
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="p-3 text-sm text-gray-900 rounded-lg bg-gray-50">
                  {payment.description}
                </p>
              </div>

              {payment.notes && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <p className="p-3 text-sm text-gray-900 rounded-lg bg-gray-50">
                    {payment.notes}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Timestamps */}
          <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <Calendar className="w-5 h-5 text-blue-600" />
              Record Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Created:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(payment.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Updated:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(payment.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Add Pay Now button for pending/overdue payments */}
          {(payment.status === "pending" || payment.status === "overdue") && (
            <Button
              onClick={() => setShowPaymentModal(true)}
              className="w-full gap-2 mt-4"
            >
              <Wallet className="w-4 h-4" />
              Pay Now
            </Button>
          )}
        </div>
      </DialogContent>

      {/* Payment Processing Modal */}
      <PaymentProcessModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        payment={payment}
        onProcessPayment={onProcessPayment}
      />
    </Dialog>
  );
};

export default PaymentDetailsModal;
