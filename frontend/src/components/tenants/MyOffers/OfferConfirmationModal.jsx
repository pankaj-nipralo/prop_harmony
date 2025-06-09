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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/30">
      <div className="w-full max-w-md mx-4 bg-white shadow-xl rounded-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {confirmAction.type === 'accept' ? 'Accept Offer' : 'Reject Offer'}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          <p className="mb-6 text-gray-600">
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
              className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
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
