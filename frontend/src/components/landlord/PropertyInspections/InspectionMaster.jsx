import React, { useState } from "react";
import InspectionHeader from "./InspectionHeader";
import InspectionStats from "./InspectionStats";
import InspectionBody from "./InspectionBody";
import AddInspectionModal from "./AddInspectionModal";
import { useInspectionSync } from "@/hooks/useInspectionSync";

const InspectionMaster = () => {
  const { inspections, addInspection, isLoading } = useInspectionSync();
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Handler to add a new inspection
  const handleAddInspection = (newInspection) => {
    addInspection(newInspection);
    setAddModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading inspections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <InspectionHeader onNewInspection={() => setAddModalOpen(true)} />
      <InspectionStats inspections={inspections} />
      <InspectionBody />
      <AddInspectionModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddInspection={handleAddInspection}
      />
    </div>
  );
};

export default InspectionMaster;
