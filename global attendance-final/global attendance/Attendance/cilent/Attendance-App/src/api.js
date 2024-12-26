import axios from 'axios';

const API_URL = 'http://localhost:8000'; 

export const signup = async (data) => {
  return axios.post(`${API_URL}/signup`, data);
};

export const login = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const addAttendance = async (data, token) => {
  return axios.post(`${API_URL}/addAttendance`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const getStudentsData = async (token) => {
  return axios.get(`${API_URL}/getStudentsData`, { headerus: { Authorization: `Bearer ${token}` } });
};

export const getStudentAttendance = async (rollnum, date, token) => {
  return axios.get(`${API_URL}/studentAttendance`, { params: { rollnum, date }, headers: { Authorization: `Bearer ${token}` } });
};

export const updateStudent = async (data, token) => {
  return axios.put(`${API_URL}/updateStudent`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteStudent = async (rollnum, token) => {
  return axios.delete(`${API_URL}/deleteStudent/${rollnum}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const createStudent = async (student, token) => {
  return axios.post(`${API_URL}/createStudent`, student, {
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": 'application/json'
    }
  });
};

