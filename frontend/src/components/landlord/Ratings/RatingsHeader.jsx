import React, { useState } from "react";
import {
  Star,
  MessageCircle,
  Download,
  ChevronDown,
  Filter,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const RatingsHeader = ({ reviews = [], filters = {}, onExport }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format) => {
    if (!reviews || reviews.length === 0) {
      alert("No reviews data available to export.");
      return;
    }

    setIsExporting(true);
    setShowExportMenu(false);

    try {
      let filename;

      if (format === "PDF") {
        filename = await exportReviewsToPDF(reviews, filters);
      } else if (format === "Excel") {
        filename = await exportReviewsToExcel(reviews, filters);
      }

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-4 py-2 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = `${format} export completed: ${filename}`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      console.error("Export error:", error);
      alert(`Failed to export ${format}. Please try again.`);
    } finally {
      setIsExporting(false);
    }
  };

  // Mock export functions - in real app these would be imported from utils
  const exportReviewsToPDF = async (reviews, filters) => {
    // Simulate export delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `reviews_report_${new Date().toISOString().split("T")[0]}.pdf`;
  };

  const exportReviewsToExcel = async (reviews, filters) => {
    // Simulate export delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `reviews_data_${new Date().toISOString().split("T")[0]}.xlsx`;
  };

  // Calculate quick stats
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";
  const pendingResponses = reviews.filter(
    (review) => review.responseStatus === "pending"
  ).length;
  const responseRate =
    totalReviews > 0
      ? (((totalReviews - pendingResponses) / totalReviews) * 100).toFixed(1)
      : "0.0";

  return (
    <header className="space-y-6">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Star className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Ratings & Reviews
            </h1>
            <p className="mt-1 text-gray-600">
              Manage tenant feedback and property ratings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Stats */}
          <div className="items-center hidden gap-6 px-6 py-3 bg-white border-0 rounded-lg shadow-sm lg:flex">
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                <span className="text-lg font-bold text-gray-900">
                  {averageRating}
                </span>
              </div>
              <p className="text-xs text-gray-500">Avg Rating</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <span className="text-lg font-bold text-gray-900">
                  {totalReviews}
                </span>
              </div>
              <p className="text-xs text-gray-500">Total Reviews</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-lg font-bold text-gray-900">
                  {responseRate}%
                </span>
              </div>
              <p className="text-xs text-gray-500">Response Rate</p>
            </div>
          </div>

          {/* Export Dropdown */}
          {/* <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium shadow-sm cursor-pointer ${
                isExporting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Download size={18} />
              {isExporting ? "Exporting..." : "Export"}
              <ChevronDown size={16} />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={() => handleExport("PDF")}
                  className="w-full px-4 py-2 text-left text-gray-700 rounded-t-lg cursor-pointer hover:bg-gray-50"
                >
                  Export as PDF Report
                </button>
                <button
                  onClick={() => handleExport("Excel")}
                  className="w-full px-4 py-2 text-left text-gray-700 rounded-b-lg cursor-pointer hover:bg-gray-50"
                >
                  Export as Excel Data
                </button>
              </div>
            )}
          </div> */}

          {/* Analytics Button */}
          {/* <button className="flex items-center gap-2 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50">
            <BarChart3 size={18} />
            Analytics
          </button> */}
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="flex items-center justify-between p-4 bg-white border-0 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Quick Filters:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs text-yellow-800 transition-colors bg-yellow-100 rounded-full cursor-pointer hover:bg-yellow-200">
              5 Stars (
              {reviews.filter((r) => Math.floor(r.rating) === 5).length})
            </button>
            <button className="px-3 py-1 text-xs text-orange-800 transition-colors bg-orange-100 rounded-full cursor-pointer hover:bg-orange-200">
              Pending Response ({pendingResponses})
            </button>
            <button className="px-3 py-1 text-xs text-blue-800 transition-colors bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200">
              This Month (
              {
                reviews.filter((r) => {
                  const reviewDate = new Date(r.reviewDate);
                  const now = new Date();
                  return (
                    reviewDate.getMonth() === now.getMonth() &&
                    reviewDate.getFullYear() === now.getFullYear()
                  );
                }).length
              }
              )
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {pendingResponses > 0 && (
              <span className="font-medium text-orange-600">
                {pendingResponses} review{pendingResponses !== 1 ? "s" : ""}{" "}
                need{pendingResponses === 1 ? "s" : ""} response
              </span>
            )}
            {pendingResponses === 0 && (
              <span className="font-medium text-green-600">
                All reviews responded to
              </span>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};

export default RatingsHeader;
