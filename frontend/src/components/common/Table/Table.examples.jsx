import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Building2 } from 'lucide-react';
import { 
  Table, 
  SimpleTable, 
  DataGrid,
  createActionsColumn,
  createCurrencyColumn,
  createDateColumn,
  createBadgeColumn,
  createTextColumn,
  BADGE_COLORS,
  exportToCSV
} from './index';

/**
 * Table Component Examples and Usage Guide
 */
const TableExamples = () => {
  // Sample data
  const [properties] = useState([
    {
      id: 1,
      name: 'Vikings Villa',
      type: 'Villa',
      location: 'Dubai Marina',
      rent: 31333,
      status: 'active',
      tenant: 'John Doe',
      leaseStart: '2024-01-15',
      leaseEnd: '2024-12-15'
    },
    {
      id: 2,
      name: 'Sunset Apartments',
      type: 'Apartment',
      location: 'Downtown Dubai',
      rent: 8500,
      status: 'pending',
      tenant: 'Sarah Lee',
      leaseStart: '2024-02-01',
      leaseEnd: '2024-08-01'
    },
    {
      id: 3,
      name: 'Marina Heights',
      type: 'Apartment',
      location: 'Dubai Marina',
      rent: 12000,
      status: 'inactive',
      tenant: null,
      leaseStart: null,
      leaseEnd: null
    }
  ]);

  // Action handlers
  const handleView = (item) => {
    alert(`Viewing ${item.name}`);
  };

  const handleEdit = (item) => {
    alert(`Editing ${item.name}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete ${item.name}?`)) {
      alert(`Deleted ${item.name}`);
    }
  };

  const handleAdd = () => {
    alert('Adding new property');
  };

  const handleExport = () => {
    exportToCSV(properties, columns, 'properties.csv');
  };

  // Column configurations
  const columns = [
    createTextColumn('name', 'Property Name'),
    createTextColumn('type', 'Type'),
    createTextColumn('location', 'Location'),
    createCurrencyColumn('rent', 'Monthly Rent'),
    createBadgeColumn('status', 'Status', BADGE_COLORS.status),
    createTextColumn('tenant', 'Tenant'),
    createDateColumn('leaseStart', 'Lease Start'),
    createActionsColumn({
      onView: handleView,
      onEdit: handleEdit,
      onDelete: handleDelete
    })
  ];

  // Simple columns for basic table
  const simpleColumns = [
    { key: 'name', label: 'Property Name' },
    { key: 'type', label: 'Type' },
    { key: 'location', label: 'Location' },
    { 
      key: 'rent', 
      label: 'Rent', 
      type: 'currency',
      align: 'right'
    },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'badge',
      badgeColors: BADGE_COLORS.status,
      align: 'center'
    }
  ];

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Table Component Examples</h1>
        <p className="text-gray-600 mb-8">
          Comprehensive examples of reusable table components with different features and configurations.
        </p>

        {/* DataGrid Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">DataGrid Component</h2>
          <p className="text-gray-600">
            Advanced table with built-in search, sort, pagination, and state management.
          </p>
          
          <DataGrid
            data={properties}
            columns={columns}
            title="Property Management"
            subtitle="Manage all your properties in one place"
            searchable={true}
            filterable={true}
            exportable={true}
            onAdd={handleAdd}
            onExport={handleExport}
            searchFields={['name', 'location', 'tenant']}
            defaultPageSize={5}
          />
        </section>

        {/* Full Table Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Full Table Component</h2>
          <p className="text-gray-600">
            Complete table with all features enabled and custom configuration.
          </p>
          
          <Table
            data={properties}
            columns={columns}
            title="Properties Overview"
            subtitle="Complete property listing with all details"
            searchable={true}
            filterable={true}
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
            onRowClick={(item) => alert(`Clicked on ${item.name}`)}
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
          <h2 className="text-2xl font-semibold text-gray-800">Simple Table Component</h2>
          <p className="text-gray-600">
            Lightweight table for basic data display without advanced features.
          </p>
          
          <SimpleTable
            data={properties}
            columns={simpleColumns}
            size="sm"
            striped={true}
            bordered={true}
            hoverable={true}
            onRowClick={(item) => alert(`Simple table clicked: ${item.name}`)}
          />
        </section>

        {/* Different Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Table Variants</h2>
          
          {/* Minimal Variant */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Minimal Variant</h3>
            <Table
              data={properties.slice(0, 3)}
              columns={simpleColumns}
              variant="minimal"
              size="sm"
              striped={false}
              bordered={false}
            />
          </div>

          {/* Card Variant */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Card Variant</h3>
            <Table
              data={properties.slice(0, 3)}
              columns={simpleColumns}
              variant="card"
              size="md"
              title="Properties"
            />
          </div>
        </section>

        {/* Different Sizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Table Sizes</h2>
          
          {/* Small */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Small Size</h3>
            <SimpleTable
              data={properties.slice(0, 2)}
              columns={simpleColumns}
              size="sm"
              bordered={true}
            />
          </div>

          {/* Medium */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Medium Size (Default)</h3>
            <SimpleTable
              data={properties.slice(0, 2)}
              columns={simpleColumns}
              size="md"
              bordered={true}
            />
          </div>

          {/* Large */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Large Size</h3>
            <SimpleTable
              data={properties.slice(0, 2)}
              columns={simpleColumns}
              size="lg"
              bordered={true}
            />
          </div>
        </section>

        {/* Custom Column Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Custom Column Types</h2>
          
          <Table
            data={properties}
            columns={[
              createTextColumn('name', 'Property'),
              createCurrencyColumn('rent', 'Rent (AED)'),
              createDateColumn('leaseStart', 'Lease Start'),
              createBadgeColumn('status', 'Status', BADGE_COLORS.status),
              {
                key: 'custom',
                label: 'Custom Render',
                render: (value, item) => (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{item.type}</span>
                  </div>
                )
              }
            ]}
            variant="card"
            title="Custom Column Examples"
          />
        </section>

        {/* Usage Code Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Usage Examples</h2>
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`// Import components
import { Table, SimpleTable, DataGrid, createActionsColumn } from '@/components/common/Table';

// Basic usage
<SimpleTable 
  data={data} 
  columns={columns} 
  striped={true}
  hoverable={true}
/>

// Advanced DataGrid
<DataGrid
  data={properties}
  columns={columns}
  title="Property Management"
  searchable={true}
  exportable={true}
  onAdd={handleAdd}
  searchFields={['name', 'location']}
/>

// Full Table with all features
<Table
  data={data}
  columns={columns}
  title="Properties"
  searchable={true}
  pagination={true}
  sortable={true}
  variant="card"
  onRowClick={handleRowClick}
/>

// Create columns with utilities
const columns = [
  createTextColumn('name', 'Name'),
  createCurrencyColumn('rent', 'Rent'),
  createDateColumn('date', 'Date'),
  createBadgeColumn('status', 'Status', BADGE_COLORS.status),
  createActionsColumn({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete
  })
];`}</pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TableExamples;
