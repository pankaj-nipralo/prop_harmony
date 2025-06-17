import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DollarSign,
  User,
  Home,
  Send,
  Star,
  TrendingUp,
  Briefcase,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const ApplicationModals = ({
  // Modal states
  negotiateModal,
  setNegotiateModal,
  historyModal,
  setHistoryModal,
  messageModal,
  setMessageModal,
  confirmModal,
  setConfirmModal,
  tenantInfoModal,
  setTenantInfoModal,
  
  // Form states
  negotiateAmount,
  setNegotiateAmount,
  negotiateMessage,
  setNegotiateMessage,
  chatMessage,
  setChatMessage,
  isLoading,
  
  // Data
  applications,
  
  // Functions
  submitNegotiation,
  confirmAction,
}) => {
  return (
    <>
      {/* Negotiate Modal */}
      <Dialog
        open={negotiateModal.open}
        onOpenChange={() => setNegotiateModal({ open: false, applicationId: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Counter Offer
            </h2>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitNegotiation();
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Your Counter Offer (per month)
                  </label>
                  <div className="relative">
                    <DirhamSvg className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="number"
                      value={negotiateAmount}
                      onChange={(e) => setNegotiateAmount(e.target.value)}
                      className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount"
                      min="0"
                      step="50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Message (Optional)
                  </label>
                  <textarea
                    value={negotiateMessage}
                    onChange={(e) => setNegotiateMessage(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a message to explain your counter offer..."
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setNegotiateModal({ open: false, applicationId: null })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !negotiateAmount}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 myButton disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  ) : (
                    "Submit Counter Offer"
                  )}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Modal */}
      <Dialog
        open={historyModal.open}
        onOpenChange={() => setHistoryModal({ open: false, applicationId: null })}
      >
        <DialogContent className="w-full max-w-2xl bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Negotiation History
            </h2>
            
            {historyModal.applicationId && (
              <div className="space-y-4">
                {applications
                  .find((a) => a.id === historyModal.applicationId)
                  ?.negotiationHistory.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          item.by === "tenant" ? "bg-blue-100" : "bg-green-100"
                        }`}
                      >
                        {item.by === "tenant" ? (
                          <User className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Home className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {item.by === "tenant" ? "Tenant" : "You"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString()} at{" "}
                            {new Date(item.date).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-blue-600">
                            <DirhamSvg color1="" className="mb-1 mr-1" />{item.amount.toLocaleString()}/month
                          </span>
                          {index === 0 && (
                            <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                              Initial Offer
                            </span>
                          )}
                        </div>
                        
                        {item.message && (
                          <p className="text-sm text-gray-600">{item.message}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setHistoryModal({ open: false, applicationId: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tenant Info Modal */}
      <Dialog
        open={tenantInfoModal.open}
        onOpenChange={() => setTenantInfoModal({ open: false, applicationId: null })}
      >
        <DialogContent className="w-full max-w-lg bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Tenant Information
            </h2>
            
            {tenantInfoModal.applicationId && (
              <div className="space-y-6">
                {(() => {
                  const application = applications.find(a => a.id === tenantInfoModal.applicationId);
                  if (!application) return null;
                  
                  return (
                    <>
                      {/* Basic Info */}
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                        <User className="w-12 h-12 p-3 text-gray-600 bg-white rounded-full" />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.tenantName}
                          </h3>
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-900">
                              {application.tenantRating} Rating
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{application.tenantEmail}</p>
                          <p className="text-sm text-gray-600">{application.tenantPhone}</p>
                        </div>
                      </div>

                      {/* Financial Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Credit Score</span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">
                            {application.tenantInfo.creditScore}
                          </p>
                        </div>

                        <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                          <div className="flex items-center gap-2 mb-2">
                            <DirhamSvg className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">Monthly Income</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">
                            ${application.tenantInfo.monthlyIncome.toLocaleString()}
                          </p>
                        </div>

                        <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium text-purple-800">Employment</span>
                          </div>
                          <p className="text-sm font-semibold text-purple-600">
                            {application.tenantInfo.employmentStatus}
                          </p>
                        </div>

                        <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                          <div className="flex items-center gap-2 mb-2">
                            <Home className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-medium text-orange-800">Rental History</span>
                          </div>
                          <p className="text-sm font-semibold text-orange-600">
                            {application.tenantInfo.previousRentals} Previous Rentals
                          </p>
                        </div>
                      </div>

                      {/* References */}
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-800">References</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {application.tenantInfo.references} references provided
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setTenantInfoModal({ open: false, applicationId: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog
        open={confirmModal.open}
        onOpenChange={() => setConfirmModal({ open: false, applicationId: null, action: null })}
      >
        <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              {confirmModal.action === "accept" ? "Accept Application" : "Decline Application"}
            </h2>
            <p className="mb-6 text-gray-600">
              {confirmModal.action === "accept"
                ? "Are you sure you want to accept this rental application? This action cannot be undone."
                : "Are you sure you want to decline this rental application? This action cannot be undone."}
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmModal({ open: false, applicationId: null, action: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-medium text-white transition-colors rounded-md myButton disabled:opacity-50 disabled:cursor-not-allowed ${
                  confirmModal.action === "accept"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : confirmModal.action === "accept" ? (
                  "Accept Application"
                ) : (
                  "Decline Application"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Modal */}
      <Dialog
        open={messageModal.open}
        onOpenChange={() => setMessageModal({ open: false, applicationId: null })}
      >
        <DialogContent className="w-full max-w-lg bg-white border-0 rounded-lg shadow-xl">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Message Tenant
            </h2>
            
            <div className="space-y-4">
              <div className="h-64 p-4 overflow-y-auto rounded-lg bg-gray-50">
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="max-w-xs p-3 bg-white border rounded-lg rounded-bl-none">
                      <p className="text-sm">
                        Hi! I'm excited about the property. When can we schedule a viewing?
                      </p>
                      <span className="text-xs text-gray-500">2:30 PM</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="max-w-xs p-3 text-white bg-blue-500 rounded-lg rounded-br-none">
                      <p className="text-sm">
                        Hello! Great to hear from you. How about tomorrow at 3 PM?
                      </p>
                      <span className="text-xs opacity-75">2:45 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && chatMessage.trim()) {
                      // Handle send message
                      setChatMessage("");
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (chatMessage.trim()) {
                      // Handle send message
                      setChatMessage("");
                    }
                  }}
                  disabled={!chatMessage.trim()}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 myButton disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setMessageModal({ open: false, applicationId: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationModals;
