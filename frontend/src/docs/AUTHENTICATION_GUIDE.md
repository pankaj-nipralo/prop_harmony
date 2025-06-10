# Property Harmony Authentication System

## Overview

This document provides a comprehensive guide to the mock authentication system implemented for Property Harmony. The system supports three distinct user roles with role-based access control and persistent sessions.

## Architecture

### Core Components

1. **AuthContext** (`src/contexts/AuthContext.jsx`)

   - Global authentication state management
   - Login/logout functionality
   - Role-based access control helpers

2. **AuthService** (`src/services/authService.js`)

   - Mock authentication API
   - User data management
   - Session persistence

3. **ProtectedRoute** (`src/components/auth/ProtectedRoute.jsx`)

   - Route protection based on authentication and roles
   - Access control for specific permissions

4. **Login Component** (`src/components/auth/Login.jsx`)

   - Professional login form
   - Demo account quick access
   - Error handling and loading states

5. **UserProfile Component** (`src/components/auth/UserProfile.jsx`)
   - User profile dropdown in navigation
   - Role-specific statistics
   - Logout functionality

## User Roles & Demo Accounts

### Landlord

- **Email:** `john.landlord@propertyharmony.com`
- **Password:** `landlord123`
- **Permissions:** Property management, tenant management, applications, payments, reports
- **Dashboard:** `/landlord/dashboard`

### Tenant

- **Email:** `mike.tenant@email.com`
- **Password:** `tenant123`
- **Permissions:** View offers, submit applications, make payments, maintenance requests
- **Dashboard:** `/tenants/dashboard`

### Property Manager

- **Email:** `alex.manager@propertyharmony.com`
- **Password:** `manager123`
- **Permissions:** Full property and tenant management, reports, analytics
- **Dashboard:** `/manager/dashboard`

## Implementation Guide

### 1. Basic Setup

The authentication system is already integrated into the main App component:

```jsx
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return <AuthProvider>{/* Your app routes */}</AuthProvider>;
}
```

### 2. Using Authentication in Components

```jsx
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user.firstName}!</div>;
}
```

### 3. Protecting Routes

```jsx
import { LandlordRoute, TenantRoute } from '../components/auth/ProtectedRoute';

// Protect entire route tree
<Route path="/landlord" element={
  <LandlordRoute>
    <LandlordLayout />
  </LandlordRoute>
}>

// Protect individual routes with specific permissions
<ProtectedRoute requiredPermission="manage_properties">
  <PropertyManagement />
</ProtectedRoute>
```

### 4. Role-Based Access Control

```jsx
const { hasRole, hasPermission, hasAnyRole } = useAuth();

// Check specific role
if (hasRole("landlord")) {
  // Show landlord-specific content
}

// Check permission
if (hasPermission("manage_properties")) {
  // Show property management features
}

// Check multiple roles
if (hasAnyRole(["landlord", "property_manager"])) {
  // Show content for landlords or property managers
}
```

## Route Protection Examples

### Basic Authentication

```jsx
<AuthenticatedRoute>
  <Dashboard />
</AuthenticatedRoute>
```

### Role-Specific Protection

```jsx
<LandlordRoute>
  <PropertyManagement />
</LandlordRoute>

<TenantRoute>
  <MyOffers />
</TenantRoute>
```

### Permission-Based Protection

```jsx
<ProtectedRoute requiredPermission="manage_applications">
  <ApplicationsManagement />
</ProtectedRoute>
```

### Multi-Role Protection

```jsx
<ProtectedRoute requiredRoles={["landlord", "property_manager"]}>
  <AdvancedReports />
</ProtectedRoute>
```

### Smart Redirection Examples

```jsx
// Enable smart redirection (default for role-specific routes)
<LandlordRoute enableSmartRedirect={true}>
  <LandlordDashboard />
</LandlordRoute>

// Disable smart redirection to show access denied instead
<TenantRoute enableSmartRedirect={false}>
  <TenantSettings />
</TenantRoute>

// Custom route with smart redirection
<ProtectedRoute
  requiredRole="landlord"
  enableSmartRedirect={true}
  showAccessDenied={false}
>
  <PropertyManagement />
</ProtectedRoute>
```

### Enhanced Logout Usage

```jsx
const { logout } = useAuth();

const handleLogout = async () => {
  try {
    // This will now perform complete cleanup
    await logout();

    // All authentication data is guaranteed to be removed:
    // - propertyharmony_* keys
    // - auth_* keys
    // - user_* keys
    // - session_* keys
    // - cached offers, applications, preferences
    // - both localStorage and sessionStorage

    navigate("/login");
  } catch (error) {
    // Even if logout fails, cleanup is still performed
    console.error("Logout error:", error);
  }
};
```

## Session Management

### Automatic Session Restoration

- Sessions are automatically restored on app load
- User data persists in localStorage
- Invalid sessions are automatically cleared

### Remember Me Functionality

- Optional persistent login
- Controlled via login form checkbox
- Extends session duration

### Enhanced Logout Cleanup

- **Complete localStorage cleanup** - Removes ALL authentication-related data
- **Pattern-based cleanup** - Removes keys with auth-related patterns
- **SessionStorage cleanup** - Clears both localStorage and sessionStorage
- **Cached data removal** - Removes user-specific cached data (offers, applications, preferences)
- **Guaranteed clean state** - Ensures no residual authentication data remains

### Smart Role-Based Redirection

- **Cross-role access detection** - Automatically detects when users try to access other roles' routes
- **Intelligent redirection** - Redirects to appropriate role dashboard instead of showing access denied
- **Permission-based access denied** - Still shows access denied for insufficient permissions within same role
- **Configurable behavior** - Can be enabled/disabled per route with `enableSmartRedirect` prop

## Error Handling

### Login Errors

- Invalid credentials
- Network errors
- Account lockout (simulated)

### Access Denied

- Professional access denied page
- Clear explanation of requirements
- Navigation options

### Session Expiry

- Automatic logout on invalid sessions
- Redirect to login page
- Preserve intended destination

## Customization

### Adding New Roles

1. Add role to `MOCK_USERS` in `authService.js`
2. Create role-specific route component
3. Update navigation and permissions

### Adding Permissions

1. Add permission to user objects in `authService.js`
2. Use `hasPermission()` in components
3. Protect routes with `requiredPermission`

### Styling

- All components follow Property Harmony design standards
- Blue-500 primary color scheme
- myButton class for consistency
- Responsive design included

## Testing

### Quick Testing

1. Use demo account buttons on login page
2. Test role switching by logging in with different accounts
3. Verify route protection by accessing unauthorized URLs

### Manual Testing Scenarios

1. **Authentication Flow**

   - Login with valid credentials
   - Login with invalid credentials
   - Logout functionality
   - Session persistence

2. **Role-Based Access**

   - Access landlord routes as tenant (should be denied)
   - Access tenant routes as landlord (should be denied)
   - Access shared routes as any role

3. **Permission Checks**
   - Verify UI elements show/hide based on permissions
   - Test route protection with specific permissions

## Future Backend Integration

### Migration Path

1. Replace `authService.js` with real API calls
2. Update token handling for JWT or similar
3. Implement server-side session validation
4. Add password reset and registration flows

### API Endpoints to Implement

- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/refresh`
- `POST /auth/register`
- `POST /auth/forgot-password`

## Security Considerations

### Current Implementation

- Client-side only (mock system)
- No real security (for demo purposes)
- Passwords stored in plain text (demo only)

### Production Requirements

- Server-side authentication
- Encrypted password storage
- JWT or session tokens
- HTTPS enforcement
- Rate limiting
- CSRF protection

## Troubleshooting

### Common Issues

1. **Routes not protected:** Ensure AuthProvider wraps your app
2. **User not persisting:** Check localStorage permissions
3. **Access denied loops:** Verify role requirements match user roles
4. **Login not working:** Check demo credentials are exact

### Debug Tools

- React DevTools for context inspection
- Browser localStorage for session data
- Console logs for authentication flow
- Network tab for API calls (when implemented)

## Support

For questions or issues with the authentication system:

1. Check this documentation
2. Review component source code
3. Test with demo accounts
4. Contact development team

---

_This authentication system is designed for development and demo purposes. Implement proper security measures before production deployment._
