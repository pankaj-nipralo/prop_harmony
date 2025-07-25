import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const LeaseFilters = ({
  filterOptions,
  landlordOptions,
  filter,
  setFilter,
  landlordFilter,
  setLandlordFilter,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        <Input
          type="text"
          placeholder="Search leases..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <select
          className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={landlordFilter}
          onChange={(e) => setLandlordFilter(e.target.value)}
        >
          {landlordOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LeaseFilters;