import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Reply,
  Star,
  User,
  MapPin,
  Calendar,
  MessageCircle,
  Send,
  Save,
  RotateCcw,
} from "lucide-react";

const ReviewResponseModal = ({ open, onClose, review, onSubmitResponse }) => {
  const [responseData, setResponseData] = useState({
    responseText: "",
    respondedBy: "Property Manager",
    isPublic: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Predefined response templates
  const responseTemplates = [
    {
      id: 1,
      title: "Thank You - Positive Review",
      text: "Thank you for your wonderful review! We're delighted to hear about your positive experience. We strive to maintain high standards and your feedback motivates us to continue providing excellent service.",
    },
    {
      id: 2,
      title: "Acknowledge & Improve",
      text: "Thank you for your feedback. We appreciate you taking the time to share your experience. We take all feedback seriously and are working to address the concerns you've raised to improve our service.",
    },
    {
      id: 3,
      title: "Apologize & Action",
      text: "We sincerely apologize for the issues you experienced. This is not the standard we aim for, and we have taken immediate action to address these concerns. We would appreciate the opportunity to discuss this further with you.",
    },
    {
      id: 4,
      title: "Professional Response",
      text: "Thank you for your review. We value all feedback from our tenants as it helps us improve our services. If you have any specific concerns you'd like to discuss, please don't hesitate to contact us directly.",
    },
  ];

  const handleTemplateSelect = (template) => {
    setResponseData((prev) => ({
      ...prev,
      responseText: template.text,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!responseData.responseText.trim()) {
      newErrors.responseText = "Response text is required";
    } else if (responseData.responseText.trim().length < 10) {
      newErrors.responseText = "Response must be at least 10 characters long";
    }

    if (!responseData.respondedBy.trim()) {
      newErrors.respondedBy = "Responder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmitResponse(review.id, responseData);

      // Reset form
      setResponseData({
        responseText: "",
        respondedBy: "Property Manager",
        isPublic: true,
      });
      setErrors({});

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-4 py-2 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = "Response submitted successfully!";
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      console.error("Error submitting response:", error);
      alert("Failed to submit response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setResponseData({
      responseText: "",
      respondedBy: "Property Manager",
      isPublic: true,
    });
    setErrors({});
  };

  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-5xl max-h-[90vh] overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Reply className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Respond to Review
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 transition-colors rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Review Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Original Review
              </h3>

              <Card className="p-4 border-0 shadow-sm bg-gray-50">
                <div className="space-y-3">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
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
                    <span className="text-lg font-bold text-gray-900">
                      {review.rating}
                    </span>
                  </div>

                  {/* Review Title */}
                  <h4 className="font-semibold text-gray-900">
                    {review.reviewTitle}
                  </h4>

                  {/* Review Details */}
                  <div className="flex flex-col gap-2 text-sm text-gray-600">
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
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="pt-2 border-t border-gray-200">
                    <p className="leading-relaxed text-gray-700">
                      {review.reviewText}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Response Templates */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">
                  Quick Response Templates
                </h4>
                <div className="space-y-2">
                  {responseTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="w-full p-3 text-sm text-left transition-colors bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                    >
                      <div className="mb-1 font-medium text-gray-900">
                        {template.title}
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-2">
                        {template.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Response Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Your Response
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Response Text */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Response Message *
                  </label>
                  <textarea
                    value={responseData.responseText}
                    onChange={(e) => {
                      setResponseData((prev) => ({
                        ...prev,
                        responseText: e.target.value,
                      }));
                      if (errors.responseText) {
                        setErrors((prev) => ({ ...prev, responseText: "" }));
                      }
                    }}
                    placeholder="Write your response to this review..."
                    rows={8}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      errors.responseText ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.responseText && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.responseText}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {responseData.responseText.length}/500 characters
                  </p>
                </div>

                {/* Responder Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Responding as *
                  </label>
                  <select
                    value={responseData.respondedBy}
                    onChange={(e) => {
                      setResponseData((prev) => ({
                        ...prev,
                        respondedBy: e.target.value,
                      }));
                      if (errors.respondedBy) {
                        setErrors((prev) => ({ ...prev, respondedBy: "" }));
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.respondedBy ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="Property Manager">Property Manager</option>
                    <option value="Property Owner">Property Owner</option>
                    <option value="Building Manager">Building Manager</option>
                    <option value="Customer Service">Customer Service</option>
                  </select>
                  {errors.respondedBy && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.respondedBy}
                    </p>
                  )}
                </div>

                {/* Public Response */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={responseData.isPublic}
                    onChange={(e) =>
                      setResponseData((prev) => ({
                        ...prev,
                        isPublic: e.target.checked,
                      }))
                    }
                    className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPublic" className="text-sm text-gray-700">
                    Make this response public (visible to other users)
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`myButton flex items-center gap-2 px-6 py-2 ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Send size={16} />
                      {isSubmitting ? "Submitting..." : "Submit Response"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewResponseModal;
