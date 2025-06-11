import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandCoins, DollarSign, Calendar, TrendingUp, AlertCircle } from "lucide-react";

const RentCollectionMaster = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HandCoins className="w-6 h-6 text-blue-500" />
            <h1 className="text-3xl font-semibold text-gray-900">Rent Collection</h1>
          </div>
          <Button className="myButton bg-blue-500 hover:bg-blue-600">
            <DollarSign className="w-4 h-4 mr-2" />
            Process Payment
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
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collected</p>
                <p className="text-2xl font-bold text-gray-900">AED 135,000</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <HandCoins className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">AED 13,000</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-gray-900">91%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Content */}
        <Card className="p-8 border-0 bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <HandCoins className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Rent Collection Management</h2>
            <p className="text-gray-600 mb-6">
              Track and manage rent payments across all properties and tenants.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="myButton bg-blue-500 hover:bg-blue-600">
                <DollarSign className="w-4 h-4 mr-2" />
                View Payments
              </Button>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                <AlertCircle className="w-4 h-4 mr-2" />
                Overdue Payments
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RentCollectionMaster;
