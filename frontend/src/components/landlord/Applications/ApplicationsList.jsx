import { Card } from "@/components/ui/card";
import ApplicationCard from "./ApplicationsCard";
import { Users } from "lucide-react";

const ApplicationsList = ({ 
  applications, 
  onAccept, 
  onDecline, 
  onNegotiate, 
  onViewHistory, 
  onMessage 
}) => {
  return (
    <div className="mt-10 space-y-2">
      {applications.length === 0 ? (
        <EmptyApplications />
      ) : (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onAccept={onAccept}
            onDecline={onDecline}
            onNegotiate={onNegotiate}
            onViewHistory={onViewHistory}
            onMessage={onMessage}
          />
        ))
      )}
    </div>
  );
};

const EmptyApplications = () => (
  <Card className="p-12 text-center bg-white border-0 shadow-sm">
    <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
    <h3 className="mb-2 text-lg font-semibold text-gray-900">
      No Applications Yet
    </h3>
    <p className="mb-4 text-gray-600">
      You haven't received any rental applications yet.
    </p>
  </Card>
);

export default ApplicationsList;