# Table Components Documentation

## Overview

The Table component system provides a comprehensive set of reusable table components for displaying and managing data in your React application. It includes three main components and utility functions for common table operations.

## Components

### 1. Table (Main Component)
The most feature-rich table component with full customization options.

### 2. SimpleTable
A lightweight table component for basic data display without advanced features.

### 3. DataGrid
An advanced table component with built-in state management for search, sort, and pagination.

## Installation & Import

```jsx
// Import individual components
import { Table, SimpleTable, DataGrid } from '@/components/common/Table';

// Import utilities
import { 
  createActionsColumn, 
  createCurrencyColumn, 
  BADGE_COLORS,
  exportToCSV 
} from '@/components/common/Table';

// Import everything
import * as TableComponents from '@/components/common/Table';
```

## Table Component (Main)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | `[]` | Array of data objects to display |
| `columns` | `Array` | `[]` | Array of column configuration objects |
| `loading` | `boolean` | `false` | Whether the table is in loading state |
| `striped` | `boolean` | `true` | Whether to show striped rows |
| `bordered` | `boolean` | `false` | Whether to show borders |
| `hoverable` | `boolean` | `true` | Whether rows should have hover effect |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Table size |
| `variant` | `'default' \| 'minimal' \| 'card'` | `'default'` | Table variant |
| `sortable` | `boolean` | `true` | Whether sorting is enabled globally |
| `searchable` | `boolean` | `false` | Whether to show search input |
| `filterable` | `boolean` | `false` | Whether to show filter button |
| `exportable` | `boolean` | `false` | Whether to show export button |
| `pagination` | `boolean` | `true` | Whether to show pagination |
| `currentPage` | `number` | `1` | Current page number |
| `pageSize` | `number` | `10` | Number of items per page |
| `totalItems` | `number` | `0` | Total number of items |
| `sortField` | `string` | `null` | Current sort field |
| `sortDirection` | `'asc' \| 'desc'` | `'asc'` | Current sort direction |
| `searchTerm` | `string` | `''` | Current search term |
| `onSort` | `Function` | - | Sort handler function |
| `onSearch` | `Function` | - | Search handler function |
| `onFilter` | `Function` | - | Filter handler function |
| `onExport` | `Function` | - | Export handler function |
| `onPageChange` | `Function` | - | Page change handler |
| `onPageSizeChange` | `Function` | - | Page size change handler |
| `onRowClick` | `Function` | - | Row click handler |
| `emptyMessage` | `string` | `"No data available"` | Message to show when no data |
| `emptyIcon` | `React.ReactNode` | - | Icon to show when no data |
| `className` | `string` | `''` | Additional CSS classes |
| `actions` | `React.ReactNode` | - | Additional action buttons |
| `title` | `React.ReactNode` | - | Table title |
| `subtitle` | `React.ReactNode` | - | Table subtitle |

### Basic Usage

```jsx
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', type: 'badge' }
];

<Table 
  data={users} 
  columns={columns}
  title="User Management"
  searchable={true}
  pagination={true}
/>
```

## SimpleTable Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | `[]` | Array of data objects |
| `columns` | `Array` | `[]` | Array of column configurations |
| `striped` | `boolean` | `true` | Whether to show striped rows |
| `bordered` | `boolean` | `false` | Whether to show borders |
| `hoverable` | `boolean` | `true` | Whether rows should have hover effect |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Table size |
| `onRowClick` | `Function` | - | Row click handler |
| `emptyMessage` | `string` | `"No data available"` | Message when no data |
| `className` | `string` | `''` | Additional CSS classes |

### Basic Usage

```jsx
<SimpleTable 
  data={data} 
  columns={columns}
  size="sm"
  striped={true}
  onRowClick={handleRowClick}
/>
```

## DataGrid Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | `[]` | Array of data objects |
| `columns` | `Array` | `[]` | Array of column configurations |
| `title` | `string` | - | Grid title |
| `subtitle` | `string` | - | Grid subtitle |
| `searchable` | `boolean` | `true` | Enable search functionality |
| `filterable` | `boolean` | `false` | Enable filter functionality |
| `exportable` | `boolean` | `false` | Enable export functionality |
| `onAdd` | `Function` | - | Add new item handler |
| `onExport` | `Function` | - | Export handler |
| `onFilter` | `Function` | - | Filter handler |
| `defaultPageSize` | `number` | `10` | Default page size |
| `searchFields` | `Array` | `[]` | Fields to search in |
| `className` | `string` | `''` | Additional CSS classes |

### Basic Usage

```jsx
<DataGrid
  data={properties}
  columns={columns}
  title="Property Management"
  searchable={true}
  exportable={true}
  onAdd={handleAdd}
  searchFields={['name', 'location']}
/>
```

## Column Configuration

### Basic Column

```jsx
{
  key: 'name',           // Data property key
  label: 'Name',         // Column header label
  sortable: true,        // Enable sorting
  width: '200',          // Column width
  align: 'left'          // Text alignment ('left', 'center', 'right')
}
```

### Column Types

#### Currency Column
```jsx
{
  key: 'price',
  label: 'Price',
  type: 'currency',
  currency: 'AED',       // Currency symbol
  align: 'right'
}
```

#### Date Column
```jsx
{
  key: 'createdAt',
  label: 'Created',
  type: 'date',
  sortable: true
}
```

#### Badge Column
```jsx
{
  key: 'status',
  label: 'Status',
  type: 'badge',
  badgeColors: {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800'
  }
}
```

#### Actions Column
```jsx
{
  key: 'actions',
  label: 'Actions',
  type: 'actions',
  actions: [
    {
      icon: <Eye className="w-4 h-4" />,
      onClick: handleView,
      title: 'View',
      className: 'text-blue-600 hover:bg-blue-50'
    }
  ]
}
```

#### Custom Render Column
```jsx
{
  key: 'custom',
  label: 'Custom',
  render: (value, item) => (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" />
      <span>{value}</span>
    </div>
  )
}
```

## Utility Functions

### Column Creators

```jsx
// Create text column
const nameColumn = createTextColumn('name', 'Name', { sortable: true });

// Create currency column
const priceColumn = createCurrencyColumn('price', 'Price', 'AED');

// Create date column
const dateColumn = createDateColumn('createdAt', 'Created');

// Create badge column
const statusColumn = createBadgeColumn('status', 'Status', BADGE_COLORS.status);

// Create actions column
const actionsColumn = createActionsColumn({
  onView: handleView,
  onEdit: handleEdit,
  onDelete: handleDelete
});
```

### Data Operations

```jsx
// Export to CSV
exportToCSV(data, columns, 'export.csv');

// Filter data
const filtered = filterData(data, searchTerm, ['name', 'email']);

// Sort data
const sorted = sortData(data, 'name', 'asc');

// Paginate data
const paginated = paginateData(data, currentPage, pageSize);
```

### Badge Colors

```jsx
// Predefined badge color sets
BADGE_COLORS.status = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800'
};

BADGE_COLORS.priority = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};
```

## Complete Example

```jsx
import React, { useState } from 'react';
import { 
  DataGrid, 
  createTextColumn, 
  createCurrencyColumn, 
  createActionsColumn,
  BADGE_COLORS 
} from '@/components/common/Table';

const PropertyTable = () => {
  const [properties] = useState([
    { id: 1, name: 'Villa A', rent: 5000, status: 'active' },
    { id: 2, name: 'Apt B', rent: 3000, status: 'pending' }
  ]);

  const columns = [
    createTextColumn('name', 'Property Name'),
    createCurrencyColumn('rent', 'Monthly Rent'),
    createBadgeColumn('status', 'Status', BADGE_COLORS.status),
    createActionsColumn({
      onView: (item) => console.log('View', item),
      onEdit: (item) => console.log('Edit', item),
      onDelete: (item) => console.log('Delete', item)
    })
  ];

  return (
    <DataGrid
      data={properties}
      columns={columns}
      title="Property Management"
      searchable={true}
      exportable={true}
      onAdd={() => console.log('Add new')}
      searchFields={['name']}
    />
  );
};
```

## Best Practices

1. **Use appropriate column types** for better data display
2. **Implement proper loading states** for async data
3. **Provide meaningful empty states** with helpful messages
4. **Use consistent action patterns** across tables
5. **Optimize for mobile** with responsive design
6. **Handle errors gracefully** with fallback content
7. **Use pagination** for large datasets
8. **Implement proper sorting** for better UX
