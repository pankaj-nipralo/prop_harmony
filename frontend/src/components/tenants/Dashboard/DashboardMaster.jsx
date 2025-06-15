import React, { useState } from "react";
import {
  LayoutDashboard,
  Home,
  FileText,
  Eye,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import components
import OverviewTab from "./OverviewTab";
import PropertiesTab from "./PropertiesTab";
import ApplicationsTab from "./ApplicationsTab";
import InspectionsTab from "./InspectionsTab";

// Import data
import {
  stats,
  recentPayments,
  recentMaintenance,
  landlordInfo,
} from "../../../data/tenants/dashboard/tenantData";
import {
  propertyData,
  currentPropertyStatus,
} from "../../../data/tenants/dashboard/propertyData";
import { applications } from "../../../data/tenants/dashboard/applicationData";
import {
  inspections,
  inspectionTableHeaders,
} from "../../../data/tenants/dashboard/inspectionData";

const DashboardMaster = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div className="min-h-screen p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tenant Dashboard</h1>
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
        >
          <AlertTriangle className="w-4 h-4" />
          Report Landlord Issue
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1 mb-8 bg-white shadow-sm justify-self-center rounded-xl w-fit">
        {[
          { key: "overview", label: "Overview", icon: LayoutDashboard },
          { key: "properties", label: "Properties", icon: Home },
          // { key: "applications", label: "Applications", icon: FileText },
          // { key: "inspections", label: "Inspections", icon: Eye },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center cursor-pointer gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all focus:outline-none ${activeTab === key
                ? "bg-blue-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-100 "
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <OverviewTab
          currentPropertyStatus={currentPropertyStatus}
          landlordInfo={landlordInfo}
          stats={stats}
          recentPayments={recentPayments}
          recentMaintenance={recentMaintenance}
          propertyData={propertyData}
        />
      )}

      {activeTab === "properties" && (
        <PropertiesTab propertyData={propertyData} />
      )}

      {activeTab === "applications" && (
        <ApplicationsTab applications={applications} />
      )}

      {activeTab === "inspections" && (
        <InspectionsTab
          inspections={inspections}
          inspectionTableHeaders={inspectionTableHeaders}
        />
      )}

      {/* Report Landlord Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/30">
          <div className="w-full max-w-md mx-4 bg-white shadow-xl rounded-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Report Landlord Issue
                </h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 transition-colors hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <p className="mb-6 text-gray-600">
                This will redirect you to the landlord reporting page where you
                can submit detailed complaints.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    navigate("/tenants/report-landlord");
                  }}
                  className="flex-1 px-4 py-2 font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Continue to Report
                </button>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMaster;
