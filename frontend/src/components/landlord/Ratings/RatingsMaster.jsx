import React, { useState } from "react";
import RatingsHeader from "./RatingsHeader";
import RatingsStats from "./RatingsStats";
import RatingsBody from "./RatingsBody";
import ReviewResponseModal from "./ReviewResponseModal";
import ReviewDetailsModal from "./ReviewDetailsModal";
import { ratingsData } from "@/data/landlord/ratings/data";

const RatingsMaster = () => {
  const [reviews, setReviews] = useState(ratingsData[0]?.reviewsList || []);
  const [responseModal, setResponseModal] = useState({
    open: false,
    review: null,
  });
  const [detailsModal, setDetailsModal] = useState({
    open: false,
    review: null,
  });
  const [filters, setFilters] = useState({
    search: "",
    property: "all",
    rating: "all",
    responseStatus: "all",
    dateFrom: "",
    dateTo: "",
  });

  const handleRespondToReview = (review) => {
    setResponseModal({ open: true, review });
  };

  const handleViewDetails = (review) => {
    setDetailsModal({ open: true, review });
  };

  const handleSubmitResponse = (reviewId, responseData) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              responseStatus: "responded",
              landlordResponse: {
                responseText: responseData.responseText,
                responseDate: new Date().toISOString().split("T")[0],
                respondedBy: responseData.respondedBy || "Property Manager",
              },
            }
          : review
      )
    );
    setResponseModal({ open: false, review: null });
  };

  return (
    <div className="min-h-screen p-6"> 
        <RatingsHeader reviews={reviews} filters={filters} />

        <RatingsStats reviews={reviews} />

        <RatingsBody
          reviews={reviews}
          setReviews={setReviews}
          filters={filters}
          setFilters={setFilters}
          onRespondToReview={handleRespondToReview}
          onViewDetails={handleViewDetails}
        />

        <ReviewResponseModal
          open={responseModal.open}
          onClose={() => setResponseModal({ open: false, review: null })}
          review={responseModal.review}
          onSubmitResponse={handleSubmitResponse}
        />

        <ReviewDetailsModal
          open={detailsModal.open}
          onClose={() => setDetailsModal({ open: false, review: null })}
          review={detailsModal.review}
          onRespondToReview={handleRespondToReview}
        />
      </div> 
  );
};

export default RatingsMaster;
