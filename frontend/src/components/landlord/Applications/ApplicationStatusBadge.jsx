import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowUpDown, 
  AlertCircle 
} from "lucide-react";

const statusConfig = {
  pending: {
    icon: Clock,
    text: "Pending Review",
    style: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
  accepted: {
    icon: CheckCircle,
    text: "Accepted",
    style: "bg-green-100 text-green-800 border-green-200"
  },
  declined: {
    icon: XCircle,
    text: "Declined",
    style: "bg-red-100 text-red-800 border-red-200"
  },
  under_negotiation: {
    icon: ArrowUpDown,
    text: "Under Negotiation",
    style: "bg-blue-100 text-blue-800 border-blue-200"
  },
  agreed: {
    icon: CheckCircle,
    text: "Terms Agreed",
    style: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  default: {
    icon: AlertCircle,
    text: "Unknown",
    style: "bg-gray-100 text-gray-800 border-gray-200"
  }
};

const ApplicationStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.default;
  const Icon = config.icon;
  
  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${config.style}`}>
      <Icon className="w-4 h-4" />
      {config.text}
    </div>
  );
};

export default ApplicationStatusBadge;