import { FileText } from "lucide-react";

const LeaseManagementHeader = ({ title, description }) => {
  return (
    <div className="flex flex-col justify-between mb-6 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <FileText className="w-7 h-7 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LeaseManagementHeader;
