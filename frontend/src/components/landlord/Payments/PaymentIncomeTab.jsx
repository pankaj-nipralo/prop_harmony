import React from "react";
import PaymentsStats from "./PaymentsStats";
import PaymentsBody from "./PaymentsBody";

const PaymentIncomeTab = ({
  payments,
  filteredPayments,
  isLoading,
  stats,
  showFilters,
  filters,
  searchTerm,
  onFilterChange,
  onSearchChange,
  onShowFilters,
  onRefresh,
  onViewPayment,
  onEditPayment,
  onDeletePayment,
  onDownloadReceipt,
  onSendReminder,
  onAddPayment,
}) => {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <PaymentsStats stats={stats || {}} isLoading={isLoading} />

      {/* Body */}
      <PaymentsBody
        payments={filteredPayments}
        isLoading={isLoading}
        onViewPayment={onViewPayment}
        onEditPayment={onEditPayment}
        onDeletePayment={onDeletePayment}
        onDownloadReceipt={onDownloadReceipt}
        onSendReminder={onSendReminder}
        onAddPayment={onAddPayment}
        showFilters={showFilters}
        filters={filters}
        onFilterChange={onFilterChange}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onShowFilters={onShowFilters}
        onRefresh={onRefresh}
        totalPayments={filteredPayments.length}
      />
    </div>
  );
};

export default PaymentIncomeTab;
