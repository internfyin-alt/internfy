import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('adminToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service Quotes
export const submitServiceQuote = async (data) => {
  const response = await api.post('/services/quote', data);
  return response.data;
};

export const getAllQuotes = async () => {
  const response = await api.get('/services/quotes');
  return response.data;
};

// Training Enrollments
export const submitTrainingEnrollment = async (data) => {
  const response = await api.post('/training/enroll', data);
  return response.data;
};

export const getAllEnrollments = async () => {
  const response = await api.get('/training/enrollments');
  return response.data;
};

// Contact Forms
export const submitContactForm = async (data) => {
  const response = await api.post('/contact/submit', data);
  return response.data;
};

export const getAllMessages = async () => {
  const response = await api.get('/contact/messages');
  return response.data;
};

// Admin
export const adminLogin = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard/stats');
  return response.data;
};

export const updateQuoteStatus = async (id, data) => {
  const response = await api.patch(`/admin/quote/${id}/status`, data);
  return response.data;
};

export const updateEnrollmentStatus = async (id, data) => {
  const response = await api.patch(`/admin/enrollment/${id}/status`, data);
  return response.data;
};

export const updateMessageStatus = async (id, data) => {
  const response = await api.patch(`/admin/message/${id}/status`, data);
  return response.data;
};

export const deleteQuote = async (id) => {
  const response = await api.delete(`/admin/quote/${id}`);
  return response.data;
};

export const deleteEnrollment = async (id) => {
  const response = await api.delete(`/admin/enrollment/${id}`);
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/admin/message/${id}`);
  return response.data;
};

// Certificates
export const verifyCertificate = async (certificateId) => {
  const response = await api.get(`/certificates/verify/${certificateId}`);
  return response.data;
};

export const issueCertificate = async (enrollmentId) => {
  const response = await api.post(`/certificates/issue/${enrollmentId}`);
  return response.data;
};

export const getCertificateViewUrl = (certificateId) => {
  return `${API_URL}/certificates/view/${certificateId}`;
};

export const getCertificateDownloadUrl = (certificateId) => {
  return `${API_URL}/certificates/download/${certificateId}`;
};

export default api;
