import React from 'react';
import { ClipboardCheck } from 'lucide-react';

const InspectionHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <ClipboardCheck className="w-8 h-8 text-blue-500" />
      <h1 className="text-2xl font-bold text-gray-900">Property Inspections</h1>
    </div>
  );
};

export default InspectionHeader;
