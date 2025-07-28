import React from "react";
import ListingBody from "./ListingBody";
// import ListingBodyWithTable from "./ListingBodyWithTable";
// import PropertyTableDemo from "./PropertyTableDemo";
// import TableExamples from "@/components/common/Table/Table.examples";
// import ButtonExamples from '@/components/common/Buttons/Button.examples.jsx'
// import { StatGrid } from "@/components/common/StatCard";
// import { Building2, DollarSign } from "lucide-react";

// const propertyStats = [
//   {
//     title: "Total Properties",
//     value: 24,
//     subtitle: "3 new this month",
//     icon: Building2,
//     color: "blue",
//     trend: "up",
//     trendValue: "+12%",
//   },
//   {
//     title: "Monthly Revenue",
//     value: 125000,
//     icon: DollarSign,
//     color: "yellow",
//     showCurrency: true,
//     trend: "up",
//     trendValue: "+8%",
//   },
// ];

const ListingMaster = () => {
  return (
    <div className="min-h-screen p-6">
      <ListingBody />
      {/* <ButtonExamples />
      <PropertyTableDemo /> 
      <TableExamples />
      <ListingBodyWithTable /> */}
      {/* <StatGrid stats={propertyStats} columns={4} /> */}
    </div>
  );
};

export default ListingMaster;
