import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ActiveWorkOrdersTable = ({ data }) => {
  const { user } = useAuth();
  const isPropertyManager = user?.role === "property_manager";

  return (
    <Card className="bg-white border-0 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-gray-400" />
          <CardTitle className="text-lg font-semibold text-gray-800">Active Work Orders</CardTitle>
        </div>
        <p className="text-sm text-gray-500">Current maintenance issues</p>
      </CardHeader>
      <CardContent>
        {data.maintenanceRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  {isPropertyManager && (
                    <th className="px-4 py-3 font-medium text-left text-gray-500">Landlord</th>
                  )}
                  <th className="px-4 py-3 font-medium text-left text-gray-500">Property</th>
                  <th className="px-4 py-3 font-medium text-left text-gray-500">Issue</th>
                  <th className="px-4 py-3 font-medium text-left text-gray-500">Tenant</th>
                  <th className="px-4 py-3 font-medium text-left text-gray-500">Status</th>
                  <th className="px-4 py-3 font-medium text-left text-gray-500">Priority</th>
                </tr>
              </thead>
              <tbody>
                {data.maintenanceRequests.map((request, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    {isPropertyManager && (
                      <td className="px-4 py-3 text-gray-700">{request.landlord}</td>
                    )}
                    <td className="px-4 py-3 text-gray-700">{request.property}</td>
                    <td className="px-4 py-3 text-gray-700">{request.issue}</td>
                    <td className="px-4 py-3 text-gray-700">{request.tenant}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === "In Progress" 
                          ? "bg-blue-100 text-blue-800" 
                          : request.status === "Pending" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.priority === "Critical" 
                          ? "bg-red-100 text-red-800" 
                          : request.priority === "High" 
                          ? "bg-amber-100 text-amber-800" 
                          : request.priority === "Medium"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {request.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-base text-center text-gray-400">
            No active work orders found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveWorkOrdersTable;