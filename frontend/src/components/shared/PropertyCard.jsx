// Reusable Property Card Component
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  DollarSign,
  Eye,
  Heart,
  Share2,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PropertyCard = ({
  property,
  variant = 'default', // 'default', 'compact', 'detailed'
  showActions = true,
  showStatus = true,
  showRating = false,
  onView,
  onFavorite,
  onShare,
  onContact,
  className,
  ...props
}) => {
  const {
    id,
    name,
    address,
    type,
    bedrooms,
    bathrooms,
    area,
    rent,
    status,
    images,
    rating,
    amenities,
    landlord,
    description
  } = property;

  // Status color mapping
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    occupied: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    unavailable: 'bg-red-100 text-red-800'
  };

  // Property type color mapping
  const typeColors = {
    apartment: 'bg-blue-100 text-blue-800',
    villa: 'bg-purple-100 text-purple-800',
    studio: 'bg-orange-100 text-orange-800',
    townhouse: 'bg-green-100 text-green-800',
    commercial: 'bg-gray-100 text-gray-800'
  };

  // Render property image
  const renderImage = () => {
    const imageUrl = images?.[0] || '/placeholder-property.jpg';
    
    return (
      <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-property.jpg';
          }}
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {showStatus && status && (
            <Badge className={statusColors[status]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )}
          <Badge className={typeColors[type] || typeColors.apartment}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>

        {/* Rating */}
        {showRating && rating && (
          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        )}

        {/* Quick actions overlay */}
        {showActions && (
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onFavorite?.(property);
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onShare?.(property);
              }}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Render property details
  const renderDetails = () => (
    <div className="space-y-3">
      {/* Title and Address */}
      <div>
        <h3 className="font-semibold text-gray-900 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="line-clamp-1">{address}</span>
        </p>
      </div>

      {/* Property specs */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Bed className="w-3 h-3" />
          {bedrooms || 'Studio'}
        </span>
        <span className="flex items-center gap-1">
          <Bath className="w-3 h-3" />
          {bathrooms}
        </span>
        <span className="flex items-center gap-1">
          <Square className="w-3 h-3" />
          {area} sq ft
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-lg text-gray-900">
            AED {rent?.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">/month</span>
        </div>
      </div>

      {/* Landlord info (if available) */}
      {landlord && variant === 'detailed' && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Landlord:</span> {landlord}
        </div>
      )}

      {/* Description (for detailed variant) */}
      {description && variant === 'detailed' && (
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      )}

      {/* Amenities (for detailed variant) */}
      {amenities && variant === 'detailed' && (
        <div className="flex flex-wrap gap-1">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{amenities.length - 3} more
            </Badge>
          )}
        </div>
      )}
    </div>
  );

  // Render actions
  const renderActions = () => {
    if (!showActions) return null;

    return (
      <div className="flex gap-2 pt-3 border-t">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onView?.(property)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
        {onContact && (
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onContact?.(property)}
          >
            Contact
          </Button>
        )}
      </div>
    );
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <Card 
        className={cn(
          "group cursor-pointer hover:shadow-lg transition-all duration-200",
          className
        )}
        onClick={() => onView?.(property)}
        {...props}
      >
        <CardContent className="p-4">
          <div className="flex gap-3">
            {/* Small image */}
            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={images?.[0] || '/placeholder-property.jpg'}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 line-clamp-1">{name}</h4>
              <p className="text-sm text-gray-600 line-clamp-1">{address}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{bedrooms || 'Studio'} bed</span>
                  <span>•</span>
                  <span>{bathrooms} bath</span>
                </div>
                <span className="font-semibold text-green-600">
                  AED {rent?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default and detailed variants
  return (
    <Card 
      className={cn(
        "group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden",
        className
      )}
      onClick={() => onView?.(property)}
      {...props}
    >
      {renderImage()}
      
      <CardContent className="p-4">
        {renderDetails()}
        {renderActions()}
      </CardContent>
    </Card>
  );
};

// Property grid component
export const PropertyGrid = ({ 
  properties = [], 
  loading = false,
  variant = 'default',
  columns = 'auto',
  gap = 6,
  className,
  onView,
  onFavorite,
  onShare,
  onContact,
  ...props 
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  };

  if (loading) {
    return (
      <div className={cn(
        "grid",
        gridClasses[columns] || gridClasses.auto,
        gapClasses[gap] || gapClasses[6],
        className
      )}>
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" />
            <CardContent className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "grid",
        gridClasses[columns] || gridClasses.auto,
        gapClasses[gap] || gapClasses[6],
        className
      )}
      {...props}
    >
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          variant={variant}
          onView={onView}
          onFavorite={onFavorite}
          onShare={onShare}
          onContact={onContact}
        />
      ))}
    </div>
  );
};

export default PropertyCard;
