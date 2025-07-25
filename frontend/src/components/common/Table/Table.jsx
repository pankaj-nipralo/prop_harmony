import React from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Download,
  MoreHorizontal
} from 'lucide-react';

/**
 * Enhanced Reusable Table Component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of data objects to display
 * @param {Array} props.columns - Array of column configuration objects
 * @param {boolean} props.loading - Whether the table is in loading state
 * @param {boolean} props.striped - Whether to show striped rows
 * @param {boolean} props.bordered - Whether to show borders
 * @param {boolean} props.hoverable - Whether rows should have hover effect
 * @param {string} props.size - Table size ('sm', 'md', 'lg')
 * @param {string} props.variant - Table variant ('default', 'minimal', 'card')
 * @param {boolean} props.sortable - Whether sorting is enabled globally
 * @param {boolean} props.searchable - Whether to show search input
 * @param {boolean} props.filterable - Whether to show filter button
 * @param {boolean} props.exportable - Whether to show export button
 * @param {boolean} props.pagination - Whether to show pagination
 * @param {number} props.currentPage - Current page number
 * @param {number} props.pageSize - Number of items per page
 * @param {number} props.totalItems - Total number of items
 * @param {string} props.sortField - Current sort field
 * @param {string} props.sortDirection - Current sort direction ('asc', 'desc')
 * @param {string} props.searchTerm - Current search term
 * @param {Function} props.onSort - Sort handler function
 * @param {Function} props.onSearch - Search handler function
 * @param {Function} props.onFilter - Filter handler function
 * @param {Function} props.onExport - Export handler function
 * @param {Function} props.onPageChange - Page change handler
 * @param {Function} props.onPageSizeChange - Page size change handler
 * @param {Function} props.onRowClick - Row click handler
 * @param {string} props.emptyMessage - Message to show when no data
 * @param {React.ReactNode} props.emptyIcon - Icon to show when no data
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.actions - Additional action buttons
 * @param {React.ReactNode} props.title - Table title
 * @param {React.ReactNode} props.subtitle - Table subtitle
 */
const Table = ({
  data = [],
  columns = [],
  loading = false,
  striped = true,
  bordered = false,
  hoverable = true,
  size = 'md',
  variant = 'default',
  sortable = true,
  searchable = false,
  filterable = false,
  exportable = false,
  pagination = true,
  currentPage = 1,
  pageSize = 10,
  totalItems = 0,
  sortField = null,
  sortDirection = 'asc',
  searchTerm = '',
  onSort,
  onSearch,
  onFilter,
  onExport,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  emptyMessage = "No data available",
  emptyIcon,
  className = '',
  actions,
  title,
  subtitle,
  ...props
}) => {
  // Calculate pagination
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Handle sort click
  const handleSort = (field) => {
    if (!sortable || !onSort) return;
    
    let direction = 'asc';
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc';
    }
    onSort(field, direction);
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-blue-600" />
      : <ArrowDown className="w-4 h-4 text-blue-600" />;
  };

  // Render cell content
  const renderCell = (item, column) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item);
    }
    
    if (column.type === 'currency') {
      return (
        <span className="font-medium">
          {column.currency || 'AED'} {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      );
    }
    
    if (column.type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    
    if (column.type === 'badge') {
      return (
        <span className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          column.badgeColors?.[value] || 'bg-gray-100 text-gray-800'
        )}>
          {value}
        </span>
      );
    }
    
    if (column.type === 'actions') {
      return (
        <div className="flex items-center gap-1">
          {column.actions?.map((action, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(item);
              }}
              className={cn(
                'p-1.5 rounded-full transition-colors',
                action.className || 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              )}
              title={action.title}
            >
              {action.icon}
            </button>
          ))}
        </div>
      );
    }
    
    return value;
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Padding classes based on size
  const paddingClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4'
  };

  return (
    <div className={cn('bg-white', variant === 'card' && 'rounded-lg shadow-sm border border-gray-200', className)} {...props}>
      {/* Header */}
      {(title || subtitle || searchable || filterable || exportable || actions) && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              {filterable && (
                <button
                  onClick={onFilter}
                  className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  title="Filter"
                >
                  <Filter className="w-4 h-4" />
                </button>
              )}
              
              {exportable && (
                <button
                  onClick={onExport}
                  className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  title="Export"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
              
              {actions}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : data.length === 0 ? (
        /* Empty State */
        <div className="text-center py-12">
          {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={cn(
                'bg-gray-50',
                bordered && 'border-b border-gray-200'
              )}>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        paddingClasses[size],
                        'text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                        column.sortable && sortable && 'cursor-pointer hover:bg-gray-100',
                        column.width && `w-${column.width}`,
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right'
                      )}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className={cn(
                        'flex items-center gap-2',
                        column.align === 'center' && 'justify-center',
                        column.align === 'right' && 'justify-end'
                      )}>
                        {column.label}
                        {column.sortable && sortable && getSortIcon(column.key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={cn(
                'bg-white',
                striped && 'divide-y divide-gray-200'
              )}>
                {data.map((item, index) => (
                  <tr 
                    key={item.id || index} 
                    className={cn(
                      hoverable && 'hover:bg-gray-50',
                      onRowClick && 'cursor-pointer',
                      striped && index % 2 === 1 && 'bg-gray-50',
                      bordered && 'border-b border-gray-200'
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          paddingClasses[size],
                          sizeClasses[size],
                          'text-gray-900',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {startItem} to {endItem} of {totalItems} results
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPageChange?.(1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => onPageChange?.(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="text-sm text-gray-700 px-3">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => onPageChange?.(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => onPageChange?.(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
