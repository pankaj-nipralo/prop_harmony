import React from 'react';
import { LayoutDashboard, Home, Calendar, DollarSign, Wrench, Star } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="bg-transparent">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
            <p className="mt-1 text-gray-600">
              Welcome to your tenant portal
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
          <Home className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-2xl font-bold text-gray-800">1</span>
          <span className="mt-1 text-sm text-gray-500">Current Property</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
          <Calendar className="w-8 h-8 text-green-500 mb-2" />
          <span className="text-2xl font-bold text-green-600">245</span>
          <span className="mt-1 text-sm text-gray-500">Days Remaining</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
          <DollarSign className="w-8 h-8 text-purple-500 mb-2" />
          <span className="text-2xl font-bold text-purple-600">AED 8,500</span>
          <span className="mt-1 text-sm text-gray-500">Monthly Rent</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
          <Wrench className="w-8 h-8 text-orange-500 mb-2" />
          <span className="text-2xl font-bold text-orange-600">2</span>
          <span className="mt-1 text-sm text-gray-500">Open Requests</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 text-left text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
              Pay Rent
            </button>
            <button className="w-full px-4 py-3 text-left text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
              Submit Maintenance Request
            </button>
            <button className="w-full px-4 py-3 text-left text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Contact Property Manager
            </button>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Rent Payment</p>
                <p className="text-xs text-gray-500">Dec 1, 2024</p>
              </div>
              <span className="text-sm text-green-600 font-medium">Paid</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Maintenance Request</p>
                <p className="text-xs text-gray-500">Nov 28, 2024</p>
              </div>
              <span className="text-sm text-orange-600 font-medium">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Property Inspection</p>
                <p className="text-xs text-gray-500">Nov 25, 2024</p>
              </div>
              <span className="text-sm text-blue-600 font-medium">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
