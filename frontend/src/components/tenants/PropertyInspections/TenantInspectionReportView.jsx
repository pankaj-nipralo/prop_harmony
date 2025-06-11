import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { 
  X, 
  Calendar,
  User,
  Building,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Star,
  FileText,
  Send
} from "lucide-react";

const TenantInspectionReportView = ({ open, onClose, inspection, onAddComment }) => {
  const [newComment, setNewComment] = useState("");
  const [commentType, setCommentType] = useState("general"); // "general", "dispute", "agreement"
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const comment = {
        id: Date.now(),
        comment: newComment.trim(),
        date: new Date().toISOString().split('T')[0],
        type: commentType,
        author: "Tenant"
      };

      const existingComments = inspection.tenantComments || [];
      const updatedComments = [...existingComments, comment];

      await onAddComment(inspection.id, { tenantComments: updatedComments });
      
      setNewComment("");
      setCommentType("general");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getConditionStyle = (condition) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Fair":
        return "bg-yellow-100 text-yellow-800";
      case "Poor":
        return "bg-orange-100 text-orange-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "Major":
        return "bg-orange-100 text-orange-700";
      case "Minor":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!inspection) return null;

  const hasReport = inspection.status === "Report Generated" && inspection.inspectionReport;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] bg-white border-0 rounded-lg shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {hasReport ? "Inspection Report" : "Inspection Details"}
              </h2>
              <p className="text-gray-600">
                {inspection.propertyName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {hasReport ? (
            // Full Report View
            <div className="space-y-6">
              {/* Report Summary */}
              <Card className="p-4 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
                <h3 className="mb-4 text-lg font-medium text-blue-900">
                  Inspection Report Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-blue-700">Property:</span>
                    <p className="text-blue-900">{inspection.propertyName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700">Inspector:</span>
                    <p className="text-blue-900">{inspection.inspectorName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700">Report Date:</span>
                    <p className="text-blue-900">{inspection.inspectionReport.generatedDate}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700">Overall Score:</span>
                    <span className="ml-2 text-2xl font-bold text-blue-600">
                      {inspection.inspectionReport.overallScore}/100
                    </span>
                  </div>
                </div>
              </Card>

              {/* Room Assessments */}
              {inspection.inspectionReport.roomAssessments && inspection.inspectionReport.roomAssessments.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">
                    Room-by-Room Assessment
                  </h3>
                  <div className="space-y-3">
                    {inspection.inspectionReport.roomAssessments.map((room, index) => (
                      <Card key={index} className="p-4 border-0 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800">{room.room}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">
                              Score: {room.score}/100
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionStyle(room.condition)}`}>
                              {room.condition}
                            </span>
                          </div>
                        </div>
                        <p className="mb-2 text-sm text-gray-600">{room.notes}</p>
                        
                        {/* Room Photos */}
                        {room.photos && room.photos.length > 0 && (
                          <div className="mb-4">
                            <h5 className="mb-2 text-sm font-medium text-gray-700">
                              Photos ({room.photos.length})
                            </h5>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {room.photos.map((photo, photoIndex) => (
                                <div key={photoIndex} className="relative group">
                                  <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-square">
                                    <img
                                      src={photo.url || photo}
                                      alt={photo.name || `Room photo ${photoIndex + 1}`}
                                      className="object-cover w-full h-full cursor-pointer hover:scale-105 transition-transform"
                                      onClick={() => window.open(photo.url || photo, '_blank')}
                                    />
                                  </div>
                                  {photo.name && (
                                    <p className="mt-1 text-xs text-gray-500 truncate">{photo.name}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Issues Found */}
                        {room.issues && room.issues.length > 0 && (
                          <div>
                            <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                              <AlertTriangle size={14} />
                              Issues Found:
                            </span>
                            <div className="mt-2 space-y-1">
                              {room.issues.map((issue, issueIndex) => (
                                <div key={issueIndex} className="flex items-center justify-between p-2 bg-red-50 rounded">
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(issue.severity)}`}>
                                      {issue.severity}
                                    </span>
                                    <span className="text-sm text-gray-900">{issue.description}</span>
                                  </div>
                                  <span className="text-sm text-gray-600">AED {issue.cost}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Landlord Observations and Maintenance Recommendations */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">Landlord Observations</h3>
                  <Card className="p-4 border-0 shadow-sm bg-blue-50">
                    <p className="text-sm text-gray-700">
                      {inspection.inspectionReport.landlordObservations || "No specific observations noted."}
                    </p>
                  </Card>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">Maintenance Recommendations</h3>
                  <Card className="p-4 border-0 shadow-sm bg-green-50">
                    {inspection.inspectionReport.maintenanceRecommendations && 
                     inspection.inspectionReport.maintenanceRecommendations.length > 0 ? (
                      <div className="space-y-2">
                        {inspection.inspectionReport.maintenanceRecommendations.map((rec, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                                rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {rec.priority}
                              </span>
                              <span className="text-sm text-gray-900">{rec.description}</span>
                            </div>
                            <span className="text-sm text-gray-600">AED {rec.estimatedCost}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">No specific recommendations at this time.</p>
                    )}
                  </Card>
                </div>
              </div>

              {/* Next Inspection */}
              {inspection.inspectionReport.nextInspectionRecommended && (
                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-800">Next Inspection Recommended</h3>
                  <Card className="flex items-center gap-2 p-4 border-0 shadow-sm bg-yellow-50">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Recommended for {inspection.inspectionReport.nextInspectionRecommended}
                    </span>
                  </Card>
                </div>
              )}

              {/* Tenant Comments Section */}
              <div>
                <h3 className="mb-4 text-lg font-medium text-gray-800">Your Comments & Feedback</h3>
                
                {/* Existing Comments */}
                {inspection.tenantComments && inspection.tenantComments.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {inspection.tenantComments.map((comment, index) => (
                      <Card key={index} className="p-3 border-0 shadow-sm bg-gray-50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">Your Comment</span>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.comment}</p>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Add New Comment */}
                <Card className="p-4 border-0 shadow-sm">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Your Comment
                      </label>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts about this inspection report..."
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comment Type
                      </label>
                      <select
                        value={commentType}
                        onChange={(e) => setCommentType(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="general">General Comment</option>
                        <option value="agreement">I Agree with Assessment</option>
                        <option value="dispute">I Dispute Some Findings</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim() || isSubmitting}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors myButton"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Adding...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Add Comment
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            // Basic Inspection Details (No Report Yet)
            <div className="space-y-6">
              <Card className="p-4 border-0 shadow-sm">
                <h3 className="mb-4 text-lg font-medium text-gray-800">Inspection Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Property:</span>
                    <p className="text-gray-800">{inspection.propertyName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Inspector:</span>
                    <p className="text-gray-800">{inspection.inspectorName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Type:</span>
                    <p className="text-gray-800">{inspection.inspectionType}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <p className="text-gray-800">{inspection.status}</p>
                  </div>
                </div>
                {inspection.landlordNotes && (
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-600">Purpose:</span>
                    <p className="text-gray-800">{inspection.landlordNotes}</p>
                  </div>
                )}
              </Card>

              <Card className="p-4 border-0 shadow-sm bg-blue-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">Report Not Available</h4>
                    <p className="text-sm text-blue-700">
                      The inspection report will be available once the inspection is completed.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TenantInspectionReportView;
