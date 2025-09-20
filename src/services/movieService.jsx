import axios from './axiosInstance';

export const getAllMovies = async () => {
  const response = await axios.get('/movie/allMovies');
  return response.data;
};

export const getMovieById = async (id) => {
  const response = await axios.get(`/movie/${id}`);
  return response.data;
};

export const getMoviesByTypes = async (movieTypeIds) => {
  const response = await axios.post('/movie/moviesByTypes', { movieTypeIds });
  return response.data;
};

export const searchMoviesByTitle = async (title) => {
  const response = await axios.get(`/movie/search?title=${encodeURIComponent(title)}`);
  return response.data;
};

export const getMoviesByReleaseYear = async (year) => {
  const response = await axios.get(`/movie/year/${year}`);
  return response.data;
};

export const getMoviesByCategory = async (categoryId) => {
  const response = await axios.get(`/movie/category/${categoryId}`);
  return response.data;
};

export const addMovie = async (movieData) => {
  const response = await axios.post('/movie/add', movieData);
  return response.data;
};

export const updateMovie = async (id, movieData) => {
  const response = await axios.put(`/movie/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await axios.delete(`/movie/${id}`);
  return response.data;
};
