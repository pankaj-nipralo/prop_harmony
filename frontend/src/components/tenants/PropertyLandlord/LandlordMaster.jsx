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
    <div className="space-y-6">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Report History</h3>
          <p className="text-gray-600">No previous reports found.</p>
        </div>
      )}
    </div>
  );
};

export default LandlordMaster;