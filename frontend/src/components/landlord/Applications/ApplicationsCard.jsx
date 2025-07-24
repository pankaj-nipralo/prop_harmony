import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Clock } from "lucide-react";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import ApplicationActions from "./ApplicationActions";
import ApplicationPriceInfo from "./ApplicationPriceInfo";

const ApplicationCard = ({ 
  application, 
  onAccept, 
  onDecline, 
  onNegotiate, 
  onViewHistory, 
  onMessage 
}) => {
  return (
    <Card className="p-6 transition-shadow bg-white border-0 shadow-sm mb-7 hover:shadow-md">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyInfo application={application} />
        </div>
        <div className="space-y-4">
          <ApplicationPriceInfo application={application} />
        </div>
      </div>

      <ApplicationActions 
        application={application}
        onAccept={onAccept}
        onDecline={onDecline}
        onNegotiate={onNegotiate}
        onViewHistory={onViewHistory}
        onMessage={onMessage}
      />
    </Card>
  );
};

const PropertyInfo = ({ application }) => (
  <div className="flex gap-4">
    <img
      src={application.propertyImage}
      alt={application.propertyTitle}
      className="object-cover w-24 h-24 rounded-lg"
    />
    <div className="flex-1">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {application.propertyTitle}
        </h3>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
        <MapPin className="w-4 h-4" />
        {application.propertyAddress}
      </div>

      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Applied: {new Date(application.submittedDate).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Last Activity: {new Date(application.lastActivity).toLocaleDateString()}
        </div>
      </div>
    </div>
  </div>
);

export default ApplicationCard;