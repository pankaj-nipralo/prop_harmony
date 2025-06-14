import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useAuth } from "@/contexts/AuthContext";

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

const statusColors = {
  expired: "bg-red-100 text-red-700",
  expiring: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
};
const renewalColors = {
  pending: "bg-blue-100 text-blue-700",
  "in negotiation": "bg-orange-100 text-orange-700",
  "not started": "bg-gray-100 text-gray-700",
};

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
  // const { user } = useAuth();

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

  // Get unique landlords for filter options
  const landlordOptions = [
    { label: "All Landlords", value: "all" },
    ...Array.from(new Set(leases.map(lease => lease.landlord))).map(landlord => ({
      label: landlord,
      value: landlord
    }))
  ];

  // Filtering logic
  const filteredLeases = leases.filter((row) => {
    const matchesFilter = filter === "all" || row.status === filter;
    const matchesLandlord = landlordFilter === "all" || row.landlord === landlordFilter;
    const matchesSearch = Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesFilter && matchesLandlord && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col justify-between mb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Lease Management
              </h1>
              <p className="text-sm text-gray-500">
                Manage all active and expiring leases
              </p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-2 px-5 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                New Lease
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Create New Lease
                  </h2>
                </div>
                <form onSubmit={handleSubmitNewLease} className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label
                        htmlFor="property"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Property *
                      </Label>
                      <Input
                        id="property"
                        name="property"
                        value={newLease.property}
                        onChange={handleInputChange}
                        placeholder="Enter property name"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="unit"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Unit *
                      </Label>
                      <Input
                        id="unit"
                        name="unit"
                        value={newLease.unit}
                        onChange={handleInputChange}
                        placeholder="Enter unit number"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="tenant"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Tenant *
                      </Label>
                      <Input
                        id="tenant"
                        name="tenant"
                        value={newLease.tenant}
                        onChange={handleInputChange}
                        placeholder="Enter tenant name"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="landlord"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Landlord *
                      </Label>
                      <Input
                        id="landlord"
                        name="landlord"
                        value={newLease.landlord}
                        onChange={handleInputChange}
                        placeholder="Enter landlord name"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="startDate"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Start Date *
                      </Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={newLease.startDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="endDate"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        End Date *
                      </Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={newLease.endDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
                    <Button
                      type="button"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                    >
                      Create Lease
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-green-500" /> Total Active
                Leases
              </span>
              <span className="text-3xl font-bold text-green-600">3</span>
              <span className="text-xs text-gray-500">
                Across all properties
              </span>
            </div>
          </Card>
          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4 text-yellow-500" /> Expiring Soon
              </span>
              <span className="text-3xl font-bold text-yellow-600">1</span>
              <span className="text-xs text-gray-500">Within 30 days</span>
            </div>
          </Card>
          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Expired
              </span>
              <span className="text-3xl font-bold text-red-600">1</span>
              <span className="text-xs text-gray-500">Require action</span>
            </div>
          </Card>
          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-500" /> Renewals
                Pending
              </span>
              <span className="text-3xl font-bold text-blue-600">2</span>
              <span className="text-xs text-gray-500">In progress</span>
            </div>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search leases..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <select
              className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={landlordFilter}
              onChange={(e) => setLandlordFilter(e.target.value)}
            >
              {landlordOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* <Button variant="outline" className="border border-gray-200">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button> */}
          </div>
        </div>

        {/* Lease Details Table */}
        <Card className="p-0 overflow-hidden border border-gray-200 shadow-sm">
          <div className="p-5 bg-white border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Lease Details
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-gray-700">
                  <th className="px-4 py-3 font-semibold text-left">
                    Landlord
                  </th>
                  <th className="px-4 py-3 font-semibold text-left">
                    Property
                  </th>
                  <th className="px-4 py-3 font-semibold text-left">Tenant</th>
                  <th className="px-4 py-3 font-semibold text-left">
                    End Date
                  </th>
                  <th className="px-4 py-3 font-semibold text-left">Status</th>
                  <th className="px-4 py-3 font-semibold text-left">
                    Renewal Status
                  </th>
                  <th className="px-4 py-3 font-semibold text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeases.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-gray-50/80"
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold text-gray-900">
                        {row.landlord}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-gray-900">
                        {row.property}
                      </div>
                      <div className="text-xs text-gray-500">{row.unit}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">
                        {row.tenant}
                      </div>
                      <div className="text-xs text-gray-500">
                        {row.landlord}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-gray-700">{row.endDate}</div>
                      <div
                        className={`text-xs font-medium ${row.daysUntilExpiry < 0
                            ? "text-red-600"
                            : row.daysUntilExpiry <= 30
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                      >
                        {row.daysUntilExpiry < 0
                          ? `Expired ${Math.abs(row.daysUntilExpiry)} days ago`
                          : `${row.daysUntilExpiry} days remaining`}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium max-w-fit ${statusColors[row.status]
                            }`}
                        >
                          {row.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium max-w-fit ${renewalColors[row.renewalStatus]
                            }`}
                        >
                          {row.renewalStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Dialog
                          open={isViewDialogOpen}
                          onOpenChange={setIsViewDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => handleViewLease(row)}
                              className="px-3 py-1 text-xs font-medium text-blue-600 bg-white border border-blue-200 rounded-full hover:bg-blue-50"
                            >
                              View
                            </Button>
                          </DialogTrigger>



                          <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                  Lease Details
                                </h2>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <Label className="block mb-2 text-sm font-medium text-gray-700">
                                    Property
                                  </Label>
                                  <p className="text-gray-900">
                                    {selectedLease?.property}
                                  </p>
                                </div>
                                <div>
                                  <Label className="block mb-2 text-sm font-medium text-gray-700">
                                    Unit
                                  </Label>
                                  <p className="text-gray-900">
                                    {selectedLease?.unit}
                                  </p>
                                </div>
                                <div>
                                  <Label className="block mb-2 text-sm font-medium text-gray-700">
                                    Tenant
                                  </Label>
                                  <p className="text-gray-900">
                                    {selectedLease?.tenant}
                                  </p>
                                </div>
                                <div>
                                  <Label className="block mb-2 text-sm font-medium text-gray-700">
                                    Landlord
                                  </Label>
                                  <p className="text-gray-900">
                                    {selectedLease?.landlord}
                                  </p>
                                </div>
                                <div>
                                  <Label className="block mb-2 text-sm font-medium text-gray-700">
                                    Start Date
                                  </Label>
                                  <p className="text-gray-900">
                                    {selectedLease?.startDate}
                                  </p>
                                </div>
                                <div>
                                  <Label className="block mb-2 text-sm font-medium text-gray-700">
                                    End Date
                                  </Label>
                                  <p className="text-gray-900">
                                    {selectedLease?.endDate}
                                  </p>
                                </div>
                                <div>
                                  <Label className="block mb-2 text-sm font-medium text-gray-700">
                                    Status
                                  </Label>
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedLease?.status]
                                      }`}
                                  >
                                    {selectedLease?.status}
                                  </span>
                                </div>
                                <div>
                                  <Label className="block mb-2 text-sm font-medium text-gray-700">
                                    Renewal Status
                                  </Label>
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${renewalColors[
                                      selectedLease?.renewalStatus
                                      ]
                                      }`}
                                  >
                                    {selectedLease?.renewalStatus}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-gray-200">
                                <Button
                                  onClick={() => setIsViewDialogOpen(false)}
                                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                                >
                                  Close
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog
                          open={isRenewDialogOpen}
                          onOpenChange={setIsRenewDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => handleRenewLease(row)}
                              className="px-3 py-1 text-xs font-medium text-white bg-blue-600 border border-blue-600 rounded-full hover:bg-blue-700"
                            >
                              Renew
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                  Renew Lease
                                </h2>
                              </div>
                              <form
                                onSubmit={handleRenewSubmit}
                                className="space-y-4"
                              >
                                <div className="grid gap-4">
                                  <div>
                                    <Label className="block mb-2 text-sm font-medium text-gray-700">
                                      Property
                                    </Label>
                                    <p className="text-gray-900">
                                      {selectedLease?.property}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="block mb-2 text-sm font-medium text-gray-700">
                                      Unit
                                    </Label>
                                    <p className="text-gray-900">
                                      {selectedLease?.unit}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="block mb-2 text-sm font-medium text-gray-700">
                                      Current End Date
                                    </Label>
                                    <p className="text-gray-900">
                                      {selectedLease?.endDate}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="block mb-2 text-sm font-medium text-gray-700">
                                      New End Date
                                    </Label>
                                    {selectedLease &&
                                      (() => {
                                        const newEndDate = new Date(
                                          selectedLease.endDate
                                        );
                                        newEndDate.setFullYear(
                                          newEndDate.getFullYear() + 1
                                        );
                                        return newEndDate.toLocaleDateString();
                                      })()}
                                  </div>
                                </div>
                                <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-gray-200">
                                  <Button
                                    type="button"
                                    onClick={() => setIsRenewDialogOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                                  >
                                    Confirm Renewal
                                  </Button>
                                </div>
                              </form>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LeaseManagementMaster;
