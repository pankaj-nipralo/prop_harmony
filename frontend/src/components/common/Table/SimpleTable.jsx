import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Simple Table Component for basic data display
 * Lightweight version without advanced features
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of data objects
 * @param {Array} props.columns - Array of column configurations
 * @param {boolean} props.striped - Whether to show striped rows
 * @param {boolean} props.bordered - Whether to show borders
 * @param {boolean} props.hoverable - Whether rows should have hover effect
 * @param {string} props.size - Table size ('sm', 'md', 'lg')
 * @param {Function} props.onRowClick - Row click handler
 * @param {string} props.emptyMessage - Message when no data
 * @param {string} props.className - Additional CSS classes
 */
const SimpleTable = ({
  data = [],
  columns = [],
  striped = true,
  bordered = false,
  hoverable = true,
  size = 'md',
  onRowClick,
  emptyMessage = "No data available",
  className = '',
  ...props
}) => {
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
    
    return value;
  };

  if (data.length === 0) {
    return (
      <div className={cn('bg-white rounded-lg border border-gray-200', className)}>
        <div className="text-center py-12">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white overflow-hidden', bordered && 'border border-gray-200 rounded-lg', className)} {...props}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    paddingClasses[size],
                    'text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.width && `w-${column.width}`,
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {column.label}
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
                  striped && index % 2 === 1 && 'bg-gray-50'
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
    </div>
  );
};

export default SimpleTable;
