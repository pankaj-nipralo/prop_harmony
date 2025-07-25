import { Card } from "@/components/ui/card";
import DirhamSvg from "@/assets/Dirham";

const SummaryCards = ({ summaryStats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
      <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <div>
          <span className="text-sm text-gray-500">Total Collected</span>
          <span className="block text-2xl font-bold text-green-600">
            <DirhamSvg size={18} className="mb-1" />{" "}
            {summaryStats.totalCollected.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">
            {summaryStats.collectionRate}% collection rate
          </span>
        </div>
      </Card>
      <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <div>
          <span className="text-sm text-gray-500">Pending</span>
          <span className="block text-2xl font-bold text-yellow-600">
            <DirhamSvg size={18} className="mb-1" />{" "}
            {summaryStats.totalPending.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">
            {summaryStats.pendingCount} units
          </span>
        </div>
      </Card>
      <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <div>
          <span className="text-sm text-gray-500">Overdue</span>
          <span className="block text-2xl font-bold text-red-600">
            <DirhamSvg size={18} className="mb-1" />{" "}
            {summaryStats.totalOverdue.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">
            {summaryStats.overdueCount} units
          </span>
        </div>
      </Card>
      <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <div>
          <span className="text-sm text-gray-500">Total Expected</span>
          <span className="block text-2xl font-bold text-blue-600">
            <DirhamSvg size={18} className="mb-1" />{" "}
            {summaryStats.totalExpected.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">This month</span>
        </div>
      </Card>
    </div>
  );
};

export default SummaryCards;