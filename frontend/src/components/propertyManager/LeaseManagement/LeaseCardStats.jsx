import { Card } from "@/components/ui/card";
import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const LeaseCardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
      <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FileText className="w-4 h-4 text-green-500" /> Total Active Leases
          </span>
          <span className="text-3xl font-bold text-green-600">
            {stats.active}
          </span>
          <span className="text-xs text-gray-500">Across all properties</span>
        </div>
      </Card>
      <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 text-yellow-500" /> Expiring Soon
          </span>
          <span className="text-3xl font-bold text-yellow-600">
            {stats.expiring}
          </span>
          <span className="text-xs text-gray-500">Within 30 days</span>
        </div>
      </Card>
      <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <AlertTriangle className="w-4 h-4 text-red-500" /> Expired
          </span>
          <span className="text-3xl font-bold text-red-600">{stats.expired}</span>
          <span className="text-xs text-gray-500">Require action</span>
        </div>
      </Card>
      <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <CheckCircle className="w-4 h-4 text-blue-500" /> Renewals Pending
          </span>
          <span className="text-3xl font-bold text-blue-600">
            {stats.pending}
          </span>
          <span className="text-xs text-gray-500">In progress</span>
        </div>
      </Card>
    </div>
  );
};

export default LeaseCardStats;