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
} from "lucide-react";
// import { formatCurrency } from "@/data/landlord/expenses/data";
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
      icon: DirhamSvg,
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
      color: "yellow",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
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

  const renderIcon = (Icon) => {
    if (Icon === DirhamSvg) {
      return <Icon size={20} color1="" className="text-green-600" />;
    }
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className={`${stat.bgColor} border-none transition-all hover:shadow-md px-4 py-3`} // reduced padding
        >
          <div className="flex items-center justify-between">
            <div
              className={`p-1.5 rounded-md ${stat.bgColor} ${stat.iconColor}`}
            >
              {" "}
              {/* smaller icon container */}
              {renderIcon(stat.icon)}
            </div>
            <div
              className={`text-[10px] font-medium ${
                stat.trendUp
                  ? "text-green-600 bg-green-100"
                  : "text-red-600 bg-red-100"
              } px-2 py-0.5 rounded-full`}
            >
              {stat.trend}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-600">{stat.title}</h3>
            <div className="flex items-center gap-1 mt-1">
              {" "}
              {/* reduced gap and margin */}
              <DirhamSvg size={14} className={`text-${stat.color}-600`} />
              <span className={`text-lg font-semibold text-${stat.color}-600`}>
                {0.00000000001}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-gray-500">{stat.subtitle}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExpenseStats;
