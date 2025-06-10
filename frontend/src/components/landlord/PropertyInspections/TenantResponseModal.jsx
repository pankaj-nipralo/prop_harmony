import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar,
  MessageSquare,
  AlertTriangle,
  User,
  Building
} from "lucide-react";

const TenantResponseModal = ({ open, onClose, inspection, onUpdateResponse }) => {
  const [response, setResponse] = useState("accepted");
  const [declineReason, setDeclineReason] = useState("");
  const [suggestedTimes, setSuggestedTimes] = useState([
    { date: "", time: "" }
  ]);
  const [tenantMessage, setTenantMessage] = useState("");

  const addSuggestedTime = () => {
    setSuggestedTimes(prev => [...prev, { date: "", time: "" }]);
  };

  const updateSuggestedTime = (index, field, value) => {
    setSuggestedTimes(prev => 
      prev.map((time, i) => 
        i === index ? { ...time, [field]: value } : time
      )
    );
  };

  const removeSuggestedTime = (index) => {
    setSuggestedTimes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const responseData = {
      tenantResponse: response,
      tenantResponseDate: new Date().toISOString().split('T')[0],
      tenantDeclineReason: response === "declined" ? declineReason : null,
      tenantSuggestedTimes: response === "reschedule_requested" ? 
        suggestedTimes.filter(time => time.date && time.time) : [],
      tenantMessage: tenantMessage.trim() || null
    };

    let newStatus;
    switch (response) {
      case "accepted":
        newStatus = "Tenant Accepted";
        break;
      case "declined":
        newStatus = "Tenant Declined";
        break;
      case "reschedule_requested":
        newStatus = "Reschedule Requested";
        break;
      default:
        newStatus = "Pending Tenant Response";
    }

    onUpdateResponse(inspection.id, { ...responseData, status: newStatus });
    onClose();
  };

  if (!inspection) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl max-h-[80vh] bg-white border-0 rounded-lg shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Tenant Response Simulation
              </h2>
              <p className="text-gray-600">
                Simulate tenant response to inspection request
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Inspection Details */}
          <Card className="p-4 mb-6 border-0 shadow-sm bg-blue-50">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900">{inspection.propertyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800">{inspection.tenantName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800">
                  Requested Date: {inspection.requestedDate}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-blue-900">Inspection Purpose:</p>
                <p className="text-sm text-blue-800">{inspection.landlordNotes || inspection.notes}</p>
              </div>
            </div>
          </Card>

          {/* Response Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Tenant Response</h3>

            {/* Accept Option */}
            <Card className={`p-4 border-2 cursor-pointer transition-colors ${
              response === "accepted" 
                ? "border-green-500 bg-green-50" 
                : "border-gray-200 hover:border-green-300"
            }`} onClick={() => setResponse("accepted")}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  response === "accepted" 
                    ? "border-green-500 bg-green-500" 
                    : "border-gray-300"
                }`}>
                  {response === "accepted" && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Accept Inspection</h4>
                  <p className="text-sm text-gray-600">
                    Agree to the proposed inspection date and time
                  </p>
                </div>
              </div>
            </Card>

            {/* Decline Option */}
            <Card className={`p-4 border-2 cursor-pointer transition-colors ${
              response === "declined" 
                ? "border-red-500 bg-red-50" 
                : "border-gray-200 hover:border-red-300"
            }`} onClick={() => setResponse("declined")}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  response === "declined" 
                    ? "border-red-500 bg-red-500" 
                    : "border-gray-300"
                }`}>
                  {response === "declined" && (
                    <XCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Decline Inspection</h4>
                  <p className="text-sm text-gray-600">
                    Refuse the inspection request with reason
                  </p>
                </div>
              </div>
            </Card>

            {/* Reschedule Option */}
            <Card className={`p-4 border-2 cursor-pointer transition-colors ${
              response === "reschedule_requested" 
                ? "border-orange-500 bg-orange-50" 
                : "border-gray-200 hover:border-orange-300"
            }`} onClick={() => setResponse("reschedule_requested")}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  response === "reschedule_requested" 
                    ? "border-orange-500 bg-orange-500" 
                    : "border-gray-300"
                }`}>
                  {response === "reschedule_requested" && (
                    <Clock className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Request Reschedule</h4>
                  <p className="text-sm text-gray-600">
                    Suggest alternative dates and times
                  </p>
                </div>
              </div>
            </Card>

            {/* Conditional Fields */}
            {response === "declined" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Declining *
                </label>
                <textarea
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  placeholder="Please provide a reason for declining the inspection..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            )}

            {response === "reschedule_requested" && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Suggested Alternative Times
                  </label>
                  <button
                    type="button"
                    onClick={addSuggestedTime}
                    className="px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                  >
                    Add Time
                  </button>
                </div>
                
                {suggestedTimes.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="date"
                      value={time.date}
                      onChange={(e) => updateSuggestedTime(index, 'date', e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="time"
                      value={time.time}
                      onChange={(e) => updateSuggestedTime(index, 'time', e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {suggestedTimes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSuggestedTime(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Optional Message */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                value={tenantMessage}
                onChange={(e) => setTenantMessage(e.target.value)}
                placeholder="Any additional comments or concerns..."
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={
                  (response === "declined" && !declineReason.trim()) ||
                  (response === "reschedule_requested" && !suggestedTimes.some(time => time.date && time.time))
                }
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors myButton"
              >
                Submit Response
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TenantResponseModal;
