import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const LeaseExpirationsTable = ({ data }) => {
  return (
    <Card className="bg-white border-0 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <CardTitle className="text-lg font-semibold text-gray-800">Upcoming Lease Expirations</CardTitle>
        </div>
        <p className="text-sm text-gray-500">Leases expiring in the next 30 days</p>
      </CardHeader>
      <CardContent>
        {data.leaseExpirations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Tenant</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Property</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Landlord</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Expiry Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.leaseExpirations.map((lease, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{lease.tenant}</td>
                    <td className="px-4 py-3 text-gray-700">{lease.property}</td>
                    <td className="px-4 py-3 text-gray-700">{lease.landlord}</td>
                    <td className="px-4 py-3 text-gray-700">{lease.expiryDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lease.status === "Pending Renewal" 
                          ? "bg-amber-100 text-amber-800" 
                          : lease.status === "Not Renewing" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {lease.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400 text-base">
            No upcoming lease expirations
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaseExpirationsTable;