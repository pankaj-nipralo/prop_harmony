import React from "react";
import { Star, Heart, MapPin, Bed, Bath, Ruler } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const RentalCard = ({
  rental,
  openDetails,
  openOfferModal,
  favorites,
  toggleFavorite,
}) => {
  return (
    <div className="relative flex flex-col p-0 transition-all duration-200 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg">
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
            <Star className="w-4 h-4 mr-1 text-yellow-400" fill="#facc15" />
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
  );
};

export default RentalCard;