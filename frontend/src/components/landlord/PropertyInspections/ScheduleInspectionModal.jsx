import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, X } from "lucide-react";

const ScheduleInspectionModal = ({ open, onClose, inspection, onSchedule }) => {
  const [scheduledDate, setScheduledDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSchedule && scheduledDate) {
      onSchedule(inspection.id, scheduledDate);
      setScheduledDate("");
      onClose();
    }
  };

  if (!inspection) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl max-h-[80vh] bg-white border-0 rounded-lg shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Schedule Inspection
            </h2> 
          </div>

          <div className="mb-6 space-y-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="mb-3 text-sm font-medium text-gray-700">Inspection Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Property:</span>
                  <span className="ml-2 text-gray-800">{inspection.propertyName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Tenant:</span>
                  <span className="ml-2 text-gray-800">{inspection.tenantName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Type:</span>
                  <span className="ml-2 text-gray-800">{inspection.inspectionType}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Requested Date:</span>
                  <span className="ml-2 text-gray-800">{inspection.requestedDate}</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Schedule Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
              >
                Schedule
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleInspectionModal;
