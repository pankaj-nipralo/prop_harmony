import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { 
  Shield, 
  LogOut, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Trash2,
  RotateCcw
} from 'lucide-react';

const AuthEnhancementsDemo = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="p-6 text-center">
        <Shield className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Authentication Required
        </h2>
        <p className="text-gray-600">
          Please log in to view authentication enhancements demo.
        </p>
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const testCrossRoleAccess = (targetRole) => {
    const routes = {
      landlord: '/landlord/dashboard',
      tenant: '/tenants/dashboard',
      property_manager: '/manager/dashboard'
    };
    
    navigate(routes[targetRole]);
  };

  const getCurrentStorageData = () => {
    const authKeys = [];
    const otherKeys = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        if (key.startsWith('propertyharmony_') || 
            key.includes('auth') || 
            key.includes('user') || 
            key.includes('token') ||
            key.includes('login') ||
            key.includes('remember')) {
          authKeys.push(key);
        } else {
          otherKeys.push(key);
        }
      }
    }
    
    return { authKeys, otherKeys };
  };

  const { authKeys, otherKeys } = getCurrentStorageData();

  const roleTestRoutes = [
    { role: 'landlord', label: 'Landlord Dashboard', route: '/landlord/dashboard' },
    { role: 'tenant', label: 'Tenant Dashboard', route: '/tenants/dashboard' },
    { role: 'property_manager', label: 'Property Manager Dashboard', route: '/manager/dashboard' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Authentication Enhancements Demo
        </h1>
        <p className="text-gray-600">
          Test the enhanced logout cleanup and smart role-based redirection features.
        </p>
      </div>

      {/* Current User Info */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Current User: {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">
              Role: <span className="font-medium capitalize">{user.role.replace('_', ' ')}</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Smart Redirection Test */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <RotateCcw className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Smart Role-Based Redirection Test
            </h2>
            <p className="text-gray-600">
              Try accessing other role dashboards - you'll be redirected to your own dashboard
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">How it works:</span>
            </div>
            <p className="text-sm text-blue-700">
              When you try to access a different role's dashboard, the system will automatically 
              redirect you to your own role's dashboard instead of showing an "Access Denied" page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roleTestRoutes.map((route) => (
              <button
                key={route.role}
                onClick={() => testCrossRoleAccess(route.role)}
                className={`p-3 rounded-lg border-2 transition-colors text-left ${
                  route.role === user.role
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">{route.label}</span>
                </div>
                <p className="text-xs mt-1 opacity-75">
                  {route.role === user.role ? 'Your current role' : 'Will redirect to your dashboard'}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Storage Cleanup Test */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Complete Logout Cleanup Test
            </h2>
            <p className="text-gray-600">
              Test the enhanced logout that removes ALL authentication data
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Current Storage Data:</span>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-yellow-800">Authentication Keys ({authKeys.length}):</p>
                <div className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded mt-1 max-h-20 overflow-y-auto">
                  {authKeys.length > 0 ? authKeys.join(', ') : 'None found'}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-yellow-800">Other Keys ({otherKeys.length}):</p>
                <div className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded mt-1 max-h-20 overflow-y-auto">
                  {otherKeys.length > 0 ? otherKeys.slice(0, 10).join(', ') + (otherKeys.length > 10 ? '...' : '') : 'None found'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Enhanced Logout Features:</span>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Removes all propertyharmony_ prefixed keys</li>
              <li>• Clears authentication tokens and user data</li>
              <li>• Removes cached offers, applications, and preferences</li>
              <li>• Cleans up both localStorage and sessionStorage</li>
              <li>• Ensures no residual authentication data remains</li>
            </ul>
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors myButton"
          >
            {isLoggingOut ? (
              <>
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                Test Complete Logout Cleanup
              </>
            )}
          </button>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-6 border-0 shadow-sm bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Testing Instructions</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-medium">1. Smart Redirection Test:</p>
            <p>Click on dashboard buttons for other roles. You should be automatically redirected to your own dashboard instead of seeing an access denied page.</p>
          </div>
          <div>
            <p className="font-medium">2. Complete Logout Test:</p>
            <p>Before logging out, note the authentication keys in storage. After logout, check that ALL authentication data has been removed from both localStorage and sessionStorage.</p>
          </div>
          <div>
            <p className="font-medium">3. Verification:</p>
            <p>After logout, try to access protected routes directly via URL - you should be redirected to login page with no residual authentication state.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthEnhancementsDemo;
