/**
 * Table utility functions and helpers
 */

import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

/**
 * Create a standard actions column configuration
 * @param {Object} options - Action options
 * @param {Function} options.onView - View action handler
 * @param {Function} options.onEdit - Edit action handler
 * @param {Function} options.onDelete - Delete action handler
 * @param {Array} options.customActions - Additional custom actions
 * @returns {Object} Column configuration
 */
export const createActionsColumn = ({
  onView,
  onEdit,
  onDelete,
  customActions = []
}) => {
  const actions = [];

  if (onView) {
    actions.push({
      icon: <Eye className="w-4 h-4" />,
      onClick: onView,
      title: 'View',
      className: 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
    });
  }

  if (onEdit) {
    actions.push({
      icon: <Edit className="w-4 h-4" />,
      onClick: onEdit,
      title: 'Edit',
      className: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
    });
  }

  if (onDelete) {
    actions.push({
      icon: <Trash2 className="w-4 h-4" />,
      onClick: onDelete,
      title: 'Delete',
      className: 'text-red-600 hover:text-red-800 hover:bg-red-50'
    });
  }

  actions.push(...customActions);

  return {
    key: 'actions',
    label: 'Actions',
    type: 'actions',
    actions,
    width: '120',
    align: 'center'
  };
};

/**
 * Create a currency column configuration
 * @param {string} key - Data key
 * @param {string} label - Column label
 * @param {string} currency - Currency symbol
 * @returns {Object} Column configuration
 */
export const createCurrencyColumn = (key, label, currency = 'AED') => ({
  key,
  label,
  type: 'currency',
  currency,
  align: 'right',
  sortable: true
});

/**
 * Create a date column configuration
 * @param {string} key - Data key
 * @param {string} label - Column label
 * @returns {Object} Column configuration
 */
export const createDateColumn = (key, label) => ({
  key,
  label,
  type: 'date',
  sortable: true
});

/**
 * Create a badge/status column configuration
 * @param {string} key - Data key
 * @param {string} label - Column label
 * @param {Object} badgeColors - Color mapping for different values
 * @returns {Object} Column configuration
 */
export const createBadgeColumn = (key, label, badgeColors = {}) => ({
  key,
  label,
  type: 'badge',
  badgeColors,
  align: 'center'
});

/**
 * Create a basic text column configuration
 * @param {string} key - Data key
 * @param {string} label - Column label
 * @param {Object} options - Additional options
 * @returns {Object} Column configuration
 */
export const createTextColumn = (key, label, options = {}) => ({
  key,
  label,
  sortable: true,
  ...options
});

/**
 * Common badge color configurations
 */
export const BADGE_COLORS = {
  status: {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    draft: 'bg-gray-100 text-gray-800'
  },
  priority: {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  },
  type: {
    income: 'bg-green-100 text-green-800',
    expense: 'bg-red-100 text-red-800',
    transfer: 'bg-blue-100 text-blue-800'
  }
};

/**
 * Export data to CSV format
 * @param {Array} data - Data to export
 * @param {Array} columns - Column configurations
 * @param {string} filename - Export filename
 */
export const exportToCSV = (data, columns, filename = 'export.csv') => {
  // Create CSV headers
  const headers = columns
    .filter(col => col.type !== 'actions')
    .map(col => col.label);

  // Create CSV rows
  const rows = data.map(item => 
    columns
      .filter(col => col.type !== 'actions')
      .map(col => {
        const value = item[col.key];
        
        if (col.type === 'currency') {
          return typeof value === 'number' ? value : value || 0;
        }
        
        if (col.type === 'date') {
          return value ? new Date(value).toLocaleDateString() : '';
        }
        
        return value || '';
      })
  );

  // Combine headers and rows
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  // Download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Filter data based on search term and fields
 * @param {Array} data - Data to filter
 * @param {string} searchTerm - Search term
 * @param {Array} searchFields - Fields to search in
 * @returns {Array} Filtered data
 */
export const filterData = (data, searchTerm, searchFields = []) => {
  if (!searchTerm) return data;

  return data.filter(item => {
    if (searchFields.length > 0) {
      return searchFields.some(field =>
        String(item[field] || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return Object.values(item).some(value =>
        String(value || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });
};

/**
 * Sort data by field and direction
 * @param {Array} data - Data to sort
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} Sorted data
 */
export const sortData = (data, field, direction = 'asc') => {
  if (!field) return data;

  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue === bValue) return 0;

    let comparison = 0;
    if (aValue > bValue) comparison = 1;
    if (aValue < bValue) comparison = -1;

    return direction === 'desc' ? comparison * -1 : comparison;
  });
};

/**
 * Paginate data
 * @param {Array} data - Data to paginate
 * @param {number} page - Current page (1-based)
 * @param {number} pageSize - Items per page
 * @returns {Array} Paginated data
 */
export const paginateData = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
};

/**
 * Calculate pagination info
 * @param {number} totalItems - Total number of items
 * @param {number} currentPage - Current page
 * @param {number} pageSize - Items per page
 * @returns {Object} Pagination info
 */
export const getPaginationInfo = (totalItems, currentPage, pageSize) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return {
    totalPages,
    startItem,
    endItem,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};
