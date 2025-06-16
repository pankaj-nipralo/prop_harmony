import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Calendar,
  Building,
  User,
  Receipt,
  CreditCard,
  FileText,
  Tag,
  Clock,
} from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const ViewTransactionModal = ({ open, onClose, transaction }) => {
  if (!transaction) return null;

  const getTypeStyle = (type) => {
    return type === "Income"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl md:max-w-4xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Transaction Details
            </h2>
          </div>

          <div className="space-y-6">
            {/* Transaction Type and Amount */}
            <Card className="p-4 border-0 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <div
                      className={`text-2xl flex items-center gap-2 font-bold ${
                        transaction.type === "Income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    > 
                      <DirhamSvg size={20} color1="" className="mt-0.5" />
                      <p>{transaction.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getTypeStyle(
                    transaction.type
                  )}`}
                >
                  {transaction.type}
                </span>
              </div>
            </Card>

            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 mt-1 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Date</p>
                  <p className="text-gray-900">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 mt-1 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Category</p>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                    {transaction.category}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 mt-1 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Property</p>
                  <p className="text-gray-900">{transaction.propertyName}</p>
                  {transaction.propertyAddress && (
                    <p className="mt-1 text-sm text-gray-500">
                      {transaction.propertyAddress}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 mt-1 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Payment Method
                  </p>
                  <p className="text-gray-900">{transaction.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 mt-1 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Description</p>
                <p className="text-gray-900">{transaction.description}</p>
              </div>
            </div>

            {/* Tenant/Vendor Information */}
            {(transaction.tenantName || transaction.vendorName) && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 mt-1 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {transaction.type === "Income" ? "Tenant" : "Vendor/Payee"}
                  </p>
                  <p className="text-gray-900">
                    {transaction.tenantName || transaction.vendorName}
                  </p>
                </div>
              </div>
            )}

            {/* Receipt Number */}
            {transaction.receiptNumber && (
              <div className="flex items-start gap-3">
                <Receipt className="w-5 h-5 mt-1 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Receipt/Invoice Number
                  </p>
                  <p className="text-gray-900">{transaction.receiptNumber}</p>
                </div>
              </div>
            )}

            {/* Notes */}
            {transaction.notes && (
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 mt-1 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Notes</p>
                  <p className="text-gray-900">{transaction.notes}</p>
                </div>
              </div>
            )}

            {/* Metadata */}
            <Card className="p-4 border-0 bg-gray-50">
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-900">
                    {formatDate(transaction.createdDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Created by:</span>
                  <span className="text-gray-900">{transaction.createdBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Last updated:</span>
                  <span className="text-gray-900">
                    {formatDate(transaction.lastUpdated)}
                  </span>
                </div>
                {transaction.tags && transaction.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Tags:</span>
                    <div className="flex gap-1">
                      {transaction.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransactionModal;
