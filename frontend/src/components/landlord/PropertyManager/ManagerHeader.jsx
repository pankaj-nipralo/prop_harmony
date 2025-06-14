import React from "react";
import { Users } from "lucide-react";

const ManagerHeader = ({ onAddManager }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-gray-700" />
        <h1 className="text-2xl font-semibold text-gray-900">
          My Property Managers
        </h1>
      </div>
      <button
        onClick={onAddManager}
        className="px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Add Property Manager
      </button>
    </header>
  );
};

export default ManagerHeader;
