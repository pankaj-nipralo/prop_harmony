import React from "react";

const TenantHeader = ({ onAddTenant }) => {
  return (
    <header className="flex items-center justify-between ">
      <h1 className="text-xl font-semibold text-gray-900">Tenant Management</h1>
      <button onClick={onAddTenant} className="myButton">
        Add Tenant
      </button>
    </header>
  );
};

export default TenantHeader;
