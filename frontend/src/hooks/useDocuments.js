// Custom hook for document management
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import documentService from '@/services/documentService';

// Helper function to get user role with fallback
const getUserRole = (user) => {
  if (user?.role) return user.role;
  
  const path = window.location.pathname;
  if (path.includes('/landlord')) return 'landlord';
  if (path.includes('/tenant')) return 'tenant';
  if (path.includes('/property-manager')) return 'property_manager';
  
  return 'landlord';
};

export const useDocuments = (filters = {}) => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState(null);

  // Fetch documents
  const fetchDocuments = useCallback(async () => {
    const userRole = getUserRole(user);
    if (!userRole) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await documentService.getDocuments(filters);
      setDocuments(data.documents);
      setCategories(data.categories);
      setProperties(data.properties);
    } catch (err) {
      setError(err.message || 'Failed to fetch documents');
      console.error('Documents fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  // Upload document
  const uploadDocument = useCallback(async (file, metadata = {}) => {
    try {
      setError(null);
      const newDocument = await documentService.uploadDocument(file, metadata);
      
      // Add to local state
      setDocuments(prev => [newDocument, ...prev]);
      
      return newDocument;
    } catch (err) {
      setError(err.message || 'Failed to upload document');
      throw err;
    }
  }, []);

  // Delete document
  const deleteDocument = useCallback(async (documentId) => {
    try {
      setError(null);
      await documentService.deleteDocument(documentId);
      
      // Remove from local state
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete document');
      throw err;
    }
  }, []);

  // Set document password
  const setDocumentPassword = useCallback(async (documentId, password) => {
    try {
      setError(null);
      await documentService.setDocumentPassword(documentId, password);
      
      // Update local state
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, isPasswordProtected: true, password }
          : doc
      ));
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to set password');
      throw err;
    }
  }, []);

  // Download document
  const downloadDocument = useCallback(async (documentId) => {
    try {
      setError(null);
      const result = await documentService.downloadDocument(documentId);
      
      // Update download count in local state
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, downloadCount: (doc.downloadCount || 0) + 1 }
          : doc
      ));
      
      return result;
    } catch (err) {
      setError(err.message || 'Failed to download document');
      throw err;
    }
  }, []);

  // Create folder
  const createFolder = useCallback(async (folderData) => {
    try {
      setError(null);
      const newFolder = await documentService.createFolder(folderData);
      
      // Add to local state
      setDocuments(prev => [newFolder, ...prev]);
      
      return newFolder;
    } catch (err) {
      setError(err.message || 'Failed to create folder');
      throw err;
    }
  }, []);

  // Fetch document statistics
  const fetchStats = useCallback(async () => {
    try {
      const statsData = await documentService.getDocumentStats();
      setStats(statsData);
      return statsData;
    } catch (err) {
      console.error('Error fetching document stats:', err);
    }
  }, []);

  // Refresh data
  const refresh = useCallback(() => {
    fetchDocuments();
    fetchStats();
  }, [fetchDocuments, fetchStats]);

  // Initial data fetch
  useEffect(() => {
    fetchDocuments();
    fetchStats();
  }, [fetchDocuments, fetchStats]);

  return {
    documents,
    loading,
    error,
    categories,
    properties,
    stats,
    uploadDocument,
    deleteDocument,
    setDocumentPassword,
    downloadDocument,
    createFolder,
    refresh
  };
};

// Hook for document search and filtering
export const useDocumentFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState({
    category: 'all',
    propertyId: null,
    search: '',
    dateFrom: '',
    dateTo: '',
    ...initialFilters
  });

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      category: 'all',
      propertyId: null,
      search: '',
      dateFrom: '',
      dateTo: ''
    });
  }, []);

  const getActiveFilterCount = useCallback(() => {
    return Object.keys(filters).filter(key => 
      filters[key] && 
      filters[key] !== '' && 
      filters[key] !== 'all' &&
      filters[key] !== null
    ).length;
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount: getActiveFilterCount()
  };
};
