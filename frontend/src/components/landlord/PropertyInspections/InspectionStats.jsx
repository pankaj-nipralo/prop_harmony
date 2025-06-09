import { Card } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";
import { 
  ClipboardList, 
  Calendar, 
  CheckCircle, 
  FileText,
  Clock,
  AlertTriangle
} from "lucide-react";

const InspectionStats = ({ inspections }) => {
  // Calculate statistics
  const totalInspections = inspections.reduce(
    (acc, group) => acc + group.inspectionsList.length,
    0
  );

  const pendingRequests = inspections.reduce(
    (acc, group) =>
      acc + group.inspectionsList.filter((i) => i.status === "Pending").length,
    0
  );

  const scheduledInspections = inspections.reduce(
    (acc, group) =>
      acc + group.inspectionsList.filter((i) => i.status === "Scheduled").length,
    0
  );

  const completedReports = inspections.reduce(
    (acc, group) =>
      acc + group.inspectionsList.filter((i) => i.status === "Completed").length,
    0
  );

  const inProgress = inspections.reduce(
    (acc, group) =>
      acc + group.inspectionsList.filter((i) => i.status === "In Progress").length,
    0
  );

  const overdue = inspections.reduce(
    (acc, group) =>
      acc + group.inspectionsList.filter((i) => {
        if (i.status === "Scheduled" && i.scheduledDate) {
          const scheduledDate = new Date(i.scheduledDate);
          const today = new Date();
          return scheduledDate < today;
        }
        return false;
      }).length,
    0
  );

  const inspectionStats = [
    {
      id: 1,
      label: "Pending Requests",
      value: pendingRequests,
      subtitle: "Awaiting scheduling",
      icon: ClipboardList,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      id: 2,
      label: "Scheduled Inspections", 
      value: scheduledInspections,
      subtitle: "This month",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 3,
      label: "Completed Reports",
      value: completedReports,
      subtitle: "Total reports",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    // {
    //   id: 4,
    //   label: "In Progress",
    //   value: inProgress,
    //   subtitle: "Currently active",
    //   icon: Clock,
    //   color: "text-orange-600",
    //   bgColor: "bg-orange-50",
    //   borderColor: "border-orange-200",
    // },
    // {
    //   id: 5,
    //   label: "Overdue",
    //   value: overdue,
    //   subtitle: "Need attention",
    //   icon: AlertTriangle,
    //   color: "text-red-600",
    //   bgColor: "bg-red-50",
    //   borderColor: "border-red-200",
    // },
    // {
    //   id: 6,
    //   label: "Total Inspections",
    //   value: totalInspections,
    //   subtitle: "All time",
    //   icon: FileText,
    //   color: "text-purple-600",
    //   bgColor: "bg-purple-50",
    //   borderColor: "border-purple-200",
    // },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
      {inspectionStats.map((stat) => {
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

export default InspectionStats;
