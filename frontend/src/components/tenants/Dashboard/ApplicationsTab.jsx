import React, { useState, useMemo } from "react";
import {
  FileText,
  Building,
  MapPin,
  DollarSign,
  Clock,
  MessageCircle,
} from "lucide-react";

// Import modals
import ApplicationConfirmationModal from "./ApplicationConfirmationModal";
import ChatModal from "./ChatModal";
import ContractViewModal from "./ContractViewModal";
import { Navigate } from "react-router-dom";
import DirhamSvg from "@/assets/Dirham";

const ApplicationsTab = ({ applications: initialApplications }) => {
  // State for managing applications data
  const [applications, setApplications] = useState(initialApplications);
  const [isLoading, setIsLoading] = useState(false);

  // State for managing the selected filter
  const [selectedFilter, setSelectedFilter] = useState("All Applications");

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedChatApplication, setSelectedChatApplication] = useState(null);
  const [showContractModal, setShowContractModal] = useState(false);
  const [selectedContractApplication, setSelectedContractApplication] =
    useState(null);

  // Create proper filter options that match actual status values
  const filterOptions = [
    "All Applications",
    "Pending Review",
    "Counter Offer",
    "In Negotiation",
    "Approved",
    "Rejected",
  ];

  // Filter applications based on selected filter
  const filteredApplications = useMemo(() => {
    if (selectedFilter === "All Applications") {
      return applications;
    }
    return applications.filter(
      (application) => application.status === selectedFilter
    );
  }, [applications, selectedFilter]);

  // Handle filter change
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Button handler functions
  const handleAcceptOffer = (application) => {
    setConfirmAction({
      type: "accept",
      applicationId: application.id,
      propertyName: application.name,
      counterOffer: application.counterOffer,
      action: () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setApplications((prev) =>
            prev.map((app) =>
              app.id === application.id
                ? {
                    ...app,
                    status: "Approved",
                    statusColor: "bg-green-100 text-green-800",
                  }
                : app
            )
          );
          setIsLoading(false);
          setShowConfirmModal(false);
          setConfirmAction(null);
        }, 1500);
      },
    });
    setShowConfirmModal(true);
  };

  const handleDeclineOffer = (application) => {
    setConfirmAction({
      type: "decline",
      applicationId: application.id,
      propertyName: application.name,
      action: () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setApplications((prev) =>
            prev.map((app) =>
              app.id === application.id
                ? {
                    ...app,
                    status: "Rejected",
                    statusColor: "bg-red-100 text-red-800",
                  }
                : app
            )
          );
          setIsLoading(false);
          setShowConfirmModal(false);
          setConfirmAction(null);
        }, 1500);
      },
    });
    setShowConfirmModal(true);
  };

  const handleContinueChat = (application) => {
    setSelectedChatApplication(application);
    setShowChatModal(true);
  };

  const handleViewContract = (application) => {
    setSelectedContractApplication(application);
    setShowContractModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleConfirmAction = () => {
    if (confirmAction && confirmAction.action) {
      confirmAction.action();
    }
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
    setSelectedChatApplication(null);
  };

  const handleCloseContractModal = () => {
    setShowContractModal(false);
    setSelectedContractApplication(null);
  };

  return (
    <div className="space-y-8">
      {/* Applications Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900">
            My Property Applications
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </span>
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="px-3 py-2 text-sm transition-colors bg-white border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filterOptions.map((filter, index) => (
              <option key={index} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApplications.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No applications found
            </h3>
            <p className="text-gray-500">
              {selectedFilter === "All Applications"
                ? "You haven't submitted any property applications yet."
                : `No applications with status "${selectedFilter}" found.`}
            </p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div
              key={application.id}
              className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {application.name}
                    </h3>
                  </div>
                  <div className="flex items-center mb-2 text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{application.address}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <DirhamSvg className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">
                      {application.rent}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${application.statusColor}`}
                  >
                    {application.status}
                  </span>
                  <div className="flex items-center mt-2 text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs">
                      Applied: {application.appliedDate}
                    </span>
                  </div>
                </div>
              </div>

              {application.counterOffer && (
                <div className="p-4 mb-4 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Counter Offer: {application.counterOffer}
                    </span>
                  </div>
                </div>
              )}

              {application.status === "In Negotiation" && (
                <div className="p-4 mb-4 rounded-lg bg-purple-50">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">
                      Open Negotiations
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {application.status === "Counter Offer" && (
                  <>
                    <button
                      onClick={() => handleAcceptOffer(application)}
                      disabled={isLoading}
                      className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg myButton hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Processing..." : "Accept Offer"}
                    </button>
                    <button
                      onClick={() => handleDeclineOffer(application)}
                      disabled={isLoading}
                      className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg myButton hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Decline
                    </button>
                  </>
                )}
                {application.status === "In Negotiation" && (
                  <button
                    onClick={() => <Navigate to={`/tenants/emails`} />}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg myButton hover:bg-blue-600"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Continue Chat
                  </button>
                )}
                {application.status === "Pending Review" && (
                  <button
                    disabled
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg opacity-50 cursor-not-allowed myButton"
                  >
                    Awaiting Response
                  </button>
                )}
                {application.status === "Approved" && (
                  <button
                    onClick={() => handleViewContract(application)}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-500 rounded-lg myButton hover:bg-green-600"
                  >
                    View Contract
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      <ApplicationConfirmationModal
        showModal={showConfirmModal}
        confirmAction={confirmAction}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmAction}
        isLoading={isLoading}
      />

      {/* <ChatModal
        showModal={showChatModal}
        application={selectedChatApplication}
        onClose={handleCloseChatModal}
      /> */}

      <ContractViewModal
        showModal={showContractModal}
        application={selectedContractApplication}
        onClose={handleCloseContractModal}
      />
    </div>
  );
};

export default ApplicationsTab;
