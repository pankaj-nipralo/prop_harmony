import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { SimpleTable, createTextColumn, createCurrencyColumn, createBadgeColumn } from './index';

/**
 * Simple test component to verify table functionality
 */
const TableTest = () => {
  const [data] = useState([
    { id: 1, name: 'Property A', rent: 5000, status: 'active' },
    { id: 2, name: 'Property B', rent: 3000, status: 'pending' },
    { id: 3, name: 'Property C', rent: 7000, status: 'active' }
  ]);

  const columns = [
    createTextColumn('name', 'Property Name'),
    createCurrencyColumn('rent', 'Rent', 'AED'),
    createBadgeColumn('status', 'Status', {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800'
    })
  ];

  const handleRowClick = (item) => {
    alert(`Clicked: ${item.name}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Table Test</h1>
      <SimpleTable 
        data={data} 
        columns={columns}
        onRowClick={handleRowClick}
        striped={true}
        hoverable={true}
        bordered={true}
      />
    </div>
  );
};

export default TableTest;
