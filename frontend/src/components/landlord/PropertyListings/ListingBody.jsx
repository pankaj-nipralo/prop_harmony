import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const defaultForm = {
  title: "",
  location: "",
  price: "",
  description: "",
};

const ListingBody = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Hellooooo",
      location: "Marina View Villa",
      price: "AED 31,333/month",
      description: "sdddd",
      status: "Active",
      views: 0,
      inquiries: 0,
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      ...form,
      id: Date.now(),
      status: "Active",
      views: 0,
      inquiries: 0,
    };
    setListings([...listings, newListing]);
    setForm(defaultForm);
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">
          <i className="fa fa-list-alt" />
        </span>
        <h2 className="text-xl font-semibold">Property Listings</h2>
      </div>
      <div className="flex gap-4 mb-8">
        <div className="flex flex-col items-center flex-1 p-4 bg-white rounded-lg shadow">
          <span className="text-2xl font-bold">{listings.length}</span>
          <span className="mt-1 text-sm text-gray-500">Total Listings</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-4 bg-white rounded-lg shadow">
          <span className="text-2xl font-bold text-green-600">
            {listings.filter((l) => l.status === "Active").length}
          </span>
          <span className="mt-1 text-sm text-gray-500">Active</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-4 bg-white rounded-lg shadow">
          <span className="text-2xl font-bold text-blue-600">0</span>
          <span className="mt-1 text-sm text-gray-500">Total Views</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-4 bg-white rounded-lg shadow">
          <span className="text-2xl font-bold text-purple-600">0</span>
          <span className="mt-1 text-sm text-gray-500">Inquiries</span>
        </div>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <button className="ml-auto flex items-center gap-2 px-4 py-2 font-semibold text-white bg-[#223a5f] rounded-lg hover:bg-[#1a2e4a] transition">
              <Plus className="w-5 h-5" /> Add Listing
            </button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-lg bg-white">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Add Listing
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
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
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
                  Add Listing
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="flex flex-col gap-2 p-5 bg-white border border-gray-200 shadow-md rounded-xl"
          >
            <div className="flex items-center justify-between mb-1">
              <div>
                <div className="text-base font-semibold text-gray-900">
                  {listing.title}
                </div>
                <div className="text-xs text-gray-500">{listing.location}</div>
              </div>
              <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                Active
              </span>
            </div>
            <div className="text-lg font-bold text-[#223a5f]">
              {listing.price}
            </div>
            <div className="text-sm text-gray-700">{listing.description}</div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>{listing.views} views</span>
              <span>{listing.inquiries} inquiries</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 px-4 py-2 font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                View
              </button>
              <button className="flex-1 px-4 py-2 font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                Edit
              </button>
              <button className="flex-1 px-4 py-2 font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
                {" "}
                <i className="fa fa-trash" />{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingBody;
