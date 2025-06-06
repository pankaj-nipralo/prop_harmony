import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Inbox,
  Send,
  FileText,
  Star,
  Flag,
  Trash2,
  Search,
  Filter,
  Mail,
  MailOpen,
  Paperclip,
  Calendar,
  User,
  Building,
  ChevronRight,
  Check,
  Circle,
} from "lucide-react";
import {
  emailFolders,
  getEmailsByFolder,
  searchEmails,
  filterEmails,
  formatEmailDate,
  emailCategories,
  priorityLevels,
} from "@/data/landlord/emails/data";

const EmailsBody = ({
  emails = [],
  setEmails,
  selectedEmails = [],
  setSelectedEmails,
  currentFolder = "inbox",
  setCurrentFolder,
  searchTerm = "",
  filters = {},
  setFilters,
  onViewEmail,
  onComposeEmail,
}) => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  if (!emails || emails.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center border-0 shadow-sm">
          <Mail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No emails found.</p>
        </Card>
      </div>
    );
  }

  // Get emails for current folder
  let folderEmails = getEmailsByFolder(emails, currentFolder);
  
  // Apply search and filters
  folderEmails = searchEmails(folderEmails, searchTerm);
  folderEmails = filterEmails(folderEmails, filters);

  // Sort emails by date (newest first)
  folderEmails.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get unique properties for filter
  const uniqueProperties = [...new Set(emails.map((email) => email.propertyName))];

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    if (onViewEmail) {
      onViewEmail(email);
    }
  };

  const handleEmailSelect = (emailId) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter(id => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === folderEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(folderEmails.map(email => email.id));
    }
  };

  const handleStarEmail = (emailId, e) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((email) =>
        email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
      )
    );
  };

  const handleMarkImportant = (emailId, e) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((email) =>
        email.id === emailId ? { ...email, isImportant: !email.isImportant } : email
      )
    );
  };

  const getFolderIcon = (folderId) => {
    const iconMap = {
      inbox: Inbox,
      sent: Send,
      drafts: FileText,
      starred: Star,
      important: Flag,
      trash: Trash2,
    };
    return iconMap[folderId] || Inbox;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "normal":
        return "text-blue-600";
      case "low":
        return "text-gray-600";
      default:
        return "text-gray-600";
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

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Card className="p-4 bg-white border-0 shadow-sm">
          <div className="space-y-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Folders</h3>
            
            {emailFolders.map((folder) => {
              const IconComponent = getFolderIcon(folder.id);
              const folderCount = getEmailsByFolder(emails, folder.id).length;
              const unreadCount = folder.id === "inbox" 
                ? emails.filter(e => !e.isRead && e.folder === "inbox").length 
                : 0;
              
              return (
                <button
                  key={folder.id}
                  onClick={() => setCurrentFolder(folder.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                    currentFolder === folder.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={18} />
                    <span className="font-medium">{folder.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <span className="px-2 py-1 text-xs text-white bg-red-500 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">{folderCount}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="pt-6 mt-6 border-t border-gray-200">
            <h4 className="mb-3 text-sm font-semibold text-gray-900">Filters</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={filters.category || "all"}
                  onChange={(e) => {
                    if (setFilters) {
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }));
                    }
                  }}
                  className="w-full px-2 py-1 text-sm bg-white border border-gray-200 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {emailCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Priority
                </label>
                <select
                  value={filters.priority || "all"}
                  onChange={(e) => {
                    if (setFilters) {
                      setFilters((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }));
                    }
                  }}
                  className="w-full px-2 py-1 text-sm bg-white border border-gray-200 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorityLevels.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">
                  Property
                </label>
                <select
                  value={filters.property || "all"}
                  onChange={(e) => {
                    if (setFilters) {
                      setFilters((prev) => ({
                        ...prev,
                        property: e.target.value,
                      }));
                    }
                  }}
                  className="w-full px-2 py-1 text-sm bg-white border border-gray-200 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Properties</option>
                  {uniqueProperties.map((property) => (
                    <option key={property} value={property}>
                      {property}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Email List */}
      <div className="lg:col-span-3">
        <Card className="bg-white border-0 shadow-sm">
          {/* Email List Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {currentFolder} ({folderEmails.length})
                </h2>
                {selectedEmails.length > 0 && (
                  <span className="text-sm text-blue-600">
                    {selectedEmails.length} selected
                  </span>
                )}
              </div>
              
              {folderEmails.length > 0 && (
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                >
                  {selectedEmails.length === folderEmails.length ? "Deselect All" : "Select All"}
                </button>
              )}
            </div>
          </div>

          {/* Email List */}
          <div className="divide-y divide-gray-200">
            {folderEmails.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">
                  No emails found in {currentFolder}.
                </p>
              </div>
            ) : (
              folderEmails.map((email) => {
                const isSelected = selectedEmails.includes(email.id);
                
                return (
                  <div
                    key={email.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      isSelected ? "bg-blue-50" : ""
                    } ${!email.isRead ? "bg-blue-25" : ""}`}
                    onClick={() => handleEmailClick(email)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleEmailSelect(email.id)}
                        className="mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      />

                      {/* Email Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            {/* Sender and Subject */}
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex items-center gap-1">
                                {!email.isRead && (
                                  <Circle size={8} className="text-blue-600 fill-current" />
                                )}
                                {email.isRead && (
                                  <MailOpen size={14} className="text-gray-400" />
                                )}
                              </div>
                              <span className={`text-sm ${!email.isRead ? "font-semibold" : "font-medium"} text-gray-900 truncate`}>
                                {email.from.name}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(email.category)}`}>
                                {email.category}
                              </span>
                              {email.priority === "high" && (
                                <Flag size={12} className="text-red-500" />
                              )}
                            </div>
                            
                            <h3 className={`text-sm ${!email.isRead ? "font-semibold" : ""} text-gray-900 mb-1 truncate`}>
                              {email.subject}
                            </h3>
                            
                            <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                              {email.body}
                            </p>
                            
                            {/* Email Meta */}
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Building size={12} />
                                <span>{email.propertyName}</span>
                              </div>
                              {email.attachments.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Paperclip size={12} />
                                  <span>{email.attachments.length}</span>
                                </div>
                              )}
                              {email.replyCount > 0 && (
                                <span>{email.replyCount} replies</span>
                              )}
                            </div>
                          </div>

                          {/* Actions and Date */}
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={(e) => handleStarEmail(email.id, e)}
                              className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                                email.isStarred ? "text-yellow-500" : "text-gray-400"
                              }`}
                            >
                              <Star size={16} fill={email.isStarred ? "currentColor" : "none"} />
                            </button>
                            
                            <button
                              onClick={(e) => handleMarkImportant(email.id, e)}
                              className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                                email.isImportant ? "text-orange-500" : "text-gray-400"
                              }`}
                            >
                              <Flag size={16} fill={email.isImportant ? "currentColor" : "none"} />
                            </button>
                            
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatEmailDate(email.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailsBody;
