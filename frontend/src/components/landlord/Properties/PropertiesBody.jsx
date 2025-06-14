import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Star, Home, Calendar, Plus, Building } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const defaultForm = {
  title: "",
  location: "",
  rating: "",
  status: "active",
  leaseEnd: "",
  features: "",
};

function getStatusLabel(status) {
  if (status === "active")
    return (
      <span className="px-3 py-1 mr-2 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
        active
      </span>
    );
  if (status === "pending")
    return (
      <span className="px-3 py-1 mr-2 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
        pending
      </span>
    );
  return (
    <span className="px-3 py-1 mr-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
      ended
    </span>
  );
}

const PropertiesBody = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Sunset Apartments Unit 101",
      location: "123 Main Street, Dubai Marina, Dubai",
      rating: 4.5,
      status: "active",
      leaseEnd: "2025-12-31",
      daysRemaining: 209,
      features: ["Balcony", "Parking", "Pool", "+1 more"],
    },
    {
      id: 2,
      title: "Marina View Villa",
      location: "456 Palm Street, Palm Jumeirah, Dubai",
      rating: 4.8,
      status: "pending",
      leaseEnd: "2025-06-30",
      daysRemaining: 25,
      features: ["Garden", "Private Pool", "Garage", "+1 more"],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate days remaining
    const leaseEndDate = new Date(form.leaseEnd);
    const today = new Date();
    const daysRemaining = Math.ceil(
      (leaseEndDate - today) / (1000 * 60 * 60 * 24)
    );

    const newProperty = {
      ...form,
      id: Date.now(),
      rating: parseFloat(form.rating),
      features: form.features.split(",").map((f) => f.trim()),
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
    };

    setProperties([...properties, newProperty]);
    setForm(defaultForm);
    setShowModal(false);
  };
  const { user } = useAuth();

  return (
    <div className="p-6 bg-transparent">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-3">
          <Building className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
            <p className="mt-1 text-gray-600">Manage Properties Here</p>
          </div>
        </div>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600">
              <Plus className="w-5 h-5" /> Add Property
            </button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-lg bg-white">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Add Property
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <input
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="ended">Ended</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Lease End
                </label>
                <input
                  name="leaseEnd"
                  type="date"
                  value={form.leaseEnd}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Features{" "}
                  <span className="text-xs text-gray-400">
                    (comma separated)
                  </span>
                </label>
                <input
                  name="features"
                  value={form.features}
                  onChange={handleChange}
                  placeholder="Balcony, Parking, Pool"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Add Property
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="p-6 transition-all duration-200 bg-white border border-gray-200 shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:border-blue-300 hover:scale-[1.02]"
            onClick={() => {
              if (user?.role === "property_manager") {
                navigate(`/manager/properties/${property.id}`);
              } else if (user?.role === "landlord") {
                navigate(`/landlord/properties/${property.id}`);
              }
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="flex-1 mr-2 text-lg font-bold leading-tight text-gray-900">
                {property.title}
              </h2>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-50">
                <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
                <span className="text-sm font-semibold text-yellow-600">
                  {property.rating}
                </span>
              </div>
            </div>
            <div className="flex items-center mb-3 text-sm text-gray-600">
              <Home className="w-4 h-4 mr-2 text-gray-400" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
            <div className="flex items-center justify-between p-3 mb-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {getStatusLabel(property.status)}
              </div>
              <div className="text-xs text-right text-gray-500">
                <div>{property.daysRemaining} days remaining</div>
                <div>
                  Ends{" "}
                  {new Date(property.leaseEnd).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesBody;
