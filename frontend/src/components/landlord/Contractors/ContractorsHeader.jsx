import { Button } from "@/components/ui/button";
import { UserCheck, Plus } from "lucide-react";

const ContractorsHeader = ({ onAddContractor }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <UserCheck className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contractors</h1>
          <p className="mt-1 text-gray-600">
            Manage contractors and their services
          </p>
        </div>
      </div>
      <Button 
        onClick={onAddContractor}
        className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 hover:shadow-xl"
      >
        <Plus size={20} />
        Add Contractor
      </Button>
    </header>
  );
};

export default ContractorsHeader;