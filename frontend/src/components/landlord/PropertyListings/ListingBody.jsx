import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const defaultForm = {
  property: "",
  title: "",
  description: "",
  rent: "",
  deposit: "",
  minLease: "12 months",
  availableFrom: "",
  utilities: "",
  amenities: "",
  contactName: "",
  phone: "",
  email: "",
};

const DetailItem = ({ label, value, fullWidth = false }) => (
  <div className={fullWidth ? "col-span-2" : ""}>
    <div className="mb-1 text-xs text-gray-500">{label}</div>
    <div className="font-medium break-words">{value || "-"}</div>
  </div>
);

const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  options,
}) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    )}
  </div>
);

const ListingBody = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [listings, setListings] = useState([
    {
      id: 1,
      property: "Vikings Villa",
      title: "Vikings Saga Villa",
      description: "Spacious 4BR villa with private pool and marina views.",
      rent: "31333",
      deposit: "15000",
      minLease: "12 months",
      availableFrom: "2025-07-01",
      utilities: "Water, Electricity, Internet",
      amenities: "Pool, Gym, Parking",
      contactName: "Pankaj Gupta",
      phone: "+971-50-123-4567",
      email: "sp@redeye.com",
      status: "Active",
      views: 0,
      inquiries: 0,
    },
    {
      id: 2,
      property: "Sunset Apartments",
      title: "Modern 2BR Apartment",
      description: "Bright apartment with balcony, close to metro and mall.",
      rent: "8500",
      deposit: "8000",
      minLease: "6 months",
      availableFrom: "2025-08-15",
      utilities: "Water, Electricity",
      amenities: "Gym, Parking",
      contactName: "Sarah Lee",
      phone: "+971-55-987-6543",
      email: "sarah@example.com",
      status: "Active",
      views: 0,
      inquiries: 0,
    },
  ]);
  const [modalType, setModalType] = useState("create"); // create | view | edit
  const [selectedListing, setSelectedListing] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setForm(defaultForm);
    setModalType("create");
    setShowModal(true);
  };
  const openViewModal = (listing) => {
    setSelectedListing(listing);
    setModalType("view");
    setShowModal(true);
  };
  const openEditModal = (listing) => {
    setForm({
      property: listing.property || "",
      title: listing.title,
      description: listing.description,
      rent: listing.rent || listing.price || "",
      deposit: listing.deposit || "",
      minLease: listing.minLease || "12 months",
      availableFrom: listing.availableFrom || "",
      utilities: listing.utilities || "",
      amenities: listing.amenities || "",
      contactName: listing.contactName || "",
      phone: listing.phone || "",
      email: listing.email || "",
    });
    setSelectedListing(listing);
    setModalType("edit");
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "edit" && selectedListing) {
      setListings(
        listings.map((l) =>
          l.id === selectedListing.id ? { ...selectedListing, ...form } : l
        )
      );
    } else {
      setListings([
        ...listings,
        {
          ...form,
          id: Date.now(),
          status: "Active",
          views: 0,
          inquiries: 0,
        },
      ]);
    }
    setForm(defaultForm);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setListings(listings.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-2 ">
        <span className="text-xl">
          <i className="fa fa-list-alt" />
        </span>
        <h2 className="text-xl font-semibold">Property Listings</h2>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <button
              className="ml-auto cursor-pointer flex items-center gap-2 px-4 py-2 font-semibold text-white bg-[#223a5f] rounded-lg hover:bg-[#1a2e4a] transition"
              onClick={openCreateModal}
            >
              <Plus className="w-5 h-5" /> Add Listing
            </button>
          </DialogTrigger>
          <DialogContent className="w-full !max-w-3xl bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            {modalType === "view" && selectedListing ? (
              <div className="p-4 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Rental Listing Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem
                    label="Property"
                    value={selectedListing.property || "-"}
                  />
                  <DetailItem
                    label="Listing Title"
                    value={selectedListing.title}
                  />
                  <DetailItem
                    label="Monthly Rent (AED)"
                    value={selectedListing.rent || selectedListing.price}
                  />
                  <DetailItem
                    label="Security Deposit (AED)"
                    value={selectedListing.deposit}
                  />
                </div>
                <DetailItem
                  label="Description"
                  value={selectedListing.description}
                  fullWidth
                />
                <div className="grid grid-cols-3 gap-4">
                  <DetailItem
                    label="Minimum Lease"
                    value={selectedListing.minLease}
                  />
                  <DetailItem
                    label="Available From"
                    value={selectedListing.availableFrom}
                  />
                  <DetailItem
                    label="Utilities Included"
                    value={selectedListing.utilities}
                  />
                </div>
                <DetailItem
                  label="Amenities"
                  value={selectedListing.amenities}
                  fullWidth
                />

                <div className="pt-2 mt-4 border-t border-gray-200">
                  <h3 className="mb-2 font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <DetailItem
                      label="Contact Name"
                      value={selectedListing.contactName}
                    />
                    <DetailItem
                      label="Phone Number"
                      value={selectedListing.phone}
                    />
                    <DetailItem label="Email" value={selectedListing.email} />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === "edit"
                    ? "Edit Rental Listing"
                    : "Create Rental Listing"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Property *"
                      name="property"
                      type="select"
                      options={[
                        { value: "", label: "Select a property" },
                        {
                          value: "Marina View Villa",
                          label: "Marina View Villa",
                        },
                        {
                          value: "Sunset Apartments",
                          label: "Sunset Apartments",
                        },
                      ]}
                      value={form.property}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="Listing Title *"
                      name="title"
                      type="text"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g., Beautiful 2BR Apartment in Marina"
                      required
                    />
                  </div>

                  <FormField
                    label="Description"
                    name="description"
                    type="textarea"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the property features and benefits..."
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      label="Monthly Rent (AED) *"
                      name="rent"
                      type="text"
                      value={form.rent}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="Security Deposit (AED)"
                      name="deposit"
                      type="text"
                      value={form.deposit}
                      onChange={handleChange}
                    />
                    <FormField
                      label="Minimum Lease (months)"
                      name="minLease"
                      type="select"
                      options={[
                        { value: "12 months", label: "12 months" },
                        { value: "6 months", label: "6 months" },
                        { value: "3 months", label: "3 months" },
                      ]}
                      value={form.minLease}
                      onChange={handleChange}
                    />
                  </div>

                  <FormField
                    label="Available From"
                    name="availableFrom"
                    type="date"
                    value={form.availableFrom}
                    onChange={handleChange}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Utilities Included (comma separated)"
                      name="utilities"
                      type="text"
                      value={form.utilities}
                      onChange={handleChange}
                      placeholder="Water, Electricity, Internet"
                    />
                    <FormField
                      label="Amenities (comma separated)"
                      name="amenities"
                      type="text"
                      value={form.amenities}
                      onChange={handleChange}
                      placeholder="Pool, Gym, Parking"
                    />
                  </div>

                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <h3 className="mb-2 font-semibold">Contact Information</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        label="Contact Name"
                        name="contactName"
                        type="text"
                        value={form.contactName}
                        onChange={handleChange}
                        placeholder="Your name"
                      />
                      <FormField
                        label="Phone Number"
                        name="phone"
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+971-50-123-4567"
                      />
                      <FormField
                        label="Email"
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
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
                      {modalType === "edit" ? "Save Changes" : "Create Listing"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-4 pt-4 mb-4">
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
                <div className="text-xs text-gray-500">
                  {listing.property || listing.location}
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                {listing.status || "Active"}
              </span>
            </div>
            <div className="text-lg font-bold text-[#223a5f]">
              AED {listing.rent || listing.price}/month
            </div>
            <div className="text-sm text-gray-700">{listing.description}</div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>{listing.views} views</span>
              <span>{listing.inquiries} inquiries</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 px-4 py-2 font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                onClick={() => openViewModal(listing)}
              >
                View
              </button>
              <button
                className="flex-1 px-4 py-2 font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                onClick={() => openEditModal(listing)}
              >
                Edit
              </button>
              <button
                className="flex-1 px-4 py-2 font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                onClick={() => handleDelete(listing.id)}
                aria-label="Delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingBody;
