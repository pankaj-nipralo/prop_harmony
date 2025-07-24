// Base API service for handling HTTP requests
import { APP_CONSTANTS, ERROR_MESSAGES } from "@/config/constants";

class ApiService {
  constructor() {
    this.baseURL = APP_CONSTANTS.API_ENDPOINTS.BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
  }

  // Get headers with auth token
  getHeaders(customHeaders = {}) {
    const token = this.getAuthToken();
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...customHeaders
    };
  }

  // Handle API response
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || this.getErrorMessage(response.status));
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response.text();
  }

  // Get error message based on status code
  getErrorMessage(status) {
    switch (status) {
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return ERROR_MESSAGES.NETWORK_ERROR;
    }
  }

  // Generic GET request
  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders()
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }

  // Generic POST request
  async post(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }

  // Generic PUT request
  async put(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  }

  // Generic DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }

  // File upload
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders({ 'Content-Type': undefined }), // Let browser set content-type for FormData
        body: formData
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('API Upload Error:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
export const apiService = new ApiService();
export default apiService;
