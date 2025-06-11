import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import AccessDenied from "./AccessDenied";

const ProtectedRoute = ({
  children,
  requiredRole = null,
  requiredRoles = [],
  requiredPermission = null,
  requiredPermissions = [],
  fallbackPath = "/login",
  showAccessDenied = true,
  enableSmartRedirect = true, // New prop to enable smart role-based redirection
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />
    );
  }

  // Check role requirements
  const hasRequiredRole = () => {
    // If specific role is required
    if (requiredRole) {
      return user.role === requiredRole;
    }

    // If any of multiple roles is required
    if (requiredRoles.length > 0) {
      return requiredRoles.includes(user.role);
    }

    // No role requirement
    return true;
  };

  // Check permission requirements
  const hasRequiredPermissions = () => {
    // If specific permission is required
    if (requiredPermission) {
      return user.permissions?.includes(requiredPermission);
    }

    // If multiple permissions are required (all must be present)
    if (requiredPermissions.length > 0) {
      return requiredPermissions.every((permission) =>
        user.permissions?.includes(permission)
      );
    }

    // No permission requirement
    return true;
  };

  // Check if user meets all requirements
  const hasAccess = hasRequiredRole() && hasRequiredPermissions();

  if (!hasAccess) {
    // Smart role-based redirection logic
    if (enableSmartRedirect && isRoleBasedRoute(location.pathname, user.role)) {
      // User is trying to access a different role's dashboard/routes
      const userDashboard = getUserDashboard(user.role);
      console.log(
        `Smart redirect: ${user.role} trying to access ${location.pathname}, redirecting to ${userDashboard}`
      );
      return <Navigate to={userDashboard} replace />;
    }

    // For permission-based access within the same role, show access denied
    if (showAccessDenied) {
      return (
        <AccessDenied
          requiredRole={requiredRole}
          requiredRoles={requiredRoles}
          requiredPermission={requiredPermission}
          requiredPermissions={requiredPermissions}
          userRole={user.role}
          userPermissions={user.permissions}
        />
      );
    } else {
      // Fallback redirect to appropriate dashboard based on user role
      const redirectPath = getUserDashboard(user.role);
      return <Navigate to={redirectPath} replace />;
    }
  }

  // User has access, render the protected component
  return children;
};

// Helper function to detect if user is trying to access a different role's routes
const isRoleBasedRoute = (pathname, userRole) => {
  // Define role-based route patterns
  const roleRoutes = {
    landlord: ["/landlord"],
    tenant: ["/tenants", "/tenant"],
    property_manager: ["/manager", "/property-manager"],
  };

  // Check if the current path belongs to a different role
  for (const [role, routes] of Object.entries(roleRoutes)) {
    if (role !== userRole) {
      // Check if the pathname starts with any of the other role's routes
      const isOtherRoleRoute = routes.some((route) =>
        pathname.startsWith(route)
      );
      if (isOtherRoleRoute) {
        return true; // User is trying to access a different role's route
      }
    }
  }

  return false; // User is accessing their own role's routes or a shared route
};

// Helper function to get user's default dashboard
const getUserDashboard = (role) => {
  switch (role) {
    case "landlord":
      return "/landlord/dashboard";
    case "tenant":
      return "/tenant/dashboard";
    case "property_manager":
      return "/property-manager/dashboard";
    default:
      return "/";
  }
};

// Role-specific protected route components for convenience
export const LandlordRoute = ({
  children,
  enableSmartRedirect = true,
  ...props
}) => (
  <ProtectedRoute
    requiredRole="landlord"
    enableSmartRedirect={enableSmartRedirect}
    {...props}
  >
    {children}
  </ProtectedRoute>
);

export const TenantRoute = ({
  children,
  enableSmartRedirect = true,
  ...props
}) => (
  <ProtectedRoute
    requiredRole="tenant"
    enableSmartRedirect={enableSmartRedirect}
    {...props}
  >
    {children}
  </ProtectedRoute>
);

export const PropertyManagerRoute = ({
  children,
  enableSmartRedirect = true,
  ...props
}) => (
  <ProtectedRoute
    requiredRole="property_manager"
    enableSmartRedirect={enableSmartRedirect}
    {...props}
  >
    {children}
  </ProtectedRoute>
);

// Multi-role protected routes
// export const LandlordOrManagerRoute = ({
//   children,
//   enableSmartRedirect = true,
//   ...props
// }) => (
//   <ProtectedRoute
//     requiredRoles={["landlord", "property_manager"]}
//     enableSmartRedirect={enableSmartRedirect}
//     {...props}
//   >
//     {children}
//   </ProtectedRoute>
// );

export const AuthenticatedRoute = ({
  children,
  enableSmartRedirect = false,
  ...props
}) => (
  <ProtectedRoute enableSmartRedirect={enableSmartRedirect} {...props}>
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;
