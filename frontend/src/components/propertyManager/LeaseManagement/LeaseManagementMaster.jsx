import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import LeaseManagementHeader from "./LeaseManagementHeader";
import AddLeaseDialog from "./AddLeaseDialog";
import LeaseCardStats from "./LeaseCardStats";
import LeaseFilters from "./LeaseFilters";
import LeaseTable from "./LeaseTable";

// Lease data for table
const leaseData = [
  {
    id: 1,
    landlord: "Pankaj Gupta",
    property: "Sunset Apartments",
    unit: "Unit 101",
    tenant: "John Smith",
    startDate: "1/1/2023",
    endDate: "1/1/2024",
    daysUntilExpiry: -30,
    status: "expired",
    renewalStatus: "pending",
  },
  {
    id: 2,
    landlord: "Gaurav Kanchan",
    property: "Marina View",
    unit: "Unit 205",
    tenant: "Sarah Johnson",
    startDate: "6/1/2023",
    endDate: "6/1/2024",
    daysUntilExpiry: 15,
    status: "expiring",
    renewalStatus: "in negotiation",
  },
  {
    id: 3,
    landlord: "Uzair Sayyed",
    property: "Central Plaza",
    unit: "Unit 304",
    tenant: "Mike Wilson",
    startDate: "9/1/2023",
    endDate: "9/1/2024",
    daysUntilExpiry: 90,
    status: "active",
    renewalStatus: "not started",
  },
];

const filterOptions = [
  { label: "All Leases", value: "all" },
  { label: "Active", value: "active" },
  { label: "Expiring Soon", value: "expiring" },
  { label: "Expired", value: "expired" },
];

const LeaseManagementMaster = () => {
  const [filter, setFilter] = useState("all");
  const [landlordFilter, setLandlordFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [leases, setLeases] = useState(leaseData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false);
  const [selectedLease, setSelectedLease] = useState(null);
  const [newLease, setNewLease] = useState({
    property: "",
    unit: "",
    tenant: "",
    landlord: "",
    startDate: "",
    endDate: "",
  });

  // Calculate stats for cards
  const stats = {
    active: leases.filter((lease) => lease.status === "active").length,
    expiring: leases.filter((lease) => lease.status === "expiring").length,
    expired: leases.filter((lease) => lease.status === "expired").length,
    pending: leases.filter(
      (lease) =>
        lease.renewalStatus === "pending" ||
        lease.renewalStatus === "in negotiation"
    ).length,
  };

  // Get unique landlords for filter options
  const landlordOptions = [
    { label: "All Landlords", value: "all" },
    ...Array.from(new Set(leases.map((lease) => lease.landlord))).map(
      (landlord) => ({
        label: landlord,
        value: landlord,
      })
    ),
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLease({ ...newLease, [name]: value });
  };

  // Handle new lease submission
  const handleSubmitNewLease = (e) => {
    e.preventDefault();

    // Calculate days until expiry
    const endDate = new Date(newLease.endDate);
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Determine status
    let status;
    if (daysUntilExpiry < 0) {
      status = "expired";
    } else if (daysUntilExpiry <= 30) {
      status = "expiring";
    } else {
      status = "active";
    }

    const leaseToAdd = {
      id: leases.length + 1,
      ...newLease,
      daysUntilExpiry,
      status,
      renewalStatus: "not started",
    };

    setLeases([...leases, leaseToAdd]);
    setIsAddDialogOpen(false);
    setNewLease({
      property: "",
      unit: "",
      tenant: "",
      landlord: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleViewLease = (lease) => {
    setSelectedLease(lease);
    setIsViewDialogOpen(true);
  };

  const handleRenewLease = (lease) => {
    setSelectedLease(lease);
    setIsRenewDialogOpen(true);
  };

  const handleRenewSubmit = (e) => {
    e.preventDefault();

    const updatedLeases = leases.map((lease) => {
      if (lease.id === selectedLease.id) {
        const newEndDate = new Date(selectedLease.endDate);
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);

        return {
          ...lease,
          endDate: newEndDate.toLocaleDateString(),
          renewalStatus: "in negotiation",
          daysUntilExpiry: 365,
        };
      }
      return lease;
    });

    setLeases(updatedLeases);
    setIsRenewDialogOpen(false);
    setSelectedLease(null);
  };

  // Filtering logic
  const filteredLeases = leases.filter((row) => {
    const matchesFilter = filter === "all" || row.status === filter;
    const matchesLandlord =
      landlordFilter === "all" || row.landlord === landlordFilter;
    const matchesSearch = Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesFilter && matchesLandlord && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex w-full justify-between items-center">
          <LeaseManagementHeader
            title="Lease Management"
            description="Manage all active and expiring leases"
          />
          <AddLeaseDialog
            isOpen={isAddDialogOpen}
            setIsOpen={setIsAddDialogOpen}
            newLease={newLease}
            handleInputChange={handleInputChange}
            handleSubmitNewLease={handleSubmitNewLease}
          />
        </div>

        <LeaseCardStats stats={stats} />

        <LeaseFilters
          filterOptions={filterOptions}
          landlordOptions={landlordOptions}
          filter={filter}
          setFilter={setFilter}
          landlordFilter={landlordFilter}
          setLandlordFilter={setLandlordFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <Card className="p-0 overflow-hidden border border-gray-200 shadow-sm">
          <div className="p-5 bg-white border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Lease Details
            </h2>
          </div>
          <LeaseTable
            leases={filteredLeases}
            handleViewLease={handleViewLease}
            handleRenewLease={handleRenewLease}
            selectedLease={selectedLease}
            isViewDialogOpen={isViewDialogOpen}
            setIsViewDialogOpen={setIsViewDialogOpen}
            isRenewDialogOpen={isRenewDialogOpen}
            setIsRenewDialogOpen={setIsRenewDialogOpen}
            handleRenewSubmit={handleRenewSubmit}
          />
        </Card>
      </div>
    </div>
  );
};

export default LeaseManagementMaster;
