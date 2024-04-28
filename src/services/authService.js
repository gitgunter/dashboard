// import axiosInstance from '@utils/axiosConfig';

import axios from 'axios';

const baseURL = 'https://api.teodrive.com';
// const baseURL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL,
});

export const signIn = async (data) => {
  try {
    const { email, password } = data;
    console.log(typeof email, typeof password);
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

// export const signUp = async (email, password) => {};
