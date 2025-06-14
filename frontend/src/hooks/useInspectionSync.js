import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'propertyInspections';

export const useInspectionSync = () => {
  const [inspections, setInspections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load inspections from localStorage
  const loadInspections = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        setInspections(parsedData);
      } else {
        // Initialize with default data if none exists
        const defaultData = getDefaultInspectionData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        setInspections(defaultData);
      }
    } catch (error) {
      console.error('Error loading inspections from localStorage:', error);
      setInspections([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save inspections to localStorage
  const saveInspections = useCallback((newInspections) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newInspections));
      setInspections(newInspections);
      
      // Dispatch custom event for cross-component synchronization
      window.dispatchEvent(new CustomEvent('inspectionDataUpdated', {
        detail: { inspections: newInspections }
      }));
    } catch (error) {
      console.error('Error saving inspections to localStorage:', error);
    }
  }, []);

  // Update specific inspection
  const updateInspection = useCallback((inspectionId, updates) => {
    setInspections(prevInspections => {
      const newInspections = prevInspections.map(group => ({
        ...group,
        inspectionsList: group.inspectionsList.map(inspection =>
          inspection.id === inspectionId
            ? { ...inspection, ...updates, lastUpdated: new Date().toISOString().split('T')[0] }
            : inspection
        )
      }));
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newInspections));
        
        // Dispatch update event
        window.dispatchEvent(new CustomEvent('inspectionDataUpdated', {
          detail: { inspections: newInspections }
        }));
      } catch (error) {
        console.error('Error updating inspection in localStorage:', error);
      }
      
      return newInspections;
    });
  }, []);

  // Add new inspection
  const addInspection = useCallback((newInspection) => {
    setInspections(prevInspections => {
      const updatedGroup = prevInspections.find(group => group.month === new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
      
      let newInspections;
      if (updatedGroup) {
        newInspections = prevInspections.map(group =>
          group.month === updatedGroup.month
            ? { ...group, inspectionsList: [...group.inspectionsList, newInspection] }
            : group
        );
      } else {
        const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
        newInspections = [
          ...prevInspections,
          {
            month: currentMonth,
            inspectionsList: [newInspection]
          }
        ];
      }
      
      saveInspections(newInspections);
      return newInspections;
    });
  }, [saveInspections]);

  // Listen for storage changes from other tabs/components
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const newData = JSON.parse(e.newValue);
          setInspections(newData);
        } catch (error) {
          console.error('Error parsing storage change:', error);
        }
      }
    };

    const handleInspectionUpdate = (e) => {
      setInspections(e.detail.inspections);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('inspectionDataUpdated', handleInspectionUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('inspectionDataUpdated', handleInspectionUpdate);
    };
  }, []);

  // Load data on mount
  useEffect(() => {
    loadInspections();
  }, [loadInspections]);

  return {
    inspections,
    setInspections: saveInspections,
    updateInspection,
    addInspection,
    isLoading,
    refreshInspections: loadInspections
  };
};

// Default inspection data
const getDefaultInspectionData = () => [
  {
    month: "June 2024",
    inspectionsList: [
      {
        id: 1,
        propertyName: "Sunset Villa Apartment",
        propertyAddress: "123 Palm Street, Dubai Marina",
        landlordName: "Pankaj Gupta",
        tenantName: "Mike Johnson",
        tenantEmail: "mike.tenant@email.com",
        inspectorName: "Property Manager",
        inspectionType: "Routine",
        requestedDate: "2024-06-25",
        scheduledDate: null,
        completedDate: null,
        status: "Pending Tenant Response",
        priority: "Medium",
        notes: "Quarterly routine inspection",
        findings: [],
        photos: [],
        createdBy: "Property Manager",
        createdDate: "2024-06-18",
        lastUpdated: "2024-06-18",
        areasInspected: [],
        inspectionDuration: null,
        reportGenerated: false,
        reportUrl: null,
        tags: ["routine", "quarterly"],
        tenantResponse: null,
        tenantResponseDate: null,
        tenantDeclineReason: null,
        tenantSuggestedTimes: [],
        landlordNotes: "Regular quarterly inspection",
        inspectionReport: null,
        reportSharedWithTenant: false,
        tenantComments: [],
      },
      {
        id: 2,
        propertyName: "Marina Heights Tower",
        propertyAddress: "456 Ocean View, Dubai Marina",
        tenantName: "Mike Johnson",
        landlordName: "Gaurav Kanchan",
        tenantEmail: "mike.tenant@email.com",
        inspectorName: "Property Manager",
        inspectionType: "Maintenance",
        requestedDate: "2024-06-20",
        scheduledDate: "2024-06-20",
        completedDate: null,
        status: "Confirmed",
        priority: "High",
        notes: "Water leak inspection",
        findings: [],
        photos: [],
        createdBy: "Property Manager",
        createdDate: "2024-06-15",
        lastUpdated: "2024-06-19",
        areasInspected: [],
        inspectionDuration: null,
        reportGenerated: false,
        reportUrl: null,
        tags: ["maintenance", "urgent", "water-leak"],
        tenantResponse: "accepted",
        tenantResponseDate: "2024-06-19",
        tenantDeclineReason: null,
        tenantSuggestedTimes: [],
        landlordNotes: "Tenant reported water leak in kitchen - urgent inspection required",
        inspectionReport: null,
        reportSharedWithTenant: false,
        tenantComments: [],
      }
    ]
  }
];
