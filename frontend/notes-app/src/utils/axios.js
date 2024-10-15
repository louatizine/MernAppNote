import axios from "axios";
import { BASE_URL } from "./constants"; // Ensure this constant is properly defined

// Create an Axios instance with custom settings
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Corrected to use `baseURL` instead of `base_url`
    timeout: 10000, // Fixed spelling from `timeOut` to `timeout`
    headers: {
        "Content-Type": "application/json", // Standardized header key
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => { // Fixed to use parentheses for the `config` parameter
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Add the authorization header
        }
        return config; // Return the modified config
    }, 
    (error) => {
        return Promise.reject(error); // Reject if there is an error
    }
);

export default axiosInstance; // Export the Axios instance
