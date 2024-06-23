import axios from "axios";
import { destroyUserSession, getAuthToken, getRefreshToken } from "./auth/auth.service";

// Create an Axios instance with interceptors
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.headers) {
        config.headers.Authorization = `Bearer ${getAuthToken()}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor for handling HTTP 401 errors
// axiosInstance.interceptors.response.use(
//     function (response) {
//         // Do something with the response data
//         return response;
//     },
//     function (error) {
//         // Handle HTTP 401 (Unauthorized) errors here
//         if (error.response && error.response.status === 401) {
//             // Call your getRefreshToken function to get a new token
//             const refreshToken = getRefreshToken();

//             if (refreshToken) {
//                 error.config.headers.Authorization = `Bearer ${refreshToken}`;
//                 return axiosInstance(error.config);
//             } else {
//                 window.location.href = '/callnpay/login';
//                 destroyUserSession()
//             }
//         }


//         return Promise.reject(error);
//     }
// );


export default axiosInstance;