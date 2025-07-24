// Reusable Quick Actions Component
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText, 
  MessageSquare, 
  Calendar, 
  DollarSign,
  Wrench,
  Eye,
  Download,
  Upload,
  Settings,
  Users,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const QuickActions = ({
  actions = [],
  title = "Quick Actions",
  variant = 'grid', // 'grid', 'list', 'compact'
  columns = 3,
  showTitle = true,
  showIcons = true,
  showBadges = true,
  className,
  ...props
}) => {
  // Default action configurations
  const defaultActionConfigs = {
    // Landlord actions
    'add-property': {
      label: 'Add Property',
      icon: Building2,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Add a new property to your portfolio'
    },
    'create-lease': {
      label: 'Create Lease',
      icon: FileText,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Create a new lease agreement'
    },
    'collect-rent': {
      label: 'Collect Rent',
      icon: DollarSign,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      description: 'Process rent collection'
    },
    'schedule-inspection': {
      label: 'Schedule Inspection',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Schedule property inspection'
    },
    'maintenance-request': {
      label: 'Maintenance Request',
      icon: Wrench,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Create maintenance request'
    },
    'message-tenant': {
      label: 'Message Tenant',
      icon: MessageSquare,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      description: 'Send message to tenant'
    },

    // Tenant actions
    'submit-application': {
      label: 'Submit Application',
      icon: FileText,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Submit rental application'
    },
    'pay-rent': {
      label: 'Pay Rent',
      icon: DollarSign,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Make rent payment'
    },
    'request-maintenance': {
      label: 'Request Maintenance',
      icon: Wrench,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Submit maintenance request'
    },
    'view-documents': {
      label: 'View Documents',
      icon: Eye,
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'View lease documents'
    },
    'contact-landlord': {
      label: 'Contact Landlord',
      icon: MessageSquare,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      description: 'Contact your landlord'
    },

    // Property Manager actions
    'assign-work-order': {
      label: 'Assign Work Order',
      icon: Wrench,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Assign work order to contractor'
    },
    'generate-report': {
      label: 'Generate Report',
      icon: Download,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Generate property report'
    },
    'upload-documents': {
      label: 'Upload Documents',
      icon: Upload,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Upload property documents'
    },
    'manage-tenants': {
      label: 'Manage Tenants',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Manage tenant information'
    },

    // Common actions
    'settings': {
      label: 'Settings',
      icon: Settings,
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Manage account settings'
    }
  };

  // Merge default configs with provided actions
  const enrichedActions = actions.map(action => {
    if (typeof action === 'string') {
      return {
        key: action,
        ...defaultActionConfigs[action],
        onClick: () => console.log(`Action: ${action}`)
      };
    }
    
    const defaultConfig = defaultActionConfigs[action.key] || {};
    return {
      ...defaultConfig,
      ...action
    };
  });

  // Grid classes for responsive layout
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  };

  // Render action button
  const renderAction = (action, index) => {
    const Icon = action.icon;
    
    if (variant === 'compact') {
      return (
        <Button
          key={action.key || index}
          variant="outline"
          size="sm"
          onClick={action.onClick}
          disabled={action.disabled}
          className="flex items-center gap-2"
        >
          {showIcons && Icon && <Icon className="w-4 h-4" />}
          {action.label}
          {showBadges && action.badge && (
            <Badge variant="secondary" className="ml-1">
              {action.badge}
            </Badge>
          )}
        </Button>
      );
    }

    if (variant === 'list') {
      return (
        <div
          key={action.key || index}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={action.onClick}
        >
          <div className="flex items-center gap-3">
            {showIcons && Icon && (
              <div className={cn("p-2 rounded-lg text-white", action.color)}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h4 className="font-medium text-gray-900">{action.label}</h4>
              {action.description && (
                <p className="text-sm text-gray-600">{action.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showBadges && action.badge && (
              <Badge variant="secondary">
                {action.badge}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              disabled={action.disabled}
            >
              {action.buttonText || 'Go'}
            </Button>
          </div>
        </div>
      );
    }

    // Grid variant (default)
    return (
      <Card
        key={action.key || index}
        className="cursor-pointer hover:shadow-md transition-all duration-200 border-0 shadow-sm"
        onClick={action.onClick}
      >
        <CardContent className="p-4 text-center">
          {showIcons && Icon && (
            <div className={cn(
              "w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center text-white",
              action.color
            )}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          
          <h4 className="font-medium text-gray-900 mb-1">{action.label}</h4>
          
          {action.description && (
            <p className="text-sm text-gray-600 mb-3">{action.description}</p>
          )}
          
          {showBadges && action.badge && (
            <Badge variant="secondary" className="mt-2">
              {action.badge}
            </Badge>
          )}
          
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            disabled={action.disabled}
          >
            {action.buttonText || 'Start'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Compact variant without card wrapper
  if (variant === 'compact') {
    return (
      <div className={cn("flex flex-wrap gap-2", className)} {...props}>
        {enrichedActions.map(renderAction)}
      </div>
    );
  }

  return (
    <Card className={cn("bg-white border-0 shadow-md", className)} {...props}>
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            {title}
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className={variant === 'list' ? 'space-y-3' : ''}>
        <div className={cn(
          variant === 'grid' && `grid gap-4 ${gridClasses[columns] || gridClasses[3]}`,
          variant === 'list' && 'space-y-3'
        )}>
          {enrichedActions.map(renderAction)}
        </div>
      </CardContent>
    </Card>
  );
};

// Predefined action sets for different roles
export const LANDLORD_QUICK_ACTIONS = [
  'add-property',
  'create-lease',
  'collect-rent',
  'schedule-inspection',
  'maintenance-request',
  'message-tenant'
];

export const TENANT_QUICK_ACTIONS = [
  'submit-application',
  'pay-rent',
  'request-maintenance',
  'view-documents',
  'contact-landlord'
];

export const PROPERTY_MANAGER_QUICK_ACTIONS = [
  'assign-work-order',
  'generate-report',
  'upload-documents',
  'manage-tenants',
  'schedule-inspection'
];

export default QuickActions;
