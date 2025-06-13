import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Home,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  ArrowUpDown,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Send,
  History,
  AlertCircle,
  TrendingUp,
  Eye,
  Edit,
  Star,
  Save,
  X,
} from "lucide-react";

const MyOffers = () => {
  // Load offers from localStorage and merge with sample data
  const loadOffers = () => {
    const savedOffers = JSON.parse(
      localStorage.getItem("tenantOffers") || "[]"
    );
    const sampleOffers = [
      {
        id: 1,
        propertyId: "prop_001",
        propertyTitle: "Modern 2BR Apartment in Downtown",
        propertyAddress: "123 Main Street, Downtown, City",
        propertyImage:
          "https://thumbs.dreamstime.com/b/apartment-building-19532951.jpg",
        landlordName: "John Smith",
        landlordEmail: "john.smith@email.com",
        landlordPhone: "+1 (555) 123-4567",
        originalPrice: 2500,
        currentOffer: 2300,
        myLastOffer: 2300,
        landlordLastOffer: 2400,
        status: "under_negotiation", // pending, accepted, declined, under_negotiation, agreed
        submittedDate: "2024-12-15",
        lastActivity: "2024-12-16",
        negotiationHistory: [
          {
            id: 1,
            amount: 2300,
            by: "tenant",
            date: "2024-12-15T10:00:00Z",
            message: "Initial offer",
          },
          {
            id: 2,
            amount: 2400,
            by: "landlord",
            date: "2024-12-15T14:30:00Z",
            message: "Counter offer",
          },
          {
            id: 3,
            amount: 2350,
            by: "tenant",
            date: "2024-12-16T09:15:00Z",
            message: "Counter offer",
          },
        ],
        canMessage: false,
      },
      {
        id: 2,
        propertyId: "prop_002",
        propertyTitle: "Cozy 1BR Studio Near University",
        propertyAddress: "456 College Ave, University District",
        propertyImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX9PiX8SL3QGE2MksnHs0rKJinqe38Izpa9g&s",
        landlordName: "Sarah Johnson",
        landlordEmail: "sarah.johnson@email.com",
        landlordPhone: "+1 (555) 987-6543",
        originalPrice: 1800,
        currentOffer: 1750,
        myLastOffer: 1750,
        landlordLastOffer: null,
        status: "pending",
        submittedDate: "2024-12-14",
        lastActivity: "2024-12-14",
        negotiationHistory: [
          {
            id: 1,
            amount: 1750,
            by: "tenant",
            date: "2024-12-14T16:20:00Z",
            message: "Initial offer",
          },
        ],
        canMessage: false,
      },
      {
        id: 3,
        propertyId: "prop_003",
        propertyTitle: "Luxury 3BR Penthouse with City View",
        propertyAddress: "789 Skyline Blvd, Uptown",
        propertyImage:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        landlordName: "Michael Chen",
        landlordEmail: "michael.chen@email.com",
        landlordPhone: "+1 (555) 456-7890",
        originalPrice: 4500,
        currentOffer: 4500,
        myLastOffer: 4500,
        landlordLastOffer: 4500,
        status: "agreed",
        submittedDate: "2024-12-10",
        lastActivity: "2024-12-12",
        negotiationHistory: [
          {
            id: 1,
            amount: 4200,
            by: "tenant",
            date: "2024-12-10T11:00:00Z",
            message: "Initial offer",
          },
          {
            id: 2,
            amount: 4400,
            by: "landlord",
            date: "2024-12-11T09:30:00Z",
            message: "Counter offer",
          },
          {
            id: 3,
            amount: 4500,
            by: "tenant",
            date: "2024-12-12T14:15:00Z",
            message: "Final offer - agreed!",
          },
        ],
        canMessage: true,
      },
    ];

    // Combine saved offers with sample offers, avoiding duplicates
    const allOffers = [...savedOffers, ...sampleOffers];
    return allOffers;
  };

  // State for offers and negotiations
  const [offers, setOffers] = useState(loadOffers());

  // Modal states
  const [negotiateModal, setNegotiateModal] = useState({
    open: false,
    offerId: null,
  });
  const [historyModal, setHistoryModal] = useState({
    open: false,
    offerId: null,
  });
  const [messageModal, setMessageModal] = useState({
    open: false,
    offerId: null,
  });
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    offerId: null,
    action: null,
  });

  // Form states
  const [negotiateAmount, setNegotiateAmount] = useState("");
  const [negotiateMessage, setNegotiateMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "declined":
        return "bg-red-100 text-red-800 border-red-200";
      case "under_negotiation":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "agreed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "declined":
        return <XCircle className="w-4 h-4" />;
      case "under_negotiation":
        return <ArrowUpDown className="w-4 h-4" />;
      case "agreed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Format status text
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "accepted":
        return "Accepted";
      case "declined":
        return "Declined";
      case "under_negotiation":
        return "Under Negotiation";
      case "agreed":
        return "Terms Agreed";
      default:
        return "Unknown";
    }
  };

  // Handle offer actions
  const handleAcceptOffer = (offerId) => {
    setConfirmModal({ open: true, offerId, action: "accept" });
  };

  const handleDeclineOffer = (offerId) => {
    setConfirmModal({ open: true, offerId, action: "decline" });
  };

  const handleNegotiate = (offerId) => {
    const offer = offers.find((o) => o.id === offerId);
    setNegotiateAmount(
      offer.landlordLastOffer?.toString() || offer.originalPrice.toString()
    );
    setNegotiateMessage("");
    setNegotiateModal({ open: true, offerId });
  };

  // const handleAcceptApplication = (applicationId) => {
  //   setConfirmModal({ open: true, applicationId, action: "accept" });
  // };

  const submitNegotiation = () => {
    if (!negotiateAmount || parseFloat(negotiateAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setOffers((prev) =>
        prev.map((offer) => {
          if (offer.id === negotiateModal.offerId) {
            const newNegotiation = {
              id: offer.negotiationHistory.length + 1,
              amount: parseFloat(negotiateAmount),
              by: "tenant",
              date: new Date().toISOString(),
              message: negotiateMessage || "Counter offer",
            };

            return {
              ...offer,
              myLastOffer: parseFloat(negotiateAmount),
              currentOffer: parseFloat(negotiateAmount),
              status: "under_negotiation",
              lastActivity: new Date().toISOString().split("T")[0],
              negotiationHistory: [...offer.negotiationHistory, newNegotiation],
            };
          }
          return offer;
        })
      );

      setIsLoading(false);
      setNegotiateModal({ open: false, offerId: null });
      setNegotiateAmount("");
      setNegotiateMessage("");

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = "Counter offer submitted successfully!";
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
    }, 1500);
  };

  // Sync with localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tenantOffers");
    if (stored) setOffers(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("tenantOffers", JSON.stringify(offers));
  }, [offers]);

  const confirmAction = () => {
    const { offerId, action } = confirmModal;
    setIsLoading(true);

    setTimeout(() => {
      setOffers((prev) =>
        prev.map((offer) => {
          if (offer.id === offerId) {
            // Use consistent status for both landlord and tenant
            return {
              ...offer,
              status: action === "accept" ? "agreed" : "declined",
              lastActivity: new Date().toISOString().split("T")[0],
              // FIX: Update current offer to match agreed price
              currentOffer:
                action === "accept"
                  ? offer.landlordLastOffer || offer.originalPrice
                  : offer.currentOffer,
            };
          }
          return offer;
        })
      );

      setIsLoading(false);
      setConfirmModal({ open: false, offerId: null, action: null });

      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = `Offer ${action}ed successfully!`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Home className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Rental Offers
              </h1>
              <p className="text-gray-600">
                Track and manage your rental applications
              </p>
            </div>
          </div>

          {/* <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-gray-600">
                Total Offers:{" "}
              </span>
              <span className="text-sm font-bold text-blue-600">
                {offers.length}
              </span>
            </div>
          </div> */}
        </div>
        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mt-7">
          {[
            {
              label: "Pending",
              icon: Clock,
              color: "yellow",
              count: offers.filter((o) => o.status === "pending").length,
            },
            {
              label: "Negotiating",
              icon: ArrowUpDown,
              color: "blue",
              count: offers.filter((o) => o.status === "under_negotiation")
                .length,
            },
            {
              label: "Agreed",
              icon: CheckCircle,
              color: "green",
              count: offers.filter((o) => o.status === "agreed").length,
            },
            {
              label: "Declined",
              icon: XCircle,
              color: "red",
              count: offers.filter((o) => o.status === "declined").length,
            },
          ].map(({ label, icon: Icon, color, count }) => (
            <Card
              key={label}
              className="p-6 bg-white border-0 shadow-sm rounded-2xl transition-transform hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-${color}-100`}>
                  <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {/* Offers List */}
        <div className="space-y-6 mt-7">
          {offers.length === 0 ? (
            <Card className="p-12 text-center bg-white border-0 shadow-sm">
              <Home className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                No Offers Yet
              </h3>
              <p className="mb-4 text-gray-600">
                You haven't submitted any rental applications yet.
              </p>
              {/* <button className="px-6 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 myButton">
                Browse Properties
              </button> */}
            </Card>
          ) : (
            offers.map((application) => (
              <Card
                key={application.id}
                className="p-6 transition-shadow bg-white border-0 shadow-sm mb-7 hover:shadow-md"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Property & Tenant Info */}
                  <div className="lg:col-span-2">
                    <div className="flex gap-4">
                      <img
                        src={application.propertyImage}
                        alt={application.propertyTitle}
                        className="object-cover w-24 h-24 rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.propertyTitle}
                          </h3>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusStyle(
                              application.status
                            )}`}
                          >
                            {getStatusIcon(application.status)}
                            {getStatusText(application.status)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {application.propertyAddress}
                        </div>

                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Applied:{" "}
                            {new Date(
                              application.submittedDate
                            ).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Last Activity:{" "}
                            {new Date(
                              application.lastActivity
                            ).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Tenant Info */}
                        {/* <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {application.tenantName}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {application.tenantEmail}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {application.tenantPhone}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-gray-900">
                                {application.tenantRating}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                setTenantInfoModal({
                                  open: true,
                                  applicationId: application.id,
                                })
                              }
                              className="px-3 py-1 text-xs font-medium text-blue-600 transition-colors rounded bg-blue-50 hover:bg-blue-100"
                            >
                              View Details
                            </button>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* Offer Details & Actions */}
                  <div className="space-y-4">
                    {/* Price Information */}
                    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Listed Price:
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            ${application.originalPrice.toLocaleString()}/month
                          </span>
                        </div>

                        {application.tenantLastOffer && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-600">
                              Tenant's Offer:
                            </span>
                            <span className="text-sm font-bold text-blue-600">
                              ${application.tenantLastOffer.toLocaleString()}
                              /month
                            </span>
                          </div>
                        )}

                        {application.myLastOffer && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-600">
                              My Counter Offer:
                            </span>
                            <span className="text-sm font-bold text-green-600">
                              ${application.myLastOffer.toLocaleString()}/month
                            </span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-blue-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              Current Offer:
                            </span>
                            <span className="text-lg font-bold text-blue-600">
                              ${application.currentOffer.toLocaleString()}/month
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-4 gap-4 space-y-3">
                  {application.status === "pending" ||
                  application.status === "under_negotiation" ? (
                    <>
                      <button
                        onClick={() => handleAcceptOffer(application.id)}
                        className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 myButton"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accept ${application.currentOffer.toLocaleString()}
                        /month
                      </button>

                      <button
                        onClick={() => handleNegotiate(application.id)}
                        className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100 myButton"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                        {application.status === "pending"
                          ? "Counter Offer"
                          : "New Counter Offer"}
                      </button>

                      <button
                        onClick={() => handleDeclineApplication(application.id)}
                        className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100 myButton"
                      >
                        <XCircle className="w-4 h-4" />
                        Decline Application
                      </button>
                    </>
                  ) : application.status === "agreed" &&
                    application.canMessage ? (
                    <button
                      onClick={() =>
                        setMessageModal({
                          open: true,
                          applicationId: application.id,
                        })
                      }
                      className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 myButton"
                    >
                      <MessageSquare className="w-2 h-2" />
                      Message Tenant
                    </button>
                  ) : (
                    <div className="py-4 text-center">
                      <p className="text-sm text-gray-500">
                        {application.status === "accepted" &&
                          "Application accepted"}
                        {application.status === "declined" &&
                          "Application declined"}
                        {application.status === "agreed" &&
                          !application.canMessage &&
                          "Terms agreed - messaging will be available soon"}
                      </p>
                    </div>
                  )}

                  {/* View History Button */}
                  <button
                    onClick={() =>
                      setHistoryModal({
                        open: true,
                        applicationId: application.id,
                      })
                    }
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 mb-3 text-sm font-medium text-gray-600 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100 myButton"
                  >
                    <History className="w-4 h-4" />
                    View Negotiation History
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
        {/* Negotiate Modal */}
        <Dialog
          open={negotiateModal.open}
          onOpenChange={() => setNegotiateModal({ open: false, offerId: null })}
        >
          <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Negotiate Price
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitNegotiation();
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Your Counter Offer ($/month)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="number"
                        value={negotiateAmount}
                        onChange={(e) => setNegotiateAmount(e.target.value)}
                        className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                        min="0"
                        step="50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Message (Optional)
                    </label>
                    <textarea
                      value={negotiateMessage}
                      onChange={(e) => setNegotiateMessage(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a message to explain your offer..."
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                  <button
                    type="button"
                    onClick={() =>
                      setNegotiateModal({ open: false, offerId: null })
                    }
                    className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !negotiateAmount}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 myButton disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    ) : (
                      "Submit Counter Offer"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        {/* History Modal */}
        <Dialog
          open={historyModal.open}
          onOpenChange={() => setHistoryModal({ open: false, offerId: null })}
        >
          <DialogContent className="w-full max-w-2xl bg-white border-0 rounded-lg shadow-xl">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Negotiation History
              </h2>

              {historyModal.offerId && (
                <div className="space-y-4">
                  {offers
                    .find((o) => o.id === historyModal.offerId)
                    ?.negotiationHistory.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            item.by === "tenant"
                              ? "bg-blue-100"
                              : "bg-green-100"
                          }`}
                        >
                          {item.by === "tenant" ? (
                            <User
                              className={`w-4 h-4 ${
                                item.by === "tenant"
                                  ? "text-blue-600"
                                  : "text-green-600"
                              }`}
                            />
                          ) : (
                            <Home className="w-4 h-4 text-green-600" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {item.by === "tenant" ? "You" : "Landlord"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(item.date).toLocaleDateString()} at{" "}
                              {new Date(item.date).toLocaleTimeString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-blue-600">
                              ${item.amount.toLocaleString()}/month
                            </span>
                            {index === 0 && (
                              <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                                Initial Offer
                              </span>
                            )}
                          </div>

                          {item.message && (
                            <p className="text-sm text-gray-600">
                              {item.message}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  onClick={() =>
                    setHistoryModal({ open: false, offerId: null })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Confirmation Modal */}
        <Dialog
          open={confirmModal.open}
          onOpenChange={() =>
            setConfirmModal({ open: false, offerId: null, action: null })
          }
        >
          <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                {confirmModal.action === "accept"
                  ? "Accept Offer"
                  : "Decline Offer"}
              </h2>
              <p className="mb-6 text-gray-600">
                {confirmModal.action === "accept"
                  ? "Are you sure you want to accept this rental offer? This action cannot be undone."
                  : "Are you sure you want to decline this rental offer? This action cannot be undone."}
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() =>
                    setConfirmModal({
                      open: false,
                      offerId: null,
                      action: null,
                    })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  disabled={isLoading}
                  className={`px-4 py-2 text-sm font-medium text-white transition-colors rounded-md myButton disabled:opacity-50 disabled:cursor-not-allowed ${
                    confirmModal.action === "accept"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  ) : confirmModal.action === "accept" ? (
                    "Accept Offer"
                  ) : (
                    "Decline Offer"
                  )}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Message Modal */}
        <Dialog
          open={messageModal.open}
          onOpenChange={() => setMessageModal({ open: false, offerId: null })}
        >
          <DialogContent className="w-full max-w-lg bg-white border-0 rounded-lg shadow-xl">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Message Landlord
              </h2>

              <div className="space-y-4">
                <div className="h-64 p-4 overflow-y-auto rounded-lg bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="max-w-xs p-3 text-white bg-blue-500 rounded-lg rounded-br-none">
                        <p className="text-sm">
                          Hi! I'm excited about the property. When can we
                          schedule a viewing?
                        </p>
                        <span className="text-xs opacity-75">2:30 PM</span>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="max-w-xs p-3 bg-white border rounded-lg rounded-bl-none">
                        <p className="text-sm">
                          Hello! Great to hear from you. How about tomorrow at 3
                          PM?
                        </p>
                        <span className="text-xs text-gray-500">2:45 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && chatMessage.trim()) {
                        // Handle send message
                        setChatMessage("");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (chatMessage.trim()) {
                        // Handle send message
                        setChatMessage("");
                      }
                    }}
                    disabled={!chatMessage.trim()}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 myButton disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() =>
                    setMessageModal({ open: false, offerId: null })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyOffers;
