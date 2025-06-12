import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  MessageCircle,
  Calendar,
  MapPin,
  User,
  ThumbsUp,
  Eye,
  Reply,
  MoreVertical,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  responseStatuses,
  ratingFilters,
  filterReviews,
  searchReviews,
} from "@/data/landlord/ratings/data";

const RatingsBody = ({
  reviews = [],
  setReviews,
  filters,
  setFilters,
  onRespondToReview,
  onViewDetails,
}) => {
  const [search, setSearch] = useState(filters?.search || "");
  const [expandedReviews, setExpandedReviews] = useState(new Set());

  if (!reviews || reviews.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center border-0 shadow-sm">
          <Star className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No reviews found.</p>
        </Card>
      </div>
    );
  }

  // Get unique properties for filter
  const uniqueProperties = [
    ...new Set(reviews.map((review) => review.propertyName)),
  ];

  // Apply filters and search
  let filteredReviews = filterReviews(reviews, filters);
  filteredReviews = searchReviews(filteredReviews, search);

  // Sort reviews by date (newest first)
  filteredReviews.sort(
    (a, b) => new Date(b.reviewDate) - new Date(a.reviewDate)
  );

  const toggleExpandReview = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="space-y-6 ">
      {/* Search and Filter Section */}
      <Card className="p-4 bg-white border-0 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="flex items-center flex-1 gap-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search reviews, tenants, or properties..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (setFilters) {
                  setFilters((prev) => ({ ...prev, search: e.target.value }));
                }
              }}
              className="flex-1 px-4 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Property Filter */}
            <div className="relative flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filters.property || "all"}
                onChange={(e) => {
                  if (setFilters) {
                    setFilters((prev) => ({
                      ...prev,
                      property: e.target.value,
                    }));
                  }
                }}
                className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Properties</option>
                {uniqueProperties.map((property) => (
                  <option key={property} value={property}>
                    {property}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <select
                value={filters.rating || "all"}
                onChange={(e) => {
                  if (setFilters) {
                    setFilters((prev) => ({
                      ...prev,
                      rating: e.target.value,
                    }));
                  }
                }}
                className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ratingFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
            </div>

            {/* Response Status Filter */}
            <div className="relative">
              <select
                value={filters.responseStatus || "all"}
                onChange={(e) => {
                  if (setFilters) {
                    setFilters((prev) => ({
                      ...prev,
                      responseStatus: e.target.value,
                    }));
                  }
                }}
                className="px-3 py-2 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {responseStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4 border-0 ">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Reviews ({filteredReviews.length})
          </h2>
        </div>

        {filteredReviews.length === 0 ? (
          <Card className="p-8 text-center border-0 shadow-sm">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">
              No reviews found matching your criteria.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => {
              const isExpanded = expandedReviews.has(review.id);
              const shouldTruncate = review.reviewText.length > 150;

              return (
                <Card
                  key={review.id}
                  className="p-6 transition-shadow bg-white border-0 shadow-lg hover:shadow-xl"
                >
                  <div className="space-y-4">
                    {/* Review Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1 gap-4">
                        {/* Rating */}
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`text-2xl font-bold ${getRatingColor(
                              review.rating
                            )}`}
                          >
                            {review.rating}
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={`${
                                  star <= Math.round(review.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill={
                                  star <= Math.round(review.rating)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        {/* Review Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {review.reviewTitle}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                                review.responseStatus
                              )}`}
                            >
                              {review.responseStatus === "responded"
                                ? "Responded"
                                : "Pending"}
                            </span>
                            {review.isVerified && (
                              <CheckCircle
                                size={16}
                                className="text-green-500"
                                title="Verified Review"
                              />
                            )}
                          </div>

                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{review.tenantName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{review.propertyName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>
                                {new Date(
                                  review.reviewDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            {review.helpfulVotes > 0 && (
                              <div className="flex items-center gap-1">
                                <ThumbsUp size={14} />
                                <span>{review.helpfulVotes} helpful</span>
                              </div>
                            )}
                          </div>

                          <p className="leading-relaxed text-gray-700">
                            {shouldTruncate && !isExpanded
                              ? truncateText(review.reviewText)
                              : review.reviewText}
                            {shouldTruncate && (
                              <button
                                onClick={() => toggleExpandReview(review.id)}
                                className="ml-2 text-blue-600 cursor-pointer hover:text-blue-800"
                              >
                                {isExpanded ? "Show less" : "Read more"}
                              </button>
                            )}
                          </p>

                          {/* Landlord Response */}
                          {review.landlordResponse && (
                            <div className="p-4 mt-4 border-l-4 border-blue-500 rounded-lg bg-blue-50">
                              <div className="flex items-center gap-2 mb-2">
                                <Reply size={16} className="text-blue-600" />
                                <span className="text-sm font-medium text-blue-900">
                                  Response from{" "}
                                  {review.landlordResponse.respondedBy}
                                </span>
                                <span className="text-xs text-blue-600">
                                  {new Date(
                                    review.landlordResponse.responseDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-blue-800">
                                {review.landlordResponse.responseText}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewDetails(review)}
                          className="p-2 text-gray-500 transition-colors rounded-lg cursor-pointer hover:text-blue-600 hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        {review.responseStatus === "pending" && (
                          <button
                            onClick={() => onRespondToReview(review)}
                            className="px-3 py-1 text-sm myButton"
                          >
                            <Reply size={14} className="mr-1" />
                            Respond
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingsBody;
