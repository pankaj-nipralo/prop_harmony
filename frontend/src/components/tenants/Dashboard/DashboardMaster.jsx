import React, { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  FileText,
  Eye,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import components
import OverviewTab from './OverviewTab';
import PropertiesTab from './PropertiesTab';
import ApplicationsTab from './ApplicationsTab';
import InspectionsTab from './InspectionsTab';

// Import data
import { stats, recentPayments, recentMaintenance, landlordInfo } from '../../../data/tenants/dashboard/tenantData';
import { propertyData, currentPropertyStatus } from '../../../data/tenants/dashboard/propertyData';
import { applications, applicationFilters } from '../../../data/tenants/dashboard/applicationData';
import { inspections, inspectionTableHeaders } from '../../../data/tenants/dashboard/inspectionData';

const DashboardMaster = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tenant Dashboard</h1>
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            <AlertTriangle className="w-4 h-4" />
            Report Landlord Issue
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all font-medium ${
              activeTab === 'overview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all font-medium ${
              activeTab === 'properties'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home className="w-4 h-4" />
            Properties
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all font-medium ${
              activeTab === 'applications'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Applications
          </button>
          <button
            onClick={() => setActiveTab('inspections')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all font-medium ${
              activeTab === 'inspections'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            Inspections
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab
            currentPropertyStatus={currentPropertyStatus}
            landlordInfo={landlordInfo}
            stats={stats}
            recentPayments={recentPayments}
            recentMaintenance={recentMaintenance}
          />
        )}

        {activeTab === 'properties' && (
          <PropertiesTab propertyData={propertyData} />
        )}

        {activeTab === 'applications' && (
          <ApplicationsTab
            applications={applications}
            applicationFilters={applicationFilters}
          />
        )}

        {activeTab === 'inspections' && (
          <InspectionsTab
            inspections={inspections}
            inspectionTableHeaders={inspectionTableHeaders}
          />
        )}

        {/* Report Landlord Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Report Landlord Issue</h3>
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 mb-6">
                  This will redirect you to the landlord reporting page where you can submit detailed complaints.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowReportModal(false);
                      navigate('/tenants/issue-warning');
                    }}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Continue to Report
                  </button>
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMaster;