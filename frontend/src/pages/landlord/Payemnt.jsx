import React, { Suspense } from "react";

// Lazy load the PaymentsMaster component to catch any loading errors
const PaymentsMaster = React.lazy(() =>
  import("@/components/landlord/Payments/PaymentsMaster").catch((error) => {
    console.error("Error loading PaymentsMaster:", error);
    // Return a fallback component
    return {
      default: () => (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Payment Management
              </h1>
              <p className="text-red-600">
                Error loading payment system. Please refresh the page.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="myButton"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    };
  })
);

const Payemnt = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Payment Management
              </h1>
              <p className="text-gray-600">Loading payment system...</p>
              <div className="mt-4">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <PaymentsMaster />
    </Suspense>
  );
};

export default Payemnt;
