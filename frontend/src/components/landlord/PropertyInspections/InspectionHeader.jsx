import React from "react";
import { ClipboardCheck, Plus } from "lucide-react";

const InspectionHeader = ({ onNewInspection }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <ClipboardCheck className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Property Inspections</h1>
          <p className="mt-1 text-gray-600 text-md ">Manage property inspections and view reports</p>
        </div>
      </div>
      <button 
        onClick={onNewInspection} 
        className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 hover:shadow-xl"
      >
        <Plus size={20} />
        New Inspection Request
      </button>
    </header>
  );
};

export default InspectionHeader;
