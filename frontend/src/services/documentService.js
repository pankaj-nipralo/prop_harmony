// Document Vault Service - following the new architecture pattern
import apiService from './apiService';
import { APP_CONSTANTS } from '@/config/constants';
import { documentsData } from '@/data/landlord/documents/data';

class DocumentService {
  // Get documents for a specific user/property
  async getDocuments(filters = {}) {
    try {
      // In production, this would be a real API call
      // const data = await apiService.get(`${APP_CONSTANTS.API_ENDPOINTS.DOCUMENTS}`, filters);
      
      // For now, return mock data with filtering
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      
      let documents = documentsData[0]?.documentsList || [];
      
      // Apply filters
      if (filters.category && filters.category !== 'all') {
        documents = documents.filter(doc => doc.category === filters.category);
      }
      
      if (filters.propertyId) {
        documents = documents.filter(doc => doc.propertyId === filters.propertyId);
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        documents = documents.filter(doc => 
          doc.originalName.toLowerCase().includes(searchTerm) ||
          doc.description.toLowerCase().includes(searchTerm) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      return {
        documents,
        total: documents.length,
        categories: this.getCategories(),
        properties: this.getProperties()
      };
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }

  // Upload a new document
  async uploadDocument(file, metadata = {}) {
    try {
      // In production, this would upload to server
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('metadata', JSON.stringify(metadata));
      // const data = await apiService.uploadFile(`${APP_CONSTANTS.API_ENDPOINTS.DOCUMENTS}/upload`, file, metadata);
      
      // For now, simulate upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDocument = {
        id: Date.now(),
        filename: file.name,
        originalName: metadata.name || file.name.split('.')[0],
        fileType: file.name.split('.').pop().toLowerCase(),
        fileSize: file.size,
        category: metadata.category || 'General',
        propertyName: metadata.propertyName || 'Unknown Property',
        propertyId: metadata.propertyId || 1,
        uploadDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        uploadedBy: 'Current User',
        description: metadata.description || '',
        tags: metadata.tags || [],
        expiryDate: metadata.expiryDate || null,
        version: 1,
        isActive: true,
        downloadCount: 0,
        fileUrl: URL.createObjectURL(file),
        thumbnailUrl: null,
        isShared: false,
        shareLink: null,
        shareExpiry: null,
        isPasswordProtected: false,
        password: null
      };
      
      return newDocument;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  // Delete a document
  async deleteDocument(documentId) {
    try {
      // In production: await apiService.delete(`${APP_CONSTANTS.API_ENDPOINTS.DOCUMENTS}/${documentId}`);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, message: 'Document deleted successfully' };
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  // Set password protection for a document
  async setDocumentPassword(documentId, password) {
    try {
      // In production: await apiService.put(`${APP_CONSTANTS.API_ENDPOINTS.DOCUMENTS}/${documentId}/password`, { password });
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, message: 'Password protection set successfully' };
    } catch (error) {
      console.error('Error setting document password:', error);
      throw error;
    }
  }

  // Download a document
  async downloadDocument(documentId) {
    try {
      // In production: return await apiService.get(`${APP_CONSTANTS.API_ENDPOINTS.DOCUMENTS}/${documentId}/download`);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, downloadUrl: '#' };
    } catch (error) {
      console.error('Error downloading document:', error);
      throw error;
    }
  }

  // Get available categories
  getCategories() {
    return [
      'All Categories',
      'Contracts',
      'Insurance',
      'Maintenance',
      'Financial',
      'Legal',
      'Inspection',
      'General'
    ];
  }

  // Get available properties
  getProperties() {
    return [
      { id: 1, name: 'Marina View Villa' },
      { id: 2, name: 'Downtown Apartment' },
      { id: 3, name: 'Sunset Complex' }
    ];
  }

  // Create a new folder
  async createFolder(folderData) {
    try {
      // In production: await apiService.post(`${APP_CONSTANTS.API_ENDPOINTS.DOCUMENTS}/folders`, folderData);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newFolder = {
        id: Date.now(),
        type: 'folder',
        name: folderData.name,
        description: folderData.description || '',
        createdDate: new Date().toISOString().split('T')[0],
        itemCount: 0,
        isPasswordProtected: folderData.isPasswordProtected || false,
        password: folderData.password || null
      };
      
      return newFolder;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  // Get document statistics
  async getDocumentStats() {
    try {
      const documents = documentsData[0]?.documentsList || [];
      
      return {
        totalDocuments: documents.length,
        totalSize: documents.reduce((sum, doc) => sum + doc.fileSize, 0),
        categoryCounts: documents.reduce((acc, doc) => {
          acc[doc.category] = (acc[doc.category] || 0) + 1;
          return acc;
        }, {}),
        recentUploads: documents
          .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
          .slice(0, 5),
        expiringDocuments: documents
          .filter(doc => doc.expiryDate && new Date(doc.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
          .length
      };
    } catch (error) {
      console.error('Error fetching document stats:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
export const documentService = new DocumentService();
export default documentService;
