import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Reply,
  ReplyAll,
  Forward,
  Star,
  Flag,
  Trash2,
  Download,
  Paperclip,
  Calendar,
  User,
  Building,
  Mail,
  Clock,
  Tag,
  Archive,
  MoreVertical,
} from "lucide-react";
import { formatEmailDate, formatFileSize } from "@/data/landlord/emails/data";

const EmailViewModal = ({ open, onClose, email, onReply, onForward }) => {
  const [showActions, setShowActions] = useState(false);

  if (!email) return null;

  const handleDownloadAttachment = (attachment) => {
    try {
      // Create download link
      const link = document.createElement("a");

      // Handle different attachment sources
      if (attachment.url) {
        // For uploaded files with blob URLs or actual URLs
        link.href = attachment.url;
      } else if (attachment.file) {
        // For file objects, create blob URL
        link.href = URL.createObjectURL(attachment.file);
      } else {
        // Fallback for demo purposes - create a dummy file
        const dummyContent = `This is a demo file: ${attachment.name}`;
        const blob = new Blob([dummyContent], { type: "text/plain" });
        link.href = URL.createObjectURL(blob);
      }

      link.download = attachment.name;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL if created
      if (link.href.startsWith("blob:")) {
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
      }

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-4 py-2 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Downloaded: ${attachment.name}
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      console.error("Download failed:", error);

      // Show error notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-4 py-2 text-white bg-red-500 rounded-lg shadow-lg top-4 right-4";
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Download failed: ${attachment.name}
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "normal":
        return "text-blue-600 bg-blue-100";
      case "low":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      maintenance: "bg-orange-100 text-orange-800",
      payment: "bg-green-100 text-green-800",
      lease: "bg-blue-100 text-blue-800",
      inspection: "bg-purple-100 text-purple-800",
      complaint: "bg-red-100 text-red-800",
      general: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.general;
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return "🖼️";
    } else if (fileType === "application/pdf") {
      return "📄";
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return "📝";
    } else if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
      return "📊";
    } else if (fileType.startsWith("text/")) {
      return "📃";
    } else {
      return "📎";
    }
  };

  const getFileTypeColor = (fileType) => {
    if (fileType.startsWith("image/")) {
      return "bg-green-100 text-green-600";
    } else if (fileType === "application/pdf") {
      return "bg-red-100 text-red-600";
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return "bg-blue-100 text-blue-600";
    } else if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
      return "bg-emerald-100 text-emerald-600";
    } else if (fileType.startsWith("text/")) {
      return "bg-gray-100 text-gray-600";
    } else {
      return "bg-purple-100 text-purple-600";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-5xl max-h-[90vh] overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Email Details
              </h2>
            </div>
          </div>

          {/* Email Header */}
          <Card className="p-6 mb-6 border-0 shadow-sm">
            <div className="space-y-4">
              {/* Subject and Actions */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    {email.subject}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                        email.category
                      )}`}
                    >
                      {email.category}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                        email.priority
                      )}`}
                    >
                      {email.priority} priority
                    </span>
                    {email.isImportant && (
                      <span className="px-2 py-1 text-xs text-orange-800 bg-orange-100 rounded-full">
                        Important
                      </span>
                    )}
                    {email.isStarred && (
                      <Star
                        size={16}
                        className="text-yellow-500"
                        fill="currentColor"
                      />
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onReply) {
                        onReply(email);
                        onClose(); // Close the modal
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-blue-700 transition-colors bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200"
                  >
                    <Reply size={16} />
                    Reply
                  </button>
                  <button
                    onClick={() => {
                      if (onForward) {
                        onForward(email);
                        onClose(); // Close the modal
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                  >
                    <Forward size={16} />
                    Forward
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowActions(!showActions)}
                      className="p-2 text-gray-500 transition-colors rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-100"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {showActions && (
                      <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-50">
                          <Star size={14} />
                          {email.isStarred ? "Remove Star" : "Add Star"}
                        </button>
                        <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-50">
                          <Flag size={14} />
                          {email.isImportant
                            ? "Remove Important"
                            : "Mark Important"}
                        </button>
                        <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-50">
                          <Archive size={14} />
                          Archive
                        </button>
                        <div className="my-1 border-t border-gray-200"></div>
                        <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-600 cursor-pointer hover:bg-red-50">
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sender and Recipient Info */}
              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-200 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      From:
                    </span>
                    <span className="text-sm text-gray-900">
                      {email.from.name} &lt;{email.from.email}&gt;
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      To:
                    </span>
                    <span className="text-sm text-gray-900">
                      {email.to
                        .map(
                          (recipient) =>
                            `${recipient.name} <${recipient.email}>`
                        )
                        .join(", ")}
                    </span>
                  </div>
                  {email.cc.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="ml-6 text-sm font-medium text-gray-700">
                        CC:
                      </span>
                      <span className="text-sm text-gray-900">
                        {email.cc
                          .map(
                            (recipient) =>
                              `${recipient.name} <${recipient.email}>`
                          )
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Date:
                    </span>
                    <span className="text-sm text-gray-900">
                      {new Date(email.date).toLocaleString()}
                    </span>
                  </div>
                  {email.propertyName && (
                    <div className="flex items-center gap-2">
                      <Building size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Property:
                      </span>
                      <span className="text-sm text-gray-900">
                        {email.propertyName}
                      </span>
                    </div>
                  )}
                  {email.labels.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Labels:
                      </span>
                      <div className="flex gap-1">
                        {email.labels.map((label, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Email Body */}
          <Card className="p-6 mb-6 border-0 shadow-sm">
            <div className="prose max-w-none">
              {email.htmlBody ? (
                <div
                  dangerouslySetInnerHTML={{ __html: email.htmlBody }}
                  className="leading-relaxed text-gray-700"
                />
              ) : (
                <div className="leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {email.body}
                </div>
              )}
            </div>
          </Card>

          {/* Attachments */}
          {email.attachments && email.attachments.length > 0 && (
            <Card className="p-6 mb-6 border-0 shadow-sm">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                <Paperclip size={18} />
                Attachments ({email.attachments.length})
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {email.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-3 p-3 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg ${getFileTypeColor(
                        attachment.type
                      )}`}
                    >
                      {getFileIcon(attachment.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium text-gray-900 truncate"
                        title={attachment.name}
                      >
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(attachment.size)}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {attachment.type.split("/")[1] || "file"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleDownloadAttachment(attachment)}
                        className="p-2 text-gray-500 transition-colors rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                      {attachment.type.startsWith("image/") &&
                        attachment.url && (
                          <button
                            onClick={() => {
                              // Open image in new tab for preview
                              window.open(attachment.url, "_blank");
                            }}
                            className="p-2 text-gray-500 transition-colors rounded cursor-pointer hover:text-green-600 hover:bg-green-50"
                            title="Preview"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Thread Information */}
          {email.replyCount > 0 && (
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Conversation Thread
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <Mail size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {email.replyCount}{" "}
                        {email.replyCount === 1 ? "reply" : "replies"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last reply: {formatEmailDate(email.lastReplyDate)}
                      </p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                    View Thread
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Actions Footer */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={14} />
              <span>Received {formatEmailDate(email.date)}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (onReply) {
                    onReply(email);
                    onClose(); // Close the modal
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 myButton"
              >
                <Reply size={16} />
                Reply
              </button>
              <button
                onClick={() => {
                  if (onForward) {
                    onForward(email);
                    onClose(); // Close the modal
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                <Forward size={16} />
                Forward
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailViewModal;
