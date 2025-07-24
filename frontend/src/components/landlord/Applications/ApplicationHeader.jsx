import { Users } from "lucide-react";

const ApplicationsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Rental Applications
          </h1>
          <p className="text-gray-600">
            Manage incoming rental applications and negotiations
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsHeader;