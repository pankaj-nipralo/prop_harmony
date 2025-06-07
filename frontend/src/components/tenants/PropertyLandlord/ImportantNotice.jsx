import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ImportantNotice = ({ notice }) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-yellow-800 mb-1">
            {notice.title}
          </h3>
          <p className="text-sm text-yellow-700">
            {notice.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportantNotice;
