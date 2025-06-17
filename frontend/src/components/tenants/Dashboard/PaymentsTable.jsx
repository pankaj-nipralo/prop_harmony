import React from 'react';
import { DollarSign } from 'lucide-react';
import DirhamSvg from '@/assets/Dirham';

const PaymentsTable = ({ payments }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <DirhamSvg className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Recent Rent Payments</h2>
        </div>
        <p className="mb-6 text-sm text-gray-600">Your recent payment history</p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-600">Date</th>
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-600">Amount</th>
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-600">Status</th>
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-600">Method</th>
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
                    <td className="px-4 py-3 text-sm text-gray-900">{payment.date}</td>
                    <td className="flex items-center gap-1 px-4 py-3 text-sm text-gray-900"><DirhamSvg size={15} color1="" /> {payment.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${payment.statusColor}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{payment.method}</td>
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
