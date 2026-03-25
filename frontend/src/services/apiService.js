import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// ============================================
// AUTHENTICATION SERVICE
// ============================================
export const authService = {
  register: (data) =>
    axios.post(`${API_URL}/auth/register`, data),
  login: (data) =>
    axios.post(`${API_URL}/auth/login`, data),
};

// ============================================
// STUDENT SERVICE
// ============================================
export const studentService = {
  getAll: () =>
    axios.get(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  getById: (id) =>
    axios.get(`${API_URL}/students/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  create: (data) =>
    axios.post(`${API_URL}/students`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  update: (id, data) =>
    axios.put(`${API_URL}/students/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  delete: (id) =>
    axios.delete(`${API_URL}/students/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
};

// ============================================
// COURSE SERVICE
// ============================================
export const courseService = {
  getAll: () =>
    axios.get(`${API_URL}/courses`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  create: (data) =>
    axios.post(`${API_URL}/courses`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  update: (id, data) =>
    axios.put(`${API_URL}/courses/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  delete: (id) =>
    axios.delete(`${API_URL}/courses/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
};

// ============================================
// ATTENDANCE SERVICE
// ============================================
export const attendanceService = {
  getAll: () =>
    axios.get(`${API_URL}/attendance`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  mark: (data) =>
    axios.post(`${API_URL}/attendance/mark`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  getByStudent: (studentId) =>
    axios.get(`${API_URL}/attendance/student/${studentId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
};

// ============================================
// GRADE SERVICE
// ============================================
export const gradeService = {
  getAll: () =>
    axios.get(`${API_URL}/grades`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  create: (data) =>
    axios.post(`${API_URL}/grades`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  getByStudent: (studentId) =>
    axios.get(`${API_URL}/grades/student/${studentId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
};

const apiService = {
  authService,
  studentService,
  courseService,
  attendanceService,
  gradeService,
};

export default apiService;
