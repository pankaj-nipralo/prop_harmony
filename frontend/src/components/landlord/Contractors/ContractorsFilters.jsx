import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ContractorsFilters = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  specialtyFilter,
  onSpecialtyFilterChange,
  specialtiesList,
}) => {
  return (
    <Card className="p-4 mb-6 border-0 bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            type="text"
            placeholder="Search contractors..."
            className="py-2 pl-10 bg-gray-100 border-0 rounded-lg"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border-0 border-gray-200 rounded-md"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-md"
          value={specialtyFilter}
          onChange={(e) => onSpecialtyFilterChange(e.target.value)}
        >
          <option value="all">All Specialties</option>
          {specialtiesList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </Card>
  );
};

export default ContractorsFilters;