import axiosInstance from '../utils/axiosConfig';

export const getQuestions = async (limit) => {
  try {
    const response = await axiosInstance.get(`/exams/questions/${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const getBooleanQuestions = async (limit) => {
  try {
    const response = await axiosInstance.get(`/exams/boolean/${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const getAllExams = async () => {
  try {
    const { data } = await axiosInstance.get('/exams');
    return data.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const getExam = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/exams/${id}`);
    return data.data[0];
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const createExam = async (data) => {
  try {
    const response = await axiosInstance.post('/exams', data);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const deleteExam = async (id) => {
  try {
    const response = await axiosInstance.delete(`/exams/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};
