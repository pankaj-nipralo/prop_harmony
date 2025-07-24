// Shared Components Index
// This file exports all shared components for easy importing

// Layout Components
export { default as DashboardLayout, DashboardSection, DashboardGrid } from './DashboardLayout';

// Data Display Components
export { default as StatsCard, StatsGrid } from './StatsCard';
export { default as DataTable } from './DataTable';
export { default as DashboardChart, IncomeChart, OccupancyChart, PropertyDistributionChart } from './DashboardChart';

// Filter and Search Components
export { default as FilterPanel, getCommonFilterConfigs } from './FilterPanel';

// Property Components
export { default as PropertyCard, PropertyGrid } from './PropertyCard';

// Notification Components
export { default as NotificationPanel } from './NotificationPanel';

// Action Components
export { 
  default as QuickActions, 
  LANDLORD_QUICK_ACTIONS, 
  TENANT_QUICK_ACTIONS, 
  PROPERTY_MANAGER_QUICK_ACTIONS 
} from './QuickActions';

// Re-export commonly used UI components for convenience
export { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export { Button } from '@/components/ui/button';
export { Badge } from '@/components/ui/badge';
export { Input } from '@/components/ui/input';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
