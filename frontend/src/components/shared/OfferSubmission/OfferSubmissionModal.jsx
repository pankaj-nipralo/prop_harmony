import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Home,
  MapPin,
  User,
  Mail,
  Phone,
  FileText,
  Send,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const OfferSubmissionModal = ({ isOpen, onClose, property, onSubmitOffer }) => {
  const [offerData, setOfferData] = useState({
    amount: property?.price || "",
    message: "",
    moveInDate: "",
    leaseTerm: "12",
    tenantInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      monthlyIncome: "",
      employmentStatus: "full-time",
      creditScore: "",
      previousRentals: "",
      references: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setOfferData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setOfferData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create offer object
      const offer = {
        id: Date.now(),
        propertyId: property.id,
        propertyTitle: property.title,
        propertyAddress: property.address,
        propertyImage: property.image,
        landlordName: property.landlordName,
        landlordEmail: property.landlordEmail,
        landlordPhone: property.landlordPhone,
        originalPrice: property.price,
        currentOffer: parseFloat(offerData.amount),
        myLastOffer: parseFloat(offerData.amount),
        landlordLastOffer: null,
        status: "pending",
        submittedDate: new Date().toISOString().split("T")[0],
        lastActivity: new Date().toISOString().split("T")[0],
        negotiationHistory: [
          {
            id: 1,
            amount: parseFloat(offerData.amount),
            by: "tenant",
            date: new Date().toISOString(),
            message: offerData.message || "Initial offer",
          },
        ],
        canMessage: false,
        moveInDate: offerData.moveInDate,
        leaseTerm: offerData.leaseTerm,
        tenantInfo: offerData.tenantInfo,
      };

      onSubmitOffer(offer);

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = "Rental application submitted successfully!";
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);

      onClose();
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert("Failed to submit offer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Submit Rental Application
          </h2>

          {/* Property Summary */}
          <div className="p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50">
            <div className="flex gap-4">
              <img
                src={property.image}
                alt={property.title}
                className="object-cover w-20 h-20 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {property.title}
                </h3>
                <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {property.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DirhamSvg size={15} color1="" />
                  Listed at {property.price.toLocaleString()}/month
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Offer Details */}
            <div className="space-y-4">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Offer Details
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-1">
                      Your Offer (per month)
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute flex items-center -translate-y-1/2 left-3 top-1/2">
                      <DirhamSvg size={15} color1="" />
                    </span>
                    <input
                      type="number"
                      value={offerData.amount}
                      onChange={(e) =>
                        handleInputChange("amount", e.target.value)
                      }
                      className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your offer"
                      min="0"
                      step="50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Preferred Move-in Date
                  </label>
                  <input
                    type="date"
                    value={offerData.moveInDate}
                    onChange={(e) =>
                      handleInputChange("moveInDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Lease Term (months)
                  </label>
                  <select
                    value={offerData.leaseTerm}
                    onChange={(e) =>
                      handleInputChange("leaseTerm", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Message to Landlord (Optional)
                </label>
                <textarea
                  value={offerData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Introduce yourself and explain why you're interested in this property..."
                />
              </div>
            </div>

            {/* Personal Information */}
            {/* <div className="space-y-4">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={offerData.tenantInfo.firstName}
                    onChange={(e) =>
                      handleInputChange("tenantInfo.firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={offerData.tenantInfo.lastName}
                    onChange={(e) =>
                      handleInputChange("tenantInfo.lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={offerData.tenantInfo.email}
                    onChange={(e) =>
                      handleInputChange("tenantInfo.email", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={offerData.tenantInfo.phone}
                    onChange={(e) =>
                      handleInputChange("tenantInfo.phone", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div> */}

            {/* Financial Information */}
            {/* <div className="space-y-4">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Financial Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Monthly Income
                  </label>
                  <div className="relative">
                    <span className="absolute flex items-center -translate-y-1/2 left-3 top-1/2">
                      <DirhamSvg size={15} color1="" />
                    </span>
                    <input
                      type="number"
                      value={offerData.tenantInfo.monthlyIncome}
                      onChange={(e) =>
                        handleInputChange(
                          "tenantInfo.monthlyIncome",
                          e.target.value
                        )
                      }
                      className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter monthly income"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Employment Status
                  </label>
                  <select
                    value={offerData.tenantInfo.employmentStatus}
                    onChange={(e) =>
                      handleInputChange(
                        "tenantInfo.employmentStatus",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="student">Student</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Credit Score (Optional)
                  </label>
                  <input
                    type="number"
                    value={offerData.tenantInfo.creditScore}
                    onChange={(e) =>
                      handleInputChange(
                        "tenantInfo.creditScore",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter credit score"
                    min="300"
                    max="850"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Previous Rentals
                  </label>
                  <input
                    type="number"
                    value={offerData.tenantInfo.previousRentals}
                    onChange={(e) =>
                      handleInputChange(
                        "tenantInfo.previousRentals",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of previous rentals"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Number of References
                </label>
                <input
                  type="number"
                  value={offerData.tenantInfo.references}
                  onChange={(e) =>
                    handleInputChange("tenantInfo.references", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Number of references you can provide"
                  min="0"
                />
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 myButton disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Application
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OfferSubmissionModal;
