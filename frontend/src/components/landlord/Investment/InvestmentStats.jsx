import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Calculator, Target } from "lucide-react";
import { calculateInvestmentMetrics } from "@/data/landlord/investment/data";

const InvestmentStats = ({ calculations }) => {
  if (!calculations || !Array.isArray(calculations) || calculations.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">No Data</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                <Calculator className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Flatten all calculations
  const allCalculations = calculations.flatMap(group => group.calculationsList);

  // Calculate aggregate statistics
  const totalInvestment = allCalculations.reduce((sum, calc) => {
    const metrics = calculateInvestmentMetrics(calc);
    return sum + metrics.totalInvestment;
  }, 0);

  const totalAnnualCashFlow = allCalculations.reduce((sum, calc) => {
    const metrics = calculateInvestmentMetrics(calc);
    return sum + metrics.annualCashFlow;
  }, 0);

  const averageROI = allCalculations.length > 0 
    ? allCalculations.reduce((sum, calc) => {
        const metrics = calculateInvestmentMetrics(calc);
        return sum + metrics.totalROI;
      }, 0) / allCalculations.length
    : 0;

  const averageCapRate = allCalculations.length > 0
    ? allCalculations.reduce((sum, calc) => {
        const metrics = calculateInvestmentMetrics(calc);
        return sum + metrics.capRate;
      }, 0) / allCalculations.length
    : 0;

  const formatCurrency = (amount) => {
    return `AED ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatPercentage = (percentage) => {
    return `${percentage.toFixed(1)}%`;
  };

  const getROIColor = (roi) => {
    if (roi >= 15) return "text-green-600";
    if (roi >= 10) return "text-blue-600";
    if (roi >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  const getCashFlowColor = (cashFlow) => {
    if (cashFlow >= 0) return "text-green-600";
    return "text-red-600";
  };

  return (
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Investment */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Investment</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalInvestment)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {allCalculations.length} calculation{allCalculations.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </Card>

      {/* Annual Cash Flow */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Annual Cash Flow</p>
            <p className={`text-2xl font-bold ${getCashFlowColor(totalAnnualCashFlow)}`}>
              {totalAnnualCashFlow >= 0 ? '+' : ''}{formatCurrency(totalAnnualCashFlow)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {formatCurrency(totalAnnualCashFlow / 12)} monthly
            </p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            totalAnnualCashFlow >= 0 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <TrendingUp className={`w-6 h-6 ${
              totalAnnualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
            }`} />
          </div>
        </div>
      </Card>

      {/* Average ROI */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average ROI</p>
            <p className={`text-2xl font-bold ${getROIColor(averageROI)}`}>
              {formatPercentage(averageROI)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Including appreciation
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </Card>

      {/* Average Cap Rate */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Cap Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPercentage(averageCapRate)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Net operating income
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
            <Calculator className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvestmentStats;
