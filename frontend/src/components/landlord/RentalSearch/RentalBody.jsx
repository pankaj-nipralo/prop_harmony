import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import OfferSubmissionModal from "../../shared/OfferSubmission/OfferSubmissionModal";
import { Star, Heart, MapPin, Bed, Bath, Ruler, User } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const rentalData = [
  {
    id: 1,
    title: "Luxury Apartment in Downtown",
    location: "123 Main St, Dubai",
    price: 7500,
    status: "Available",
    landlordPhone: "+971 50 123 4567",
    rating: 4.5,
    beds: 2,
    baths: 2,
    size: 1200,
    // img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/591987900.jpg?k=b85755896333b76feb8b1081a584b2b9ebed5db1e942fb430a7f843f2df9d01f&o=&hp=1",
    img: "https://robbreport.com/wp-content/uploads/2022/08/INT001.jpg",
    description:
      "A luxury apartment in the heart of Downtown Dubai with all amenities.",
  },
  {
    id: 2,
    title: "Spacious Villa in Jumeirah",
    location: "456 Beach Rd, Dubai",
    price: 15000,
    status: "Available",
    landlordPhone: "+971 50 123 4567",
    rating: 4.8,
    beds: 4,
    baths: 3,
    size: 2500,
    img: "https://media.vrbo.com/lodging/112000000/111520000/111511900/111511899/8682b27b.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    description: "A beautiful villa with private pool and garden in Jumeirah.",
  },
  {
    id: 3,
    title: "Cozy Studio in Marina",
    location: "789 Marina Walk, Dubai",
    price: 4500,
    status: "Available",
    landlordPhone: "+971 50 123 4567",
    rating: 4.2,
    beds: 1,
    baths: 1,
    size: 600,
    img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/588426709.jpg?k=bf781ec94b64cc60cb607673f9d2fc274f25cc858f16f01b231494cfef02d3aa&o=&hp=1",
    description:
      "A cozy studio apartment with marina views and modern finishings.",
  },
  {
    id: 4,
    title: "Modern Penthouse in Business Bay",
    location: "101 Tower St, Dubai",
    price: 12000,
    status: "Rented",
    landlordPhone: "+971 50 123 4567",
    rating: 4.9,
    beds: 3,
    baths: 2,
    size: 1800,
    img: "https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85,fit=scale-down,width=1280/https://media-production.lp-cdn.com/media/dqf8bxqw6zymc79zdlkj",
    description: "Stunning penthouse with panoramic views of Dubai.",
  },
  {
    id: 5,
    title: "Family Home in Arabian Ranches",
    location: "202 Desert Oasis, Dubai",
    price: 18000,
    status: "Available",
    landlordPhone: "+971 50 123 4567",
    rating: 4.7,
    beds: 5,
    baths: 4,
    size: 3200,
    img: "https://luxhabitat.ae/resizedimages/1920w/13563/source/10bd08eddae525b4870080e1cf035bb7d87d601eb1284ef51314ee26d024c966.jpg",
    description: "Spacious family home in a quiet gated community.",
  },
];

const RentalBody = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedForOffer, setSelectedForOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [bedrooms, setBedrooms] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [favorites, setFavorites] = useState([]);

  const openDetails = (rental) => {
    setSelected(rental);
    setShowModal(true);
  };

  const openOfferModal = (rental) => {
    // Transform rental data to match the expected property format
    const propertyData = {
      id: rental.id,
      title: rental.title,
      address: rental.location,
      image: rental.img,
      price: rental.price,
      landlordName: "Property Owner", // This would come from actual data
      landlordEmail: "owner@example.com", // This would come from actual data
      landlordPhone: "+1 (555) 123-4567", // This would come from actual data
    };
    setSelectedForOffer(propertyData);
    setShowOfferModal(true);
  };

  const handleSubmitOffer = (offer) => {
    // In a real app, this would save to a global state or send to an API
    console.log("Offer submitted:", offer);

    // For now, we'll just store it in localStorage to simulate persistence
    const existingOffers = JSON.parse(
      localStorage.getItem("tenantOffers") || "[]"
    );
    const updatedOffers = [...existingOffers, offer];
    localStorage.setItem("tenantOffers", JSON.stringify(updatedOffers));

    setShowOfferModal(false);
    setSelectedForOffer(null);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredRentals = rentalData.filter((rental) => {
    // Search filter
    const matchesSearch =
      rental.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Bedrooms filter - simplified and more reliable
    const matchesBedrooms =
      bedrooms === "Any" ||
      (bedrooms === "1 bed" && rental.beds === 1) ||
      (bedrooms === "2 beds" && rental.beds === 2) ||
      (bedrooms === "3 beds" && rental.beds === 3) ||
      (bedrooms === "4+ beds" && rental.beds >= 4);

    // Price filter
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    const matchesPrice = rental.price >= min && rental.price <= max;

    return matchesSearch && matchesBedrooms && matchesPrice;
  });

  return (
    <div className="bg-transparent">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 mb-6 bg-white border border-gray-200 shadow-md rounded-xl">
        <input
          className="flex-1 min-w-[220px] px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        >
          <option value="Any">Any Bedrooms</option>
          <option value="1 bed">1 bed</option>
          <option value="2 beds">2 beds</option>
          <option value="3 beds">3 beds</option>
          <option value="4+ beds">4+ beds</option>
        </select>

        <input
          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          type="number"
        />
        <input
          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          type="number"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredRentals.map((rental) => (
          <div
            key={rental.id}
            className="relative flex flex-col p-0 transition-all duration-200 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg"
          >
            <div className="relative flex items-center justify-center w-full overflow-hidden bg-gray-100 h-72 rounded-t-xl">
              <img
                src={rental.img}
                alt={rental.title}
                className="object-cover w-full h-full"
              />
              <button
                className="absolute p-2 top-3 right-3"
                onClick={() => toggleFavorite(rental.id)}
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(rental.id)
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }`}
                  strokeWidth={2}
                />
              </button>
            </div>
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 mr-2 text-lg font-semibold text-gray-900 line-clamp-1">
                  {rental.title}
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                    rental.status === "Available"
                      ? "text-green-700 bg-green-100"
                      : "text-blue-700 bg-blue-100"
                  }`}
                >
                  {rental.status}
                </span>
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                {rental.location}
              </div>
              <div className="flex items-center gap-1 mb-3 text-xl font-bold text-blue-500">
                <DirhamSvg size={17} color1="" />{" "}
                {rental.price.toLocaleString()}/month
              </div>
              <div className="grid grid-cols-2 gap-2 p-3 mb-3 rounded-lg bg-gray-50">
                <div className="flex items-center text-sm text-gray-600">
                  <Star
                    className="w-4 h-4 mr-1 text-yellow-400"
                    fill="#facc15"
                  />
                  {rental.rating}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Bed className="w-4 h-4 mr-1" />
                  {rental.beds} beds
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Bath className="w-4 h-4 mr-1" />
                  {rental.baths} baths
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Ruler className="w-4 h-4 mr-1" />
                  {rental.size} sq ft
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2 mt-auto">
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-3 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-600"
                    onClick={() => openDetails(rental)}
                  >
                    View Details
                  </button>
                  <a
                    href={`tel:${rental.landlordPhone}`}
                    className="items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-blue-500 transition-colors border border-blue-500 rounded-lg hover:bg-blue-50"
                  >
                    <button className="flex text-center justify-self-center">
                      Contact
                    </button>
                  </a>
                </div>
                {rental.status === "Available" && (
                  <button
                    className="w-full px-3 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 myButton"
                    onClick={() => openOfferModal(rental)}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="w-full p-0 overflow-hidden bg-white border-0 rounded-lg md:max-w-xl [&>.absolute]:hidden">
          {selected && (
            <div>
              <img
                src={selected.img}
                alt={selected.title}
                className="object-cover w-full h-72"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xl font-semibold text-gray-900">
                    {selected.title}
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      selected.status === "Available"
                        ? "text-green-700 bg-green-100"
                        : "text-blue-700 bg-blue-100"
                    }`}
                  >
                    {selected.status}
                  </span>
                </div>
                <div className="flex items-center mb-4 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  {selected.location}
                </div>
                <div className="flex items-center gap-1 mb-4 text-2xl font-bold text-blue-500">
                  <DirhamSvg size={20} color1="" />{" "}
                  {selected.price.toLocaleString()}/month
                </div>
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star
                      className="w-4 h-4 mr-1 text-yellow-400"
                      fill="#facc15"
                    />
                    {selected.rating}
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {selected.beds} beds
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {selected.baths} baths
                  </div>
                  <div className="flex items-center">
                    <Ruler className="w-4 h-4 mr-1" />
                    {selected.size} sq ft
                  </div>
                </div>
                <div className="mb-6 text-gray-700">{selected.description}</div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-end gap-3">
                    <a href={`tel:${selected.landlordPhone}`}>
                      <button className="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                        Contact Agent
                      </button>
                    </a>
                    {selected.status === "Available" && (
                      <button
                        className="py-2 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 myButton"
                        onClick={() => {
                          setShowModal(false);
                          openOfferModal(selected);
                        }}
                      >
                        Apply Now
                      </button>
                    )}
                    <button
                      className="px-6 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-600"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Offer Submission Modal */}
      <OfferSubmissionModal
        isOpen={showOfferModal}
        onClose={() => {
          setShowOfferModal(false);
          setSelectedForOffer(null);
        }}
        property={selectedForOffer}
        onSubmitOffer={handleSubmitOffer}
      />
    </div>
  );
};

export default RentalBody;
