import React, { useState, useMemo } from "react";
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
  Area,
  ComposedChart,
} from "recharts";

const BookkeepingCharts = ({ transactions }) => {
  const [activeChart, setActiveChart] = useState("monthly");

  // Generate comprehensive sample data if no transactions or insufficient data
  const generateSampleData = () => {
    const currentDate = new Date();
    const sampleTransactions = [];

    // Generate 12 months of realistic data
    for (let i = 11; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthData = [];

      // Properties
      const properties = [
        "Marina View Villa",
        "Sunset Apartments",
        "Oak Grove Condos",
        "City Center Apartments",
        "Downtown Loft",
        "Beachside Resort",
      ];

      // Generate income transactions for each property
      properties.forEach((property, propIndex) => {
        // Monthly rent (varies by property)
        const baseRent = 6000 + propIndex * 1500;
        const rentVariation = Math.random() * 1000 - 500; // ±500 variation

        monthData.push({
          id: `${i}-${propIndex}-rent`,
          date: date.toISOString().split("T")[0],
          propertyName: property,
          description: "Monthly rent payment",
          category: "Rent Income",
          amount: Math.round(baseRent + rentVariation),
          type: "Income",
          paymentMethod: "Bank Transfer",
          receiptNumber: `REC-${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${propIndex + 1}`,
          tenantName: `Tenant ${propIndex + 1}`,
        });

        // Occasional additional income
        if (Math.random() > 0.7) {
          monthData.push({
            id: `${i}-${propIndex}-deposit`,
            date: new Date(
              date.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .split("T")[0],
            propertyName: property,
            description: "Security deposit",
            category: "Security Deposits",
            amount: Math.round(1000 + Math.random() * 2000),
            type: "Income",
            paymentMethod: "Bank Transfer",
            receiptNumber: `DEP-${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${propIndex + 1}`,
            tenantName: `Tenant ${propIndex + 1}`,
          });
        }
      });

      // Generate expense transactions
      const expenseCategories = [
        { name: "Maintenance Costs", baseAmount: 800, variation: 600 },
        { name: "Utilities", baseAmount: 400, variation: 200 },
        { name: "Insurance", baseAmount: 300, variation: 100 },
        { name: "Property Management Fees", baseAmount: 1200, variation: 300 },
        { name: "Repairs", baseAmount: 600, variation: 800 },
        { name: "Cleaning Services", baseAmount: 200, variation: 100 },
      ];

      expenseCategories.forEach((category, catIndex) => {
        if (Math.random() > 0.3) {
          // 70% chance of expense occurring
          const randomProperty =
            properties[Math.floor(Math.random() * properties.length)];
          const amount = Math.round(
            category.baseAmount +
              (Math.random() * category.variation * 2 - category.variation)
          );

          monthData.push({
            id: `${i}-exp-${catIndex}`,
            date: new Date(
              date.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .split("T")[0],
            propertyName: randomProperty,
            description: `${category.name.toLowerCase()} expense`,
            category: category.name,
            amount: Math.max(50, amount), // Minimum 50 AED
            type: "Expense",
            paymentMethod: Math.random() > 0.5 ? "Bank Transfer" : "Cash",
            receiptNumber: `EXP-${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${catIndex + 1}`,
            vendorName: `Vendor ${catIndex + 1}`,
          });
        }
      });

      sampleTransactions.push(...monthData);
    }

    return [{ id: 1, transactionsList: sampleTransactions }];
  };

  // Use provided transactions or generate sample data
  const workingTransactions = useMemo(() => {
    if (
      !transactions ||
      !Array.isArray(transactions) ||
      transactions.length === 0
    ) {
      return generateSampleData();
    }

    // Check if we have sufficient data (at least 3 months)
    const allTrans = transactions.flatMap((group) => group.transactionsList);
    const uniqueMonths = new Set(
      allTrans.map((t) => {
        const date = new Date(t.date);
        return `${date.getFullYear()}-${date.getMonth()}`;
      })
    );

    if (uniqueMonths.size < 3) {
      return generateSampleData();
    }

    return transactions;
  }, [transactions]);

  // Flatten all transactions
  const allTransactions = workingTransactions.flatMap(
    (group) => group.transactionsList
  );

  // Prepare monthly trends data with enhanced metrics
  const monthlyData = {};
  allTransactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    const monthName = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthName,
        income: 0,
        expenses: 0,
        netProfit: 0,
        transactionCount: 0,
      };
    }

    if (transaction.type === "Income") {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }
    monthlyData[monthKey].transactionCount += 1;
  });

  // Calculate derived metrics
  Object.keys(monthlyData).forEach((key) => {
    const data = monthlyData[key];
    data.netProfit = data.income - data.expenses;
  });

  const monthlyTrends = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12); // Last 12 months

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

  // Prepare property performance data with ROI calculations
  const propertyData = {};
  allTransactions.forEach((transaction) => {
    if (!propertyData[transaction.propertyName]) {
      propertyData[transaction.propertyName] = {
        property: transaction.propertyName,
        income: 0,
        expenses: 0,
        netProfit: 0,
        profitMargin: 0,
      };
    }

    if (transaction.type === "Income") {
      propertyData[transaction.propertyName].income += transaction.amount;
    } else {
      propertyData[transaction.propertyName].expenses += transaction.amount;
    }
  });

  // Calculate derived metrics for properties
  Object.keys(propertyData).forEach((key) => {
    const data = propertyData[key];
    data.netProfit = data.income - data.expenses;
    data.profitMargin =
      data.income > 0 ? Math.round((data.netProfit / data.income) * 100) : 0;
  });

  const propertyPerformance = Object.values(propertyData);

  // Enhanced color scheme with blue-500 primary
  const COLORS = [
    "#3B82F6", // blue-500 (primary)
    "#10B981", // emerald-500
    "#F59E0B", // amber-500
    "#EF4444", // red-500
    "#8B5CF6", // violet-500
    "#EC4899", // pink-500
    "#06B6D4", // cyan-500
    "#84CC16", // lime-500
    "#F97316", // orange-500
    "#6366F1", // indigo-500
  ];

  const chartTabs = [
    { id: "monthly", label: "Monthly Trends" },
    { id: "category", label: "By Category" },
    { id: "property", label: "By Property" },
    { id: "analytics", label: "Analytics" },
  ];

  const renderMonthlyChart = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Income & Expenses Bar Chart */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Monthly Income & Expenses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value) => [`AED ${value.toLocaleString()}`, ""]}
              />
              <Legend />
              <Bar dataKey="income" fill="#3B82F6" name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Net Profit Trend Line Chart */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Net Profit Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value) => [`AED ${value.toLocaleString()}`, ""]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="netProfit"
                stroke="#3B82F6"
                strokeWidth={3}
                name="Net Profit"
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Combined Income vs Expenses Area Chart */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Cash Flow Analysis
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value) => [`AED ${value.toLocaleString()}`, ""]}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.6}
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="2"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.6}
              name="Expenses"
            />
            <Line
              type="monotone"
              dataKey="netProfit"
              stroke="#3B82F6"
              strokeWidth={3}
              name="Net Profit"
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderCategoryChart = () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Expense Breakdown Pie Chart */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Expense Breakdown by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryBreakdown.filter((item) => item.type === "Expense")}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percent }) =>
                `${category} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {categoryBreakdown
                .filter((item) => item.type === "Expense")
                .map((_, index) => (
                  <Cell
                    key={`expense-cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`AED ${value.toLocaleString()}`, "Amount"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Income Categories Bar Chart */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Income by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={categoryBreakdown.filter((item) => item.type === "Income")}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value) => [`AED ${value.toLocaleString()}`, "Amount"]}
            />
            <Bar dataKey="amount" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderPropertyChart = () => (
    <div className="space-y-6">
      {/* Financial Performance by Property */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Financial Performance by Property
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={propertyPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="property"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value) => [`AED ${value.toLocaleString()}`, ""]}
            />
            <Legend />
            <Bar dataKey="income" fill="#3B82F6" name="Income" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Property Net Profit */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Net Profit by Property
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={propertyPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="property"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value) => [`AED ${value.toLocaleString()}`, ""]}
            />
            <Bar dataKey="netProfit" fill="#10B981" name="Net Profit" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  // Analytics tab with key metrics
  const renderAnalyticsChart = () => {
    // Calculate summary metrics
    const totalIncome = allTransactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = allTransactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpenses;
    const profitMargin =
      totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0;

    return (
      <div className="space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="p-4 bg-white border-0 shadow-sm">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-blue-600">
                {totalIncome.toLocaleString()}
              </p>
            </div>
          </Card>
          <Card className="p-4 bg-white border-0 shadow-sm">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Total Expenses
              </p>
              <p className="text-2xl font-bold text-red-600">
                {totalExpenses.toLocaleString()}
              </p>
            </div>
          </Card>
          <Card className="p-4 bg-white border-0 shadow-sm">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p
                className={`text-2xl font-bold ${
                  netProfit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {netProfit.toLocaleString()}
              </p>
            </div>
          </Card>
          <Card className="p-4 bg-white border-0 shadow-sm">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Profit Margin</p>
              <p
                className={`text-2xl font-bold ${
                  parseFloat(profitMargin) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {profitMargin}%
              </p>
            </div>
          </Card>
        </div>

        {/* Property Performance Summary */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Property Performance Summary
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={propertyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="property"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()}`, ""]}
              />
              <Legend />
              <Bar dataKey="netProfit" fill="#3B82F6" name="Net Profit" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  };

  const renderActiveChart = () => {
    switch (activeChart) {
      case "monthly":
        return renderMonthlyChart();
      case "category":
        return renderCategoryChart();
      case "property":
        return renderPropertyChart();
      case "analytics":
        return renderAnalyticsChart();
      default:
        return renderMonthlyChart();
    }
  };

  return (
    <div className="space-y-6">
      {/* Chart Navigation */}
      <div className="flex p-1 bg-white rounded-lg w-fit">
        {chartTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveChart(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer  ${
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
      <div>{renderActiveChart()}</div>
    </div>
  );
};

export default BookkeepingCharts;
