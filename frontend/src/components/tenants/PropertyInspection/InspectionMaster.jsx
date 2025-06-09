import React, { useState } from 'react';

// Import components
import InspectionHeader from './InspectionHeader';
import ScheduledInspectionsTable from './ScheduledInspectionsTable';

// Import data
import { inspectionsData } from '../../../data/tenants/propertyInspectionData';

const InspectionMaster = () => {
  const [inspections, setInspections] = useState(inspectionsData);

  const handleApprove = (inspectionId) => {
    setInspections(prev =>
      prev.map(inspection =>
        inspection.id === inspectionId
          ? { ...inspection, status: 'Approved' }
          : inspection
      )
    );
    console.log('Approved inspection:', inspectionId);
  };

  const handleDeny = (inspectionId) => {
    setInspections(prev =>
      prev.map(inspection =>
        inspection.id === inspectionId
          ? { ...inspection, status: 'Denied' }
          : inspection
      )
    );
    console.log('Denied inspection:', inspectionId);
  };

  const handleReschedule = (inspectionId) => {
    console.log('Reschedule inspection:', inspectionId);
    // Reschedule functionality would be implemented here
  };

  const handleViewReport = (inspectionId) => {
    console.log('View report for inspection:', inspectionId);
    // View report functionality would be implemented here
  };

  return (
    <div className="p-6 space-y-6">
      <InspectionHeader />
      <ScheduledInspectionsTable
        inspections={inspections}
        onApprove={handleApprove}
        onDeny={handleDeny}
        onReschedule={handleReschedule}
        onViewReport={handleViewReport}
      />
    </div>
  );
};

export default InspectionMaster;