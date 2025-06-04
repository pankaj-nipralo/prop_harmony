import { IndianRupee , Home, MapPin, Users, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { propertiesData } from "@/data/landlord/dashboard/data";

const statusColorMap = {
  occupied: "bg-green-100 text-green-700",
  available: "bg-gray-100 text-gray-700",
};

const DashboardProperties = () => {
  const [properties, setProperties] = useState(propertiesData);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    location: "",
    bedrooms: "",
    rent: "",
    status: "available",
  });

  const addNewProperty = () => {
    setProperties((prev) => [
      ...prev,
      {
        ...form,
        id: prev.length + 1,
        bedrooms: parseInt(form.bedrooms),
      },
    ]);
    setForm({
      title: "",
      location: "",
      bedrooms: "",
      rent: "",
      status: "available",
    });
    setDialogOpen(false);
  };

  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-md ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <Home className="w-6 h-6" />
          Properties Overview
        </h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center px-4 py-2 text-white bg-[#324867] cursor-pointer rounded-lg hover:bg-[#3f5c88]">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>

          {/* Custom Dialog Implementation */}
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
              dialogOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setDialogOpen(false)}
            />

            {/* Dialog Content */}
            <div className="relative z-10 w-full max-w-md mx-4 transition-all transform bg-white shadow-xl rounded-xl">
              {/* Header */}
              <div className="px-6 pt-6 pb-2 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add New Property
                </h3>
              </div>

              {/* Form Content */}
              <div className="px-6 py-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f5c88]"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f5c88]"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f5c88]"
                    value={form.bedrooms}
                    onChange={(e) =>
                      setForm({ ...form, bedrooms: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Rent
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f5c88]"
                    value={form.rent}
                    onChange={(e) => setForm({ ...form, rent: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f5c88]"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end px-6 py-4 space-x-3 bg-gray-50 rounded-b-xl">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3f5c88]"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#324867] border border-transparent rounded-md hover:bg-[#3f5c88] focus:outline-none focus:ring-2 focus:ring-[#3f5c88]"
                  onClick={addNewProperty}
                >
                  Save Property
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="w-full p-4 bg-white border border-gray-200 shadow-sm rounded-2xl"
          >
            <div className="justify-between flexitems-start">
              <h2 className="text-base font-semibold text-gray-900">
                {property.title}
              </h2>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                  statusColorMap[property.status]
                }`}
              >
                {property.status}
              </span>
            </div>

            <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {property.location}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                {property.bedrooms}{" "}
                {property.bedrooms > 1 ? "bedrooms" : "bedroom"}
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee  className="w-4 h-4 text-gray-400" />
                AED {property.rent}/month
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardProperties;
