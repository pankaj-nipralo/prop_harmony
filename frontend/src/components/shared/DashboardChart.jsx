// Reusable chart component for dashboards
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { DASHBOARD_CONFIGS } from '@/config/dashboard-configs';
import { cn } from '@/lib/utils';

const DashboardChart = ({
  title,
  type = 'bar', // 'bar', 'line', 'pie'
  data = [],
  loading = false,
  height = 300,
  showLegend = true,
  showGrid = true,
  className,
  config = {},
  ...props
}) => {
  const colors = DASHBOARD_CONFIGS.CHART_COLORS;

  // Default chart configurations
  const defaultConfigs = {
    bar: {
      dataKey: 'value',
      xAxisKey: 'name',
      color: colors.primary
    },
    line: {
      dataKey: 'value',
      xAxisKey: 'name',
      color: colors.primary,
      strokeWidth: 2
    },
    pie: {
      dataKey: 'value',
      nameKey: 'name',
      colors: colors.gradient
    }
  };

  const chartConfig = { ...defaultConfigs[type], ...config };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Loading skeleton
  if (loading) {
    return (
      <Card className={cn("bg-white border-0 shadow-md", className)}>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Render chart based on type
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis 
              dataKey={chartConfig.xAxisKey} 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar 
              dataKey={chartConfig.dataKey} 
              fill={chartConfig.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis 
              dataKey={chartConfig.xAxisKey} 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Line 
              type="monotone"
              dataKey={chartConfig.dataKey} 
              stroke={chartConfig.color}
              strokeWidth={chartConfig.strokeWidth}
              dot={{ fill: chartConfig.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: chartConfig.color, strokeWidth: 2 }}
            />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={chartConfig.dataKey}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={chartConfig.colors[index % chartConfig.colors.length]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
          </PieChart>
        );

      default:
        return <div className="text-center text-gray-500">Unsupported chart type</div>;
    }
  };

  return (
    <Card className={cn("bg-white border-0 shadow-md", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-gray-500">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            {renderChart()}
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

// Specialized chart components
export const IncomeChart = ({ data, loading, ...props }) => (
  <DashboardChart
    type="bar"
    data={data}
    loading={loading}
    config={{
      dataKey: 'income',
      xAxisKey: 'month'
    }}
    {...props}
  />
);

export const OccupancyChart = ({ data, loading, ...props }) => (
  <DashboardChart
    type="line"
    data={data}
    loading={loading}
    config={{
      dataKey: 'occupancy',
      xAxisKey: 'month',
      color: DASHBOARD_CONFIGS.CHART_COLORS.success
    }}
    {...props}
  />
);

export const PropertyDistributionChart = ({ data, loading, ...props }) => (
  <DashboardChart
    type="pie"
    data={data}
    loading={loading}
    config={{
      dataKey: 'count',
      nameKey: 'type'
    }}
    {...props}
  />
);

export default DashboardChart;
