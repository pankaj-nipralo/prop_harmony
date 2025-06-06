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

  return (
    <div className="min-h-screen p-6">
      <ManagerHeader onAddManager={() => setAddModalOpen(true)} />
      <ManagerStats managers={managers} />
      <ManagerBody managers={managers} setManagers={setManagers} />
      <AddManagerModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddManager={handleAddManager}
      />
    </div>
  );
};

export default ManagerMaster;
