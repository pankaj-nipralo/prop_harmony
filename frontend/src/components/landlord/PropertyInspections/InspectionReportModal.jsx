import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Camera,
  Plus,
  Trash2,
  Star,
  AlertTriangle,
  CheckCircle,
  Upload,
  Save,
  FileText,
  Image,
  File,
} from "lucide-react";
import {
  inspectionAreas,
  conditionLevels,
  issueSeverityLevels,
} from "@/data/landlord/propertyInspection/data";

const InspectionReportModal = ({ open, onClose, inspection, onSaveReport }) => {
  const fileInputRefs = useRef({});

  // Initialize fresh report data for each inspection - fixes data persistence bug
  const getInitialReportData = () => ({
    overallScore: 85,
    roomAssessments: [
      {
        room: "",
        condition: "Good",
        score: 85,
        issues: [],
        photos: [], // Fresh empty array for each new inspection
        notes: "",
        customRoomName: "",
      },
    ],
    maintenanceRecommendations: [],
    landlordObservations: "",
    nextInspectionRecommended: "",
  });

  const [reportData, setReportData] = useState(getInitialReportData);

  // Reset report data when modal opens - ensures data isolation between inspections
  useEffect(() => {
    if (open && inspection) {
      setReportData(getInitialReportData());
      // Clear file input refs to prevent cross-contamination
      fileInputRefs.current = {};
    }
  }, [open, inspection?.id]);

  const [newIssue, setNewIssue] = useState({
    severity: "Minor",
    description: "",
    cost: 0,
  });

  const [newRecommendation, setNewRecommendation] = useState({
    priority: "Medium",
    description: "",
    estimatedCost: 0,
  });

  const addRoomAssessment = () => {
    setReportData((prev) => ({
      ...prev,
      roomAssessments: [
        ...prev.roomAssessments,
        {
          room: "",
          condition: "Good",
          score: 85,
          issues: [],
          photos: [],
          notes: "",
          customRoomName: "",
        },
      ],
    }));
  };

  const updateRoomAssessment = (index, field, value) => {
    setReportData((prev) => ({
      ...prev,
      roomAssessments: prev.roomAssessments.map((room, i) =>
        i === index ? { ...room, [field]: value } : room
      ),
    }));
  };

  const addIssueToRoom = (roomIndex) => {
    if (!newIssue.description.trim()) return;

    setReportData((prev) => ({
      ...prev,
      roomAssessments: prev.roomAssessments.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              issues: [...room.issues, { ...newIssue, id: Date.now() }],
            }
          : room
      ),
    }));

    setNewIssue({ severity: "Minor", description: "", cost: 0 });
  };

  const removeIssueFromRoom = (roomIndex, issueId) => {
    setReportData((prev) => ({
      ...prev,
      roomAssessments: prev.roomAssessments.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              issues: room.issues.filter((issue) => issue.id !== issueId),
            }
          : room
      ),
    }));
  };

  const addMaintenanceRecommendation = () => {
    if (!newRecommendation.description.trim()) return;

    setReportData((prev) => ({
      ...prev,
      maintenanceRecommendations: [
        ...prev.maintenanceRecommendations,
        { ...newRecommendation, id: Date.now() },
      ],
    }));

    setNewRecommendation({
      priority: "Medium",
      description: "",
      estimatedCost: 0,
    });
  };

  const removeMaintenanceRecommendation = (id) => {
    setReportData((prev) => ({
      ...prev,
      maintenanceRecommendations: prev.maintenanceRecommendations.filter(
        (rec) => rec.id !== id
      ),
    }));
  };

  const removeRoomAssessment = (index) => {
    setReportData((prev) => ({
      ...prev,
      roomAssessments: prev.roomAssessments.filter((_, i) => i !== index),
    }));
  };

  // Photo upload functions - Fixed for immediate preview and proper room isolation
  const handlePhotoUpload = (roomIndex, files) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    if (validFiles.length === 0) {
      alert("Please select valid image files (JPG, PNG, GIF) under 5MB each.");
      return;
    }

    // Process files and store in localStorage
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = {
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          url: e.target.result, // Base64 string
          name: file.name,
          size: file.size,
          type: file.type,
        };

        // Save to localStorage
        const storageKey = `inspection_${inspection.id}_room_${roomIndex}_photos`;
        const existingPhotos = JSON.parse(
          localStorage.getItem(storageKey) || "[]"
        );
        localStorage.setItem(
          storageKey,
          JSON.stringify([...existingPhotos, photoData])
        );

        // Update React state
        setReportData((prev) => ({
          ...prev,
          roomAssessments: prev.roomAssessments.map((room, i) =>
            i === roomIndex
              ? { ...room, photos: [...(room.photos || []), photoData] }
              : room
          ),
        }));
      };
      reader.readAsDataURL(file); // Convert to base64
    });

    // Clear file input
    if (fileInputRefs.current[roomIndex]) {
      fileInputRefs.current[roomIndex].value = "";
    }
  };

  useEffect(() => {
  if (open && inspection) {
    const initialReportData = getInitialReportData();
    
    // Load photos from localStorage for each room
    const roomAssessmentsWithPhotos = initialReportData.roomAssessments.map((room, index) => {
      const storageKey = `inspection_${inspection.id}_room_${index}_photos`;
      const savedPhotos = JSON.parse(localStorage.getItem(storageKey)) || [];
      return { ...room, photos: savedPhotos };
    });

    setReportData({ ...initialReportData, roomAssessments: roomAssessmentsWithPhotos });
  }
}, [open, inspection?.id]);

 const removePhoto = (roomIndex, photoId) => {
  setReportData(prev => {
    const updatedRoomAssessments = prev.roomAssessments.map((room, i) => {
      if (i === roomIndex) {
        const updatedPhotos = (room.photos || []).filter(photo => photo.id !== photoId);
        
        // Update localStorage
        const storageKey = `inspection_${inspection.id}_room_${roomIndex}_photos`;
        localStorage.setItem(storageKey, JSON.stringify(updatedPhotos));
        
        return { ...room, photos: updatedPhotos };
      }
      return room;
    });

    return { ...prev, roomAssessments: updatedRoomAssessments };
  });
};

  const triggerFileInput = (roomIndex) => {
    if (fileInputRefs.current[roomIndex]) {
      fileInputRefs.current[roomIndex].click();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const calculateOverallScore = () => {
    if (reportData.roomAssessments.length === 0) return 0;
    const totalScore = reportData.roomAssessments.reduce(
      (sum, room) => sum + (room.score || 0),
      0
    );
    return Math.round(totalScore / reportData.roomAssessments.length);
  };

  const handleSaveReport = () => {
    // Process room assessments to use custom room names when "Other" is selected
    const processedRoomAssessments = reportData.roomAssessments.map((room) => ({
      ...room,
      room: room.room === "Other" ? room.customRoomName : room.room,
    }));

    const finalReport = {
      ...reportData,
      roomAssessments: processedRoomAssessments,
      id: Date.now(),
      generatedDate: new Date().toISOString().split("T")[0],
      generatedBy: "Property Manager",
      overallScore: calculateOverallScore(),
    };

    onSaveReport(inspection.id, finalReport);
    onClose();
  };

  const getConditionColor = (condition) => {
    const conditionObj = conditionLevels.find((c) => c.value === condition);
    return conditionObj
      ? `${conditionObj.bgColor} ${conditionObj.textColor}`
      : "bg-gray-100 text-gray-700";
  };

  const getSeverityColor = (severity) => {
    const severityObj = issueSeverityLevels.find((s) => s.value === severity);
    return severityObj
      ? `${severityObj.bgColor} ${severityObj.textColor}`
      : "bg-gray-100 text-gray-700";
  };

  if (!inspection) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-4xl max-h-[90vh] bg-white border-0 rounded-lg shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Generate Inspection Report
              </h2>
              <p className="text-gray-600">
                {inspection.propertyName} - {inspection.tenantName}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Overall Score */}
            <Card className="p-4 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    Overall Property Score
                  </h3>
                  <p className="text-blue-700">
                    Calculated from all room assessments
                  </p>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {calculateOverallScore()}/100
                </div>
              </div>
            </Card>

            {/* Room Assessments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Room-by-Room Assessment
                </h3>
                <button
                  onClick={addRoomAssessment}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 myButton"
                >
                  <Plus className="w-4 h-4" />
                  Add Room
                </button>
              </div>

              <div className="space-y-4">
                {reportData.roomAssessments.map((room, roomIndex) => (
                  <Card key={roomIndex} className="p-4 border-0 shadow-sm">
                    <div className="space-y-4">
                      {/* Room Header */}
                      <div className="flex items-center justify-between">
                        <div className="grid flex-1 grid-cols-3 gap-4">
                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Room/Area
                            </label>
                            <select
                              value={room.room}
                              onChange={(e) => {
                                updateRoomAssessment(
                                  roomIndex,
                                  "room",
                                  e.target.value
                                );
                                if (e.target.value !== "Other") {
                                  updateRoomAssessment(
                                    roomIndex,
                                    "customRoomName",
                                    ""
                                  );
                                }
                              }}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select room...</option>
                              {inspectionAreas.map((area) => (
                                <option key={area} value={area}>
                                  {area}
                                </option>
                              ))}
                              <option value="Other">Other (Custom)</option>
                            </select>

                            {/* Custom Room Name Input */}
                            {room.room === "Other" && (
                              <input
                                type="text"
                                placeholder="Enter custom room/area name..."
                                value={room.customRoomName}
                                onChange={(e) =>
                                  updateRoomAssessment(
                                    roomIndex,
                                    "customRoomName",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 mt-2 text-sm border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                              />
                            )}
                          </div>
                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Condition
                            </label>
                            <select
                              value={room.condition}
                              onChange={(e) =>
                                updateRoomAssessment(
                                  roomIndex,
                                  "condition",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {conditionLevels.map((level) => (
                                <option key={level.value} value={level.value}>
                                  {level.value}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Score (0-100)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={room.score}
                              onChange={(e) =>
                                updateRoomAssessment(
                                  roomIndex,
                                  "score",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeRoomAssessment(roomIndex)}
                          className="p-2 ml-4 text-red-600 transition-colors rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Room Notes */}
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          value={room.notes}
                          onChange={(e) =>
                            updateRoomAssessment(
                              roomIndex,
                              "notes",
                              e.target.value
                            )
                          }
                          placeholder="General observations about this room..."
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Issues */}
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-gray-900">
                          Issues Found
                        </h4>
                        <div className="space-y-2">
                          {room.issues.map((issue) => (
                            <div
                              key={issue.id}
                              className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(
                                    issue.severity
                                  )}`}
                                >
                                  {issue.severity}
                                </span>
                                <span className="text-sm text-gray-900">
                                  {issue.description}
                                </span>
                                <span className="text-sm text-gray-600">
                                  AED {issue.cost}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  removeIssueFromRoom(roomIndex, issue.id)
                                }
                                className="p-1 text-red-600 rounded hover:bg-red-100"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}

                          {/* Add Issue Form */}
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50">
                            <select
                              value={newIssue.severity}
                              onChange={(e) =>
                                setNewIssue((prev) => ({
                                  ...prev,
                                  severity: e.target.value,
                                }))
                              }
                              className="px-2 py-1 text-xs border border-gray-300 rounded"
                            >
                              {issueSeverityLevels.map((level) => (
                                <option key={level.value} value={level.value}>
                                  {level.value}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              placeholder="Describe the issue..."
                              value={newIssue.description}
                              onChange={(e) =>
                                setNewIssue((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                            />
                            <input
                              type="number"
                              placeholder="Cost"
                              value={newIssue.cost}
                              onChange={(e) =>
                                setNewIssue((prev) => ({
                                  ...prev,
                                  cost: parseInt(e.target.value) || 0,
                                }))
                              }
                              className="w-20 px-2 py-1 text-xs border border-gray-300 rounded"
                            />
                            <button
                              onClick={() => addIssueToRoom(roomIndex)}
                              className="px-2 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Photo Upload Section */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Photos
                        </label>

                        {/* Hidden File Input */}
                        <input
                          type="file"
                          ref={(el) => (fileInputRefs.current[roomIndex] = el)}
                          onChange={(e) =>
                            handlePhotoUpload(roomIndex, e.target.files)
                          }
                          accept="image/jpeg,image/jpg,image/png,image/gif"
                          multiple
                          className="hidden"
                        />

                        {/* Upload Area */}
                        <div
                          onClick={() => triggerFileInput(roomIndex)}
                          className="p-4 text-center transition-colors border-2 border-blue-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50"
                        >
                          <Camera className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <p className="text-sm font-medium text-blue-600">
                            Click to upload photos
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG, PNG, GIF up to 5MB each
                          </p>
                        </div>

                        {/* Photo Previews */}
                        {room.photos && room.photos.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-sm font-medium text-gray-700">
                              Uploaded Photos ({room.photos.length})
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {room.photos.map((photo) => (
                                <div key={photo.id} className="relative group">
                                  <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-square">
                                    {photo.url ? (
                                      <img
                                        src={photo.url}
                                        alt={photo.name || "Uploaded photo"}
                                        className="object-cover w-full h-full"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src =
                                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%' y='50%' font-family='sans-serif' font-size='12' text-anchor='middle' fill='%239ca3af'%3EImage not available%3C/text%3E%3C/svg%3E";
                                        }}
                                      />
                                    ) : (
                                      <div className="flex items-center justify-center w-full h-full bg-gray-200">
                                        <File className="w-8 h-8 text-gray-400" />
                                      </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-0 group-hover:bg-opacity-30">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removePhoto(roomIndex, photo.id);
                                        }}
                                        className="p-1 text-white transition-all bg-red-600 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-700"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="mt-1">
                                    <p className="text-xs text-gray-600 truncate">
                                      {photo.name || "Uploaded image"}
                                    </p>
                                    {photo.size && (
                                      <p className="text-xs text-gray-500">
                                        {formatFileSize(photo.size)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Maintenance Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Maintenance Recommendations
                </h3>
              </div>

              <div className="space-y-3">
                {reportData.maintenanceRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          rec.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : rec.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {rec.priority}
                      </span>
                      <span className="text-sm text-gray-900">
                        {rec.description}
                      </span>
                      <span className="text-sm text-gray-600">
                        AED {rec.estimatedCost}
                      </span>
                    </div>
                    <button
                      onClick={() => removeMaintenanceRecommendation(rec.id)}
                      className="p-1 text-red-600 rounded hover:bg-red-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Add Recommendation Form */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50">
                  <select
                    value={newRecommendation.priority}
                    onChange={(e) =>
                      setNewRecommendation((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    className="px-2 py-1 text-xs border border-gray-300 rounded"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Maintenance recommendation..."
                    value={newRecommendation.description}
                    onChange={(e) =>
                      setNewRecommendation((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Cost"
                    value={newRecommendation.estimatedCost}
                    onChange={(e) =>
                      setNewRecommendation((prev) => ({
                        ...prev,
                        estimatedCost: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-20 px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                  <button
                    onClick={addMaintenanceRecommendation}
                    className="px-2 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Landlord Observations */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Overall Observations & Comments
              </label>
              <textarea
                value={reportData.landlordObservations}
                onChange={(e) =>
                  setReportData((prev) => ({
                    ...prev,
                    landlordObservations: e.target.value,
                  }))
                }
                placeholder="Provide your overall assessment and any additional observations..."
                rows={4}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Next Inspection Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Next Inspection Recommended
              </label>
              <input
                type="date"
                value={reportData.nextInspectionRecommended}
                onChange={(e) =>
                  setReportData((prev) => ({
                    ...prev,
                    nextInspectionRecommended: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReport}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 myButton"
              >
                <Save className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InspectionReportModal;
