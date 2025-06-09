import { Card } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  Calendar,
  Building
} from "lucide-react";

const BookkeepingStats = ({ transactions }) => {
  // Calculate statistics
  const totalIncome = transactions.reduce(
    (acc, group) => acc + group.transactionsList
      .filter(t => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0),
    0
  );

  const totalExpenses = transactions.reduce(
    (acc, group) => acc + group.transactionsList
      .filter(t => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0),
    0
  );

  const netProfit = totalIncome - totalExpenses;

  const totalTransactions = transactions.reduce(
    (acc, group) => acc + group.transactionsList.length,
    0
  );

  // Calculate this month's transactions (assuming current month)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthTransactions = transactions.reduce(
    (acc, group) => acc + group.transactionsList.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    }).length,
    0
  );

  // Get unique properties count
  const uniqueProperties = new Set();
  transactions.forEach(group => {
    group.transactionsList.forEach(t => {
      uniqueProperties.add(t.propertyName);
    });
  });

  const bookkeepingStats = [
    {
      id: 1,
      label: "Total Income",
      value: `AED ${totalIncome.toLocaleString()}`,
      subtitle: "All time revenue",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: 2,
      label: "Total Expenses",
      value: `AED ${totalExpenses.toLocaleString()}`,
      subtitle: "All time costs",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      id: 3,
      label: "Net Profit", 
      value: `AED ${netProfit.toLocaleString()}`,
      subtitle: "Income - Expenses",
      icon: DollarSign,
      color: netProfit >= 0 ? "text-green-600" : "text-red-600",
      bgColor: netProfit >= 0 ? "bg-green-50" : "bg-red-50",
      borderColor: netProfit >= 0 ? "border-green-200" : "border-red-200",
    },
    // {
    //   id: 4,
    //   label: "Total Transactions",
    //   value: totalTransactions,
    //   subtitle: "All records",
    //   icon: PieChart,
    //   color: "text-blue-600",
    //   bgColor: "bg-blue-50",
    //   borderColor: "border-blue-200",
    // },
    // {
    //   id: 5,
    //   label: "This Month",
    //   value: thisMonthTransactions,
    //   subtitle: "Current month",
    //   icon: Calendar,
    //   color: "text-purple-600",
    //   bgColor: "bg-purple-50",
    //   borderColor: "border-purple-200",
    // },
    // {
    //   id: 6,
    //   label: "Properties",
    //   value: uniqueProperties.size,
    //   subtitle: "Active properties",
    //   icon: Building,
    //   color: "text-orange-600",
    //   bgColor: "bg-orange-50",
    //   borderColor: "border-orange-200",
    // },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {bookkeepingStats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={stat.id}
            className={cn(
              "p-6 transition-all duration-300 border-0 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1",
              stat.bgColor,
              stat.borderColor,
              // "border-l-4"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className={cn("w-6 h-6", stat.color)} />
                  <h3 className={cn("text-3xl font-bold", stat.color)}>
                    {stat.value}
                  </h3>
                </div>
                <p className="mb-1 text-sm font-semibold text-gray-800">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-600">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default BookkeepingStats;
