import {  User2 } from "lucide-react";
import React from "react";

const TenantHeader = ({ onAddTenant }) => {
  return (
    <header className="flex items-center justify-between ">
      <div className="flex items-center gap-3">
        <User2 className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tenants</h1>
          <p className="mt-1 text-gray-600">
            Manage tenant information and communication
          </p>
        </div>
      </div>
      <button onClick={onAddTenant} className="myButton">
        Add Tenant
      </button>
    </header>
  );
};

export default TenantHeader;
