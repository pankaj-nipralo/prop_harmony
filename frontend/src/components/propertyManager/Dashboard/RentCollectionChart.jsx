import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const RentCollectionChart = ({ data }) => {
  return (
    <Card className="bg-white border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700">
          Rent Collection History
        </CardTitle>
        <p className="text-sm text-gray-500">Last 6 months collection summary</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.rentCollection.months.map((month, index) => ({
                month,
                Collected: data.rentCollection.collected[index],
                Pending: data.rentCollection.pending[index],
                Overdue: data.rentCollection.overdue[index]
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`AED ${value.toLocaleString()}`, undefined]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar dataKey="Collected" stackId="a" fill="#22c55e" />
              <Bar dataKey="Pending" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Overdue" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RentCollectionChart;