import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react';

const EmergencyContact = ({ emergency }) => {
  const handleEmergencyCall = () => {
    window.location.href = `tel:${emergency.phone}`;
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-red-900 mb-2">
            {emergency.title}
          </h2>
          <p className="text-sm text-red-700 mb-4">
            {emergency.description}
          </p>
          
          <button
            onClick={handleEmergencyCall}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            {emergency.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
