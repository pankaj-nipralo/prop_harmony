import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RentTrendChart = ({ chartData }) => {
  return (
    <Card className="p-6 mb-8 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
        <h2 className="mb-2 text-lg font-semibold text-gray-800 md:mb-0">
          6-Month Rent Collection Trend
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="collected"
            name="Collected"
            stroke="#22c55e"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="pending"
            name="Pending"
            stroke="#eab308"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="overdue"
            name="Overdue"
            stroke="#ef4444"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RentTrendChart;