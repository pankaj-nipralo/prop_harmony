// Mock user database
const MOCK_USERS = [
  // Landlord Users
  {
    id: "landlord_001",
    email: "john.landlord@propertyharmony.com",
    password: "landlord123",
    role: "landlord",
    firstName: "John",
    lastName: "Smith",
    avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    phone: "+1 (555) 123-4567",
    properties: 12,
    totalTenants: 28,
    monthlyRevenue: 45000,
    joinDate: "2022-01-15",
    permissions: [
      "view_properties",
      "manage_properties",
      "view_applications",
      "manage_applications",
      "view_tenants",
      "manage_tenants",
      "view_payments",
      "manage_payments",
      "view_reports",
      "manage_maintenance",
      "send_messages",
    ],
    preferences: {
      notifications: true,
      emailAlerts: true,
      theme: "light",
      language: "en",
    },
  },
  {
    id: "landlord_002",
    email: "sarah.landlord@propertyharmony.com",
    password: "landlord456",
    role: "landlord",
    firstName: "Sarah",
    lastName: "Johnson",
    avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    phone: "+1 (555) 987-6543",
    properties: 8,
    totalTenants: 18,
    monthlyRevenue: 32000,
    joinDate: "2022-03-20",
    permissions: [
      "view_properties",
      "manage_properties",
      "view_applications",
      "manage_applications",
      "view_tenants",
      "manage_tenants",
      "view_payments",
      "manage_payments",
      "view_reports",
      "manage_maintenance",
      "send_messages",
    ],
    preferences: {
      notifications: true,
      emailAlerts: false,
      theme: "light",
      language: "en",
    },
  },

  // Tenant Users
  {
    id: "tenant_001",
    email: "mike.tenant@email.com",
    password: "tenant123",
    role: "tenant",
    firstName: "Michael",
    lastName: "Chen",
    avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    phone: "+1 (555) 456-7890",
    currentProperty: "Modern 2BR Apartment in Downtown",
    monthlyRent: 2400,
    leaseEndDate: "2025-06-30",
    joinDate: "2023-07-01",
    creditScore: 750,
    permissions: [
      "view_offers",
      "manage_offers",
      "submit_applications",
      "view_payments",
      "make_payments",
      "view_maintenance",
      "submit_maintenance",
      "send_messages",
      "view_documents",
    ],
    preferences: {
      notifications: true,
      emailAlerts: true,
      theme: "light",
      language: "en",
    },
  },
  {
    id: "tenant_002",
    email: "emily.tenant@email.com",
    password: "tenant456",
    role: "tenant",
    firstName: "Emily",
    lastName: "Rodriguez",
    avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    phone: "+1 (555) 321-9876",
    currentProperty: "Luxury 3BR Penthouse with City View",
    monthlyRent: 4500,
    leaseEndDate: "2025-12-31",
    joinDate: "2023-01-15",
    creditScore: 800,
    permissions: [
      "view_offers",
      "manage_offers",
      "submit_applications",
      "view_payments",
      "make_payments",
      "view_maintenance",
      "submit_maintenance",
      "send_messages",
      "view_documents",
    ],
    preferences: {
      notifications: true,
      emailAlerts: true,
      theme: "dark",
      language: "en",
    },
  },

  // Property Manager Users
  {
    id: "manager_001",
    email: "alex.manager@propertyharmony.com",
    password: "manager123",
    role: "property_manager",
    firstName: "Alex",
    lastName: "Thompson",
    avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    phone: "+1 (555) 654-3210",
    managedProperties: 25,
    managedTenants: 67,
    company: "Property Harmony Management",
    joinDate: "2021-11-10",
    permissions: [
      "view_properties",
      "manage_properties",
      "view_applications",
      "manage_applications",
      "view_tenants",
      "manage_tenants",
      "view_payments",
      "process_payments",
      "view_reports",
      "generate_reports",
      "manage_maintenance",
      "coordinate_maintenance",
      "send_messages",
      "manage_documents",
      "view_analytics",
    ],
    preferences: {
      notifications: true,
      emailAlerts: true,
      theme: "light",
      language: "en",
    },
  },
];

// Storage keys
const STORAGE_KEYS = {
  USER: "propertyharmony_user",
  TOKEN: "propertyharmony_token",
  REMEMBER_ME: "propertyharmony_remember",
};

// Mock authentication service
export const authService = {
  // Login function
  async login({ email, password, rememberMe = false }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user by email and password
    const user = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Generate mock token
    const token = `mock_token_${user.id}_${Date.now()}`;

    // Create user session data (exclude password)
    const { password: _, ...userSession } = user;
    const sessionData = {
      ...userSession,
      token,
      loginTime: new Date().toISOString(),
    };

    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(sessionData));
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);

    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "true");
    }

    return sessionData;
  },

  // Logout function with complete cleanup
  async logout() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Complete localStorage cleanup - remove all authentication-related data
    this.clearAllAuthData();

    return true;
  },

  // Complete authentication data cleanup
  clearAllAuthData() {
    // Remove specific auth keys
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);

    // Remove any other Property Harmony auth-related data
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.startsWith("propertyharmony_") ||
          key.startsWith("auth_") ||
          key.startsWith("user_") ||
          key.startsWith("session_") ||
          key.includes("token") ||
          key.includes("login") ||
          key.includes("remember"))
      ) {
        keysToRemove.push(key);
      }
    }

    // Remove all identified auth-related keys
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });

    // Clear any session storage as well (if used)
    try {
      sessionStorage.removeItem(STORAGE_KEYS.USER);
      sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);

      // Clear any session storage auth keys
      const sessionKeysToRemove = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (
          key &&
          (key.startsWith("propertyharmony_") ||
            key.startsWith("auth_") ||
            key.startsWith("user_") ||
            key.startsWith("session_"))
        ) {
          sessionKeysToRemove.push(key);
        }
      }
      sessionKeysToRemove.forEach((key) => {
        sessionStorage.removeItem(key);
      });
    } catch (error) {
      console.warn("Session storage cleanup failed:", error);
    }

    console.log("Complete authentication data cleanup completed");
  },

  // Get current user from localStorage
  async getCurrentUser() {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!userStr || !token) {
      return null;
    }

    try {
      const user = JSON.parse(userStr);

      // Validate token (in real app, this would be server-side validation)
      if (user.token !== token) {
        throw new Error("Invalid token");
      }

      return user;
    } catch (error) {
      // Clear invalid session using complete cleanup
      this.clearAllAuthData();
      return null;
    }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const user = await this.getCurrentUser();
    return !!user;
  },

  // Get user by ID (for admin purposes)
  async getUserById(id) {
    const user = MOCK_USERS.find((u) => u.id === id);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  // Update user profile
  async updateProfile(updates) {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new Error("Not authenticated");
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Update user data
    const updatedUser = { ...currentUser, ...updates };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));

    return updatedUser;
  },

  // Change password
  async changePassword({ currentPassword, newPassword }) {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new Error("Not authenticated");
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user in mock database
    const user = MOCK_USERS.find((u) => u.id === currentUser.id);
    if (!user || user.password !== currentPassword) {
      throw new Error("Current password is incorrect");
    }

    // In a real app, this would update the database
    // For mock purposes, we'll just simulate success
    return true;
  },

  // Get all users (admin function)
  async getAllUsers() {
    return MOCK_USERS.map(({ password: _, ...user }) => user);
  },

  // Role-based access control helpers
  hasPermission(user, permission) {
    return user?.permissions?.includes(permission) || false;
  },

  hasRole(user, role) {
    return user?.role === role;
  },

  hasAnyRole(user, roles) {
    return roles.includes(user?.role);
  },
};

// Export mock users for testing
export { MOCK_USERS };
