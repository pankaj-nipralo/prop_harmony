import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const OccupancyRateChart = ({ data }) => {
  const occupancyData = [
    { name: "Occupied", value: data.occupiedUnits },
    { name: "Vacant", value: data.totalProperties - data.occupiedUnits }
  ];
  
  const pieColors = ["#22c55e", "#ef4444"]; // green, red

  return (
    <Card className="bg-white border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700">
          Occupancy Rate
        </CardTitle>
        <p className="text-sm text-gray-500">Current occupancy status</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Occupied Units: {data.occupiedUnits}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">Vacant Units: {data.totalProperties - data.occupiedUnits}</span>
              </div>
              <div className="pt-4 mt-4 text-lg font-bold text-gray-800 border-t border-gray-200">
                Current Occupancy: {data.occupancyRate}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyRateChart;