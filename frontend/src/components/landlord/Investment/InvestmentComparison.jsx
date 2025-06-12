import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Percent,
  Calendar,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  ArrowUpDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { calculateInvestmentMetrics } from "@/data/landlord/investment/data";

const InvestmentComparison = ({ calculations }) => {
  const [selectedCalculations, setSelectedCalculations] = useState([]);
  const [comparisonView, setComparisonView] = useState("metrics");

  if (
    !calculations ||
    !Array.isArray(calculations) ||
    calculations.length === 0
  ) {
    return (
      <div className="py-12 text-center">
        <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-500">
          No calculations available for comparison
        </p>
      </div>
    );
  }

  const allCalculations = calculations.flatMap(
    (group) => group.calculationsList
  );

  const handleCalculationToggle = (calculationId) => {
    setSelectedCalculations((prev) => {
      if (prev.includes(calculationId)) {
        return prev.filter((id) => id !== calculationId);
      } else if (prev.length < 4) {
        // Limit to 4 calculations for comparison
        return [...prev, calculationId];
      } else {
        alert("You can compare up to 4 calculations at once");
        return prev;
      }
    });
  };

  const selectedCalcs = allCalculations.filter((calc) =>
    selectedCalculations.includes(calc.id)
  );

  const formatCurrency = (amount) => {
    return `AED ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const formatPercentage = (percentage) => {
    return `${percentage.toFixed(1)}%`;
  };

  const getMetricColor = (value, type) => {
    switch (type) {
      case "cashFlow":
        return value >= 0 ? "text-green-600" : "text-red-600";
      case "roi":
        if (value >= 15) return "text-green-600";
        if (value >= 10) return "text-blue-600";
        if (value >= 5) return "text-yellow-600";
        return "text-red-600";
      default:
        return "text-gray-900";
    }
  };

  // Prepare comparison data for charts
  const comparisonData = selectedCalcs.map((calc) => {
    const metrics = calculateInvestmentMetrics(calc);
    return {
      name:
        calc.name.length > 15 ? calc.name.substring(0, 15) + "..." : calc.name,
      fullName: calc.name,
      purchasePrice: calc.purchasePrice,
      totalInvestment: metrics.totalInvestment,
      monthlyCashFlow: metrics.monthlyCashFlow,
      annualCashFlow: metrics.annualCashFlow,
      capRate: metrics.capRate,
      cashOnCashReturn: metrics.cashOnCashReturn,
      totalROI: metrics.totalROI,
      breakEvenMonths: metrics.breakEvenMonths,
      monthlyRent: calc.monthlyRent,
      monthlyExpenses: calc.monthlyExpenses,
    };
  });

  // Radar chart data for performance comparison
  const radarData = selectedCalcs.map((calc) => {
    const metrics = calculateInvestmentMetrics(calc);
    return {
      calculation:
        calc.name.length > 10 ? calc.name.substring(0, 10) + "..." : calc.name,
      "Cap Rate": Math.max(0, Math.min(10, metrics.capRate)), // Normalize to 0-10 scale
      "Cash-on-Cash": Math.max(0, Math.min(20, metrics.cashOnCashReturn)), // Normalize to 0-20 scale
      "Total ROI": Math.max(0, Math.min(25, metrics.totalROI)), // Normalize to 0-25 scale
      "Cash Flow Score": Math.max(
        0,
        Math.min(10, (metrics.monthlyCashFlow + 5000) / 1000)
      ), // Normalize cash flow
    };
  });

  console.log(selectedCalculations.length > 2);

  return (
    <div className="space-y-6">
      {/* Selection Panel */}
      <Card className="p-6 border-0 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Select Calculations to Compare
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allCalculations.map((calculation) => {
            const metrics = calculateInvestmentMetrics(calculation);
            const isSelected = selectedCalculations.includes(calculation.id);

            return (
              <div
                key={calculation.id}
                onClick={() => handleCalculationToggle(calculation.id)}
                className={`p-4 bg-white rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">
                    {calculation.name}
                  </h4>
                  {isSelected ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}
                </div>
                <p className="mb-2 text-sm text-gray-600">
                  {calculation.propertyName}
                </p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Investment:</span>
                    <span className="font-medium">
                      {formatCurrency(metrics.totalInvestment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Cash Flow:</span>
                    <span
                      className={`font-medium ${getMetricColor(
                        metrics.monthlyCashFlow,
                        "cashFlow"
                      )}`}
                    >
                      {formatCurrency(metrics.monthlyCashFlow)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total ROI:</span>
                    <span
                      className={`font-medium ${getMetricColor(
                        metrics.totalROI,
                        "roi"
                      )}`}
                    >
                      {formatPercentage(metrics.totalROI)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedCalculations.length > 0 && (
          <div className="p-3 mt-4 rounded-lg bg-blue-50">
            <p className="text-sm text-blue-800">
              {selectedCalculations.length} calculation
              {selectedCalculations.length !== 1 ? "s" : ""} selected for
              comparison
              {selectedCalculations.length < 4 && " (You can select up to 4)"}
            </p>
          </div>
        )}
      </Card>

      {/* Comparison Results */}
      {selectedCalculations.length >= 2 && (
        <>
          {/* Comparison View Toggle */}
          <div className="flex p-1 bg-gray-100 rounded-lg w-fit">
            <button
              onClick={() => setComparisonView("metrics")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                comparisonView === "metrics"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <BarChart3 className="inline w-4 h-4 mr-2" />
              Metrics Comparison
            </button>
            <button
              onClick={() => setComparisonView("charts")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                comparisonView === "charts"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <PieChart className="inline w-4 h-4 mr-2" />
              Visual Comparison
            </button>
          </div>

          {comparisonView === "metrics" && (
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Side-by-Side Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Metric
                      </th>
                      {selectedCalcs.map((calc) => (
                        <th
                          key={calc.id}
                          className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          {calc.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        label: "Property Name",
                        key: "propertyName",
                        format: "text",
                      },
                      {
                        label: "Purchase Price",
                        key: "purchasePrice",
                        format: "currency",
                      },
                      {
                        label: "Total Investment",
                        key: "totalInvestment",
                        format: "currency",
                      },
                      {
                        label: "Monthly Rent",
                        key: "monthlyRent",
                        format: "currency",
                      },
                      {
                        label: "Monthly Expenses",
                        key: "monthlyExpenses",
                        format: "currency",
                      },
                      {
                        label: "Monthly Cash Flow",
                        key: "monthlyCashFlow",
                        format: "currency",
                        type: "cashFlow",
                      },
                      {
                        label: "Annual Cash Flow",
                        key: "annualCashFlow",
                        format: "currency",
                        type: "cashFlow",
                      },
                      {
                        label: "Cap Rate",
                        key: "capRate",
                        format: "percentage",
                      },
                      {
                        label: "Cash-on-Cash Return",
                        key: "cashOnCashReturn",
                        format: "percentage",
                      },
                      {
                        label: "Total ROI",
                        key: "totalROI",
                        format: "percentage",
                        type: "roi",
                      },
                      {
                        label: "Break Even (months)",
                        key: "breakEvenMonths",
                        format: "number",
                      },
                    ].map((metric) => (
                      <tr key={metric.key} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {metric.label}
                        </td>
                        {selectedCalcs.map((calc) => {
                          const metrics = calculateInvestmentMetrics(calc);
                          let value;

                          if (metric.key === "propertyName") {
                            value = calc.propertyName;
                          } else if (
                            metric.key === "purchasePrice" ||
                            metric.key === "monthlyRent" ||
                            metric.key === "monthlyExpenses"
                          ) {
                            value = calc[metric.key];
                          } else if (metric.key === "breakEvenMonths") {
                            value = Math.round(metrics[metric.key]);
                          } else {
                            value = metrics[metric.key];
                          }

                          let displayValue;
                          switch (metric.format) {
                            case "currency":
                              displayValue = formatCurrency(value);
                              break;
                            case "percentage":
                              displayValue = formatPercentage(value);
                              break;
                            case "number":
                              displayValue = value.toString();
                              break;
                            default:
                              displayValue = value;
                          }

                          return (
                            <td
                              key={calc.id}
                              className={`px-4 py-4 whitespace-nowrap text-sm ${
                                metric.type
                                  ? getMetricColor(value, metric.type)
                                  : "text-gray-900"
                              }`}
                            >
                              {displayValue}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {comparisonView === "charts" && (
            <div className="space-y-6">
              {/* ROI Comparison Chart */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  ROI Comparison
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatPercentage(value)} />
                    <Legend />
                    <Bar dataKey="capRate" fill="#3b82f6" name="Cap Rate %" />
                    <Bar
                      dataKey="cashOnCashReturn"
                      fill="#10b981"
                      name="Cash-on-Cash Return %"
                    />
                    <Bar dataKey="totalROI" fill="#8b5cf6" name="Total ROI %" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Cash Flow Comparison */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Cash Flow Comparison
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar
                      dataKey="monthlyRent"
                      fill="#10b981"
                      name="Monthly Rent"
                    />
                    <Bar
                      dataKey="monthlyExpenses"
                      fill="#ef4444"
                      name="Monthly Expenses"
                    />
                    <Bar
                      dataKey="monthlyCashFlow"
                      fill="#3b82f6"
                      name="Net Cash Flow"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Performance Radar Chart */}
              {selectedCalculations.length > 2 && (
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Performance Radar
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="calculation" />
                      <PolarRadiusAxis angle={90} domain={[0, 25]} />
                      {selectedCalcs.map((calc, index) => (
                        <Radar
                          key={calc.id}
                          name={calc.name}
                          dataKey={
                            calc.name.length > 10
                              ? calc.name.substring(0, 10) + "..."
                              : calc.name
                          }
                          stroke={
                            ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][index]
                          }
                          fill={
                            ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][index]
                          }
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      ))}
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-xs text-gray-500">
                    * Metrics are normalized for comparison. Higher values
                    indicate better performance.
                  </p>
                </Card>
              )}
            </div>
          )}
        </>
      )}

      {selectedCalculations.length === 1 && (
        <Card className="p-8 text-center border-0 shadow-sm">
          <ArrowUpDown className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">
            Select at least 2 calculations to start comparing
          </p>
        </Card>
      )}

      {selectedCalculations.length === 0 && (
        <Card className="p-8 text-center border-0 shadow-sm">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">
            Select calculations above to compare their performance
          </p>
        </Card>
      )}
    </div>
  );
};

export default InvestmentComparison;
