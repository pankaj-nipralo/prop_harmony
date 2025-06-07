import React, { useState } from "react";
import {
  Mail,
  Plus,
  Search,
  Filter,
  Download,
  ChevronDown,
  Settings,
  RefreshCw,
  Archive,
  Trash2,
} from "lucide-react";

const EmailsHeader = ({
  emails = [],
  selectedEmails = [],
  onComposeEmail,
  onRefresh,
  onBulkAction,
  searchTerm,
  onSearchChange,
  filters = {},
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleBulkAction = (action) => {
    if (onBulkAction) {
      onBulkAction(action, selectedEmails);
    }
    setShowBulkActions(false);
  };

  // Calculate email stats
  const totalEmails = emails.length;
  const unreadEmails = emails.filter(email => !email.isRead && email.folder === "inbox").length;
  const importantEmails = emails.filter(email => email.isImportant).length;
  const todayEmails = emails.filter(email => {
    const today = new Date().toDateString();
    const emailDate = new Date(email.date).toDateString();
    return today === emailDate;
  }).length;

  return (
    <header className="space-y-6">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"> 
            <Mail className="w-8 h-8 text-blue-600" /> 
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Management</h1>
            <p className="mt-1 text-gray-600">
              Manage communications with tenants and property managers
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Quick Stats */}
          <div className="items-center hidden gap-6 px-6 py-3 bg-white border-0 rounded-lg shadow-sm lg:flex">
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-lg font-bold text-gray-900">{totalEmails}</span>
              </div>
              <p className="text-xs text-gray-500">Total</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-lg font-bold text-gray-900">{unreadEmails}</span>
              </div>
              <p className="text-xs text-gray-500">Unread</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-lg font-bold text-gray-900">{importantEmails}</span>
              </div>
              <p className="text-xs text-gray-500">Important</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-lg font-bold text-gray-900">{todayEmails}</span>
              </div>
              <p className="text-xs text-gray-500">Today</p>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer ${
              isRefreshing ? "animate-spin" : ""
            }`}
            title="Refresh"
          >
            <RefreshCw size={18} />
          </button>

          {/* Settings Button */}
          {/* <button className="p-2 text-gray-500 transition-colors rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-100">
            <Settings size={18} />
          </button> */}

          {/* Compose Email Button */}
          <button
            onClick={onComposeEmail}
            className="flex items-center gap-2 px-6 py-3 shadow-lg myButton hover:shadow-xl"
          >
            <Plus size={20} />
            Compose
          </button>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between p-4 bg-white border-0 rounded-lg shadow-sm">
        {/* Search */}
        <div className="flex items-center flex-1 max-w-md gap-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search emails, senders, or subjects..."
            value={searchTerm || ""}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        {/* Bulk Actions */}
        {selectedEmails.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {selectedEmails.length} email{selectedEmails.length !== 1 ? 's' : ''} selected
            </span>
            
            <div className="relative">
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                Actions
                <ChevronDown size={14} />
              </button>

              {showBulkActions && (
                <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <button
                    onClick={() => handleBulkAction("markRead")}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-50"
                  >
                    Mark as Read
                  </button>
                  <button
                    onClick={() => handleBulkAction("markUnread")}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-50"
                  >
                    Mark as Unread
                  </button>
                  <button
                    onClick={() => handleBulkAction("star")}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-50"
                  >
                    Add Star
                  </button>
                  <button
                    onClick={() => handleBulkAction("unstar")}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-50"
                  >
                    Remove Star
                  </button>
                  <div className="my-1 border-t border-gray-200"></div>
                  <button
                    onClick={() => handleBulkAction("archive")}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-50"
                  >
                    <Archive size={14} />
                    Archive
                  </button>
                  <button
                    onClick={() => handleBulkAction("delete")}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-600 cursor-pointer hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filter and Sort */}
        {selectedEmails.length === 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">Filters:</span>
            </div>
            
            <select
              value={filters.category || "all"}
              onChange={(e) => {
                // Handle category filter change
              }}
              className="px-3 py-1 text-sm border border-gray-200 rounded cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="maintenance">Maintenance</option>
              <option value="payment">Payment</option>
              <option value="lease">Lease</option>
              <option value="inspection">Inspection</option>
              <option value="complaint">Complaint</option>
            </select>

            <select
              value={filters.readStatus || "all"}
              onChange={(e) => {
                // Handle read status filter change
              }}
              className="px-3 py-1 text-sm border border-gray-200 rounded cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Emails</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>

            <select
              value={filters.priority || "all"}
              onChange={(e) => {
                // Handle priority filter change
              }}
              className="px-3 py-1 text-sm border border-gray-200 rounded cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="normal">Normal Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      {/* <div className="flex items-center justify-between p-4 bg-white border-0 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs text-red-800 transition-colors bg-red-100 rounded-full cursor-pointer hover:bg-red-200">
              Unread ({unreadEmails})
            </button>
            <button className="px-3 py-1 text-xs text-orange-800 transition-colors bg-orange-100 rounded-full cursor-pointer hover:bg-orange-200">
              Important ({importantEmails})
            </button>
            <button className="px-3 py-1 text-xs text-blue-800 transition-colors bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200">
              Maintenance ({emails.filter(e => e.category === "maintenance").length})
            </button>
            <button className="px-3 py-1 text-xs text-green-800 transition-colors bg-green-100 rounded-full cursor-pointer hover:bg-green-200">
              Today ({todayEmails})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {unreadEmails > 0 && (
              <span className="font-medium text-orange-600">
                {unreadEmails} unread email{unreadEmails !== 1 ? 's' : ''}
              </span>
            )}
            {unreadEmails === 0 && (
              <span className="font-medium text-green-600">
                All emails read
              </span>
            )}
          </span>
        </div>
      </div> */}
    </header>
  );
};

export default EmailsHeader;
