import React, { useState } from "react";
import MaintenanceHeader from "./MaintenanceHeader";
import MaintenanceStats from "./MaintenanceStats";
import MaintenanceBody from "./MaintenanceBody";
import AddMaintenanceModal from "./AddMaintenanceModal";
import { maintenanceData } from "@/data/landlord/maintenance/data";
// import Badge from "@/components/common/Badge/Badge";
// import { AlertTriangle } from "lucide-react";

const MaintenanceMaster = () => {
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
      <MaintenanceHeader onNewRequest={() => setAddModalOpen(true)} title={"Maintenance"} />
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
      {/* <Badge varient="alert"  icon={<AlertTriangle size={14} />}>
      Alert
      </Badge> */}
    </div>
  );
};

export default MaintenanceMaster;
