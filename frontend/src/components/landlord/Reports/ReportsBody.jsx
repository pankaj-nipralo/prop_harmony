import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  Maximize2, 
  Download, 
  Filter,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from "lucide-react";
import { reportsData, formatCurrency, formatPercentage } from "@/data/landlord/reports/data";

const ReportsBody = ({ 
  reportType, 
  dateRange, 
  onChartClick,
  onExportChart,
  isLoading = false 
}) => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [chartType, setChartType] = useState('bar');

  const colors = {
    primary: '#3b82f6',
    secondary: '#10b981',
    tertiary: '#f59e0b',
    quaternary: '#ef4444',
    accent: '#8b5cf6'
  };

  const getChartsForReportType = () => {
    switch (reportType) {
      case 'financial':
        return renderFinancialCharts();
      case 'payment':
        return renderPaymentCharts();
      case 'property':
        return renderPropertyCharts();
      case 'tenant':
        return renderTenantCharts();
      case 'maintenance':
        return renderMaintenanceCharts();
      default:
        return renderFinancialCharts();
    }
  };

  const renderFinancialCharts = () => {
    const data = reportsData.financialReports;
    
    return [
      {
        id: 'revenue-trend',
        title: 'Monthly Revenue vs Expenses',
        subtitle: 'Revenue and expense trends over time',
        type: 'bar',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value), name]}
                labelStyle={{ color: '#374151' }}
              />
              <Legend />
              <Bar dataKey="revenue" fill={colors.primary} name="Revenue" />
              <Bar dataKey="expenses" fill={colors.quaternary} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        )
      },
      {
        id: 'profit-trend',
        title: 'Profit Trend Analysis',
        subtitle: 'Monthly profit progression',
        type: 'line',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Profit']}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke={colors.secondary} 
                strokeWidth={3}
                dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      },
      {
        id: 'expense-breakdown',
        title: 'Expense Category Breakdown',
        subtitle: 'Distribution of expenses by category',
        type: 'pie',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.expenseBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {data.expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        )
      },
      {
        id: 'cash-flow',
        title: 'Cash Flow Analysis',
        subtitle: 'Monthly cash inflow and outflow',
        type: 'area',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.cashFlow}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value), name]}
                labelStyle={{ color: '#374151' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="inflow" 
                stackId="1" 
                stroke={colors.secondary} 
                fill={colors.secondary}
                fillOpacity={0.6}
                name="Cash Inflow"
              />
              <Area 
                type="monotone" 
                dataKey="outflow" 
                stackId="2" 
                stroke={colors.quaternary} 
                fill={colors.quaternary}
                fillOpacity={0.6}
                name="Cash Outflow"
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      }
    ];
  };

  const renderPaymentCharts = () => {
    const data = reportsData.paymentReports;
    
    return [
      {
        id: 'collection-rates',
        title: 'Payment Collection Rates',
        subtitle: 'Monthly collection performance',
        type: 'area',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.collectionRates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[90, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                labelStyle={{ color: '#374151' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="collected" 
                stroke={colors.secondary} 
                fill={colors.secondary}
                fillOpacity={0.6}
                name="Collected"
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      },
      {
        id: 'payment-methods',
        title: 'Payment Methods Distribution',
        subtitle: 'Preferred payment methods by tenants',
        type: 'pie',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.paymentMethods}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ method, percentage }) => `${method}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {data.paymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(colors)[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        )
      }
    ];
  };

  const renderPropertyCharts = () => {
    const data = reportsData.propertyReports;
    
    return [
      {
        id: 'occupancy-rates',
        title: 'Property Occupancy Rates',
        subtitle: 'Occupancy performance by property',
        type: 'bar',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.occupancyRates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="property" angle={-45} textAnchor="end" height={100} />
              <YAxis domain={[80, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="occupancy" fill={colors.primary} name="Occupancy Rate" />
            </BarChart>
          </ResponsiveContainer>
        )
      },
      {
        id: 'maintenance-costs',
        title: 'Monthly Maintenance Costs',
        subtitle: 'Routine vs emergency maintenance costs',
        type: 'bar',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.maintenanceCosts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value), name]}
                labelStyle={{ color: '#374151' }}
              />
              <Legend />
              <Bar dataKey="routine" fill={colors.primary} name="Routine" />
              <Bar dataKey="emergency" fill={colors.quaternary} name="Emergency" />
            </BarChart>
          </ResponsiveContainer>
        )
      }
    ];
  };

  const renderTenantCharts = () => {
    const data = reportsData.tenantReports;
    
    return [
      {
        id: 'satisfaction-scores',
        title: 'Tenant Satisfaction Scores',
        subtitle: 'Satisfaction ratings by category',
        type: 'bar',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.satisfaction}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
              <YAxis domain={[0, 5]} />
              <Tooltip 
                formatter={(value, name) => [`${value}/5.0`, name]}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="score" fill={colors.secondary} name="Score" />
            </BarChart>
          </ResponsiveContainer>
        )
      },
      {
        id: 'lease-renewals',
        title: 'Lease Renewal Rates',
        subtitle: 'Monthly renewal performance',
        type: 'line',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.leaseRenewals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Renewal Rate']}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke={colors.accent} 
                strokeWidth={3}
                dot={{ fill: colors.accent, strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      }
    ];
  };

  const renderMaintenanceCharts = () => {
    const data = reportsData.maintenanceReports;
    
    return [
      {
        id: 'request-volumes',
        title: 'Maintenance Request Volumes',
        subtitle: 'Monthly request trends',
        type: 'bar',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.requestVolumes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, name]}
                labelStyle={{ color: '#374151' }}
              />
              <Legend />
              <Bar dataKey="requests" fill={colors.primary} name="Total Requests" />
              <Bar dataKey="completed" fill={colors.secondary} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        )
      },
      {
        id: 'category-breakdown',
        title: 'Maintenance Category Breakdown',
        subtitle: 'Requests by maintenance category',
        type: 'pie',
        component: (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, count }) => `${category}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {data.categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(colors)[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Requests']} />
            </PieChart>
          </ResponsiveContainer>
        )
      }
    ];
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6 border-0">
            <div className="animate-pulse">
              <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
              <div className="w-32 h-4 bg-gray-200 rounded mb-4"></div>
              <div className="w-full h-64 bg-gray-200 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const charts = getChartsForReportType();

  return (
    <div className="space-y-6">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {charts.map((chart) => (
          <Card key={chart.id} className="p-6 border-0 transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{chart.title}</h3>
                <p className="text-sm text-gray-600">{chart.subtitle}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onExportChart && onExportChart(chart.id)}
                  className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                  title="Export Chart"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => onChartClick && onChartClick(chart)}
                  className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                  title="Expand Chart"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="w-full">
              {chart.component}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportsBody;
