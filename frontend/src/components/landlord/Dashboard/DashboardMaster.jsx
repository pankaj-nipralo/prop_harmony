import React from "react";
import DashboardCards from "./DashboardCards";
import DashboardBody from "./DashboardBody";

const DashboardMaster = () => {
  return (
    
    <div className="min-h-screen p-6">
      
      <DashboardCards />
      <DashboardBody />
      
    </div>
  );
};

export default DashboardMaster;
