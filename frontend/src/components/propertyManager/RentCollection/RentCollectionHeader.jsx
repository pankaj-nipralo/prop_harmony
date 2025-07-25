import { HandCoins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const RentCollectionHeader = ({ 
  selectedLandlord, 
  setSelectedLandlord, 
  uniqueLandlords 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <HandCoins className="w-6 h-6 text-blue-500" />
        <h1 className="text-3xl font-semibold text-gray-900">
          Rent Collection
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <select
          className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-200"
          value={selectedLandlord}
          onChange={(e) => setSelectedLandlord(e.target.value)}
        >
          <option value="all">All Landlords</option>
          {uniqueLandlords.map((landlord) => (
            <option key={landlord} value={landlord}>
              {landlord}
            </option>
          ))}
        </select>
        <Button className="flex items-center gap-2 text-white bg-blue-500 myButton hover:bg-blue-600">
          <FileDown className="w-4 h-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default RentCollectionHeader;