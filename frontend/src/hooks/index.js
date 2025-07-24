// Hooks Index
// This file exports all custom hooks for easy importing

// Dashboard Data Hooks
export { 
  useDashboardData, 
  useDashboardStats, 
  useChartData, 
  useRecentActivity 
} from './useDashboardData';

// Filter and Table Hooks
export { 
  useFilters, 
  useTableState, 
  useSelection 
} from './useFilters';

// Document Management Hooks
export { 
  useDocuments, 
  useDocumentFilters 
} from './useDocuments';

// Existing hooks (if any)
export { useInspectionSync } from './useInspectionSync';
