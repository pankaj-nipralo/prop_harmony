import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Edit, Trash2 } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";
import StatusBadge from "./StatusBadge";

// const statusColors = {
//   active: "bg-green-100 text-green-700",
//   inactive: "bg-gray-100 text-gray-700",
// };

const ContractorsTable = ({ contractors, onEdit, onDelete }) => {
  return (
    <Card className="overflow-hidden border-0">
      <div className="">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="sticky top-0 z-10 bg-white shadow-sm">
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                Contractor
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                Contact
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                Specialties
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                Rate/Hour
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contractors.map((c, idx) => (
              <tr
                key={c.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition-colors duration-150`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.company}</div>
                  <div className="text-xs text-gray-400">
                    {c.jobsCompleted} jobs
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate max-w-[150px]">
                      {c.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{c.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {c.specialties.length === 0 ? (
                      <span className="text-xs text-gray-500">
                        No specialties listed
                      </span>
                    ) : (
                      c.specialties.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs"
                        >
                          {s}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <DirhamSvg size={12} color1="" className="mb-1 mr-1" />{" "}
                  {c.rate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(c)}
                      className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(c)}
                      className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ContractorsTable;