import React, { useState } from "react";
import WarningHeader from "./WarningHeader";
import WarningStats from "./WarningStats";
import WarningBody from "./WarningBody";
import AddWarningModal from "./AddWarningModal";
import { warningData } from "@/data/landlord/issueWarning/data";

const IssueWarningMaster = () => {
  const [warnings, setWarnings] = useState(warningData);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Handler to add a new warning to the first group (or create a new group if needed)
  const handleAddWarning = (newWarning) => {
    setWarnings((prev) => {
      if (prev.length === 0) {
        return [{ id: 1, warningsList: [newWarning] }];
      }
      // Add to the first group for simplicity
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        warningsList: [newWarning, ...updated[0].warningsList],
      };
      return updated;
    });
    setAddModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6">
      <WarningHeader onAddWarning={() => setAddModalOpen(true)} />
      <WarningStats warnings={warnings} />
      <WarningBody warnings={warnings} setWarnings={setWarnings} />
      <AddWarningModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddWarning={handleAddWarning}
      />
    </div>
  );
};

export default IssueWarningMaster;
 