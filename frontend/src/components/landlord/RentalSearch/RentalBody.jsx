import React, { useState } from "react";
import OfferSubmissionModal from "../../shared/OfferSubmission/OfferSubmissionModal";
import RentalFilters from "./RentalFilters";
import RentalCard from "./RentalCard";
import RentalDetailsModal from "./RentalDetailsModal";



const RentalBody = ({rentalData}) => {
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
    const propertyData = {
      id: rental.id,
      title: rental.title,
      address: rental.location,
      image: rental.img,
      price: rental.price,
      landlordName: "Property Owner",
      landlordEmail: "owner@example.com",
      landlordPhone: "+1 (555) 123-4567",
    };
    setSelectedForOffer(propertyData);
    setShowOfferModal(true);
  };

  const handleSubmitOffer = (offer) => {
    console.log("Offer submitted:", offer);
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
    const matchesSearch =
      rental.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBedrooms =
      bedrooms === "Any" ||
      (bedrooms === "1 bed" && rental.beds === 1) ||
      (bedrooms === "2 beds" && rental.beds === 2) ||
      (bedrooms === "3 beds" && rental.beds === 3) ||
      (bedrooms === "4+ beds" && rental.beds >= 4);

    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    const matchesPrice = rental.price >= min && rental.price <= max;

    return matchesSearch && matchesBedrooms && matchesPrice;
  });

  return (
    <div className="bg-transparent">
      <RentalFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        bedrooms={bedrooms}
        setBedrooms={setBedrooms}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredRentals.map((rental) => (
          <RentalCard
            key={rental.id}
            rental={rental}
            openDetails={openDetails}
            openOfferModal={openOfferModal}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <RentalDetailsModal
        showModal={showModal}
        setShowModal={setShowModal}
        selected={selected}
        openOfferModal={openOfferModal}
      />

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
