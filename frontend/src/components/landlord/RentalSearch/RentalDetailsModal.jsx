import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Star, MapPin, Bed, Bath, Ruler } from "lucide-react";
import DirhamSvg from "@/assets/Dirham";

const RentalDetailsModal = ({
  showModal,
  setShowModal,
  selected,
  openOfferModal,
}) => {
  return (
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
  );
};

export default RentalDetailsModal;
