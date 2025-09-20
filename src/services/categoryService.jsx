import axios from './axiosInstance';

export const getAllCategories = async () => {
    const response = await axios.get('/categories/getMovieTypes');
    console.log(response.data);
    return response.data;
};

export const addCategory = async (categoryData) => {
    const response = await axios.post('/categories', categoryData);
    console.log(response.data);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(`/categories/${id}`);
    return response.data;
};
