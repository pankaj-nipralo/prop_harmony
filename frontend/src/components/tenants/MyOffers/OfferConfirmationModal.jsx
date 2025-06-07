import React from 'react';
import { XCircle } from 'lucide-react';

const OfferConfirmationModal = ({ 
  showModal, 
  confirmAction, 
  onClose, 
  onConfirm 
}) => {
  if (!showModal || !confirmAction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {confirmAction.type === 'accept' ? 'Accept Offer' : 'Reject Offer'}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to {confirmAction.type} the offer for{' '}
            <span className="font-medium">{confirmAction.propertyName}</span>?
            {confirmAction.type === 'accept' && (
              <span className="block mt-2 text-sm text-green-600">
                This action will finalize your acceptance of the counter offer.
              </span>
            )}
            {confirmAction.type === 'reject' && (
              <span className="block mt-2 text-sm text-red-600">
                This action cannot be undone.
              </span>
            )}
          </p>
          <div className="flex gap-3">
            <button 
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors font-medium ${
                confirmAction.type === 'accept' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {confirmAction.type === 'accept' ? 'Accept Offer' : 'Reject Offer'}
            </button>
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferConfirmationModal;
