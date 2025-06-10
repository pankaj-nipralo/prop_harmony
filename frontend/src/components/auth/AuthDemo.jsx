import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Shield, User, Key, CheckCircle, XCircle } from 'lucide-react';

const AuthDemo = () => {
  const { user, isAuthenticated, hasRole, hasPermission, hasAnyRole } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-6 text-center">
        <Shield className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Authentication Required
        </h2>
        <p className="text-gray-600">
          Please log in to view authentication demo.
        </p>
      </div>
    );
  }

  const permissions = [
    'view_properties',
    'manage_properties',
    'view_applications',
    'manage_applications',
    'view_tenants',
    'manage_tenants',
    'view_payments',
    'manage_payments',
    'view_reports',
    'manage_maintenance',
    'send_messages',
    'view_offers',
    'submit_applications',
    'make_payments',
    'view_documents',
    'generate_reports',
    'view_analytics',
  ];

  const roles = ['landlord', 'tenant', 'property_manager'];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Authentication System Demo
        </h1>
        <p className="text-gray-600">
          This demo shows the current user's authentication status, role, and permissions.
        </p>
      </div>

      {/* User Information */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Current User
            </h2>
            <p className="text-gray-600">
              Authenticated user information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <p className="text-gray-900">
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
              user.role === 'landlord' ? 'bg-blue-100 text-blue-800' :
              user.role === 'tenant' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {user.role.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User ID
            </label>
            <p className="text-gray-900 font-mono text-sm">{user.id}</p>
          </div>
        </div>
      </Card>

      {/* Role Checks */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Role-Based Access Control
            </h2>
            <p className="text-gray-600">
              Check access for different roles
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {roles.map((role) => (
            <div key={role} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">
                {role.replace('_', ' ').toUpperCase()} Access
              </span>
              <div className="flex items-center gap-2">
                {hasRole(role) ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Granted</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-red-600 font-medium">Denied</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Multi-Role Check:</strong> Can access landlord OR property manager features: {' '}
            <span className={`font-medium ${
              hasAnyRole(['landlord', 'property_manager']) ? 'text-green-600' : 'text-red-600'
            }`}>
              {hasAnyRole(['landlord', 'property_manager']) ? 'YES' : 'NO'}
            </span>
          </p>
        </div>
      </Card>

      {/* Permission Checks */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Key className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Permission-Based Access Control
            </h2>
            <p className="text-gray-600">
              Check specific permissions for current user
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {permissions.map((permission) => (
            <div key={permission} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">
                {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              <div className="flex items-center gap-2">
                {hasPermission(permission) ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Usage Examples */}
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Usage Examples
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Role-Based Rendering</h3>
            <div className="text-sm text-gray-700 space-y-1">
              {hasRole('landlord') && (
                <p className="text-green-600">✓ Showing landlord-specific content</p>
              )}
              {hasRole('tenant') && (
                <p className="text-green-600">✓ Showing tenant-specific content</p>
              )}
              {hasRole('property_manager') && (
                <p className="text-green-600">✓ Showing property manager content</p>
              )}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Permission-Based Features</h3>
            <div className="text-sm text-gray-700 space-y-1">
              {hasPermission('manage_properties') && (
                <p className="text-green-600">✓ Property management features available</p>
              )}
              {hasPermission('manage_applications') && (
                <p className="text-green-600">✓ Application management features available</p>
              )}
              {hasPermission('view_reports') && (
                <p className="text-green-600">✓ Reports section accessible</p>
              )}
              {!hasPermission('manage_properties') && !hasPermission('manage_applications') && (
                <p className="text-gray-600">• Limited management features (view-only access)</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthDemo;
