import React from "react";
import { AlertTriangle, Plus } from "lucide-react";

const WarningHeader = ({ onAddWarning }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-semibold text-gray-900">Issue Warning</h1>
      </div>
      <button 
        onClick={onAddWarning} 
        className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
      >
        <Plus size={18} />
        Issue Warning
      </button>
    </header>
  );
};

export default WarningHeader;
