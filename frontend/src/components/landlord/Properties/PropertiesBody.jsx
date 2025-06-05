import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Star, Home, MapPin, Calendar, Plus } from "lucide-react";

const statusColorMap = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  ended: "bg-gray-100 text-gray-700",
};

const featureColor =
  "bg-[#5c7290] text-white/90 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2 inline-block";

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
    const daysRemaining = Math.ceil((leaseEndDate - today) / (1000 * 60 * 60 * 24));
    
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

  return (
    <div className="mx-auto bg-transparent">
      <div className="flex items-center justify-between w-full mb-6">
        <h1 className="text-xl font-semibold text-gray-900">My Properties</h1>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-[#223a5f] rounded-lg hover:bg-[#1a2e4a] transition">
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
                  className="px-4 py-2 font-semibold text-white bg-[#223a5f] rounded-lg hover:bg-[#1a2e4a]"
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
            className="p-5 transition bg-white border border-gray-200 shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:border-blue-200"
            onClick={() => navigate(`/landlord/properties/${property.id}`)}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold leading-tight text-gray-900">
                {property.title}
              </h2>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
                <span className="text-sm font-semibold text-yellow-600">
                  {property.rating}
                </span>
              </div>
            </div>
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <Home className="w-4 h-4 mr-1 text-gray-400" />
              {property.location}
            </div>
            <div className="flex items-center mb-2 text-xs text-gray-500">
              <Calendar className="w-4 h-4 mr-1 text-gray-400" />
              {getStatusLabel(property.status)}
              <span className="mr-2">
                {property.daysRemaining} days remaining
              </span>
              <span className="ml-auto">
                Ends{" "}
                {new Date(property.leaseEnd).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {property.features.map((feature, idx) => (
                <span key={idx} className={featureColor}>
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