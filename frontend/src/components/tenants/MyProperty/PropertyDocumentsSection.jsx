import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

const PropertyDocumentsSection = ({ documents, onDownloadDocument }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Lease Documents</h2>
        </div>

        <div className="space-y-4">
          {documents.map((document) => (
            <div 
              key={document.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{document.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Signed on {document.signedDate}</span>
                    </div>
                    <span>{document.size}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {document.type}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDownloadDocument(document)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No documents available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDocumentsSection;
