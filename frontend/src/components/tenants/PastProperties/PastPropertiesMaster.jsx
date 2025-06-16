import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import PastPropertiesStats from "./PastPropertiesStats";
import PastPropertiesList from "./PastPropertiesList";

// Import data
import {
  pastPropertiesData,
  pastPropertiesStats,
  calculateOverallStats,
} from "../../../data/tenants/pastPropertiesData";

const PastPropertiesMaster = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState(pastPropertiesStats);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setProperties(pastPropertiesData);
        setStats(calculateOverallStats(pastPropertiesData));
      } catch (error) {
        console.error("Error loading past properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle view documents
  const handleViewDocuments = (propertyId) => {
    const property = properties.find((p) => p.id === propertyId);
    if (property && property.hasDocuments) {
      // Navigate to documents page or open document viewer
      navigate(`/tenants/documents?property=${propertyId}`);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen p-6 bg-gray-50">
  //       <div className="mx-auto max-w-7xl">
  //         <div className="animate-pulse">
  //           {/* Header skeleton */}
  //           <div className="flex items-center justify-between mb-6">
  //             <div className="w-48 h-8 bg-gray-200 rounded"></div>
  //             <div className="w-32 h-6 bg-gray-200 rounded"></div>
  //           </div>

  //           {/* Stats skeleton */}
  //           <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
  //             {[...Array(4)].map((_, i) => (
  //               <div
  //                 key={i}
  //                 className="p-4 bg-white border border-gray-200 rounded-lg"
  //               >
  //                 <div className="w-24 h-4 mb-2 bg-gray-200 rounded"></div>
  //                 <div className="w-16 h-8 bg-gray-200 rounded"></div>
  //               </div>
  //             ))}
  //           </div>

  //           {/* Properties skeleton */}
  //           <div className="space-y-4">
  //             {[...Array(3)].map((_, i) => (
  //               <div
  //                 key={i}
  //                 className="p-6 bg-white border border-gray-200 rounded-lg"
  //               >
  //                 <div className="w-48 h-6 mb-4 bg-gray-200 rounded"></div>
  //                 <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
  //                   {[...Array(3)].map((_, j) => (
  //                     <div key={j} className="space-y-2">
  //                       <div className="w-32 h-4 mb-2 bg-gray-200 rounded"></div>
  //                       <div className="w-full h-3 bg-gray-200 rounded"></div>
  //                       <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Past Properties</h1>
        {/* <span className="text-sm text-blue-600">
          {properties.length} previous rentals
        </span> */}
      </div>

      {/* Stats Cards */}
      <PastPropertiesStats stats={stats} />

      {/* Properties List */}
      <PastPropertiesList
        properties={properties}
        onViewDocuments={handleViewDocuments}
      />
    </div>
  );
};

export default PastPropertiesMaster;
