import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { 
  calculateInvestmentMetrics, 
  generateCashFlowProjection,
  generateAmortizationSchedule 
} from "@/data/landlord/investment/data";

const InvestmentCharts = ({ calculations, selectedCalculation }) => {
  const [activeChart, setActiveChart] = useState("cashflow");

  if (!calculations || !Array.isArray(calculations) || calculations.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No calculation data available for charts</p>
      </div>
    );
  }

  // Use selected calculation or first available
  const allCalculations = calculations.flatMap(group => group.calculationsList);
  const calculation = selectedCalculation || allCalculations[0];
  
  if (!calculation) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No calculation selected for visualization</p>
      </div>
    );
  }

  const metrics = calculateInvestmentMetrics(calculation);
  const cashFlowProjection = generateCashFlowProjection(calculation, 10);
  const amortizationSchedule = generateAmortizationSchedule(calculation, 5);

  // Prepare chart data
  const cashFlowData = cashFlowProjection.map(item => ({
    year: `Year ${item.year}`,
    income: item.annualRent,
    expenses: item.annualExpenses,
    cashFlow: item.annualCashFlow,
    propertyValue: item.propertyValue
  }));

  const roiData = cashFlowProjection.map(item => ({
    year: `Year ${item.year}`,
    totalROI: ((item.cumulativeCashFlow + (item.propertyValue - calculation.purchasePrice)) / metrics.totalInvestment) * 100,
    cashFlowROI: (item.cumulativeCashFlow / metrics.totalInvestment) * 100,
    appreciationROI: ((item.propertyValue - calculation.purchasePrice) / metrics.totalInvestment) * 100
  }));

  const monthlyBreakdownData = [
    { name: 'Loan Payment', value: metrics.monthlyMortgagePayment, color: '#f59e0b' },
    { name: 'Net Income', value: Math.max(0, calculation.monthlyRent - calculation.monthlyExpenses - metrics.monthlyMortgagePayment), color: '#10b981' },
    { name: 'Expenses', value: calculation.monthlyExpenses, color: '#ef4444' }
  ];

  const annualIncomeExpenseData = cashFlowProjection.map(item => ({
    year: `Year ${item.year}`,
    income: item.annualRent,
    expenses: item.annualExpenses
  }));

  const formatCurrency = (value) => {
    return `AED ${value.toLocaleString()}`;
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Chart Navigation */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveChart("cashflow")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeChart === "cashflow"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Cash Flow Projection
        </button>
        <button
          onClick={() => setActiveChart("appreciation")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeChart === "appreciation"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Property Value
        </button>
        <button
          onClick={() => setActiveChart("roi")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeChart === "roi"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          ROI Progression
        </button>
        <button
          onClick={() => setActiveChart("breakdown")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeChart === "breakdown"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Monthly Breakdown
        </button>
        <button
          onClick={() => setActiveChart("income-expense")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeChart === "income-expense"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Income vs Expenses
        </button>
      </div>

      {/* Chart Content */}
      {activeChart === "cashflow" && (
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">10-Year Cash Flow Projection</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Annual Income"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Annual Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="cashFlow" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Net Cash Flow"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {activeChart === "appreciation" && (
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Property Value Appreciation</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="propertyValue" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Property Value"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {activeChart === "roi" && (
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">ROI Progression</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatPercentage} />
              <Tooltip formatter={(value) => formatPercentage(value)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="totalROI" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Total ROI"
              />
              <Line 
                type="monotone" 
                dataKey="cashFlowROI" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Cash Flow ROI"
              />
              <Line 
                type="monotone" 
                dataKey="appreciationROI" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Appreciation ROI"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {activeChart === "breakdown" && (
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Monthly Cash Flow Breakdown</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={monthlyBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {monthlyBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      )}

      {activeChart === "income-expense" && (
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Annual Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={annualIncomeExpenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Annual Income" />
              <Bar dataKey="expenses" fill="#ef4444" name="Annual Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
};

export default InvestmentCharts;
