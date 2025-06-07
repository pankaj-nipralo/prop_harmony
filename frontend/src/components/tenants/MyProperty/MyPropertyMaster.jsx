import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import PropertyStatsCards from './PropertyStatsCards';
import PropertyDetailsCard from './PropertyDetailsCard';
import PropertyActionsPanel from './PropertyActionsPanel';
import PropertyDocumentsSection from './PropertyDocumentsSection';
import PropertyMaintenanceHistory from './PropertyMaintenanceHistory';

// Import data
import { 
  currentProperty, 
  leaseInformation, 
  contactInformation, 
  propertyDocuments, 
  // maintenanceHistory, 
  propertyStats, 
  quickActions 
} from '../../../data/tenants/propertyPageData';

const MyPropertyMaster = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Navigation handlers
  const handleActionClick = (route) => {
    navigate(route);
  };

  const handleContactLandlord = () => {
    navigate('/tenants/messages', { 
      state: { 
        recipient: contactInformation.landlord.name,
        email: contactInformation.landlord.email 
      }
    });
  };

  const handleContactManager = () => {
    navigate('/tenants/messages', { 
      state: { 
        recipient: contactInformation.propertyManager.name,
        email: contactInformation.propertyManager.email 
      }
    });
  };

  // Document handlers
  const handleDownloadDocument = (document) => {
    setLoading(true);
    try {
      // Simulate document download
      const link = document.createElement('a');
      link.href = document.downloadUrl;
      link.download = document.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // In a real app, you would track download analytics here
      console.log(`Downloaded: ${document.name}`);
    } catch (err) {
      setError('Failed to download document');
      console.error('Download error:', err);
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Property</h2>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Property</h1>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Active Lease
          </span>
        </div>

        {/* Property Stats Cards */}
        <PropertyStatsCards stats={propertyStats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
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
            
            <PropertyActionsPanel 
              actions={quickActions}
              onActionClick={handleActionClick}
            />
            
          </div>
        </div>

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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Processing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPropertyMaster;
