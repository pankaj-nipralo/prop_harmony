import React from "react";
import { Card } from "@/components/ui/card";
import {
  ClipboardCheck,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building,
  FileText,
  MessageSquare,
} from "lucide-react";
import TenantInspectionBody from "./TenantInspectionBody";
import { useInspectionSync } from "@/hooks/useInspectionSync";

const TenantInspectionMaster = () => {
  const { inspections, updateInspection, isLoading } = useInspectionSync();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading inspections...</p>
        </div>
      </div>
    );
  }

  // Flatten all inspections for stats calculation
  const allInspections = inspections.flatMap((group) => group.inspectionsList);
  
  // Filter inspections for current tenant (in real app, filter by tenant ID)
  const tenantInspections = allInspections.filter(inspection => 
    inspection.tenantEmail === "mike.tenant@email.com" // In real app, use current user email
  );

  // Calculate statistics
  const stats = {
    total: tenantInspections.length,
    pending: tenantInspections.filter(i => i.status === "Pending Tenant Response").length,
    confirmed: tenantInspections.filter(i => ["Confirmed", "Tenant Accepted"].includes(i.status)).length,
    completed: tenantInspections.filter(i => ["Completed", "Report Generated"].includes(i.status)).length,
    needsResponse: tenantInspections.filter(i => i.status === "Pending Tenant Response").length,
  };

  return (
    <div className="min-h-screen ">
      <div className="p-6 ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <ClipboardCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Property Inspections
              </h1>
              <p className="text-gray-600">
                Manage your property inspection requests and view reports
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Total Inspections
                </p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-lg">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-sm bg-gradient-to-r from-yellow-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">
                  Needs Response
                </p>
                <p className="text-2xl font-bold text-yellow-900">{stats.needsResponse}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-200 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-sm bg-gradient-to-r from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">
                  Confirmed
                </p>
                <p className="text-2xl font-bold text-green-900">{stats.confirmed}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-green-200 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-sm bg-gradient-to-r from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">
                  Completed
                </p>
                <p className="text-2xl font-bold text-purple-900">{stats.completed}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-purple-200 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        {stats.needsResponse > 0 && (
          <Card className="p-6 mb-8 border-0 shadow-sm bg-gradient-to-r from-orange-50 to-orange-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-200 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-900">
                  Action Required
                </h3>
                <p className="text-orange-700">
                  You have {stats.needsResponse} inspection request{stats.needsResponse > 1 ? 's' : ''} waiting for your response.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-700 myButton">
                  <MessageSquare className="w-4 h-4" />
                  Respond Now
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <TenantInspectionBody 
          inspections={inspections}
          updateInspection={updateInspection}
        />
      </div>
    </div>
  );
};

export default TenantInspectionMaster;
