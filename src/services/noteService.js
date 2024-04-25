import axiosInstance from '../utils/axiosConfig';

export const getAllNotes = async () => {
  try {
    const { data } = await axiosInstance.get('/notes');
    return data.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const createNote = async (data) => {
  try {
    const response = await axiosInstance.post('/notes', data);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const updateNote = async (data) => {
  try {
    const response = await axiosInstance.put('/notes', data);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axiosInstance.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};
