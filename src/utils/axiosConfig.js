import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://api.teodrive.com';
// const baseURL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL,
});

const getToken = () => {
  const token = Cookies.get('__teodrive-auth.session-token');

  if (!token) {
    throw new Error('No se encontró el token JWT en las cookies');
  }
  return token;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
