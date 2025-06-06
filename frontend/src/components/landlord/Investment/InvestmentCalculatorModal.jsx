import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Calculator,
  DollarSign,
  Home,
  Percent,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  defaultCalculation,
  calculateInvestmentMetrics,
  assessInvestment,
  generateAmortizationSchedule,
} from "@/data/landlord/investment/data";
import InvestmentCharts from "./InvestmentCharts";

const InvestmentCalculatorModal = ({
  open,
  onClose,
  onSaveCalculation,
  calculation = null,
}) => {
  const [form, setForm] = useState(defaultCalculation);
  const [activeTab, setActiveTab] = useState("inputs");
  const [metrics, setMetrics] = useState(null);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    if (calculation) {
      setForm(calculation);
    } else {
      setForm(defaultCalculation);
    }
  }, [calculation, open]);

  useEffect(() => {
    // Calculate metrics whenever form changes
    if (form.purchasePrice > 0) {
      const calculatedMetrics = calculateInvestmentMetrics(form);
      setMetrics(calculatedMetrics);
      setAssessments(assessInvestment(form));
    }
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = [
      "purchasePrice",
      "downPayment",
      "closingCosts",
      "renovationCosts",
      "monthlyRent",
      "monthlyExpenses",
      "propertyTaxRate",
      "annualInsurance",
      "interestRate",
      "loanTerm",
      "managementFee",
      "maintenanceReserve",
      "vacancyRate",
      "appreciationRate",
    ].includes(name)
      ? parseFloat(value) || 0
      : value;

    setForm((prev) => {
      const updated = { ...prev, [name]: numericValue };

      // Auto-calculate down payment amount
      if (name === "purchasePrice" || name === "downPayment") {
        updated.downPaymentAmount =
          (updated.purchasePrice * updated.downPayment) / 100;
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name.trim()) {
      alert("Please enter a calculation name");
      return;
    }

    if (!form.propertyName.trim()) {
      alert("Please enter a property name");
      return;
    }

    if (form.purchasePrice <= 0) {
      alert("Please enter a valid purchase price");
      return;
    }

    if (form.downPayment <= 0 || form.downPayment > 100) {
      alert("Please enter a valid down payment percentage (1-100)");
      return;
    }

    const newCalculation = {
      ...form,
      id: calculation?.id || Date.now(),
      createdBy: "Property Manager",
      createdDate:
        calculation?.createdDate || new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      tags: [
        form.propertyName.toLowerCase().replace(/\s+/g, "-"),
        "investment",
      ],
    };

    onSaveCalculation(newCalculation);
    setForm(defaultCalculation);
    onClose();
  };

  const formatCurrency = (amount) => {
    return `AED ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const formatPercentage = (percentage) => {
    return `${percentage.toFixed(2)}%`;
  };

  const getAssessmentColor = (type) => {
    switch (type) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "poor":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "caution":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full overflow-y-auto bg-white border-0 rounded-lg shadow-xl max-h-[90vh] md:max-w-6xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {calculation
                ? "Edit Investment Calculation"
                : "New Investment Calculation"}
            </h2> 
          </div>

          {/* Tab Navigation */}
          <div className="flex p-1 mb-6 bg-gray-100 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("inputs")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "inputs"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Investment Inputs
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "results"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Analysis Results
            </button>
            <button
              onClick={() => setActiveTab("charts")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "charts"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Charts & Visuals
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "schedule"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Loan Schedule
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "inputs" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Basic Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Calculation Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g., Marina View Villa Investment"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Property Name *
                    </label>
                    <input
                      name="propertyName"
                      value={form.propertyName}
                      onChange={handleChange}
                      placeholder="Property name"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Property Address
                    </label>
                    <input
                      name="propertyAddress"
                      value={form.propertyAddress}
                      onChange={handleChange}
                      placeholder="Full property address"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Property Details */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Property Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Purchase Price (AED) *
                    </label>
                    <input
                      name="purchasePrice"
                      type="number"
                      step="1000"
                      value={form.purchasePrice}
                      onChange={handleChange}
                      placeholder="1500000"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Down Payment (%) *
                    </label>
                    <input
                      name="downPayment"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={form.downPayment}
                      onChange={handleChange}
                      placeholder="20"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Closing Costs (AED)
                    </label>
                    <input
                      name="closingCosts"
                      type="number"
                      step="1000"
                      value={form.closingCosts}
                      onChange={handleChange}
                      placeholder="45000"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Renovation Costs (AED)
                    </label>
                    <input
                      name="renovationCosts"
                      type="number"
                      step="1000"
                      value={form.renovationCosts}
                      onChange={handleChange}
                      placeholder="50000"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Income & Expenses */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Income & Expenses
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Monthly Rent (AED) *
                    </label>
                    <input
                      name="monthlyRent"
                      type="number"
                      step="100"
                      value={form.monthlyRent}
                      onChange={handleChange}
                      placeholder="8000"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Monthly Expenses (AED)
                    </label>
                    <input
                      name="monthlyExpenses"
                      type="number"
                      step="100"
                      value={form.monthlyExpenses}
                      onChange={handleChange}
                      placeholder="1500"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Property Tax Rate (%)
                    </label>
                    <input
                      name="propertyTaxRate"
                      type="number"
                      step="0.1"
                      value={form.propertyTaxRate}
                      onChange={handleChange}
                      placeholder="0.8"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Annual Insurance (AED)
                    </label>
                    <input
                      name="annualInsurance"
                      type="number"
                      step="100"
                      value={form.annualInsurance}
                      onChange={handleChange}
                      placeholder="5000"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Loan Terms */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Percent className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Loan Terms
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Interest Rate (%)
                    </label>
                    <input
                      name="interestRate"
                      type="number"
                      step="0.1"
                      value={form.interestRate}
                      onChange={handleChange}
                      placeholder="4.5"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Loan Term (Years)
                    </label>
                    <input
                      name="loanTerm"
                      type="number"
                      min="1"
                      max="50"
                      value={form.loanTerm}
                      onChange={handleChange}
                      placeholder="25"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Assumptions */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Assumptions
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Management Fee (%)
                    </label>
                    <input
                      name="managementFee"
                      type="number"
                      step="0.1"
                      value={form.managementFee}
                      onChange={handleChange}
                      placeholder="8"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Maintenance Reserve (%)
                    </label>
                    <input
                      name="maintenanceReserve"
                      type="number"
                      step="0.1"
                      value={form.maintenanceReserve}
                      onChange={handleChange}
                      placeholder="5"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Vacancy Rate (%)
                    </label>
                    <input
                      name="vacancyRate"
                      type="number"
                      step="0.1"
                      value={form.vacancyRate}
                      onChange={handleChange}
                      placeholder="5"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Annual Appreciation (%)
                    </label>
                    <input
                      name="appreciationRate"
                      type="number"
                      step="0.1"
                      value={form.appreciationRate}
                      onChange={handleChange}
                      placeholder="3"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Additional notes about this investment calculation"
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </Card>

              {/* Form Actions */}
              <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                >
                  {calculation ? "Update Calculation" : "Save Calculation"}
                </button>
              </div>
            </form>
          )}

          {/* Results Tab */}
          {activeTab === "results" && metrics && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Monthly Cash Flow</p>
                    <p
                      className={`text-xl font-bold ${
                        metrics.monthlyCashFlow >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {metrics.monthlyCashFlow >= 0 ? "+" : ""}
                      {formatCurrency(metrics.monthlyCashFlow)}
                    </p>
                  </div>
                </Card>
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <Percent className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-sm text-gray-600">Cash-on-Cash Return</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatPercentage(metrics.cashOnCashReturn)}
                    </p>
                  </div>
                </Card>
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm text-gray-600">Total ROI</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatPercentage(metrics.totalROI)}
                    </p>
                  </div>
                </Card>
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <p className="text-sm text-gray-600">Break Even</p>
                    <p className="text-xl font-bold text-gray-900">
                      {Math.round(metrics.breakEvenMonths)} mo
                    </p>
                  </div>
                </Card>
              </div>

              {/* Investment Summary */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Investment Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purchase Price:</span>
                      <span className="font-medium">
                        {formatCurrency(form.purchasePrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment:</span>
                      <span className="font-medium">
                        {formatCurrency(form.downPaymentAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Closing Costs:</span>
                      <span className="font-medium">
                        {formatCurrency(form.closingCosts)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Renovation Costs:</span>
                      <span className="font-medium">
                        {formatCurrency(form.renovationCosts)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="font-semibold text-gray-800">
                        Total Investment:
                      </span>
                      <span className="font-bold text-blue-600">
                        {formatCurrency(metrics.totalInvestment)}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Income Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Annual Rent (Effective):
                      </span>
                      <span className="font-medium">
                        {formatCurrency(metrics.effectiveAnnualRent)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Expenses:</span>
                      <span className="font-medium">
                        {formatCurrency(metrics.annualExpenses)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Annual Mortgage Payments:
                      </span>
                      <span className="font-medium">
                        {formatCurrency(metrics.annualMortgagePayments)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Net Operating Income:
                      </span>
                      <span className="font-medium">
                        {formatCurrency(metrics.netOperatingIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="font-semibold text-gray-800">
                        Annual Cash Flow:
                      </span>
                      <span
                        className={`font-bold ${
                          metrics.annualCashFlow >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {metrics.annualCashFlow >= 0 ? "+" : ""}
                        {formatCurrency(metrics.annualCashFlow)}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Financial Ratios */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Financial Ratios
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm text-gray-600">Cap Rate:</p>
                    <p className="text-lg font-semibold">
                      {formatPercentage(metrics.capRate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Cash-on-Cash Return:
                    </p>
                    <p className="text-lg font-semibold">
                      {formatPercentage(metrics.cashOnCashReturn)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Total ROI (with appreciation):
                    </p>
                    <p className="text-lg font-semibold">
                      {formatPercentage(metrics.totalROI)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Gross Rent Multiplier:
                    </p>
                    <p className="text-lg font-semibold">
                      {metrics.grossRentMultiplier.toFixed(1)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Investment Assessment */}
              {assessments.length > 0 && (
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Investment Assessment
                  </h3>
                  <div className="space-y-3">
                    {assessments.map((assessment, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${getAssessmentColor(
                          assessment.type
                        )}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {assessment.title}
                            </h4>
                            <p className="mt-1 text-sm">{assessment.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Charts Tab */}
          {activeTab === "charts" && form.purchasePrice > 0 && (
            <InvestmentCharts
              calculations={[{ id: 1, calculationsList: [form] }]}
              selectedCalculation={form}
            />
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && metrics && (
            <div className="space-y-6">
              {/* Loan Summary */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Loan Amount</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(metrics.loanAmount)}
                    </p>
                  </div>
                </Card>
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(metrics.monthlyMortgagePayment)}
                    </p>
                  </div>
                </Card>
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Payments</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(
                        metrics.monthlyMortgagePayment * form.loanTerm * 12
                      )}
                    </p>
                  </div>
                </Card>
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-xl font-bold text-red-600">
                      {formatCurrency(
                        metrics.monthlyMortgagePayment * form.loanTerm * 12 -
                          metrics.loanAmount
                      )}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Amortization Schedule */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Loan Amortization Schedule (First 5 Years)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Period
                        </th>
                        <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Payment (AED)
                        </th>
                        <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Principal (AED)
                        </th>
                        <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Interest (AED)
                        </th>
                        <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Balance (AED)
                        </th>
                        <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Total Interest (AED)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {generateAmortizationSchedule(form, 5).map(
                        (row, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              {row.month <= 12
                                ? `Month ${row.month}`
                                : `Year ${Math.ceil(row.month / 12)}`}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                              {formatCurrency(row.payment)}
                            </td>
                            <td className="px-4 py-4 text-sm text-green-600 whitespace-nowrap">
                              {formatCurrency(row.principal)}
                            </td>
                            <td className="px-4 py-4 text-sm text-red-600 whitespace-nowrap">
                              {formatCurrency(row.interest)}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                              {formatCurrency(row.balance)}
                            </td>
                            <td className="px-4 py-4 text-sm text-red-600 whitespace-nowrap">
                              {formatCurrency(row.totalInterest)}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  * This table shows the first 12 months and then yearly
                  summaries. Over the {form.loanTerm}-year term, you'll pay a
                  total of{" "}
                  {formatCurrency(
                    metrics.monthlyMortgagePayment * form.loanTerm * 12 -
                      metrics.loanAmount
                  )}{" "}
                  in interest.
                </p>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentCalculatorModal;
