import React, { useState, useMemo } from 'react';
import Table from './Table';
import { Search, Filter, Download, Plus } from 'lucide-react';

/**
 * Advanced DataGrid Component with built-in state management
 * Includes search, filter, sort, and pagination functionality
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of data objects
 * @param {Array} props.columns - Array of column configurations
 * @param {string} props.title - Grid title
 * @param {string} props.subtitle - Grid subtitle
 * @param {boolean} props.searchable - Enable search functionality
 * @param {boolean} props.filterable - Enable filter functionality
 * @param {boolean} props.exportable - Enable export functionality
 * @param {Function} props.onAdd - Add new item handler
 * @param {Function} props.onExport - Export handler
 * @param {Function} props.onFilter - Filter handler
 * @param {number} props.defaultPageSize - Default page size
 * @param {Array} props.searchFields - Fields to search in
 * @param {string} props.className - Additional CSS classes
 */

const DataGrid = ({
  data = [],
  columns = [],
  title,
  subtitle,
  searchable = true,
  filterable = false,
  exportable = false,
  onAdd,
  onExport,
  onFilter,
  defaultPageSize = 10,
  searchFields = [],
  className = '',
  ...props
}) => {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search
    if (searchTerm && searchFields.length > 0) {
      filtered = filtered.filter(item =>
        searchFields.some(field =>
          String(item[field] || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (searchTerm) {
      // Search all fields if no specific fields provided
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  }, [data, searchTerm, searchFields]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return sortDirection === 'desc' ? comparison * -1 : comparison;
    });
  }, [filteredData, sortField, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handlers
  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Actions
  const actions = (
    <div className="flex items-center gap-2">
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      )}
    </div>
  );

  return (
    <Table
      data={paginatedData}
      columns={columns}
      title={title}
      subtitle={subtitle}
      searchable={searchable}
      filterable={filterable}
      exportable={exportable}
      pagination={true}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={sortedData.length}
      sortField={sortField}
      sortDirection={sortDirection}
      searchTerm={searchTerm}
      onSort={handleSort}
      onSearch={handleSearch}
      onFilter={onFilter}
      onExport={onExport}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      actions={actions}
      className={className}
      variant="card"
      {...props}
    />
  );
};

export default DataGrid;
