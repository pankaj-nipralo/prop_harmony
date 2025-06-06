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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const BookkeepingCharts = ({ transactions }) => {
  const [activeChart, setActiveChart] = useState("monthly");

  if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
    return <div className="text-gray-500">No data available for charts.</div>;
  }

  // Flatten all transactions
  const allTransactions = transactions.flatMap((group) => group.transactionsList);

  // Prepare monthly trends data
  const monthlyData = {};
  allTransactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { month: monthName, income: 0, expenses: 0 };
    }
    
    if (transaction.type === "Income") {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }
  });

  const monthlyTrends = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  // Prepare category breakdown data
  const categoryData = {};
  allTransactions.forEach((transaction) => {
    if (!categoryData[transaction.category]) {
      categoryData[transaction.category] = {
        category: transaction.category,
        amount: 0,
        type: transaction.type,
      };
    }
    categoryData[transaction.category].amount += transaction.amount;
  });

  const categoryBreakdown = Object.values(categoryData);

  // Prepare property performance data
  const propertyData = {};
  allTransactions.forEach((transaction) => {
    if (!propertyData[transaction.propertyName]) {
      propertyData[transaction.propertyName] = {
        property: transaction.propertyName,
        income: 0,
        expenses: 0,
      };
    }
    
    if (transaction.type === "Income") {
      propertyData[transaction.propertyName].income += transaction.amount;
    } else {
      propertyData[transaction.propertyName].expenses += transaction.amount;
    }
  });

  const propertyPerformance = Object.values(propertyData);

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6B7280', '#14B8A6'];

  const chartTabs = [
    { id: "monthly", label: "Monthly Trends" },
    { id: "category", label: "By Category" },
    { id: "property", label: "By Property" },
  ];

  const renderMonthlyChart = () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Monthly Income & Expenses Bar Chart */}
      <Card className="p-6 border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Monthly Income & Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`AED ${value.toLocaleString()}`, '']} />
            <Legend />
            <Bar dataKey="income" fill="#10B981" name="Income" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Trend Analysis Line Chart */}
      <Card className="p-6 border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`AED ${value.toLocaleString()}`, '']} />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name="Income" />
            <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderCategoryChart = () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Category Breakdown Pie Chart */}
      <Card className="p-6 border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Expense Breakdown by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryBreakdown.filter(item => item.type === "Expense")}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {categoryBreakdown.filter(item => item.type === "Expense").map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`AED ${value.toLocaleString()}`, 'Amount']} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Income Categories Bar Chart */}
      <Card className="p-6 border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Income by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryBreakdown.filter(item => item.type === "Income")}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(value) => [`AED ${value.toLocaleString()}`, 'Amount']} />
            <Bar dataKey="amount" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderPropertyChart = () => (
    <div className="grid grid-cols-1 gap-6">
      {/* Financial Performance by Property */}
      <Card className="p-6 border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Financial Performance by Property</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={propertyPerformance} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="property" type="category" width={150} />
            <Tooltip formatter={(value) => [`AED ${value.toLocaleString()}`, '']} />
            <Legend />
            <Bar dataKey="income" fill="#10B981" name="Income" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderActiveChart = () => {
    switch (activeChart) {
      case "monthly":
        return renderMonthlyChart();
      case "category":
        return renderCategoryChart();
      case "property":
        return renderPropertyChart();
      default:
        return renderMonthlyChart();
    }
  };

  return (
    <div className="space-y-6 ">
      {/* Chart Navigation */}
      <div className="flex p-1 bg-gray-100 rounded-lg w-fit ">
        {chartTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveChart(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeChart === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart Content */}
      {renderActiveChart()}
    </div>
  );
};

export default BookkeepingCharts;
