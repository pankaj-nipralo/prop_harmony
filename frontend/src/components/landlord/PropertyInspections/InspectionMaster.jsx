import React, { useState } from "react";
import InspectionHeader from "./InspectionHeader";
import InspectionStats from "./InspectionStats";
import InspectionBody from "./InspectionBody";
import AddInspectionModal from "./AddInspectionModal";
import { inspectionData } from "@/data/landlord/propertyInspection/data";

const InspectionMaster = () => {
  const [inspections, setInspections] = useState(inspectionData);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Handler to add a new inspection to the first group (or create a new group if needed)
  const handleAddInspection = (newInspection) => {
    setInspections((prev) => {
      if (prev.length === 0) {
        return [{ id: 1, inspectionsList: [newInspection] }];
      }
      // Add to the first group for simplicity
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        inspectionsList: [newInspection, ...updated[0].inspectionsList],
      };
      return updated;
    });
    setAddModalOpen(false);
  };
 
  return (
    <div className="min-h-screen p-6">
      <InspectionHeader onNewInspection={() => setAddModalOpen(true)} />
      <InspectionStats inspections={inspections} />
      <InspectionBody
        inspections={inspections}
        setInspections={setInspections}
      />
      <AddInspectionModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddInspection={handleAddInspection}
      />
    </div>
  );
};

export default InspectionMaster;
