import { Shield } from "lucide-react";

export const VerificationBanner = ({
  isVerified,
  verificationCode,
  setVerificationCode,
  handleVerification,
  handleResendCode,
}) => {
  if (isVerified) return null;

  return (
    <div className="p-6 border-0 border-l-4 rounded-lg shadow-sm bg-yellow-50 border-l-yellow-400">
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="mb-2 font-semibold text-yellow-800">
            Verify your identity to access protected content
          </h3>
          <p className="mb-4 text-sm text-yellow-700">
            Enter the 6-digit verification code sent to your registered device
          </p>
          <p className="mb-4 text-xs text-yellow-600">
            Demo: Use "123456" as the OTP for testing
          </p>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="px-3 py-2 bg-white border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              maxLength={6}
            />
            <button
              onClick={handleVerification}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-yellow-600 rounded-lg hover:bg-yellow-700"
            >
              Verify
            </button>
            <button
              onClick={handleResendCode}
              className="px-4 py-2 text-sm font-medium text-yellow-600 transition-colors bg-white border border-yellow-600 rounded-lg hover:bg-yellow-50"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
