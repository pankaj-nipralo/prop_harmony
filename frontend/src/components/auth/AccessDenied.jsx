import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, ArrowLeft, Home } from 'lucide-react';

const AccessDenied = ({ 
  requiredRole, 
  requiredRoles = [], 
  requiredPermission,
  requiredPermissions = [],
  userRole,
  userPermissions = []
}) => {
  const navigate = useNavigate();
  const { getRoleBasePath } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    const basePath = getRoleBasePath();
    navigate(`${basePath}/dashboard`);
  };

  const formatRoles = (roles) => {
    if (roles.length === 1) return roles[0];
    if (roles.length === 2) return roles.join(' or ');
    return roles.slice(0, -1).join(', ') + ', or ' + roles[roles.length - 1];
  };

  const formatPermissions = (permissions) => {
    if (permissions.length === 1) return permissions[0];
    if (permissions.length === 2) return permissions.join(' and ');
    return permissions.slice(0, -1).join(', ') + ', and ' + permissions[permissions.length - 1];
  };

  const getRequiredRoleText = () => {
    if (requiredRole) return requiredRole;
    if (requiredRoles.length > 0) return formatRoles(requiredRoles);
    return null;
  };

  const getRequiredPermissionText = () => {
    if (requiredPermission) return requiredPermission;
    if (requiredPermissions.length > 0) return formatPermissions(requiredPermissions);
    return null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-md">
        <div className="p-8 text-center bg-white border-0 rounded-lg shadow-lg">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-100 rounded-full">
              <Shield className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Access Denied
          </h1>

          {/* Message */}
          <div className="mb-8 space-y-3">
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>

            {/* Role requirement */}
            {getRequiredRoleText() && (
              <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">Required Role:</span> {getRequiredRoleText()}
                </p>
                <p className="mt-1 text-sm text-yellow-700">
                  <span className="font-medium">Your Role:</span> {userRole}
                </p>
              </div>
            )}

            {/* Permission requirement */}
            {getRequiredPermissionText() && (
              <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Required Permission:</span> {getRequiredPermissionText()}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 myButton"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </button>

            <button
              onClick={handleGoBack}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>

          {/* Help Text */}
          <div className="pt-6 mt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If you believe this is an error, please contact your administrator or 
              <a href="mailto:support@propertyharmony.com" className="ml-1 text-blue-600 hover:text-blue-800">
                support team
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
