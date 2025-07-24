// Application-wide constants
export const APP_CONSTANTS = {
  // API endpoints
  API_ENDPOINTS: {
    BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
    AUTH: "/auth",
    DASHBOARD: "/dashboard",
    PROPERTIES: "/properties",
    TENANTS: "/tenants",
    PAYMENTS: "/payments",
    MAINTENANCE: "/maintenance",
    REPORTS: "/reports"
  },

  // User roles
  USER_ROLES: {
    LANDLORD: "landlord",
    TENANT: "tenant", 
    PROPERTY_MANAGER: "property_manager",
    ADMIN: "admin"
  },

  // Permission levels
  PERMISSIONS: {
    READ: "read",
    WRITE: "write",
    DELETE: "delete",
    ADMIN: "admin"
  },

  // Date formats
  DATE_FORMATS: {
    DISPLAY: "MMM DD, YYYY",
    INPUT: "YYYY-MM-DD",
    DATETIME: "MMM DD, YYYY HH:mm",
    TIME: "HH:mm"
  },

  // Currency settings
  CURRENCY: {
    SYMBOL: "AED",
    LOCALE: "en-AE",
    DECIMAL_PLACES: 2
  },

  // File upload settings
  FILE_UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ["image/jpeg", "image/png", "application/pdf", "application/msword"],
    ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"]
  },

  // Validation rules
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 8,
    PHONE_PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  // Local storage keys
  STORAGE_KEYS: {
    USER: "propertyharmony_user",
    TOKEN: "propertyharmony_token",
    THEME: "propertyharmony_theme",
    LANGUAGE: "propertyharmony_language",
    PREFERENCES: "propertyharmony_preferences"
  },

  // Theme settings
  THEMES: {
    LIGHT: "light",
    DARK: "dark",
    SYSTEM: "system"
  },

  // Notification types
  NOTIFICATION_TYPES: {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info"
  },

  // Priority levels
  PRIORITY_LEVELS: {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
    URGENT: "urgent"
  },

  // Status types
  STATUS_TYPES: {
    ACTIVE: "active",
    INACTIVE: "inactive",
    PENDING: "pending",
    COMPLETED: "completed",
    CANCELLED: "cancelled"
  }
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Internal server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SESSION_EXPIRED: "Your session has expired. Please log in again."
};

// Success messages
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: "Changes saved successfully.",
  DELETE_SUCCESS: "Item deleted successfully.",
  UPDATE_SUCCESS: "Update completed successfully.",
  CREATE_SUCCESS: "Item created successfully.",
  UPLOAD_SUCCESS: "File uploaded successfully."
};
