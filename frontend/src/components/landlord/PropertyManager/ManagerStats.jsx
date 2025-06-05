import { Card } from "@/components/ui/card";
import React from "react"; 
import { cn } from "@/lib/utils";

const ManagerStats = ({tenants}) => {
  const tenantStat = [
    {
      id: 1,
      label: "Total Tenants",
      value: tenants.reduce(
        (acc, tenant) => acc + tenant.tenantsList.length,
        0
      ),
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Active Tenants",
      value: tenants.reduce(
        (acc, tenant) =>
          acc + tenant.tenantsList.filter((t) => t.status === "active").length,
        0
      ),
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      label: "Notice Period Tenants",
      value: tenants.reduce(
        (acc, tenant) =>
          acc + tenant.tenantsList.filter((t) => t.noticePeriod > 0).length,
        0
      ),
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      id: 4,
      label: "Overdue Payments",
      value: tenants.reduce(
        (acc, tenant) =>
          acc +
          tenant.tenantsList
            .filter((t) => t.Overdue > 0)
            .reduce((sum, t) => sum + t.Overdue, 0),
        0
      ),
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <Card className="w-full my-4 border-0 shadow-none">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tenantStat.map((card) => (
          <Card
            key={card.id}
            className={cn(
              "gap-2 p-6 text-center transition-shadow duration-300 border-0 shadow-md hover:shadow-lg",
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

export default ManagerStats;