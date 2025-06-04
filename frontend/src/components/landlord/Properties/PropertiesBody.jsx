import { Star, Home, MapPin, Calendar, BadgeCheck } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { propertiesData } from "@/data/landlord/dashboard/data";

const statusColorMap = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  ended: "bg-gray-100 text-gray-700",
};

const featureColor =
  "bg-[#5c7290] text-white/90 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2 inline-block";

const mockProperties = [
  {
    id: 1,
    title: "Sunset Apartments Unit 101",
    location: "123 Main Street, Dubai Marina, Dubai",
    rating: 4.5,
    status: "active",
    leaseEnd: "2025-12-31",
    daysRemaining: 209,
    features: ["Balcony", "Parking", "Pool", "+1 more"],
  },
  {
    id: 2,
    title: "Marina View Villa",
    location: "456 Palm Street, Palm Jumeirah, Dubai",
    rating: 4.8,
    status: "pending",
    leaseEnd: "2025-06-30",
    daysRemaining: 25,
    features: ["Garden", "Private Pool", "Garage", "+1 more"],
  },
];

function getStatusLabel(status) {
  if (status === "active")
    return (
      <span className="px-3 py-1 mr-2 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
        active
      </span>
    );
  if (status === "pending")
    return (
      <span className="px-3 py-1 mr-2 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
        pending
      </span>
    );
  return (
    <span className="px-3 py-1 mr-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
      ended
    </span>
  );
}

const PropertiesBody = () => {
  const navigate = useNavigate();
  // In real app, fetch from API or context
  const [properties] = useState(mockProperties);

  return (
    <div className="p-4 mx-auto bg-transparent">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="p-5 transition bg-white border border-gray-200 shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:border-blue-200"
            onClick={() => navigate(`/landlord/properties/${property.id}`)}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold leading-tight text-gray-900">
                {property.title}
              </h2>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
                <span className="text-sm font-semibold text-yellow-600">
                  {property.rating}
                </span>
              </div>
            </div>
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <Home className="w-4 h-4 mr-1 text-gray-400" />
              {property.location}
            </div>
            <div className="flex items-center mb-2 text-xs text-gray-500">
              <Calendar className="w-4 h-4 mr-1 text-gray-400" />
              {getStatusLabel(property.status)}
              <span className="mr-2">
                {property.daysRemaining} days remaining
              </span>
              <span className="ml-auto">
                Ends{" "}
                {new Date(property.leaseEnd).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {property.features.map((feature, idx) => (
                <span key={idx} className={featureColor}>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesBody;
