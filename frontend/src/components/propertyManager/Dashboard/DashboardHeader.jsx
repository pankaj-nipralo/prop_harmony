import { Users } from "lucide-react";
import React from "react";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between mb-6"> 
        <Users className="w-6 h-6 text-gray-700" />
        <h1 className="text-2xl font-semibold text-gray-900">
          Property Managers
        </h1> 
    </header>
  );
};

export default DashboardHeader;
