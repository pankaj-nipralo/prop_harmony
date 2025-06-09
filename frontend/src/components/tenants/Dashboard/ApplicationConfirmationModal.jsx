import React from 'react';
import { XCircle, CheckCircle, AlertTriangle } from 'lucide-react';

const ApplicationConfirmationModal = ({ 
  showModal, 
  confirmAction, 
  onClose, 
  onConfirm,
  isLoading = false
}) => {
  if (!showModal || !confirmAction) return null;

  const getModalConfig = () => {
    switch (confirmAction.type) {
      case 'accept':
        return {
          title: 'Accept Offer',
          icon: CheckCircle,
          iconColor: 'text-green-600',
          buttonColor: 'bg-green-500 hover:bg-green-600',
          buttonText: 'Accept Offer',
          message: `Are you sure you want to accept the offer for ${confirmAction.propertyName}?`,
          subMessage: 'This action will update your application status to "Approved" and you may be contacted by the landlord to proceed with the lease agreement.'
        };
      case 'decline':
        return {
          title: 'Decline Offer',
          icon: AlertTriangle,
          iconColor: 'text-red-600',
          buttonColor: 'bg-red-500 hover:bg-red-600',
          buttonText: 'Decline Offer',
          message: `Are you sure you want to decline the offer for ${confirmAction.propertyName}?`,
          subMessage: 'This action will update your application status to "Rejected" and cannot be undone.'
        };
      default:
        return {
          title: 'Confirm Action',
          icon: AlertTriangle,
          iconColor: 'text-blue-600',
          buttonColor: 'bg-blue-500 hover:bg-blue-600',
          buttonText: 'Confirm',
          message: 'Are you sure you want to proceed?',
          subMessage: ''
        };
    }
  };

  const config = getModalConfig();
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/30">
      <div className="w-full max-w-md mx-4 bg-white border-0 shadow-xl rounded-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
              <h3 className="text-lg font-semibold text-gray-900">
                {config.title}
              </h3>
            </div>
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="mb-2 text-gray-700">
              {config.message}
            </p>
            {config.subMessage && (
              <p className="text-sm text-gray-500">
                {config.subMessage}
              </p>
            )}
            {confirmAction.counterOffer && (
              <div className="p-3 mt-3 rounded-lg bg-blue-50">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Counter Offer:</span> {confirmAction.counterOffer}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button 
              onClick={onConfirm}
              disabled={isLoading}
              className={`myButton flex-1 px-4 py-2 text-white rounded-lg transition-colors font-medium ${config.buttonColor} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  Processing...
                </>
              ) : (
                config.buttonText
              )}
            </button>
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg myButton hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationConfirmationModal;
