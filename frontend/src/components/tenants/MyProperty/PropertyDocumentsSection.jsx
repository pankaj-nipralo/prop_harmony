import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

const PropertyDocumentsSection = ({ documents, onDownloadDocument }) => {
  return (
    <div className="h-full bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Lease Documents</h2>
        </div>

        <div className="space-y-4">
          {documents.map((document) => (
            <div 
              key={document.id}
              className="flex items-center justify-between px-3 py-4 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
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
                    <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                      {document.type}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDownloadDocument(document)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No documents available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDocumentsSection;
