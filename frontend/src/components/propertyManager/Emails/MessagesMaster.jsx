import React, { useState } from "react";
import EmailsHeader from "../../landlord/Emails/EmailsHeader";
import EmailsStats from "../../landlord/Emails/EmailsStats";
import EmailsBody from "../../landlord/Emails/EmailsBody";
import ComposeEmailModal from "../../landlord/Emails/ComposeEmailModal";
import EmailViewModal from "../../landlord/Emails/EmailViewModal";
import { emailsData } from "@/data/landlord/emails/data";

const EmailsMaster = () => {
  const [emails, setEmails] = useState(emailsData[0]?.emailsList || []);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentFolder, setCurrentFolder] = useState("inbox");
  const [composeModal, setComposeModal] = useState({
    open: false,
    type: "new", // new, reply, forward
    replyTo: null,
  });
  const [viewModal, setViewModal] = useState({
    open: false,
    email: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    priority: "all",
    property: "all",
    readStatus: "all",
    dateFrom: "",
    dateTo: "",
  });

  const handleComposeEmail = (type = "new", replyTo = null) => {
    setComposeModal({ open: true, type, replyTo });
  };

  const handleViewEmail = (email) => {
    // Mark email as read when viewing
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
    );
    setViewModal({ open: true, email });
  };

  const handleSendEmail = (emailData) => {
    const newEmail = {
      id: Date.now(),
      threadId: emailData.threadId || `thread_${Date.now()}`,
      subject: emailData.subject,
      from: {
        name: "Property Manager",
        email: "manager@propertyharmony.com",
        type: "landlord",
      },
      to: emailData.to,
      cc: emailData.cc || [],
      bcc: emailData.bcc || [],
      body: emailData.body,
      htmlBody: emailData.htmlBody || emailData.body.replace(/\n/g, "<br>"),
      date: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      isImportant: emailData.isImportant || false,
      folder: "sent",
      labels: emailData.labels || [],
      attachments: emailData.attachments || [],
      propertyId: emailData.propertyId,
      propertyName: emailData.propertyName,
      category: emailData.category || "general",
      priority: emailData.priority || "normal",
      status: "sent",
      replyCount: 0,
      lastReplyDate: null,
    };

    setEmails((prev) => [newEmail, ...prev]);
    setComposeModal({ open: false, type: "new", replyTo: null });
  };

  const handleBulkAction = (action, emailIds) => {
    setEmails((prev) =>
      prev.map((email) => {
        if (emailIds.includes(email.id)) {
          switch (action) {
            case "markRead":
              return { ...email, isRead: true };
            case "markUnread":
              return { ...email, isRead: false };
            case "star":
              return { ...email, isStarred: true };
            case "unstar":
              return { ...email, isStarred: false };
            case "archive":
              return { ...email, folder: "archive" };
            case "delete":
              return { ...email, folder: "trash" };
            default:
              return email;
          }
        }
        return email;
      })
    );
    setSelectedEmails([]);
  };

  const handleRefresh = async () => {
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, this would fetch new emails from the server
  };

  return (
    <div className="min-h-screen p-6">
      <EmailsHeader
        emails={emails}
        selectedEmails={selectedEmails}
        onComposeEmail={() => handleComposeEmail()}
        onRefresh={handleRefresh}
        onBulkAction={handleBulkAction}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
      />

      <EmailsStats emails={emails} currentFolder={currentFolder} />

      <EmailsBody
        emails={emails}
        setEmails={setEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        currentFolder={currentFolder}
        setCurrentFolder={setCurrentFolder}
        searchTerm={searchTerm}
        filters={filters}
        setFilters={setFilters}
        onViewEmail={handleViewEmail}
        onComposeEmail={handleComposeEmail}
      />

      <ComposeEmailModal
        open={composeModal.open}
        onClose={() =>
          setComposeModal({ open: false, type: "new", replyTo: null })
        }
        type={composeModal.type}
        replyTo={composeModal.replyTo}
        onSendEmail={handleSendEmail}
      />

      <EmailViewModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, email: null })}
        email={viewModal.email}
        onReply={(email) => handleComposeEmail("reply", email)}
        onForward={(email) => handleComposeEmail("forward", email)}
      />
    </div>
  );
};

export default EmailsMaster;
