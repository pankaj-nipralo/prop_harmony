import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const LeaseManagementMaster = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-500" />
            <h1 className="text-3xl font-semibold text-gray-900">Lease Management</h1>
          </div>
          <Button className="myButton bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Create Lease
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Leases</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Renewal</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">AED 1.8M</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Content */}
        <Card className="p-8 border-0 bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Lease Management System</h2>
            <p className="text-gray-600 mb-6">
              Manage lease agreements, renewals, and track important dates across all properties.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="myButton bg-blue-500 hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Create New Lease
              </Button>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LeaseManagementMaster;
