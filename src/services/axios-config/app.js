import axios from 'axios';
require('dotenv').config();

// Get data from local storage
const user_data = JSON.parse(localStorage.getItem('user_data'));
const authToken = user_data?.data?.token;
const company_id = user_data?.data?.company_id;
const user_id = user_data?.data?.user_id;
const calendlyToken = process.env.REACT_APP_CALENDLY_TOKEN;
const playUrl = process.env.REACT_APP_API_LAB_URL;
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const labUrl = process.env.REACT_APP_API_LAB_URL;
const labBackendUrl = process.env.REACT_APP_API_LAB_BACKEND_URL;

// Create Centralized API Axios instance
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: authToken,
  },
});

// Add response interceptor for handling auth failure globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 423) {
      handleInactiveCompany();
    } 
    
    return Promise.reject(error);
  }
);

// Function to handle auth failure globally 
function handleInactiveCompany() {
  localStorage.clear();
  window.location.href = '/login';
}

// Export company_id and user_id for reusability in service files
export { company_id, user_id, calendlyToken, user_data, playUrl, labUrl , labBackendUrl ,baseUrl};

export default api;
