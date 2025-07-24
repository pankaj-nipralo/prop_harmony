// Custom hook for dashboard data management
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import dashboardService from '@/services/dashboardService';
import { DASHBOARD_CONFIGS } from '@/config/dashboard-configs';

// Helper function to get user role with fallback for development
const getUserRole = (user) => {
  if (user?.role) return user.role;

  // Fallback: determine role from current path for development
  const path = window.location.pathname;
  if (path.includes('/landlord')) return 'landlord';
  if (path.includes('/tenant')) return 'tenant';
  if (path.includes('/property-manager') || path.includes('/manager')) return 'property_manager';

  return 'landlord'; // Default fallback
};

export const useDashboardData = (filters = {}) => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch dashboard data
  const fetchData = useCallback(async () => {
    const userRole = getUserRole(user);
    if (!userRole) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const dashboardData = await dashboardService.getDashboardData(userRole, filters);
      setData(dashboardData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  // Refresh data
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh setup
  useEffect(() => {
    fetchData();

    // Set up auto-refresh interval
    const interval = setInterval(() => {
      fetchData();
    }, DASHBOARD_CONFIGS.REFRESH_INTERVALS.dashboard);

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh
  };
};

// Hook for dashboard stats
export const useDashboardStats = (timeRange = '30d') => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    const userRole = getUserRole(user);
    if (!userRole) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const statsData = await dashboardService.getStats(userRole, timeRange);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to fetch stats');
      console.error('Stats fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user, timeRange]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats
  };
};

// Hook for chart data
export const useChartData = (chartType, timeRange = '30d') => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChartData = useCallback(async () => {
    const userRole = getUserRole(user);
    if (!userRole || !chartType) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await dashboardService.getChartData(userRole, chartType, timeRange);
      setChartData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch chart data');
      console.error('Chart data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user, chartType, timeRange]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  return {
    chartData,
    loading,
    error,
    refresh: fetchChartData
  };
};

// Hook for recent activity
export const useRecentActivity = (limit = 10) => {
  const { user } = useAuth();
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivity = useCallback(async () => {
    const userRole = getUserRole(user);
    if (!userRole) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const activityData = await dashboardService.getRecentActivity(userRole, limit);
      setActivity(activityData);
    } catch (err) {
      setError(err.message || 'Failed to fetch activity');
      console.error('Activity fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user, limit]);

  useEffect(() => {
    fetchActivity();

    // Set up auto-refresh for activity
    const interval = setInterval(() => {
      fetchActivity();
    }, DASHBOARD_CONFIGS.REFRESH_INTERVALS.notifications);

    return () => clearInterval(interval);
  }, [fetchActivity]);

  return {
    activity,
    loading,
    error,
    refresh: fetchActivity
  };
};
