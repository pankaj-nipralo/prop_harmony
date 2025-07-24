import { Card } from "@/components/ui/card";
import { Clock, ArrowUpDown, CheckCircle, XCircle } from "lucide-react";

const statusStats = [
  {
    label: "Pending",
    icon: Clock,
    color: "yellow",
    status: "pending"
  },
  {
    label: "Negotiating",
    icon: ArrowUpDown,
    color: "blue",
    status: "under_negotiation"
  },
  {
    label: "Agreed",
    icon: CheckCircle,
    color: "green",
    status: "agreed"
  },
  {
    label: "Declined",
    icon: XCircle,
    color: "red",
    status: "declined"
  },
];

const ApplicationsStats = ({ applications }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mt-7">
      {statusStats.map(({ label, icon: Icon, color, status }) => {
        const count = applications.filter((o) => o.status === status).length;
        
        return (
          <Card
            key={label}
            className="p-6 bg-white border-0 shadow-sm rounded-2xl transition-transform hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-${color}-100`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationsStats;