import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast";
import { mockPropertyManagers } from "@/data/landlord/propertyManager/propertyManagerProfile/data";
import { PropertyManagerCard } from "./PropertyManagerCard";
import { InviteModal } from "./InviteModal";
import { SearchFilters } from "./SearchFilters";

const PropertyManagerProfileMaster = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const filteredManagers = mockPropertyManagers.filter((manager) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manager.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manager.services.some((service) =>
        service.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Location filter
    const matchesLocation =
      selectedLocation === "" ||
      manager.location.toLowerCase().includes(selectedLocation.toLowerCase());

    // Experience filter
    const matchesExperience =
      selectedExperience === "" ||
      (selectedExperience === "0-2" && manager.experience <= 2) ||
      (selectedExperience === "3-5" &&
        manager.experience > 2 &&
        manager.experience <= 5) ||
      (selectedExperience === "5+" && manager.experience > 5);

    // Rating filter
    const matchesRating =
      selectedRating === "" ||
      (selectedRating === "4+" && manager.rating >= 4) ||
      (selectedRating === "3+" && manager.rating >= 3) ||
      (selectedRating === "2+" && manager.rating >= 2);

    // Service filter
    const matchesService =
      selectedService === "" ||
      manager.services.some(
        (service) => service.toLowerCase() === selectedService.toLowerCase()
      );

    return (
      matchesSearch &&
      matchesLocation &&
      matchesExperience &&
      matchesRating &&
      matchesService
    );
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedExperience("");
    setSelectedRating("");
    setSelectedService("");
  };

  const handleSendInvite = () => {
    setShowInviteModal(false);
    toast.success("Invitation sent successfully");
  };

  return (
    <div className="min-h-screen p-6 mx-auto space-y-6">
      <div className="flex flex-col gap-6">
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedExperience={selectedExperience}
          setSelectedExperience={setSelectedExperience}
          resetFilters={resetFilters}
        />

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          {filteredManagers.length} property managers found
        </div>

        {/* Property Manager Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredManagers.length > 0 ? (
            filteredManagers.map((manager) => (
              <PropertyManagerCard
                key={manager.id}
                manager={manager}
                onViewProfile={setSelectedManager}
                onSendInvite={() => setShowInviteModal(true)}
              />
            ))
          ) : (
            <div className="py-8 text-center col-span-full">
              <p className="text-gray-500">
                No property managers found matching your criteria
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <InviteModal
        isOpen={showInviteModal}
        onOpenChange={setShowInviteModal}
        onSendInvite={handleSendInvite}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#fff",
            color: "#333",
          },
        }}
      />
    </div>
  );
};

export { PropertyManagerProfileMaster as default };