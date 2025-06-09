import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { 
  X, 
  Download, 
  Share2, 
  Edit, 
  Trash2, 
  FileText, 
  Image, 
  Archive,
  Calendar,
  User,
  Tag,
  Building,
  Eye,
  Copy,
  ExternalLink
} from "lucide-react";
import { 
  formatFileSize, 
  getFileIcon, 
  getFileTypeColor, 
  isImageFile, 
  isPreviewable 
} from "@/data/landlord/documents/data";

const DocumentViewModal = ({ 
  open, 
  onClose, 
  document, 
  onEdit, 
  onDelete, 
  onDownload, 
  onShare 
}) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [shareSettings, setShareSettings] = useState({
    expiryDate: "",
    allowDownload: true,
    requirePassword: false,
    password: ""
  });

  if (!document) return null;

  const getIconComponent = (fileType) => {
    const iconName = getFileIcon(fileType);
    switch (iconName) {
      case 'Image': return Image;
      case 'Archive': return Archive;
      default: return FileText;
    }
  };

  const IconComponent = getIconComponent(document.fileType);
  const colorClass = getFileTypeColor(document.fileType);

  const handleShare = () => {
    if (onShare) {
      onShare(document, shareSettings);
    }
  };

  const copyShareLink = () => {
    if (document.shareLink) {
      navigator.clipboard.writeText(document.shareLink);
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = 'Share link copied to clipboard!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-5xl max-h-screen bg-white border-0 rounded-lg shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <IconComponent className={`w-8 h-8 ${colorClass}`} />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{document.originalName}</h2>
                <p className="text-sm text-gray-600">{document.filename}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDownload && onDownload(document)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                title="Download"
              >
                <Download size={20} />
              </button>
              <button
                onClick={() => onEdit && onEdit(document)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                title="Edit"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => onDelete && onDelete(document)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "preview"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "details"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Details
            </button>
            <button
              onClick={() => setActiveTab("sharing")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "sharing"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Share2 className="w-4 h-4 inline mr-2" />
              Sharing
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "preview" && (
            <Card className="p-6 border-0 shadow-sm">
              {isImageFile(document.fileType) ? (
                <div className="text-center">
                  <img
                    src={document.fileUrl}
                    alt={document.originalName}
                    className="max-w-full max-h-96 mx-auto rounded-lg shadow-sm"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-center py-12">
                    <Image className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Image preview not available</p>
                  </div>
                </div>
              ) : isPreviewable(document.fileType) && document.fileType === 'pdf' ? (
                <div className="text-center">
                  <iframe
                    src={`${document.fileUrl}#toolbar=0`}
                    className="w-full h-96 border border-gray-200 rounded-lg"
                    title={document.originalName}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <IconComponent className={`w-16 h-16 mx-auto mb-4 ${colorClass}`} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Preview not available
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This file type cannot be previewed in the browser
                  </p>
                  <button
                    onClick={() => onDownload && onDownload(document)}
                    className="myButton px-4 py-2"
                  >
                    <Download size={18} className="mr-2" />
                    Download to View
                  </button>
                </div>
              )}
            </Card>
          )}

          {activeTab === "details" && (
            <div className="space-y-6">
              {/* File Information */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">File Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">File Name</p>
                        <p className="text-sm text-gray-900">{document.filename}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Archive className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">File Size</p>
                        <p className="text-sm text-gray-900">{formatFileSize(document.fileSize)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Category</p>
                        <p className="text-sm text-gray-900">{document.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Property</p>
                        <p className="text-sm text-gray-900">{document.propertyName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Upload Date</p>
                        <p className="text-sm text-gray-900">{new Date(document.uploadDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Uploaded By</p>
                        <p className="text-sm text-gray-900">{document.uploadedBy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Additional Details */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Details</h3>
                <div className="space-y-4">
                  {document.description && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                      <p className="text-sm text-gray-900">{document.description}</p>
                    </div>
                  )}
                  {document.tags && document.tags.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {document.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {document.expiryDate && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Expiry Date</p>
                      <p className="text-sm text-gray-900">{new Date(document.expiryDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Download Count</p>
                    <p className="text-sm text-gray-900">{document.downloadCount} times</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "sharing" && (
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Document Sharing</h3>
              
              {document.isShared ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Share2 className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Document is currently shared</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={document.shareLink}
                        readOnly
                        className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={copyShareLink}
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => window.open(document.shareLink, '_blank')}
                        className="px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
                    {document.shareExpiry && (
                      <p className="text-xs text-green-600 mt-2">
                        Expires on: {new Date(document.shareExpiry).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">Create a shareable link for this document</p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        value={shareSettings.expiryDate}
                        onChange={(e) => setShareSettings(prev => ({ ...prev, expiryDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="allowDownload"
                        checked={shareSettings.allowDownload}
                        onChange={(e) => setShareSettings(prev => ({ ...prev, allowDownload: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="allowDownload" className="text-sm text-gray-700">
                        Allow download
                      </label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="requirePassword"
                        checked={shareSettings.requirePassword}
                        onChange={(e) => setShareSettings(prev => ({ ...prev, requirePassword: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="requirePassword" className="text-sm text-gray-700">
                        Require password
                      </label>
                    </div>
                    
                    {shareSettings.requirePassword && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          value={shareSettings.password}
                          onChange={(e) => setShareSettings(prev => ({ ...prev, password: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter password"
                        />
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={handleShare}
                    className="myButton px-4 py-2"
                  >
                    <Share2 size={18} className="mr-2" />
                    Create Share Link
                  </button>
                </div>
              )}
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewModal;
