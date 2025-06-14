import React, { useState } from "react";
import ManagerHeader from "./ManagerHeader";
import ManagerStats from "./ManagerStats";
import ManagerBody from "./ManagerBody";
import AddManagerModal from "./AddManagerModal";
import { propertyManagerData } from "@/data/landlord/propertyManager/data";

const ManagerMaster = () => {
  const [managers, setManagers] = useState(propertyManagerData);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Handler to add a new manager to the first group (or create a new group if needed)
  const handleAddManager = (newManager) => {
    setManagers((prev) => {
      if (prev.length === 0) {
        return [{ id: 1, managersList: [newManager] }];
      }
      // Add to the first group for simplicity
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        managersList: [newManager, ...updated[0].managersList],
      };
      return updated;
    });
    setAddModalOpen(false);
  };

  // Handler to assign properties to a manager
  const handleAssignProperties = (managerId, propertyIds) => {
    setManagers((prev) => {
      return prev.map((group) => ({
        ...group,
        managersList: group.managersList.map((manager) =>
          manager.id === managerId
            ? { ...manager, assignedProperties: propertyIds }
            : manager
        ),
      }));
    });
  };

  // Handler to update manager authorities
  const handleUpdateAuthorities = (managerId, authorities) => {
    setManagers((prev) => {
      return prev.map((group) => ({
        ...group,
        managersList: group.managersList.map((manager) =>
          manager.id === managerId
            ? { ...manager, authorities }
            : manager
        ),
      }));
    });
  };

  // Handler to remove manager
  const handleRemoveManager = (managerId) => {
    setManagers((prev) => {
      return prev.map((group) => ({
        ...group,
        managersList: group.managersList.filter((manager) => manager.id !== managerId),
      }));
    });
  };

  return (
    <div className="min-h-screen p-6">
      <ManagerHeader onAddManager={() => setAddModalOpen(true)} />
      <ManagerStats managers={managers} />
      <ManagerBody 
        managers={managers} 
        setManagers={setManagers}
        onAssignProperties={handleAssignProperties}
        onUpdateAuthorities={handleUpdateAuthorities}
        onRemoveManager={handleRemoveManager}
      />
      <AddManagerModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddManager={handleAddManager}
      />
    </div>
  );
};

export default ManagerMaster;
