import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Building2 } from 'lucide-react';
import { 
  Table, 
  SimpleTable, 
  DataGrid,
  createActionsColumn,
  createCurrencyColumn,
  // createDateColumn,
  createBadgeColumn,
  createTextColumn,
  // BADGE_COLORS,
  exportToCSV
} from '@/components/common/Table';

/**
 * Working Property Table Demo using real property data
 */
const PropertyTableDemo = () => {
  // Real property data from your ListingBody
  const [properties] = useState([
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
    {
      id: 3,
      property: "Marina Heights",
      title: "Luxury 3BR Penthouse",
      description: "Premium penthouse with stunning marina views and private terrace.",
      rent: 25000,
      deposit: 20000,
      minLease: "12 months",
      availableFrom: "2025-09-01",
      utilities: "All Inclusive",
      amenities: "Pool, Gym, Parking, Concierge",
      contactName: "Ahmed Al Farsi",
      phone: "+971-50-999-8888",
      email: "ahmed@example.com",
      status: "pending",
      views: 856,
      inquiries: 15,
      type: "Penthouse",
      location: "Dubai Marina"
    }
  ]);

  // Action handlers
  const handleView = (item) => {
    alert(`Viewing property: ${item.title}\nLocation: ${item.location}\nRent: AED ${item.rent.toLocaleString()}/month`);
  };

  const handleEdit = (item) => {
    alert(`Editing property: ${item.title}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      alert(`Property "${item.title}" would be deleted`);
    }
  };

  const handleAdd = () => {
    alert('Opening form to add new property listing');
  };

  const handleExport = () => {
    exportToCSV(properties, columns, 'property-listings.csv');
    alert('Property listings exported to CSV!');
  };

  const handleRowClick = (item) => {
    console.log('Row clicked:', item);
    alert(`Quick view: ${item.title} - AED ${item.rent.toLocaleString()}/month`);
  };

  // Custom badge colors for property status
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800'
  };

  // Column configurations
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

  // Simple columns for basic table
  const simpleColumns = [
    { key: 'title', label: 'Property' },
    { key: 'location', label: 'Location' },
    { 
      key: 'rent', 
      label: 'Rent', 
      type: 'currency',
      currency: 'AED',
      align: 'right'
    },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'badge',
      badgeColors: statusColors,
      align: 'center'
    }
  ];

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Table Demo</h1>
          <p className="text-gray-600">
            Working examples using real property listing data from your application.
          </p>
        </div>

        {/* DataGrid Example - Most Advanced */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">DataGrid - Advanced Property Management</h2>
          <p className="text-gray-600">
            Complete property management with search, export, and add functionality.
          </p>
          
          <DataGrid
            data={properties}
            columns={columns}
            title="Property Listings Management"
            subtitle="Manage all your property listings with advanced features"
            searchable={true}
            filterable={false}
            exportable={true}
            onAdd={handleAdd}
            onExport={handleExport}
            searchFields={['title', 'location', 'contactName']}
            defaultPageSize={5}
          />
        </section>

        {/* Full Table Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Full Table - Complete Features</h2>
          <p className="text-gray-600">
            Full-featured table with search, pagination, and row click handling.
          </p>
          
          <Table
            data={properties}
            columns={columns}
            title="Property Overview"
            subtitle="Click on any row to see quick details"
            searchable={true}
            exportable={true}
            pagination={true}
            sortable={true}
            variant="card"
            size="md"
            striped={true}
            hoverable={true}
            currentPage={1}
            pageSize={10}
            totalItems={properties.length}
            onRowClick={handleRowClick}
            onExport={handleExport}
            actions={
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Property
              </button>
            }
          />
        </section>

        {/* Simple Table Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Simple Table - Basic Display</h2>
          <p className="text-gray-600">
            Lightweight table for basic property information display.
          </p>
          
          <SimpleTable
            data={properties}
            columns={simpleColumns}
            size="md"
            striped={true}
            bordered={true}
            hoverable={true}
            onRowClick={handleRowClick}
          />
        </section>

        {/* Compact View */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Compact View - Small Size</h2>
          <p className="text-gray-600">
            Compact table perfect for dashboards or sidebar displays.
          </p>
          
          <SimpleTable
            data={properties}
            columns={[
              { key: 'title', label: 'Property' },
              { 
                key: 'rent', 
                label: 'Rent', 
                type: 'currency',
                currency: 'AED',
                align: 'right'
              },
              { 
                key: 'status', 
                label: 'Status', 
                type: 'badge',
                badgeColors: statusColors
              }
            ]}
            size="sm"
            striped={true}
            className="max-w-2xl"
          />
        </section>

        {/* Usage Instructions */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Use These Tables</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p><strong>DataGrid:</strong> Try searching for "Villa" or "Marina" to see the search functionality.</p>
            <p><strong>Actions:</strong> Click the eye, edit, or delete icons to see action handlers.</p>
            <p><strong>Row Clicks:</strong> Click on any row in the tables to see row click handling.</p>
            <p><strong>Export:</strong> Click the export button to download the data as CSV.</p>
            <p><strong>Sorting:</strong> Click on column headers to sort the data.</p>
            <p><strong>Add New:</strong> Click the "Add Property" button to see the add handler.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertyTableDemo;
