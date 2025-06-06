import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Lock, Eye, EyeOff } from "lucide-react";

const DocumentPasswordModal = ({ 
  open, 
  onClose, 
  onPasswordVerified, 
  documentName,
  folderName 
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError("Please enter the password");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // Simulate password verification delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call the verification callback
      const isValid = await onPasswordVerified(password);
      
      if (isValid) {
        setPassword("");
        setError("");
        onClose();
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify password. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Password Required</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              {folderName ? (
                <>This folder "<strong>{folderName}</strong>" is password protected.</>
              ) : (
                <>This document "<strong>{documentName}</strong>" is password protected.</>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please enter the password to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter password"
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isVerifying}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  disabled={isVerifying}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <Lock size={14} />
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isVerifying}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isVerifying || !password.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  <>
                    <Lock size={16} className="mr-2" />
                    Unlock
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPasswordModal;
