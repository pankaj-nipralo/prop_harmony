// Past Properties Data
export const pastPropertiesStats = {
  totalProperties: 3,
  totalRentPaid: " 79,800",
  avgRatingGiven: 4.4,
  avgRatingReceived: 4.2
};

export const pastPropertiesData = [
  {
    id: 1,
    name: "Sunset Apartments",
    address: "456 Sunset Blvd, West Side",
    type: "Apartment",
    propertyDetails: {
      bedrooms: 2,
      bathrooms: 1,
      monthlyRent: " 2,200",
      totalPaid: " 26,400"
    },
    leasePeriod: {
      startDate: "2022-01-01",
      endDate: "2023-12-31",
      duration: "23 months",
      leaseEnded: "2023-12-31"
    },
    landlord: "Sarah Johnson",
    ratings: {
      givenToLandlord: 4.5,
      receivedFromLandlord: 4.2
    },
    hasDocuments: true
  },
  {
    id: 2,
    name: "Downtown Loft",
    address: "123 Main St, Downtown",
    type: "Loft",
    propertyDetails: {
      bedrooms: 1,
      bathrooms: 1,
      monthlyRent: " 1,800",
      totalPaid: " 32,400"
    },
    leasePeriod: {
      startDate: "2020-06-01",
      endDate: "2021-12-31",
      duration: "18 months",
      leaseEnded: "2021-12-31"
    },
    landlord: "Mike Wilson",
    ratings: {
      givenToLandlord: 3.8,
      receivedFromLandlord: 4.0
    },
    hasDocuments: true
  },
  {
    id: 3,
    name: "Garden View Studio",
    address: "789 Garden Ave, Midtown",
    type: "Studio",
    propertyDetails: {
      bedrooms: "Studio",
      bathrooms: 1,
      monthlyRent: " 1,500",
      totalPaid: " 21,000"
    },
    leasePeriod: {
      startDate: "2019-03-01",
      endDate: "2020-05-31",
      duration: "14 months",
      leaseEnded: "2020-05-31"
    },
    landlord: "Emma Davis",
    ratings: {
      givenToLandlord: 4.8,
      receivedFromLandlord: 4.5
    },
    hasDocuments: false
  }
];

// Utility functions
export const calculateOverallStats = (properties) => {
  const totalProperties = properties.length;
  const totalRentPaid = properties.reduce((sum, prop) => {
    const amount = parseFloat(prop.propertyDetails.totalPaid.replace(/[^\d.]/g, ''));
    return sum + amount;
  }, 0);
  
  const avgRatingGiven = properties.reduce((sum, prop) => sum + prop.ratings.givenToLandlord, 0) / totalProperties;
  const avgRatingReceived = properties.reduce((sum, prop) => sum + prop.ratings.receivedFromLandlord, 0) / totalProperties;
  
  return {
    totalProperties,
    totalRentPaid: ` ${totalRentPaid.toLocaleString()}`,
    avgRatingGiven: avgRatingGiven.toFixed(1),
    avgRatingReceived: avgRatingReceived.toFixed(1)
  };
};

export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  return `${formatDate(start)} to ${formatDate(end)}`;
};

export const renderStarRating = (rating, maxStars = 5) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    fullStars,
    hasHalfStar,
    emptyStars,
    rating: rating.toFixed(1)
  };
};
