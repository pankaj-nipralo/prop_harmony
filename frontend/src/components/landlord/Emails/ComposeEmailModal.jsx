import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Send,
  Save,
  Paperclip,
  Plus,
  Trash2,
  User,
  Building,
  Flag,
  Type,
  FileText,
} from "lucide-react";
import {
  emailTemplates,
  emailCategories,
  priorityLevels,
  processEmailTemplate,
  getTemplateData,
} from "@/data/landlord/emails/data";
import { tenantData } from "@/data/landlord/tenant/data";

const ComposeEmailModal = ({
  open,
  onClose,
  type = "new",
  replyTo,
  onSendEmail,
}) => {
  const [emailData, setEmailData] = useState({
    to: [],
    cc: [],
    bcc: [],
    subject: "",
    body: "",
    category: "general",
    priority: "normal",
    isImportant: false,
    attachments: [],
    propertyId: null,
    propertyName: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [errors, setErrors] = useState({});
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [manualEmails, setManualEmails] = useState({
    to: "",
    cc: "",
    bcc: "",
  });
  const [attachmentFiles, setAttachmentFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Get all tenants for recipient selection
  const allTenants = tenantData.flatMap((group) => group.tenantsList);

  // Email validation utility
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if recipient already exists in the field
  const isRecipientExists = (field, email) => {
    return emailData[field].some(
      (recipient) => recipient.email.toLowerCase() === email.toLowerCase()
    );
  };

  // Add recipient with validation
  const addRecipientWithValidation = (field, recipient) => {
    if (!isValidEmail(recipient.email)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Please enter a valid email address",
      }));
      return false;
    }

    // Allow same recipient in different fields but warn if duplicate in same field
    if (isRecipientExists(field, recipient.email)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "This recipient is already added to this field",
      }));
      return false;
    }

    setEmailData((prev) => ({
      ...prev,
      [field]: [...prev[field], recipient],
    }));

    // Clear any existing errors for this field
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    return true;
  };

  // Handle manual email entry
  const handleManualEmailAdd = (field, email) => {
    if (!email.trim()) return false;

    const recipient = {
      name: email.trim(),
      email: email.trim(),
      type: "manual",
    };

    const success = addRecipientWithValidation(field, recipient);
    if (success) {
      setManualEmails((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
    return success;
  };

  // Handle tenant selection from dropdown
  const handleTenantSelect = (field, tenantId) => {
    const tenant = allTenants.find((t) => t.id.toString() === tenantId);
    if (tenant) {
      const recipient = {
        name: tenant.name,
        email: tenant.email,
        type: "tenant",
      };
      addRecipientWithValidation(field, recipient);
    }
  };

  // File size formatting utility
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Handle file selection
  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const maxFileSize = 10 * 1024 * 1024; // 10MB limit
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "text/csv",
    ];

    const validFiles = [];
    const errors = [];

    fileArray.forEach((file) => {
      if (file.size > maxFileSize) {
        errors.push(`${file.name} is too large (max 10MB)`);
      } else if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name} is not a supported file type`);
      } else {
        // Create file object with preview URL
        const fileObj = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
          url: URL.createObjectURL(file), // For preview/download
          uploadProgress: 100, // Simulate immediate upload for demo
        };
        validFiles.push(fileObj);
      }
    });

    if (errors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        attachments: errors.join(", "),
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        attachments: "",
      }));
    }

    setAttachmentFiles((prev) => [...prev, ...validFiles]);

    // Update emailData attachments
    setEmailData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles],
    }));
  };

  // Handle file removal
  const handleFileRemove = (fileId) => {
    setAttachmentFiles((prev) => {
      const updatedFiles = prev.filter((file) => file.id !== fileId);

      // Update emailData attachments
      setEmailData((prevData) => ({
        ...prevData,
        attachments: updatedFiles,
      }));

      return updatedFiles;
    });
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
    // Reset input value to allow selecting same file again
    e.target.value = "";
  };

  useEffect(() => {
    if (type === "reply" && replyTo) {
      setEmailData({
        to: [replyTo.from],
        cc: [],
        bcc: [],
        subject: replyTo.subject.startsWith("Re:")
          ? replyTo.subject
          : `Re: ${replyTo.subject}`,
        body: `\n\n--- Original Message ---\nFrom: ${replyTo.from.name} <${
          replyTo.from.email
        }>\nDate: ${new Date(replyTo.date).toLocaleString()}\nSubject: ${
          replyTo.subject
        }\n\n${replyTo.body}`,
        category: replyTo.category,
        priority: replyTo.priority,
        isImportant: false,
        attachments: [],
        propertyId: replyTo.propertyId,
        propertyName: replyTo.propertyName,
      });
    } else if (type === "forward" && replyTo) {
      setEmailData({
        to: [],
        cc: [],
        bcc: [],
        subject: replyTo.subject.startsWith("Fwd:")
          ? replyTo.subject
          : `Fwd: ${replyTo.subject}`,
        body: `\n\n--- Forwarded Message ---\nFrom: ${replyTo.from.name} <${
          replyTo.from.email
        }>\nDate: ${new Date(replyTo.date).toLocaleString()}\nSubject: ${
          replyTo.subject
        }\n\n${replyTo.body}`,
        category: replyTo.category,
        priority: replyTo.priority,
        isImportant: false,
        attachments: [...replyTo.attachments],
        propertyId: replyTo.propertyId,
        propertyName: replyTo.propertyName,
      });
    } else {
      // Reset for new email
      setEmailData({
        to: [],
        cc: [],
        bcc: [],
        subject: "",
        body: "",
        category: "general",
        priority: "normal",
        isImportant: false,
        attachments: [],
        propertyId: null,
        propertyName: "",
      });
      setAttachmentFiles([]);
    }

    // Reset manual emails and errors when modal opens/closes
    if (open) {
      setManualEmails({ to: "", cc: "", bcc: "" });
      setErrors({});
      setIsDragging(false);
    }
  }, [type, replyTo, open]);

  const handleRecipientRemove = (field, index) => {
    setEmailData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

    // Clear field errors when removing recipients
    if (emailData[field].length <= 1) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleTemplateSelect = (template) => {
    // Get the first recipient to use for template data
    const firstRecipient = emailData.to[0];
    let tenant = null;
    let property = null;

    // If we have a recipient, try to find the tenant data
    if (firstRecipient && firstRecipient.type === "tenant") {
      tenant = allTenants.find((t) => t.email === firstRecipient.email);
      if (tenant) {
        // Find property data based on tenant's address
        property = { name: emailData.propertyName || tenant.address };
      }
    }

    // Get template data for processing
    const templateData = getTemplateData(tenant, property);

    // Process the template with actual data
    const processedSubject = processEmailTemplate(
      template.subject,
      templateData
    );
    const processedBody = processEmailTemplate(template.body, templateData);

    setEmailData((prev) => ({
      ...prev,
      subject: processedSubject,
      body: processedBody,
      category: template.category,
      // Update property info if we found it
      propertyName: property?.name || prev.propertyName,
    }));

    setShowTemplates(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (emailData.to.length === 0) {
      newErrors.to = "At least one recipient is required";
    }

    if (!emailData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!emailData.body.trim()) {
      newErrors.body = "Email body is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSending(true);

    try {
      // Simulate sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onSendEmail) {
        onSendEmail(emailData);
      }

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-4 py-2 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4";
      notification.textContent = "Email sent successfully!";
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

      onClose();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveDraft = async () => {
    // Basic validation for draft (less strict than send)
    if (!emailData.subject.trim() && !emailData.body.trim()) {
      setErrors({
        general: "Please add a subject or message before saving draft",
      });
      return;
    }

    setIsSavingDraft(true);

    try {
      // Simulate saving delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Create draft email object
      const draftEmail = {
        id: Date.now(),
        threadId: `draft_${Date.now()}`,
        subject: emailData.subject || "(No Subject)",
        from: {
          name: "Property Manager",
          email: "manager@propertyharmony.com",
          type: "landlord",
        },
        to: emailData.to,
        cc: emailData.cc,
        bcc: emailData.bcc,
        body: emailData.body,
        htmlBody: emailData.body.replace(/\n/g, "<br>"),
        date: new Date().toISOString(),
        isRead: true,
        isStarred: false,
        isImportant: emailData.isImportant,
        folder: "drafts",
        labels: ["draft"],
        attachments: emailData.attachments,
        propertyId: emailData.propertyId,
        propertyName: emailData.propertyName,
        category: emailData.category,
        priority: emailData.priority,
        status: "draft",
        replyCount: 0,
        lastReplyDate: null,
      };

      // Call onSendEmail with draft data (the parent component should handle adding to drafts)
      if (onSendEmail) {
        onSendEmail(draftEmail);
      }

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed z-50 px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg top-4 right-4";
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Draft saved successfully!
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

      onClose();
    } catch (error) {
      console.error("Error saving draft:", error);
      setErrors({ general: "Failed to save draft. Please try again." });
    } finally {
      setIsSavingDraft(false);
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case "reply":
        return "Reply to Email";
      case "forward":
        return "Forward Email";
      default:
        return "Compose Email";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-5xl max-h-[90vh] overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Send className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                {getModalTitle()}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Email Templates Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-4 border-0 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Email Templates
                </h3>
                <div className="space-y-2">
                  {emailTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="w-full p-3 text-sm text-left transition-colors bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                    >
                      <div className="mb-1 font-medium text-gray-900">
                        {template.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {template.category}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Compose Form */}
            <div className="lg:col-span-3">
              <form className="space-y-4">
                {/* Recipients */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    To *
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[40px]">
                    {emailData.to.map((recipient, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 text-sm text-blue-800 bg-blue-100 rounded"
                      >
                        {recipient.name} &lt;{recipient.email}&gt;
                        <button
                          type="button"
                          onClick={() => handleRecipientRemove("to", index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <div className="flex-1 min-w-[200px] flex items-center gap-2">
                      <input
                        type="email"
                        placeholder="Type email address..."
                        value={manualEmails.to}
                        onChange={(e) =>
                          setManualEmails((prev) => ({
                            ...prev,
                            to: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === "Tab") {
                            e.preventDefault();
                            if (handleManualEmailAdd("to", manualEmails.to)) {
                              // Email added successfully
                            }
                          }
                        }}
                        onBlur={() => {
                          if (manualEmails.to.trim()) {
                            handleManualEmailAdd("to", manualEmails.to);
                          }
                        }}
                        className="flex-1 text-sm bg-transparent border-none outline-none"
                      />
                      <span className="text-sm text-gray-400">or</span>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleTenantSelect("to", e.target.value);
                            e.target.value = "";
                          }
                        }}
                        className="text-sm bg-transparent border-none outline-none cursor-pointer"
                      >
                        <option value="">Select tenant...</option>
                        {allTenants.map((tenant) => (
                          <option key={tenant.id} value={tenant.id}>
                            {tenant.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {errors.to && (
                    <p className="mt-1 text-xs text-red-600">{errors.to}</p>
                  )}
                </div>

                {/* CC/BCC Toggle */}
                {!showCcBcc && (
                  <button
                    type="button"
                    onClick={() => setShowCcBcc(true)}
                    className="text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                  >
                    Add CC/BCC
                  </button>
                )}

                {/* CC/BCC Fields */}
                {showCcBcc && (
                  <>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        CC
                      </label>
                      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[40px]">
                        {emailData.cc.map((recipient, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 text-sm text-gray-800 bg-gray-100 rounded"
                          >
                            {recipient.name} &lt;{recipient.email}&gt;
                            <button
                              type="button"
                              onClick={() => handleRecipientRemove("cc", index)}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        <input
                          type="email"
                          placeholder="Type email address..."
                          value={manualEmails.cc}
                          onChange={(e) =>
                            setManualEmails((prev) => ({
                              ...prev,
                              cc: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Tab") {
                              e.preventDefault();
                              if (handleManualEmailAdd("cc", manualEmails.cc)) {
                                // Email added successfully
                              }
                            }
                          }}
                          onBlur={() => {
                            if (manualEmails.cc.trim()) {
                              handleManualEmailAdd("cc", manualEmails.cc);
                            }
                          }}
                          className="flex-1 min-w-[200px] border-none outline-none bg-transparent"
                        />
                      </div>
                      {errors.cc && (
                        <p className="mt-1 text-xs text-red-600">{errors.cc}</p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        BCC
                      </label>
                      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[40px]">
                        {emailData.bcc.map((recipient, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 text-sm text-gray-800 bg-gray-100 rounded"
                          >
                            {recipient.name} &lt;{recipient.email}&gt;
                            <button
                              type="button"
                              onClick={() =>
                                handleRecipientRemove("bcc", index)
                              }
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        <input
                          type="email"
                          placeholder="Type email address..."
                          value={manualEmails.bcc}
                          onChange={(e) =>
                            setManualEmails((prev) => ({
                              ...prev,
                              bcc: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Tab") {
                              e.preventDefault();
                              if (
                                handleManualEmailAdd("bcc", manualEmails.bcc)
                              ) {
                                // Email added successfully
                              }
                            }
                          }}
                          onBlur={() => {
                            if (manualEmails.bcc.trim()) {
                              handleManualEmailAdd("bcc", manualEmails.bcc);
                            }
                          }}
                          className="flex-1 min-w-[200px] border-none outline-none bg-transparent"
                        />
                      </div>
                      {errors.bcc && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.bcc}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Subject */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={emailData.subject}
                    onChange={(e) => {
                      setEmailData((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }));
                      if (errors.subject) {
                        setErrors((prev) => ({ ...prev, subject: "" }));
                      }
                    }}
                    placeholder="Enter email subject..."
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Email Options */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      value={emailData.category}
                      onChange={(e) =>
                        setEmailData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {emailCategories
                        .filter((cat) => cat.value !== "all")
                        .map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <select
                      value={emailData.priority}
                      onChange={(e) =>
                        setEmailData((prev) => ({
                          ...prev,
                          priority: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {priorityLevels
                        .filter((p) => p.value !== "all")
                        .map((priority) => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="isImportant"
                      checked={emailData.isImportant}
                      onChange={(e) =>
                        setEmailData((prev) => ({
                          ...prev,
                          isImportant: e.target.checked,
                        }))
                      }
                      className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="isImportant"
                      className="text-sm text-gray-700"
                    >
                      Mark as Important
                    </label>
                  </div>
                </div>

                {/* Email Body */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <textarea
                    value={emailData.body}
                    onChange={(e) => {
                      setEmailData((prev) => ({
                        ...prev,
                        body: e.target.value,
                      }));
                      if (errors.body) {
                        setErrors((prev) => ({ ...prev, body: "" }));
                      }
                    }}
                    placeholder="Write your email message..."
                    rows={12}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      errors.body ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.body && (
                    <p className="mt-1 text-xs text-red-600">{errors.body}</p>
                  )}
                </div>

                {/* Attachments */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Attachments
                  </label>

                  {/* File Upload Area */}
                  <div
                    className={`p-4 border-2 border-dashed rounded-lg transition-colors ${
                      isDragging
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-center">
                      <Paperclip className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Drag and drop files here or{" "}
                        <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          browse
                          <input
                            type="file"
                            multiple
                            onChange={handleFileInputChange}
                            className="hidden"
                            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supported: Images, PDF, Word, Excel, Text files (Max
                        10MB each)
                      </p>
                    </div>
                  </div>

                  {/* Attachment Errors */}
                  {errors.attachments && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.attachments}
                    </p>
                  )}

                  {/* Attached Files List */}
                  {attachmentFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">
                        Attached Files ({attachmentFiles.length})
                      </h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {attachmentFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                <Paperclip
                                  size={14}
                                  className="text-blue-600"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleFileRemove(file.id)}
                              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                              title="Remove file"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* General Error Display */}
                {errors.general && (
                  <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
                    {errors.general}
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isSavingDraft}
                    className={`flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 ${
                      isSavingDraft ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Save size={16} />
                    {isSavingDraft ? "Saving..." : "Save Draft"}
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSend}
                      disabled={isSending}
                      className={`myButton flex items-center gap-2 px-6 py-2 ${
                        isSending ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Send size={16} />
                      {isSending ? "Sending..." : "Send Email"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeEmailModal;
