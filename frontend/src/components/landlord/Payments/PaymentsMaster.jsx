import React, { useState, useEffect } from "react";
import PaymentsHeader from "./PaymentsHeader";
import PaymentsStats from "./PaymentsStats";
import PaymentsBody from "./PaymentsBody";
import AddPaymentModal from "./AddPaymentModal";
import PaymentDetailsModal from "./PaymentDetailsModal";
import { 
  paymentsData, 
  searchPayments, 
  filterPayments, 
  calculatePaymentStats 
} from "@/data/landlord/payments/data";

const PaymentsMaster = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    method: "all",
    property: "all",
    dateFrom: "",
    dateTo: "",
    amountFrom: "",
    amountTo: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({});

  // Modal states
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  // Load payments data
  useEffect(() => {
    const loadPayments = () => {
      setIsLoading(true);
      try {
        const allPayments = paymentsData[0]?.paymentsList || [];
        setPayments(allPayments);
        setFilteredPayments(allPayments);
        setStats(calculatePaymentStats(allPayments));
      } catch (error) {
        console.error("Error loading payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPayments();
  }, []);

  // Apply search and filters
  useEffect(() => {
    let result = payments;

    // Apply search
    if (searchTerm) {
      result = searchPayments(result, searchTerm);
    }

    // Apply filters
    result = filterPayments(result, filters);

    setFilteredPayments(result);
    setStats(calculatePaymentStats(result));
  }, [payments, searchTerm, filters]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleAddPayment = () => {
    setEditingPayment(null);
    setShowAddPaymentModal(true);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setShowAddPaymentModal(true);
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentDetailsModal(true);
  };

  const handleDeletePayment = async (payment) => {
    if (window.confirm(`Are you sure you want to delete payment ${payment.paymentId}?`)) {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const updatedPayments = payments.filter(p => p.id !== payment.id);
        setPayments(updatedPayments);
        
        // Show success message
        alert("Payment deleted successfully!");
      } catch (error) {
        console.error("Error deleting payment:", error);
        alert("Error deleting payment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSavePayment = async (paymentData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (editingPayment) {
        // Update existing payment
        const updatedPayments = payments.map(p => 
          p.id === editingPayment.id 
            ? { ...paymentData, id: editingPayment.id, paymentId: editingPayment.paymentId }
            : p
        );
        setPayments(updatedPayments);
        alert("Payment updated successfully!");
      } else {
        // Add new payment
        const newPayment = {
          ...paymentData,
          id: Date.now(),
          paymentId: `PAY-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`
        };
        setPayments([newPayment, ...payments]);
        alert("Payment recorded successfully!");
      }
      
      setShowAddPaymentModal(false);
      setEditingPayment(null);
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Error saving payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReceipt = async (payment) => {
    try {
      // Simulate receipt download
      alert(`Downloading receipt for payment ${payment.paymentId}...`);
      
      // In a real app, this would trigger a file download
      const link = document.createElement('a');
      link.href = payment.receiptUrl || '#';
      link.download = `receipt-${payment.paymentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading receipt:", error);
      alert("Error downloading receipt. Please try again.");
    }
  };

  const handleSendReminder = async (payment) => {
    try {
      setIsLoading(true);
      
      // Simulate sending reminder
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Payment reminder sent to ${payment.tenantName} for payment ${payment.paymentId}`);
    } catch (error) {
      console.error("Error sending reminder:", error);
      alert("Error sending reminder. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReminders = async () => {
    const pendingPayments = filteredPayments.filter(p => p.status === "pending" || p.status === "overdue");
    
    if (pendingPayments.length === 0) {
      alert("No pending or overdue payments found.");
      return;
    }

    if (window.confirm(`Send payment reminders to ${pendingPayments.length} tenants?`)) {
      try {
        setIsLoading(true);
        
        // Simulate sending bulk reminders
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        alert(`Payment reminders sent to ${pendingPayments.length} tenants successfully!`);
      } catch (error) {
        console.error("Error sending reminders:", error);
        alert("Error sending reminders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleExportPayments = async () => {
    try {
      setIsLoading(true);
      
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would generate and download a CSV/Excel file
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Payment ID,Tenant,Property,Amount,Status,Due Date,Paid Date\n" +
        filteredPayments.map(p => 
          `${p.paymentId},${p.tenantName},${p.propertyName},${p.amount},${p.status},${p.dueDate},${p.paidDate || 'N/A'}`
        ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `payments-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert("Payments exported successfully!");
    } catch (error) {
      console.error("Error exporting payments:", error);
      alert("Error exporting payments. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reload data
      const allPayments = paymentsData[0]?.paymentsList || [];
      setPayments(allPayments);
      setFilteredPayments(allPayments);
      setStats(calculatePaymentStats(allPayments));
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <PaymentsHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onAddPayment={handleAddPayment}
          onExportPayments={handleExportPayments}
          onSendReminders={handleSendReminders}
          onRefresh={handleRefresh}
          onShowFilters={handleShowFilters}
          showFilters={showFilters}
          totalPayments={filteredPayments.length}
          isLoading={isLoading}
        />

        {/* Stats */}
        <PaymentsStats stats={stats} isLoading={isLoading} />

        {/* Body */}
        <PaymentsBody
          payments={filteredPayments}
          isLoading={isLoading}
          onViewPayment={handleViewPayment}
          onEditPayment={handleEditPayment}
          onDeletePayment={handleDeletePayment}
          onDownloadReceipt={handleDownloadReceipt}
          onSendReminder={handleSendReminder}
          onAddPayment={handleAddPayment}
          showFilters={showFilters}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Add/Edit Payment Modal */}
        <AddPaymentModal
          isOpen={showAddPaymentModal}
          onClose={() => {
            setShowAddPaymentModal(false);
            setEditingPayment(null);
          }}
          onSave={handleSavePayment}
          editingPayment={editingPayment}
        />

        {/* Payment Details Modal */}
        <PaymentDetailsModal
          isOpen={showPaymentDetailsModal}
          onClose={() => {
            setShowPaymentDetailsModal(false);
            setSelectedPayment(null);
          }}
          payment={selectedPayment}
          onEdit={handleEditPayment}
          onDownloadReceipt={handleDownloadReceipt}
          onSendReminder={handleSendReminder}
        />
      </div>
    </div>
  );
};

export default PaymentsMaster;
