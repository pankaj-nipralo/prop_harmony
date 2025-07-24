// Reusable data table component
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DASHBOARD_CONFIGS } from '@/config/dashboard-configs';

const DataTable = ({
  title,
  data = [],
  columns = [],
  loading = false,
  pagination = true,
  sorting = true,
  searchable = false,
  currentPage = 1,
  pageSize = 10,
  totalItems = 0,
  sortField = null,
  sortDirection = 'asc',
  searchTerm = '',
  onPageChange,
  onPageSizeChange,
  onSort,
  onSearch,
  className,
  emptyMessage = "No data available",
  actions,
  ...props
}) => {
  // Calculate pagination
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Handle sort click
  const handleSort = (field) => {
    if (!sorting || !onSort) return;
    
    let direction = 'asc';
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc';
    }
    onSort(field, direction);
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (!sorting || sortField !== field) {
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
    
    if (column.type === 'badge') {
      const config = DASHBOARD_CONFIGS.STATUS_CONFIGS[column.statusType]?.[value];
      return (
        <Badge 
          variant="secondary" 
          className={cn(
            config?.color,
            config?.bg,
            "font-medium"
          )}
        >
          {config?.label || value}
        </Badge>
      );
    }
    
    if (column.type === 'currency') {
      return (
        <span className="font-medium">
          AED {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      );
    }
    
    if (column.type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    
    return value;
  };

  // Loading skeleton
  if (loading) {
    return (
      <Card className={cn("bg-white border-0 shadow-md", className)}>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                {columns.map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-white border-0 shadow-md", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
        
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
          {actions}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className={cn(
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          column.sortable && sorting && "cursor-pointer hover:bg-gray-100"
                        )}
                        onClick={() => column.sortable && handleSort(column.key)}
                      >
                        <div className="flex items-center gap-2">
                          {column.label}
                          {column.sortable && sorting && getSortIcon(column.key)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr key={item.id || index} className="hover:bg-gray-50">
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
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
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing {startItem} to {endItem} of {totalItems} results
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <span className="text-sm text-gray-700 px-3">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
