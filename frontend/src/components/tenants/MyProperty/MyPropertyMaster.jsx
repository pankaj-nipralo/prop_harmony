import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import PropertyStatsCards from "./PropertyStatsCards";
import PropertyDetailsCard from "./PropertyDetailsCard";
import PropertyActionsPanel from "./PropertyActionsPanel";
import PropertyDocumentsSection from "./PropertyDocumentsSection";
import PropertyMaintenanceHistory from "./PropertyMaintenanceHistory";

// Import data
import {
  currentProperty,
  leaseInformation,
  contactInformation,
  propertyDocuments,
  // maintenanceHistory,
  propertyStats,
  quickActions,
} from "../../../data/tenants/propertyPageData";

const MyPropertyMaster = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Navigation handlers
  const handleActionClick = (route) => {
    navigate(route);
  };

  const handleContactLandlord = () => {
    navigate("/tenants/messages", {
      state: {
        recipient: contactInformation.landlord.name,
        email: contactInformation.landlord.email,
      },
    });
  };

  const handleContactManager = () => {
    navigate("/tenants/messages", {
      state: {
        recipient: contactInformation.propertyManager.name,
        email: contactInformation.propertyManager.email,
      },
    });
  };

  // Document handlers
  const handleDownloadDocument = (document) => {
    setLoading(true);
    try {
      // Simulate document download
      const link = document.createElement("a");
      link.href = document.downloadUrl;
      link.download = document.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // In a real app, you would track download analytics here
      console.log(`Downloaded: ${document.name}`);
    } catch (err) {
      setError("Failed to download document");
      console.error("Download error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Maintenance handlers
  // const handleViewMaintenanceDetails = (requestId) => {
  //   navigate(`/tenants/maintenance/${requestId}`);
  // };

  // const handleUpdateMaintenanceStatus = (requestId) => {
  //   navigate(`/tenants/maintenance/${requestId}/update`);
  // };

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="p-6 text-center border border-red-200 bg-red-50 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold text-red-800">
            Error Loading Property
          </h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 mt-4 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Property</h1>
        {/* <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
          Active Lease
        </span> */}
      </div>

      {/* Property Stats Cards */}
      <PropertyStatsCards stats={propertyStats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-7">
        {/* Left Column - Property Details */}
        <div className="xl:col-span-2">
          <PropertyDetailsCard
            property={currentProperty}
            leaseInfo={leaseInformation}
            contactInfo={contactInformation}
            onContactLandlord={handleContactLandlord}
            onContactManager={handleContactManager}
          />
        </div>

        {/* Right Column - Actions and Documents */}
        <div className="space-y-6">
          <PropertyDocumentsSection
            documents={propertyDocuments}
            onDownloadDocument={handleDownloadDocument}
          />
        </div>
      </div>

      <PropertyActionsPanel
        actions={quickActions}
        onActionClick={handleActionClick}
      />

      {/* Maintenance History - Full Width */}
      {/* <div className="mt-8">
          <PropertyMaintenanceHistory 
            maintenanceHistory={maintenanceHistory}
            onViewDetails={handleViewMaintenanceDetails}
            onUpdateStatus={handleUpdateMaintenanceStatus}
          />
        </div> */}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white rounded-xl">
            <div className="w-8 h-8 mx-auto mb-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-600">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPropertyMaster;
