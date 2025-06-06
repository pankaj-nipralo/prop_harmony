export const ratingsData = [
  {
    id: 1,
    reviewsList: [
      {
        id: 1,
        propertyId: 1,
        propertyName: "Marina View Villa",
        propertyAddress: "456 Palm Street, Palm Jumeirah, Dubai",
        tenantId: 12,
        tenantName: "Ahmed Al-Mansouri",
        tenantEmail: "ahmed.mansouri@email.com",
        tenantPhone: "+971-50-123-4567",
        rating: 4.8,
        reviewTitle: "Excellent Property Management",
        reviewText: "The property is well-maintained and the landlord is very responsive to any issues. The location is perfect and all amenities work perfectly. Highly recommend this property to anyone looking for a quality rental experience.",
        reviewDate: "2024-12-10",
        categories: {
          communication: 4.7,
          maintenance: 4.9,
          location: 5.0,
          value: 4.6,
          cleanliness: 4.8
        },
        isPublic: true,
        isVerified: true,
        helpfulVotes: 12,
        responseStatus: "responded",
        landlordResponse: {
          responseText: "Thank you for your wonderful review! We're delighted to hear about your positive experience. We strive to maintain high standards and your feedback motivates us to continue providing excellent service.",
          responseDate: "2024-12-11",
          respondedBy: "Property Manager"
        },
        photos: [
          {
            id: 1,
            url: "/images/review-photo-1.jpg",
            caption: "Beautiful living room"
          }
        ],
        tags: ["excellent", "responsive", "well-maintained"],
        reportCount: 0,
        isEdited: false,
        editedDate: null
      },
      {
        id: 2,
        propertyId: 1,
        propertyName: "Marina View Villa",
        propertyAddress: "456 Palm Street, Palm Jumeirah, Dubai",
        tenantId: 13,
        tenantName: "Sarah Johnson",
        tenantEmail: "sarah.johnson@email.com",
        tenantPhone: "+971-50-234-5678",
        rating: 4.2,
        reviewTitle: "Good Property with Minor Issues",
        reviewText: "Overall a good property with excellent location. However, there were some maintenance delays initially. The landlord eventually addressed all concerns but it took longer than expected.",
        reviewDate: "2024-12-05",
        categories: {
          communication: 4.0,
          maintenance: 3.8,
          location: 4.8,
          value: 4.2,
          cleanliness: 4.5
        },
        isPublic: true,
        isVerified: true,
        helpfulVotes: 8,
        responseStatus: "pending",
        landlordResponse: null,
        photos: [],
        tags: ["good", "maintenance-delay", "location"],
        reportCount: 0,
        isEdited: false,
        editedDate: null
      },
      {
        id: 3,
        propertyId: 2,
        propertyName: "Sunset Apartments",
        propertyAddress: "123 Main Street, Dubai Marina, Dubai",
        tenantId: 14,
        tenantName: "Michael Chen",
        tenantEmail: "michael.chen@email.com",
        tenantPhone: "+971-50-345-6789",
        rating: 4.6,
        reviewTitle: "Great Apartment Complex",
        reviewText: "Fantastic apartment with modern amenities. The building management is professional and maintenance requests are handled promptly. The only minor issue is parking availability during peak hours.",
        reviewDate: "2024-12-01",
        categories: {
          communication: 4.5,
          maintenance: 4.8,
          location: 4.4,
          value: 4.7,
          cleanliness: 4.6
        },
        isPublic: true,
        isVerified: true,
        helpfulVotes: 15,
        responseStatus: "responded",
        landlordResponse: {
          responseText: "Thank you for your positive feedback! We're working on improving parking availability and appreciate your patience. We're glad you're enjoying the modern amenities.",
          responseDate: "2024-12-02",
          respondedBy: "Building Manager"
        },
        photos: [
          {
            id: 2,
            url: "/images/review-photo-2.jpg",
            caption: "Modern kitchen"
          },
          {
            id: 3,
            url: "/images/review-photo-3.jpg",
            caption: "Balcony view"
          }
        ],
        tags: ["modern", "professional", "parking-issue"],
        reportCount: 0,
        isEdited: false,
        editedDate: null
      },
      {
        id: 4,
        propertyId: 3,
        propertyName: "Downtown Loft",
        propertyAddress: "789 City Center, Downtown Dubai",
        tenantId: 15,
        tenantName: "Emma Wilson",
        tenantEmail: "emma.wilson@email.com",
        tenantPhone: "+971-50-456-7890",
        rating: 3.8,
        reviewTitle: "Average Experience",
        reviewText: "The loft has a great location but some facilities need updating. The air conditioning system had issues during summer and took time to fix. The landlord was responsive but the property needs some improvements.",
        reviewDate: "2024-11-28",
        categories: {
          communication: 4.2,
          maintenance: 3.2,
          location: 4.5,
          value: 3.8,
          cleanliness: 3.9
        },
        isPublic: true,
        isVerified: true,
        helpfulVotes: 6,
        responseStatus: "pending",
        landlordResponse: null,
        photos: [],
        tags: ["location", "needs-updating", "ac-issues"],
        reportCount: 0,
        isEdited: false,
        editedDate: null
      },
      {
        id: 5,
        propertyId: 2,
        propertyName: "Sunset Apartments",
        propertyAddress: "123 Main Street, Dubai Marina, Dubai",
        tenantId: 16,
        tenantName: "David Rodriguez",
        tenantEmail: "david.rodriguez@email.com",
        tenantPhone: "+971-50-567-8901",
        rating: 4.9,
        reviewTitle: "Outstanding Service",
        reviewText: "Exceptional property management and maintenance service. Every request is handled within 24 hours. The property is always clean and well-maintained. Couldn't ask for better landlords!",
        reviewDate: "2024-11-25",
        categories: {
          communication: 5.0,
          maintenance: 4.9,
          location: 4.7,
          value: 4.8,
          cleanliness: 5.0
        },
        isPublic: true,
        isVerified: true,
        helpfulVotes: 20,
        responseStatus: "responded",
        landlordResponse: {
          responseText: "Thank you so much for your kind words! It's tenants like you who make our job rewarding. We're committed to maintaining these high standards.",
          responseDate: "2024-11-26",
          respondedBy: "Property Owner"
        },
        photos: [
          {
            id: 4,
            url: "/images/review-photo-4.jpg",
            caption: "Clean common area"
          }
        ],
        tags: ["outstanding", "responsive", "clean"],
        reportCount: 0,
        isEdited: false,
        editedDate: null
      }
    ]
  }
];

// Rating categories for detailed breakdown
export const ratingCategories = [
  { key: "communication", label: "Communication", icon: "MessageCircle" },
  { key: "maintenance", label: "Maintenance", icon: "Wrench" },
  { key: "location", label: "Location", icon: "MapPin" },
  { key: "value", label: "Value for Money", icon: "DollarSign" },
  { key: "cleanliness", label: "Cleanliness", icon: "Sparkles" }
];

// Response status options
export const responseStatuses = [
  { value: "all", label: "All Reviews" },
  { value: "pending", label: "Pending Response" },
  { value: "responded", label: "Responded" }
];

// Rating filter options
export const ratingFilters = [
  { value: "all", label: "All Ratings" },
  { value: "5", label: "5 Stars" },
  { value: "4", label: "4 Stars" },
  { value: "3", label: "3 Stars" },
  { value: "2", label: "2 Stars" },
  { value: "1", label: "1 Star" }
];

// Utility functions
export const calculateOverallRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

export const calculateCategoryAverages = (reviews) => {
  if (!reviews || reviews.length === 0) return {};
  
  const categories = {};
  ratingCategories.forEach(category => {
    const total = reviews.reduce((sum, review) => 
      sum + (review.categories[category.key] || 0), 0
    );
    categories[category.key] = (total / reviews.length).toFixed(1);
  });
  
  return categories;
};

export const getResponseRate = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const respondedCount = reviews.filter(review => 
    review.responseStatus === "responded"
  ).length;
  return ((respondedCount / reviews.length) * 100).toFixed(1);
};

export const getRatingDistribution = (reviews) => {
  if (!reviews || reviews.length === 0) return {};
  
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(review => {
    const rating = Math.floor(review.rating);
    distribution[rating] = (distribution[rating] || 0) + 1;
  });
  
  return distribution;
};

export const filterReviews = (reviews, filters) => {
  if (!reviews) return [];
  
  return reviews.filter(review => {
    // Property filter
    if (filters.property && filters.property !== "all" && 
        review.propertyName !== filters.property) {
      return false;
    }
    
    // Rating filter
    if (filters.rating && filters.rating !== "all" && 
        Math.floor(review.rating) !== parseInt(filters.rating)) {
      return false;
    }
    
    // Response status filter
    if (filters.responseStatus && filters.responseStatus !== "all" && 
        review.responseStatus !== filters.responseStatus) {
      return false;
    }
    
    // Date range filter
    if (filters.dateFrom && new Date(review.reviewDate) < new Date(filters.dateFrom)) {
      return false;
    }
    
    if (filters.dateTo && new Date(review.reviewDate) > new Date(filters.dateTo)) {
      return false;
    }
    
    return true;
  });
};

export const searchReviews = (reviews, searchTerm) => {
  if (!searchTerm || !reviews) return reviews;
  
  const term = searchTerm.toLowerCase();
  return reviews.filter(review =>
    review.reviewTitle.toLowerCase().includes(term) ||
    review.reviewText.toLowerCase().includes(term) ||
    review.tenantName.toLowerCase().includes(term) ||
    review.propertyName.toLowerCase().includes(term) ||
    review.tags.some(tag => tag.toLowerCase().includes(term))
  );
};
