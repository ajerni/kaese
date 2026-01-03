import axios from 'axios';

// Use environment variable for API URL if set, otherwise default to relative /api
// For local dev, Vite proxy handles /api. 
// For production on same server (Apache), /api works.
// For Vercel + External PHP, VITE_API_BASE_URL should be set to the full URL (e.g., https://yourserver.com/api)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
});

export const getCheeses = () => api.get('/kaese.php');
export const addCheese = (cheese) => api.post('/kaese.php', cheese);
export const updateCheese = (cheese) => api.put('/kaese.php', cheese);
export const updateRating = (id, user, rating) => api.put('/kaese.php', { id, user, rating });
export const deleteCheese = (id) => api.delete(`/kaese.php?id=${id}`);

export default api;

