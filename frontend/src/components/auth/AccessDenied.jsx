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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg border-0 p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-100 rounded-full">
              <Shield className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>

          {/* Message */}
          <div className="space-y-3 mb-8">
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>

            {/* Role requirement */}
            {getRequiredRoleText() && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">Required Role:</span> {getRequiredRoleText()}
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  <span className="font-medium">Your Role:</span> {userRole}
                </p>
              </div>
            )}

            {/* Permission requirement */}
            {getRequiredPermissionText() && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
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
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors myButton"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </button>

            <button
              onClick={handleGoBack}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If you believe this is an error, please contact your administrator or 
              <a href="mailto:support@propertyharmony.com" className="text-blue-600 hover:text-blue-800 ml-1">
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
