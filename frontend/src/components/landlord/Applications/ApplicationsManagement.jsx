import React, { useState } from "react";
import ApplicationsHeader from "./ApplicationHeader";
import ApplicationsStats from "./ApplicationStats";
import ApplicationsList from "./ApplicationsList";
import ApplicationModals from "./ApplicationModals";

const ApplicationsManagement = () => {
  // State for applications
  const [applications, setApplications] = useState([
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
      status: "under_negotiation",
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
  ]);

  // Modal states
  const [negotiateModal, setNegotiateModal] = useState({
    open: false,
    applicationId: null,
  });
  const [historyModal, setHistoryModal] = useState({
    open: false,
    applicationId: null,
  });
  const [messageModal, setMessageModal] = useState({
    open: false,
    applicationId: null,
  });
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    applicationId: null,
    action: null,
  });
  const [tenantInfoModal, setTenantInfoModal] = useState({
    open: false,
    applicationId: null,
  });

  // Form states
  const [negotiateAmount, setNegotiateAmount] = useState("");
  const [negotiateMessage, setNegotiateMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleAcceptApplication = (applicationId) => {
    setConfirmModal({ open: true, applicationId, action: "accept" });
  };

  const handleDeclineApplication = (applicationId) => {
    setConfirmModal({ open: true, applicationId, action: "decline" });
  };

  const handleNegotiate = (applicationId) => {
    const application = applications.find((a) => a.id === applicationId);
    setNegotiateAmount(
      application.tenantLastOffer?.toString() ||
        application.originalPrice.toString()
    );
    setNegotiateMessage("");
    setNegotiateModal({ open: true, applicationId });
  };

  const submitNegotiation = () => {
    if (!negotiateAmount || parseFloat(negotiateAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setApplications((prev) =>
        prev.map((application) => {
          if (application.id === negotiateModal.applicationId) {
            const newNegotiation = {
              id: application.negotiationHistory.length + 1,
              amount: parseFloat(negotiateAmount),
              by: "landlord",
              date: new Date().toISOString(),
              message: negotiateMessage || "Counter offer",
            };

            return {
              ...application,
              myLastOffer: parseFloat(negotiateAmount),
              currentOffer: parseFloat(negotiateAmount),
              status: "under_negotiation",
              lastActivity: new Date().toISOString().split("T")[0],
              negotiationHistory: [
                ...application.negotiationHistory,
                newNegotiation,
              ],
            };
          }
          return application;
        })
      );

      setIsLoading(false);
      setNegotiateModal({ open: false, applicationId: null });
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

  const confirmAction = () => {
    const { applicationId, action } = confirmModal;
    setIsLoading(true);

    setTimeout(() => {
      setApplications((prev) =>
        prev.map((application) => {
          if (application.id === applicationId) {
            return {
              ...application,
              status: action === "accept" ? "accepted" : "declined",
              lastActivity: new Date().toISOString().split("T")[0],
            };
          }
          return application;
        })
      );

      setIsLoading(false);
      setConfirmModal({ open: false, applicationId: null, action: null });

      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = `Application ${action}ed successfully!`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <ApplicationsHeader />
        <ApplicationsStats applications={applications} />
        <ApplicationsList
          applications={applications}
          onAccept={handleAcceptApplication}
          onDecline={handleDeclineApplication}
          onNegotiate={handleNegotiate}
          onViewHistory={(id) =>
            setHistoryModal({ open: true, applicationId: id })
          }
          onMessage={(id) => setMessageModal({ open: true, applicationId: id })}
        />
        <ApplicationModals
          negotiateModal={negotiateModal}
          setNegotiateModal={setNegotiateModal}
          historyModal={historyModal}
          setHistoryModal={setHistoryModal}
          messageModal={messageModal}
          setMessageModal={setMessageModal}
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
          tenantInfoModal={tenantInfoModal}
          setTenantInfoModal={setTenantInfoModal}
          negotiateAmount={negotiateAmount}
          setNegotiateAmount={setNegotiateAmount}
          negotiateMessage={negotiateMessage}
          setNegotiateMessage={setNegotiateMessage}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          isLoading={isLoading}
          applications={applications}
          submitNegotiation={submitNegotiation}
          confirmAction={confirmAction}
        />
      </div>
    </div>
  );
};

export default ApplicationsManagement;
