import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Calendar, TrendingUp, FileText, PieChart } from "lucide-react";

const ReportsMaster = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            <h1 className="text-3xl font-semibold text-gray-900">Reports & Analytics</h1>
          </div>
          <Button className="myButton bg-blue-500 hover:bg-blue-600">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">AED 148,000</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-gray-900">91%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <PieChart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Properties</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports Generated</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Report Types Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Reports</h3>
              <p className="text-gray-600 mb-4">Revenue, expenses, and profit analysis</p>
              <Button className="myButton bg-blue-500 hover:bg-blue-600 w-full">
                Generate Report
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
                <PieChart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Occupancy Reports</h3>
              <p className="text-gray-600 mb-4">Property occupancy and vacancy trends</p>
              <Button className="myButton bg-blue-500 hover:bg-blue-600 w-full">
                Generate Report
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Maintenance Reports</h3>
              <p className="text-gray-600 mb-4">Work orders and maintenance costs</p>
              <Button className="myButton bg-blue-500 hover:bg-blue-600 w-full">
                Generate Report
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-amber-100 rounded-lg w-fit mx-auto mb-4">
                <FileText className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tenant Reports</h3>
              <p className="text-gray-600 mb-4">Tenant demographics and lease data</p>
              <Button className="myButton bg-blue-500 hover:bg-blue-600 w-full">
                Generate Report
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-red-100 rounded-lg w-fit mx-auto mb-4">
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lease Reports</h3>
              <p className="text-gray-600 mb-4">Lease expirations and renewals</p>
              <Button className="myButton bg-blue-500 hover:bg-blue-600 w-full">
                Generate Report
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-indigo-100 rounded-lg w-fit mx-auto mb-4">
                <Download className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Reports</h3>
              <p className="text-gray-600 mb-4">Create custom analytics reports</p>
              <Button className="myButton bg-blue-500 hover:bg-blue-600 w-full">
                Create Custom
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsMaster;
