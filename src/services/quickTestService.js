import axiosInstance from '../utils/axiosConfig';

export const getAllQuickTests = async () => {
  try {
    const { data } = await axiosInstance.get('/quick-test');
    return data.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const createQuickTest = async (data) => {
  try {
    const response = await axiosInstance.post('/quick-test', data);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const deleteQuickTest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/quick-test/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};
