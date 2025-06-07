import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import OffersStatsCards from './OffersStatsCards';
import OffersTable from './OffersTable';
import OfferConfirmationModal from './OfferConfirmationModal';

// Import data
import { offersApplications, statusConfigurations, tableHeaders } from '../../../data/offersData';

const MyOffersMaster = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(offersApplications);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Calculate stats dynamically from applications
  const offersData = {
    applied: applications.filter(app => app.status === 'Applied').length,
    inNegotiation: applications.filter(app => app.status === 'In Negotiation' || app.status === 'Counter Offer').length,
    approved: applications.filter(app => app.status === 'Approved').length,
    rejected: applications.filter(app => app.status === 'Rejected').length,
    total: applications.length
  };

  // Button handler functions
  const handleAcceptOffer = (applicationId) => {
    const application = applications.find(app => app.id === applicationId);
    setConfirmAction({
      type: 'accept',
      applicationId,
      propertyName: application.property,
      action: () => {
        setApplications(prev => prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: "Approved", statusColor: "bg-green-100 text-green-800", actions: ["View"] }
            : app
        ));
        setShowConfirmModal(false);
        setConfirmAction(null);
      }
    });
    setShowConfirmModal(true);
  };

  const handleRejectOffer = (applicationId) => {
    const application = applications.find(app => app.id === applicationId);
    setConfirmAction({
      type: 'reject',
      applicationId,
      propertyName: application.property,
      action: () => {
        setApplications(prev => prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: "Rejected", statusColor: "bg-red-100 text-red-800", actions: ["View"] }
            : app
        ));
        setShowConfirmModal(false);
        setConfirmAction(null);
      }
    });
    setShowConfirmModal(true);
  };

  const handleViewApplication = (applicationId) => {
    // Navigate to application details page
    navigate(`/tenants/applications/${applicationId}`);
  };

  const handleViewDetails = (applicationId) => {
    // Navigate to negotiation details page
    navigate(`/tenants/negotiations/${applicationId}`);
  };

  const handleViewMessages = (applicationId) => {
    // Navigate to messages page for this application
    navigate(`/tenants/messages?application=${applicationId}`);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleConfirmAction = () => {
    if (confirmAction && confirmAction.action) {
      confirmAction.action();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Offers</h1>
          <span className="text-sm text-gray-500">{offersData.total} total applications</span>
        </div>

        {/* Stats Cards */}
        <OffersStatsCards offersData={offersData} />

        {/* Applications Table */}
        <OffersTable 
          applications={applications}
          tableHeaders={tableHeaders}
          statusConfigurations={statusConfigurations}
          onAcceptOffer={handleAcceptOffer}
          onRejectOffer={handleRejectOffer}
          onViewApplication={handleViewApplication}
          onViewDetails={handleViewDetails}
          onViewMessages={handleViewMessages}
        />

        {/* Confirmation Modal */}
        <OfferConfirmationModal 
          showModal={showConfirmModal}
          confirmAction={confirmAction}
          onClose={handleCloseModal}
          onConfirm={handleConfirmAction}
        />
      </div>
    </div>
  );
};

export default MyOffersMaster;
