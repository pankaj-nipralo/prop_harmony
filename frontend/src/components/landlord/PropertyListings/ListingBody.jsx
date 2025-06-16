import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Building2, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

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
      views: 1032,
      inquiries: 23,
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
      views: 1230,
      inquiries: 10,
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
    <div className="bg-transparent">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Property Listings</h1>
            <p className="mt-1 text-gray-600">
              Manage rental listings and view inquiries
            </p>
          </div>
        </div>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <button
              className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
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
                    label="Monthly Rent "
                    value={selectedListing.rent || selectedListing.price}
                  />
                  <DetailItem
                    label="Security Deposit "
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
                      label="Monthly Rent  *"
                      name="rent"
                      type="text"
                      value={form.rent}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="Security Deposit "
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
                      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
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
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <span className="text-2xl font-bold text-gray-800">{listings.length}</span>
          <span className="mt-1 text-sm text-gray-500">Total Listings</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <span className="text-2xl font-bold text-green-600">
            {listings.filter((l) => l.status === "Active").length}
          </span>
          <span className="mt-1 text-sm text-gray-500">Active</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <span className="text-2xl font-bold text-blue-600">0</span>
          <span className="mt-1 text-sm text-gray-500">Total Views</span>
        </div>
        <div className="flex flex-col items-center flex-1 p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <span className="text-2xl font-bold text-purple-600">0</span>
          <span className="mt-1 text-sm text-gray-500">Inquiries</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="flex flex-col gap-3 p-6 transition-all duration-200 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg"
          >
            

            {/* Content */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 mr-2">
                <div className="mb-1 text-lg font-semibold text-gray-900">
                  {listing.title}
                </div>
                <div className="text-sm text-gray-500">
                  {listing.property || listing.location}
                </div>
              </div>

              {/* Action Icons */}
            <div className="flex gap-1 top-3 right-3">
              <button
                onClick={() => openViewModal(listing)}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                title="View"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={() => openEditModal(listing)}
                className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition"
                title="Edit"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this listing?")) {
                    handleDelete(listing.id);
                  }
                }}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
             
            </div>

            <div className="mb-2 text-xl font-bold text-blue-500">
               <DirhamSvg color1="" className="mb-1 mr-1" />{listing.rent || listing.price}/month
            </div>

            <div className="mb-3 text-sm text-gray-700 line-clamp-2">
              {listing.description}
            </div>

            <div className="flex justify-between p-3 text-sm rounded-lg bg-gray-50">
              <div className="text-center">
                <div className="font-semibold text-gray-900">{listing.views}</div>
                <div className="text-xs text-gray-500">Views</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">{listing.inquiries}</div>
                <div className="text-xs text-gray-500">Inquiries</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingBody;
