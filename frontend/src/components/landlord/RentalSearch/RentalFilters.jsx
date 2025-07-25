import React from "react";

const RentalFilters = ({
  searchTerm,
  setSearchTerm,
  bedrooms,
  setBedrooms,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  return (
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
  );
};

export default RentalFilters;