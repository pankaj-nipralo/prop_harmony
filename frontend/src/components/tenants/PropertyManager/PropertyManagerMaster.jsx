import React from 'react';

// Import components
import ManagerProfile from './ManagerProfile';
import ManagerResponsibilities from './ManagerResponsibilities';
import RecentActivities from './RecentActivities';
import EmergencyContact from './EmergencyContact';

// Import data
import { managerData, responsibilitiesData, activitiesData, emergencyData } from '../../../data/tenants/propertyManagerData';

const PropertyManagerMaster = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Property Manager</h1>
        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
          Active
        </span>
      </div>

      {/* Manager Profile */}
      <ManagerProfile manager={managerData} />

      {/* Manager Responsibilities */}
      <ManagerResponsibilities responsibilities={responsibilitiesData} />

      {/* Recent Activities */}
      <RecentActivities activities={activitiesData} />

      {/* Emergency Contact */}
      <EmergencyContact emergency={emergencyData} />
    </div>
  );
};

export default PropertyManagerMaster;
