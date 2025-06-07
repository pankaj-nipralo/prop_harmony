import React from "react";
import RentalHeader from "@/components/landlord/RentalSearch/RentalHeader";
import RentalBody from "@/components/landlord/RentalSearch/RentalBody";

const RentalSearchMaster = () => {
  return (
    <div className=" p-6">
      <RentalHeader />
      <RentalBody />
    </div>
  );
};

export default RentalSearchMaster;
