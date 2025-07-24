// Auth Test Helper - for development and testing
import { useAuth } from '@/contexts/AuthContext';

// Mock user data for testing dashboards
export const MOCK_USERS = {
  landlord: {
    id: 1,
    name: "Ahmed Al Farsi",
    email: "ahmed@example.com",
    role: "landlord",
    avatar: null
  },
  tenant: {
    id: 2,
    name: "Sarah Johnson", 
    email: "sarah@example.com",
    role: "tenant",
    avatar: null
  },
  property_manager: {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com", 
    role: "property_manager",
    avatar: null
  }
};

// Helper to get mock user based on current route
export const getMockUserFromRoute = () => {
  const path = window.location.pathname;
  
  if (path.includes('/landlord')) {
    return MOCK_USERS.landlord;
  }
  
  if (path.includes('/tenant')) {
    return MOCK_USERS.tenant;
  }
  
  if (path.includes('/property-manager') || path.includes('/manager')) {
    return MOCK_USERS.property_manager;
  }
  
  return MOCK_USERS.landlord; // Default fallback
};

// Hook to get user with fallback for development
export const useAuthWithFallback = () => {
  const auth = useAuth();
  
  // If no user is authenticated, provide mock user for development
  if (!auth.user && process.env.NODE_ENV === 'development') {
    return {
      ...auth,
      user: getMockUserFromRoute(),
      isAuthenticated: true
    };
  }
  
  return auth;
};

// Test function to verify auth context is working
export const testAuthContext = () => {
  try {
    const auth = useAuth();
    console.log('✅ AuthContext is working correctly');
    console.log('Current user:', auth.user);
    return true;
  } catch (error) {
    console.error('❌ AuthContext error:', error);
    return false;
  }
};
