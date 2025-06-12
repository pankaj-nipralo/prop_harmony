import React, { useState } from "react";
import TenantHeader from "./TenantHeader";
import TenantStats from "./TenantStats";
import TenantBody from "./TenantBody";
import AddTenantModal from "./AddTenantModal";
import { tenantData } from "@/data/landlord/tenant/data";

const TenantMaster = () => {
  const [tenants, setTenants] = useState(tenantData);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Handler to add a new tenant to the first group (or create a new group if needed)
  const handleAddTenant = (newTenant) => {
    setTenants((prev) => {
      if (prev.length === 0) {
        return [{ id: 1, tenantsList: [newTenant] }];
      }
      // Add to the first group for simplicity
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        tenantsList: [newTenant, ...updated[0].tenantsList],
      };
      return updated;
    });
    setAddModalOpen(false);
  };

  return (
    <div className="p-6">
      <TenantHeader onAddTenant={() => setAddModalOpen(true)} />
      <TenantStats tenants={tenants} />
      <TenantBody tenants={tenants} />
      <AddTenantModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddTenant={handleAddTenant}
      />
    </div>
  );
};

export default TenantMaster;
