import React from "react";
import { Card } from "@/components/ui/card";
import {
  Star,
  MessageCircle,
  TrendingUp,
  Clock,
  ThumbsUp,
  BarChart3,
  Users,
  Award,
} from "lucide-react";
import {
  calculateOverallRating,
  calculateCategoryAverages,
  getResponseRate,
  getRatingDistribution,
  convertRatingToGrade,
  getGradeColor,
  getGradeDistribution,
  calculateCategoryGrades,
} from "@/data/landlord/ratings/data";
import GradingBar from "./GradingBar";
import { useAuth } from "@/contexts/AuthContext";

const RatingsStats = ({ reviews = [] }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">No Data</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                <Star className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Calculate statistics
  const overallRating = calculateOverallRating(reviews);
  const categoryAverages = calculateCategoryAverages(reviews);
  const responseRate = getResponseRate(reviews);
  const ratingDistribution = getRatingDistribution(reviews);
  const { user } = useAuth();

  const tenantRatingCategories = [
    "Payment Reliability",
    "Rental Behavior & Property Care",
    "Rental History & References",
    "Communication & Cooperation",
    "Creditworthiness",
  ];

  const landlordRatingCategories = [
    "Responsiveness & Communication",
    "Property Condition & Maintenance",
    "Fairness in Rent Practices",
    "Respect for Tenant Privacy",
    "Security Deposit Handling",
  ];

  // Calculate grade statistics
  const overallGrade = convertRatingToGrade(parseFloat(overallRating));
  const gradeDistribution = getGradeDistribution(reviews);
  const categoryGrades = calculateCategoryGrades(reviews);

  // Additional stats
  const totalReviews = reviews.length;
  const pendingResponses = reviews.filter(
    (review) => review.responseStatus === "pending"
  ).length;
  const averageHelpfulVotes =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + (review.helpfulVotes || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  // Recent reviews (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentReviews = reviews.filter(
    (review) => new Date(review.reviewDate) >= thirtyDaysAgo
  ).length;

  // Rating trend (comparing last 30 days to previous 30 days)
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  const previousPeriodReviews = reviews.filter((review) => {
    const reviewDate = new Date(review.reviewDate);
    return reviewDate >= sixtyDaysAgo && reviewDate < thirtyDaysAgo;
  });

  const recentAvgRating =
    recentReviews > 0
      ? reviews
          .filter((review) => new Date(review.reviewDate) >= thirtyDaysAgo)
          .reduce((sum, review) => sum + review.rating, 0) / recentReviews
      : 0;

  const previousAvgRating =
    previousPeriodReviews.length > 0
      ? previousPeriodReviews.reduce((sum, review) => sum + review.rating, 0) /
        previousPeriodReviews.length
      : 0;

  const ratingTrend = recentAvgRating - previousAvgRating;
  const trendPercentage =
    previousAvgRating > 0
      ? ((ratingTrend / previousAvgRating) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="my-6 space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Overall Rating */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Overall Rating
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-3xl font-bold text-blue-600">
                    {overallRating}
                  </p>
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      getGradeColor(overallGrade.grade).light
                    } ${getGradeColor(overallGrade.grade).text}`}
                  >
                    {overallGrade.grade}
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {overallGrade.label} • Based on {totalReviews} review
                  {totalReviews !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            {/* Grading Bar */}
            {/* <div className="pt-2">
              <GradingBar
                rating={parseFloat(overallRating)}
                showLabel={false}
                size="sm"
              />
            </div> */}
          </div>
        </Card>

        {/* Total Reviews */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{totalReviews}</p>
              <p className="mt-1 text-xs text-gray-500">
                {recentReviews} this month
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Response Rate */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-3xl font-bold text-purple-600">
                {responseRate}%
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {pendingResponses} pending response
                {pendingResponses !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        {/* Rating Trend */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">30-Day Trend</p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-3xl font-bold ${
                    ratingTrend >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {ratingTrend >= 0 ? "+" : ""}
                  {trendPercentage}%
                </p>
                <TrendingUp
                  size={16}
                  className={`${
                    ratingTrend >= 0
                      ? "text-green-600"
                      : "text-red-600 rotate-180"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">vs previous period</p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                ratingTrend >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <BarChart3
                className={`w-6 h-6 ${
                  ratingTrend >= 0 ? "text-green-600" : "text-red-600"
                }`}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Grade Distribution */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Grade Distribution
          </h3>
          <div className="space-y-3">
            {["A", "B", "C", "D", "F"].map((grade) => {
              const count = gradeDistribution[grade] || 0;
              const percentage =
                totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              const gradeColors = getGradeColor(grade);

              return (
                <div key={grade} className="flex items-center gap-3">
                  {/* Grade badge and label */}
                  <div className="flex items-center gap-2 w-28">
                    <div
                      className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold text-white ${gradeColors.bg}`}
                    >
                      {grade}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {grade === "A"
                        ? "Excellent"
                        : grade === "B"
                        ? "Good"
                        : grade === "C"
                        ? "Average"
                        : grade === "D"
                        ? "Below Avg"
                        : "Poor"}
                    </span>
                  </div>

                  <div className="flex-1 h-3 bg-gray-200 rounded-full">
                    <div
                      className={`h-3 transition-all duration-300 rounded-full ${gradeColors.bg}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-sm text-right text-gray-600">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Category Grades */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Category Grades
          </h3>
          <div className="space-y-4">
            {Object.keys(categoryGrades).map((category, index) => {
              const gradeData = categoryGrades[category];

              const tenantLabels = [
                "Payment Reliability",
                "Rental Behavior & Property Care",
                "Rental History & References",
                "Communication & Cooperation",
                "Creditworthiness",
              ];

              const landlordLabels = [
                "Responsiveness & Communication",
                "Property Condition & Maintenance",
                "Fairness in Rent Practices",
                "Respect for Tenant Privacy",
                "Security Deposit Handling",
              ];

              const categoryLabels =
                user?.role === "tenant" ? tenantLabels : landlordLabels;
              const percentage = (parseFloat(gradeData.rating) / 5) * 100;
              const gradeColors = getGradeColor(gradeData.grade);

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {categoryLabels[index] || category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-blue-600">
                        {gradeData.rating}
                      </span>
                      <div
                        className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold text-white ${gradeColors.bg}`}
                      >
                        {gradeData.grade}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 transition-all duration-300 rounded-full ${gradeColors.bg}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RatingsStats;
