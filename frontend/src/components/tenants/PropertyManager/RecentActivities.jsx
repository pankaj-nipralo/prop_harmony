import React from 'react';
import { AlertTriangle, CheckCircle, MessageCircle, FileText } from 'lucide-react';

const RecentActivities = ({ activities }) => {
  const getActivityIcon = (iconType) => {
    switch (iconType) {
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'CheckCircle':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-purple-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0">
              {getActivityIcon(activity.icon)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(activity.date)}
                  </p>
                </div>
                
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.statusColor}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
