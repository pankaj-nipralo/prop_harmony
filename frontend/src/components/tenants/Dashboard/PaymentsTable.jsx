import React from 'react';
import { DollarSign } from 'lucide-react';

const PaymentsTable = ({ payments }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Recent Rent Payments</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">Your recent payment history</p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-gray-500">
                    No payment history available
                  </td>
                </tr>
              ) : (
                payments.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{payment.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{payment.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${payment.statusColor}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{payment.method}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;
