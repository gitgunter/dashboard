import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from '../utils/axiosConfig';

// const baseURL = 'https://api.teodrive.com'; // URL base de tu API

// const axiosInstance = axios.create({
//   baseURL,
// });

// // Función para obtener el token JWT almacenado en las cookies
// const getToken = () => {
//   const token = Cookies.get('__teodrive-auth.session-token'); // 'jwtToken' es el nombre de la cookie JWT
//   if (!token) {
//     // Manejar el caso en el que no se encuentre la cookie
//     throw new Error('No se encontró el token JWT en las cookies');
//   }
//   return token;
// };

// // Configuración de las cabeceras para incluir el token JWT
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
// });

// Services
export const getAllExams = async () => {
  try {
    const response = await axiosInstance.get('/notes');
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const getQuestions = async (number) => {
  try {
    const response = await axiosInstance.get(`/exams/questions/${number}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const getBooleanQuestions = async (number) => {
  try {
    const response = await axiosInstance.get(`/exams/boolean/${number}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const createExam = async (newExamData) => {
  try {
    const response = await axiosInstance.post('/exams', newExamData);
    console.log(response);
    // return response.data;
    // return;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};
