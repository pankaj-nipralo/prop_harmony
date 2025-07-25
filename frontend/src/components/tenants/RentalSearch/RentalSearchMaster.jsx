import React from "react";
import RentalHeader from "@/components/landlord/RentalSearch/RentalHeader";
import RentalBody from "@/components/landlord/RentalSearch/RentalBody";

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

const RentalSearchMaster = () => {
  return (
    <div className=" p-6">
      <RentalHeader />
      <RentalBody rentalData={rentalData} />
    </div>
  );
};

export default RentalSearchMaster;
