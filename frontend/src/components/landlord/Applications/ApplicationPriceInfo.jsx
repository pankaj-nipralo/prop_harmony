import DirhamSvg from "@/assets/Dirham";

const ApplicationPriceInfo = ({ application }) => {
  return (
    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Listed Price:</span>
          <span className="text-sm font-medium text-gray-900">
            <DirhamSvg className="mb-1 mr-1" />
            {application.originalPrice.toLocaleString()}/month
          </span>
        </div>

        {application.tenantLastOffer && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-600">Tenant's Offer:</span>
            <span className="text-sm font-bold text-blue-600">
              <DirhamSvg className="mb-1 mr-1" />
              {application.tenantLastOffer.toLocaleString()}/month
            </span>
          </div>
        )}

        {application.myLastOffer && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600">My Counter Offer:</span>
            <span className="text-sm font-bold text-green-600">
              <DirhamSvg className="mb-1 mr-1" />
              {application.myLastOffer.toLocaleString()}/month
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              Current Offer:
            </span>
            <span className="text-lg font-bold text-blue-600">
              <DirhamSvg className="mb-1 mr-1" />
              {application.currentOffer.toLocaleString()}/month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPriceInfo;