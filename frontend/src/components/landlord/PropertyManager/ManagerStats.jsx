import { Card } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";

const ManagerStats = ({ managers }) => {
  // Calculate total managers
  const totalManagers = managers.reduce(
    (acc, group) => acc + group.managersList.length,
    0
  );

  // Calculate active managers
  const activeManagers = managers.reduce(
    (acc, group) =>
      acc + group.managersList.filter((m) => m.status === "Active").length,
    0
  );

  // Calculate total properties managed
  const propertiesManaged = managers.reduce(
    (acc, group) =>
      acc +
      group.managersList.reduce(
        (sum, m) => sum + (m.propertiesManaged || 0),
        0
      ),
    0
  );

  // Calculate emirates covered (unique emirates)
  const emiratesSet = new Set();
  managers.forEach((group) => {
    group.managersList.forEach((manager) => {
      if (manager.AssignedTo) {
        emiratesSet.add(manager.AssignedTo);
      }
    });
  });
  const emiratesCovered = emiratesSet.size;

  const managerStat = [
    {
      id: 1,
      label: "Total Managers",
      value: totalManagers,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Active Managers",
      value: activeManagers,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      label: "Properties Managed",
      value: propertiesManaged,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      label: "Emirates Covered",
      value: emiratesCovered,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <Card className="w-full my-4 border-0 shadow-none">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {managerStat.map((card) => (
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

export default ManagerStats;
