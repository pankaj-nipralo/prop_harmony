// Reusable Notification Panel Component
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NotificationPanel = ({
  notifications = [],
  loading = false,
  showFilter = true,
  maxHeight = '400px',
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onNotificationClick,
  className,
  ...props
}) => {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'info', 'warning', 'success', 'error'

  // Notification type configurations
  const typeConfigs = {
    info: {
      icon: Info,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200'
    },
    success: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    error: {
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesReadFilter = filter === 'all' || 
      (filter === 'read' && notification.read) ||
      (filter === 'unread' && !notification.read);
    
    const matchesTypeFilter = typeFilter === 'all' || notification.type === typeFilter;
    
    return matchesReadFilter && matchesTypeFilter;
  });

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle mark as read
  const handleMarkAsRead = (notificationId) => {
    onMarkAsRead?.(notificationId);
  };

  // Handle dismiss
  const handleDismiss = (notificationId) => {
    onDismiss?.(notificationId);
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    onNotificationClick?.(notification);
  };

  // Render notification item
  const renderNotification = (notification) => {
    const config = typeConfigs[notification.type] || typeConfigs.info;
    const Icon = config.icon;

    return (
      <div
        key={notification.id}
        className={cn(
          "p-3 border-l-4 cursor-pointer transition-all duration-200 hover:bg-gray-50",
          config.border,
          !notification.read && "bg-blue-50/30"
        )}
        onClick={() => handleNotificationClick(notification)}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={cn("p-1 rounded-full", config.bg)}>
            <Icon className={cn("w-4 h-4", config.color)} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className={cn(
                  "text-sm font-medium text-gray-900",
                  !notification.read && "font-semibold"
                )}>
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {notification.message}
                </p>
                
                {/* Metadata */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                  
                  {notification.category && (
                    <Badge variant="secondary" className="text-xs">
                      {notification.category}
                    </Badge>
                  )}
                  
                  {!notification.read && (
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      New
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(notification.id);
                    }}
                    title="Mark as read"
                  >
                    <Check className="w-3 h-3" />
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss(notification.id);
                  }}
                  title="Dismiss"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 p-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
          {unreadCount > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Filters */}
        {showFilter && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter:</span>
              </div>
              
              <div className="flex gap-2">
                {['all', 'unread', 'read'].map((filterOption) => (
                  <Button
                    key={filterOption}
                    variant={filter === filterOption ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(filterOption)}
                  >
                    {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                {['all', 'info', 'warning', 'success', 'error'].map((typeOption) => (
                  <Button
                    key={typeOption}
                    variant={typeFilter === typeOption ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTypeFilter(typeOption)}
                  >
                    {typeOption.charAt(0).toUpperCase() + typeOption.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div 
          className="overflow-y-auto"
          style={{ maxHeight }}
        >
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No notifications found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map(renderNotification)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;
