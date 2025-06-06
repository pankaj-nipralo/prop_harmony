import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Search,
  Filter,
  ChevronDown,
  Calculator,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Percent,
  Calendar,
} from "lucide-react";
import { calculateInvestmentMetrics } from "@/data/landlord/investment/data";
import InvestmentCalculatorModal from "./InvestmentCalculatorModal";
import InvestmentComparison from "./InvestmentComparison";

const InvestmentBody = ({
  calculations,
  setCalculations,
  filters,
  setFilters,
}) => {
  const [search, setSearch] = useState(filters?.search || "");
  const [propertyFilter, setPropertyFilter] = useState(
    filters?.propertyFilter || "All Properties"
  );
  const [activeTab, setActiveTab] = useState("calculations");
  const [viewModal, setViewModal] = useState({
    open: false,
    calculation: null,
  });
  const [editModal, setEditModal] = useState({
    open: false,
    calculation: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    calculation: null,
  });

  if (
    !calculations ||
    !Array.isArray(calculations) ||
    calculations.length === 0
  ) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center border-0 shadow-sm">
          <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No investment calculations found.</p>
        </Card>
      </div>
    );
  }

  // Flatten all calculations
  const allCalculations = calculations.flatMap(
    (group) => group.calculationsList
  );

  // Get unique properties for filter
  const uniqueProperties = [
    ...new Set(allCalculations.map((calc) => calc.propertyName)),
  ];

  // Apply filters
  const filteredCalculations = allCalculations.filter((calculation) => {
    const propertyMatch =
      propertyFilter === "All Properties" ||
      calculation.propertyName === propertyFilter;
    return propertyMatch;
  });

  // Search calculations
  const displayedCalculations = filteredCalculations.filter((calculation) => {
    const q = search.toLowerCase();
    return (
      calculation.name.toLowerCase().includes(q) ||
      calculation.propertyName.toLowerCase().includes(q) ||
      (calculation.propertyAddress &&
        calculation.propertyAddress.toLowerCase().includes(q))
    );
  });

  const formatCurrency = (amount) => {
    return `AED ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
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

  // Handler functions
  const handleViewCalculation = (calculation) => {
    setViewModal({ open: true, calculation });
  };

  const handleEditCalculation = (calculation) => {
    setEditModal({ open: true, calculation });
  };

  const handleDeleteCalculation = (calculation) => {
    setDeleteModal({ open: true, calculation });
  };

  const handleUpdateCalculation = (updatedCalculation) => {
    setCalculations((prev) =>
      prev.map((group) => ({
        ...group,
        calculationsList: group.calculationsList.map((calculation) =>
          calculation.id === updatedCalculation.id
            ? updatedCalculation
            : calculation
        ),
      }))
    );
    setEditModal({ open: false, calculation: null });
  };

  const handleConfirmDelete = (calculationToDelete) => {
    setCalculations((prev) =>
      prev.map((group) => ({
        ...group,
        calculationsList: group.calculationsList.filter(
          (calculation) => calculation.id !== calculationToDelete.id
        ),
      }))
    );
    setDeleteModal({ open: false, calculation: null });
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab("calculations")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "calculations"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Calculations
          </button>
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "comparison"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Comparison
          </button>
        </div>
      </div>

      {activeTab === "comparison" ? (
        <InvestmentComparison calculations={calculations} />
      ) : (
        <>
          {/* Search and Filter Section */}
          <Card className="p-4 border-0 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center flex-1 gap-2">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search calculations..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (setFilters) {
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }));
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <div className="relative">
                  <select
                    value={propertyFilter}
                    onChange={(e) => {
                      setPropertyFilter(e.target.value);
                      if (setFilters) {
                        setFilters((prev) => ({
                          ...prev,
                          propertyFilter: e.target.value,
                        }));
                      }
                    }}
                    className="px-3 py-2 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All Properties">All Properties</option>
                    {uniqueProperties.map((property) => (
                      <option key={property} value={property}>
                        {property}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
                </div>
              </div>
            </div>
          </Card>

          {/* Calculations Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Investment Calculations
            </h2>

            {displayedCalculations.length === 0 ? (
              <Card className="p-8 text-center border-0 shadow-sm">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No calculations found.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedCalculations.map((calculation) => {
                  const metrics = calculateInvestmentMetrics(calculation);

                  return (
                    <Card
                      key={calculation.id}
                      className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {calculation.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {calculation.propertyName}
                            </p>
                            {calculation.propertyAddress && (
                              <p className="text-xs text-gray-500 mt-1">
                                {calculation.propertyAddress}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              onClick={() => handleViewCalculation(calculation)}
                              className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleEditCalculation(calculation)}
                              className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50"
                              title="Edit Calculation"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteCalculation(calculation)
                              }
                              className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-red-600 hover:bg-red-50"
                              title="Delete Calculation"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <DollarSign className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                            <p className="text-xs text-gray-600">
                              Monthly Cash Flow
                            </p>
                            <p
                              className={`text-sm font-bold ${getCashFlowColor(
                                metrics.monthlyCashFlow
                              )}`}
                            >
                              {metrics.monthlyCashFlow >= 0 ? "+" : ""}
                              {formatCurrency(metrics.monthlyCashFlow)}
                            </p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Percent className="w-5 h-5 mx-auto mb-1 text-green-600" />
                            <p className="text-xs text-gray-600">Total ROI</p>
                            <p
                              className={`text-sm font-bold ${getROIColor(
                                metrics.totalROI
                              )}`}
                            >
                              {formatPercentage(metrics.totalROI)}
                            </p>
                          </div>
                        </div>

                        {/* Investment Summary */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Purchase Price:
                            </span>
                            <span className="font-medium">
                              {formatCurrency(calculation.purchasePrice)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Total Investment:
                            </span>
                            <span className="font-medium">
                              {formatCurrency(metrics.totalInvestment)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cap Rate:</span>
                            <span className="font-medium">
                              {formatPercentage(metrics.capRate)}
                            </span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={12} />
                            <span>Updated {calculation.lastUpdated}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {calculation.createdBy}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* View Modal */}
      <InvestmentCalculatorModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, calculation: null })}
        calculation={viewModal.calculation}
        onSaveCalculation={() => {}} // Read-only mode
      />

      {/* Edit Modal */}
      <InvestmentCalculatorModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, calculation: null })}
        calculation={editModal.calculation}
        onSaveCalculation={handleUpdateCalculation}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={() => setDeleteModal({ open: false, calculation: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Delete Calculation
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the calculation "
              <strong>{deleteModal.calculation?.name}</strong>"? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  setDeleteModal({ open: false, calculation: null })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(deleteModal.calculation)}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvestmentBody;
