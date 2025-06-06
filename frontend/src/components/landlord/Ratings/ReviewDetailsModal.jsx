import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Star,
  User,
  MapPin,
  Calendar,
  MessageCircle,
  ThumbsUp,
  Reply,
  CheckCircle,
  Phone,
  Mail,
  Tag,
  Image,
  Eye,
  ExternalLink,
} from "lucide-react";
import { ratingCategories } from "@/data/landlord/ratings/data";

const ReviewDetailsModal = ({ open, onClose, review, onRespondToReview }) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!review) return null;

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getCategoryIcon = (categoryKey) => {
    const iconMap = {
      communication: MessageCircle,
      maintenance: "🔧",
      location: MapPin,
      value: "💰",
      cleanliness: "✨",
    };
    return iconMap[categoryKey] || MessageCircle;
  };

  const tabs = [
    { id: "details", label: "Review Details", icon: Eye },
    { id: "tenant", label: "Tenant Info", icon: User },
    { id: "property", label: "Property Info", icon: MapPin },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-5xl max-h-[90vh] overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Review Details
              </h2>
            </div> 
          </div>

          {/* Review Header */}
          <div className="mb-6">
            <Card className="p-6 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Rating Display */}
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getRatingColor(review.rating)}`}>
                      {review.rating}
                    </div>
                    <div className="flex items-center justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={`${
                            star <= Math.round(review.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill={star <= Math.round(review.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{review.reviewTitle}</h3>
                      {review.isVerified && (
                        <CheckCircle size={20} className="text-green-500" title="Verified Review" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{review.tenantName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(review.reviewDate).toLocaleDateString()}</span>
                      </div>
                      {review.helpfulVotes > 0 && (
                        <div className="flex items-center gap-1">
                          <ThumbsUp size={14} />
                          <span>{review.helpfulVotes} helpful votes</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        review.responseStatus === "responded" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {review.responseStatus === "responded" ? "Responded" : "Pending Response"}
                      </span>
                      {review.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {review.responseStatus === "pending" && (
                  <button
                    onClick={() => onRespondToReview(review)}
                    className="flex items-center gap-2 px-4 py-2 myButton"
                  >
                    <Reply size={16} />
                    Respond
                  </button>
                )}
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <IconComponent size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === "details" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Review Content */}
                <div className="space-y-4">
                  <Card className="p-4 border-0 shadow-sm">
                    <h4 className="mb-3 font-semibold text-gray-900">Review Text</h4>
                    <p className="leading-relaxed text-gray-700">{review.reviewText}</p>
                  </Card>

                  {/* Photos */}
                  {review.photos && review.photos.length > 0 && (
                    <Card className="p-4 border-0 shadow-sm">
                      <h4 className="mb-3 font-semibold text-gray-900">Photos</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {review.photos.map((photo) => (
                          <div key={photo.id} className="relative group">
                            <div className="flex items-center justify-center bg-gray-200 rounded-lg aspect-video">
                              <Image size={24} className="text-gray-400" />
                            </div>
                            <p className="mt-1 text-xs text-gray-600">{photo.caption}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Landlord Response */}
                  {review.landlordResponse && (
                    <Card className="p-4 border-0 border-l-4 border-blue-500 shadow-sm bg-blue-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Reply size={16} className="text-blue-600" />
                        <span className="font-semibold text-blue-900">
                          Response from {review.landlordResponse.respondedBy}
                        </span>
                        <span className="text-xs text-blue-600">
                          {new Date(review.landlordResponse.responseDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-blue-800">{review.landlordResponse.responseText}</p>
                    </Card>
                  )}
                </div>

                {/* Category Ratings */}
                <div className="space-y-4">
                  <Card className="p-4 border-0 shadow-sm">
                    <h4 className="mb-4 font-semibold text-gray-900">Category Breakdown</h4>
                    <div className="space-y-3">
                      {ratingCategories.map((category) => {
                        const rating = review.categories[category.key] || 0;
                        const percentage = (rating / 5) * 100;
                        
                        return (
                          <div key={category.key} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                {category.label}
                              </span>
                              <span className="text-sm font-bold text-blue-600">{rating}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 transition-all duration-300 bg-blue-500 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Review Metadata */}
                  <Card className="p-4 border-0 shadow-sm">
                    <h4 className="mb-3 font-semibold text-gray-900">Review Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Review ID:</span>
                        <span className="font-medium">#{review.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted:</span>
                        <span className="font-medium">{new Date(review.reviewDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Verified:</span>
                        <span className={`font-medium ${review.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                          {review.isVerified ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Public:</span>
                        <span className={`font-medium ${review.isPublic ? 'text-green-600' : 'text-red-600'}`}>
                          {review.isPublic ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Helpful Votes:</span>
                        <span className="font-medium">{review.helpfulVotes}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "tenant" && (
              <Card className="p-6 border-0 shadow-sm">
                <h4 className="mb-4 font-semibold text-gray-900">Tenant Information</h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{review.tenantName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{review.tenantEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{review.tenantPhone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Tenant ID</p>
                      <p className="font-medium">#{review.tenantId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Review History</p>
                      <p className="font-medium">1 review</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "property" && (
              <Card className="p-6 border-0 shadow-sm">
                <h4 className="mb-4 font-semibold text-gray-900">Property Information</h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Property Name</p>
                        <p className="font-medium">{review.propertyName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{review.propertyAddress}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Property ID</p>
                      <p className="font-medium">#{review.propertyId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Reviews</p>
                      <p className="font-medium">5 reviews</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailsModal;
