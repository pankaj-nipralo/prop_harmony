import { Card } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";
import { 
  ClipboardList, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  DollarSign,
  Wrench
} from "lucide-react";

const MaintenanceStats = ({ maintenance }) => {
  // Calculate statistics
  const totalRequests = maintenance.reduce(
    (acc, group) => acc + group.maintenanceList.length,
    0
  );

  const openRequests = maintenance.reduce(
    (acc, group) =>
      acc + group.maintenanceList.filter((m) => m.status === "Open").length,
    0
  );

  const inProgress = maintenance.reduce(
    (acc, group) =>
      acc + group.maintenanceList.filter((m) => m.status === "In Progress").length,
    0
  );

  const completed = maintenance.reduce(
    (acc, group) =>
      acc + group.maintenanceList.filter((m) => m.status === "Completed").length,
    0
  );

  const pending = maintenance.reduce(
    (acc, group) =>
      acc + group.maintenanceList.filter((m) => m.status === "Pending").length,
    0
  );

  // Calculate total cost from completed requests
  const totalCost = maintenance.reduce(
    (acc, group) =>
      acc + group.maintenanceList
        .filter((m) => m.status === "Completed" && m.actualCost)
        .reduce((sum, m) => {
          const cost = parseFloat(m.actualCost.replace(/[^\d.]/g, '')) || 0;
          return sum + cost;
        }, 0),
    0
  );

  const maintenanceStats = [
    {
      id: 1,
      label: "Total Requests",
      value: totalRequests,
      subtitle: "All time",
      icon: ClipboardList,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      id: 2,
      label: "Open",
      value: openRequests,
      subtitle: "Need attention",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      id: 3,
      label: "In Progress", 
      value: inProgress,
      subtitle: "Currently active",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 4,
      label: "Completed",
      value: completed,
      subtitle: "This month",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: 5,
      label: "Pending",
      value: pending,
      subtitle: "Awaiting assignment",
      icon: Wrench,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      id: 6,
      label: "Total Cost",
      value: `AED ${totalCost.toLocaleString()}`,
      subtitle: "Completed work",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {maintenanceStats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={stat.id}
            className={cn(
              "p-6 transition-all duration-300 border-0 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1",
              stat.bgColor,
              stat.borderColor, 
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

export default MaintenanceStats;
