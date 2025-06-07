import React from 'react';
import PropertyDetailsCard from './PropertyDetailsCard';
import StatsCards from './StatsCards';
import PaymentsTable from './PaymentsTable';
import MaintenanceTable from './MaintenanceTable';

const OverviewTab = ({ 
  currentPropertyStatus, 
  landlordInfo, 
  stats, 
  recentPayments, 
  recentMaintenance 
}) => {
  return (
    <div className="space-y-8">
      {/* My Property Details */}
      <PropertyDetailsCard 
        currentPropertyStatus={currentPropertyStatus}
        landlordInfo={landlordInfo}
      />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Recent Rent Payments */}
      <PaymentsTable payments={recentPayments} />

      {/* Recent Maintenance Requests */}
      <MaintenanceTable maintenanceRequests={recentMaintenance} />
    </div>
  );
};

export default OverviewTab;
