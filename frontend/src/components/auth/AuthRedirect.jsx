import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const AuthRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // Redirect to role-based dashboard
        switch (user.role) {
          case 'landlord':
            navigate('/landlord/dashboard', { replace: true });
            break;
          case 'tenant':
            navigate('/tenants/dashboard', { replace: true });
            break;
          case 'property_manager':
            navigate('/manager/dashboard', { replace: true });
            break;
          default:
            navigate('/login', { replace: true });
        }
      } else {
        // Not authenticated, redirect to login
        navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  // Show loading while determining redirect
  return <LoadingSpinner text="Redirecting..." />;
};

export default AuthRedirect;
