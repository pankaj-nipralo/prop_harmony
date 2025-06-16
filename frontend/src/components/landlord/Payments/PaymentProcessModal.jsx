import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CreditCard } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const PaymentProcessModal = ({ isOpen, onClose, payment, onProcessPayment }) => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Call the parent component's payment handler
    onProcessPayment({
      paymentId: payment?.id,
      method: selectedMethod,
      amount: payment?.amount,
      timestamp: new Date().toISOString(),
    });

    setIsProcessing(false);
    onClose();
  };

  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Process Payment</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">Payment Amount</p>
                <div className="flex items-center text-2xl font-bold text-blue-700">
                  <DirhamSvg size={24} className="mr-1" />
                  {payment.amount}
                </div>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={selectedMethod === "card" ? "default" : "outline"}
                  className="flex items-center justify-center gap-2 py-6"
                  onClick={() => setSelectedMethod("card")}
                >
                  <CreditCard className="w-5 h-5" />
                  Card Payment
                </Button>
                <Button
                  type="button"
                  variant={selectedMethod === "bank" ? "default" : "outline"}
                  className="flex items-center justify-center gap-2 py-6"
                  onClick={() => setSelectedMethod("bank")}
                >
                  <DirhamSvg size={20} />
                  Bank Transfer
                </Button>
              </div>
            </div>

            {selectedMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label>Card Number</Label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label>CVC</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === "bank" && (
              <div className="p-4 space-y-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Bank Transfer Details</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Bank: Emirates NBD</p>
                  <p className="text-sm text-gray-600">Account Name: Property Harmony</p>
                  <p className="text-sm text-gray-600">IBAN: AE123456789012345678901</p>
                  <p className="text-sm text-gray-600">
                    Reference: {payment.paymentId || "Not available"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

export default PaymentProcessModal;
