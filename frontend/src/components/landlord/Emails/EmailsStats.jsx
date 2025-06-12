import React from "react";
import { Card } from "@/components/ui/card";
import {
  Mail,
  Inbox,
  Send,
  Clock,
  Star,
  Flag,
  TrendingUp,
  Users,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import {
  getUnreadCount,
  updateFolderCounts,
} from "@/data/landlord/emails/data";
import { useAuth } from "@/contexts/AuthContext";

const EmailsStats = ({ emails = [], currentFolder = "inbox" }) => {
  if (!emails || emails.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">No Data</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                <Mail className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const { user } = useAuth();
  const role = user?.role || "";

  // Calculate email statistics
  const totalEmails = emails.length;
  const unreadCount = getUnreadCount(emails);
  const sentEmails = emails.filter((email) => email.folder === "sent").length;
  const starredEmails = emails.filter((email) => email.isStarred).length;
  const importantEmails = emails.filter((email) => email.isImportant).length;

  // Calculate response time (average time to respond to emails)
  const respondedEmails = emails.filter(
    (email) => email.replyCount > 0 && email.lastReplyDate
  );

  const averageResponseTime =
    respondedEmails.length > 0
      ? respondedEmails.reduce((sum, email) => {
          const emailDate = new Date(email.date);
          const replyDate = new Date(email.lastReplyDate);
          const diffHours = (replyDate - emailDate) / (1000 * 60 * 60);
          return sum + diffHours;
        }, 0) / respondedEmails.length
      : 0;

  // Calculate today's emails
  const today = new Date().toDateString();
  const todayEmails = emails.filter(
    (email) => new Date(email.date).toDateString() === today
  ).length;

  // Calculate this week's emails
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weekEmails = emails.filter(
    (email) => new Date(email.date) >= oneWeekAgo
  ).length;

  // Calculate email categories breakdown
  const categoryBreakdown = emails.reduce((acc, email) => {
    acc[email.category] = (acc[email.category] || 0) + 1;
    return acc;
  }, {});

  // Calculate response rate
  const emailsRequiringResponse = emails.filter(
    (email) =>
      email.folder === "inbox" &&
      email.from.type === "tenant" &&
      !["payment", "confirmation"].includes(email.category)
  ).length;

  const responseRate =
    emailsRequiringResponse > 0
      ? ((respondedEmails.length / emailsRequiringResponse) * 100).toFixed(1)
      : "100.0";

  // Format response time
  const formatResponseTime = (hours) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    if (hours < 24) return `${Math.round(hours)}h`;
    return `${Math.round(hours / 24)}d`;
  };

  // Get trend data (comparing this week vs last week)
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const lastWeekEmails = emails.filter((email) => {
    const emailDate = new Date(email.date);
    return emailDate >= twoWeeksAgo && emailDate < oneWeekAgo;
  }).length;

  const emailTrend =
    lastWeekEmails > 0
      ? (((weekEmails - lastWeekEmails) / lastWeekEmails) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="my-10 space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Emails */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Emails</p>
              <p className="text-3xl font-bold text-blue-600">{totalEmails}</p>
              <p className="mt-1 text-xs text-gray-500">
                {todayEmails} received today
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Unread Emails */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Emails</p>
              <p className="text-3xl font-bold text-red-600">{unreadCount}</p>
              <p className="mt-1 text-xs text-gray-500">
                {totalEmails > 0
                  ? ((unreadCount / totalEmails) * 100).toFixed(1)
                  : 0}
                % of total
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
              <Inbox className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        {/* Response Rate */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-3xl font-bold text-green-600">
                {responseRate}%
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {respondedEmails.length} of {emailsRequiringResponse} responded
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Average Response Time */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Response Time
              </p>
              <p className="text-3xl font-bold text-purple-600">
                {formatResponseTime(averageResponseTime)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Based on {respondedEmails.length} responses
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Sent Emails */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sent Emails</p>
              <p className="text-2xl font-bold text-gray-900">{sentEmails}</p>
              <p className="mt-1 text-xs text-gray-500">This period</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
              <Send className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </Card>

        {/* Starred Emails */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Starred</p>
              <p className="text-2xl font-bold text-gray-900">
                {starredEmails}
              </p>
              <p className="mt-1 text-xs text-gray-500">Important emails</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        {/* Important Emails */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Important</p>
              <p className="text-2xl font-bold text-gray-900">
                {importantEmails}
              </p>
              <p className="mt-1 text-xs text-gray-500">High priority</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
              <Flag className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        {/* Weekly Trend */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Trend</p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-2xl font-bold ${
                    parseFloat(emailTrend) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {parseFloat(emailTrend) >= 0 ? "+" : ""}
                  {emailTrend}%
                </p>
                <TrendingUp
                  size={16}
                  className={`${
                    parseFloat(emailTrend) >= 0
                      ? "text-green-600"
                      : "text-red-600 rotate-180"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">vs last week</p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                parseFloat(emailTrend) >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <TrendingUp
                className={`w-6 h-6 ${
                  parseFloat(emailTrend) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Email Categories */}
        <Card className="p-6 bg-white border-0 shadow-sm rounded-2xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Email Categories
          </h3>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown)
              .filter(([category]) => {
                // Customize visibility per role
                if (role === "landlord") return true;
                if (role === "tenant") return category !== "payment"; // example: tenants don't see "payment"
                if (role === "property_manager") return category !== "lease"; // example: property managers don’t handle lease emails
                return true;
              })
              .map(([category, count]) => {
                const percentage =
                  totalEmails > 0 ? (count / totalEmails) * 100 : 0;

                const baseLabels = {
                  maintenance: "Maintenance",
                  payment: "Payment",
                  lease: "Lease",
                  inspection: "Inspection",
                  complaint: "Complaint",
                  general: "General",
                };

                const roleBasedLabels = {
                  landlord: {
                    payment: "Payment Issues",
                    inspection: "Inspection Alerts",
                  },
                  tenant: {
                    maintenance: "Maintenance Requests",
                    complaint: "My Complaints",
                  },
                  property_manager: {
                    general: "Manager Notices",
                    complaint: "Resident Complaints",
                  },
                };

                const displayLabel =
                  (roleBasedLabels[role] && roleBasedLabels[role][category]) ||
                  baseLabels[category] ||
                  category;

                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {displayLabel}
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {count}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 transition-all duration-300 bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Emails Today</span>
              <span className="text-sm font-bold text-gray-900">
                {todayEmails}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Emails This Week</span>
              <span className="text-sm font-bold text-gray-900">
                {weekEmails}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Responses Sent</span>
              <span className="text-sm font-bold text-gray-900">
                {respondedEmails.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Responses</span>
              <span className="text-sm font-bold text-orange-600">
                {emailsRequiringResponse - respondedEmails.length}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailsStats;
