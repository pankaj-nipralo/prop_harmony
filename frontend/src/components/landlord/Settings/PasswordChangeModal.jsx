import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PasswordChangeModal = ({
  passwordChangeModal,
  setPasswordChangeModal,
  handlePasswordChange,
  passwordData,
  setPasswordData,
}) => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const validatePassword = (password) => {
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: hasLength && hasUpper && hasLower && hasNumber && hasSpecial,
      checks: { hasLength, hasUpper, hasLower, hasNumber, hasSpecial },
    };
  };

  const passwordValidation = validatePassword(passwordData.newPassword);

  return (
    <Dialog open={passwordChangeModal} onOpenChange={setPasswordChangeModal}>
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Change Password
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordChange();
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        new: !prev.new,
                      }))
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {passwordData.newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.checks.hasLength
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={
                          passwordValidation.checks.hasLength
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.checks.hasUpper
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={
                          passwordValidation.checks.hasUpper
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        Uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.checks.hasLower
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={
                          passwordValidation.checks.hasLower
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        Lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.checks.hasNumber
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={
                          passwordValidation.checks.hasNumber
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        Number
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.checks.hasSpecial
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={
                          passwordValidation.checks.hasSpecial
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        Special character
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {passwordData.confirmPassword &&
                  passwordData.newPassword !== passwordData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">
                      Passwords do not match
                    </p>
                  )}
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={() => setPasswordChangeModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  !passwordValidation.isValid ||
                  passwordData.newPassword !== passwordData.confirmPassword
                }
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 myButton disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChangeModal;