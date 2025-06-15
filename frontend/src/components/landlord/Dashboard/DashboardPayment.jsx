import React from "react";
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const paymentStats = [
  {
    label: "Collected",
    value: "AED 8,500",
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Pending",
    value: "AED 0",
    icon: <CreditCard className="w-5 h-5 text-yellow-500" />,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    label: "Overdue",
    value: "AED 0",
    icon: <TrendingDown className="w-5 h-5 text-red-500" />,
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

const recentPayments = [
  {
    property: "123 Main Street, Apt 4B",
    tenant: "Michael Davis",
    amount: "AED 1,450",
    date: "2025-05-20",
    status: "Paid",
  },
  {
    property: "456 Oak Avenue, Apt 2A",
    tenant: "Jennifer Smith",
    amount: "AED 1,650",
    date: "2025-05-19",
    status: "Paid",
  },
  {
    property: "789 Pine Road, Apt 7C",
    tenant: "Robert Brown",
    amount: "AED 1,350",
    date: "2025-05-18",
    status: "Pending",
  },
  {
    property: "101 Cedar Lane, Apt 1D",
    tenant: "Emily Johnson",
    amount: "AED 1,550",
    date: "2025-05-17",
    status: "Paid",
  },
];

const statusBadge = (status) => {
  if (status === "Paid")
    return (
      <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
        Paid
      </span>
    );
  if (status === "Pending")
    return (
      <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
        Pending
      </span>
    );
  return (
    <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
      {status}
    </span>
  );
};

const DashboardPayment = () => {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-3">
        {paymentStats.map((stat) => (
          <Card
            key={stat.label}
            className="flex flex-col bg-white border-0 shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="font-sans text-xs font-semibold text-gray-500 md:text-sm">
                  {stat.label}
                </CardTitle>
                <div
                  className={`mt-1 text-lg md:text-xl font-bold ${stat.color} font-sans`}
                >
                  {stat.value}
                </div>
              </div>
              <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Recent Payments Table */}
      <Card className="bg-white border-0 shadow-md">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <IndianRupee className="w-5 h-5 text-gray-400" />
          <CardTitle className="font-sans text-base font-semibold text-gray-800 md:text-lg">
            Recent Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm text-left text-gray-700">
                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Property
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPayments.map((payment, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition-colors duration-150`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.property}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.tenant}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {payment.date}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${statusBadge(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400 text-base">
              No payment records found
            </div>
          )}
        </CardContent>

      </Card>
    </div>
  );
};

export default DashboardPayment;
