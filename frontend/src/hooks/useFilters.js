// Custom hook for managing filters and search
import { useState, useCallback, useMemo } from 'react';

export const useFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');

  // Update a specific filter
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Update multiple filters at once
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
  }, [initialFilters]);

  // Reset a specific filter
  const resetFilter = useCallback((key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    return Object.keys(filters).filter(key => 
      filters[key] !== undefined && 
      filters[key] !== null && 
      filters[key] !== '' &&
      filters[key] !== 'all'
    ).length + (searchTerm ? 1 : 0);
  }, [filters, searchTerm]);

  // Check if filters are active
  const hasActiveFilters = useMemo(() => {
    return activeFilterCount > 0;
  }, [activeFilterCount]);

  // Get filter query object for API calls
  const getFilterQuery = useCallback(() => {
    const query = { ...filters };
    if (searchTerm) {
      query.search = searchTerm;
    }
    return query;
  }, [filters, searchTerm]);

  return {
    filters,
    searchTerm,
    updateFilter,
    updateFilters,
    setSearchTerm,
    resetFilters,
    resetFilter,
    activeFilterCount,
    hasActiveFilters,
    getFilterQuery
  };
};

// Hook for table sorting and pagination
export const useTableState = (initialState = {}) => {
  const defaultState = {
    page: 1,
    pageSize: 10,
    sortField: null,
    sortDirection: 'asc',
    ...initialState
  };

  const [tableState, setTableState] = useState(defaultState);

  // Update page
  const setPage = useCallback((page) => {
    setTableState(prev => ({ ...prev, page }));
  }, []);

  // Update page size
  const setPageSize = useCallback((pageSize) => {
    setTableState(prev => ({ ...prev, pageSize, page: 1 }));
  }, []);

  // Update sorting
  const setSorting = useCallback((field, direction) => {
    setTableState(prev => ({
      ...prev,
      sortField: field,
      sortDirection: direction,
      page: 1 // Reset to first page when sorting changes
    }));
  }, []);

  // Toggle sort direction for a field
  const toggleSort = useCallback((field) => {
    setTableState(prev => {
      if (prev.sortField === field) {
        // Same field, toggle direction
        const newDirection = prev.sortDirection === 'asc' ? 'desc' : 'asc';
        return { ...prev, sortDirection: newDirection };
      } else {
        // New field, default to ascending
        return { ...prev, sortField: field, sortDirection: 'asc', page: 1 };
      }
    });
  }, []);

  // Reset table state
  const resetTableState = useCallback(() => {
    setTableState(defaultState);
  }, [defaultState]);

  return {
    tableState,
    setPage,
    setPageSize,
    setSorting,
    toggleSort,
    resetTableState
  };
};

// Hook for managing selected items
export const useSelection = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());

  // Select an item
  const selectItem = useCallback((id) => {
    setSelectedItems(prev => new Set([...prev, id]));
  }, []);

  // Deselect an item
  const deselectItem = useCallback((id) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  // Toggle item selection
  const toggleItem = useCallback((id) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Select all items
  const selectAll = useCallback((ids) => {
    setSelectedItems(new Set(ids));
  }, []);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  // Check if item is selected
  const isSelected = useCallback((id) => {
    return selectedItems.has(id);
  }, [selectedItems]);

  // Get selected items as array
  const getSelectedItems = useCallback(() => {
    return Array.from(selectedItems);
  }, [selectedItems]);

  return {
    selectedItems: getSelectedItems(),
    selectItem,
    deselectItem,
    toggleItem,
    selectAll,
    clearSelection,
    isSelected,
    selectedCount: selectedItems.size,
    hasSelection: selectedItems.size > 0
  };
};
