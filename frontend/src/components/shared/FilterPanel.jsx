// Reusable filter panel component
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DASHBOARD_CONFIGS } from '@/config/dashboard-configs';

const FilterPanel = ({
  title = "Filters",
  filters = {},
  searchTerm = '',
  onFilterChange,
  onSearchChange,
  onReset,
  filterConfigs = [],
  showSearch = true,
  showReset = true,
  activeFilterCount = 0,
  className,
  collapsed = false,
  onToggleCollapse,
  ...props
}) => {
  // Handle filter change
  const handleFilterChange = (key, value) => {
    onFilterChange?.(key, value);
  };

  // Handle search change
  const handleSearchChange = (value) => {
    onSearchChange?.(value);
  };

  // Handle reset
  const handleReset = () => {
    onReset?.();
  };

  // Render filter input based on type
  const renderFilterInput = (config) => {
    const { key, label, type, options, placeholder } = config;
    const value = filters[key] || '';

    switch (type) {
      case 'select':
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
            <Select value={value} onValueChange={(val) => handleFilterChange(key, val)}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'input':
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
            <Input
              type="text"
              value={value}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            />
          </div>
        );

      case 'date':
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
            <Input
              type="date"
              value={value}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            />
          </div>
        );

      case 'number':
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
            <Input
              type="number"
              value={value}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (collapsed) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {showSearch && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleCollapse}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
        
        {showReset && activeFilterCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={cn("bg-white border-0 shadow-md", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          {title}
          {activeFilterCount > 0 && (
            <Badge variant="secondary">
              {activeFilterCount}
            </Badge>
          )}
        </CardTitle>
        
        <div className="flex items-center gap-2">
          {showReset && activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          )}
          
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search */}
        {showSearch && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Filter Inputs */}
        {filterConfigs.map(renderFilterInput)}

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Active Filters
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (!value || value === 'all') return null;
                
                const config = filterConfigs.find(f => f.key === key);
                const label = config?.label || key;
                
                return (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {label}: {value}
                    <button
                      onClick={() => handleFilterChange(key, '')}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                );
              })}
              
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  Search: {searchTerm}
                  <button
                    onClick={() => handleSearchChange('')}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Predefined filter configurations
export const getCommonFilterConfigs = () => ({
  timeRange: {
    key: 'timeRange',
    label: 'Time Range',
    type: 'select',
    options: DASHBOARD_CONFIGS.FILTER_OPTIONS.timeRange
  },
  propertyType: {
    key: 'propertyType',
    label: 'Property Type',
    type: 'select',
    options: DASHBOARD_CONFIGS.FILTER_OPTIONS.propertyType
  },
  status: {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: DASHBOARD_CONFIGS.FILTER_OPTIONS.status
  },
  dateFrom: {
    key: 'dateFrom',
    label: 'From Date',
    type: 'date'
  },
  dateTo: {
    key: 'dateTo',
    label: 'To Date',
    type: 'date'
  },
  minAmount: {
    key: 'minAmount',
    label: 'Min Amount',
    type: 'number',
    placeholder: 'Enter minimum amount'
  },
  maxAmount: {
    key: 'maxAmount',
    label: 'Max Amount',
    type: 'number',
    placeholder: 'Enter maximum amount'
  }
});

export default FilterPanel;
