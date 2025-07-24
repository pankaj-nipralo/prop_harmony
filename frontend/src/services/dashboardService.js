// Dashboard-specific API service
import apiService from './apiService';
import { APP_CONSTANTS } from '@/config/constants';

// Mock data generators for development
const generateMockDashboardData = (role) => {
  const baseData = {
    lastUpdated: new Date().toISOString(),
    role
  };

  switch (role) {
    case APP_CONSTANTS.USER_ROLES.LANDLORD:
      return {
        ...baseData,
        stats: {
          totalProperties: 12,
          monthlyIncome: 45000,
          incomeChange: 5.26,
          occupancyRate: 85,
          occupiedUnits: 10,
          totalUnits: 12,
          maintenanceRequests: 3,
          maintenanceTrend: "down"
        },
        recentActivity: [
          { id: 1, type: "payment", message: "Rent payment received from Unit 101", timestamp: "2024-01-15T10:30:00Z" },
          { id: 2, type: "maintenance", message: "New maintenance request for Unit 205", timestamp: "2024-01-15T09:15:00Z" },
          { id: 3, type: "application", message: "New rental application received", timestamp: "2024-01-14T16:45:00Z" }
        ],
        properties: [
          { id: 1, name: "Sunset Apartments", units: 8, occupancy: 87.5, revenue: 28000 },
          { id: 2, name: "Marina View Complex", units: 4, occupancy: 75, revenue: 17000 }
        ]
      };

    case APP_CONSTANTS.USER_ROLES.TENANT:
      return {
        ...baseData,
        stats: {
          leaseRemaining: 180,
          monthlyRent: 2400,
          paymentRate: 100,
          utilityCost: 150,
          leaseEndDate: "2025-06-30"
        },
        recentPayments: [
          { id: 1, amount: 2400, date: "2024-01-01", status: "paid", type: "rent" },
          { id: 2, amount: 150, date: "2024-01-01", status: "paid", type: "utilities" }
        ],
        maintenanceRequests: [
          { id: 1, title: "AC not working", status: "in-progress", date: "2024-01-10", priority: "high" },
          { id: 2, title: "Leaky faucet", status: "completed", date: "2024-01-05", priority: "medium" }
        ],
        propertyInfo: {
          name: "Modern 2BR Apartment",
          address: "123 Downtown Street, Dubai",
          landlord: "Ahmed Al Farsi",
          landlordContact: "+971 50 123 4567"
        }
      };

    case APP_CONSTANTS.USER_ROLES.PROPERTY_MANAGER:
      return {
        ...baseData,
        stats: {
          managedProperties: 25,
          totalTenants: 67,
          activeWorkOrders: 8,
          collectionRate: 94.5,
          occupancyRate: 88
        },
        workOrders: [
          { id: 1, property: "Sunset Apartments #101", tenant: "Sarah Johnson", issue: "Plumbing repair", status: "in-progress", priority: "high" },
          { id: 2, property: "Marina View #205", tenant: "Michael Chen", issue: "AC maintenance", status: "pending", priority: "medium" }
        ],
        leaseExpirations: [
          { id: 1, tenant: "Emma Wilson", property: "Downtown Loft #7B", expiryDate: "2024-08-05", status: "renewal-confirmed" },
          { id: 2, tenant: "John Smith", property: "Garden View #12A", expiryDate: "2024-07-22", status: "not-renewing" }
        ],
        rentCollection: {
          collected: 156000,
          pending: 8500,
          overdue: 2400,
          total: 166900
        }
      };

    default:
      return baseData;
  }
};

class DashboardService {
  // Get dashboard data for specific role
  async getDashboardData(role, filters = {}) {
    try {
      // In production, this would be a real API call
      // const data = await apiService.get(`${APP_CONSTANTS.API_ENDPOINTS.DASHBOARD}/${role}`, filters);
      
      // For now, return mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return generateMockDashboardData(role);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  // Get stats data
  async getStats(role, timeRange = '30d') {
    try {
      // const data = await apiService.get(`${APP_CONSTANTS.API_ENDPOINTS.DASHBOARD}/${role}/stats`, { timeRange });
      
      const mockData = generateMockDashboardData(role);
      return mockData.stats;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }

  // Get recent activity
  async getRecentActivity(role, limit = 10) {
    try {
      // const data = await apiService.get(`${APP_CONSTANTS.API_ENDPOINTS.DASHBOARD}/${role}/activity`, { limit });
      
      const mockData = generateMockDashboardData(role);
      return mockData.recentActivity || [];
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      throw error;
    }
  }

  // Get chart data
  async getChartData(role, chartType, timeRange = '30d') {
    try {
      // const data = await apiService.get(`${APP_CONSTANTS.API_ENDPOINTS.DASHBOARD}/${role}/charts/${chartType}`, { timeRange });
      
      // Mock chart data
      const chartData = this.generateMockChartData(chartType, timeRange);
      return chartData;
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  }

  // Generate mock chart data
  generateMockChartData(chartType, timeRange) {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      switch (chartType) {
        case 'income':
          data.push({
            date: date.toISOString().split('T')[0],
            income: Math.floor(Math.random() * 5000) + 15000,
            expenses: Math.floor(Math.random() * 2000) + 3000
          });
          break;
        case 'occupancy':
          data.push({
            date: date.toISOString().split('T')[0],
            occupancy: Math.floor(Math.random() * 20) + 80
          });
          break;
        case 'maintenance':
          data.push({
            date: date.toISOString().split('T')[0],
            requests: Math.floor(Math.random() * 10) + 1,
            completed: Math.floor(Math.random() * 8) + 1
          });
          break;
        default:
          data.push({
            date: date.toISOString().split('T')[0],
            value: Math.floor(Math.random() * 100)
          });
      }
    }
    
    return data;
  }

  // Update dashboard preferences
  async updatePreferences(preferences) {
    try {
      // const data = await apiService.put(`${APP_CONSTANTS.API_ENDPOINTS.DASHBOARD}/preferences`, preferences);
      
      // Store in localStorage for now
      localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
      return preferences;
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  }

  // Get dashboard preferences
  async getPreferences() {
    try {
      // const data = await apiService.get(`${APP_CONSTANTS.API_ENDPOINTS.DASHBOARD}/preferences`);
      
      // Get from localStorage for now
      const stored = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.PREFERENCES);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error fetching preferences:', error);
      return {};
    }
  }
}

// Create and export singleton instance
export const dashboardService = new DashboardService();
export default dashboardService;
