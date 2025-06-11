import React from "react";
import { Wrench, Plus } from "lucide-react";

const MaintenanceHeader = ({ onNewRequest, title }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Wrench className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-gray-600">Manage maintenance requests and track progress</p>
        </div>
      </div>
      <button 
        onClick={onNewRequest} 
        className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 hover:shadow-xl"
      >
        <Plus size={20} />
        Create Work Order
      </button>
    </header>
  );
};

export default MaintenanceHeader;
