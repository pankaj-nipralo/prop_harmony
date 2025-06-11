import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, FileText, Home, Calendar, Clock } from "lucide-react";

const DashboardRecentActivity = ({ data }) => {
  // Function to get the appropriate icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-blue-500" />;
      case 'lease':
        return <FileText className="w-4 h-4 text-green-500" />;
      case 'inspection':
        return <Home className="w-4 h-4 text-purple-500" />;
      case 'payment':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card className="bg-white border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start p-3 transition-colors border border-gray-100 rounded-lg hover:bg-gray-50">
              <div className="p-2 mr-3 rounded-full bg-gray-50">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardRecentActivity;