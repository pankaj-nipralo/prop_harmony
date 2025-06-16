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
import { AlertCircle, CreditCard, Building } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";
import { formatCurrency } from "@/data/landlord/payments/data";

const PaymentProcessModal = ({
  isOpen,
  onClose,
  payment,
  onProcessPayment,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
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
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue =
        value
          .replace(/\s/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || "";
    }
    // Format expiry date with slash
    if (name === "expiryDate") {
      formattedValue =
        value
          .replace(/\//g, "")
          .match(/^(\d{0,2})(\d{0,2})/)
          ?.slice(1)
          .filter(Boolean)
          .join("/") || "";
    }
    // Only allow numbers for CVC
    if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
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
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call the parent component's payment handler
      onProcessPayment({
        paymentId: payment?.id,
        method: selectedMethod,
        amount: payment?.amount,
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

  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Process Payment
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">
                  Payment Amount
                </p>{" "}
                <div className="space-y-2">
                  <div className="flex items-center text-2xl font-bold text-blue-700">
                    <DirhamSvg size={24} className="mr-1" />
                    {formatCurrency(payment.amount)}
                  </div>
                  <p className="text-sm text-blue-600">
                    Due Date: {new Date(payment.dueDate).toLocaleDateString()}
                  </p>
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
                  <Input
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19} // 16 digits + 3 spaces
                    className={formErrors.cardNumber ? "border-red-500" : ""}
                  />
                  {formErrors.cardNumber && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.cardNumber}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Expiry Date</Label>
                    <Input
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={formErrors.expiryDate ? "border-red-500" : ""}
                    />
                    {formErrors.expiryDate && (
                      <p className="mt-1 text-xs text-red-500">
                        {formErrors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>CVC</Label>
                    <Input
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                      className={formErrors.cvc ? "border-red-500" : ""}
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

            {selectedMethod === "bank" && (
              <div className="space-y-4">
                <div className="p-4 space-y-3 bg-gray-50 rounded-lg">
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
                      <p className="text-sm text-gray-600">
                        Payment Reference:
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {payment.paymentId || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 text-yellow-600" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-yellow-800">
                        Important Notice
                      </p>
                      <p className="text-sm text-yellow-700">
                        Please use the payment reference when making the bank
                        transfer to ensure we can match your payment. After
                        making the transfer, click 'Confirm Payment' to mark
                        this payment as pending verification.
                      </p>
                    </div>
                  </div>
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
