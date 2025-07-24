import { CheckCircle, ArrowUpDown, XCircle, MessageSquare, History } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const ApplicationActions = ({ 
  application, 
  onAccept, 
  onDecline, 
  onNegotiate, 
  onViewHistory, 
  onMessage 
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 space-y-3">
      {application.status === "pending" || application.status === "under_negotiation" ? (
        <>
          <AcceptButton application={application} onClick={() => onAccept(application.id)} />
          <NegotiateButton 
            application={application} 
            onClick={() => onNegotiate(application.id)} 
          />
          <DeclineButton onClick={() => onDecline(application.id)} />
        </>
      ) : application.status === "agreed" && application.canMessage ? (
        <MessageButton onClick={() => onMessage(application.id)} />
      ) : (
        <StatusMessage status={application.status} />
      )}

      <HistoryButton onClick={() => onViewHistory(application.id)} />
    </div>
  );
};

const AcceptButton = ({ application, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 myButton"
  >
    <CheckCircle className="w-4 h-4" />
    Accept <DirhamSvg className="" />{application.currentOffer.toLocaleString()}/month
  </button>
);

const NegotiateButton = ({ application, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100 myButton"
  >
    <ArrowUpDown className="w-4 h-4" />
    {application.status === "pending" ? "Counter Offer" : "New Counter Offer"}
  </button>
);

const DeclineButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100 myButton"
  >
    <XCircle className="w-4 h-4" />
    Decline Application
  </button>
);

const MessageButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 myButton"
  >
    <MessageSquare className="w-2 h-2" />
    Message Tenant
  </button>
);

const HistoryButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-full gap-2 px-4 py-2 mb-3 text-sm font-medium text-gray-600 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100 myButton"
  >
    <History className="w-4 h-4" />
    View Negotiation History
  </button>
);

const StatusMessage = ({ status }) => (
  <div className="py-4 text-center">
    <p className="text-sm text-gray-500">
      {status === "accepted" && "Application accepted"}
      {status === "declined" && "Application declined"}
      {status === "agreed" && "Terms agreed - messaging will be available soon"}
    </p>
  </div>
);

export default ApplicationActions;