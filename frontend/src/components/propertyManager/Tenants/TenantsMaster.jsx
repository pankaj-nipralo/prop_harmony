import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Search, Filter, Phone, Mail, MapPin, Calendar } from "lucide-react";

const TenantsMaster = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample tenant data
  const tenants = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+971 50 123 4567",
      property: "Sunset Apartments #101",
      leaseStart: "2024-01-15",
      leaseEnd: "2024-12-15",
      rentAmount: "AED 3,500",
      status: "Active",
      avatar: "https://i.pravatar.cc/40?u=sarah"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+971 50 234 5678",
      property: "Marina View Villa #3",
      leaseStart: "2023-06-01",
      leaseEnd: "2024-05-31",
      rentAmount: "AED 15,000",
      status: "Active",
      avatar: "https://i.pravatar.cc/40?u=michael"
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+971 50 345 6789",
      property: "Downtown Loft #7B",
      leaseStart: "2024-03-01",
      leaseEnd: "2025-02-28",
      rentAmount: "AED 4,000",
      status: "Active",
      avatar: "https://i.pravatar.cc/40?u=emma"
    },
    {
      id: 4,
      name: "Ahmed Al Mansouri",
      email: "ahmed.mansouri@email.com",
      phone: "+971 50 456 7890",
      property: "Sunset Apartments #205",
      leaseStart: "2023-12-01",
      leaseEnd: "2024-11-30",
      rentAmount: "AED 3,800",
      status: "Lease Expiring",
      avatar: "https://i.pravatar.cc/40?u=ahmed"
    }
  ];

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Lease Expiring":
        return "bg-amber-100 text-amber-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            <h1 className="text-3xl font-semibold text-gray-900">Tenants</h1>
          </div>
          <Button className="myButton bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Tenant
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Leases</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tenants.filter(t => t.status === "Active").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tenants.filter(t => t.status === "Lease Expiring").length}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">AED 26,300</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-6 border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Tenants Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="p-6 border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={tenant.avatar}
                      alt={tenant.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(tenant.status)}`}>
                        {tenant.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{tenant.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{tenant.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{tenant.property}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lease Start:</span>
                    <span className="font-medium">{tenant.leaseStart}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lease End:</span>
                    <span className="font-medium">{tenant.leaseEnd}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Rent:</span>
                    <span className="font-medium text-blue-600">{tenant.rentAmount}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button size="sm" className="myButton bg-blue-500 hover:bg-blue-600 flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantsMaster;
