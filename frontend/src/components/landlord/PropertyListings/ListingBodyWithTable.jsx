import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Building2, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";
import { 
  DataGrid,
  createTextColumn,
  createCurrencyColumn,
  createBadgeColumn,
  createActionsColumn,
  exportToCSV
} from '@/components/common/Table';

const ListingBodyWithTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [listings, setListings] = useState([
    {
      id: 1,
      property: "Vikings Villa",
      title: "Vikings Saga Villa",
      description: "Spacious 4BR villa with private pool and marina views.",
      rent: 31333,
      deposit: 15000,
      minLease: "12 months",
      availableFrom: "2025-07-01",
      utilities: "Water, Electricity, Internet",
      amenities: "Pool, Gym, Parking",
      contactName: "Pankaj Gupta",
      phone: "+971-50-123-4567",
      email: "sp@redeye.com",
      status: "active",
      views: 1032,
      inquiries: 23,
      type: "Villa",
      location: "Dubai Marina"
    },
    {
      id: 2,
      property: "Sunset Apartments",
      title: "Modern 2BR Apartment",
      description: "Bright apartment with balcony, close to metro and mall.",
      rent: 8500,
      deposit: 8000,
      minLease: "6 months",
      availableFrom: "2025-08-15",
      utilities: "Water, Electricity",
      amenities: "Gym, Parking",
      contactName: "Sarah Lee",
      phone: "+971-55-987-6543",
      email: "sarah@example.com",
      status: "active",
      views: 1230,
      inquiries: 10,
      type: "Apartment",
      location: "Downtown Dubai"
    },
  ]);
  const [modalType, setModalType] = useState("create");
  const [selectedListing, setSelectedListing] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"

  // Action handlers for table
  const handleView = (listing) => {
    setSelectedListing(listing);
    setModalType("view");
    setShowModal(true);
  };

  const handleEdit = (listing) => {
    setSelectedListing(listing);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = (listing) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter((l) => l.id !== listing.id));
    }
  };

  const handleAdd = () => {
    setModalType("create");
    setShowModal(true);
  };

  const handleExport = () => {
    exportToCSV(listings, columns, 'property-listings.csv');
  };

  // Badge colors for status
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-red-100 text-red-800'
  };

  // Table columns configuration
  const columns = [
    createTextColumn('title', 'Property Title'),
    createTextColumn('location', 'Location'),
    createTextColumn('type', 'Type'),
    createCurrencyColumn('rent', 'Monthly Rent', 'AED'),
    createBadgeColumn('status', 'Status', statusColors),
    {
      key: 'views',
      label: 'Views',
      align: 'center',
      sortable: true
    },
    {
      key: 'inquiries',
      label: 'Inquiries',
      align: 'center',
      sortable: true
    },
    createActionsColumn({
      onView: handleView,
      onEdit: handleEdit,
      onDelete: handleDelete
    })
  ];

  return (
    <div className="bg-transparent">
      {/* Header Section */}
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Property Listings</h1>
            <p className="mt-1 text-gray-600">
              Manage rental listings and view inquiries
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === "cards" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === "table" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Table
            </button>
          </div>

          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <button
                className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={handleAdd}
              >
                <Plus className="w-5 h-5" /> Add Listing
              </button>
            </DialogTrigger>
            <DialogContent className="w-full !max-w-3xl bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {modalType === "view" ? "Listing Details" : 
                   modalType === "edit" ? "Edit Listing" : "Create Listing"}
                </h2>
                
                {modalType === "view" && selectedListing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Property</div>
                        <div className="font-medium">{selectedListing.property}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Title</div>
                        <div className="font-medium">{selectedListing.title}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Monthly Rent</div>
                        <div className="font-medium">AED {selectedListing.rent.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Status</div>
                        <div className="font-medium capitalize">{selectedListing.status}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Description</div>
                      <div className="font-medium">{selectedListing.description}</div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Form implementation would go here
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <span className="text-2xl font-bold text-gray-800">{listings.length}</span>
          <span className="mt-1 text-sm text-gray-500">Total Listings</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <span className="text-2xl font-bold text-green-600">
            {listings.filter((l) => l.status === "active").length}
          </span>
          <span className="mt-1 text-sm text-gray-500">Active</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <span className="text-2xl font-bold text-blue-600">
            {listings.reduce((sum, l) => sum + l.views, 0)}
          </span>
          <span className="mt-1 text-sm text-gray-500">Total Views</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <span className="text-2xl font-bold text-purple-600">
            {listings.reduce((sum, l) => sum + l.inquiries, 0)}
          </span>
          <span className="mt-1 text-sm text-gray-500">Inquiries</span>
        </div>
      </div>

      {/* Content - Cards or Table */}
      {viewMode === "table" ? (
        <DataGrid
          data={listings}
          columns={columns}
          title="Property Listings"
          subtitle="Manage all your property listings"
          searchable={true}
          exportable={true}
          onAdd={handleAdd}
          onExport={handleExport}
          searchFields={['title', 'location', 'contactName']}
          defaultPageSize={10}
        />
      ) : (
        /* Original Cards View */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex flex-col gap-3 p-6 transition-all duration-200 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 mr-2">
                  <div className="mb-1 text-lg font-semibold text-gray-900">
                    {listing.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {listing.property || listing.location}
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleView(listing)}
                    className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(listing)}
                    className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(listing)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="mb-2 text-xl font-bold text-blue-500">
                <DirhamSvg color1="" className="mb-1 mr-1" />
                {listing.rent.toLocaleString()}/month
              </div>

              <div className="mb-3 text-sm text-gray-700 line-clamp-2">
                {listing.description}
              </div>

              <div className="flex justify-between p-3 text-sm rounded-lg bg-gray-50">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{listing.views}</div>
                  <div className="text-xs text-gray-500">Views</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{listing.inquiries}</div>
                  <div className="text-xs text-gray-500">Inquiries</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingBodyWithTable;
