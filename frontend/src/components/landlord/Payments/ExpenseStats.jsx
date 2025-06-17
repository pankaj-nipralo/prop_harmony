import React from "react";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  PieChart,
  Calendar,
  Target,
  TrendingDown,
} from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const ExpenseStats = ({ stats = {}, isLoading }) => {
  const safeStats = {
    totalExpenses: 0,
    paidExpenses: 0,
    paidCount: 0,
    pendingExpenses: 0,
    pendingCount: 0,
    overdueExpenses: 0,
    overdueCount: 0,
    monthlyExpenses: 0,
    averageExpense: 0,
    paymentRate: 0,
    totalCount: 0,
    ...stats,
  };

  const statCards = [
    {
      title: "Total Paid",
      value: safeStats.paidExpenses,
      subtitle: `${safeStats.paidCount} expenses`,
      icon: CheckCircle,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      trend: "+5.2%",
      trendUp: true,
    },
    {
      title: "Pending Expenses",
      value: safeStats.pendingExpenses,
      subtitle: `${safeStats.pendingCount} pending`,
      icon: Clock,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "-2.1%",
      trendUp: false,
    },
    {
      title: "Overdue Amount",
      value: safeStats.overdueExpenses,
      subtitle: `${safeStats.overdueCount} overdue`,
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      trend: "+1.8%",
      trendUp: true,
    },
    {
      title: "Payment Rate",
      value: `${safeStats.paymentRate.toFixed(1)}%`,
      subtitle: "This month",
      icon: Target,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+3.2%",
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className="p-6 transition-all duration-200 hover:shadow-lg border-0 bg-white shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div className="flex items-center gap-1 text-sm">
              {stat.trendUp ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`font-medium ${
                  stat.trendUp ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-2xl font-bold text-gray-900">
              <DirhamSvg size={20} className="mr-1" />
              {stat.value.toLocaleString()}
            </div>
            <p className="text-sm font-medium text-gray-700">{stat.title}</p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExpenseStats;
