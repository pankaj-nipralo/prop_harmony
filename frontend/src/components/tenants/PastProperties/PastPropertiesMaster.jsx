import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import PastPropertiesStats from './PastPropertiesStats';
import PastPropertiesList from './PastPropertiesList';

// Import data
import {
  pastPropertiesData,
  pastPropertiesStats,
  calculateOverallStats
} from '../../../data/tenants/pastPropertiesData';

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
        await new Promise(resolve => setTimeout(resolve, 500));

        setProperties(pastPropertiesData);
        setStats(calculateOverallStats(pastPropertiesData));
      } catch (error) {
        console.error('Error loading past properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle view documents
  const handleViewDocuments = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (property && property.hasDocuments) {
      // Navigate to documents page or open document viewer
      navigate(`/tenants/documents?property=${propertyId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 bg-gray-200 rounded w-48"></div>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>

            {/* Properties skeleton */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Past Properties</h1>
          <span className="text-sm text-blue-600">
            {properties.length} previous rentals
          </span>
        </div>

        {/* Stats Cards */}
        <PastPropertiesStats stats={stats} />

        {/* Properties List */}
        <PastPropertiesList
          properties={properties}
          onViewDocuments={handleViewDocuments}
        />
      </div>
    </div>
  );
};

export default PastPropertiesMaster;
