import React from 'react';
import { Building2, Calendar, Download, Star } from 'lucide-react';
import { formatDateRange, renderStarRating } from '../../../data/tenants/pastPropertiesData';

const StarRating = ({ rating, label }) => {
  const { fullStars, hasHalfStar, emptyStars } = renderStarRating(rating);
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        )}
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
      <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
};

const PastPropertiesCard = ({ property, onViewDocuments }) => {
  const getPropertyTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'apartment':
        return 'bg-blue-100 text-blue-800';
      case 'loft':
        return 'bg-purple-100 text-purple-800';
      case 'studio':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 mb-4 bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Building2 className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <span>📍</span>
              {property.address}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPropertyTypeColor(property.type)}`}>
          {property.type}
        </span>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Property Details */}
        <div>
          <h4 className="mb-3 font-semibold text-gray-900">Property Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex gap-1">
              <span className="text-gray-600">Bedrooms:</span>
              <span className="font-medium text-gray-900">{property.propertyDetails.bedrooms}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-600">Bathrooms:</span>
              <span className="font-medium text-gray-900">{property.propertyDetails.bathrooms}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-600">Monthly Rent:</span>
              <span className="font-medium text-gray-900">{property.propertyDetails.monthlyRent}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-600">Total Paid:</span>
              <span className="font-medium text-gray-900">{property.propertyDetails.totalPaid}</span>
            </div>
          </div>
        </div>

        {/* Lease Period */}
        <div>
          <h4 className="mb-3 font-semibold text-gray-900">Lease Period</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                {formatDateRange(property.leasePeriod.startDate, property.leasePeriod.endDate)}
              </span>
            </div>
            <div className="flex gap-1 ">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium text-gray-900">{property.leasePeriod.duration}</span>
            </div>
            <div className="flex gap-1 ">
              <span className="text-gray-600">Landlord: </span> 
              <span className="font-medium text-gray-900">{property.landlord}</span>
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div>
          <h4 className="mb-3 font-semibold text-gray-900">Ratings</h4>
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-sm text-gray-600">Rating Given to Landlord</p>
              <StarRating rating={property.ratings.givenToLandlord} />
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-600">Rating Received</p>
              <StarRating rating={property.ratings.receivedFromLandlord} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Lease ended {property.leasePeriod.leaseEnded}
        </p>
        
        {property.hasDocuments ? (
          <button
            onClick={() => onViewDocuments(property.id)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            <Download className="w-4 h-4" />
            View Documents
          </button>
        ) : (
          <span className="text-sm text-gray-400">No Documents Available</span>
        )}
      </div>
    </div>
  );
};

export default PastPropertiesCard;
