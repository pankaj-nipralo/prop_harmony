import React, { useState } from 'react';

// Import components
import ReportHeader from './ReportHeader';
import ImportantNotice from './ImportantNotice';
import SubmitComplaintForm from './SubmitComplaintForm';
import NeedHelpSection from './NeedHelpSection';

// Import data
import { reportData, issueCategories, priorityLevels, helpData } from '../../../data/tenants/propertyLandlordData';

const LandlordMaster = () => {
  const [activeTab, setActiveTab] = useState('submit');
  const [formData, setFormData] = useState({
    landlordName: '',
    propertyAddress: '',
    incidentDate: '',
    issueCategory: '',
    priorityLevel: '',
    subject: '',
    detailedDescription: '',
    evidence: null
  });

  const handleFormSubmit = (data) => {
    console.log('Report submitted:', data);
    // Handle form submission logic here
  };

  const handleFormClear = () => {
    setFormData({
      landlordName: '',
      propertyAddress: '',
      incidentDate: '',
      issueCategory: '',
      priorityLevel: '',
      subject: '',
      detailedDescription: '',
      evidence: null
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Navigation */}
      <ReportHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Important Notice */}
      <ImportantNotice notice={reportData.importantNotice} />

      {/* Main Content */}
      {activeTab === 'submit' && (
        <>
          <SubmitComplaintForm
            formData={formData}
            setFormData={setFormData}
            issueCategories={issueCategories}
            priorityLevels={priorityLevels}
            onSubmit={handleFormSubmit}
            onClear={handleFormClear}
          />
          <NeedHelpSection helpData={helpData} />
        </>
      )}

      {activeTab === 'history' && (
        <div className="p-8 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Report History</h3>
          <p className="text-gray-600">No previous reports found.</p>
        </div>
      )}
    </div>
  );
};

export default LandlordMaster;