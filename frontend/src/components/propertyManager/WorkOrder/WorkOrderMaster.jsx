import React, { useState } from "react";
import MaintenanceHeader from "../../landlord/Maintenance/MaintenanceHeader";
import MaintenanceStats from "../../landlord/Maintenance/MaintenanceStats";
import MaintenanceBody from "../../landlord/Maintenance/MaintenanceBody";
import AddMaintenanceModal from "../../landlord/Maintenance/AddMaintenanceModal";
import { maintenanceData } from "@/data/landlord/maintenance/data";

const WorkOrderMaster = () => {
  const [maintenance, setMaintenance] = useState(maintenanceData);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Handler to add a new maintenance request to the first group (or create a new group if needed)
  const handleAddMaintenance = (newMaintenance) => {
    setMaintenance((prev) => {
      if (prev.length === 0) {
        return [{ id: 1, maintenanceList: [newMaintenance] }];
      }
      // Add to the first group for simplicity
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        maintenanceList: [newMaintenance, ...updated[0].maintenanceList],
      };
      return updated;
    });
    setAddModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6">
      <MaintenanceHeader onNewRequest={() => setAddModalOpen(true)} />
      <MaintenanceStats maintenance={maintenance} />
      <MaintenanceBody
        maintenance={maintenance}
        setMaintenance={setMaintenance}
      />
      <AddMaintenanceModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddMaintenance={handleAddMaintenance}
      />
    </div>
  );
};

export default WorkOrderMaster;
