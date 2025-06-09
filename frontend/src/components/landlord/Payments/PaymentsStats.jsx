import React from "react";
import { Card } from "@/components/ui/card";
import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  PieChart,
  Calendar,
  Target,
} from "lucide-react";
import { formatCurrency } from "@/data/landlord/payments/data";

const PaymentsStats = ({ stats = {}, isLoading }) => {
  // Provide default values for all stats properties to prevent undefined errors
  const safeStats = {
    paidAmount: 0,
    paidCount: 0,
    pendingAmount: 0,
    pendingCount: 0,
    overdueAmount: 0,
    overdueCount: 0,
    collectionRate: 0,
    averagePayment: 0,
    totalAmount: 0,
    totalPayments: 0,
    ...stats, // Override defaults with actual stats if provided
  };

  const statCards = [
    {
      title: "Total Collected",
      value: formatCurrency(safeStats.paidAmount ?? 0),
      subtitle: `${safeStats.paidCount ?? 0} payments`,
      icon: DollarSign,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Pending Payments",
      value: formatCurrency(safeStats.pendingAmount ?? 0),
      subtitle: `${safeStats.pendingCount ?? 0} pending`,
      icon: Clock,
      color: "yellow",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      trend: "-5.2%",
      trendUp: false,
    },
    {
      title: "Overdue Amount",
      value: formatCurrency(safeStats.overdueAmount ?? 0),
      subtitle: `${safeStats.overdueCount ?? 0} overdue`,
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      trend: "+8.1%",
      trendUp: true,
    },
    {
      title: "Collection Rate",
      value: `${(safeStats.collectionRate ?? 0).toFixed(1)}%`,
      subtitle: "This month",
      icon: Target,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+3.2%",
      trendUp: true,
    },
  ];

  const additionalStats = [
    {
      title: "Average Payment",
      value: formatCurrency(safeStats.averagePayment ?? 0),
      icon: PieChart,
      color: "purple",
    },
    {
      title: "Total Payments",
      value: (safeStats.totalPayments ?? 0).toString(),
      icon: CheckCircle,
      color: "indigo",
    },
    {
      title: "This Month",
      value: formatCurrency(safeStats.totalAmount ?? 0),
      icon: Calendar,
      color: "teal",
    },
    {
      title: "Growth Rate",
      value: "+15.3%",
      icon: TrendingUp,
      color: "emerald",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6 border-0 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-6 bg-gray-200 rounded"></div>
                <div className="w-12 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="p-6 transition-all duration-200 bg-white border-0 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  {stat.trend && (
                    <span
                      className={`text-xs font-medium ${
                        stat.trendUp ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trend}
                    </span>
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Stats */}
      <Card className="p-6 bg-white border-0">
        <div className="flex items-center justify-between mb-4 ">
          <h3 className="text-lg font-semibold text-gray-900">
            Payment Overview
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View Details
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {additionalStats.map((stat, index) => {
            const getStatColors = (color) => {
              const colorMap = {
                purple: { bg: "bg-purple-50", text: "text-purple-600" },
                indigo: { bg: "bg-indigo-50", text: "text-indigo-600" },
                teal: { bg: "bg-teal-50", text: "text-teal-600" },
                emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
              };
              return (
                colorMap[color] || { bg: "bg-gray-50", text: "text-gray-600" }
              );
            };

            const colors = getStatColors(stat.color);

            return (
              <div key={index} className="text-center">
                <div className={`inline-flex p-2 rounded-lg ${colors.bg} mb-2`}>
                  <stat.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Payment Status Distribution */}
      <Card className="p-6 border-0">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Payment Status Distribution
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Paid Payments</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-900">
                {safeStats.paidCount ?? 0}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                (
                {(safeStats.totalPayments ?? 0) > 0
                  ? (
                      ((safeStats.paidCount ?? 0) /
                        (safeStats.totalPayments ?? 1)) *
                      100
                    ).toFixed(1)
                  : 0}
                %)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pending Payments</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-900">
                {safeStats.pendingCount ?? 0}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                (
                {(safeStats.totalPayments ?? 0) > 0
                  ? (
                      ((safeStats.pendingCount ?? 0) /
                        (safeStats.totalPayments ?? 1)) *
                      100
                    ).toFixed(1)
                  : 0}
                %)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Overdue Payments</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-900">
                {safeStats.overdueCount ?? 0}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                (
                {(safeStats.totalPayments ?? 0) > 0
                  ? (
                      ((safeStats.overdueCount ?? 0) /
                        (safeStats.totalPayments ?? 1)) *
                      100
                    ).toFixed(1)
                  : 0}
                %)
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex h-2 overflow-hidden bg-gray-200 rounded-full">
            <div
              className="transition-all duration-300 bg-green-500"
              style={{
                width: `${
                  (safeStats.totalPayments ?? 0) > 0
                    ? ((safeStats.paidCount ?? 0) /
                        (safeStats.totalPayments ?? 1)) *
                      100
                    : 0
                }%`,
              }}
            ></div>
            <div
              className="transition-all duration-300 bg-yellow-500"
              style={{
                width: `${
                  (safeStats.totalPayments ?? 0) > 0
                    ? ((safeStats.pendingCount ?? 0) /
                        (safeStats.totalPayments ?? 1)) *
                      100
                    : 0
                }%`,
              }}
            ></div>
            <div
              className="transition-all duration-300 bg-red-500"
              style={{
                width: `${
                  (safeStats.totalPayments ?? 0) > 0
                    ? ((safeStats.overdueCount ?? 0) /
                        (safeStats.totalPayments ?? 1)) *
                      100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentsStats;
