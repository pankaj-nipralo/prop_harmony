import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authService } from "../services/authService";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  RESTORE_SESSION: "RESTORE_SESSION",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_LOADING: "SET_LOADING",
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.RESTORE_SESSION:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on app load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const user = await authService.getCurrentUser();
        dispatch({ type: AUTH_ACTIONS.RESTORE_SESSION, payload: user });
      } catch (error) {
        dispatch({ type: AUTH_ACTIONS.RESTORE_SESSION, payload: null });
      }
    };

    restoreSession();
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      const user = await authService.login(credentials);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
      return { success: true, user };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Logout function with complete cleanup
  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if service fails - ensure complete cleanup
      authService.clearAllAuthData();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }

    // Additional cleanup - clear any component-level cached data
    try {
      // Clear any cached offers, applications, or other user-specific data
      localStorage.removeItem("tenantOffers");
      localStorage.removeItem("landlordApplications");
      localStorage.removeItem("userPreferences");
      localStorage.removeItem("cachedProperties");
      localStorage.removeItem("recentSearches");

      // Clear any other app-specific cached data that should be user-specific
      const appKeysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          key &&
          (key.startsWith("cached_") ||
            key.startsWith("temp_") ||
            key.includes("userdata") ||
            key.includes("profile"))
        ) {
          appKeysToRemove.push(key);
        }
      }
      appKeysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });

      console.log("Complete logout cleanup completed");
    } catch (cleanupError) {
      console.warn("Additional cleanup failed:", cleanupError);
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(state.user?.role);
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return state.user?.permissions?.includes(permission);
  };

  // Get user's role-based route prefix
  const getRoleBasePath = () => {
    if (!state.user) return "/";

    switch (state.user.role) {
      case "landlord":
        return "/landlord";
      case "tenant":
        return "/tenant";
      case "property_manager":
        return "/manager";
      default:
        return "/";
    }
  };

  // Context value
  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    login,
    logout,
    clearError,

    // Utilities
    hasRole,
    hasAnyRole,
    hasPermission,
    getRoleBasePath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Export action types for testing
export { AUTH_ACTIONS };
