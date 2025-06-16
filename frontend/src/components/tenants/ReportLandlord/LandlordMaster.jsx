import React, { useState } from "react";

// Import components
import ReportHeader from "./ReportHeader";
import ImportantNotice from "./ImportantNotice";
import SubmitComplaintForm from "./SubmitComplaintForm";
import NeedHelpSection from "./NeedHelpSection";

// Import data
import {
  reportData,
  issueCategories,
  priorityLevels,
  helpData,
} from "../../../data/tenants/propertyLandlordData";

const LandlordMaster = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const [formData, setFormData] = useState({
    landlordName: "",
    propertyAddress: "",
    incidentDate: "",
    issueCategory: "",
    priorityLevel: "",
    subject: "",
    detailedDescription: "",
    evidence: null,
  });

  const handleFormSubmit = (data) => {
    console.log("Report submitted:", data);
    // Handle form submission logic here
  };

  const handleFormClear = () => {
    setFormData({
      landlordName: "",
      propertyAddress: "",
      incidentDate: "",
      issueCategory: "",
      priorityLevel: "",
      subject: "",
      detailedDescription: "",
      evidence: null,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Navigation */}
      <ReportHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Important Notice */}
      <ImportantNotice notice={reportData.importantNotice} />

      {/* Main Content */}
      {activeTab === "submit" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-2 ">
            <SubmitComplaintForm
              formData={formData}
              setFormData={setFormData}
              issueCategories={issueCategories}
              priorityLevels={priorityLevels}
              onSubmit={handleFormSubmit}
              onClear={handleFormClear}
            />
          </div>
          <NeedHelpSection helpData={helpData} />
        </div>
      )}

      {activeTab === "history" && (
        <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Report History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="sticky top-0 z-10 bg-white shadow-sm">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="transition-colors duration-150 hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap">2025-06-01</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Delayed Maintenance
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Maintenance</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-xs text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
                <tr className="transition-colors duration-150 bg-gray-50 hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap">2025-05-15</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Deposit Not Refunded
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Finance</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      Resolved
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-xs text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
                <tr className="transition-colors duration-150 hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap">2025-04-10</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Noise Complaint
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Community</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                      Rejected
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-xs text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandlordMaster;
