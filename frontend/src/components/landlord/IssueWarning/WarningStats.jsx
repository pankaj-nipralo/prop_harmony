import { Card } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";

const WarningStats = ({ warnings }) => {
  // Calculate total warnings
  const totalWarnings = warnings.reduce(
    (acc, group) => acc + group.warningsList.length,
    0
  );

  // Calculate active warnings (Pending + Acknowledged + Escalated)
  const activeWarnings = warnings.reduce(
    (acc, group) =>
      acc + group.warningsList.filter((w) => 
        ["Pending", "Acknowledged", "Escalated"].includes(w.status)
      ).length,
    0
  );

  // Calculate resolved warnings
  const resolvedWarnings = warnings.reduce(
    (acc, group) =>
      acc + group.warningsList.filter((w) => w.status === "Resolved").length,
    0
  );

  // Calculate pending reviews (Acknowledged warnings)
  const pendingReviews = warnings.reduce(
    (acc, group) =>
      acc + group.warningsList.filter((w) => w.status === "Acknowledged").length,
    0
  );

  const warningStats = [
    {
      id: 1,
      label: "Total Warnings",
      value: totalWarnings,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Active Warnings", 
      value: activeWarnings,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: 3,
      label: "Resolved Warnings",
      value: resolvedWarnings,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 4,
      label: "Pending Reviews",
      value: pendingReviews,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <Card className="w-full my-4 border-0 shadow-none">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {warningStats.map((card) => (
          <Card
            key={card.id}
            className={cn(
              "gap-2 p-6 text-center bg-white transition-shadow duration-300 border-0 shadow-lg hover:shadow-xl",
              card.bgColor
            )}
          >
            <h2 className={cn("text-3xl font-bold mb-2", card.color)}>
              {card.value}
            </h2>
            <p className="text-sm font-medium text-gray-600">{card.label}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default WarningStats;
