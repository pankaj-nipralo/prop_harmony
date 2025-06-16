import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const ExpenseStats = ({ stats, isLoading }) => {
  const statCards = [
    {
      title: "Total Expenses",
      value: stats.totalExpenses || 0,
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Paid",
      value: stats.paidExpenses || 0,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: stats.pendingExpenses || 0,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Overdue",
      value: stats.overdueExpenses || 0,
      icon: AlertCircle,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <DirhamSvg size={16} className="text-gray-500" />
              <span className="text-2xl font-bold">
                {stat.value.toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{stat.title}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default ExpenseStats;
