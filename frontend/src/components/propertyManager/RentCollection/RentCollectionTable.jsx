import { Card } from "@/components/ui/card";
import DirhamSvg from "@/assets/Dirham";

const statusColors = {
  collected: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  overdue: "bg-red-100 text-red-700",
};

const RentCollectionTable = ({ filteredTableData }) => {
  return (
    <Card className="p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Property Collection Details
      </h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="px-4 py-3 font-medium text-left">Landlord</th>
              <th className="px-4 py-3 font-medium text-left">Property</th>
              <th className="px-4 py-3 font-medium text-left">Unit</th>
              <th className="px-4 py-3 font-medium text-left">Tenant</th>
              <th className="px-4 py-3 font-medium text-left">Rent Amount</th>
              <th className="px-4 py-3 font-medium text-left">Due Date</th>
              <th className="px-4 py-3 font-medium text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTableData.map((row, idx) => (
              <tr
                key={idx}
                className="transition-colors hover:bg-gray-50/80"
              >
                <td className="px-4 py-3 text-gray-800">{row.landlord}</td>
                <td className="px-4 py-3 text-gray-800">{row.property}</td>
                <td className="px-4 py-3 text-gray-800">{row.unit}</td>
                <td className="px-4 py-3 text-gray-800">{row.tenant}</td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  <div className="flex items-center">
                    <DirhamSvg size={14} className="mr-1" />
                    {row.amount}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-800">{row.due}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[row.status]
                    }`}
                  >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RentCollectionTable;